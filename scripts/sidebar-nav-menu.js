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

  function ensureComponentLinksInSidebar() {
    var componentSections = document.querySelectorAll('.nav-section--menu');
    if (!componentSections.length) return;

    componentSections.forEach(function (section) {
      var title = section.querySelector('.nav-title');
      if (!title || title.textContent.trim().toLowerCase() !== 'komponen') return;

      var navList = section.querySelector('.nav-list');
      if (!navList) return;

      var buttonLink = navList.querySelector('a[href*="/Button/button.html"]');
      var modalHref = '../Modal/modal.html';
      if (buttonLink && buttonLink.getAttribute('href')) {
        modalHref = buttonLink.getAttribute('href').replace('/Button/button.html', '/Modal/modal.html');
      }
      var popupItem = navList.querySelector('a[href*="/Popup/popup.html"]');
      var popupLi = popupItem ? popupItem.closest('li') : null;
      var modalItem = navList.querySelector('a[href*="/Modal/modal.html"]') ? null : document.createElement('li');
      if (modalItem) {
        var modalLink = document.createElement('a');
        modalLink.href = modalHref;
        modalLink.className = 'nav-link';
        modalLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/></svg>Modal';
        modalItem.appendChild(modalLink);
      }

      var tourguideHref = '../Tourguide/tourguide.html';
      if (buttonLink && buttonLink.getAttribute('href')) {
        tourguideHref = buttonLink.getAttribute('href').replace('/Button/button.html', '/Tourguide/tourguide.html');
      }
      var tourguideItem = navList.querySelector('a[href*="/Tourguide/tourguide.html"]') ? null : document.createElement('li');
      if (tourguideItem) {
        var tourguideLink = document.createElement('a');
        tourguideLink.href = tourguideHref;
        tourguideLink.className = 'nav-link';
        tourguideLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M21 12h-3"/><path d="M6 12H3"/></svg>Tourguide';
        tourguideItem.appendChild(tourguideLink);
      }

      var pageHeaderHref = '../Page Header/page-header.html';
      if (buttonLink && buttonLink.getAttribute('href')) {
        pageHeaderHref = buttonLink.getAttribute('href').replace('/Button/button.html', '/Page Header/page-header.html');
      }
      var pageHeaderItem = navList.querySelector('a[href*="/Page Header/page-header.html"]') ? null : document.createElement('li');
      if (pageHeaderItem) {
        var pageHeaderLink = document.createElement('a');
        pageHeaderLink.href = pageHeaderHref;
        pageHeaderLink.className = 'nav-link';
        pageHeaderLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="13" width="11" height="5" rx="1"/><line x1="17" y1="15" x2="21" y2="15"/><line x1="17" y1="18" x2="21" y2="18"/></svg>Page Header';
        pageHeaderItem.appendChild(pageHeaderLink);
      }

      var breadcrumbsLi = navList.querySelector('a[href*="/Breadcrumbs/breadcrumbs.html"]');
      breadcrumbsLi = breadcrumbsLi ? breadcrumbsLi.closest('li') : null;
      var tabsLi = navList.querySelector('a[href*="/Tabs/tabs.html"]');
      tabsLi = tabsLi ? tabsLi.closest('li') : null;

      var pageLayoutHref = '../Page layout/page-layout.html';
      if (buttonLink && buttonLink.getAttribute('href')) {
        pageLayoutHref = buttonLink.getAttribute('href').replace('/Button/button.html', '/Page layout/page-layout.html');
      }
      var pageLayoutItem = navList.querySelector('a[href*="/Page layout/page-layout.html"]') ? null : document.createElement('li');
      if (pageLayoutItem) {
        var pageLayoutLink = document.createElement('a');
        pageLayoutLink.href = pageLayoutHref;
        pageLayoutLink.className = 'nav-link';
        pageLayoutLink.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><line x1="3" y1="12" x2="21" y2="12" stroke-dasharray="2 2"/></svg>Page Layout';
        pageLayoutItem.appendChild(pageLayoutLink);
      }

      if (breadcrumbsLi && pageHeaderItem && breadcrumbsLi.parentNode === navList) {
        if (tabsLi) navList.insertBefore(pageHeaderItem, tabsLi);
        else breadcrumbsLi.insertAdjacentElement('afterend', pageHeaderItem);
      }

      if (pageHeaderItem && pageLayoutItem && pageHeaderItem.parentNode === navList) {
        pageHeaderItem.insertAdjacentElement('afterend', pageLayoutItem);
      } else if (breadcrumbsLi && pageLayoutItem && breadcrumbsLi.parentNode === navList) {
        if (tabsLi) navList.insertBefore(pageLayoutItem, tabsLi);
        else breadcrumbsLi.insertAdjacentElement('afterend', pageLayoutItem);
      }

      if (popupLi && popupLi.parentNode === navList) {
        if (modalItem) navList.insertBefore(modalItem, popupLi);
        if (tourguideItem) navList.insertBefore(tourguideItem, popupLi);
      } else {
        if (modalItem) navList.appendChild(modalItem);
        if (tourguideItem) navList.appendChild(tourguideItem);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    ensureComponentLinksInSidebar();
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
