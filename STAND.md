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
- **Responsive: 0 px horizontaler Overflow** auf 390/768/1024 px über alle Seiten; Nav klappt zum
  Hamburger, Bilder/Grids stapeln sauber, Footer ohne Rahmen-Artefakte.

## Ausschreibungs-Scorecard (ehrlich, evidenzbasiert)

Alle sechs Kriterien stehen auf **🟡 Gelb** — viel belegtes Können, aber durchgängig im Status
*Arbeitsprobe/Prototyp*, nicht Produktion.

| Kriterium | Ampel | Kurz |
|---|:--:|---|
| WP-Kenntnisse / Theme-Architektur | 🟡 | Theme-Seite erstklassig (FSE, theme.json v3, registrierte Patterns, esc_url, saubere Hooks); **Plugin-Architektur fehlt**, interaktive Teile sind Frontend-Mock ohne Backend. |
| Performance-Optimierung | 🟡 | Schlankes Fundament (~8 KB gzip CSS, Vanilla-JS, aspect-ratio gegen CLS); **lokale Fonts, WebP/AVIF, Lazy-Loading, Caching nur geplant**, keine gemessenen CWV. |
| DSGVO/DSG-Konformität | 🟡 | Fachlich stark (revDSG, Gesundheitsdaten, AVV, CH/EU-Hosting korrekt); Rechtsseiten **gebaut** (≠ Audit-Annahme), aber **Fonts noch via Google-CDN**, **kein Consent-Banner**, Datenpfad noch konzeptionell. |
| Page Builder / Nicht-Techniker-Bedienbarkeit | 🟡 | Empfehlung (nativer Block-Editor + benannte Elementor-Pro-Alternative) sauber begründet & ausschreibungskonform; **Block-Locking fehlt**, Kernsektionen (Leistungen/Ergebnisse/Termin) als roher `wp:html` → für Laien nicht visuell editierbar. |
| Designkompetenz auf Basis vorhandener CI | 🟡 | Konsistentes Token-System + Editorial-Bildsprache belegen starke Gestaltung — aber als Nachweis fürs **Erstellen** einer CI, nicht fürs treue **Ableiten aus der vorliegenden Kunden-CI** (siehe CI-Strategie unten). |
| Erfahrung Medizin/Premium (von Vorteil) | 🟡 | AUREA-Build + Pharma/GMP-Hintergrund belegen Sektor- & Compliance-Verständnis; **keine öffentlich verlinkbare Echt-Referenz** ausser dieser Probe. |

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
