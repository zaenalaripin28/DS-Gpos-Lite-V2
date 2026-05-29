#!/usr/bin/env python3
"""Generate tailwind.config.js with CSS variable mappings from tokens.css."""

from __future__ import annotations

import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
TOKENS_CSS = PROJECT_ROOT / "styles" / "tokens.css"
OUTPUT = PROJECT_ROOT / "tailwind.config.js"


def parse_css_vars(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", text))


def scale(prefix: str, keys: list[str], css: dict[str, str]) -> dict[str, str]:
    out: dict[str, str] = {}
    for key in keys:
        var = f"{prefix}{key}"
        if var in css:
            out[key] = f"var({var})"
    return out


def main() -> None:
    css = parse_css_vars(TOKENS_CSS)

    primary = scale("--color-primary-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"], css)
    secondary = scale("--color-secondary-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"], css)
    success = scale("--color-success-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"], css)
    warning = scale("--color-warning-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"], css)
    error = scale("--color-error-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"], css)
    info = scale("--color-info-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"], css)
    gray = scale("--color-gray-", ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"], css)

    blue = scale("--color-blue-b", ["50", "75", "100", "200", "300", "400", "500"], css)
    orange = scale("--color-orange-o", ["50", "75", "100", "200", "300", "400", "500"], css)
    red = scale("--color-red-r", ["50", "75", "100", "200", "300", "400", "500"], css)
    green = scale("--color-green-g", ["50", "75", "100", "200", "300", "400", "500"], css)
    purple = scale("--color-purple-p", ["50", "75", "100", "200", "300", "400", "500"], css)
    neutral = scale(
        "--color-neutral-n",
        ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
        css,
    )

    spacing_gp = {
        "0": "var(--space-0)",
        "025": "var(--space-025)",
        "050": "var(--space-050)",
        "075": "var(--space-075)",
        "100": "var(--space-100)",
        "150": "var(--space-150)",
        "200": "var(--space-200)",
        "250": "var(--space-250)",
        "300": "var(--space-300)",
        "400": "var(--space-400)",
        "500": "var(--space-500)",
        "600": "var(--space-600)",
        "800": "var(--space-800)",
        "1000": "var(--space-1000)",
        "1": "var(--spacing-1)",
        "2": "var(--spacing-2)",
        "3": "var(--spacing-3)",
        "4": "var(--spacing-4)",
        "5": "var(--spacing-5)",
        "6": "var(--spacing-6)",
        "8": "var(--spacing-8)",
        "10": "var(--spacing-10)",
        "12": "var(--spacing-12)",
        "16": "var(--spacing-16)",
        "20": "var(--spacing-20)",
        "24": "var(--spacing-24)",
    }

    border_radius = {
        "none": "var(--border-radius-none)",
        "sm": "var(--border-radius-sm)",
        "md": "var(--border-radius-md)",
        "lg": "var(--border-radius-lg)",
        "xl": "var(--border-radius-xl)",
        "2xl": "var(--border-radius-2xl)",
        "3xl": "var(--border-radius-3xl)",
        "full": "var(--border-radius-full)",
    }

    border_width = {
        "0": "var(--border-width-0)",
        "1": "var(--border-width-1)",
        "2": "var(--border-width-2)",
        "4": "var(--border-width-4)",
    }

    box_shadow = {
        "1": "var(--shadow-1)",
        "xs": "var(--shadow-xs)",
        "sm": "var(--shadow-sm)",
        "md": "var(--shadow-md)",
        "lg": "var(--shadow-lg)",
        "xl": "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        "brand": "var(--shadow-brand)",
        "inner": "var(--shadow-inner)",
        "none": "var(--shadow-none)",
    }

    font_size = {
        "xs": "var(--font-size-xs)",
        "sm": "var(--font-size-sm)",
        "base": "var(--font-size-base)",
        "lg": "var(--font-size-lg)",
        "xl": "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "caption": "var(--text-caption-regular-size)",
        "overline": "var(--text-overline-medium-size)",
        "body-sm": "var(--text-body-small-regular-size)",
        "body-md": "var(--text-body-medium-regular-size)",
        "body-lg": "var(--text-body-large-regular-size)",
        "title": "var(--text-title-medium-size)",
    }

    font_weight = {
        "light": "var(--font-weight-light)",
        "normal": "var(--font-weight-normal)",
        "medium": "var(--font-weight-medium)",
        "semibold": "var(--font-weight-semibold)",
        "bold": "var(--font-weight-bold)",
    }

    line_height = {
        "tight": "var(--line-height-tight)",
        "snug": "var(--line-height-snug)",
        "normal": "var(--line-height-normal)",
        "relaxed": "var(--line-height-relaxed)",
        "loose": "var(--line-height-loose)",
        "body-sm": "var(--text-body-small-regular-lh)",
        "caption": "var(--text-caption-regular-lh)",
        "overline": "var(--text-overline-medium-lh)",
    }

    letter_spacing = {
        "tight": "var(--letter-spacing-tight)",
        "normal": "var(--letter-spacing-normal)",
        "wide": "var(--letter-spacing-wide)",
        "wider": "var(--letter-spacing-wider)",
        "overline": "var(--text-overline-medium-ls)",
    }

    z_index = {
        "hide": "var(--z-hide)",
        "base": "var(--z-base)",
        "dropdown": "var(--z-dropdown)",
        "sticky": "var(--z-sticky)",
        "fixed": "var(--z-fixed)",
        "modal-backdrop": "var(--z-modal-backdrop)",
        "modal": "var(--z-modal)",
        "popover": "var(--z-popover)",
        "tooltip": "var(--z-tooltip)",
    }

    def fmt(obj: dict[str, str], indent: int = 8) -> str:
        pad = " " * indent
        lines = [f"{pad}'{k}': '{v}'," for k, v in obj.items()]
        return "\n".join(lines)

    content = f"""/** @type {{import('tailwindcss').Config}} */
module.exports = {{
  content: [
    './index.html',
    './components/**/*.html',
    './foundations/**/*.html',
    './pages/**/*.html',
    './patterns/**/*.html',
    './templates/**/*.html',
    './navigation/**/*.html',
    './components/**/*.js',
    './styles/**/*.css',
    './src/stories/**/*.js',
  ],
  theme: {{
    extend: {{
      colors: {{
        primary: {{
{fmt(primary, 10)}
        }},
        secondary: {{
{fmt(secondary, 10)}
        }},
        success: {{
{fmt(success, 10)}
        }},
        warning: {{
{fmt(warning, 10)}
        }},
        error: {{
{fmt(error, 10)}
        }},
        info: {{
{fmt(info, 10)}
        }},
        gray: {{
{fmt(gray, 10)}
        }},
        blue: {{
{fmt(blue, 10)}
        }},
        orange: {{
{fmt(orange, 10)}
        }},
        red: {{
{fmt(red, 10)}
        }},
        green: {{
{fmt(green, 10)}
        }},
        purple: {{
{fmt(purple, 10)}
        }},
        neutral: {{
{fmt(neutral, 10)}
        }},
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: {{
          DEFAULT: 'var(--color-border)',
          light: 'var(--color-border-light)',
          brand: 'var(--color-border-brand)',
        }},
        text: {{
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          inverse: 'var(--color-text-inverse)',
          brand: 'var(--color-text-brand)',
          code: 'var(--color-text-code)',
        }},
        sidebar: {{
          DEFAULT: 'var(--sidebar-bg)',
          header: 'var(--sidebar-header-bg)',
          border: 'var(--sidebar-border)',
          logo: 'var(--sidebar-logo-color)',
          version: 'var(--sidebar-version-color)',
          section: 'var(--sidebar-section-title)',
          link: 'var(--sidebar-link-color)',
          'link-hover': 'var(--sidebar-link-hover-color)',
          'link-active': 'var(--sidebar-link-active-color)',
          'link-active-border': 'var(--sidebar-link-active-border)',
          search: 'var(--sidebar-search-bg)',
          footer: 'var(--sidebar-footer-bg)',
        }},
        topbar: {{
          DEFAULT: 'var(--topbar-bg)',
          border: 'var(--topbar-border)',
        }},
      }},
      fontFamily: {{
        primary: ['var(--font-primary)'],
        sans: ['var(--font-primary)'],
      }},
      fontSize: {{
{fmt(font_size, 8)}
      }},
      fontWeight: {{
{fmt(font_weight, 8)}
      }},
      lineHeight: {{
{fmt(line_height, 8)}
      }},
      letterSpacing: {{
{fmt(letter_spacing, 8)}
      }},
      spacing: {{
{fmt(spacing_gp, 8)}
      }},
      borderRadius: {{
{fmt(border_radius, 8)}
      }},
      borderWidth: {{
{fmt(border_width, 8)}
      }},
      boxShadow: {{
{fmt(box_shadow, 8)}
      }},
      zIndex: {{
{fmt(z_index, 8)}
      }},
      transitionDuration: {{
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
        spring: '400ms',
      }},
      transitionTimingFunction: {{
        'ease-in-out': 'ease-in-out',
        spring: 'cubic-bezier(0.175,0.885,0.32,1.275)',
      }},
      screens: {{
        xs: '0px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      }},
    }},
  }},
  plugins: [],
}};
"""

    OUTPUT.write_text(content, encoding="utf-8")
    print(f"Generated {OUTPUT} ({len(css)} CSS variables parsed)")


if __name__ == "__main__":
    main()
