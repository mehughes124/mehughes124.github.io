// Small bits of behaviour shared across the site. No dependencies.
(function () {
  // Header border once the page scrolls
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 4); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Homepage seesaw: Work and Life tip the beam, Balance wobbles it.
  var seesaw = document.getElementById('seesaw');
  if (seesaw) {
    var set = function (deg) { seesaw.style.setProperty('--tilt', deg + 'deg'); };
    var timers = [];
    var clear = function () { timers.forEach(clearTimeout); timers = []; };

    seesaw.querySelectorAll('[data-tilt]').forEach(function (el) {
      var deg = parseFloat(el.getAttribute('data-tilt'));
      el.addEventListener('mouseenter', function () { clear(); set(deg); });
      el.addEventListener('focus', function () { clear(); set(deg); });
      el.addEventListener('mouseleave', function () { set(0); });
      el.addEventListener('blur', function () { set(0); });
    });

    var wobble = function () {
      clear();
      [[-5, 0], [4, 260], [-2.5, 520], [1.2, 760], [0, 980]].forEach(function (step) {
        timers.push(setTimeout(function () { set(step[0]); }, step[1]));
      });
    };
    var fulcrum = seesaw.querySelector('[data-wobble]');
    if (fulcrum) {
      fulcrum.addEventListener('mouseenter', wobble);
      fulcrum.addEventListener('focus', wobble);
    }
    // Say hello once on load
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timers.push(setTimeout(wobble, 500));
    }
  }

  // Web work page: open a project's release notes when linked to it by #anchor
  var openFromHash = function () {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    var notes = target && target.querySelector('details.changelog');
    if (notes) notes.open = true;
  };
  openFromHash();
  window.addEventListener('hashchange', openFromHash);

  // Work page: highlight one facet of every role
  var jobs = document.getElementById('jobs');
  var chips = document.querySelectorAll('[data-filter-btn]');
  if (jobs && chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.getAttribute('data-filter-btn');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
        if (f === 'all') jobs.removeAttribute('data-filter');
        else jobs.setAttribute('data-filter', f);
      });
    });
  }
})();
