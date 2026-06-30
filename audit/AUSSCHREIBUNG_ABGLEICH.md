# AUREA — Abgleich gegen die Ausschreibung #3014281

**„Aufbau einer hochwertigen WordPress-Website für eine Dermatologin"** · WE FRANCHISE GmbH · Schwyz · 100 % Remote · Start 7/2026.

> Bewertet wurde die **Bewerbungs-Arbeitsprobe** (Mockup Variante A/B + Bewerbungsunterlagen), nicht eine fertige WordPress-Site. Pro Anforderung wird unterschieden: **demonstriert** (im Mockup sichtbar gebaut) · **konzeptionell belegt** (in den Unterlagen begründet) · **offen**. Jede Einschätzung wurde von einem zweiten, adversarialen Agenten gegengeprüft (Anti-Over-Claiming).

## Gesamtbild — 36 Anforderungen

| Status | Anzahl |
|---|---|
| ✅ Erfüllt | 9 |
| 🟡 Teilweise | 20 |
| ⬜ Offen | 7 |

| Cluster | ✅ | 🟡 | ⬜ |
|---|--:|--:|--:|
| Liefergegenstaende | 2 | 2 | 0 |
| Premium-Anmutung, Design auf Basis CI, medizinische/Premium-Marken-Erfahrung | 2 | 4 | 0 |
| WordPress-Architektur | 2 | 3 | 0 |
| Performance-Optimierung + DSGVO/DSG-konforme Umsetzung | 2 | 6 | 3 |
| Optionale Projektphasen & Skills | 0 | 3 | 2 |
| Bewerbungsunterlagen | 1 | 2 | 2 |

*3 Einschätzung(en) wurden in der adversarialen Prüfung nach unten korrigiert (kein Over-Claiming).*

---

## Liefergegenstaende (Hauptwebsite, Service-Seiten, Longevity-Anamnese)

### ✅ **Erfüllt** — Hochwertige Hauptwebsite (Premium-Startseite) als zentraler Liefergegenstand vorhanden.
*Belegart: im Mockup demonstriert*

- **Beleg:** E:/Freelance/aurea-mockup/variante-b.html ist eine vollstaendig gebaute, hochwertige Startseite: Sticky-Nav (Z.16-29), Full-Bleed-Hero mit Eyebrow/H1/Lead/CTAs (Z.32-45), Leistungs-Grid (Z.48-62), zwei Feature-Sektionen Aesthetik/Longevity (Z.64-84), interaktiver Vorher/Nachher-Slider (Z.86-108, JS in assets/b-app.js Z.31-59), Pull-Quote (Z.110-116), Aerztin/Praxis mit Credentials (Z.118-134), mehrstufige …
- **Lücke:** Es ist eine statische HTML/CSS/JS-Arbeitsprobe, KEINE WordPress-Installation; CMS, Backend und Redaktierbarkeit fehlen noch. Architektur ist ein One-Pager (Sektionen via Anker #leistungen/#aesthetik), nicht eine mehrseitige Site. Hero-/Feature-Bilder sind per onerror ausgeblendet (Z.33), Darstellung haengt von tatsaechlich vorhandenen assets/img/b-*.jpg ab.
- **Nächster Schritt:** In WordPress + Elementor Pro auf Hello-Theme produzieren (siehe WordPress-Umsetzung.md Z.9-22); Mockup als abnahmefaehige Spec nutzen, Bilder als WebP/AVIF einbinden und reale Praxisinhalte/Logo/Fotos ersetzen.

### ✅ **Erfüllt** — Eigenstaendige Longevity-Anamnesis-Seite (Konzept liegt vor) als zweiter Hauptliefergegenstand.
*Belegart: im Mockup demonstriert*

- **Beleg:** E:/Freelance/aurea-mockup/longevity-b.html ist eine eigene, voll ausgebaute Seite mit eigener URL und Breadcrumb (Z.35): Sub-Hero (Z.31-45), Intro-Feature 'Was die Longevity-Anamnese ist' (Z.47-56), vier Saeulen Hautanalyse/Lebensstil/Aesthetik/Langzeit (Z.58-88), 5-stufiger Ablauf inkl. Vorab-Fragebogen (Z.90-103), Mess-/Erfassungs-Raster mit 6 Karten (Z.105-121), Aerztin-Zitat (Z.123-129), FAQ-Akkordeon mit …
- **Lücke:** Inhaltlich/visuell vollstaendig, aber als statisches Mockup ohne WordPress-Backend. Einzelne Bilder per onerror ausgeblendet (Z.33, Z.49), Darstellung haengt von vorhandenen Assets ab.
- **Nächster Schritt:** Seite 1:1 in WordPress umsetzen; abklaeren, ob das vorliegende Praxis-Konzept zur Longevity-Anamnese zusaetzliche Pflicht-Inhalte/Module vorgibt, die noch eingearbeitet werden muessen.

### 🟡 **Teilweise** — ALLE Service-Seiten der Praxis (Leistungen je als eigene Seite).
*Belegart: im Mockup demonstriert*

- **Beleg:** Sechs Leistungen sind inhaltlich ausgearbeitet vorhanden: im Grid variante-b.html Z.55-60 (Medizinische Dermatologie, Hautkrebs-Vorsorge, Aesthetische Medizin, Laser-/Geraetetherapie, Longevity, Beratung) und mit Detailtexten (Lead, Bullet-Liste, Kostenhinweis) im SERVICES-Objekt assets/b-app.js Z.62-69. Geoeffnet werden sie als Detail-MODALS (variante-b.html Z.235-250, Trigger a.stretch[data-service] Z.86-88), …
- **Lücke:** Die Anforderung 'alle Service-Seiten' (eigene Seiten) ist mit Modals nur teilweise erfuellt: Die Links sind href='#' data-service (Z.55-60) ohne eigene URL, daher nicht deep-linkbar, nicht einzeln SEO-indexierbar, kein eigener Hero/Bild/Termin-Deep-Link je Leistung und weniger Platz fuer Tiefe. Zudem ist unklar, ob die 6 Leistungen das vollstaendige reale Leistungsspektrum der Praxis abbilden (frei erfundene …
- **Nächster Schritt:** In WordPress je Leistung eine eigene, indexierbare Seite (oder CPT 'Leistung') mit eigenem Hero, Bild, Meta-Title/Description und Termin-CTA anlegen; das Modal kann als Teaser auf der Startseite bleiben. Vor Angebot mit Auftraggeberin die reale, vollstaendige Leistungsliste abstimmen, damit 'ALLE' wirklich abgedeckt ist.

### 🟡 **Teilweise** — Longevity-Anamnesis-Seite inkl. mehrstufigem Fragebogen.
*Belegart: im Mockup demonstriert*

- **Beleg:** Der mehrstufige Fragebogen ist als UI gebaut und funktioniert clientseitig: 4 Schritte (Persoenliche Angaben; Haut & Gesundheit; Lebensstil & Ziele; Bestaetigung & Datenschutz) in longevity-b.html Z.131-240 mit Fortschritts-Dots (Z.143), Feldern, Selects, Checkbox-/Radio-Gruppen, zwei Consent-Checkboxen mit Link zur Datenschutzerklaerung (Z.230-231). Steuerung in assets/b-app.js Z.106-134: Weiter/Zurueck, …
- **Lücke:** Rein dekoratives Front-End: keine Pflichtfeld-/Format-Validierung, keine Conditional Logic, kein Absenden/Speichern, keine Verschluesselung. Gesundheitsdaten gelten nach CH-DSG als besonders schuetzenswert (Bewerbung.md Z.81) - der reale, sichere Datenpfad ist erst KONZEPTIONELL belegt (WordPress-Umsetzung.md Z.26: Gravity/Fluent Forms, verschluesselt), nicht demonstriert.
- **Nächster Schritt:** Fragebogen in WordPress mit Gravity Forms oder Fluent Forms umsetzen: Conditional Logic, Validierung, verschluesselte Uebertragung/Speicherung, zugriffsbeschraenkte Ablage statt Klartext-Mail; AVV/DPA und CH/EU-Hosting wie in den .md-Konzepten beschrieben verbindlich umsetzen.


## Premium-Anmutung, Design auf Basis CI, medizinische/Premium-Marken-Erfahrung

### ✅ **Erfüllt** — Die Website muss eine hochwertige, premium-orientierte Gesamtanmutung haben.
*Belegart: im Mockup demonstriert*

- **Beleg:** index.html + variante-b.html: Fraunces-Serifen-Display, Champagner-Gold-Akzent, viel Weissraum, Full-Bleed-Hero, durchgaengiges Eyebrow-System, Pull-Quotes und editoriale Service-Liste (b-serv 01-06). assets/style.css + style-b.css mit konsistentem Token-, Radius- und Shadow-System (--shadow-lg etc.). audit/REPORT.md: 0 Kontrastverstoesse, sauberes Responsive ueber 5 Breakpoints (360-1920).
- **Lücke:** Rein statisches HTML/CSS, kein WP-Build - Premium-Politur nur im Mockup belegt. Audit zeigt 2 Mikro-Maengel: ba-tag-Schrift 10.6px (<12px) in variante-b.html und +6px H-Overflow in datenschutz-b.html bei mobile-sm.
- **Nächster Schritt:** Die 2 Audit-Maengel beheben (Tag-Schrift >=12px, Overflow-Fix) und das Premium-Niveau im echten WP-Build via Elementor-Globals 1:1 reproduzieren; final mit echten Fotos statt KI-Bildern gegenpruefen.

### ✅ **Erfüllt** — Eigenstaendige Designkompetenz nachweisen (gestalterische Linie selbst entwickeln).
*Belegart: im Mockup demonstriert*

- **Beleg:** Zwei orthogonale, vollstaendig ausgearbeitete Richtungen mit getrennten Token-Systemen: Variante A 'Warm Editorial Luxury' (style.css :root --ivory #F7F3EC, hell, weich) vs. Variante B 'Noir Editorial' (style-b.css :root --noir #17130F, High-Contrast, Full-Bleed). Gemeinsame Marke/Schriften (Fraunces+Manrope), bewusst gegensaetzliche Interpretation; varianten.html als Konzeptvergleich/Top-Page mit Tags und …
- **Lücke:** Variante B explizit 'inspiriert von skinmed.ch' (varianten.html / README.md) - Anlehnung an einen Wettbewerber wird offengelegt. Beide Varianten fuer eine fiktive Marke, keine Iteration auf ein echtes Kunden-Briefing.
- **Nächster Schritt:** Im Erstgespraech beide Varianten als Richtungswahl praesentieren und auf Frau Muellers reale CI/Moodboard hin iterieren; den skinmed-Bezug aktiv als bewusste, eigenstaendige Umsetzung framen statt ihn nur zu erwaehnen.

### 🟡 **Teilweise** — Premium = conversion-orientierte Nutzerfuehrung, die zu qualifizierten Terminanfragen fuehrt.
*Belegart: im Mockup demonstriert*

- **Beleg:** index.html: klare CTA-Hierarchie (Sticky-Nav-CTA 'Termin anfragen', Hero-Doppel-CTA, wiederkehrende link-arrows, Final-CTA-Band), Trust-Signale (FMH, 15+ Jahre, Testimonials mit Sternen, FAQ). variante-b.html: 4-stufige Terminstrecke (Fachrichtung->Anliegen->Termin->Bestaetigung) inkl. 'diese Woche ausgebucht -> naechster freier Termin'. Bewerbung.md Z.20: 'messbar mehr qualifizierte Terminanfragen'.
- **Lücke:** Buchungsstrecke laeuft mit Mock-Logik (b-app.js), kein echtes Backend; 'messbar' ist ein Versprechen ohne Analytics-/A-B-Beleg. Tatsaechliche Conversion-Wirkung ist nicht belegt.
- **Nächster Schritt:** In WP an echtes Buchungssystem (Amelia/Bookly, siehe WordPress-Umsetzung.md) anbinden und DSG-konformes Ziel-/Event-Tracking fuer Anfragen einrichten, damit 'conversion-orientiert' tatsaechlich messbar wird.

### 🟡 **Teilweise** — Auf Basis vorhandener CI gestalten (Moodboard, Farben, Typografie, Bildsprache).
*Belegart: im Mockup demonstriert*  ·  ⚠️ in Prüfung herabgestuft

- **Beleg:** style.css :root definiert ein vollstaendiges, sauberes Token-System (Farbpalette, --serif/--sans, Fluid-Type-Scale --fs-h1..eyebrow, Spacing, Shadows). WordPress-Umsetzung.md mappt diese Tokens explizit auf Elementor Global Colors/Fonts - zeigt, dass eine CI strukturiert in ein System uebersetzbar ist.
- **Lücke:** Es gibt KEINE vorgegebene Kunden-CI - die AUREA-CI ist selbst erfunden. Belegt wird damit 'CI erstellen', nicht 'aus gegebener CI ableiten'. Zudem Inkonsistenz: Fonts werden via Google-CDN geladen (index.html/variante-b.html Z.8-10), waehrend Bewerbung.md/WordPress-Umsetzung.md lokal gehostete Fonts versprechen.
- **Nächster Schritt:** Sobald die Kunden-CI vorliegt, deren Farben/Typo/Bildsprache in die bestehenden Tokens uebernehmen; vor dem WP-Build die Google-Fonts durch lokal gehostete ersetzen, um das DSG-Font-Versprechen einzuhalten.
- **Prüf-Notiz:** Beleg existiert real und ist korrekt beschrieben. style.css :root (Z. 7-54) enthaelt tatsaechlich ein vollstaendiges, sauberes Token-System (Palette inkl. --gold/--ink/--ivory/--blush/--sage, --serif/--sans, Fluid-Scale --fs-eyebrow..--fs-display inkl. --fs-h1/h2, Spacing, Shadows) und es wird auch …

### 🟡 **Teilweise** — Stimmige, hochwertige Premium-Bildsprache.
*Belegart: im Mockup demonstriert*

- **Beleg:** 22 KI-generierte Markenbilder (assets/img, Gemini gemini-3-pro-image): kohaerentes Hero-/Leistungen-/Portrait-Set fuer Variante A und ein separates dunkles b-*-Set fuer Variante B, plus ausgerichtete Vorher/Nachher-Paare (ba-roetung/-pigment/-textur) fuer den Slider in variante-b.html.
- **Lücke:** KI-Platzhalter, keine echte Praxis-/Personenfotografie; Dateien tragen .jpg, enthalten aber PNG-Daten (README.md) und sind noch nicht WebP/AVIF; Text-ueber-Bild-Kontrast laut audit/REPORT.md nur manuell sichtgeprueft (10 Stellen index.html).
- **Nächster Schritt:** Fuer die Produktion echte Fotografie der Praxis/Aerztin beschaffen, Bilder zu WebP/AVIF konvertieren und den Text-ueber-Bild-Kontrast final verifizieren.

### 🟡 **Teilweise** — Erfahrung mit medizinischen oder Premium-Brands (von Vorteil).
*Belegart: im Mockup demonstriert*

- **Beleg:** Das Mockup selbst ist eine sektor-adaequate Premium-Dermatologie-Marke: standeskonforme, werbefreie Sprache ohne Heilversprechen (README.md/Bewerbung.md), FMH-Trust-Signale, durchdachte Longevity-Anamnese-Strecke. Bewerbung.md belegt zudem regulierte Umfelder (Pharma/GMP, KI-QA-Pipeline >99%) als Disziplin-Beleg.
- **Lücke:** Keine echte Referenz einer realisierten medizinischen/Premium-Web-Marke - die einzige 'Arbeitsprobe' ist dieses fiktive Mockup; die Referenzfelder in Bewerbung.md (Abschnitt 6) sind Platzhalter [Referenz...]. Pharma/GMP ist Engineering-Disziplin, kein Web-Brand-Beleg.
- **Nächster Schritt:** Echte Referenzen (Live-Sites, Kundennamen) nachreichen; falls nicht vorhanden, offensiv mit Mockup + nachgewiesenem Sektorverstaendnis + Compliance-Disziplin positionieren, statt die Referenzluecke zu kaschieren.


## WordPress-Architektur (Theme/Plugin) + Page-Builder-Empfehlung mit Begruendung

### ✅ **Erfüllt** — Eine klare Page-Builder-Empfehlung MIT Begruendung (Elementor o.ae.) liegt vor.
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md Abschnitt 3 (Z.55-66): explizite Empfehlung 'Elementor Pro' mit fuenf begruendeten Saeulen (Pflegbarkeit, Designtreue via Flexbox-/Grid-Container, Performance auf Hello-Basis, DSG/DSGVO, Zukunftssicherheit/Oekosystem). Zusaetzlich im Anschreiben lang (Z.24) und kurz (Z.45) konsistent wiederholt; WordPress-Umsetzung.md Z.10 nennt denselben Stack.
- **Lücke:** Begruendung bleibt generisch/marketingnah und ist nicht an die realen Mockup-Komponenten rueckgebunden (z.B. wie die Hero-Sektion als Container, der Multi-Step-Anamnesefluss oder der Vorher/Nachher-Slider konkret in Elementor abgebildet werden). Keine Lizenzkosten (Elementor Pro/Jahr) genannt.
- **Nächster Schritt:** Begruendung um zwei projektspezifische Belege erweitern: ein konkreter Bezug zum Mockup (z.B. Hero-Container-Aufbau) plus Nennung der jaehrlichen Pro-Lizenzkosten, damit die Empfehlung kalkulierbar statt nur plausibel wirkt.

### ✅ **Erfüllt** — Die Page-Builder-Wahl ist gegen Alternativen sachlich abgewogen (Begruendung der Auswahl, nicht nur Setzung).
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md Z.67-73: Tabelle mit drei abgewogenen Alternativen — Bricks ('technisch erstklassig', aber Laien-Pflege/Oekosystem schwaecher), Gutenberg/Native Blocks ('zukunftssicher, ressourcenschonend', aber fuer pixelgenaue Premium-Layouts heute weniger produktiv), Divi ('schwererer Output, Shortcode-Lock-in'). WordPress-Umsetzung.md Z.11 nennt Bricks/Block-Theme zusaetzlich als Performance-Alternative.
- **Lücke:** Die Bewertungen sind qualitativ und nicht durch Messwerte oder ein konkretes Projektszenario gestuetzt; die Aussage 'Container-Generation behebt den Schwergewicht-Ruf' wird behauptet, aber nicht mit Lighthouse-/CWV-Zahlen belegt.
- **Nächster Schritt:** Optional ein kurzes Entscheidungskriterium quantifizieren (z.B. Ziel-Lighthouse-Score, Pflege-Lernkurve fuer Praxispersonal), um die Abwaegung pruefbar statt nur plausibel zu machen.

### 🟡 **Teilweise** — Loesung ist auch fuer Nicht-Techniker bedienbar (selbststaendige Pflege ohne Layout-Zerstoerung).
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md Z.61: 'nicht-technisches Praxispersonal passt Texte, Bilder und Hinweise per Drag-and-drop an, ohne das Layout zu zerstoeren' — gestuetzt auf Theme-Builder, globale Schriften/Farben und wiederverwendbare Vorlagen. Anschreiben Z.24/45 wiederholt 'selbst pflegen' als Kernargument.
- **Lücke:** Reines Versprechen, kein Nachweis und im statischen Mockup auch nicht demonstrierbar. Es fehlt ein Governance-/Redaktionskonzept: Template-Locking, Rollen-/Rechtemodell (wer darf was), Schulungs-/Onboarding-Plan. 'Ohne Layout zu zerstoeren' bleibt unspezifiziert.
- **Nächster Schritt:** Einseitiges Redaktions-/Governance-Konzept ergaenzen (gelockte Elementor-Templates + globale Widgets, WP-Rollen fuer Praxispersonal, kurze Einfuehrung als Angebotsbestandteil), damit die Bedienbarkeit belegt statt nur behauptet ist.

### 🟡 **Teilweise** — Saubere Theme-Architektur: schlankes Theme, Design-System sauber uebertragbar, lokale Fonts.
*Belegart: konzeptionell belegt*

- **Beleg:** WordPress-Umsetzung.md Z.10 (Elementor Pro auf schlankem Hello-Theme), Z.12 (Fraunces/Manrope lokal gehostet statt Google-CDN), Z.17 (Design-Tokens :root -> Elementor Global Colors/Fonts + globales Custom-CSS). Demonstriert gestuetzt: style-b.css Z.7-35 enthaelt ein vollstaendiges :root-Token-System (Farben, --serif/--sans, Spacing, fluide Typo-Clamps), das die '1:1 als Global Colors/Fonts uebernehmbar'-Aussage …
- **Lücke:** Keine echte WP-Theme-Struktur vorhanden — kein Child-Theme, functions.php, enqueue-Strategie, Template-Hierarchie oder @font-face-Einbindung gezeigt. 'Hello-Theme' ist genannt, aber die saubere Architektur (Child-Theme vs. nur Custom-CSS, Asset-Enqueue, Versionierung) bleibt unskizziert. Der Mockup ist statisches HTML/CSS, keine Theme-Implementierung.
- **Nächster Schritt:** Kurze Architektur-Skizze nachreichen: Hello-Child-Theme, lokale Fonts via @font-face/wp_enqueue, explizites Mapping der vorhandenen :root-Tokens auf Elementor Global Settings — das macht 'sauber' nachvollziehbar statt als Schlagwort.

### 🟡 **Teilweise** — Saubere Plugin-Architektur: bewusst reduzierter, kuratierter Plugin-Einsatz fuer die interaktiven Funktionen.
*Belegart: konzeptionell belegt*

- **Beleg:** WordPress-Umsetzung.md Z.23-26 ordnet jeder interaktiven Komponente konkrete Plugin-Optionen zu — Vorher/Nachher-Slider (Elementor Image-Comparison-Widget bzw. Image-Compare-Plugin oder Custom-JS im HTML-Widget), Terminbuchung (Amelia/Bookly, alternativ Calendly/OnceHub oder Praxissoftware/AIS), Anamnese (Gravity Forms oder Fluent Forms mit Conditional Logic). Z.37 'wenige Plugins'; Bewerbung.md Z.93 'bewusst …
- **Lücke:** Die Auswahl bleibt offen ('oder'): keine je eine begruendete Festlegung (Amelia vs. Bookly, Gravity vs. Fluent), keine konsolidierte Plugin-Liste mit Lizenzkosten, DSG-Eignung und Update-/Wartungsstrategie. 'Saubere Architektur' ist als Prinzip benannt, aber nicht als wartbares Plugin-Set spezifiziert.
- **Nächster Schritt:** Kuratierte Plugin-Matrix erstellen (Funktion | empfohlenes Plugin | Begruendung | Lizenz/Kosten | DSG-Eignung | Wartung) mit jeweils einer klaren Empfehlung statt Optionsliste — das belegt die saubere, bewusst minimale Plugin-Architektur konkret.


## Performance-Optimierung + DSGVO/DSG-konforme Umsetzung

### ✅ **Erfüllt** — Rechtssichere Pflichtseite Impressum mit korrekten (berufs-)rechtlichen Angaben.
*Belegart: im Mockup demonstriert*

- **Beleg:** impressum-b.html: Betreiberin/Anschrift, Kontakt, berufsrechtliche Angaben (Faschaerztin FMH, Berufsausuebungsbewilligung Kanton Schwyz, Aufsicht Gesundheitsdepartement, MedBG/FMH-Standesordnung, L52-58), Haftung/Links/Urheberrecht, Hinweis auf KI-generierte Bilder ohne reale Personen (L67).
- **Lücke:** Bewusst fiktive Platzhalterangaben (L40); medizinrechtlich korrekt strukturiert, aber noch ohne echte Praxis-/Bewilligungsdaten.
- **Nächster Schritt:** Echte Praxisangaben, UID/Register- und Bewilligungsnummern einsetzen und vor Go-Live medizinrechtlich gegenpruefen lassen.

### ✅ **Erfüllt** — Expliziter Bezug zum revidierten Schweizer Datenschutzgesetz (revDSG) neben der DSGVO.
*Belegart: im Mockup demonstriert*

- **Beleg:** datenschutz-b.html L40 nennt das 'revidierte Schweizer Datenschutzgesetz (revDSG)' und ergaenzend die DSGVO; L43 verweist auf Bearbeitung 'im Sinne des revDSG'. longevity-b.html FAQ L253 nennt 'revDSG/DSGVO' im Umgang mit Anamnesedaten. Bewerbung.md/WordPress-Umsetzung.md durchgehend 'DSG/DSGVO'.
- **Lücke:** Korrekt referenziert; keine inhaltliche Luecke. Lediglich Stand/Datierung (L84 'Stand: 2026') bei realer Umsetzung pflegen.
- **Nächster Schritt:** Beibehalten; im Live-Text Stand-Datum und ggf. Verweis auf konkrete revDSG-Artikel/Verordnung (DSV) ergaenzen.

### 🟡 **Teilweise** — Performance durch schlanke Theme-/Code-Basis und reduzierten Ballast.
*Belegart: im Mockup demonstriert*

- **Beleg:** assets/style-b.css = 33 KB, assets/b-app.js = 19.5 KB; handgeschriebenes CSS mit :root-Design-Tokens, kein schweres Framework/keine Render-Blocking-Library. WordPress-Umsetzung.md L36 ('CSS bewusst schlank') deckt sich mit dem Artefakt.
- **Lücke:** Belegt nur die statische Arbeitsprobe. Die eigentliche Performance-Disziplin (Hello-Theme, wenige Plugins, kritisches CSS) ist im WP-Build noch nicht real; ein statisches Mockup ist kein WordPress-Site-Beweis.
- **Nächster Schritt:** Auf WP-Staging mit Hello-Theme + Elementor Pro aufbauen und Lighthouse/PageSpeed-Werte (LCP/CLS/INP) als Nachweis dokumentieren.

### 🟡 **Teilweise** — Grüne Core Web Vitals via Caching, CDN, Minifizierung und performantem CH/EU-Hosting.
*Belegart: konzeptionell belegt*  ·  ⚠️ in Prüfung herabgestuft

- **Beleg:** Bewerbung.md §5 (L88-95) nennt CWV als verbindliche Zielvorgabe, Server-/Seiten-Caching, CDN, Minifizierung/Bündelung, SSD/NVMe, aktuelles PHP, HTTP/2-3. audit/REPORT.md belegt 0 Overflow auf den meisten Viewports (Responsive stabil).
- **Lücke:** Keine gemessenen Lighthouse-/PageSpeed-Zahlen, kein reales Hosting/Caching vorhanden — alles Versprechen, im statischen Mockup nicht verifizierbar.
- **Nächster Schritt:** Vor/nach dem WP-Build konkrete CWV-Messwerte (Feld + Labor) als Referenz liefern und Caching-/Hosting-Stack benennen (z. B. Infomaniak CH + Performance-Plugin).
- **Prüf-Notiz:** Beleg 1 (Bewerbung.md §5, L88-95) existiert exakt wie zitiert: ein als "Performance-Konzept (Kurz)" überschriebener Abschnitt mit CWV als Zielvorgabe, Server-/Seiten-Caching, CDN, Minifizierung/Bündelung, Lazy-Loading, WebP/AVIF und SSD/NVMe + aktuellem PHP + HTTP/2-3, CH/EU-Standort. Das ist ein …

### 🟡 **Teilweise** — Rechtssichere Datenschutzerklaerung nach CH-DSG/DSGVO inkl. Hinweisen zu Formular- und Gesundheitsdaten.
*Belegart: im Mockup demonstriert*  ·  ⚠️ in Prüfung herabgestuft

- **Beleg:** datenschutz-b.html: 12 strukturierte Abschnitte — verantwortliche Stelle, Gesundheitsdaten ausdruecklich als 'besonders schützenswerte Personendaten' (L50), Zwecke/Rechtsgrundlagen, Formular-Hinweis 'im Mockup keine Daten' + spaeter TLS/CH-EU (L61), Cookies/Consent-Banner (L64), Hosting CH/EU + AVV (L67), Betroffenenrechte (L76), Datensicherheit/TLS (L79). lang='de-CH', robots noindex.
- **Lücke:** Selbst als 'gestalterischer Platzhaltertext' deklariert (L40), rechtlich nicht geprueft, fiktive Praxisdaten. Inhaltlich solide, aber keine verbindliche Rechtsgrundlage.
- **Nächster Schritt:** Im echten Projekt durch eine juristisch geprüfte, praxisspezifische Datenschutzerklaerung ersetzen und den realen Stack (Hoster, Formular-/Buchungssystem, Consent-Tool) konkret benennen.
- **Prüf-Notiz:** Beleg existiert und jede zitierte Stelle stimmt exakt: datenschutz-b.html hat 12 Abschnitte (h2 1-12, L42-82), lang="de-CH" (L2), noindex (L8), verantwortliche Stelle (L42-45), Gesundheitsdaten ausdruecklich als "besonders schuetzenswerte Personendaten" (L50), Zwecke/Rechtsgrundlagen (L54-58), …

### 🟡 **Teilweise** — Datensparsame Formulare mit Consent-Hinweis und sicherer Verarbeitung von Gesundheits-/Anamnesedaten.
*Belegart: im Mockup demonstriert*

- **Beleg:** longevity-b.html L230-231: zwei Consent-Checkboxen — eine mit Link zur Datenschutzerklaerung ('gelesen und willige ein'), eine zur Kontaktaufnahme. FAQ L253 erklaert vertrauliche Verarbeitung. datenschutz-b.html §5 stellt klar, dass im Mockup keine Daten uebertragen werden, produktiv per TLS/CH-EU.
- **Lücke:** Checkboxen sind im statischen Mockup nicht als 'required' erzwungen und ohne echte verschluesselte Uebertragung/Backend. Datensparsamkeit ist als Anspruch (Bewerbung.md §4) formuliert, aber nicht funktional verifizierbar.
- **Nächster Schritt:** Im WP-Build Pflicht-Consent (required) im Multi-Step-Formular (Fluent/Gravity Forms), TLS-Uebertragung, CH/EU-Speicherung und Zugriffsbeschraenkung statt Klartext-Mail technisch umsetzen.

### 🟡 **Teilweise** — Consent-Management: nur technisch notwendige Cookies vorab, Analytics/Marketing erst nach aktiver Einwilligung.
*Belegart: konzeptionell belegt*

- **Beleg:** datenschutz-b.html §6 (L64) und Bewerbung.md §4 (L80) beschreiben Consent-Banner, cookielose/IP-anonymisierende Loesung und Opt-in vor Tracking.
- **Lücke:** Im Mockup ist kein funktionierender Consent-/Cookie-Banner implementiert (Grep ueber HTML: nur Beschreibung im Text, keine Banner-UI/-Logik). Reine Absichtserklaerung.
- **Nächster Schritt:** Consent-Tool (z. B. Complianz, Borlabs Cookie) im WordPress integrieren, das Skripte erst nach Opt-in laedt; im Mockup zumindest eine Banner-Komponente als Beleg ergaenzen.

### 🟡 **Teilweise** — Barrierefreiheit/WCAG-Konformitaet als Qualitaets- und Performance-Begleitanforderung.
*Belegart: im Mockup demonstriert*

- **Beleg:** audit/REPORT.md: 0 Kontrastverstoesse ueber alle Seiten/Viewports, 0 zu kleine Controls; ARIA im Markup (aria-label Menue/Service-Links, aria-expanded an FAQ-Buttons). ABER: 1 H-Overflow auf datenschutz-b.html mobile-sm 360px (+6px), 2 Schriften <12px auf variante-b.html (ba-tag 'Vorher/Nachher' 10.6px), und 'Text auf Bild' ist laut Report nur manuell sichtgeprueft (10 Stellen index.html).
- **Lücke:** Automatischer Audit ist kein vollstaendiger WCAG-Audit: Tastatur-/Screenreader-Tests, Fokus-Sichtbarkeit und Kontrast von Text ueber Hero-Bildern sind nicht maschinell verifiziert; kleinere reale Maengel (Overflow, Kleinschrift) offen.
- **Nächster Schritt:** Mobile-sm-Overflow der Datenschutzseite fixen, Tag-Schrift auf >=12px anheben, Text-auf-Bild-Kontrast manuell pruefen und einen Tastatur-/AT-Durchlauf (NVDA/VoiceOver) ergaenzen.

### ⬜ **Offen** — Bildoptimierung (moderne Formate WebP/AVIF, Lazy-Loading, responsive Groessen) bei bildlastiger Premium-Aesthetik.
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md L92-94 verspricht WebP/AVIF, responsive Groessen, Lazy-Loading. Das Mockup tut jedoch das Gegenteil: assets/img/ enthaelt ausschliesslich JPGs mit 600-757 KB; variante-b.html laedt Hero + 2 Features + 2 Vorher/Nachher + Arzt-Bild = ~4.7 MB/Seite. Kein loading="lazy", kein srcset, keine width/height-Attribute (img-Tags in variante-b.html L33/66/77/100/101/121).
- **Lücke:** Der demonstrierte Artefakt widerspricht dem eigenen Performance-Konzept. Fehlende width/height erzeugen CLS-Risiko; fehlendes Lazy-Loading und JPG-only verschlechtern LCP/Transfer.
- **Nächster Schritt:** Bilder zu WebP/AVIF konvertieren, loading="lazy" (ausser LCP-Hero), srcset/sizes und explizite width/height ergaenzen — schon im Mockup, damit Anspruch und Beleg uebereinstimmen.

### ⬜ **Offen** — Lokale Einbindung von Schriften statt externer CDN-Abrufe (Performance: render-blocking; DSG: keine Datenuebermittlung an Google).
*Belegart: offen*

- **Beleg:** Bewerbung.md L80 ('lokale Einbindung von Schriften ... statt externer CDN-Abrufe (z. B. Google Fonts)') und WordPress-Umsetzung.md L12 ('Schriften lokal gehostet statt Google-CDN') versprechen Self-Hosting. ALLE HTML-Dateien laden Fraunces+Manrope jedoch von fonts.googleapis.com/fonts.gstatic.com — inklusive der Rechtsseiten datenschutz-b.html L9-11 und impressum-b.html L9-11 (auch variante-b.html L8-10).
- **Lücke:** Direkter Widerspruch zwischen Versprechen und Beleg: Der Google-CDN-Abruf uebermittelt IP-Daten an einen Drittstaat-Dienst (DSG/DSGVO-relevant, vgl. das bekannte Google-Fonts-Abmahnthema) und ist zugleich render-blocking. Besonders heikel, dass selbst die Datenschutz-Seite diesen Abruf macht.
- **Nächster Schritt:** Fonts als woff2 self-hosten (font-display: swap, preload des Hero-Fonts), preconnect zu Google entfernen — bereits im Mockup, da es die zentrale DSG-/Perf-Aussage glaubwuerdig macht.

### ⬜ **Offen** — TLS-Verschluesselung, CH/EU-Hosting und Auftragsverarbeitungsvertraege (AVV/DPA) inkl. Verarbeitungsverzeichnis.
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md §4 (L79-83) und WordPress-Umsetzung.md L30-32 fordern CH/EU-Hosting, durchgaengiges TLS, AVV mit allen Diensten, dokumentiertes Verarbeitungsverzeichnis. datenschutz-b.html §7/§11 spiegeln dies.
- **Lücke:** Nicht demonstrierbar in einer statischen HTML/CSS-Arbeitsprobe (kein Server, kein Hoster, kein Vertragswerk). Vollstaendig im Konzept, null im Artefakt.
- **Nächster Schritt:** Bei Umsetzung: CH/EU-Hoster mit TLS auswaehlen, AVV mit Hoster + Formular-/Buchungssystem abschliessen und ein Verarbeitungsverzeichnis als Liefernachweis erstellen.


## Optionale Projektphasen & Skills (Shop/WooCommerce, Mitgliederbereich)

### 🟡 **Teilweise** — Shop-Funktionalität (Produkte, Pakete, Gutscheine, WooCommerce) ist als optionale spätere Phase zumindest konzeptionell erwähnt/eingeordnet.
*Belegart: konzeptionell belegt*

- **Beleg:** README.md Z. 76 (Abschnitt 'Von Mockup zu WordPress') nennt ausdrücklich: 'Optionale Phasen laut Ausschreibung: WooCommerce-Shop, Mitgliederbereich.' Bewerbung.md Abschnitt 6 bietet generisch 'für klar definierte Phasen gerne ein faires Pauschalangebot'.
- **Lücke:** Reine Begriffsnennung ohne jede Ausarbeitung: keine Begründung WooCommerce vs. Shopify, kein Konzept für Produkte/Pakete/Gutscheine (Bundle-/Gift-Card-Handling), keine CH-Zahlungs-/MWST-/DSG-Aspekte für Zahlungsdaten, nicht im Mockup gebaut. Im eigentlichen client-seitigen Anschreiben (Bewerbung.md) taucht der Shop gar nicht auf — die Nennung steht nur im internen README.
- **Nächster Schritt:** In Bewerbung.md einen kurzen Absatz 'Optionale Phase: Shop' ergänzen: WooCommerce empfehlen (Begründung ggü. Shopify wegen WP-Integration/CH), Produkte/Pakete als Variations-/Bundle-Produkte, Gutscheine via WooCommerce-Gutscheine bzw. Gift-Card-Plugin, CH-Zahlung (Stripe/Datatrans/TWINT), MWST und DSG für Zahlungsdaten kurz skizzieren.

### 🟡 **Teilweise** — Mitgliederbereich mit geschütztem Zugang ist als optionale spätere Phase zumindest konzeptionell erwähnt/eingeordnet.
*Belegart: konzeptionell belegt*

- **Beleg:** README.md Z. 76 nennt 'Mitgliederbereich' als optionale Phase. WordPress-Umsetzung.md Z. 25/32 beschreibt einen 'zugriffsbeschränkten, verschlüsselten Kanal' für Anamnese-/Buchungsdaten — angrenzend an Zugriffsschutz, aber explizit kein Mitgliederbereich.
- **Lücke:** Kein Plugin benannt (MemberPress / Restrict Content Pro / WooCommerce Memberships fehlen komplett), kein Konzept für Zugangsstufen, Login, geschützte Inhalte oder Mitglieder-Onboarding; DSG für Mitgliederdaten nicht adressiert; nicht gebaut; im Anschreiben nicht erwähnt.
- **Nächster Schritt:** Kurzkonzept ergänzen: z. B. MemberPress oder — bei späterem Shop — WooCommerce Memberships (Synergie mit WooCommerce) mit Begründung empfehlen, Zugangsstufen/geschützte Inhalte definieren, Login-UX an die Premium-CI angleichen, DSG für Mitglieder-/Gesundheitsdaten im geschützten Bereich benennen.

### 🟡 **Teilweise** — Optionale spätere Phasen und laufende Betreuung sind grundsätzlich als Phasenmodell/Honorar pro Phase eingeordnet (Rahmen der Ausschreibung).
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md Abschnitt 6 nennt 'erste Phase (Hauptwebsite + Longevity-Anamnese-Seite)' und bietet 'für klar definierte Phasen gerne ein faires Pauschalangebot'. WordPress-Umsetzung.md Z. 46 rahmt das Mockup als 'abnahmefähige Vorlage' für einen phasenweisen Build.
- **Lücke:** Das Phasenmodell bleibt allgemein; die konkreten optionalen Phasen (Shop, Mitgliederbereich) sind nicht als eigene Bau-/Honorar-Pakete ausgewiesen, und 'laufende Betreuung/Wartung' (laut Ausschreibung optional) wird nirgends explizit angeboten.
- **Nächster Schritt:** In Bewerbung.md eine knappe Roadmap ergänzen (Phase 1 Hauptsite+Longevity, Phase 2 Shop, Phase 3 Mitgliederbereich) plus optionales Wartungs-/Betreuungspaket — macht das Phasendenken explizit und direkt anschlussfähig an die optionalen Phasen der Ausschreibung.

### ⬜ **Offen** — Nachgewiesene E-Commerce-Kompetenz (WooCommerce/Shopify) als optionaler Skill für die spätere Shop-Phase.
*Belegart: offen*

- **Beleg:** Keine Projektdatei belegt E-Commerce-Erfahrung. WooCommerce wird nur in README.md Z. 76 als Auftrags-Phase genannt, nicht als eigene Referenz; weder im Mockup (index.html/variante-b.html) noch in Bewerbung.md/WordPress-Umsetzung.md wird WooCommerce-/Shopify-Praxis dargestellt.
- **Lücke:** Skill ist weder demonstriert (kein Shop/Warenkorb/Checkout im Mockup) noch konzeptionell substanziiert noch durch eine Referenz belegt. Eine Begriffsnennung ist kein Kompetenznachweis; die Bewerbung positioniert sich sogar bewusst als 'kein Massen-WordPress-Anbieter'.
- **Nächster Schritt:** Sofern vorhanden, eine konkrete WooCommerce-/Shop-Referenz oder eine knappe Erläuterung der eigenen E-Commerce-Erfahrung in Bewerbung.md (Abschnitt 6/Referenzen) ergänzen; andernfalls die Shop-Phase ehrlich als planbar/aufbaubar deklarieren, statt implizit Routine zu suggerieren.

### ⬜ **Offen** — Nachgewiesene Kompetenz für Mitgliederbereich-Plugins (MemberPress, Restrict Content Pro, WooCommerce Memberships) als optionaler Skill.
*Belegart: offen*

- **Beleg:** Keine der in der Ausschreibung genannten Lösungen wird irgendwo aufgegriffen; einzig der generische Begriff 'Mitgliederbereich' steht in README.md Z. 76. (Die 'Mitglied'-Treffer in index.html/variante-b.html beziehen sich auf die Fachgesellschafts-Mitgliedschaft der Ärztin und sind irrelevant.)
- **Lücke:** Weder demonstriert noch durch Konzept oder Referenz belegt; die explizit erwünschten Plugins (MemberPress/RCP/Woo Memberships) werden nicht einmal namentlich abgewogen.
- **Nächster Schritt:** Eine kurze Plugin-Abwägung (MemberPress vs. Restrict Content Pro vs. WooCommerce Memberships) mit Begründung ergänzen — analog zur bereits starken Elementor-Einschätzung in Bewerbung.md Abschnitt 3; das überträgt dasselbe Beratungsniveau auf die optionale Phase.


## Bewerbungsunterlagen (Portfolio, Page-Builder-Einschaetzung, Referenzen, Verfuegbarkeit)

### ✅ **Erfüllt** — Kurze Einschaetzung zur Page-Builder-Wahl mit Begruendung liefern.
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md Abschnitt 3 (Z.55-73): klare Empfehlung Elementor Pro mit fuenf begruendeten Kriterien (Pflegbarkeit fuer Laien, Designtreue via Flexbox/Grid-Container, Performance, DSG/DSGVO, Zukunftssicherheit) plus sachlich abgewogene Alternativtabelle (Bricks, Gutenberg/Native Blocks, Divi). Konsistent gespiegelt in der Kurzfassung Z.45 und in WordPress-Umsetzung.md Z.10-11. Adressiert exakt die geforderte …
- **Lücke:** Rein textuell/versprochen, nicht an einer echten WP-Installation gemessen (z.B. die Behauptung 'gruene Core Web Vitals'). Bezug zu den optionalen Shop-/Mitglieder-Phasen fehlt in der Builder-Begruendung; kein Mengengeruest-Argument (Anzahl Service-Seiten).
- **Nächster Schritt:** Abschnitt so uebernehmen. Optional einen Satz zur Phasen-Skalierung ergaenzen (Elementor + WooCommerce bzw. MemberPress/Restrict Content Pro), damit die Builder-Wahl auch die optionalen Phasen der Ausschreibung sichtbar abdeckt.

### 🟡 **Teilweise** — Portfolio vergleichbarer Projekte beilegen, idealerweise aus Medizin/Beauty/Premium.
*Belegart: im Mockup demonstriert*

- **Beleg:** Bewerbung.md Z.103 bietet den eigens gebauten AUREA-Entwurf als 'sofortige Arbeitsprobe inkl. Longevity-Anamnese-Seite'. Die Domainkompetenz ist real gebaut (README.md Z.11-14, index.html, longevity.html, variante-b.html: Premium-Derma-Design, zwei Designvarianten Warm/Noir). Z.103 raeumt aber selbst ein: 'Ich bin bewusst kein Massen-WordPress-Anbieter mit Dutzenden Referenzen'.
- **Lücke:** Kein einziges real ausgeliefertes Kundenprojekt aus Medizin/Beauty/Premium belegt. Das Mockup ist selbst-initiierte Spec-/Konzeptarbeit (README.md Z.6-8: 'frei erfunden', KI-Bilder), kein bezahltes Referenzprojekt. Die im Anschreiben genannte KI-QA-Pipeline (AKTEDIGITAL) ist LLM/OCR/Dokumenten-Engineering, kein Webdesign-Portfolio. Damit fehlt der Kern dessen, was die Ausschreibung unter 'Portfolio vergleichbarer …
- **Nächster Schritt:** Mockup als klar deklarierte Konzept-Arbeitsprobe positionieren (das ist die echte Staerke) UND mindestens 1-2 reale Web-/Designnachweise ergaenzen; falls keine existieren, ehrlich so benennen und AKTEDIGITAL gezielt als Engineering-/Datenschutz-Beleg framen. Mockup als gehostete Live-Demo verlinken statt nur als Screenshot, damit aus der Arbeitsprobe ein klickbares Portfolio-Stueck wird.

### 🟡 **Teilweise** — Verfuegbarkeit angeben, passend zum Projektstart 7/2026.
*Belegart: konzeptionell belegt*

- **Beleg:** Bewerbung.md bestaetigt grundsaetzliche Passung: Z.26/Z.47 'der geplante Start im Juli 2026 passt gut', 100% Remote ist Standard, CH-ansaessig (Gordola TI). Z.101: erste Phase (Hauptwebsite + Longevity-Anamnese) 'zeitnah umsetzbar'. Honorar-Richtwert CHF 110/h ist mitgenannt (Z.102).
- **Lücke:** Das konkrete Verfuegbarkeitsdatum ist Platzhalter: Z.26 '[Verfuegbarkeit: ab …]', Z.101 '[Start: ab …]'. Keine Wochenkapazitaet (h/Woche) angegeben, was bei Freelance-Auslastung fuer die Planung relevant ist.
- **Nächster Schritt:** Konkretes Startdatum und verfuegbare Wochenstunden eintragen (z.B. 'ab 01.07.2026, X h/Woche'). Platzhalter Z.26 und Z.101 vor Versand fuellen (Checkliste Z.108).

### ⬜ **Offen** — Referenzen angeben.
*Belegart: offen*

- **Beleg:** Bewerbung.md Z.103 enthaelt ausschliesslich Platzhalter: '[Referenz: Projekt/Kunde …]', '[Referenz: Link/Live-Site …]'. Checkliste Z.110: '[Referenz …] ergaenzt oder bewusst weggelassen' ist noch offen. Keine einzige konkrete Referenz benannt.
- **Lücke:** Keine kontaktierbare Referenz (Kunde, Live-Site, Ansprechperson) hinterlegt. Der AKTEDIGITAL-Partner ist im Anschreiben (Z.22) nur als Pipeline-Erwaehnung vorhanden, nicht als zitierfaehige Referenz mit Kontakt. Offene [...] direkt im sendefertigen Dokument.
- **Nächster Schritt:** Mindestens eine kontaktierbare Referenz eintragen (z.B. AKTEDIGITAL-Partner Maksym Vovk als Engineering-/Datenschutz-Referenz) ODER die Platzhalter bewusst entfernen und ehrlich 'Referenzen gerne auf Anfrage' formulieren. Keinesfalls mit offenen [...] versenden (vgl. Warnhinweis Z.7-8).

### ⬜ **Offen** — Vollstaendige, sendefertige Bewerbung ohne offene Platzhalter (insb. Kontaktdaten).
*Belegart: offen*

- **Beleg:** Bewerbung.md Z.33 '[Kontakt: Telefon / E-Mail]' und Z.51 '[Kontakt]' sind unausgefuellt; Checkliste Z.109 offen. Eigener Warnhinweis Z.7-8: 'Vor dem Versenden … Nichts Unausgefuelltes verschicken.'
- **Lücke:** Telefon/E-Mail fehlen im Anschreiben; mehrere offene [...] (Kontakt, Verfuegbarkeit, Referenz) blockieren den Direktversand. Mockup-Screenshots/Live-Link (Checkliste Z.111) noch nicht beigelegt.
- **Nächster Schritt:** Kontaktdaten einsetzen (E-Mail office@swissconsultdigital.ch + Telefon) und die gesamte Pre-Send-Checkliste Z.108-112 abarbeiten, inkl. Beilage von Mockup-Screenshots/PDF oder Live-Link, bevor die Bewerbung rausgeht.


---

## Offene Punkte vor Angebotsabgabe (7)

- **Bildoptimierung (moderne Formate WebP/AVIF, Lazy-Loading, responsive Groessen) bei bildlastiger Premium-Aesthetik.** → Bilder zu WebP/AVIF konvertieren, loading="lazy" (ausser LCP-Hero), srcset/sizes und explizite width/height ergaenzen — schon im Mockup, damit Anspruch und Beleg uebereinstimmen.
- **Lokale Einbindung von Schriften statt externer CDN-Abrufe (Performance: render-blocking; DSG: keine Datenuebermittlung an Google).** → Fonts als woff2 self-hosten (font-display: swap, preload des Hero-Fonts), preconnect zu Google entfernen — bereits im Mockup, da es die zentrale DSG-/Perf-Aussage glaubwuerdig macht.
- **TLS-Verschluesselung, CH/EU-Hosting und Auftragsverarbeitungsvertraege (AVV/DPA) inkl. Verarbeitungsverzeichnis.** → Bei Umsetzung: CH/EU-Hoster mit TLS auswaehlen, AVV mit Hoster + Formular-/Buchungssystem abschliessen und ein Verarbeitungsverzeichnis als Liefernachweis erstellen.
- **Nachgewiesene E-Commerce-Kompetenz (WooCommerce/Shopify) als optionaler Skill für die spätere Shop-Phase.** → Sofern vorhanden, eine konkrete WooCommerce-/Shop-Referenz oder eine knappe Erläuterung der eigenen E-Commerce-Erfahrung in Bewerbung.md (Abschnitt 6/Referenzen) ergänzen; andernfalls die Shop-Phase ehrlich als planbar/aufbaubar …
- **Nachgewiesene Kompetenz für Mitgliederbereich-Plugins (MemberPress, Restrict Content Pro, WooCommerce Memberships) als optionaler Skill.** → Eine kurze Plugin-Abwägung (MemberPress vs. Restrict Content Pro vs. WooCommerce Memberships) mit Begründung ergänzen — analog zur bereits starken Elementor-Einschätzung in Bewerbung.md Abschnitt 3; das überträgt dasselbe Beratungsniveau …
- **Referenzen angeben.** → Mindestens eine kontaktierbare Referenz eintragen (z.B. AKTEDIGITAL-Partner Maksym Vovk als Engineering-/Datenschutz-Referenz) ODER die Platzhalter bewusst entfernen und ehrlich 'Referenzen gerne auf Anfrage' formulieren. Keinesfalls mit …
- **Vollstaendige, sendefertige Bewerbung ohne offene Platzhalter (insb. Kontaktdaten).** → Kontaktdaten einsetzen (E-Mail office@swissconsultdigital.ch + Telefon) und die gesamte Pre-Send-Checkliste Z.108-112 abarbeiten, inkl. Beilage von Mockup-Screenshots/PDF oder Live-Link, bevor die Bewerbung rausgeht.
