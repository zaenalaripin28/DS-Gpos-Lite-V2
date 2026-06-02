#!/usr/bin/env python3
"""Move ds-doc-blocks outside preview-card and fix closing tags."""
from pathlib import Path

PATH = Path(__file__).resolve().parents[1] / "components/Table/table.html"
text = PATH.read_text(encoding="utf-8")

text = text.replace(
    "            </div>\n                  <div class=\"ds-doc-blocks\">",
    "            </div>\n          </div>\n        </div>\n        <div class=\"ds-doc-blocks\">",
)
text = text.replace(
    "        </div></div>\n        </div>\n      </section>",
    "        </div>\n      </section>",
)

SECTION_HEADERS = [
    (
        'id="table-header-part" style="margin-bottom:48px;">\n        <h2>Table Header Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-header-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Table Header Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-cell-part" style="margin-bottom:48px;">\n        <h2>Cell Master Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-cell-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Cell Master Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-cell-icon-part" style="margin-bottom:48px;">\n        <h2>Cell Icon Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-cell-icon-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Cell Icon Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-col-checkbox-part" style="margin-bottom:48px;">\n        <h2>Column / Checkbox Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-col-checkbox-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Column / Checkbox Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-col-text-part" style="margin-bottom:48px;">\n        <h2>Column / Text Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-col-text-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Column / Text Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-col-link-part" style="margin-bottom:48px;">\n        <h2>Column / Link Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-col-link-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Column / Link Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-col-status-part" style="margin-bottom:48px;">\n        <h2>Column / Status Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-col-status-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Column / Status Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-col-icon-part" style="margin-bottom:48px;">\n        <h2>Column / Icon Part</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-col-icon-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Column / Icon Part</h2>\n            <span class="ds-doc-section__badge">Part</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        'id="table-component-part" style="margin-bottom:48px;">\n        <h2>Table Component</h2>\n        <p class="section-caption" style="margin-bottom:16px;">',
        'id="table-component-part" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Table Component</h2>\n            <span class="ds-doc-section__badge">Component</span>\n          </div>\n          <p class="section-caption">',
    ),
    (
        '<section style="margin-bottom:48px;">\n        <h2>Do &amp; Don&apos;t</h2>',
        '<section id="table-usage" class="ds-doc-section">\n        <div class="ds-doc-section__head">\n          <div class="ds-doc-section__title-row">\n            <h2 class="ds-doc-section__title">Do &amp; Don&apos;t</h2>\n            <span class="ds-doc-section__badge">Guide</span>\n          </div>\n        </div>',
    ),
]

for old, new in SECTION_HEADERS:
    if old not in text:
        print("WARN: missing block:", old[:60])
    else:
        text = text.replace(old, new, 1)

PATH.write_text(text, encoding="utf-8")
print("OK:", PATH)
