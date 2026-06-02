#!/usr/bin/env python3
"""Add Table nav link to all DS doc sidebars (after Pagination)."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TABLE_SVG = (
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">'
    '<rect x="3" y="4" width="18" height="16" rx="1"/>'
    '<line x1="3" y1="10" x2="21" y2="10"/>'
    '<line x1="3" y1="16" x2="21" y2="16"/>'
    '<line x1="9" y1="4" x2="9" y2="20"/>'
    '<line x1="15" y1="4" x2="15" y2="20"/>'
    '</svg>'
)

MARKER = "Table/table.html"


def table_nav_item(href: str, active: bool = False) -> str:
    cls = "nav-link active" if active else "nav-link"
    return (
        f"            <li>\n"
        f'              <a href="{href}" class="{cls}">\n'
        f"                {TABLE_SVG}\n"
        f"                Table\n"
        f"              </a>\n"
        f"            </li>\n"
    )


def resolve_href(path: Path) -> tuple[str, bool]:
    rel = path.relative_to(ROOT)
    if rel.name == "index.html":
        return "components/Table/table.html", False
    if rel.parent.name == "Table" and rel.name == "table.html":
        return "table.html", True
    if "foundations" in rel.parts:
        return "../../components/Table/table.html", False
    if "components" in rel.parts:
        return "../Table/table.html", False
    return "../Table/table.html", False


def patch(html: str, path: Path) -> str:
    if MARKER in html or ">Table</a>" in html and "table.html" in html:
        return html
    if "Pagination/pagination.html" not in html:
        return html

    href, active = resolve_href(path)
    item = table_nav_item(href, active)

    # Insert after Pagination </li>, before Calendar
    pattern = re.compile(
        r"(<li>\s*\n?\s*<a href=\"[^\"]*Pagination/pagination\.html\"[^>]*>[\s\S]*?Pagination\s*\n?\s*</a>\s*\n?\s*</li>\s*\n?)",
        re.MULTILINE,
    )
    match = pattern.search(html)
    if not match:
        return html
    insert_at = match.end()
    return html[:insert_at] + item + html[insert_at:]


def main() -> None:
    updated = 0
    for path in ROOT.rglob("*.html"):
        if "node_modules" in path.parts:
            continue
        text = path.read_text(encoding="utf-8")
        patched = patch(text, path)
        if patched != text:
            path.write_text(patched, encoding="utf-8")
            updated += 1
            print("patched", path.relative_to(ROOT))
    print(f"done: {updated} file(s)")


if __name__ == "__main__":
    main()
