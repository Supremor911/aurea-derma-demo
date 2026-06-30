# AUREA — Projektdokumentation

**Bewerbungs-Arbeitsprobe & Konzept zur Ausschreibung freelancermap #3014281**
„Aufbau einer hochwertigen WordPress-Website für eine Dermatologin"

Auftraggeberin: **WE FRANCHISE GmbH** (Ansprechperson Ellen Müller), Schwyz · 100 % Remote · Start 7/2026 · Arbeitssprache Deutsch.
Erstellt von: **Gabriel Jäger · Swiss Consult Digital** · office@swissconsultdigital.ch

> **Hinweis:** *AUREA*, *Dr. med. Carla Brunner* und sämtliche Inhalte sind frei erfunden. Es handelt sich um einen gestalterischen Konzept-Entwurf als Arbeitsprobe, nicht um eine reale Praxis. Alle Bilder sind KI-generiert und zeigen keine realen Personen oder Behandlungsergebnisse. Die Rechtstexte sind Platzhalter.

---

## Inhalt

1. [Auftrag & Liefergegenstände](#1-auftrag--liefergegenstände)
2. [Was diese Arbeitsprobe zeigt](#2-was-diese-arbeitsprobe-zeigt)
3. [Seitenverzeichnis](#3-seitenverzeichnis)
4. [Zwei Designvarianten — Begründung](#4-zwei-designvarianten--begründung)
5. [Design-System](#5-design-system)
6. [Interaktive Komponenten](#6-interaktive-komponenten)
7. [Inhalt, Sprache & Compliance](#7-inhalt-sprache--compliance)
8. [Bildwelt (KI-Pipeline)](#8-bildwelt-ki-pipeline)
9. [Qualitätssicherung](#9-qualitätssicherung)
10. [Abgleich gegen die Ausschreibung](#10-abgleich-gegen-die-ausschreibung)
11. [Dateistruktur](#11-dateistruktur)
12. [Offene Punkte vor Versand](#12-offene-punkte-vor-versand)
13. [Nächster Schritt: WordPress](#13-nächster-schritt-wordpress)

---

## 1. Auftrag & Liefergegenstände

**Ziel:** hochwertige Hauptwebsite mit Premium-Anmutung und Conversion-Fokus für eine Dermatologie-Praxis.

**Liefergegenstände laut Ausschreibung:**
- Hochwertige Hauptwebsite mit **allen Service-Seiten**.
- **Longevity-Anamnesis-Seite** (Konzept liegt vor).

**Optionale spätere Phasen:** Shop (Produkte, Pakete, Gutscheine); Mitgliederbereich mit geschütztem Zugang.

**Geforderte Kompetenzen:** professionelle WordPress-Entwicklung (saubere Theme-/Plugin-Architektur), Performance-Optimierung, DSGVO/DSG-konforme Umsetzung, Arbeit mit einem **Page Builder** (Empfehlung mit Begründung erwünscht), eigenständige Designkompetenz auf Basis vorhandener CI, Erfahrung mit medizinischen/Premium-Brands von Vorteil.

---

## 2. Was diese Arbeitsprobe zeigt

Statt nur zu behaupten, dass wir das können, **zeigen** wir es: ein vollständiges, mehrseitiges Premium-Mockup in **zwei eigenständig gestalteten Designvarianten**, inkl. der geforderten Longevity-Anamnese-Seite, interaktiven Komponenten (Vorher/Nachher-Slider, Terminbuchung, Anamnese-Fragebogen) und konsequenter Qualitätssicherung (automatischer WCAG-/Responsive-Audit, Apple-HIG-Review).

Technisch ist das Mockup **statisches HTML/CSS/JS** — bewusst, weil es als pixelgenaue **Spezifikation** für den WordPress-Bau dient und ohne Server/Installation in jedem Browser läuft. Der WordPress-Aufbau ist der bezahlte Projektschritt (siehe [Kapitel 13](#13-nächster-schritt-wordpress) und `WP-AUFBAU-PLAN.md`).

---

## 3. Seitenverzeichnis

| Datei | Variante | Zweck |
|---|---|---|
| `varianten.html` | — | **Top-Page / Chooser** — stellt beide Designvarianten gegenüber |
| `index.html` | A | Startseite (One-Pager): Hero, Leistungen, Longevity-Teaser, Praxis, Ablauf, Stimmen, FAQ, Kontakt |
| `longevity.html` | A | Longevity-Anamnese mit mehrstufigem Fragebogen |
| `variante-b.html` | B | Startseite „Noir Editorial": Hero, Leistungen (Detail-Modals), Ästhetik, Longevity, Vorher/Nachher-Slider, Praxis, **Terminbuchung**, Kontakt |
| `longevity-b.html` | B | Longevity-Anamnese im Noir-Stil: Sub-Hero, 4 Perspektiven, 5-Schritt-Ablauf, Erfassungs-Raster, **4-Schritt-Fragebogen**, FAQ |
| `datenschutz-b.html` | B | Datenschutzerklärung (revDSG/DSGVO, Konzept-Platzhalter) |
| `impressum-b.html` | B | Impressum (berufsrechtliche Angaben, Konzept-Platzhalter) |

**Variante B ist die Variante, mit der an die Kundin herangetreten wird** — entsprechend durchgängig in sich konsistent: alle Links führen auf B-stilige Ziele, keine Stilbrüche, keine toten Links.

---

## 4. Zwei Designvarianten — Begründung

Eigenständige Designkompetenz wird durch **zwei orthogonale, vollständig ausgearbeitete Richtungen** mit getrennten Token-Systemen belegt:

- **Variante A — „Warm Editorial Luxury"** (`style.css`): warmes Elfenbein/Waldgrün, Champagner-Gold, viel Weissraum. Ruhig, vertrauensbildend, ärztlich-zurückhaltend. *Wirkt einladend und sicher.*
- **Variante B — „Noir Editorial"** (`style-b.css`): dunkle, plakative Fashion-Magazin-Anmutung, grosse High-Contrast-Serifen, Full-Bleed-Fotografie, cremefarbene Pill-Buttons. *Wirkt premium, selbstbewusst, modern.* Inspiriert von skinmed.ch (als Referenz, eigenständig umgesetzt), mit Champagner-Gold als Marken-Faden zu A.

Beide teilen Marke, Inhalte und Schriftfamilien (Fraunces + Manrope), interpretieren sie aber bewusst gegensätzlich — damit die Auftraggeberin die Richtung anhand echter Entwürfe wählen kann.

---

## 5. Design-System

| | Variante A | Variante B |
|---|---|---|
| Hintergrund | Elfenbein `#F7F3EC` | Warm-Schwarz `#17130F` |
| Text | Anthrazit `#1A1611` | Creme `#F3ECDF` |
| Akzent | Champagner-Gold `#B0894F` | Champagner-Gold `#CDA15E` |
| Display-Serife | Fraunces | Fraunces (auch kursiv) |
| Sans / UI | Manrope | Manrope |

- **Token-basiert:** beide Stylesheets definieren ein vollständiges `:root`-System (Farben, Fluid-Type-Scale, Spacing, Easing) und nutzen durchgängig `var(--…)` — dieselbe Disziplin, die den WordPress-Build schlank und wartbar macht.
- **Kontrast-Entscheid:** Gold-Buttons tragen **dunklen** Text (nicht weiss) → WCAG-AA ~4,6:1 bei Erhalt der Marke. Gold-Text auf Hell ist abgedunkelt (`#8A6526` / `#9A7A3E`).
- **Responsiv:** Breakpoints 360 / 390 / 768 / 1440 / 1920; mobile-first geprüft.

---

## 6. Interaktive Komponenten

Alle in `assets/b-app.js` (Variante B) bzw. `assets/app.js` (Variante A), Vanilla-JS, kein Framework.

| Komponente | Beschreibung | Datei/Stelle |
|---|---|---|
| **Vorher/Nachher-Slider** | ziehbar (Pointer + Tastatur), 3 Hautbild-Paare umschaltbar; via Gemini-Bild-Editing exakt ausgerichtet | `variante-b.html` §Ergebnisse, `b-app.js`, `ba-*.jpg` |
| **Terminbuchung (SOTA-Mockup)** | Pills für Fachrichtung & Anliegen → Wochenkalender mit **variabler, deterministischer Verfügbarkeit** (Sin-Hash, stabil über Reloads); aktuelle Woche ausgebucht → Sprung „nächster freier Termin"; 4-Schritt-Flow mit Bestätigung | `variante-b.html` §Termin, `b-app.js` |
| **Leistungs-Detail-Modals** | 6 Leistungen öffnen je ein Detail-Panel (Lead, Bullets, Kostenhinweis) | `variante-b.html`, `SERVICES` in `b-app.js` |
| **Anamnese-Fragebogen** | 4-Schritt-Formular mit Fortschritt, Consent-Checkboxen, Absende-Bestätigung (Demo, keine Datenübertragung) | `longevity-b.html`, `b-app.js` |
| **FAQ-Akkordeon** | barrierearm (`aria-expanded`), eine Antwort offen | `longevity-b.html`, `b-app.js` |

Übertragbarkeit dieser Komponenten nach WordPress: siehe `WordPress-Umsetzung.md` und `WP-AUFBAU-PLAN.md`.

---

## 7. Inhalt, Sprache & Compliance

- **Durchgehend Schweizer Rechtschreibung** (immer „ss", nie „ß").
- **Standeskonform, werbefrei:** keine Heilversprechen, keine Ergebnis-Garantien; Vorher/Nachher klar als „beispielhaft, individuelle Ergebnisse können abweichen" gekennzeichnet.
- **Rechtstexte:** Datenschutzerklärung mit Bezug auf das **revidierte Schweizer Datenschutzgesetz (revDSG)** und ergänzend DSGVO; Gesundheitsdaten ausdrücklich als „besonders schützenswerte Personendaten"; Consent-Hinweise an den Formularen. Impressum mit berufsrechtlichen Angaben (FMH, Berufsausübungsbewilligung Kanton Schwyz). **Als Konzept-Platzhalter markiert**, im Projekt durch rechtlich geprüfte Texte zu ersetzen.

---

## 8. Bildwelt (KI-Pipeline)

- **22 KI-generierte Markenbilder** (`assets/img/`), erzeugt über die **Gemini-API** (`gemini-3-pro-image`).
- Zwei abgestimmte Bild-Sets: helles Premium-Set für Variante A, separates dunkles `b-*`-Set für Variante B; dazu die Vorher/Nachher-Paare (`ba-*`), per **Bild-Editing** für exakte Deckungsgleichheit des Sliders ausgerichtet.
- Skript & Prompt-Spezifikation: `…/scratchpad/gemini.py` + `imgspec.json` (API-Key aus `E:\Freelance\.env`).
- **Hinweis für Produktion:** Dateien tragen `.jpg`, enthalten technisch PNG-Daten; im WordPress-Build nach **WebP/AVIF** konvertieren und durch echte, rechtlich freigegebene Praxisfotos ersetzen.

---

## 9. Qualitätssicherung

Zwei wiederholbare Prüfwege (jede Iteration):

- **`audit/audit.py`** (Playwright) — automatischer WCAG-AA-Kontrast (DOM-Walk mit Alpha-Kompositing), horizontaler Overflow, Tap-Targets (≥44 px) und Mindest-Schriftgrösse über **5 Breakpoints × 7 Seiten**. → `audit/REPORT.md`, `audit/report.json`, Screenshots in `audit/shots/`.
  **Aktueller Stand: 0 Kontrastverstösse · 0 Overflow · 0 zu kleine Controls.**
- **`audit/hig_review.js`** — Multi-Agent Apple-HIG-Design-Review (qualitativ, priorisierte Befunde). → `audit/HIG_REPORT.md`.

```bash
python audit/audit.py        # WCAG + Responsive + Screenshots
```

---

## 10. Abgleich gegen die Ausschreibung

Vollständiger, adversarial gegengeprüfter Anforderungsabgleich in **`audit/AUSSCHREIBUNG_ABGLEICH.md`**.

**36 Anforderungen: ✅ 9 erfüllt · 🟡 20 teilweise · ⬜ 7 offen.**

- **Klar erfüllt (im Mockup demonstriert):** Premium-Hauptseite, Longevity-Anamnese-Seite, eigenständige Designkompetenz (zwei Varianten), Page-Builder-Empfehlung mit Begründung, Impressum, revDSG-Bezug.
- **Bewusst „teilweise":** vieles ist im Mockup demonstriert bzw. in den Unterlagen konzeptionell belegt, wird aber erst im bezahlten WordPress-Projekt voll umgesetzt (Performance, Theme-/Plugin-Architektur, Consent-Management, Service-Einzelseiten).
- **Offen vor Versand:** echte Referenzen, Verfügbarkeit, Kontaktdaten; Bildoptimierung; TLS/CH-EU-Hosting/AVV; E-Commerce-/Mitgliederbereich-Skills (nur optionale Spätphasen).

Zwei wichtige Befunde: (1) Leistungen sind aktuell **Modals statt eigener Service-Seiten** → im WP-Bau je eigene, indexierbare Seite. (2) Die Unterlagen versprechen **lokal gehostete Schriften**, das Mockup lädt jedoch Google-Fonts per CDN → vor Versand glattziehen oder als Produktionsschritt einordnen.

---

## 11. Dateistruktur

```
aurea-mockup/
├─ index.html, longevity.html              # Variante A
├─ variante-b.html, longevity-b.html       # Variante B (Kundenrichtung)
├─ datenschutz-b.html, impressum-b.html    # Variante B — Rechtstexte
├─ varianten.html                          # Top-Page / Chooser
├─ assets/
│  ├─ style.css, app.js                    # Design-System A
│  ├─ style-b.css, b-app.js                # Design-System B (geteilt über alle B-Seiten)
│  └─ img/                                  # 22 KI-Bilder (A-Set, b-*, ba-*)
├─ audit/
│  ├─ audit.py, REPORT.md, report.json     # WCAG/Responsive-Audit
│  ├─ hig_review.js, HIG_REPORT.md         # Apple-HIG-Review
│  ├─ AUSSCHREIBUNG_ABGLEICH.md            # Anforderungsabgleich
│  └─ shots/                               # Audit-Screenshots
├─ versand/                                # komprimierte JPGs + Präsentations-PDF
├─ Bewerbung.md                            # Anschreiben + Page-Builder-/DSG-/Performance-Konzept
├─ WordPress-Umsetzung.md                  # Übertragbarkeit Mockup → WordPress
├─ WP-AUFBAU-PLAN.md                       # Konkreter Bau-Runbook (nächster Schritt)
├─ DOKUMENTATION.md                        # ← dieses Dokument
└─ README.md                               # Kurzüberblick / Quickstart
```

---

## 12. Offene Punkte vor Versand

1. **Anschreiben-Platzhalter** in `Bewerbung.md` füllen: Verfügbarkeit/Startdatum, Kontaktdaten, echte Referenzen (`[…]`).
2. **Schriften-Widerspruch** glattziehen: lokale Fonts auch im Mockup oder als Produktionsschritt deklarieren.
3. Optional: eine **echte Service-Detailseite** in Variante B exemplarisch bauen (statt nur Modal).

---

## 13. Nächster Schritt: WordPress

Das Mockup ist die **abnahmefähige Spezifikation**. Der WordPress-Aufbau ist im separaten Runbook **`WP-AUFBAU-PLAN.md`** beschrieben: empfohlene Zielarchitektur, Docker-freie lokale Dev-Umgebung, Schritt-für-Schritt-Phasen, Plugin-Mapping für die interaktiven Komponenten, DSG/Performance und Go-Live.

**Empfehlung in Kürze:** WordPress auf schlankem Theme + **Elementor Pro** (für die nicht-technische Bedienbarkeit, wie in der Ausschreibung verlangt), das Mockup-Design-System als globale Styles übernommen; CH/EU-Hosting, DSG-konform, Core-Web-Vitals-optimiert. Details und Alternative (schlankes Custom-Theme) im Runbook.
