/* AUREA Variante B — Interaktionen: Nav, Reveal, Vorher/Nachher-Slider, Buchungs-Mockup */
(function () {
  'use strict';

  /* ---------- Nav ---------- */
  var nav = document.getElementById('bnav');
  var scrollCue = document.querySelector('.b-scroll');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
    if (scrollCue) scrollCue.style.opacity = window.scrollY > 80 ? '0' : '';
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  var t = document.getElementById('bnavToggle');
  var navLinks = document.getElementById('bnavlinks');
  function setMenu(open) {
    var was = nav.classList.contains('open');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('b-noscroll', open);
    if (t) { t.setAttribute('aria-expanded', open ? 'true' : 'false'); t.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü'); }
    // Fokus mitführen: beim Öffnen auf den ersten Link, beim Schliessen zurück zum Toggle
    if (open && navLinks) { var first = navLinks.querySelector('a'); if (first) first.focus(); }
    else if (!open && was && t) { t.focus(); }
  }
  if (t) {
    t.setAttribute('aria-controls', 'bnavlinks');
    t.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    document.querySelectorAll('#bnavlinks a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    // Tap auf leere Overlay-Fläche (nicht auf einen Link) schliesst ebenfalls
    if (navLinks) navLinks.addEventListener('click', function (e) { if (e.target === navLinks) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (!nav.classList.contains('open')) return;
      if (e.key === 'Escape') { setMenu(false); return; }
      // Fokus-Falle: Tab bleibt innerhalb des offenen Overlays (Toggle + Menülinks)
      if (e.key === 'Tab') {
        var f = [t].concat(Array.prototype.slice.call(navLinks ? navLinks.querySelectorAll('a') : []));
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- Cookie-/Consent-Hinweis ---------- */
  // Dezenter, barrierefreier Consent-Hinweis (läuft auf allen Seiten, vor dem Booking-Return).
  // Rechtlich: In der Schweiz (revDSG) ist ein Cookie-Banner ohne Tracking NICHT zwingend; diese
  // Demo setzt keine Analyse-/Marketing-Cookies. Der Hinweis demonstriert das in der Ausschreibung
  // geforderte Consent-Management (nur technisch Notwendiges vorab, Optionales erst nach
  // Einwilligung) und merkt die Wahl in localStorage – on-brand, ohne die Seite zu blockieren.
  (function () {
    var KEY = 'aurea-consent-v1';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { stored = null; }
    if (stored) return;                                  // Wahl bereits getroffen → kein Hinweis
    var save = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} };

    var box = document.createElement('div');
    box.className = 'b-cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'false');
    box.setAttribute('aria-labelledby', 'ccTitle');
    box.setAttribute('aria-describedby', 'ccDesc');
    box.innerHTML =
      '<div class="b-cc-in">' +
        '<div class="b-cc-txt">' +
          '<h2 id="ccTitle">Datenschutz &amp; Cookies</h2>' +
          '<p id="ccDesc">Diese Website verwendet nur technisch notwendige Cookies für den Betrieb. ' +
          'Optionale Analyse-Dienste aktivieren wir ausschliesslich mit Ihrer Einwilligung. Mehr dazu in der ' +
          '<a href="datenschutz-b.html">Datenschutzerklärung</a>.</p>' +
        '</div>' +
        '<div class="b-cc-act">' +
          '<button type="button" class="b-btn b-btn-outline b-cc-min">Nur notwendige</button>' +
          '<button type="button" class="b-btn b-btn-cream b-cc-all">Alle akzeptieren</button>' +
        '</div>' +
      '</div>';
    document.body.insertBefore(box, document.body.firstChild);   // erstes Element → früh in Lese-/Tab-Folge

    var rmotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var close = function (v) {
      save(v);
      box.classList.remove('in');
      document.removeEventListener('keydown', onKey);
      if (rmotion) { if (box.parentNode) box.parentNode.removeChild(box); }
      else { setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 380); }
    };
    var onKey = function (e) { if (e.key === 'Escape') { e.preventDefault(); close('essential'); } };
    box.querySelector('.b-cc-min').addEventListener('click', function () { close('essential'); });
    box.querySelector('.b-cc-all').addEventListener('click', function () { close('all'); });
    document.addEventListener('keydown', onKey);
    // sanft einblenden (Slide-up); kein Fokus-Klau → bleibt dezent, ist aber als erstes
    // role="dialog"-Element früh in der Vorlese-/Tab-Reihenfolge auffindbar.
    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('in'); }); });
  })();

  /* ---------- Reveal ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.b-reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.b-reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Before / After slider ---------- */
  var stage = document.getElementById('baStage');
  if (stage) {
    var range = document.getElementById('baRange'),
        before = document.getElementById('baBefore'),
        after = document.getElementById('baAfter');
    function setPos(v) { v = Math.max(0, Math.min(100, v)); stage.style.setProperty('--pos', v + '%'); }
    range.addEventListener('input', function () { setPos(+range.value); });
    setPos(+range.value);
    var dragging = false;
    function fromEvent(e) {
      var r = stage.getBoundingClientRect();
      var cx = e.touches ? e.touches[0].clientX : e.clientX;
      var v = (cx - r.left) / r.width * 100; setPos(v); range.value = v;
    }
    stage.addEventListener('pointerdown', function (e) { dragging = true; fromEvent(e); });
    window.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    window.addEventListener('pointerup', function () { dragging = false; });
    document.querySelectorAll('.ba-pill').forEach(function (p) {
      p.addEventListener('click', function () {
        document.querySelectorAll('.ba-pill').forEach(function (x) { x.classList.remove('is-active'); });
        p.classList.add('is-active');
        var k = p.dataset.case;
        before.src = 'assets/img/ba-' + k + '-before.webp';
        after.src = 'assets/img/ba-' + k + '-after.webp';
        setPos(50); range.value = 50;
      });
    });

    /* Auto-Hinweis: einmaliges, sanftes "Wackeln" beim Sichtbarwerden. */
    var hinted = false, touched = false;
    var stopHint = function () { touched = true; };
    stage.addEventListener('pointerdown', stopHint, { once: true });
    range.addEventListener('input', stopHint, { once: true });
    var easeIO = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var runHint = function () {
      if (hinted || touched) return;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      hinted = true;
      var keys = [50, 72, 33, 50], dur = 2400, start = null;
      var frame = function (ts) {
        if (touched) { setPos(50); range.value = 50; return; }
        if (start === null) start = ts;
        var pr = Math.min(1, (ts - start) / dur);
        var seg = pr * 3, i = Math.min(2, Math.floor(seg)), f = easeIO(seg - i);
        var v = keys[i] + (keys[i + 1] - keys[i]) * f;
        setPos(v); range.value = v;
        if (pr < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    // Bilder der weiteren Fälle (Pigment, Hautbild) vorausladen, sobald der Slider in Sicht kommt —
    // so ist das Umschalten zwischen den Fällen verzögerungsfrei (nicht erst beim Klick).
    var prefetchCases = function () {
      ['pigment', 'textur'].forEach(function (k) {
        ['before', 'after'].forEach(function (s) { var im = new Image(); im.src = 'assets/img/ba-' + k + '-' + s + '.webp'; });
      });
    };
    if ('IntersectionObserver' in window) {
      var hio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { setTimeout(runHint, 500); prefetchCases(); hio.unobserve(e.target); } });
      }, { threshold: 0.55 });
      hio.observe(stage);
    } else { setTimeout(runHint, 900); prefetchCases(); }
  }

  /* ---------- Service detail modal ---------- */
  var SERVICES = {
    medizin: { eyebrow: 'Medizinische Dermatologie', title: 'Wenn die Haut Sorgen bereitet.', lead: 'Jede Hauterkrankung verdient eine sorgfältige Abklärung, bevor sie behandelt wird. Wir suchen die Ursache Ihrer Beschwerden, behandeln nach aktuellem medizinischem Standard und erklären jeden Schritt verständlich – abgestimmt auf Ihren Alltag.', bullets: ['Akne & unreine Haut', 'Rosazea', 'Ekzeme & Neurodermitis', 'Schuppenflechte (Psoriasis)', 'Nagel- & Haarerkrankungen'], note: 'Medizinisch notwendige Behandlungen rechnen wir in der Regel über die Grundversicherung ab – über mögliche Kosten informieren wir Sie vorab transparent.' },
    hautkrebs: { eyebrow: 'Hautkrebs-Vorsorge', title: 'Früh erkennen, mit Ruhe.', lead: 'Beim Ganzkörper-Hautcheck untersuchen wir Ihre Haut systematisch und mit dermatoskopischer Vergrösserung. So lassen sich Veränderungen früh einordnen und über die Zeit dokumentieren – gründlich, sachlich und ohne unnötige Beunruhigung.', bullets: ['Ganzkörper-Hautcheck', 'Auflichtmikroskopie / Dermatoskopie', 'Dokumentierte Verlaufskontrolle', 'Entfernung verdächtiger Hautstellen', 'Histologische Abklärung bei Bedarf'], note: 'Wie oft ein Hautcheck sinnvoll ist, hängt von Ihren persönlichen Risikofaktoren ab – wir besprechen das individuell mit Ihnen.' },
    aesthetik: { eyebrow: 'Ästhetische Medizin', title: 'Natürlich, mit ärztlichem Augenmass.', lead: 'Ästhetische Medizin ist für uns eine feine Ergänzung der Hautmedizin, nie ein Versprechen. Wir beraten zurückhaltend, wählen jede Behandlung mit ärztlichem Augenmass und legen Wert auf ein natürliches, zu Ihnen passendes Ergebnis.', bullets: ['Faltenbehandlung im Gesicht', 'Hyaluron & sanfte Volumengabe', 'Frischeres, ebenmässigeres Hautbild', 'Beratung mit ärztlichem Augenmass'], note: 'Ästhetische Behandlungen sind Selbstzahlerleistungen – die zu erwartenden Kosten besprechen wir offen vor jeder Behandlung.' },
    laser: { eyebrow: 'Laser- & Gerätetherapie', title: 'Moderne Technik, präzise eingesetzt.', lead: 'Moderne Laser- und Geräteverfahren eröffnen viele Möglichkeiten – wenn sie gezielt eingesetzt werden. Wir stimmen jede Anwendung auf Ihren Hauttyp und Ihr Anliegen ab und sagen Ihnen offen, was realistisch erreichbar ist.', bullets: ['Gefässe & Couperose', 'Pigment- & Altersflecken', 'Hauterneuerung & feineres Hautbild', 'Dauerhafte Haarentfernung'], note: 'Je nach Verfahren sind mehrere Sitzungen sinnvoll – den Ablauf planen wir gemeinsam und ehrlich.' },
    longevity: { eyebrow: 'Longevity & Hautgesundheit', title: 'Hautgesundheit langfristig gedacht.', lead: 'Longevity heisst für uns, Ihre Hautgesundheit langfristig zu denken – nicht nur das Symptom von heute. In einer ausführlichen Analyse betrachten wir Ihre Haut im Zusammenhang mit Lebensstil, Schutz und Vorsorge und begleiten Sie über die Jahre.', bullets: ['Ausführliche Hautanalyse', 'Lebensstil & Prävention', 'Individueller Pflegeplan', 'Langzeitbegleitung über die Jahre'], note: 'Longevity-Leistungen sind Selbstzahlerangebote und lassen sich gut mit Ihrer medizinischen Betreuung verbinden.' },
    beratung: { eyebrow: 'Beratung & Begleitung', title: 'Zeit, Zuhören und ehrlicher Rat.', lead: 'Jede gute Behandlung beginnt mit einem ehrlichen Gespräch. Wir nehmen uns Zeit für Ihr Anliegen, erklären Befunde und Möglichkeiten verständlich und bleiben auch nach der Behandlung an Ihrer Seite.', bullets: ['Ausführliche Erstberatung', 'Ärztliche Zweitmeinung', 'Verständliche Aufklärung', 'Begleitung über die Behandlung hinaus'], note: 'Ihr Anliegen behandeln wir jederzeit vertraulich und ohne Zeitdruck.' }
  };
  var modal = document.getElementById('bmodal');
  if (modal) {
    var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    var openModal = function (key) {
      var s = SERVICES[key]; if (!s) return;
      document.getElementById('bmEy').textContent = s.eyebrow || 'Leistung';
      document.getElementById('bmTitle').textContent = s.title || '';
      document.getElementById('bmLead').textContent = s.lead || '';
      var list = document.getElementById('bmList'); list.innerHTML = '';
      (s.bullets || []).forEach(function (b) { var li = document.createElement('li'); li.innerHTML = CHK + '<span>' + b + '</span>'; list.appendChild(li); });
      document.getElementById('bmNote').textContent = s.note || '';
      modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
    };
    var closeModal = function () { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    modal.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    document.querySelectorAll('a.stretch[data-service]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); openModal(a.dataset.service); });
    });
  }

  /* ---------- FAQ-Akkordeon (Longevity & weitere B-Seiten) ---------- */
  document.querySelectorAll('.b-faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.b-faq-item');
      var ans = item.querySelector('.b-faq-a');
      var open = item.classList.contains('open');
      document.querySelectorAll('.b-faq-item.open').forEach(function (it) {
        it.classList.remove('open');
        var a = it.querySelector('.b-faq-a'); if (a) a.style.maxHeight = null;
        var b = it.querySelector('.b-faq-q'); if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!open) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; q.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- Mehrstufiges Anamnese-Formular (Longevity B) ---------- */
  var bform = document.getElementById('bAnamnese');
  if (bform) {
    var fsteps = Array.prototype.slice.call(bform.querySelectorAll('.b-fstep'));
    var fdots = Array.prototype.slice.call(bform.querySelectorAll('.b-progress .dot'));
    var fnext = bform.querySelector('[data-bnext]');
    var fprev = bform.querySelector('[data-bprev]');
    var fcur = 0;
    // Feldreferenzen + Pflicht-Validierung (Gremium-Spez.: validate-on-submit, then live)
    var $ = function (id) { return document.getElementById(id); };
    var vorname = $('an-vorname'), nachname = $('an-nachname'), email = $('an-email'), tel = $('an-tel');
    var kaEmail = $('ka-email'), kaTel = $('ka-tel');
    var fsKontakt = kaEmail ? kaEmail.closest('fieldset') : null;
    var c1 = $('an-consent-datenschutz'), c2 = $('an-consent-kontakt');
    var reqEmail = bform.querySelector('.b-req-email'), reqTel = bform.querySelector('.b-req-tel');
    var falert = $('bFormAlert');
    var MSG = {
      vorname: 'Bitte nennen Sie uns Ihren Vornamen.',
      nachname: 'Bitte nennen Sie uns auch Ihren Nachnamen.',
      kontaktart: 'Bitte wählen Sie, wie wir Sie erreichen dürfen – per E-Mail oder Telefon.',
      emailEmpty: 'Bitte hinterlegen Sie Ihre E-Mail-Adresse, damit wir Sie wie gewünscht erreichen.',
      emailInvalid: 'Diese E-Mail-Adresse scheint noch nicht vollständig zu sein – bitte prüfen Sie sie kurz (z. B. name@beispiel.ch).',
      telEmpty: 'Bitte hinterlegen Sie Ihre Telefonnummer, damit wir Sie zurückrufen können.',
      telInvalid: 'Diese Nummer wirkt noch unvollständig – bitte sehen Sie sie kurz durch (z. B. +41 79 000 00 00).',
      consentD: 'Bitte bestätigen Sie kurz die Datenschutzerklärung – erst dann dürfen wir Ihre Anfrage bearbeiten.',
      consentK: 'Bitte bestätigen Sie, dass wir Sie zur Terminkoordination kontaktieren dürfen.',
      summary: 'Bitte ergänzen Sie noch die markierten Angaben, dann begleiten wir Sie weiter.'
    };
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim()); }
    function validPhone(v) { return (v || '').replace(/[^0-9]/g, '').length >= 7; }
    var ICON = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16h.01"/></svg>';
    function setErr(ctrl, errId, msg) {
      var e = $(errId); if (e) { e.innerHTML = ICON + '<span>' + msg + '</span>'; e.hidden = false; }
      if (ctrl) { ctrl.setAttribute('aria-invalid', 'true'); ctrl.dataset.touched = '1'; }
    }
    function clearErr(ctrl, errId) {
      var e = $(errId); if (e) { e.hidden = true; e.textContent = ''; }
      if (ctrl) ctrl.removeAttribute('aria-invalid');
    }
    function selKontakt() { var r = bform.querySelector('input[name="kontaktart"]:checked'); return r ? r.value : null; }
    function toggleReq(ctrl, mark, on) {
      if (!ctrl) return;
      if (on) { ctrl.setAttribute('aria-required', 'true'); if (mark) mark.hidden = false; }
      else { ctrl.removeAttribute('aria-required'); if (mark) mark.hidden = true; }
    }
    function applyKontaktart() {
      var k = selKontakt();
      toggleReq(email, reqEmail, k === 'email');
      toggleReq(tel, reqTel, k === 'tel');
      if (k !== 'email') clearErr(email, 'err-an-email');
      if (k !== 'tel') clearErr(tel, 'err-an-tel');
    }
    // validateStep(i, mark): mark=true → Fehler anzeigen; mark=false → nur gültige (berührte) Fehler räumen
    function validateStep(i, mark) {
      var ok = true, firstBad = null;
      function bad(ctrl, errId, msg) { ok = false; if (!firstBad) firstBad = ctrl; if (mark) setErr(ctrl, errId, msg); }
      function good(ctrl, errId) { if (mark || (ctrl && ctrl.dataset.touched)) clearErr(ctrl, errId); }
      if (i === 0) {
        if (!vorname.value.trim()) bad(vorname, 'err-an-vorname', MSG.vorname); else good(vorname, 'err-an-vorname');
        if (!nachname.value.trim()) bad(nachname, 'err-an-nachname', MSG.nachname); else good(nachname, 'err-an-nachname');
        var k = selKontakt();
        if (!k) { ok = false; if (!firstBad) firstBad = kaEmail; if (mark) { setErr(null, 'err-kontaktart', MSG.kontaktart); if (fsKontakt) fsKontakt.setAttribute('aria-invalid', 'true'); } }
        else {
          if (mark) { clearErr(null, 'err-kontaktart'); if (fsKontakt) fsKontakt.removeAttribute('aria-invalid'); }
          if (k === 'email') { if (!validEmail(email.value)) bad(email, 'err-an-email', email.value.trim() ? MSG.emailInvalid : MSG.emailEmpty); else good(email, 'err-an-email'); }
          else { if (!validPhone(tel.value)) bad(tel, 'err-an-tel', tel.value.trim() ? MSG.telInvalid : MSG.telEmpty); else good(tel, 'err-an-tel'); }
        }
      } else if (i === 3) {
        if (c1 && !c1.checked) bad(c1, 'err-consents', MSG.consentD);
        else if (c2 && !c2.checked) bad(c2, 'err-consents', MSG.consentK);
        else { if (mark || (c1 && c1.dataset.touched) || (c2 && c2.dataset.touched)) { clearErr(c1, 'err-consents'); if (c2) c2.removeAttribute('aria-invalid'); } }
      }
      return { ok: ok, firstBad: firstBad };
    }
    function setAlert(m) { if (falert) { falert.textContent = m; falert.hidden = false; } }
    function clearAlert() { if (falert) { falert.hidden = true; falert.textContent = ''; } }
    function liveClear() { var r = validateStep(fcur, false); if (r.ok) clearAlert(); }
    [vorname, nachname, email, tel].forEach(function (c) { if (c) c.addEventListener('input', liveClear); });
    bform.querySelectorAll('input[name="kontaktart"]').forEach(function (r) { r.addEventListener('change', function () { applyKontaktart(); liveClear(); }); });
    [c1, c2].forEach(function (c) { if (c) c.addEventListener('change', liveClear); });

    var frender = function () {
      fsteps.forEach(function (s, i) { s.classList.toggle('active', i === fcur); });
      fdots.forEach(function (d, i) { d.classList.toggle('active', i <= fcur); });
      fprev.style.display = fcur === 0 ? 'none' : '';
      fnext.textContent = fcur === fsteps.length - 1 ? 'Anfrage absenden' : 'Weiter';
      clearAlert();
    };
    function finishForm() {
      bform.querySelector('.b-form-body').innerHTML =
        '<div class="b-form-done" role="status" tabindex="-1"><div class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
        '<h4>Vielen Dank für Ihr Vertrauen</h4>' +
        '<p>Ihre Angaben sind bei uns eingegangen. Dr. med. Carla Brunner und das AUREA Team melden sich zeitnah und diskret bei Ihnen, um Ihr persönliches Longevity-Anamnese-Gespräch zu vereinbaren.</p>' +
        '<p style="margin-top:1rem;font-size:0.82rem;color:var(--bone-mut);opacity:0.7">Demonstration — in diesem Mockup werden keine Daten übermittelt oder gespeichert.</p></div>';
      var nav = bform.querySelector('.b-form-nav'); if (nav) nav.style.display = 'none';
      if (falert) falert.hidden = true;
      fdots.forEach(function (d) { d.classList.add('active'); });
      var done = bform.querySelector('.b-form-done'); if (done) done.focus();
    }
    fnext.addEventListener('click', function () {
      var res = validateStep(fcur, true);
      if (!res.ok) { setAlert(MSG.summary); if (res.firstBad) res.firstBad.focus(); return; }
      clearAlert();
      if (fcur < fsteps.length - 1) { fcur++; frender(); }   // kein scrollIntoView → keine Y-Sprünge
      else {
        var r0 = validateStep(0, true), r3 = validateStep(3, true);
        if (!r0.ok) { fcur = 0; frender(); setAlert(MSG.summary); if (r0.firstBad) r0.firstBad.focus(); return; }
        if (!r3.ok) { setAlert(MSG.summary); if (r3.firstBad) r3.firstBad.focus(); return; }
        finishForm();
      }
    });
    fprev.addEventListener('click', function () { if (fcur > 0) { fcur--; frender(); } });
    applyKontaktart();
    frender();
  }

  /* ---------- Booking mockup ---------- */
  var bk = document.getElementById('bk');
  if (!bk) return;

  var DOW = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  var DOWFULL = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var MON = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var mq = window.matchMedia ? window.matchMedia('(max-width: 760px)') : { matches: false, addEventListener: function () {}, addListener: function () {} };
  function isMobile() { return mq.matches; }
  var REASONS = {
    'Dermatologie und Venerologie': ['Dermatologisches Anliegen', 'Kinder', 'Allergie'],
    'Ästhetische Medizin': ['Faltenbehandlung', 'Hautbild & Pigment', 'Beratung Ästhetik']
  };
  var POOL = ['08:30', '10:00', '11:30', '14:00', '15:30', '16:30'];
  // Deterministischer Hash je Datum → variierende, aber stabile Verfügbarkeit (kein Math.random).
  function h(d, salt) { var k = d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate() + salt * 0.137; var x = Math.sin(k) * 43758.5453; return x - Math.floor(x); }

  var state = { fach: null, grund: null, date: null, time: null, step: 0, weekOffset: 0, email: '', consent: false,
                calPhase: 'days', sheetDay: null, sheetDayDate: null, triggerEl: null };

  function sow(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; }
  function addDays(d, n) { var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function fmt(d) { return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear(); }
  function isoWeek(d) {
    var x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7) + 3);
    var f = new Date(Date.UTC(x.getUTCFullYear(), 0, 4));
    return 1 + Math.round(((x - f) / 864e5 - 3 + ((f.getUTCDay() + 6) % 7)) / 7);
  }
  var TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);
  var FIRST_FREE = addDays(sow(TODAY), 7); // ab nächster Woche frei → aktuelle Woche ausgebucht
  function slotsFor(d) {
    if (d < FIRST_FREE || d.getDay() === 0) return [];     // Vergangenheit / Sonntag geschlossen
    if (h(d, 0) < 0.22) return [];                          // ganzer Tag ausgebucht (Urlaub / Fortbildung)
    var out = POOL.filter(function (t, i) { return h(d, i + 1) < 0.5; });
    if (!out.length) out = [POOL[Math.floor(h(d, 9) * POOL.length)]];
    return out;
  }
  function nextFree() { for (var i = 0; i < 42; i++) { var d = addDays(FIRST_FREE, i); var s = slotsFor(d); if (s.length) return { date: d, time: s[0] }; } return null; }
  // Verfügbarkeitsstufe je Tag (ohne Uhrzeiten): frei / wenige / ausgebucht / geschlossen.
  // Abgeleitet aus slotsFor(d).length – Badge und spätere Uhrzeitliste stammen also aus derselben Quelle.
  function levelFor(d) {
    if (d.getDay() === 0) return { key: 'off', label: 'geschlossen', selectable: false, aria: 'geschlossen' };
    var n = slotsFor(d).length;                          // 0 Slots (auch laufende Woche/Vergangenheit) → ausgebucht
    if (n === 0) return { key: 'zu', label: 'ausgebucht', selectable: false, aria: 'ausgebucht' };
    if (n <= 2) return { key: 'wenige', label: 'wenige Termine', selectable: true, aria: 'wenige Termine frei' };
    return { key: 'frei', label: 'freie Termine', selectable: true, aria: 'freie Termine' };
  }
  function isToday(d) { return fmt(d) === fmt(TODAY); }
  function dayLabelShort(d) { return DOW[(d.getDay() + 6) % 7] + ', ' + d.getDate() + '. ' + MON[d.getMonth()]; }
  function dayLabelFull(d) { return DOWFULL[(d.getDay() + 6) % 7] + ', ' + d.getDate() + '. ' + MON[d.getMonth()]; }
  function weekStart() { return addDays(sow(TODAY), state.weekOffset * 7); }
  function weekLabel(ws) {
    var we = addDays(ws, 5), lbl;
    if (ws.getMonth() === we.getMonth()) lbl = ws.getDate() + '.–' + we.getDate() + '. ' + MON[we.getMonth()] + ' ' + we.getFullYear();
    else if (ws.getFullYear() === we.getFullYear()) lbl = ws.getDate() + '. ' + MON[ws.getMonth()] + ' – ' + we.getDate() + '. ' + MON[we.getMonth()] + ' ' + we.getFullYear();
    else lbl = ws.getDate() + '. ' + MON[ws.getMonth()] + ' ' + ws.getFullYear() + ' – ' + we.getDate() + '. ' + MON[we.getMonth()] + ' ' + we.getFullYear();
    return 'KW ' + isoWeek(ws) + ' · ' + lbl;
  }

  var stepsEl = bk.querySelector('.bk-steps');
  var steps = Array.prototype.slice.call(bk.querySelectorAll('.bk-step'));
  var back = document.getElementById('bkBack'), fwd = document.getElementById('bkFwd');

  function reasonsUI() {
    var wrap = document.getElementById('bkReasons'); wrap.innerHTML = '';
    (REASONS[state.fach] || []).forEach(function (r) {
      var b = document.createElement('button'); b.className = 'bk-pill' + (state.grund === r ? ' sel' : ''); b.textContent = r;
      b.onclick = function () { state.grund = r; reasonsUI(); updateNav(); };
      wrap.appendChild(b);
    });
  }

  function calUI() {
    var ws = addDays(sow(TODAY), state.weekOffset * 7), we = addDays(ws, 5);
    var lbl;
    if (ws.getMonth() === we.getMonth()) {
      lbl = ws.getDate() + '.–' + we.getDate() + '. ' + MON[we.getMonth()] + ' ' + we.getFullYear();
    } else if (ws.getFullYear() === we.getFullYear()) {
      lbl = ws.getDate() + '. ' + MON[ws.getMonth()] + ' – ' + we.getDate() + '. ' + MON[we.getMonth()] + ' ' + we.getFullYear();
    } else {
      lbl = ws.getDate() + '. ' + MON[ws.getMonth()] + ' ' + ws.getFullYear() + ' – ' + we.getDate() + '. ' + MON[we.getMonth()] + ' ' + we.getFullYear();
    }
    document.getElementById('bkKW').textContent = 'KW ' + isoWeek(ws) + ' · ' + lbl;
    document.getElementById('bkPrev').disabled = state.weekOffset <= 0;
    var wk = document.getElementById('bkWeek'); wk.innerHTML = '';
    var hasFree = false;
    for (var i = 0; i < 6; i++) {
      var d = addDays(ws, i), slots = slotsFor(d), booked = !slots.length, tod = isToday(d); if (slots.length) hasFree = true;
      var col = document.createElement('div'); col.className = 'bk-day' + (d < TODAY ? ' past' : '') + (booked ? ' booked' : '') + (tod ? ' today' : '');
      if (tod) col.setAttribute('aria-current', 'date');
      var h = '<div class="dow">' + DOW[i] + '</div><div class="dom">' + d.getDate() + '</div>' + (tod ? '<div class="bk-today-tag">Heute</div>' : '');
      if (booked) { h += '<div class="bk-none" title="ausgebucht">—</div>'; }
      else { slots.forEach(function (tm) { h += '<button class="bk-slot' + (state.date === fmt(d) && state.time === tm ? ' sel' : '') + '" data-d="' + fmt(d) + '" data-t="' + tm + '">' + tm + '</button>'; }); }
      col.innerHTML = h; wk.appendChild(col);
    }
    var empty = document.getElementById('bkEmpty'), jump = document.getElementById('bkJump'), msg = document.getElementById('bkEmptyMsg');
    if (hasFree) { empty.style.display = 'none'; }
    else {
      empty.style.display = 'block';
      if (state.date) {
        // Es wurde bereits ein Termin gewählt → kein "nächster Termin"-Button mehr.
        msg.innerHTML = 'Ihr gewählter Termin: <strong class="nf">' + state.date + ', ' + state.time + ' Uhr</strong>';
        jump.style.display = 'none';
      } else {
        var nf = nextFree();
        msg.innerHTML = 'Nächster freier Termin: <strong class="nf">' + (nf ? (DOW[(nf.date.getDay() + 6) % 7] + ', ' + fmt(nf.date)) : '—') + '</strong>';
        jump.style.display = '';
        jump.onclick = function () { if (!nf) return; state.weekOffset = Math.round((sow(nf.date) - sow(TODAY)) / (7 * 864e5)); calUI(); };
      }
    }
    wk.querySelectorAll('.bk-slot').forEach(function (b) {
      b.onclick = function () {
        wk.querySelectorAll('.bk-slot').forEach(function (x) { x.classList.remove('sel'); });
        b.classList.add('sel'); state.date = b.dataset.d; state.time = b.dataset.t; updateNav();
      };
    });
  }

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || ''); }
  function confirmUI() {
    var box = document.getElementById('bkConfirmBody');
    box.innerHTML =
      '<div class="bk-summary">' +
      row('Fachrichtung', state.fach) + row('Anliegen', state.grund) +
      row('Datum', state.date) + row('Uhrzeit', state.time + ' Uhr') +
      '</div>' +
      '<div class="b-field" style="margin-top:1.5rem"><label for="bkEmail">Ihre E-Mail-Adresse</label>' +
      '<input id="bkEmail" type="email" inputmode="email" autocomplete="email" placeholder="ihre.adresse@beispiel.ch" value="' + (state.email || '') + '"></div>' +
      '<label class="b-consent"><input type="checkbox" id="bkConsent"' + (state.consent ? ' checked' : '') +
      '><span>Ich habe die <a href="datenschutz-b.html" style="color:var(--gold);text-decoration:underline">Datenschutzerklärung</a> gelesen und willige in die Verarbeitung meiner Angaben zur Terminvereinbarung ein.</span></label>' +
      '<p class="hint">Unverbindliche Terminanfrage – wir bestätigen zeitnah und diskret. (Demo — es werden keine Daten übermittelt.)</p>';
    var em = document.getElementById('bkEmail'), cs = document.getElementById('bkConsent');
    em.addEventListener('input', function () { state.email = em.value.trim(); updateNav(); });
    cs.addEventListener('change', function () { state.consent = cs.checked; updateNav(); });
  }
  function row(k, v) { return '<div class="row"><span class="k">' + k + '</span><span class="v">' + (v || '–') + '</span></div>'; }

  function updateStepsUI() {
    stepsEl.querySelectorAll('.s').forEach(function (s, i) {
      s.classList.toggle('active', i === state.step); s.classList.toggle('done', i < state.step);
    });
  }
  function canAdvance() {
    return (state.step === 0 && state.fach) || (state.step === 1 && state.grund) ||
           (state.step === 2 && state.date && state.time) ||
           (state.step === 3 && validEmail(state.email) && state.consent);
  }
  function updateNav() {
    back.style.display = state.step === 0 ? 'none' : '';
    fwd.textContent = state.step === 3 ? 'Anfrage senden' : 'Weiter';
    fwd.disabled = !canAdvance(); fwd.style.opacity = canAdvance() ? '1' : '0.45';
  }
  /* ---- Mobiles Vollbild-Sheet (Airline-Muster, ≤760px): Schritt 3 ausgelagert ---- */
  var sheet, sBody, sTitle, sKW, sClose, sBack, sWeeknav, sPrev, sNext, sFoot, sNextStep, sLive;
  var trigBtn, trigLabel, trigSub, trigCta;
  var CHEV_L = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
  var CHEV_R = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
  var X_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg>';

  function buildSheet() {
    trigBtn = document.getElementById('bkTriggerBtn');
    trigLabel = document.getElementById('bkTriggerLabel');
    trigSub = document.getElementById('bkTriggerSub');
    trigCta = document.getElementById('bkTriggerCta');
    if (trigBtn) trigBtn.addEventListener('click', function () { openSheet(); });

    sheet = document.createElement('div');
    sheet.className = 'bk-sheet'; sheet.id = 'bkSheet';
    sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-labelledby', 'bkSheetTitle'); sheet.setAttribute('aria-hidden', 'true');
    sheet.setAttribute('data-phase', 'days');
    sheet.innerHTML =
      '<div class="bk-sheet-head">' +
        '<div class="bk-sheet-lead">' +
          '<button type="button" class="bk-sheet-ic" id="bkSheetClose" aria-label="schliessen">' + X_SVG + '</button>' +
          '<button type="button" class="bk-sheet-ic" id="bkSheetBack" aria-label="Zurück zur Tageswahl" hidden>' + CHEV_L + '</button>' +
        '</div>' +
        '<div class="bk-sheet-titles"><h2 class="bk-sheet-title" id="bkSheetTitle" tabindex="-1">Termin wählen</h2><span class="bk-sheet-kw" id="bkSheetKW"></span></div>' +
        '<div class="bk-sheet-weeknav" id="bkSheetWeeknav">' +
          '<button type="button" class="bk-navbtn" id="bkSheetPrev" aria-label="Vorherige Woche">' + CHEV_L + '</button>' +
          '<button type="button" class="bk-navbtn" id="bkSheetNext" aria-label="Nächste Woche">' + CHEV_R + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="bk-sheet-body" id="bkSheetBody"></div>' +
      '<div class="bk-sheet-foot" id="bkSheetFoot"><button type="button" class="b-btn b-btn-cream" id="bkSheetNextStep" disabled>Weiter</button></div>' +
      '<span class="b-vh" id="bkSheetLive" aria-live="polite"></span>';
    document.body.appendChild(sheet);

    sBody = sheet.querySelector('#bkSheetBody'); sTitle = sheet.querySelector('#bkSheetTitle');
    sKW = sheet.querySelector('#bkSheetKW'); sClose = sheet.querySelector('#bkSheetClose');
    sBack = sheet.querySelector('#bkSheetBack'); sWeeknav = sheet.querySelector('#bkSheetWeeknav');
    sPrev = sheet.querySelector('#bkSheetPrev'); sNext = sheet.querySelector('#bkSheetNext');
    sFoot = sheet.querySelector('#bkSheetFoot'); sNextStep = sheet.querySelector('#bkSheetNextStep');
    sLive = sheet.querySelector('#bkSheetLive');

    sClose.addEventListener('click', function () { closeSheet(); });
    sBack.addEventListener('click', function () { goDays(); });
    sPrev.addEventListener('click', function () { if (state.weekOffset > 0) { state.weekOffset--; renderSheetDays(); } });
    sNext.addEventListener('click', function () { state.weekOffset++; renderSheetDays(); });
    sNextStep.addEventListener('click', function () { if (state.sheetDay) goTimes(); });
    sheet.addEventListener('keydown', onSheetKey);
  }

  function announce(msg) { if (sLive) { sLive.textContent = ''; sLive.textContent = msg; } }

  function updateTrigger() {
    if (!trigBtn) return;
    if (state.date && state.time) {
      trigBtn.classList.add('has-sel');
      trigLabel.textContent = state.date + ' · ' + state.time + ' Uhr';
      if (trigSub) trigSub.hidden = true;
      if (trigCta && trigCta.firstChild) trigCta.firstChild.textContent = 'Ändern';
    } else {
      trigBtn.classList.remove('has-sel');
      trigLabel.textContent = 'Termin wählen';
      if (trigSub) { trigSub.hidden = false; trigSub.textContent = 'Tag und Uhrzeit im Kalender auswählen.'; }
      if (trigCta && trigCta.firstChild) trigCta.firstChild.textContent = 'Öffnen';
    }
  }

  function openSheet() {
    if (!sheet) return;
    state.triggerEl = trigBtn;
    sheet.classList.add('open'); sheet.setAttribute('aria-hidden', 'false');
    document.body.classList.add('b-noscroll');
    renderSheetDays();
    setTimeout(function () { try { sTitle.focus(); } catch (e) {} }, 30);
  }
  function closeSheet(silent) {
    if (!sheet) return;
    sheet.classList.remove('open'); sheet.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('b-noscroll');
    if (!silent && state.triggerEl) { try { state.triggerEl.focus(); } catch (e) {} }
  }

  function renderSheetDays() {
    state.calPhase = 'days'; sheet.setAttribute('data-phase', 'days');
    sClose.hidden = false; sBack.hidden = true;
    sWeeknav.style.display = ''; sKW.style.display = ''; sFoot.style.display = '';
    sTitle.textContent = 'Termin wählen';
    var ws = weekStart();
    sKW.textContent = weekLabel(ws);
    sPrev.disabled = state.weekOffset <= 0;

    var pane = document.createElement('div'); pane.className = 'bk-sheet-pane';
    var list = document.createElement('div'); list.className = 'bk-daylist';
    var hasFree = false;
    for (var i = 0; i < 6; i++) {
      var d = addDays(ws, i), lv = levelFor(d), isSel = state.sheetDay === fmt(d), tod = isToday(d);
      if (lv.selectable) hasFree = true;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'bk-dayrow bk-lvl-' + lv.key + (isSel ? ' sel' : '') + (tod ? ' today' : '');
      if (!lv.selectable) b.setAttribute('aria-disabled', 'true');
      if (tod) b.setAttribute('aria-current', 'date');
      b.setAttribute('aria-pressed', isSel ? 'true' : 'false');
      b.setAttribute('aria-label', dayLabelFull(d) + (tod ? ', heute' : '') + ', ' + lv.aria);
      b.innerHTML =
        '<span class="bk-dayrow-date"><span class="dow">' + DOW[i] + '</span><span class="dom">' + d.getDate() + '. ' + MON[d.getMonth()] + '</span>' + (tod ? '<span class="bk-today-tag">Heute</span>' : '') + '</span>' +
        '<span class="bk-badge bk-badge--' + lv.key + '"><span class="dot"></span>' + lv.label + '</span>' +
        '<span class="chev">' + CHEV_R + '</span>';
      if (lv.selectable) (function (d, b) {
        b.addEventListener('click', function () {
          state.sheetDay = fmt(d); state.sheetDayDate = d;
          list.querySelectorAll('.bk-dayrow').forEach(function (r) { r.classList.remove('sel'); r.setAttribute('aria-pressed', 'false'); });
          b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
          sNextStep.disabled = false;
          announce(dayLabelFull(d) + ' gewählt');
        });
      })(d, b);
      list.appendChild(b);
    }
    pane.appendChild(list);

    if (!hasFree) {
      var nf = nextFree();
      var em = document.createElement('div'); em.className = 'bk-empty';
      em.innerHTML =
        '<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div>' +
        '<h4>Diese Woche ist ausgebucht.</h4>' +
        '<p>Nächster freier Termin: <strong class="nf" style="color:var(--bone)">' + (nf ? dayLabelShort(nf.date) : '—') + '</strong></p>' +
        '<button type="button" class="b-btn b-btn-cream" id="bkSheetJump">Zum nächsten Termin' + CHEV_R + '</button>';
      pane.appendChild(em);
    }
    sBody.innerHTML = ''; sBody.appendChild(pane);
    var jb = sBody.querySelector('#bkSheetJump');
    if (jb) jb.addEventListener('click', function () {
      var nf = nextFree(); if (!nf) return;
      state.weekOffset = Math.round((sow(nf.date) - sow(TODAY)) / (7 * 864e5));
      renderSheetDays();
    });
    sNextStep.disabled = !state.sheetDay;
    announce(weekLabel(ws));
  }

  function goTimes() {
    var d = state.sheetDayDate; if (!d) return;
    state.calPhase = 'times'; sheet.setAttribute('data-phase', 'times');
    sClose.hidden = true; sBack.hidden = false;
    sWeeknav.style.display = 'none'; sKW.style.display = 'none'; sFoot.style.display = 'none';
    sTitle.textContent = dayLabelShort(d);
    var pane = document.createElement('div'); pane.className = 'bk-sheet-pane';
    var html = '<p class="bk-timehint">Bitte wählen Sie eine Uhrzeit für ' + dayLabelShort(d) + '.</p><div class="bk-timegrid">';
    slotsFor(d).forEach(function (tm) {
      html += '<button type="button" class="bk-slot" data-t="' + tm + '" aria-label="' + d.getDate() + '. ' + MON[d.getMonth()] + ', ' + tm + ' Uhr">' + tm + '</button>';
    });
    html += '</div>';
    pane.innerHTML = html; sBody.innerHTML = ''; sBody.appendChild(pane);
    sBody.querySelectorAll('.bk-slot').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.date = fmt(d); state.time = btn.dataset.t;
        announce(btn.dataset.t + ' Uhr gewählt');
        updateNav(); updateTrigger(); closeSheet(true);
        state.step = 3; render();
        var c = document.getElementById('bkConfirm'), hh = c ? c.querySelector('h3') : null;
        if (hh) { hh.setAttribute('tabindex', '-1'); hh.focus(); }
      });
    });
    setTimeout(function () { try { sTitle.focus(); } catch (e) {} }, 30);
    announce('Uhrzeiten für ' + dayLabelFull(d));
  }
  function goDays() { renderSheetDays(); setTimeout(function () { try { sTitle.focus(); } catch (e) {} }, 30); }

  function onSheetKey(e) {
    if (!sheet.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); if (state.calPhase === 'times') goDays(); else closeSheet(); return; }
    if (e.key === 'Tab') {
      var foc = Array.prototype.filter.call(sheet.querySelectorAll('button'), function (el) { return !el.hidden && !el.disabled && el.offsetParent !== null; });
      if (!foc.length) return;
      var first = foc[0], last = foc[foc.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function render() {
    updateStepsUI();
    steps.forEach(function (s, i) { s.classList.toggle('active', i === state.step); });
    if (state.step === 1) reasonsUI();
    if (state.step === 2) {
      // Kalender beim ersten Öffnen direkt auf die erste Woche MIT freien Terminen stellen,
      // statt auf der (ausgebuchten) aktuellen Woche zu landen. Zurückblättern bleibt möglich.
      if (!state.calInit) {
        state.calInit = true;
        var nf0 = nextFree();
        if (nf0) state.weekOffset = Math.round((sow(nf0.date) - sow(TODAY)) / (7 * 864e5));
      }
      if (isMobile()) { updateTrigger(); openSheet(); }   // Mobile: Trigger-Karte + Vollbild-Sheet
      else calUI();                                        // Desktop/Tablet: Inline-Kalender
    } else if (sheet && sheet.classList.contains('open')) {
      closeSheet(true);                                    // Schritt verlassen → offenes Sheet schliessen
    }
    if (state.step === 3) confirmUI();
    updateNav();
  }

  document.querySelectorAll('#bkFach .bk-pill').forEach(function (p) {
    p.onclick = function () {
      document.querySelectorAll('#bkFach .bk-pill').forEach(function (x) { x.classList.remove('sel'); });
      p.classList.add('sel'); state.fach = p.dataset.fach;
      if (REASONS[state.fach].indexOf(state.grund) < 0) state.grund = null;
      updateNav();
    };
  });
  fwd.onclick = function () {
    if (!canAdvance()) return;
    if (state.step < 3) { state.step++; render(); }
    else {
      document.querySelector('.bk-body').innerHTML =
        '<div class="bk-done" role="status" tabindex="-1"><div class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
        '<h3 style="margin-bottom:.6rem">Terminanfrage gesendet</h3>' +
        '<p>Vielen Dank. Wir haben Ihre Anfrage für den <strong style="color:var(--bone)">' + state.date + ' um ' + state.time + ' Uhr</strong> erhalten und melden uns zeitnah und diskret zur Bestätigung.</p></div>';
      document.querySelector('.bk-nav').style.display = 'none';
      stepsEl.querySelectorAll('.s').forEach(function (s) { s.classList.add('done'); });
      var bkDone = document.querySelector('.bk-done'); if (bkDone) bkDone.focus();
    }
  };
  back.onclick = function () { if (state.step > 0) { state.step--; render(); } };
  document.getElementById('bkPrev').onclick = function () { if (state.weekOffset > 0) { state.weekOffset--; calUI(); } };
  document.getElementById('bkNextWeek').onclick = function () { state.weekOffset++; calUI(); };

  buildSheet();
  // Bei Wechsel zwischen Mobile/Desktop (Rotation/Resize) sauber zwischen Sheet und Inline wechseln,
  // ohne die Auswahl zu verlieren.
  function onMqChange() {
    if (state.step !== 2) { if (sheet && sheet.classList.contains('open')) closeSheet(true); return; }
    if (isMobile()) { updateTrigger(); if (!sheet.classList.contains('open')) openSheet(); }
    else { if (sheet.classList.contains('open')) closeSheet(true); calUI(); }
  }
  if (mq.addEventListener) mq.addEventListener('change', onMqChange);
  else if (mq.addListener) mq.addListener(onMqChange);

  render();
})();
