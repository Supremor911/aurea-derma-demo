# AUREA — Apple-HIG-Review

**Gesamtscore: 3.8 / 5**

AUREA liefert eine stilsichere, premium-anmutende und vertrauensbildende Designsprache mit ausgereifter Typo- und Farbdisziplin — auf Desktop liegt das Mockup nahe am Zielbild einer Schweizer Premium-Praxis. Der Gesamteindruck wird jedoch durch zwei P0-Mobile-Defekte gebrochen: überlappende Textebenen im Hero (Logo über Eyebrow und H1) und ein horizontaler Overflow, der konversionskritische Kontaktdaten im Footer abschneidet — beides genau am ersten mobilen Eindruck und an der Conversion. Nach Behebung dieser Mobile-Bugs plus Schärfung der CTA-Hierarchie und konsistenterem Hero-Scrim ist die volle Premium- und Vertrauenswirkung erreichbar.

## Scoreboard

| Dimension | Score |
|---|:---:|
| Clarity & Hierarchie | 3 / 5 |
| Deference & Ästhetik | 4 / 5 |
| Typografie | 4 / 5 |
| Layout, Spacing & Adaptivity | 4 / 5 |
| Farbe & Bildwelt | 4 / 5 |
| Interaktion, Feedback & Ergonomie | 4 / 5 |
| **Gewichteter Mittelwert** | **3.8 / 5** |

## Top-Stärken

- **Durchgängiges Hierarchie-Muster auf allen Sektionen:** gold-gesperrte Versal-Eyebrow → grosse Serif-Headline → ruhiger Sans-Body → klarer Gold-CTA. Hochgradig scanbar, ganz im Sinne von Apple-Clarity «Inhalt zuerst».
- **Sehr disziplinierte, kohärente Premium-Farbwelt:** warmes Ivory, tiefes Tannengrün/Forest-Charcoal, gedämpftes Champagner-Gold nur als Akzent — mit semantisch präziser Gold-Reservierung für CTAs, Eyebrows, Icons und Hairlines. Vertrauen + Luxus ohne klinische Kälte.
- **Starkes rollenbasiertes Typo-System:** kontrastreiche Display-Serif, humanistische Sans, kursive Serif für Zitate, gesperrte Gold-Eyebrows — mit sauber abgestuftem Skalenkontrast, durchgehend auf beiden Seiten.
- **Grosszügiger, ruhiger Weissraum und konsistente Sektionsrhythmik** mit alternierender Bild/Text-Anordnung — Premium durch Reduktion statt Dekoration (vorbildliche HIG-Deference).
- **Ergonomisch durchdachtes Anamnese-Formular:** Fortschrittsanzeige, Chip-Auswahl statt Dropdowns, native Date-/Tel-Inputs, `:focus-visible` mit Gold-Outline, `prefers-reduced-motion`-Support und 44px-Touch-Ziele.
- **Klare Hero-Value-Proposition + kohärente, warme Reportage-Bildwelt** (Sage-Grün, Amber-Glasflaschen, Leinen, weiches Tageslicht), die das Sage-Brand-Token physisch spiegelt und Vertrauen stützt statt nur zu schmücken.

## P0 — Sofort beheben (Mobile-Bruch & Conversion)

- [ ] **Startseite Mobil — Hero/Header (Logo vs. Eyebrow & H1):** Der transparente Header überlagert den Hero — der Logo-Schriftzug «AUREA / DERMATOLOGIE & LONGEVITY» liegt über der Eyebrow «DERMATOLOGIE · ÄSTHETIK · LONGEVITY · SCHWYZ» («SCHWYZ» verschwindet hinter «AUREA») und über dem H1-Anfang «Ihre». Mehrere Textebenen überlagern sich unleserlich, der obere Atemraum ist zu eng.
  *Empfehlung:* Hero-Top-Padding um Headerhöhe + `env(safe-area-inset-top)` erhöhen, sodass Eyebrow und H1 frei unter dem Header beginnen. Optional Eyebrow auf Mobil ausblenden oder auf eine Zeile kürzen («DERMATOLOGIE · LONGEVITY»). Gegencheck am sauberen Longevity-Mobil-Hero — dasselbe Spacing-Muster übernehmen.

- [ ] **Mobil — Footer & dunkle Sektionen (horizontaler Overflow):** Der dreispaltige Footer bricht auf ~375px nicht um; die KONTAKT-Spalte wird rechts geclippt («Bahnhofstrass…», Telefon und Öffnungszeiten laufen über den Rand). Derselbe Overflow lässt die dunkelgrünen Bänder (Steps, Schluss-CTA, Footer) rechts einen hellen ~5%-Streifen stehen und bricht den Full-Bleed-Eindruck.
  *Empfehlung:* Footer unter ~768px auf eine Spalte stapeln (Logo/Claim → NAVIGATION → KONTAKT, full-width). `overflow-x:hidden` am Body, kein Element breiter als der Viewport; danach dunkle Sektionen bewusst full-bleed (`width:100%`/`100vw`) führen.

## P1 — Hoch (Premium-, Vertrauens- & Conversion-Wirkung)

- [ ] **Startseite Desktop — Hero-Scrim über hellen Bildzonen:** Trust-Checks, H1-Unterzeile, Headline-Ausläufer, das Label «ENTDECKEN» und die Nav-Links schwimmen über dem überstrahlten Bereich (Vorhänge/Fenster rechts) und verlieren Kontrast/Halt.
  *Empfehlung:* Konsistenten Verlaufs-Scrim über untere/rechte Hero-Hälfte (in hellen Zonen kräftiger); Trust-Checks ggf. auf abgedunkelten Streifen, subtiler Scrim hinter Nav und «ENTDECKEN».

- [ ] **Longevity Desktop & Mobil — Hero-Bild & Lesekante:** Das Hero-Bild (Frau am Fenster) wirkt ausgewaschen/entsättigt — die Person verschmilzt mit den Vorhängen; zugleich ragt die dunkelgrüne Headline in den helleren Bildbereich, die Lesekante wird unruhig.
  *Empfehlung:* Bild mit mehr Tonwert wählen oder dezent abdunkeln/nachsättigen; sanften Links-nach-Rechts-Scrim hinter die Headline legen.

- [ ] **Startseite — Schluss-/Kontakt-CTA-Block:** Zwei gleichwertige Outline-Pillen (Telefon, E-Mail) ohne primären Fokus-CTA — das Auge erhält keine Führung, im Widerspruch zur sonst klaren gefüllt-vs.-outline-Hierarchie.
  *Empfehlung:* Eine Aktion als primären, gefüllten Gold-Button hervorheben (z. B. «Termin anfragen»/Telefon), die zweite als Outline-Sekundär.

- [ ] **Startseite Desktop — Hero-Eyebrow vs. Logo-Subtitel (Redundanz):** Die Eyebrow dupliziert den Logo-Subtitel «DERMATOLOGIE & LONGEVITY» und teils das Kennzahlen-Band; sie konkurriert mit dem Logo und ist auf hellem Grund schwach abgesetzt.
  *Empfehlung:* Eyebrow stärker auf Standort/USP zuspitzen oder weglassen, damit Logo → Headline → Subline redundanzfrei lesen.

- [ ] **Startseite — Leistungskarten (Affordance-Mismatch & Tap-Ziel):** Beim Hover hebt/zoomt die ganze Karte und der Rand wird golden, doch nur «Mehr erfahren» ist ein `<a>` — Klicks auf die Karte treffen ins Leere. Der Pfeillink ist zudem auf Mobil < 44px.
  *Empfehlung:* Ganze Karte klickbar und fokussierbar machen (Karte in `<a>` umschliessen oder Stretched-Link-Overlay) — löst zugleich das Tap-Ziel.

- [ ] **Longevity — Choice-Chips ohne Selected-State:** Es existiert nur `.choice:hover`, kein Aktiv-/Checked-Styling; getroffene Auswahlen sind kaum sichtbar (v. a. Mehrfachauswahl «Welche Hautanliegen…»).
  *Empfehlung:* Klaren Zustand via `.choice:has(input:checked)` definieren (goldener Hintergrund/Rand, dunkler Text, Häkchen-Icon).

- [ ] **Longevity — Pflichtfelder & Label-Verknüpfung:** Keine Pflicht-/Optional-Kennzeichnung; Labels sind nicht via `for`/`id` mit den Inputs verbunden — Label-Klick fokussiert das Feld nicht, das Klickziel bleibt klein.
  *Empfehlung:* Pflichtfelder markieren («*» + Legende) und jedes `<label>` per `for` mit der Input-`id` verknüpfen.

- [ ] **Startseite — Laser-Kachel zu dunkel:** Im 3×2-Grid ist «Laser- & Gerätetherapie» deutlich moodiger/dunkler als die sechs High-Key-Kacheln und bricht den tonalen Rhythmus.
  *Empfehlung:* Helleres Motiv wählen oder auf High-Key umgraden (Schatten anheben, warmen Ton angleichen), Luminanz den Nachbarkacheln angleichen.

- [ ] **Startseite — Portrait Dr. Brunner wirkt KI-generiert:** Überglättete, leicht synthetische Haut im Kontrast zu den authentischen Film-Aufnahmen — gerade das Schlüsselbild der Ärztin kann die Glaubwürdigkeit untergraben.
  *Empfehlung:* Durch authentisches Portrait mit natürlicher Hauttextur ersetzen; falls generiert: Glättung reduzieren, feines Korn/Mikrokontraste ergänzen.

- [ ] **Longevity — «Haut im grösseren Zusammenhang»: fehlender Absatzabstand:** Zwei Absätze laufen ohne Leerzeile/Einzug ineinander («…grösseren Bildes.» → «Die Longevity-Anamnese ist…»), wirkt als Textwand.
  *Empfehlung:* Absatzabstand zwischen `<p>` (ca. 0.8–1em) einführen, Sätze als getrennte Absätze auszeichnen — Regel global.

## P2 — Mittel (Feinschliff & Konsistenz)

- [ ] **Startseite Desktop — Hero: zwei gleich gewichtete CTAs** («Termin anfragen» vs. «Leistungen entdecken») konkurrieren. *Empfehlung:* Sekundäre Aktion visuell zurücknehmen (kleiner / Text-Pfeil-Link).
- [ ] **Start & Longevity — zentrierte mehrzeilige Lead-Absätze** erschweren das Lesen. *Empfehlung:* Linksbündig setzen oder per `max-width` auf 1–2 Zeilen begrenzen; Zentrierung nur für Eyebrows/kurze Claims.
- [ ] **Startseite — «Ihr Weg zu uns» & Leistungs-Cards: Baseline-Versatz** durch 1- vs. 2-zeilige Titel. *Empfehlung:* Titelbereich mit fixer `min-height` (2 Zeilen) oder Umbruch vereinheitlichen.
- [ ] **Longevity — Hero-Breadcrumb zu hell** und kaum wahrnehmbar. *Empfehlung:* Kontrastreicher/dezent aktiv stylen.
- [ ] **Startseite — Kennzahlen-Band: Labels zu klein/abstrakt** (z. B. 100% / «auf Ihr Anliegen zugeschnitten»). *Empfehlung:* Label-Schriftgrad anheben, Formulierungen konkreter.
- [ ] **Startseite Desktop — Portrait-Sektion: dunkelgrüner Versatz-Block** lugt nur halb hervor, wirkt wie Artefakt. *Empfehlung:* Klar als Depth-Ebene ausformen oder entfernen.
- [ ] **Startseite Desktop — Hero rechte Bildkante:** angeschnittener Holz-/Tresenblock wirkt unruhig. *Empfehlung:* Bildausschnitt enger wählen.
- [ ] **Beide Seiten — uneinheitliche Rundungssprache** (eckige Leistungs-Karten-Bilder vs. stärker gerundete Longevity-/Hero-Karten). *Empfehlung:* Einheitliches Radius-Set definieren und überall anwenden.
- [ ] **Longevity — Ambient-/Stillleben-Motive mild synthetisch** (Travertin/Salbei «zu sauber»). *Empfehlung:* Echte Stillleben-Fotografie oder feines Korn/Imperfektionen ergänzen.
- [ ] **Startseite — verschiedene Behandlerinnen vs. Dr.-Brunner-Portrait** verwischen die Ärztin-Identität. *Empfehlung:* Illustrative Szenen generisch halten, nur das offizielle Portrait als Dr. Brunner framen.
- [ ] **Longevity Desktop — zu grosszügiger Vertikal-Leerraum** nach 4-Karten-Reihe und 2-Spalten-Liste. *Empfehlung:* Grösste Inter-Sektions-Abstände an die übrigen angleichen.
- [ ] **Longevity — keine Inline-Validierung/Fehlerzustände** (nur Erfolgs-State `.form-done`). *Empfehlung:* Fehlerzustände ergänzen (roter Rand + Hinweistext, Fokus aufs erste Fehlerfeld).
