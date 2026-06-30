export const meta = {
  name: 'aurea-hig-review',
  description: 'Apple-HIG-Design-Review (Multi-Agent) der AUREA-Seiten anhand Screenshots',
  phases: [
    { title: 'Dimensionen', detail: 'HIG-Lenses bewerten Screenshots parallel' },
    { title: 'Synthese', detail: 'Priorisierter HIG-Report' },
  ],
}

const IMG = 'E:/Freelance/aurea-mockup/versand/'
const SHOTS = [
  IMG + 'AUREA_Startseite_komplett.jpg',
  IMG + 'AUREA_Longevity_komplett.jpg',
  IMG + 'AUREA_Startseite_Mobil.jpg',
  IMG + 'AUREA_Longevity_Mobil.jpg',
]

const HIG = `APPLE HUMAN INTERFACE GUIDELINES — Kernprinzipien (fuer Web adaptiert):
- CLARITY: Inhalt zuerst; Lesbarkeit auf jeder Groesse; klare visuelle Hierarchie; praezise, verstaendliche Sprache; Funktion vor Dekoration.
- DEFERENCE: UI tritt hinter den Inhalt zurueck; grosszuegiger Weissraum; zurueckhaltende Chrome; keine ueberladenen Effekte; Konsistenz.
- DEPTH: sinnvolle Ebenen und Hierarchie; Bewegung/Transitions, die Orientierung geben statt abzulenken; realistische, ruhige Tiefe.
- Weitere: konsistente Komponenten & Abstaende; klare Touch-/Klickziele (>=44px); sichtbare Zustaende (hover/focus/active/error); Eingaben minimieren; Barrierefreiheit; Respekt vor Safe-Areas/Reachability auf Mobile.
KONTEXT: AUREA ist ein Premium-Dermatologie-/Longevity-Praxis-Mockup (Schweiz). Ziel: Vertrauen + Premium-Anmutung + Conversion (Terminanfragen). WCAG-Kontrast und Responsive-Overflow werden bereits separat automatisiert geprueft — bewerte hier die QUALITATIVE Designqualitaet.`

const FINDINGS_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    dimension: { type: 'string' },
    score: { type: 'integer' },
    strengths: { type: 'array', items: { type: 'string' } },
    issues: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      severity: { type: 'string', enum: ['P0', 'P1', 'P2'] },
      finding: { type: 'string' },
      where: { type: 'string' },
      recommendation: { type: 'string' },
    }, required: ['severity', 'finding', 'where', 'recommendation'] } },
  },
  required: ['dimension', 'score', 'strengths', 'issues'],
}

const DIMS = [
  { key: 'Clarity & Hierarchie', focus: 'Visuelle Hierarchie, Lesbarkeit, Scanbarkeit, Inhalt-zuerst, klare Fuehrung des Auges, Verstaendlichkeit der Texte/Labels.' },
  { key: 'Deference & Aesthetik', focus: 'Zurueckhaltung der UI, Weissraum, Premium-/Vertrauens-Anmutung, Konsistenz, Bild-Einsatz, Reduktion statt Dekoration.' },
  { key: 'Typografie', focus: 'Typo-Skala & Rhythmus, Serif/Sans-Paarung, Zeilenlaenge, Zeilenabstand, Hierarchie der Schriftgrade, Konsistenz.' },
  { key: 'Layout, Spacing & Adaptivity', focus: 'Raster, Ausrichtung, konsistente Abstaende, Sektions-Rhythmus, Mobile-Adaption, Safe-Areas, kein Gedraenge auf kleinen Screens.' },
  { key: 'Farbe & Bildwelt', focus: 'Farbsystem & semantische Nutzung, Harmonie der Palette, Bildqualitaet/-konsistenz/-komposition, Kontrast-Anmutung (qualitativ).' },
  { key: 'Interaktion, Feedback & Ergonomie', focus: 'Affordances, Hover/Focus/Active-Zustaende, Tap-Ziele, Bewegung/Transitions, Formular-Ergonomie (Anamnese), CTA-Klarheit.' },
]

phase('Dimensionen')
log('HIG-Review: ' + DIMS.length + ' Dimensionen pruefen die Screenshots ...')

const dimResults = await parallel(DIMS.map(d => async () => {
  return await agent(
`${HIG}

DEINE DIMENSION: ${d.key}
FOKUS: ${d.focus}

AUFGABE: Oeffne ZUERST diese vier Screenshots mit dem Read-Tool (Pflicht, nicht raten):
- ${SHOTS[0]}  (Startseite, Desktop, ganze Seite)
- ${SHOTS[1]}  (Longevity-Seite, Desktop, ganze Seite)
- ${SHOTS[2]}  (Startseite, Mobil, ganze Seite)
- ${SHOTS[3]}  (Longevity-Seite, Mobil, ganze Seite)

Bewerte AUSSCHLIESSLICH deine Dimension "${d.key}" anhand der Apple HIG (fuer Web adaptiert).
Gib zurueck: score 1-5 (5 = exzellent), 2-4 konkrete strengths, und konkrete issues mit severity
(P0=muss vor Versand, P1=sollte, P2=nice-to-have), JEWEILS mit genauem Ort (where: Sektion/Element) und
umsetzbarer recommendation. Sei spezifisch und ehrlich; erfinde nichts, was nicht in den Screenshots sichtbar ist.
Deutsch, Schweizer Rechtschreibung.`,
    { schema: FINDINGS_SCHEMA, phase: 'Dimensionen', label: 'hig:' + d.key.split(' ')[0].toLowerCase() })
}))

const valid = dimResults.filter(Boolean)

phase('Synthese')
const SYNTH_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: {
    overallScore: { type: 'number' },
    verdict: { type: 'string' },
    topStrengths: { type: 'array', items: { type: 'string' } },
    prioritized: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      severity: { type: 'string', enum: ['P0', 'P1', 'P2'] },
      area: { type: 'string' },
      finding: { type: 'string' },
      recommendation: { type: 'string' },
    }, required: ['severity', 'area', 'finding', 'recommendation'] } },
    scoreboard: { type: 'array', items: { type: 'object', additionalProperties: false, properties: {
      dimension: { type: 'string' }, score: { type: 'integer' },
    }, required: ['dimension', 'score'] } },
    markdown: { type: 'string' },
  },
  required: ['overallScore', 'verdict', 'topStrengths', 'prioritized', 'scoreboard', 'markdown'],
}

const synth = await agent(
`${HIG}

Hier die Einzelbewertungen der HIG-Dimensionen als JSON:
${JSON.stringify(valid)}

AUFGABE: Synthetisiere einen priorisierten HIG-Gesamtreport.
- overallScore (gewichteter Mittelwert, 1 Dezimale), verdict (2-3 Saetze Gesamteinschaetzung).
- topStrengths (4-6 staerkste Punkte, dedupliziert).
- prioritized: ALLE issues zusammengefuehrt & dedupliziert, nach severity (P0 zuerst) sortiert, mit area/finding/recommendation.
- scoreboard: je Dimension der score.
- markdown: ein vollstaendiger, sauber formatierter Markdown-Report (Titel "# AUREA — Apple-HIG-Review", Scoreboard-Tabelle, Top-Staerken, dann P0/P1/P2-Abschnitte mit Checkboxen, Ort und Empfehlung). Deutsch, Schweizer Rechtschreibung.
Sei ehrlich und konkret; priorisiere, was die Premium-/Vertrauens-/Conversion-Wirkung am staerksten hebt.`,
  { schema: SYNTH_SCHEMA, phase: 'Synthese', label: 'hig:synthese' })

return { synth, dimensions: valid }
