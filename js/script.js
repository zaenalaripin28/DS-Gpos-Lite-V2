// Design System GPOS Lite V 2.0
// Enhanced JavaScript for interactive features

document.addEventListener('DOMContentLoaded', function () {

  // ========================================
  // Dark Mode Toggle
  // ========================================
  const DARK_KEY = 'gpos-theme';
  const root = document.documentElement;
  const darkModeToggle = document.getElementById('darkModeToggle');
  const topbarTheme = document.getElementById('topbarTheme');
  const toggleIcon = document.getElementById('toggleIcon');
  const toggleLabel = document.getElementById('toggleLabel');

  const sunIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  const moonIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const moonIconSm = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunIconSm = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

  function applyTheme(isDark) {
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      if (toggleIcon) toggleIcon.innerHTML = sunIcon;
      if (toggleLabel) toggleLabel.textContent = 'Light Mode';
      if (topbarTheme) topbarTheme.innerHTML = sunIconSm;
    } else {
      root.removeAttribute('data-theme');
      if (toggleIcon) toggleIcon.innerHTML = moonIcon;
      if (toggleLabel) toggleLabel.textContent = 'Dark Mode';
      if (topbarTheme) topbarTheme.innerHTML = moonIconSm;
    }
  }

  // Initialise from saved preference or system preference
  const saved = localStorage.getItem(DARK_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved !== null ? saved === 'dark' : prefersDark;
  applyTheme(isDark);

  function toggleTheme() {
    const current = root.getAttribute('data-theme') === 'dark';
    localStorage.setItem(DARK_KEY, current ? 'light' : 'dark');
    applyTheme(!current);
  }

  if (darkModeToggle) darkModeToggle.addEventListener('click', toggleTheme);
  if (topbarTheme) topbarTheme.addEventListener('click', toggleTheme);

  // ========================================
  // Mobile Sidebar Toggle
  // ========================================
  const sidebar = document.getElementById('sidebar');
  const hamburger = document.getElementById('hamburger');
  const sidebarClose = document.getElementById('sidebarClose');
  const overlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Close sidebar when clicking a nav link on mobile
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) closeSidebar();
    });
  });

  // ========================================
  // Desktop Sidebar Collapse Toggle
  // ========================================
  const SIDEBAR_KEY = 'gpos-sidebar';
  const sidebarCollapseBtn = document.getElementById('sidebarCollapseBtn');
  const sidebarReopenTab   = document.getElementById('sidebarReopenTab');

  function applySidebarCollapse(isHidden) {
    document.body.classList.toggle('sidebar-hidden', isHidden);
  }

  // Restore saved state (only on desktop)
  if (window.innerWidth >= 769) {
    const savedSidebar = localStorage.getItem(SIDEBAR_KEY);
    if (savedSidebar === 'hidden') applySidebarCollapse(true);
  }

  function toggleSidebarCollapse() {
    const isNowHidden = !document.body.classList.contains('sidebar-hidden');
    applySidebarCollapse(isNowHidden);
    localStorage.setItem(SIDEBAR_KEY, isNowHidden ? 'hidden' : 'visible');
  }

  if (sidebarCollapseBtn) sidebarCollapseBtn.addEventListener('click', toggleSidebarCollapse);
  if (sidebarReopenTab)   sidebarReopenTab.addEventListener('click', toggleSidebarCollapse);

  // ========================================
  // Active Nav Link Highlight
  // ========================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (linkFile === currentPath || (currentPath === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ========================================
  // Scroll to Top Button
  // ========================================
  const scrollBtn = document.getElementById('scrollToTop');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 320) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================================
  // Copy Button for Code Blocks
  // ========================================
  document.querySelectorAll('pre code').forEach(block => {
    const pre = block.parentElement;
    pre.style.position = 'relative';

    const btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code');
    btn.style.cssText = `
      position: absolute; top: 10px; right: 10px;
      padding: 4px 10px;
      background: rgba(255,255,255,.1);
      color: rgba(255,255,255,.75);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 6px;
      cursor: pointer;
      font-size: 11px;
      font-weight: 500;
      font-family: inherit;
      transition: all 150ms ease;
    `;
    btn.addEventListener('mouseenter', () => {
      btn.style.background = 'rgba(255,255,255,.18)';
      btn.style.color = 'white';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = 'rgba(255,255,255,.1)';
      btn.style.color = 'rgba(255,255,255,.75)';
    });
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent).then(() => {
        btn.textContent = '✓ Copied';
        btn.style.color = '#86efac';
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.style.color = 'rgba(255,255,255,.75)';
        }, 1800);
      });
    });

    pre.appendChild(btn);
  });

  // ========================================
  // Color Box Click to Copy
  // ========================================
  document.querySelectorAll('.color-box').forEach(box => {
    box.addEventListener('click', function () {
      const valueEl = this.querySelector('.color-value');
      if (!valueEl) return;
      const colorValue = valueEl.textContent;
      navigator.clipboard.writeText(colorValue).then(() => {
        const orig = valueEl.textContent;
        valueEl.textContent = 'Copied!';
        setTimeout(() => { valueEl.textContent = orig; }, 1500);
      });
    });
  });

  // ========================================
  // Table of Contents Generator
  // ========================================
  const tocContainer = document.querySelector('.toc');
  if (tocContainer) {
    const headings = document.querySelectorAll('h2, h3');
    const toc = document.createElement('ul');
    toc.style.cssText = 'list-style:none; padding:0;';

    headings.forEach((heading, i) => {
      heading.id = `heading-${i}`;
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#heading-${i}`;
      a.textContent = heading.textContent;
      if (heading.tagName === 'H3') li.style.paddingLeft = '16px';
      li.appendChild(a);
      toc.appendChild(li);
    });

    if (headings.length > 0) tocContainer.appendChild(toc);
  }

  // ========================================
  // Entrance Animations (Intersection Observer)
  // ========================================
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.card, .token-item, .guide-step, .practice-group, .stat-item').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      observer.observe(el);
    });
  }

});

// Utility: get CSS variable value
function getCSSVariableValue(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getCSSVariableValue };
}
