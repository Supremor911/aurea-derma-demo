# AUREA — Premium-Website-Mockup (Konzept-Entwurf)

Arbeitsprobe für die Ausschreibung **„Aufbau einer hochwertigen WordPress-Website für eine Dermatologin"** (freelancermap #3014281).
Gestaltung & Umsetzung: **Gabriel Jäger / Swiss Consult Digital**.

> **AUREA, Dr. med. Carla Brunner und alle Inhalte sind frei erfunden.** Es handelt sich um
> einen gestalterischen Konzept-Entwurf, nicht um eine reale Praxis. Bilder sind KI-generiert.

## Inhalt

| Datei | Beschreibung |
|---|---|
| `index.html` | **Startseite** (One-Pager): Hero, Leistungen, Longevity-Teaser, Ärztin/Praxis, Ablauf, Stimmen, FAQ, Kontakt |
| `longevity.html` | **Longevity-Anamnese-Seite** mit mehrstufigem, interaktivem Fragebogen |
| `assets/style.css` | Komplettes Design-System (Farben, Typografie, Komponenten, responsiv) |
| `assets/app.js` | Interaktionen: Sticky-Nav, mobiles Menü, FAQ-Akkordeon, Scroll-Reveal, Multi-Step-Formular |
| `assets/img/` | 10 KI-generierte Markenbilder (Gemini `gemini-3-pro-image`) |
| `Bewerbung.md` | Anschreiben (lang + kurz), Page-Builder-Einschätzung, DSG/DSGVO- & Performance-Konzept |

## Ansehen

Einfach **`index.html` im Browser öffnen** (Doppelklick). Es wird kein Server benötigt.
Mobil-Ansicht: Fenster schmaler ziehen oder DevTools-Geräteansicht.

## Dokumentation & Unterlagen

| Dokument | Inhalt |
|---|---|
| **`DOKUMENTATION.md`** | **Master-Projektdokumentation** — Überblick über alles (Einstiegspunkt) |
| `Bewerbung.md` | Anschreiben + Page-Builder-/DSG-/Performance-Konzept |
| `WordPress-Umsetzung.md` | Machbarkeit: Übertragbarkeit Mockup → WordPress (Was/Warum) |
| **`WP-AUFBAU-PLAN.md`** | **Konkreter Bau-Runbook** (Wie) — Umgebung, Phasen, Plugins, Go-Live |
| `audit/AUSSCHREIBUNG_ABGLEICH.md` | Anforderungsabgleich gegen die Ausschreibung (9/20/7) |
| `audit/REPORT.md` · `audit/HIG_REPORT.md` | WCAG/Responsive-Audit · Apple-HIG-Review |

## Design-Konzept

- **Positionierung:** Premium-Dermatologie + ästhetische Medizin + Longevity. Vertrauen vor Hype, conversion-orientiert.
- **Farbwelt:** warmes Elfenbein, tiefes Waldgrün-Anthrazit, Champagner-Gold-Akzent, Blush.
- **Typografie:** *Fraunces* (elegante Serife, Headlines) + *Manrope* (klare Sans, Text/UI).
- **Sprache:** Deutsch, durchgehend **Schweizer Rechtschreibung** (kein „ß").
- **Conversion:** klare CTA-Hierarchie („Termin anfragen"), schlanke Anamnese-Strecke, Trust-Signale.
- **Compliance-bewusst:** sachliche, standeskonforme Formulierungen, keine Heilversprechen/Garantien.

## Bilder neu generieren (optional)

Die Bilder wurden über die Gemini-API erzeugt. Skript & Prompt-Spezifikation:
`…/scratchpad/gemini.py` + `imgspec.json` (API-Key aus `E:\Freelance\.env`).

```bash
python gemini.py batch imgspec.json "E:/Freelance/aurea-mockup/assets/img" gemini-3-pro-image
```

> Hinweis: Die Dateien tragen die Endung `.jpg`, enthalten technisch PNG-Daten – im Browser
> ohne Probleme. Für einen echten WordPress-Build würden sie nach WebP/AVIF konvertiert.

## Designvarianten

`varianten.html` ist die **Top-Page**, die auf die Designvarianten zeigt:
- **Variante A — „Warm Editorial Luxury"** (`index.html` + `longevity.html`, `assets/style.css`): warmes Elfenbein/Gold, weich, vertrauensbildend.
- **Variante B — „Noir Editorial"** (`variante-b.html` + `longevity-b.html` + `datenschutz-b.html` + `impressum-b.html`, `assets/style-b.css`, `assets/b-app.js`): dunkle, plakative Fashion-Magazin-Anmutung mit grossen High-Contrast-Serifen und Full-Bleed-Fotografie. Inspiriert von skinmed.ch (eigenständig umgesetzt), Champagner-Gold als Marken-Faden zu A. Eigene KI-Bilder (`assets/img/b-*.jpg`). **In sich geschlossen:** alle Links inkl. Longevity-Anamnese, Leistungs-Detail-Modals, Vorher/Nachher-Slider, Termin-Buchungstool und Rechtstexte (DSG/DSGVO) sind im selben Stil umgesetzt — keine Stilbrüche, keine toten Links.

Beide Varianten teilen Marke, Inhalte und Schriftfamilien (Fraunces + Manrope), interpretieren sie aber bewusst gegensätzlich.

> **Variante B ist die Variante, mit der wir an die Kundin herantreten** — entsprechend durchgängig konsistent gehalten.

## Qualitätssicherung — wiederholbares Audit (jede Iteration)

```bash
python audit/audit.py            # WCAG-Kontrast + Responsive + Tap-Targets + Screenshots
```
Prüft automatisch über alle Breakpoints (360 / 390 / 768 / 1440 / 1920):
- **WCAG-AA-Kontrast** (DOM-Walk, kompositiert Transparenzen; Text über Bildern → manuelle Liste),
- **horizontaler Overflow** je Viewport,
- **Tap-Target-Grössen** (≥44px für Controls),
- **Mindest-Schriftgrösse**.
Ausgabe: `audit/REPORT.md`, `audit/report.json`, Screenshots in `audit/shots/`.

```bash
# Apple-HIG-Design-Review (Multi-Agent, qualitativ) — in Claude Code:
#   Workflow({ scriptPath: "E:/Freelance/aurea-mockup/audit/hig_review.js" })
```
Ergebnis: `audit/HIG_REPORT.md` (priorisierte Befunde P0/P1/P2 + Scoreboard).

## Von Mockup zu WordPress (nächster Schritt im Projekt)

Statisches Premium-Mockup → Umsetzung in **WordPress + Elementor Pro** auf schlankem
Hello-Theme, DSG/DSGVO-konform (CH/EU-Hosting, lokale Fonts, Consent), Core-Web-Vitals-optimiert.
Optionale Phasen laut Ausschreibung: WooCommerce-Shop, Mitgliederbereich.
