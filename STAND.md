# AUREA — Projektstand (Bewerbung freelancermap #3014281)

> **Stand: 1. Juli 2026.** Premium-WordPress-Website für eine Dermatologin (fiktive Demo-Marke
> AUREA, Dr. med. Carla Brunner, Schwyz). Dieses Dokument ist der aktuelle Gesamtstatus; der
> detaillierte 36-Anforderungs-Abgleich liegt in `audit/AUSSCHREIBUNG_ABGLEICH.md`.

## Was steht

- **Statischer Mockup** (Arbeitsprobe), zwei Designrichtungen: Variante A „Warm" (hell, Ivory)
  und Variante B „Noir Editorial" (dunkel, Champagner-Gold). Beweist Wandelbarkeit derselben
  Architektur.
- **Lauffähiges WordPress-Block-Theme (FSE)** der Variante B — in WordPress Studio gebaut:
  - Startseite, 6 Leistungs-Detailseiten, Longevity-Anamnese, Kontakt, **Impressum + Datenschutz
    als echte WP-Seiten** (alle HTTP 200 — die Footer-Links zeigen NICHT ins Leere).
  - Interaktiv (clientseitig): Vorher-Nachher-Haut-Slider mit Auto-Hinweis, 4-Schritt-Buchungs-
    Widget, mehrstufiges Anamnese-Formular, FAQ-Akkordeon.
  - Design-Tokens zentral in `theme.json` (v3); Inhalte als editierbare Block-Patterns.
- **Visuelle Gleichwertigkeit WP ↔ Mockup: ø ≈ 9/10** (Gremium-Audit, 4 Seitenpaare; Impressum
  9.5, Datenschutz 9.0, Home 9.0, Longevity 9.0; 0 kritische Abweichungen).
- **Responsive: 0 px horizontaler Overflow** auf 360/390/768/1024 px über alle Seiten; Nav klappt zum
  Hamburger, Bilder/Grids stapeln sauber, Footer ohne Rahmen-Artefakte.
- **Mobile-/HIG-Audit bestanden:** 7-Perspektiven-Gremium (Apple HIG · WCAG 2.2 · Material) mit
  adversarialer Gegenprüfung über die gesamte Smartphone-Strecke; 36 Befunde, alle Major behoben —
  u. a. Burger-Menü (Overlay-Clipping im gescrollten Zustand + „Termin buchen"-CTA), Buchungs-Buttons
  stapeln statt überlaufen, Anker-Offset (Überschriften nicht mehr unter der Nav), Tap-Ziele ≥ 44 px,
  klickbare `tel:`/`mailto:`-Footer, Formular-`label`/`for`/`autocomplete`/`inputmode`, Touch-`:active`-
  Feedback ohne „klebendes" Hover, vollständiges `prefers-reduced-motion`, Fokusführung & `role=status`.
  **Goldstandard-Smartphone-Hero (30.6.):** statt eines aus dem Querformat gecroppten Porträts (Krone
  fadete ins Schwarz) ein per Gemini **ausgepaintetes natives 9:16-Porträt DERSELBEN Frau** wie auf
  Desktop (Kontinuität gewahrt) — voller Kopf mit Kopffreiheit, Gesicht hoch, untere Bildhälfte löst
  sich ins Tiefdunkel als Textbett auf; CSS-Overlay neu unten-gewichtet (Kopf nicht mehr verdunkelt) +
  schmaler Nav-Scrim. 3-Perspektiven-Gremium (Art-Direction · Frontend · Brand) → einstimmig Outpainting;
  auf 360/390/414 in Mockup **und** WP visuell verifiziert. Buchungs-/Anamnese-Strecke ebenso CDP-geprüft.

## Ausschreibungs-Scorecard (ehrlich, evidenzbasiert)

Alle sechs Kriterien stehen auf **🟡 Gelb** — viel belegtes Können, aber durchgängig im Status
*Arbeitsprobe/Prototyp*, nicht Produktion.

| Kriterium | Ampel | Kurz |
|---|:--:|---|
| WP-Kenntnisse / Theme- & Plugin-Architektur | 🟡→🟢 | Theme erstklassig (FSE, theme.json v3, Patterns, esc_url, Hooks). **Umgesetzt (5.7.):** eigenes **Plugin `aurea-anfrage`** (saubere Theme/Plugin-Trennung) mit echtem **REST-Endpoint** `aurea/v1/anfrage` — Nonce/CSRF-Schutz, serverseitige Sanitisierung & Validierung, Honeypot + Rate-Limit, **libsodium-Verschlüsselung at rest**, privater CPT + maskierte Admin-Liste + Entschlüsselungs-Metabox, datensparsame Mail. Buchungs-Widget daran angebunden (E2E + 5 Sicherheitstests bestanden). Offen: Anamnese-Formular ebenso anbinden (braucht `name`-Attribute), Prod-Key-Management. |
| Performance-Optimierung | 🟢 | Lokale Fonts, **WebP** (−92 %, WP **und** Demo), Lazy-Loading, `fetchpriority` Hero, `aspect-ratio`. **Lighthouse Live-Demo (gemessen): Desktop 100** (LCP 0,5 s · CLS 0), **Mobile 94** (LCP 2,4 s · CLS 0). „Grüne CWV" jetzt belegt, nicht behauptet. Offen nur: Caching-Header auf Prod-Hosting (GitHub-Pages-Limit). |
| DSGVO/DSG-Konformität & Barrierefreiheit | 🟡→🟢 | Fachlich stark (revDSG, Gesundheitsdaten, AVV); Rechtsseiten **gebaut**. **Umgesetzt (1.7.):** Schriften lokal in WP **und** Mockup → Google-CDN-Selbstwiderspruch auf der Datenschutzseite behoben. **WCAG-2.2-Politur (HIG-Audit):** Formularfelder mit `label`/`for`, `fieldset`/`legend`, `autocomplete`; Einwilligungs-Gating vor Absenden, Tastatur-Fokus-Falle im Menü, `role=status` für Erfolgsmeldungen, Tastatur-only-Fokusring. **Umgesetzt (29.6.):** dezentes, barrierefreies **Consent-Banner** (nur technisch Notwendiges vorab, Optionales erst nach Einwilligung; `localStorage`, `role=dialog`, ESC, on-brand) — schliesst die letzte offene Consent-Lücke. *Rechtlicher Befund:* in der Schweiz (revDSG) ohne Tracking **nicht zwingend** und die Demo setzt keine Analyse-Cookies; eingebaut als Kompetenz-Beleg und weil die Ausschreibung Consent-Management ausdrücklich nennt. **Mobile Terminwahl neu** (Airline-Muster, Gremium-Spez.): Schritt 3 als Vollbild-Sheet mit Wochen-Tagesliste (Verfügbarkeit frei/wenige/ausgebucht/geschlossen) → Uhrzeiten-Ebene; `role=dialog`, echte Fokusfalle, ESC, Live-Region — Desktop unverändert. Offen: sicherer Formular-Datenpfad (im WP via Plugin `aurea-anfrage` bereits verschlüsselt). |
| Page Builder / Nicht-Techniker-Bedienbarkeit | 🟡→🟢 | Empfehlung sauber begründet & ausschreibungskonform. **Umgesetzt (5.7.):** Leistungsliste von rohem `wp:html` in **native, editierbare Gutenberg-Blöcke** mit `templateLock:"contentOnly"` überführt (Text/Links editierbar, Layout gesperrt — das „gesperrte Patterns"-Versprechen ist jetzt wahr, visuell 1:1, Desktop+Mobile); Slider- und Termin-**Überschriften** ebenfalls nativ/editierbar, die interaktiven Widgets bleiben funktionale Bausteine (Interaktivität verifiziert). Offen für Produktion: Startseite als editierbare Seite statt Template-Komposition, Rollen-/Schulungskonzept. |
| Designkompetenz auf Basis vorhandener CI | 🟡→🟢 | Token-System + Editorial-Bildsprache belegen starke Gestaltung. **Verstärkt (5.7.):** zwei real ausgeführte, **distinkte Marken-CIs** in Produktion — gi-solutions.ch (dunkel-industriell, roter Akzent) vs. aktedigital.de (clean-corporate, blau) — belegen, dass eine **definierte, fremde Markenwelt** sauber umgesetzt wird, nicht nur die selbst-erfundene AUREA-CI. CI-Strategie + Variante-A-Demo entkräften den Rest. |
| Erfahrung Medizin/Premium (von Vorteil) | 🟡→🟢 | AUREA-Build + Pharma/GMP-Hintergrund + **zwei echte, verlinkbare Web-Referenzen** (5.7.): **gi-solutions.ch** (WordPress/Divi, mehrsprachig, internationale Industriemarke) belegt den geforderten Stack; **aktedigital.de** (DSGVO/BSI-Fokus, conversion-orientiert, Medizintechnik-Testimonial) belegt datenschutzsensible & conversion-starke Gestaltung. In `Bewerbung.md` eingearbeitet. Keine reine Arzt/Beauty-Referenz, aber die relevanten Kompetenzen sind real ausgeliefert belegt. |

**Gewinnchance realistisch:** solide Mittelklasse mit Aufwärtspotenzial. Gegen uns: CI-Missverständnis-
Risiko + fehlende Echt-Referenz. Für uns: kaum ein Mitbewerber bringt eine fertig gebaute,
sektor-adäquate Premium-Arbeitsprobe **plus** regulierten Compliance-Hintergrund mit — und die
transparente, nicht schönfärberische Einordnung schafft bei einer Ärztin Vertrauen.

## CI-Strategie (grösste Angriffsfläche — offensiv adressieren)

Das gezeigte Design ist **bewusst eine spekulative Platzhalter-CI**, weil die verbindliche Kunden-CI
noch nicht vorlag. Die Arbeitsprobe beweist **Fähigkeit, Prozess, Bautempo — nicht das Endaussehen.**
Souverän über drei Belege statt Behauptungen:

1. **Token-basiert:** Farben/Schriften/Abstände zentral in `theme.json` bzw. `:root`; alle Patterns
   konsumieren nur `var(--…)`. CI-Tausch ändert die Quelle an **einer** Stelle und kaskadiert.
2. **Wandelbarkeit vorgeführt:** **zwei** fertige Varianten derselben Architektur — hell „Warm"
   (Ivory #F7F3EC) und dunkel „Noir" (#17130F).
3. **Substanz bleibt CI-unabhängig:** UX-Flows, Slider, Buchung, Anamnese, Accessibility, Performance.

**Vorgehen:** CI-Kickoff (Moodboard/Farben/Logo/Schriften/Bildstrecke) → Farb-Tokens mappen (bei
heller CI direkt auf Variante „Warm" aufsetzen) → Schriften tauschen (lokal gehostet, DSG) →
Bildsprache einsetzen → token-getauschte **Vorschau zur Abnahme** gegen das Moodboard.

## Punchliste vor Angebotsabgabe (priorisiert)

| # | To-do | Nutzen | Aufwand |
|--:|---|---|:--:|
| 1 | **Helle CI-Demo** (Variante „Warm") als zweiten Preview-Link/Screenshot beilegen | Entkräftet das CI-Risiko mit einem Bild statt Versprechen | klein |
| 2 | **Over-Claims entschärfen**: „gesperrte Block-Patterns" nur wenn Locking gesetzt; zwei widersprüchliche Primärempfehlungen (Block-Editor vs. Elementor) vereinheitlichen | Schützt die Glaubwürdigkeit der ehrlichen Linie | klein |
| 3 | **Fonts lokal hosten** (woff2 ins Theme, Google-CDN raus, auch auf datenschutz-b.html) | Löst DSG + Performance + Selbstwiderspruch in einem Schritt | klein |
| 4 | **Bild-Quick-Wins**: `fetchpriority=high` aufs Hero-LCP, `loading=lazy`+`decoding=async`, Vorher-Nachher-Paare nach WebP, width/height | Performance „geplant" → „belegbar"; grösste Ladelast adressiert | mittel |
| 5 | **Eine echte Buchungs-/Anamnese-Anbindung** prototypisch (REST-Route/Fluent-Forms, Nonce, Sanitisierung, verschlüsselt) oder als Meilenstein mit Plugin-Architektur-Skizze | Adressiert die ehrlichste Schwäche (alles Frontend-Mock); hebt WP-Architektur Richtung Grün | gross |
| 6 | **Gemessene Core Web Vitals** (Lighthouse/PSI der Preview) nachreichen | Ersetzt Behauptung „grüne CWV" durch Messwerte | mittel |
| 7 | **Referenz-Platzhalter füllen**: AKTEDIGITAL-KI-QA-Pipeline als Engineering-/Compliance-Beleg konkret ausformulieren; Kontakt/Verfügbarkeit in `Bewerbung.md` setzen | Beseitigt sichtbare Lücken im sendefertigen Anschreiben | klein |

**Elevator-Pitch (übernehmbar):** „Ich liefere keine Versprechen, sondern eine bereits gebaute
Premium-Arbeitsprobe: ein lauffähiges WordPress-Block-Theme für eine Dermatologie-Praxis — sauber
token-basiert, schnell, barrierearm, mit fertigen UX-Flows (Vorher-Nachher-Slider, 4-Schritt-Buchung,
mehrstufige Anamnese). Das Design ist bewusst eine Platzhalter-CI; weil alles über Tokens läuft,
übernehme ich Ihre echte CI ohne die Struktur anzufassen — belegt durch zwei fertige Varianten, hell
und dunkel. Aus regulierten Pharma/GMP-Umfeldern bringe ich die Sorgfalt und das revDSG-Verständnis
mit, das besonders schützenswerte Gesundheitsdaten verlangen. Und ich sage offen, was heute
Arbeitsprobe und was Produktionsschritt ist."
