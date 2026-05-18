// Design System GPOS Lite V 2.0
// JavaScript for interactive features

// Mobile menu toggle (if needed)
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Active nav link highlight
    const currentPage = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--color-primary-400)';
            link.style.backgroundColor = 'var(--color-gray-800)';
        }
    });

    // Color copy to clipboard
    document.querySelectorAll('.color-box').forEach(box => {
        box.style.cursor = 'pointer';
        box.addEventListener('click', function() {
            const colorValue = this.querySelector('.color-value').textContent;
            navigator.clipboard.writeText(colorValue).then(() => {
                const originalText = this.querySelector('.color-value').textContent;
                this.querySelector('.color-value').textContent = 'Copied!';
                setTimeout(() => {
                    this.querySelector('.color-value').textContent = originalText;
                }, 1500);
            });
        });
    });

    // Code block copy button
    document.querySelectorAll('pre code').forEach((block) => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 12px;
            background-color: var(--color-primary-500);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: background-color 0.2s;
        `;

        button.addEventListener('mouseenter', () => {
            button.style.backgroundColor = 'var(--color-primary-600)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.backgroundColor = 'var(--color-primary-500)';
        });

        button.addEventListener('click', () => {
            const text = block.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 1500);
            });
        });

        // Position the button relative to pre
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });

    // Table of contents generator
    const tocContainer = document.querySelector('.toc');
    if (tocContainer) {
        const headings = document.querySelectorAll('h2, h3');
        const toc = document.createElement('ul');

        headings.forEach((heading, index) => {
            heading.id = `heading-${index}`;
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#heading-${index}`;
            link.textContent = heading.textContent;

            if (heading.tagName === 'H3') {
                li.style.marginLeft = '20px';
            }

            li.appendChild(link);
            toc.appendChild(li);
        });

        if (headings.length > 0) {
            tocContainer.appendChild(toc);
        }
    }

    // Page scrolling utility
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        // Show scroll to top button
        const scrollTop = document.querySelector('.scroll-to-top');
        if (scrollTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollTop.style.display = 'block';
                } else {
                    scrollTop.style.display = 'none';
                }
            });

            scrollTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // Dark mode toggle (optional future feature)
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';

        if (isDarkMode) {
            document.documentElement.style.colorScheme = 'dark';
        }

        darkModeToggle.addEventListener('click', () => {
            const isDark = localStorage.getItem('darkMode') === 'true';
            localStorage.setItem('darkMode', !isDark);
            location.reload();
        });
    }
});

// Utility function to get CSS variable value
function getCSSVariableValue(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getCSSVariableValue };
}