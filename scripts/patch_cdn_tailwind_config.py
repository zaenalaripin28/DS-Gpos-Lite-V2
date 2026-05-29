#!/usr/bin/env python3
"""Replace inline Tailwind CDN config in HTML files with CSS-variable-based config."""

from __future__ import annotations

import re
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent

# Compact CDN config — mirrors tailwind.config.js (CSS variables as single source of truth)
CDN_CONFIG = """tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: {
              50:'var(--color-primary-50)',100:'var(--color-primary-100)',200:'var(--color-primary-200)',
              300:'var(--color-primary-300)',400:'var(--color-primary-400)',500:'var(--color-primary-500)',
              600:'var(--color-primary-600)',700:'var(--color-primary-700)',800:'var(--color-primary-800)',900:'var(--color-primary-900)',
            },
            secondary: {
              50:'var(--color-secondary-50)',100:'var(--color-secondary-100)',200:'var(--color-secondary-200)',
              300:'var(--color-secondary-300)',400:'var(--color-secondary-400)',500:'var(--color-secondary-500)',
              600:'var(--color-secondary-600)',700:'var(--color-secondary-700)',800:'var(--color-secondary-800)',900:'var(--color-secondary-900)',
            },
            success: {
              50:'var(--color-success-50)',100:'var(--color-success-100)',200:'var(--color-success-200)',
              300:'var(--color-success-300)',400:'var(--color-success-400)',500:'var(--color-success-500)',
              600:'var(--color-success-600)',700:'var(--color-success-700)',800:'var(--color-success-800)',900:'var(--color-success-900)',
            },
            warning: {
              50:'var(--color-warning-50)',100:'var(--color-warning-100)',200:'var(--color-warning-200)',
              300:'var(--color-warning-300)',400:'var(--color-warning-400)',500:'var(--color-warning-500)',
              600:'var(--color-warning-600)',700:'var(--color-warning-700)',800:'var(--color-warning-800)',900:'var(--color-warning-900)',
            },
            error: {
              50:'var(--color-error-50)',100:'var(--color-error-100)',200:'var(--color-error-200)',
              300:'var(--color-error-300)',400:'var(--color-error-400)',500:'var(--color-error-500)',
              600:'var(--color-error-600)',700:'var(--color-error-700)',800:'var(--color-error-800)',900:'var(--color-error-900)',
            },
            info: {
              50:'var(--color-info-50)',100:'var(--color-info-100)',200:'var(--color-info-200)',
              300:'var(--color-info-300)',400:'var(--color-info-400)',500:'var(--color-info-500)',
              600:'var(--color-info-600)',700:'var(--color-info-700)',800:'var(--color-info-800)',900:'var(--color-info-900)',
            },
            blue: {
              b50:'var(--color-blue-b50)',b75:'var(--color-blue-b75)',b100:'var(--color-blue-b100)',
              b200:'var(--color-blue-b200)',b300:'var(--color-blue-b300)',b400:'var(--color-blue-b400)',b500:'var(--color-blue-b500)',
            },
            orange: {
              o50:'var(--color-orange-o50)',o75:'var(--color-orange-o75)',o100:'var(--color-orange-o100)',
              o200:'var(--color-orange-o200)',o300:'var(--color-orange-o300)',o400:'var(--color-orange-o400)',o500:'var(--color-orange-o500)',
            },
            red: {
              r50:'var(--color-red-r50)',r75:'var(--color-red-r75)',r100:'var(--color-red-r100)',
              r200:'var(--color-red-r200)',r300:'var(--color-red-r300)',r400:'var(--color-red-r400)',r500:'var(--color-red-r500)',
            },
            green: {
              g50:'var(--color-green-g50)',g75:'var(--color-green-g75)',g100:'var(--color-green-g100)',
              g200:'var(--color-green-g200)',g300:'var(--color-green-g300)',g400:'var(--color-green-g400)',g500:'var(--color-green-g500)',
            },
            purple: {
              p50:'var(--color-purple-p50)',p75:'var(--color-purple-p75)',p100:'var(--color-purple-p100)',
              p200:'var(--color-purple-p200)',p300:'var(--color-purple-p300)',p400:'var(--color-purple-p400)',p500:'var(--color-purple-p500)',
            },
            neutral: {
              n0:'var(--color-neutral-n0)',n10:'var(--color-neutral-n10)',n20:'var(--color-neutral-n20)',n30:'var(--color-neutral-n30)',
              n40:'var(--color-neutral-n40)',n50:'var(--color-neutral-n50)',n60:'var(--color-neutral-n60)',n70:'var(--color-neutral-n70)',
              n80:'var(--color-neutral-n80)',n90:'var(--color-neutral-n90)',n100:'var(--color-neutral-n100)',n200:'var(--color-neutral-n200)',
              n300:'var(--color-neutral-n300)',n400:'var(--color-neutral-n400)',n500:'var(--color-neutral-n500)',n600:'var(--color-neutral-n600)',
              n700:'var(--color-neutral-n700)',n800:'var(--color-neutral-n800)',n900:'var(--color-neutral-n900)',
            },
            background:'var(--color-background)',surface:'var(--color-surface)',
            border:{DEFAULT:'var(--color-border)',light:'var(--color-border-light)',brand:'var(--color-border-brand)'},
            text:{primary:'var(--color-text-primary)',secondary:'var(--color-text-secondary)',tertiary:'var(--color-text-tertiary)',
              disabled:'var(--color-text-disabled)',inverse:'var(--color-text-inverse)',brand:'var(--color-text-brand)',code:'var(--color-text-code)'},
          },
          fontFamily:{primary:['var(--font-primary)'],sans:['var(--font-primary)']},
          fontSize:{
            xs:'var(--font-size-xs)',sm:'var(--font-size-sm)',base:'var(--font-size-base)',lg:'var(--font-size-lg)',xl:'var(--font-size-xl)',
            '2xl':'var(--font-size-2xl)','3xl':'var(--font-size-3xl)','4xl':'var(--font-size-4xl)','5xl':'var(--font-size-5xl)',
            caption:'var(--text-caption-regular-size)',overline:'var(--text-overline-medium-size)',
            'body-sm':'var(--text-body-small-regular-size)','body-md':'var(--text-body-medium-regular-size)','body-lg':'var(--text-body-large-regular-size)',
            title:'var(--text-title-medium-size)',
          },
          fontWeight:{light:'var(--font-weight-light)',normal:'var(--font-weight-normal)',medium:'var(--font-weight-medium)',
            semibold:'var(--font-weight-semibold)',bold:'var(--font-weight-bold)'},
          lineHeight:{tight:'var(--line-height-tight)',snug:'var(--line-height-snug)',normal:'var(--line-height-normal)',
            relaxed:'var(--line-height-relaxed)',loose:'var(--line-height-loose)',
            'body-sm':'var(--text-body-small-regular-lh)',caption:'var(--text-caption-regular-lh)',overline:'var(--text-overline-medium-lh)'},
          letterSpacing:{tight:'var(--letter-spacing-tight)',normal:'var(--letter-spacing-normal)',wide:'var(--letter-spacing-wide)',
            wider:'var(--letter-spacing-wider)',overline:'var(--text-overline-medium-ls)'},
          spacing:{
            '0':'var(--space-0)','025':'var(--space-025)','050':'var(--space-050)','075':'var(--space-075)','100':'var(--space-100)',
            '150':'var(--space-150)','200':'var(--space-200)','250':'var(--space-250)','300':'var(--space-300)','400':'var(--space-400)',
            '500':'var(--space-500)','600':'var(--space-600)','800':'var(--space-800)','1000':'var(--space-1000)',
            '1':'var(--spacing-1)','2':'var(--spacing-2)','3':'var(--spacing-3)','4':'var(--spacing-4)','5':'var(--spacing-5)',
            '6':'var(--spacing-6)','8':'var(--spacing-8)','10':'var(--spacing-10)','12':'var(--spacing-12)',
          },
          borderRadius:{
            none:'var(--border-radius-none)',sm:'var(--border-radius-sm)',md:'var(--border-radius-md)',lg:'var(--border-radius-lg)',
            xl:'var(--border-radius-xl)','2xl':'var(--border-radius-2xl)','3xl':'var(--border-radius-3xl)',full:'var(--border-radius-full)',
          },
          borderWidth:{'0':'var(--border-width-0)','1':'var(--border-width-1)','2':'var(--border-width-2)','4':'var(--border-width-4)'},
          boxShadow:{
            '1':'var(--shadow-1)',xs:'var(--shadow-xs)',sm:'var(--shadow-sm)',md:'var(--shadow-md)',lg:'var(--shadow-lg)',
            xl:'var(--shadow-xl)','2xl':'var(--shadow-2xl)',brand:'var(--shadow-brand)',inner:'var(--shadow-inner)',none:'var(--shadow-none)',
          },
        }
      }
    }"""

# Multiline config blocks (button.html style)
CONFIG_BLOCK_RE = re.compile(
    r"tailwind\.config\s*=\s*\{[\s\S]*?\n\s*\}\s*\n\s*\}",
    re.MULTILINE,
)

# Single-line config inside <script> (colors.html style)
SINGLE_LINE_CONFIG_RE = re.compile(
    r"tailwind\.config\s*=\s*\{[\s\S]*?\}\s*(?=</script>)",
    re.MULTILINE,
)

# One-line minified configs attached to script tag (legacy grid)
ONE_LINE_RE = re.compile(
    r"<script>tailwind\.config=\{[\s\S]*?\}</script>",
    re.MULTILINE,
)


CDN_SCRIPT_RE = re.compile(
    r'(<script\s+src="https://cdn\.tailwindcss\.com"></script>\s*)',
    re.IGNORECASE,
)


def patch_file(path: Path, *, dry_run: bool = False) -> bool:
    text = path.read_text(encoding="utf-8")
    if "cdn.tailwindcss.com" not in text:
        return False

    new_text = text
    changed = False

    if CONFIG_BLOCK_RE.search(new_text):
        new_text = CONFIG_BLOCK_RE.sub(CDN_CONFIG, new_text, count=1)
        changed = new_text != text
    elif SINGLE_LINE_CONFIG_RE.search(new_text):
        new_text = SINGLE_LINE_CONFIG_RE.sub(CDN_CONFIG, new_text, count=1)
        changed = new_text != text
    elif ONE_LINE_RE.search(new_text):
        replacement = f"<script>\n    {CDN_CONFIG}\n  </script>"
        new_text = ONE_LINE_RE.sub(replacement, new_text, count=1)
        changed = new_text != text
    elif "tailwind.config" not in new_text:
        insert = f'<script>\n    {CDN_CONFIG}\n  </script>\n  '
        new_text = CDN_SCRIPT_RE.sub(r"\1" + insert, new_text, count=1)
        changed = new_text != text

    if changed and not dry_run:
        path.write_text(new_text, encoding="utf-8")
    return changed


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    changed_files = 0
    for html in sorted(PROJECT_ROOT.rglob("*.html")):
        if ".refactor-backups" in str(html):
            continue
        if patch_file(html, dry_run=args.dry_run):
            changed_files += 1
            print(f"{'[DRY] ' if args.dry_run else ''}Updated: {html.relative_to(PROJECT_ROOT)}")

    print(f"\n{'Would update' if args.dry_run else 'Updated'} {changed_files} file(s)")


if __name__ == "__main__":
    main()
