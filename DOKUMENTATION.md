# AUREA — Projektdokumentation

**Bewerbungs-Arbeitsprobe zur freelancermap-Ausschreibung #3014281**
„Aufbau einer hochwertigen WordPress-Website für eine Dermatologin"

Auftraggeberin: **WE FRANCHISE GmbH** (Ansprechperson Ellen Müller), Schwyz · Start 7/2026 · Arbeitssprache Deutsch.
Erstellt von: **Gabriel Jäger, M.Sc. · Swiss Consult Digital** (Gordola TI) · office@swissconsultdigital.ch

> **Hinweis (Demo-Marke):** *AUREA*, *Dr. med. Carla Brunner* und sämtliche Inhalte sind **frei erfunden** — ein gestalterischer Konzept-Entwurf als Arbeitsprobe, keine reale Praxis. Alle Bilder sind KI-generiert und zeigen keine realen Personen oder Behandlungsergebnisse. Die Rechtstexte sind Platzhalter. Eine reale Kunden-CI wird später token-basiert übernommen, ohne Strukturänderung.

---

## Kurzfassung (TL;DR)

- **Live-Demo (klickbar, statisch):** https://swissconsultdigital.github.io/aurea-derma-demo/ — ein pixelgenaues Premium-Mockup (HTML/CSS/JS) für **Desktop und Smartphone**, gebaut als abnahmefähige Design-/UX-/Performance-Referenz.
- **WordPress:** Der Entwurf ist zusätzlich als **echtes WordPress-Block-Theme (FSE)** samt verschlüsseltem Anfrage-Plugin **lokal aufgebaut** (WordPress Studio, separates Verzeichnis) — Code-Walkthrough/Screencast auf Wunsch. *Der öffentliche Demo-Link zeigt die statische Referenz, nicht die WordPress-Instanz (GitHub Pages führt kein PHP aus).*
- **Gemessen, nicht behauptet:** Lighthouse Desktop 100 / Mobile 94 (LCP/CLS grün); vollständiger **WCAG-2.2-AA-Audit** mit deterministischer + pixelgenauer Kontrastmessung (0 offene Verstösse); lokale Fonts, WebP, Lazy-Loading.

---

## 1 · Auftrag & Liefergegenstände

**Ziel:** hochwertige Hauptwebsite mit Premium-Anmutung und Conversion-Fokus für eine Dermatologie-Praxis.

Laut Ausschreibung: hochwertige **Hauptwebsite** inkl. **aller Service-Seiten**, eigenständige **Longevity-Anamnese-Seite** (mehrstufiger Fragebogen); optionale spätere Phasen **Shop** und **Mitgliederbereich**; professionelle WordPress-Entwicklung (saubere Theme-/Plugin-Architektur), Performance, DSGVO/DSG-Konformität, **Page-Builder-Empfehlung mit Begründung**, eigenständige Designkompetenz auf Basis vorhandener CI, Erfahrung mit medizinischen/Premium-Brands von Vorteil.

---

## 2 · Was diese Arbeitsprobe zeigt

Statt nur zu behaupten, dass wir das können, **zeigen** wir es: ein mehrseitiges Premium-Mockup in der Designrichtung **„Noir Editorial"**, durchgängig für Desktop und Smartphone, inkl. der geforderten Longevity-Anamnese-Seite, interaktiver Komponenten und konsequenter, wiederholbarer Qualitätssicherung.

**Warum ein Mockup als klickbare Demo?** Es läuft ohne Server/Installation in jedem Browser, dient als **pixelgenaue Spezifikation** und macht Design, UX und Performance sofort erlebbar — für Desktop *und* Smartphone. Parallel dazu ist der Entwurf bereits als lauffähiges **WordPress-Block-Theme** umgesetzt (lokal, WordPress Studio), sodass die Umsetzungskompetenz belegt ist und nicht nur versprochen wird.

*Eigenständige Designkompetenz* wird zusätzlich durch **zwei real ausgelieferte, gestalterisch gegensätzliche** Kundenprojekte belegt — [gi-solutions.ch](https://gi-solutions.ch/) (dunkel-industriell, WordPress/Divi, mehrsprachig) und [aktedigital.de](https://aktedigital.de/) (clean-corporate, Datenschutz/Conversion) —, also die Fähigkeit, eine **fremde, gegebene Markenwelt** sauber umzusetzen.

---

## 3 · Seitenverzeichnis (Mockup)

| Datei | Zweck |
|---|---|
| `index.html` | Startseite „Noir Editorial": Hero, Leistungen-Grid (Detail-Modals), Ästhetik, Longevity, Vorher/Nachher-Slider, Pull-Quote, Ärztin/Praxis, **4-Schritt-Terminbuchung** (mobil als Vollbild-Sheet), Ausblick, Kontakt, Footer |
| `longevity-b.html` | Longevity-Anamnese: Sub-Hero, vier Perspektiven, 5-Schritt-Ablauf, Erfassungs-Raster, **validierter 4-Schritt-Fragebogen**, FAQ |
| `datenschutz-b.html` | Datenschutzerklärung (revDSG/DSGVO, Konzept-Platzhalter) |
| `impressum-b.html` | Impressum (berufsrechtliche Angaben, Konzept-Platzhalter) |

Alle Seiten teilen ein Stylesheet (`assets/style-b.css`) und ein JS (`assets/b-app.js`); die Strecke ist in sich konsistent (keine Stilbrüche, keine toten Links), `lang="de-CH"`, mit `<main>`-Landmark, Skip-Link und einer `h1` je Seite.

---

## 4 · Design-System

„Noir Editorial" — dunkle, editoriale Fashion-Magazin-Anmutung: grosse High-Contrast-Serifen, Full-Bleed-Fotografie, viel Ruhe, cremefarbene Pill-Buttons, Champagner-Gold als Akzent.

| | Wert |
|---|---|
| Hintergrund (Seite / Surface / Panel) | `#17130F` / `#1E1813` / `#271F18` |
| Text (primär / gedämpft) | Creme `#F3ECDF` / `#C3B7A4` |
| Akzent (Gold / Gold-soft) | `#CDA15E` / `#E6D2AC` |
| Display-Serife / Sans-UI | Fraunces (auch kursiv) / Manrope |

- **Token-basiert:** `assets/style-b.css` definiert ein vollständiges `:root`-System (Farben, Fluid-Type-Scale via `clamp()`, Spacing, Easing, Feld-Rahmen); alles konsumiert `var(--…)` → eine CI-Übernahme ändert die Quelle an **einer** Stelle. Dieselbe Disziplin macht den WordPress-Build (`theme.json`) schlank und wartbar.
- **Kontrast/Barrierefreiheit:** alle Text/Fläche-Paare erfüllen WCAG-AA (deterministisch geprüft, siehe §7). Formularfeld-Rahmen ≥ 3:1 (`--field-line`), sichtbarer Tastatur-Fokusring.
- **Responsiv:** durchgehend mobile-first geprüft (u. a. 360 / 390 / 414 / 768 / 1280).

---

## 5 · Interaktive Komponenten

Alle in `assets/b-app.js` (Vanilla-JS, kein Framework).

| Komponente | Beschreibung |
|---|---|
| **Goldstandard-Hero** | natives 9:16-Porträt (per Gemini-Outpainting), Scrim messgeführt für WCAG-AA-Textkontrast über Bild; Desktop-Querformat separat |
| **Vorher/Nachher-Slider** | natives `input[type=range]` (Pointer **und** Tastatur), drei Fälle umschaltbar, `aria-pressed` |
| **Terminbuchung** | Fachrichtung/Anliegen als Pills → Wochenkalender mit deterministischer Verfügbarkeit (Sin-Hash, stabil); **heutiger Tag markiert**, Badges frei/wenige/ausgebucht/geschlossen; **auf Smartphone: Airline-Vollbild-Sheet** (Tagesliste → Uhrzeiten) mit `role=dialog`, Fokusfalle, ESC, Live-Region; Desktop bleibt inline |
| **Leistungs-Detail-Modals** | sechs Leistungen je als Detail-Panel; Fokusfalle + Fokus-Rückgabe an den Auslöser |
| **Anamnese-Fragebogen** | validierter 4-Schritt-Flow (Pflichtfeld-/Format-Logik, smarte Kontaktart), Consent-Gate, `role=alert`-Zusammenfassung, Erfolgs-Fokus (Demo — keine Datenübertragung) |
| **FAQ-Akkordeon** | Disclosure-Muster mit `aria-expanded` + `aria-controls` |
| **Consent-Hinweis** | dezentes, barrierefreies Banner (`role=dialog`, ESC, `localStorage`) — nur technisch Notwendiges vorab, Optionales nach Einwilligung |

Übertragbarkeit nach WordPress: `WordPress-Umsetzung.md` und `WP-AUFBAU-PLAN.md`. Die Buchung ist im WordPress-Theme an ein eigenes Plugin (`aurea-anfrage`: REST + Nonce, serverseitige Validierung, Honeypot/Rate-Limit, libsodium-Verschlüsselung, privater CPT) angebunden.

---

## 6 · Inhalt, Sprache & Compliance

- **Durchgehend Schweizer Rechtschreibung** („ss", nie „ß").
- **Standeskonform, werbefrei:** keine Heilversprechen, keine Ergebnis-Garantien; Vorher/Nachher als beispielhaft gekennzeichnet.
- **Rechtstexte:** Datenschutzerklärung mit Bezug auf das **revidierte Schweizer Datenschutzgesetz (revDSG)** und ergänzend DSGVO; Gesundheitsdaten als „besonders schützenswerte Personendaten"; Consent-Hinweise an den Formularen. Impressum mit berufsrechtlichen Angaben. **Konzept-Platzhalter** — im Projekt durch rechtlich geprüfte Texte zu ersetzen.
- **Consent-Befund (CH):** Ohne Tracking verlangt das revDSG kein Cookie-Banner; die Demo setzt keine Analyse-/Marketing-Cookies. Das eingebaute Banner ist Kompetenz-Beleg und deckt das in der Ausschreibung genannte Consent-Management ab.

---

## 7 · Qualitätssicherung (wiederholbar)

- **WCAG-2.2-AA-Audit** — `audit/WCAG-AA.md`. Kontrast **pixelgenau** (Text über Bild) + **deterministisch** über alle Token-Paare (0 Fails); 4-Perspektiven-Audit (Tastatur/Fokus, ARIA/Struktur, Formulare, Reflow/Motion/Targets); alle Befunde behoben. Mess-Tooling in `audit/wcag/` (`contrast-pairs.py`, `hero-contrast.mjs`, `analyze_contrast.py`).
- **Automatischer Responsive-/Kontrast-Audit** — `audit/audit.py` (Playwright, DOM-Walk mit Alpha-Kompositing, Overflow, Tap-Ziele ≥ 44 px) → `audit/REPORT.md` + `audit/shots/`.
- **Apple-HIG-Design-Review** — `audit/hig_review.js` → `audit/HIG_REPORT.md`.
- **Performance:** Lighthouse Live-Demo Desktop **100** (LCP 0,5 s · CLS 0) / Mobile **94** (LCP 2,4 s · CLS 0); lokale Fonts (`assets/fonts/`, kein Google-CDN), WebP, Lazy-Loading, `fetchpriority` am Hero, gesetzte `aspect-ratio`.

Ausschreibungs-Abgleich (adversarial gegengeprüft): `audit/AUSSCHREIBUNG_ABGLEICH.md`; aktueller Gesamtstand & Scorecard: `STAND.md`.

---

## 8 · Bildwelt (KI-Pipeline)

- **32 KI-generierte Markenbilder als WebP** (`assets/img/`, mit JPG-Fallbacks), erzeugt über die **Gemini-API** (`gemini-3-pro-image`).
- Werkzeuge: `tools/gemini.py` (Text-zu-Bild **und** Bild-Editing/Outpainting, `edit`/`batch`-Befehle), `tools/imgspec.json`; API-Key aus `E:\Freelance\.env` (nicht im Repo).
- Der Hero ist ein **Outpaint** des Desktop-Porträts zu nativem 9:16 (gleiche Person Desktop↔Mobile).
- **Für Produktion:** durch echte, rechtlich freigegebene Praxisfotos ersetzen.

---

## 9 · Dateistruktur

```
aurea-mockup/                              # dieses Repo → deployt als statische Live-Demo (GitHub Pages)
├─ index.html                             # Startseite „Noir Editorial"
├─ longevity-b.html                       # Longevity-Anamnese (4-Schritt-Fragebogen)
├─ datenschutz-b.html, impressum-b.html   # Rechtstexte (Platzhalter)
├─ assets/
│  ├─ style-b.css, b-app.js               # Design-System + Interaktionen
│  ├─ fonts/                              # lokale woff2 (Fraunces normal/italic, Manrope)
│  └─ img/                                # 32 WebP (+ JPG-Fallbacks)
├─ audit/
│  ├─ WCAG-AA.md                          # WCAG-2.2-AA-Audit (aktuell)
│  ├─ wcag/                               # Mess-Tooling (contrast-pairs.py, hero-contrast.mjs, analyze_contrast.py)
│  ├─ audit.py, REPORT.md, report.json    # Playwright-Responsive-/Kontrast-Audit
│  ├─ hig_review.js, HIG_REPORT.md        # Apple-HIG-Review
│  ├─ AUSSCHREIBUNG_ABGLEICH.md           # Anforderungsabgleich (adversarial geprüft)
│  └─ shots/                              # Audit-Screenshots
├─ tools/  gemini.py, imgspec.json, screenshot.py
├─ versand/                               # Präsentations-PDF, Screenshots, Anschreiben (.docx)
├─ Bewerbung.md                           # Anschreiben + Page-Builder-/DSG-/Performance-Konzept
├─ STAND.md                               # aktueller Stand + Scorecard
├─ WordPress-Umsetzung.md, WP-AUFBAU-PLAN.md   # WP-Architektur / Runbook
├─ DOKUMENTATION.md                       # ← dieses Dokument
└─ README.md                              # Kurzüberblick

Separates Verzeichnis (nicht in diesem Repo): das reale WordPress-Block-Theme
(FSE, theme.json, Patterns) + Plugin `aurea-anfrage`, lokal in WordPress Studio.
```

---

## 10 · WordPress-Umsetzung & Page-Builder-Empfehlung

Das Mockup ist die **abnahmefähige Spezifikation**; das WordPress-**Block-Theme (FSE)** ist parallel bereits lokal aufgebaut (Design-System als `theme.json` + Block-Patterns, interaktive Komponenten übernommen, Buchung an das verschlüsselte Plugin `aurea-anfrage` angebunden). Runbook & Architektur: `WP-AUFBAU-PLAN.md` / `WordPress-Umsetzung.md`.

**Page-Builder-Empfehlung (mit Begründung):** der **native WordPress-Block-/Site-Editor (FSE)** als Primär — lizenzfrei, beste Performance ohne Builder-Ballast, DSG-freundlich (Teil des Kerns), laienpflegbar über **gesperrte Block-Patterns** (`templateLock:"contentOnly"`). **Elementor Pro** als gleichwertige, benannte Alternative, falls eine klassische Drag-and-drop-Oberfläche gewünscht ist. Abwägung (Bricks, Divi) siehe `Bewerbung.md` §3.

*Konsistenz-Hinweis:* Die massgebliche, an die Kundin gerichtete Positionierung steht in `Bewerbung.md` (Block-Editor primär). `WP-AUFBAU-PLAN.md`/`WordPress-Umsetzung.md` sind interne Runbooks und stellen ggf. Elementor voran — beim Versand zählt `Bewerbung.md`.

---

## 11 · Für Produktion offen (bewusst, ehrlich)

- **Alle Service-Seiten:** in der Demo als Detail-Ansichten; im Produktivbau je Leistung eine eigene, indexierbare Seite (SEO).
- **TLS + CH/EU-Hosting + AVV + Verarbeitungsverzeichnis:** konzeptionell (`Bewerbung.md` §4), bei Umsetzung realisiert.
- **Echte Inhalte/Fotos/Rechtstexte** statt Platzhalter/KI-Bilder.
- **Shop / Mitgliederbereich:** als spätere, abgegrenzte Phasen konzipiert (nicht gebaut).
