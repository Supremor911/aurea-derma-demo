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
  if (t) {
    t.addEventListener('click', function () { nav.classList.toggle('open'); });
    document.querySelectorAll('#bnavlinks a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

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
        before.src = 'assets/img/ba-' + k + '-before.jpg';
        after.src = 'assets/img/ba-' + k + '-after.jpg';
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
    if ('IntersectionObserver' in window) {
      var hio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { setTimeout(runHint, 500); hio.unobserve(e.target); } });
      }, { threshold: 0.55 });
      hio.observe(stage);
    } else { setTimeout(runHint, 900); }
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
    var frender = function () {
      fsteps.forEach(function (s, i) { s.classList.toggle('active', i === fcur); });
      fdots.forEach(function (d, i) { d.classList.toggle('active', i <= fcur); });
      fprev.style.visibility = fcur === 0 ? 'hidden' : 'visible';
      fnext.textContent = fcur === fsteps.length - 1 ? 'Anfrage absenden' : 'Weiter';
    };
    fnext.addEventListener('click', function () {
      if (fcur < fsteps.length - 1) { fcur++; frender(); }   // kein scrollIntoView → keine Y-Sprünge
      else {
        bform.querySelector('.b-form-body').innerHTML =
          '<div class="b-form-done"><div class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
          '<h4>Vielen Dank für Ihr Vertrauen</h4>' +
          '<p>Ihre Angaben sind bei uns eingegangen. Dr. med. Carla Brunner und das AUREA Team melden sich zeitnah und diskret bei Ihnen, um Ihr persönliches Longevity-Anamnese-Gespräch zu vereinbaren.</p>' +
          '<p style="margin-top:1rem;font-size:0.82rem;color:var(--bone-mut);opacity:0.7">Demonstration — in diesem Mockup werden keine Daten übermittelt oder gespeichert.</p></div>';
        bform.querySelector('.b-form-nav').style.display = 'none';
        fdots.forEach(function (d) { d.classList.add('active'); });
      }
    });
    fprev.addEventListener('click', function () { if (fcur > 0) { fcur--; frender(); } });
    frender();
  }

  /* ---------- Booking mockup ---------- */
  var bk = document.getElementById('bk');
  if (!bk) return;

  var DOW = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  var MON = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  var REASONS = {
    'Dermatologie und Venerologie': ['Dermatologisches Anliegen', 'Kinder', 'Allergie'],
    'Ästhetische Medizin': ['Faltenbehandlung', 'Hautbild & Pigment', 'Beratung Ästhetik']
  };
  var POOL = ['08:30', '10:00', '11:30', '14:00', '15:30', '16:30'];
  // Deterministischer Hash je Datum → variierende, aber stabile Verfügbarkeit (kein Math.random).
  function h(d, salt) { var k = d.getFullYear() * 1e4 + (d.getMonth() + 1) * 100 + d.getDate() + salt * 0.137; var x = Math.sin(k) * 43758.5453; return x - Math.floor(x); }

  var state = { fach: null, grund: null, date: null, time: null, step: 0, weekOffset: 0 };

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
      var d = addDays(ws, i), slots = slotsFor(d), booked = !slots.length; if (slots.length) hasFree = true;
      var col = document.createElement('div'); col.className = 'bk-day' + (d < TODAY ? ' past' : '') + (booked ? ' booked' : '');
      var h = '<div class="dow">' + DOW[i] + '</div><div class="dom">' + d.getDate() + '</div>';
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

  function confirmUI() {
    document.getElementById('bkConfirmBody').innerHTML =
      '<div class="bk-summary">' +
      row('Fachrichtung', state.fach) + row('Anliegen', state.grund) +
      row('Datum', state.date) + row('Uhrzeit', state.time + ' Uhr') +
      '</div><p class="hint">Dies ist eine unverbindliche Terminanfrage. Wir bestätigen Ihren Termin zeitnah und diskret. (Demo — es werden keine Daten übermittelt.)</p>';
  }
  function row(k, v) { return '<div class="row"><span class="k">' + k + '</span><span class="v">' + (v || '–') + '</span></div>'; }

  function updateStepsUI() {
    stepsEl.querySelectorAll('.s').forEach(function (s, i) {
      s.classList.toggle('active', i === state.step); s.classList.toggle('done', i < state.step);
    });
  }
  function canAdvance() {
    return (state.step === 0 && state.fach) || (state.step === 1 && state.grund) ||
           (state.step === 2 && state.date && state.time) || state.step === 3;
  }
  function updateNav() {
    back.style.visibility = state.step === 0 ? 'hidden' : 'visible';
    fwd.textContent = state.step === 3 ? 'Anfrage senden' : 'Weiter';
    fwd.disabled = !canAdvance(); fwd.style.opacity = canAdvance() ? '1' : '0.45';
  }
  function render() {
    updateStepsUI();
    steps.forEach(function (s, i) { s.classList.toggle('active', i === state.step); });
    if (state.step === 1) reasonsUI();
    if (state.step === 2) calUI();
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
        '<div class="bk-done"><div class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
        '<h3 style="margin-bottom:.6rem">Terminanfrage gesendet</h3>' +
        '<p>Vielen Dank. Wir haben Ihre Anfrage für <strong style="color:var(--bone)">' + state.date + ' um ' + state.time + ' Uhr</strong> erhalten und melden uns zeitnah und diskret zur Bestätigung.</p></div>';
      document.querySelector('.bk-nav').style.display = 'none';
      stepsEl.querySelectorAll('.s').forEach(function (s) { s.classList.add('done'); });
    }
  };
  back.onclick = function () { if (state.step > 0) { state.step--; render(); } };
  document.getElementById('bkPrev').onclick = function () { if (state.weekOffset > 0) { state.weekOffset--; calUI(); } };
  document.getElementById('bkNextWeek').onclick = function () { state.weekOffset++; calUI(); };

  render();
})();
