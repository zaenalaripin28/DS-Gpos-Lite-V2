// Design System GPOS Lite V 2.0
// Interactive Features Script

document.addEventListener('DOMContentLoaded', function () {

  // ================================================
  // MOBILE SIDEBAR MENU
  // ================================================
  const sidebar         = document.getElementById('sidebar');
  const overlay         = document.getElementById('sidebar-overlay');
  const hamburgerBtn    = document.getElementById('hamburger-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close');

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('mobile-open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn)    hamburgerBtn.addEventListener('click', openSidebar);
  if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
  if (overlay)         overlay.addEventListener('click', closeSidebar);

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeSidebar();
  });

  // ================================================
  // ACTIVE NAV LINK HIGHLIGHT
  // ================================================
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });

  // ================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ================================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ================================================
  // COLOR BOX — COPY TO CLIPBOARD
  // ================================================
  document.querySelectorAll('.color-box').forEach(function (box) {
    box.addEventListener('click', function () {
      const valueEl = this.querySelector('.color-value');
      if (!valueEl) return;
      const colorValue = valueEl.textContent.trim();
      navigator.clipboard.writeText(colorValue).then(function () {
        const original = valueEl.textContent;
        valueEl.textContent = '✓ Copied!';
        setTimeout(function () { valueEl.textContent = original; }, 1600);
      }).catch(function () {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = colorValue;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        const original = valueEl.textContent;
        valueEl.textContent = '✓ Copied!';
        setTimeout(function () { valueEl.textContent = original; }, 1600);
      });
    });
  });

  // ================================================
  // CODE BLOCK — COPY BUTTON
  // ================================================
  document.querySelectorAll('pre code').forEach(function (block) {
    const pre    = block.parentElement;
    const button = document.createElement('button');

    button.textContent = 'Copy';
    button.className   = 'code-copy-btn';
    button.style.cssText = [
      'position:absolute',
      'top:10px',
      'right:10px',
      'padding:3px 10px',
      'background:rgba(255,255,255,0.1)',
      'color:#94A3B8',
      'border:1px solid rgba(255,255,255,0.15)',
      'border-radius:6px',
      'cursor:pointer',
      'font-size:11px',
      'font-weight:500',
      'font-family:var(--font-primary)',
      'transition:all 150ms ease',
      'letter-spacing:0.02em',
    ].join(';');

    button.addEventListener('mouseenter', function () {
      this.style.background = 'rgba(30,127,214,0.3)';
      this.style.color       = '#7CC5FF';
      this.style.borderColor = 'rgba(30,127,214,0.4)';
    });
    button.addEventListener('mouseleave', function () {
      if (this.textContent !== '✓ Done!') {
        this.style.background   = 'rgba(255,255,255,0.1)';
        this.style.color        = '#94A3B8';
        this.style.borderColor  = 'rgba(255,255,255,0.15)';
      }
    });

    button.addEventListener('click', function () {
      const text = block.textContent;
      navigator.clipboard.writeText(text).then(() => {
        button.textContent = '✓ Done!';
        button.style.background   = 'rgba(34,197,94,0.2)';
        button.style.color        = '#4ADE80';
        button.style.borderColor  = 'rgba(34,197,94,0.3)';
        setTimeout(() => {
          button.textContent = 'Copy';
          button.style.background   = 'rgba(255,255,255,0.1)';
          button.style.color        = '#94A3B8';
          button.style.borderColor  = 'rgba(255,255,255,0.15)';
        }, 1800);
      });
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });

  // ================================================
  // TABLE OF CONTENTS (auto-generate if .toc exists)
  // ================================================
  const tocContainer = document.querySelector('.toc');
  if (tocContainer) {
    const headings = document.querySelectorAll('.content-inner h2, .content-inner h3');
    const toc      = document.createElement('ul');
    toc.style.listStyle = 'none';

    headings.forEach(function (heading, i) {
      heading.id = 'section-' + i;
      const li   = document.createElement('li');
      const link = document.createElement('a');
      link.href        = '#section-' + i;
      link.textContent = heading.textContent.replace(/^[│]?\s*/, '');
      link.style.cssText = [
        'color:var(--color-text-secondary)',
        'font-size:var(--font-size-sm)',
        'text-decoration:none',
        'display:block',
        'padding:3px 0',
        'transition:color 150ms ease',
      ].join(';');

      if (heading.tagName === 'H3') {
        li.style.paddingLeft = '16px';
      }
      li.appendChild(link);
      toc.appendChild(li);
    });

    if (headings.length > 0) tocContainer.appendChild(toc);
  }

  // ================================================
  // SEARCH INPUT — Filter Nav Links (cosmetic)
  // ================================================
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();
      document.querySelectorAll('.nav-link').forEach(function (link) {
        const text = link.textContent.toLowerCase();
        const li   = link.parentElement;
        if (query === '' || text.includes(query)) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });
      // Show/hide section titles
      document.querySelectorAll('.nav-section').forEach(function (section) {
        const visible = Array.from(section.querySelectorAll('.nav-link'))
          .some(function (l) { return l.parentElement.style.display !== 'none'; });
        section.style.display = (query === '' || visible) ? '' : 'none';
      });
    });
  }

});

// ================================================
// UTILITY — Read CSS Variable Value
// ================================================
function getCSSVariableValue(varName) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

// Export for module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getCSSVariableValue };
}
