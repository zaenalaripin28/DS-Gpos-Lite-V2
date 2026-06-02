#!/usr/bin/env python3
"""Restructure table.html: per-section tokens/code, colors-like chrome, remove bottom aggregates."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "components/Table/table.html"

INSERTS = [
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-header-part")',
        "sort",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-cell-part")',
        "header",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-cell-icon-part")',
        "cell",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-col-checkbox-part")',
        "cell-icon",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-col-text-part")',
        "col-checkbox",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-col-link-part")',
        "col-text",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-col-status-part")',
        "col-link",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-col-icon-part")',
        "col-status",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section id="table-component-part")',
        "col-icon",
    ),
    (
        r'(</div>\s*</div>\s*</section>\s*\n\s*<section style="margin-bottom:48px;">\s*\n\s*<h2>Do)',
        "component",
    ),
]

TOKEN_MAP = {
    "sort": [
        (".ds-table-sort", "ds-table-sort"),
        (".ds-table-sort--asc", "ds-table-sort ds-table-sort--asc"),
        (".ds-table-sort--desc", "ds-table-sort ds-table-sort--desc"),
        (".ds-table-sort__icon", "ds-table-sort__icon"),
    ],
    "header": [
        (".ds-table-header-cell", "ds-table-header-cell"),
        (".ds-table-header-cell--empty", "ds-table-header-cell ds-table-header-cell--empty"),
        (".ds-table-header-cell__label", "ds-table-header-cell__label"),
        (".ds-table-header-cell__checkbox", "ds-table-header-cell__checkbox"),
    ],
    "cell": [
        (".ds-table-cell", "ds-table-cell"),
        (".ds-table-cell--hover", "ds-table-cell ds-table-cell--hover"),
        (".ds-table-cell--focused", "ds-table-cell ds-table-cell--focused"),
        (".ds-table-cell__icon", "ds-table-cell__icon"),
        (".ds-table-cell__text", "ds-table-cell__text"),
        (".ds-table-cell__description", "ds-table-cell__description"),
    ],
    "cell-icon": [
        (".ds-table-cell-icon", "ds-table-cell-icon"),
        (".ds-table-cell-icon__group", "ds-table-cell-icon__group"),
        (".ds-table-cell-icon__icon", "ds-table-cell-icon__icon"),
    ],
    "col-checkbox": [
        (".ds-table-col-checkbox", "ds-table-col-checkbox"),
        (".ds-table-col-checkbox--hover", "ds-table-col-checkbox ds-table-col-checkbox--hover"),
        (".ds-table-col-checkbox__box", "ds-table-col-checkbox__box"),
    ],
    "col-text": [
        (".ds-table-col-text", "ds-table-col-text"),
        (".ds-table-col-text--hover", "ds-table-col-text ds-table-col-text--hover"),
        (".ds-table-col-text--focused", "ds-table-col-text ds-table-col-text--focused"),
    ],
    "col-link": [
        (".ds-table-col-link", "ds-table-col-link"),
        (".ds-table-col-link--hover", "ds-table-col-link ds-table-col-link--hover"),
        (".ds-table-col-link__anchor", "ds-table-col-link__anchor"),
    ],
    "col-status": [
        (".ds-table-col-status", "ds-table-col-status"),
        (".ds-table-col-status--hover", "ds-table-col-status ds-table-col-status--hover"),
        (".ds-lozenge--default", "ds-lozenge ds-lozenge--default"),
    ],
    "col-icon": [
        (".ds-table-col-icon", "ds-table-col-icon"),
        (".ds-table-col-icon--hover", "ds-table-col-icon ds-table-col-icon--hover"),
        (".ds-table-col-icon__group", "ds-table-col-icon__group"),
    ],
    "component": [
        (".ds-table", "ds-table ds-table--row-hover"),
        (".ds-table-wrapper", "ds-table-wrapper"),
        (".ds-table-footer", "ds-table-footer"),
        (".ds-pagination", "ds-pagination"),
        (".ds-pagination__item--active", "ds-pagination__item ds-pagination__item--active"),
    ],
}

CODE_MAP = {
    "sort": ("table-sort.html", "code-block", "copy-code-btn", "Salin kode sort order"),
    "header": ("table-header.html", "code-block-header", "copy-header-code-btn", "Salin kode table header"),
    "cell": ("table-cell.html", "code-block-cell", "copy-cell-code-btn", "Salin kode table cell"),
    "cell-icon": ("table-cell-icon.html", "code-block-cell-icon", "copy-cell-icon-code-btn", "Salin kode table cell icon"),
    "col-checkbox": ("table-col-checkbox.html", "code-block-col-checkbox", "copy-col-checkbox-code-btn", "Salin kode column checkbox"),
    "col-text": ("table-col-text.html", "code-block-col-text", "copy-col-text-code-btn", "Salin kode column text"),
    "col-link": ("table-col-link.html", "code-block-col-link", "copy-col-link-code-btn", "Salin kode column link"),
    "col-status": ("table-col-status.html", "code-block-col-status", "copy-col-status-code-btn", "Salin kode column status"),
    "col-icon": ("table-col-icon.html", "code-block-col-icon", "copy-col-icon-code-btn", "Salin kode column icon"),
    "component": ("table-component.html", "code-block-table-component", "copy-table-component-code-btn", "Salin kode table component"),
}


def token_panel_html(key: str) -> str:
    rows = TOKEN_MAP[key]
    lines = [
        '        <div class="ds-doc-blocks">',
        '          <div class="token-panel">',
        '            <div class="token-panel__head"><h3 class="token-panel__title">Token Class</h3></div>',
        '            <div class="token-panel__body">',
    ]
    for cls, data in rows:
        lines.append(
            f'              <div class="token-row"><code>{cls}</code>'
            f'<button class="copy-btn" type="button" data-copy="{data}" onclick="copyToken(this)">Salin</button></div>'
        )
    lines += ["            </div>", "          </div>"]
    return "\n".join(lines)


def code_panel_html(key: str, code_inner: str) -> str:
    file_label, code_id, btn_id, aria = CODE_MAP[key]
    return (
        '          <div class="code-panel">\n'
        f'            <div class="code-panel__head">\n'
        f'              <span class="code-panel__file">{file_label}</span>\n'
        f'              <button class="copy-btn" id="{btn_id}" type="button" aria-label="{aria}">Salin</button>\n'
        "            </div>\n"
        f'            <pre class="code-block" id="{code_id}"><code>{code_inner}</code></pre>\n'
        "          </div>\n"
        "        </div>"
    )


def extract_code_blocks(text: str) -> dict:
    blocks = {}
    for key, (_, code_id, _, _) in CODE_MAP.items():
        m = re.search(
            rf'<pre class="code-block" id="{re.escape(code_id)}"><code>(.*?)</code></pre>',
            text,
            re.DOTALL,
        )
        if m:
            blocks[key] = m.group(1).strip()
    return blocks


def main():
    text = PATH.read_text(encoding="utf-8")
    codes = extract_code_blocks(text)

    # Remove aggregate Kode DS + Token Class sections (keep Do & Don't)
    text = re.sub(
        r'\n      <section style="margin-bottom:48px;">\s*<h2>Kode DS</h2>.*?</section>\s*\n      <section style="margin-bottom:48px;">\s*<h2>Token Class</h2>.*?</section>',
        "\n",
        text,
        count=1,
        flags=re.DOTALL,
    )

    for pattern, key in INSERTS:
        block = token_panel_html(key) + "\n" + code_panel_html(key, codes.get(key, ""))
        text, n = re.subn(pattern, block + r"\1", text, count=1, flags=re.DOTALL)
        if n != 1:
            raise SystemExit(f"Insert failed for {key}: {n} matches")

    PATH.write_text(text, encoding="utf-8")
    print("OK: restructured", PATH)


if __name__ == "__main__":
    main()
