/**
 * DS GPOS Lite — Sidebar nav: section toggle + scroll persistence
 */
(function () {
  'use strict';

  var SECTION_KEY = 'ds-nav-section-states';

  function saveSectionStates() {
    var states = {};
    document.querySelectorAll('.nav-section--menu').forEach(function (sec, i) {
      states[i] = sec.classList.contains('is-open');
    });
    try { sessionStorage.setItem(SECTION_KEY, JSON.stringify(states)); } catch (e) {}
  }

  function restoreSectionStates() {
    var stored;
    try { stored = JSON.parse(sessionStorage.getItem(SECTION_KEY)); } catch (e) {}
    if (!stored) return;
    document.querySelectorAll('.nav-section--menu').forEach(function (sec, i) {
      if (i in stored) {
        var open = stored[i];
        sec.classList.toggle('is-open', open);
        var btn = sec.querySelector('.nav-menu-toggle');
        if (btn) btn.setAttribute('aria-expanded', String(open));
      }
    });
  }

  /* Scroll active nav link into view on first visit */
  function scrollToActive() {
    var active = document.querySelector('.nav-link.active');
    var navScroll = document.querySelector('.nav-scroll');
    if (!active || !navScroll) return;
    requestAnimationFrame(function () {
      var linkRect = active.getBoundingClientRect();
      var containerRect = navScroll.getBoundingClientRect();
      var offset = linkRect.top - containerRect.top;
      var center = offset - navScroll.clientHeight / 2 + active.clientHeight / 2;
      navScroll.scrollTop = Math.max(0, navScroll.scrollTop + center);
    });
  }

  function initScrollPersistence() {
    var navScroll = document.querySelector('.nav-scroll');
    if (!navScroll) return;
    var key = 'ds-nav-scroll:' + location.pathname;
    var saved = sessionStorage.getItem(key);
    if (saved !== null) {
      navScroll.scrollTop = parseInt(saved, 10) || 0;
    } else {
      scrollToActive();
    }
    var timer;
    navScroll.addEventListener('scroll', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        try { sessionStorage.setItem(key, String(navScroll.scrollTop)); } catch (e) {}
      }, 150);
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    restoreSectionStates();

    document.querySelectorAll('.nav-section--menu .nav-menu-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var section = btn.closest('.nav-section--menu');
        if (!section) return;
        var open = section.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
        saveSectionStates();
      });
    });

    initScrollPersistence();
  });
})();
