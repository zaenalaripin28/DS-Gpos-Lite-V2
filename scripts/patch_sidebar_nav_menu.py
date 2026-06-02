#!/usr/bin/env python3
"""Add collapsible nav-section--menu to all DS doc sidebars."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SECTION_RE = re.compile(
    r'<div class="nav-section">\s*\n(\s*)<h3 class="nav-title">([^<]+)</h3>',
    re.MULTILINE,
)

SCRIPT_MARKER = "sidebar-nav-menu.js"


def icon_prefix_for(path: Path) -> str:
    rel = path.relative_to(ROOT)
    depth = len(rel.parts) - 1
    return "../" * depth if depth else ""


def script_tag_for(path: Path) -> str:
    prefix = icon_prefix_for(path)
    return f'<script src="{prefix}scripts/sidebar-nav-menu.js"></script>'


def transform_sections(html: str, icon_prefix: str) -> str:
    def repl(match: re.Match[str]) -> str:
        indent, title = match.group(1), match.group(2)
        return (
            f'<div class="nav-section nav-section--menu is-open">\n'
            f'{indent}<button type="button" class="nav-menu-toggle" aria-expanded="true">\n'
            f'{indent}  <h3 class="nav-title">{title}</h3>\n'
            f'{indent}  <img src="{icon_prefix}assets/icons/icon-chevron-mini-down.svg" alt="" '
            f'class="nav-menu-toggle__chevron" aria-hidden="true">\n'
            f'{indent}</button>'
        )

    return SECTION_RE.sub(repl, html)


def inject_script(html: str, tag: str) -> str:
    if SCRIPT_MARKER in html:
        return html
    if "</body>" in html:
        return html.replace("</body>", f"  {tag}\n</body>", 1)
    return html + "\n" + tag + "\n"


def strip_inline_nav_menu_css(html: str) -> str:
    start = "  /* Sidebar nav — collapsible section (doc navigation) */"
    end = "  .nav-link--sub {"
    if start not in html:
        return html
    i = html.find(start)
    j = html.find(end, i)
    if j == -1:
        return html
    k = html.find("  }\n", j) + len("  }\n")
    return html[:i] + html[k:]


def strip_inline_nav_toggle_js(html: str) -> str:
    block = (
        "  document.querySelectorAll('.nav-section--menu .nav-menu-toggle').forEach(function (btn) {\n"
    )
    if block not in html:
        return html
    i = html.find(block)
    # remove until closing }); of forEach - find next blank line after });
    end = html.find("  });\n\n", i)
    if end == -1:
        return html
    return html[:i] + html[end + len("  });\n\n") :]


def main() -> None:
    html_files = list(ROOT.rglob("*.html"))
    updated = 0
    for path in html_files:
        if "node_modules" in path.parts or ".refactor-backups" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        if '<div class="nav-section">' not in text and SCRIPT_MARKER in text:
            continue
        original = text
        prefix = icon_prefix_for(path)
        text = transform_sections(text, prefix)
        text = inject_script(text, script_tag_for(path))
        if path.name == "dropdown.html" and path.parent.name == "dropdown":
            text = strip_inline_nav_menu_css(text)
            text = strip_inline_nav_toggle_js(text)
        if text != original:
            path.write_text(text, encoding="utf-8")
            updated += 1
            print("patched", path.relative_to(ROOT))
    print(f"done: {updated} file(s)")


if __name__ == "__main__":
    main()
