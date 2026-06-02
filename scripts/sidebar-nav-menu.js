/**
 * DS GPOS Lite — collapsible sidebar nav sections (.nav-section--menu)
 */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.nav-section--menu .nav-menu-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var section = btn.closest('.nav-section--menu');
      if (!section) return;
      var open = section.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
});
