# Ist das in WordPress umsetzbar? — Ja, vollständig.

Kurz: **Der Mockup ist die Spezifikation. WordPress ist die Produktion.** Design, Layout,
Inhalte, Farb-/Typo-System und Bildsprache werden direkt übernommen; die interaktiven
Komponenten werden in WP an etablierte Plugins bzw. echte Backends angebunden statt mit
Mock-Logik zu laufen. Beide Varianten (A „Warm" und B „Noir") sind 1:1 in WordPress
realisierbar.

## Stand der Umsetzung — der WordPress-Build existiert bereits
Es ist nicht nur machbar, es **ist gebaut**: Ein lauffähiges WordPress-**Block-Theme** („AUREA", FSE)
setzt den Mockup eins zu eins um — Startseite, Longevity-Anamnese, sechs Leistungs-Detailseiten sowie
Impressum/Datenschutz, inklusive der interaktiven Komponenten (Vorher-Nachher-Haut-Slider mit dezentem
Auto-Hinweis, vierstufiges Buchungs-Widget, mehrstufiges Anamnese-Formular, FAQ-Akkordeon). Ein
mehrstufiger, KI-gestützter **Gleichwertigkeits-Audit** (WordPress gegen den genehmigten Mockup, Seite
für Seite) attestiert der Umsetzung **~9/10 Parität, präsentationsbereit, keine kritischen Abweichungen** —
an den Rechtsseiten dank produktionsreifem Footer sogar über dem Mockup. Inhalte sind in editierbaren
Block-Patterns hinterlegt (für Nicht-Techniker bedienbar), Reveal-Animationen laufen als Progressive
Enhancement (Inhalt bleibt auch ohne JavaScript vollständig sichtbar). Der Build dient als belastbarer
Proof of Concept; für die Produktion gelten die unten genannten Stack-/DSG-/Performance-Schritte.

*Hinweis zur Bauweise:* Gewählt wurde ein schlankes Custom-**Block-Theme** als „ähnliche Lösung" zum
geforderten Page-Builder (editierbare Patterns statt Drag-and-Drop-Builder); **Elementor Pro** bleibt die
dokumentierte, gleichwertige Alternative (Abwägung in `Bewerbung.md`).

## Empfohlener Stack
- **WordPress** + **Elementor Pro** auf schlankem **Hello-Theme** (Begründung der Page-Builder-Wahl: siehe `Bewerbung.md`).
- Alternative für maximale Performance: Bricks oder ein schlankes Custom-/Block-Theme (Abwägung ebenfalls in `Bewerbung.md`).
- Schriften (**Fraunces**, **Manrope**) **lokal gehostet** statt Google-CDN (DSG/DSGVO).

## Was 1:1 übernommen wird
| Aus dem Mockup | In WordPress |
|---|---|
| Design-Tokens (`:root`-Variablen: Farben, Typo, Abstände) | Elementor **Global Colors/Fonts** + globales Custom-CSS |
| Sektionen (Hero, Leistungen, Features, Ärztin, CTA, Footer) | Elementor-**Templates / globale Widgets**, wiederverwendbar |
| Copy, Bildsprache, KI-Bilder | direkt; Bilder als **WebP/AVIF** optimiert |
| Scroll-Reveal / Hover / Transitions | Elementor **Motion Effects** oder kompaktes Custom-JS |
| Responsive-Verhalten (Breakpoints) | Elementor-Responsive + unser geprüftes CSS |

## Die interaktiven Komponenten konkret
- **Vorher/Nachher-Slider:** entweder Elementors eingebautes **Image-Comparison-Widget** bzw. ein Plugin (z. B. „Image Compare") — oder unser **Custom-JS 1:1** in einem HTML-Widget eingebettet. Die generierten, ausgerichteten Bildpaare werden direkt verwendet.
- **Terminbuchung:** in Produktion **kein hartcodierter Kalender**, sondern Anbindung an ein echtes Buchungssystem — **Amelia** oder **Bookly** (WP-nativ), eine SaaS-Lösung (Calendly/OnceHub) oder direkt die **Praxissoftware/AIS** der Klinik. Unser Mockup definiert die **UX-Spezifikation** (Pills für Fachrichtung & Anliegen, Wochenansicht, „diese Woche ausgebucht → nächster freier Termin"); diese Oberfläche wird auf das gewählte Backend aufgesetzt/gethemt. **Die echte Verfügbarkeit kommt live aus dem Kalender-Backend.**
- **Mehrstufiges Anamnese-/Longevity-Formular:** Multi-Step-Plugin (z. B. **Gravity Forms** oder **Fluent Forms**) mit Conditional Logic; Gesundheitsdaten verschlüsselt.

## DSG/DSGVO — besonders wichtig bei Buchung & Anamnese
Termin- und Anamnesedaten sind **Gesundheitsdaten** (nach CH-DSG besonders schützenswert):
- Hosting in **CH/EU**, durchgängige TLS-Verschlüsselung, **AVV/DPA** mit allen Diensten.
- Consent-Management ohne unnötige Tracker; lokale Fonts/Skripte.
- Formular-/Buchungsdaten verschlüsselt, zugriffsbeschränkt — nicht per Klartext-Mail.
- Rechtssichere Pflichtseiten (Impressum, Datenschutzerklärung). Details: `Bewerbung.md`.

## Performance
Die hier handgeschriebene CSS ist bewusst schlank (Design-Tokens, keine schwere Library).
In WP zusätzlich: Hello-Theme, Caching, kritisches CSS, Lazy-Loading, WebP/AVIF, wenige
Plugins → **grüne Core Web Vitals** trotz bildlastiger Premium-Ästhetik.

## Ehrliche Einordnung
- **~70–80 % der Design-/Layout-CSS** sind direkt wiederverwendbar.
- Die **interaktiven Teile** (Slider, Buchung, Anamnese) werden in WP an **echte Plugins/APIs**
  angebunden — der Mockup beweist Design **und** den UX-Fluss und verkürzt damit die
  Umsetzung erheblich, weil Gestaltung, Logik und Datenflüsse vorab geklärt sind.
- Der statische Mockup dient bewusst der **Design-Geschwindigkeit**; er ist kein Wegwerf-Prototyp,
  sondern die **abnahmefähige Vorlage** für den WordPress-Build.
