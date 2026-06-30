# WP-Aufbauplan (Runbook) — AUREA Dermatologie

Konkreter Fahrplan vom Mockup zur produktiven WordPress-Site. Ergänzt `WordPress-Umsetzung.md` (Machbarkeit/Was) um das **Wie** — Schritt für Schritt, auf die vorhandene Umgebung zugeschnitten.

---

## 0. Ausgangslage

- **Mockup = Spezifikation. WordPress = Produktion.** ~70–80 % der Design-CSS sind direkt wiederverwendbar.
- **Diese Maschine (geprüft):** Node 22 ✓, npm ✓, git ✓, VS Code ✓, WSL ✓, Internet ✓ — **aber kein PHP, kein Docker, kein MySQL, kein wp-cli**.
- **Konsequenz:** Die lokale WP-Umgebung muss **Docker-frei** sein. Das Standard-`@wordpress/env` (Docker) fällt aus; es gibt aber sehr gute Node-/WASM-Alternativen (siehe §3).

---

## 1. Empfohlene Zielarchitektur

**WordPress + schlankes Theme + Elementor Pro + Child-Theme mit den Mockup-Design-Tokens.**

- **Theme-Basis:** Hello Elementor (minimal, performant).
- **Page Builder:** **Elementor Pro** — erfüllt die Ausschreibungs-Anforderung „Page Builder, auch für Nicht-Techniker bedienbar"; die Kundin/Praxis kann Inhalte selbst pflegen.
- **Child-Theme:** trägt die `:root`-Design-Tokens aus `style-b.css`/`style.css` als **globale Styles**, bindet **Fraunces/Manrope lokal** ein (DSG + Performance) und kapselt Custom-JS (Slider). So matcht der Elementor-Build den Mockup ohne mühsames Nachbauen jedes Werts.
- **Begründung der Page-Builder-Wahl** ausführlich in `Bewerbung.md`.

---

## 2. Entscheidung: Bau-Methode

| Kriterium | **A) Elementor Pro** (empfohlen) | **B) Custom Block-Theme** | **C) Hybrid** |
|---|---|---|---|
| Nicht-technische Bedienbarkeit (Posting!) | ★★★ | ★★ (Block-Editor) | ★★★ |
| Performance / Schlankheit | ★★ (mit Tuning ★★★) | ★★★ | ★★★ |
| Mockup-CSS 1:1 wiederverwenden | ★★ | ★★★ | ★★★ |
| Von mir hier per CLI baubar | teilweise (GUI-Feinschliff) | **ja, vollständig** | teilweise |
| Lizenzkosten | Elementor Pro (~€60/Jahr) | keine | Elementor Pro |
| Wartung durch Kundin | einfach | mittel | einfach |

**Empfehlung:** **A (Elementor Pro)** für die Abgabe — weil das Posting Bedienbarkeit für Nicht-Techniker ausdrücklich fordert. Performance/DSG werden über das schlanke Setup (Hello + Child-Theme + lokale Fonts + Caching) erreicht.
**Wenn maximale Performance/Kontrolle und Wartung durch Gabriel im Vordergrund stehen → B (Custom Block-Theme):** das kann ich hier **direkt per Code aufbauen** und reused den Mockup 1:1.

---

## 3. Lokale Dev-Umgebung ohne Docker

| Option | Stack | Vorteil | Befehl / Quelle |
|---|---|---|---|
| **`wp-now`** (empfohlen zum Sofortstart) | Node + PHP-WASM + SQLite | startet WP in Sekunden, rein über Node, ich kann es per CLI treiben | `npx @wordpress/wp-now@latest start` |
| **WordPress Studio** | WASM-PHP + SQLite, GUI-App | persistent, 1-Klick-Deploy zu WordPress.com-Staging | Download: developer.wordpress.com/studio |
| **LocalWP** | eigener PHP/MySQL-Stack (kein Docker) | „echtes" MySQL, beliebt, GUI | localwp.com |
| **WSL + LAMP** | echtes PHP/MySQL in Ubuntu | produktionsnah | `wsl` → apt php/mariadb |

**Empfehlung:** zum **sofortigen Bauen** `wp-now` (Node ist da, kein Install nötig). Für die **laufende Projektarbeit** zusätzlich **Studio** oder **LocalWP** (persistent + einfaches Deploy).
⚠️ `wp-now`/Studio nutzen **SQLite**; das finale Staging/Prod läuft auf **MySQL/MariaDB beim CH/EU-Hoster** — Inhalte werden via Migrations-Plugin (z. B. All-in-One WP Migration) übertragen.

---

## 4. Aufbau in Phasen

### P0 — Fundament
1. Lokale WP-Instanz starten (§3), Admin anlegen.
2. **Hello Elementor** + **Elementor** (Pro) installieren; Child-Theme anlegen.
3. **Design-Tokens** aus `style-b.css`/`style.css` als Elementor **Global Colors/Fonts** + globales Custom-CSS übernehmen.
4. **Fraunges/Manrope lokal** einbinden (im Child-Theme), Google-CDN abschalten → schliesst den Schriften-Widerspruch.

### P1 — Struktur & Seiten
5. Menü/Navigation, Footer (global) gemäss Mockup.
6. **Startseite** (Variante B als Leitrichtung) aus Mockup-Sektionen aufbauen.
7. **Service-Seiten:** je Leistung **eine eigene, indexierbare Seite** (oder CPT „Leistung") — schliesst den Befund „alle Service-Seiten" aus dem Abgleich. Das Mockup-Modal bleibt als Teaser.
8. **Longevity-Anamnese-Seite**, **Praxis/Über**, **Kontakt**, **Impressum**, **Datenschutz**.

### P2 — Interaktive Komponenten (Plugin-Mapping)
| Mockup-Komponente | WordPress-Umsetzung |
|---|---|
| Vorher/Nachher-Slider | Elementor **Image-Comparison**-Widget *oder* unser Custom-JS im HTML-Widget (Bildpaare direkt) |
| Terminbuchung | echtes Backend: **Amelia** / **Bookly** / **FluentBooking** — unser Mockup = UX-Spezifikation, Verfügbarkeit kommt live aus dem Kalender |
| Leistungs-Detail-Modals | **Elementor Popups** (Pro) — Inhalte aus `SERVICES` 1:1 |
| Anamnese-Fragebogen | **Fluent Forms** / **Gravity Forms** (Multi-Step, Conditional Logic, Consent, verschlüsselt) |
| FAQ-Akkordeon | Elementor **Accordion** |

### P3 — DSG/DSGVO
9. **CH/EU-Hosting**, durchgängiges **TLS**, **AVV/DPA** mit allen Diensten, Verarbeitungsverzeichnis.
10. **Consent-Banner** (nur notwendige Cookies vorab; Analytics/Marketing erst nach Einwilligung).
11. Formular-/Buchungs-(Gesundheits-)Daten **verschlüsselt & zugriffsbeschränkt**, nicht per Klartext-Mail.
12. Rechtstexte aus dem Mockup übernehmen und **rechtlich prüfen** lassen.

### P4 — Performance
13. Caching (z. B. **WP Rocket** / FlyingPress), **CDN**, **WebP/AVIF**, kritisches CSS, Lazy-Loading, wenige Plugins → **grüne Core Web Vitals**.

### P5 — SEO & Analytics (datenschutzkonform)
14. Meta/OpenGraph, **Schema.org** (`Physician`/`MedicalBusiness`), Sitemap; Analytics **cookielos** (Plausible / Matomo anonymisiert).

### P6 — Abnahme & Go-Live
15. **Staging → Produktion** beim CH/EU-Hoster, Backups, Monitoring.
16. **Kurzschulung der Kundin** (Inhalte in Elementor pflegen) + Übergabedoku.

---

## 5. Empfohlene Plugins (Startset, schlank)
- **Elementor + Elementor Pro** (Builder, Popups, Theme Builder)
- **Fluent Forms** (Anamnese, Kontakt) — oder Gravity Forms
- **Amelia** / **Bookly** / **FluentBooking** (Terminbuchung)
- **WP Rocket** (+ ggf. Perfmatters) (Performance)
- Consent-Banner (**Complianz** — kennt CH-revDSG + DSGVO)
- **SEOPress** / Rank Math (SEO, schlank)
- **All-in-One WP Migration** (lokal → Staging/Prod)

---

## 6. Hosting-Empfehlung (CH/EU, DSG-konform)
- **CH:** Hostpoint, Infomaniak (CH, sehr datenschutzstark), Cyon.
- **EU/managed WP:** Kinsta, Cloudways (EU-Region), SiteGround.
- Kriterien: Serverstandort CH/EU, aktuelles PHP, HTTP/2-3, SSD/NVMe, einfache Staging-Umgebung, AVV verfügbar.

---

## 7. Was ich (Claude Code) hier konkret übernehmen kann
**Direkt per CLI machbar:**
- Lokale WP-Instanz via `wp-now` starten.
- **Child-Theme** generieren: `functions.php`, lokale Font-Einbindung, globales CSS aus den Mockup-Tokens, Enqueue von Custom-JS (Slider).
- Bei Methode **B**: komplettes **Custom Block-Theme** (`theme.json`, Templates, Pattern) aus dem Mockup.
- CPT „Leistung" + Service-Einzelseiten-Template per Code.
- Audit (`audit.py`) gegen die laufende WP-Seite richten (gleiche WCAG/Responsive-Prüfung).
- Bilder zu **WebP/AVIF** konvertieren.

**Braucht GUI / Kundin / extern:**
- Elementor-Pro-**Lizenz** + Drag-&-Drop-Feinschliff in der Oberfläche.
- **Buchungs-Backend** (Plugin-Lizenz oder Praxis-AIS-Zugang) und echte Verfügbarkeiten.
- **Hosting-Account**, Domain, echte Praxisinhalte/Fotos/Logo.
- **Rechtliche Freigabe** der Datenschutz-/Impressumstexte.

---

## 8. Sofort-Start (ein Befehl)
```bash
# im Projektordner eine frische lokale WordPress-Instanz starten (Node-only, kein Docker):
npx @wordpress/wp-now@latest start
# → WordPress läuft danach unter http://localhost:8881
```
Danach: Child-Theme/Block-Theme aufsetzen und das Design-System übernehmen (P0).

---

## 9. Abhängigkeiten / Reihenfolge
P0 (Fundament) → P1 (Seiten) laufen zuerst und unabhängig. P2 (Buchung/Anamnese) braucht die Plugin-/Backend-Entscheidung. P3–P5 begleiten ab P1. P6 zum Schluss. Hosting-Wahl (§6) wird vor P3/Go-Live benötigt, nicht für den lokalen Start.
