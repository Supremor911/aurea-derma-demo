/* AUREA — Mockup interactions */
(function () {
  'use strict';

  // ---- Sticky nav state ----
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile nav ----
  var toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    document.querySelectorAll('#navlinks a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.parentElement;
      var ans = q.nextElementSibling;
      var open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (it) {
        it.classList.remove('open');
        it.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!open) {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 'px';
      }
    });
  });

  // ---- Scroll reveal ----
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Multi-step form (Longevity page) ----
  var form = document.getElementById('anamnese');
  if (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('.fstep'));
    var dots = Array.prototype.slice.call(form.querySelectorAll('.progress .dot'));
    var btnNext = form.querySelector('[data-next]');
    var btnPrev = form.querySelector('[data-prev]');
    var current = 0;

    function render() {
      steps.forEach(function (s, i) { s.classList.toggle('active', i === current); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i <= current); });
      btnPrev.style.visibility = current === 0 ? 'hidden' : 'visible';
      btnNext.textContent = current === steps.length - 1 ? 'Anfrage absenden' : 'Weiter';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    btnNext.addEventListener('click', function () {
      if (current < steps.length - 1) { current++; render(); }
      else {
        form.querySelector('.form-body').innerHTML =
          '<div class="form-done"><div class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>' +
          '<h4>Vielen Dank für Ihr Vertrauen</h4>' +
          '<p>Ihre Angaben sind bei uns eingegangen. Dr. med. Carla Brunner und das AUREA Team melden sich zeitnah und diskret bei Ihnen, um einen Termin für Ihr persönliches Longevity-Anamnese-Gespräch zu vereinbaren.</p>' +
          '<p style="margin-top:1rem;font-size:0.82rem;color:var(--muted-2)">Demonstration — in diesem Mockup werden keine Daten übermittelt oder gespeichert.</p></div>';
        form.querySelector('.form-nav').style.display = 'none';
        document.querySelectorAll('.progress .dot').forEach(function (d) { d.classList.add('active'); });
      }
    });
    btnPrev.addEventListener('click', function () { if (current > 0) { current--; render(); } });
    render();
  }
})();
