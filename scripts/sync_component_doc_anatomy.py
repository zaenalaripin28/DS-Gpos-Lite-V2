#!/usr/bin/env python3
"""Sync Docs/components/*.md Anatomy sections from Docs/component-rules.md."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

PROJECT = Path(__file__).resolve().parents[1]
RULES_PATH = PROJECT / "Docs/component-rules.md"
REGISTRY_PATH = PROJECT / "scripts/figma_component_registry.json"

SLUG_TO_SECTION: dict[str, str] = {
    "dropdown": "Dropdown Button",
    "section-messages": "Section Message",
    "date-picker": "Date Picker",
    "date-time-picker": "Date Time Picker",
    "text-field": "Text Field",
    "text-area": "Text Area",
    "time-picker": "Time Picker",
    "toast-banner": "Toast Banner",
    "top-bottom-navigation": "Top & Bottom Navigation",
    "inline-edit": "Inline Edit",
    "navigation-menu": "Navigation Menu",
    "page-header": "Page Header",
    "page-layout": "Page Layout",
}

# Curated anatomy — overrides auto-parse when Structure line is too terse or misleading.
ANATOMY_OVERRIDES: dict[str, list[str]] = {
    "navigation-menu": [
        "* Root container (`.ds-sidebar-nav-expand`) — surface putih `--color-neutral-n0`, **bukan** token `--sidebar-*`",
        "* Scroll (`.ds-sidebar-nav-expand__scroll`)",
        "* Header (`.ds-sidebar-nav-expand__header`) — title `MENU GPOS` + collapse button",
        "* Title (`.ds-sidebar-nav-expand__title`)",
        "* Collapse (`.ds-sidebar-nav-expand__collapse`)",
        "* Search wrap (`.ds-nav-menu-search-wrap`) → `.ds-nav-menu-search` + `__input` + `__trail`",
        "* Heading (`.ds-nav-heading-snap`, `.ds-nav-heading-snap--no-icons`) — mis. \"Terakhir Dibuka\"",
        "* Recent list (`.ds-sidebar-nav-expand__recent`)",
        "* Divider (`.ds-nav-divider`)",
        "* Menu list (`.ds-sidebar-nav-expand__menu`) → item (`.ds-sidebar-nav-expand__item`)",
        "* Main menu snap (`.ds-nav-mainmenu-snap`) — `__lead` (icon 24px), `__body`, `__title`, `__trail`",
        "* Submenu (`.ds-nav-composed__submenu`) → `.ds-nav-submenu-snap` + `__dot` + `__label`",
    ],
    "page-layout": [
        "* Root container (`.ds-page-layout`) — variant `--website`, `--tablet`, `--mobile`",
        "* Top nav (`header.ds-topnav`) — **di atas** `__body`, full width (compose Top & Bottom Navigation)",
        "* Body (`.ds-page-layout__body`) — flex row",
        "* Aside (`.ds-page-layout__aside`, 280px, `--color-neutral-n0`) → compose `.ds-sidebar-nav-expand`",
        "* Main (`.ds-page-layout__main`) → `__content` (grid 12 kolom) + `__footer` → `.ds-footer-nav`",
        "* Drawer (`.ds-page-layout__drawer`), overlay (`.ds-page-layout__overlay`), scrim (`.ds-page-layout__scrim`) — tablet/mobile",
        "* Nav regions (`.ds-page-layout__nav-main`, `__nav-sub`) — konteks mobile drawer",
    ],
    "select": [
        "* Root trigger (`.ds-select-trigger`) → `__value`, `__icon`",
        "* Option (`.ds-option`) → `__control`, `__icon-slot`",
        "* Groups (`.ds-groups`, `.ds-group-label`)",
        "* Wrapper dokumentasi (`.ds-select-component`) — container halaman doc, bukan root komponen",
    ],
    "popup": [
        "* Root container (`.popup-anchor-wrap`) — posisi: `--left`, `--center`, `--right`",
        "* Panel (`.popup-part-panel`)",
        "* Trigger (`button` + optional `.popup-anchor-btn` pada tombol)",
        "* Playground/doc wrapper memakai class `popup-anchor-btn__*` untuk UI dokumentasi — **bukan** root komponen",
    ],
    "top-bottom-navigation": [
        "* Top bar root (`.ds-topnav`) — variant `--website`, `--tablet`, `--mobile`",
        "* Regions: `__start`, `__center`, `__end`, `__menu`, `__akses`, `__notif`",
        "* Logo (`.ds-topnav-logo`, `__img`) — child di dalam topnav, bukan root",
        "* Notifikasi (`.ds-topnav-notif`, `__icon`, `__indicator`)",
        "* Profil (`.ds-topnav-profile`) → compose `.ds-avatar`",
        "* Footer (`.ds-footer-nav`) → `__actions`, `__pager`, `__nav-btns`",
    ],
    "date-picker": [
        "* Composed root (`.ds-date-picker`) → `button.ds-select-trigger` + panel `.ds-calendar`",
        "* Doc showcase layout (`.ds-date-picker-layout`) — root halaman referensi, bukan composed API",
        "* Layout parts: `__value`, `__icon`, `__chevron`, `__body`, `__label`, `__nav`, `__day`",
    ],
    "time-picker": [
        "* Trigger (`button.ds-select-trigger`) — reuse state Select",
        "* Picker panel (`.ds-time-picker`) → `__menu` (listbox options, interval 30 menit)",
    ],
    "table": [
        "* Scroll wrapper (`.ds-table-scroll`) — `role=\"region\"`, `tabindex=\"0\"`",
        "* Table (`table.ds-table`) — variant `--data`, `--sticky-head`, `--row-hover`",
        "* Header cell (`th.ds-table-header-cell`) — optional `.ds-table-sort` (`--asc`, `--desc`)",
        "* Body cell (`td.ds-table-cell`) — `--hover`, `--focused`",
        "* Column types (`.ds-table-col-text`, `--link`, `--status`, dll.)",
    ],
    "calendar": [
        "* Root (`.ds-calendar`) — `role=\"group\"`",
        "* Body (`.ds-calendar__body`)",
        "* Month header (`.ds-calendar-month-header`) — `__label`, `__nav`",
        "* Week header (`.ds-calendar-week-header`) — `__day` (`role=\"columnheader\"`)",
        "* Days grid (`.ds-calendar-days`) — `role=\"grid\"`",
        "* Day button (`button.ds-calendar-day`) — `--outside`, `--today`, `--selected`, `--disabled`",
    ],
    "tabs": [
        "* Tab list (`.ds-tablist`) — `role=\"tablist\"`, optional `--track`",
        "* Tab button (`.ds-tab`) — registry root; child dalam tablist",
        "* Label (`.ds-tab__label`), indicator (`.ds-tab__indicator`), badge (`.ds-tab__badge`), required (`.ds-tab__required`)",
    ],
    "tooltip": [
        "* Root (`.ds-tooltip`) — variant posisi `--top`, `--bottom`, `--position-left`, `--position-center`, `--position-right`",
        "* Trigger — elemen interaktif yang membungkus tooltip",
        "* Bubble (`.ds-tooltip-part`) — pointer + label; `--truncate`, `--overflow`",
    ],
    "flags": [
        "* Root (`.ds-flag`) — variant `--normal`, `--success`, `--error`, `--warning`, `--info`, `--collapsed`",
        "* Header (`.ds-flag__header`), main (`.ds-flag__main`), title (`.ds-flag__title`), icon (`.ds-flag__icon`)",
        "* Body (`.ds-flag__body`), actions (`.ds-flag__actions`)",
        "* Interactive control (`button.ds-flag-part`) — hover/press/focus states",
    ],
    "inline-edit": [
        "* Host (`.ds-inline-edit-host`) — `--active` saat mode edit",
        "* Root (`.ds-inline-edit`) — registry root",
        "* Input (`.ds-inline-edit__input`) — `--typing`",
        "* Actions (`.ds-inline-edit__actions`)",
        "* Buttons (`button.ds-inline-edit-btn`) — `--confirm`, `--cancel`",
    ],
    "modal": [
        "* Root container (`.modal-composition-item`)",
        "* Body wrapper (`.modal-composition-body`)",
        "* Header (`.modal-header-item` + `__title`); icon (`.modal-header-icon`)",
        "* Body text (`p.modal-body-text-short` / `modal-body-text-long`)",
        "* Footer (`.modal-footer-container` + `.modal-footer-actions`)",
        "* Footer buttons reuse `.ds-btn`, `.ds-btn--primary`, `.ds-btn--subtle`, `.ds-btn--warning`, `.ds-btn--danger`",
    ],
    "tourguide": [
        "* Tour card (`.ds-tourguide`) → `__title`, `__text`, `__body`, `__progress`, `__footer`",
        "* Spotlight card (`.ds-spotlight-card`) → `__head`, `__title`, `__body`, `__footer`, `__close`",
        "* Buttons (`button.ds-btn-spotlight`, `ds-btn-onboarding-replay`)",
        "* Overlay (`.ds-tourguide__overlay`), target (`.ds-tourguide__target`)",
    ],
    "dropdown": [
        "* Root (`.ds-dropdown`)",
        "* Trigger (`button` + `.ds-dropdown-btn`, optional `--icon-only`)",
        "* Menu (`.ds-dropdown-menu`, optional `--scrollable`)",
        "* Item (`button.ds-dropdown-item`) — `__lead`, `__label`, `__trail`, `__checkbox`, `__radio`",
    ],
    "page-header": [
        "* Root (`header.ds-page-header`) — `--actions-on`, `--toolbar-on`, `--subfilters-on`",
        "* Row (`.ds-page-header__row`, `__row--toolbar`)",
        "* Start (`.ds-page-header__start`) → title (`h1.ds-page-header__title`)",
        "* Actions (`.ds-page-header__actions`), search (`.ds-page-header__search`), filter (`.ds-page-header__filter`)",
        "* Subfilters (`.ds-page-header__subfilters`), toolbar (`.ds-page-header__toolbar`)",
    ],
    "text-field": [
        "* Root (`.ds-text-field`) → `input.ds-text-field__input`",
        "* Group (`.ds-text-field__group`), prefix (`.ds-text-field__prefix`), divider (`.ds-text-field__divider`)",
        "* Variants: `ds-phone-field`, `ds-icon-text-field`, `ds-search-select-field` (+ `__group`, `__prefix`)",
    ],
}


def load_registry() -> dict:
    return json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))


def parse_rules_structures() -> dict[str, str]:
    text = RULES_PATH.read_text(encoding="utf-8")
    structures: dict[str, str] = {}
    for match in re.finditer(
        r"^## ([^\n]+)\n((?:(?!^## ).*\n)*?)\| \*\*Structure\*\* \| (.+?) \|",
        text,
        re.MULTILINE,
    ):
        title = match.group(1).strip()
        structure = match.group(3).strip()
        structures[title] = structure
    return structures


def _humanize(class_name: str) -> str:
    name = class_name
    if name.startswith("ds-"):
        name = name[3:]
    elif name.startswith("modal-"):
        name = "modal " + name[6:]
    elif name.startswith("popup-"):
        name = "popup " + name[6:]
    name = name.replace("__", " ").replace("-", " ")
    return name.strip().title()


def structure_to_bullets(structure: str, root_class: str) -> list[str]:
    parts = [p.strip() for p in structure.split("→")]
    bullets: list[str] = []

    root_match = re.search(r"\.([\w-]+)", parts[0])
    root = root_match.group(1) if root_match else root_class
    tag_match = re.match(r"(\w+)", parts[0].replace("`", ""))
    tag = tag_match.group(1) if tag_match else "div"
    if tag in {"header", "footer", "nav", "article", "button", "label", "span"}:
        bullets.append(f"* Root (`{tag}.{root}`)")
    else:
        bullets.append(f"* Root container (`.{root}`)")

    block = root.split("__")[0]
    seen = {root}

    for segment in parts[1:]:
        segment = segment.strip().strip("`")
        for raw in re.split(r"[,+]", segment):
            token = raw.strip().strip("`")
            if not token:
                continue

            cls_match = re.search(r"\.([\w-]+)", token)
            if cls_match:
                cls = cls_match.group(1)
            elif token.startswith("__"):
                cls = block + token
            elif token.startswith("ds-") or token.startswith("modal-") or token.startswith("popup-"):
                cls = token.split()[0]
            else:
                continue

            if cls in seen:
                continue
            seen.add(cls)
            bullets.append(f"* {_humanize(cls)} (`.{cls}`)")

    return bullets


def get_structure_for_slug(slug: str, structures: dict[str, str]) -> str | None:
    title = SLUG_TO_SECTION.get(slug, slug.replace("-", " ").title())
    if title in structures:
        return structures[title]
    alt = title.replace(" & ", " & ")
    return structures.get(alt)


def replace_anatomy_section(content: str, bullets: list[str]) -> str:
    anatomy_body = "\n".join(bullets)
    pattern = re.compile(r"(## Anatomy\n\n)(.*?)(\n## )", re.DOTALL)
    if not pattern.search(content):
        raise ValueError("Missing ## Anatomy section")
    return pattern.sub(rf"\1{anatomy_body}\n\3", content, count=1)


def sync_docs(dry_run: bool = False) -> tuple[int, list[str]]:
    registry = load_registry()
    structures = parse_rules_structures()
    updated = 0
    issues: list[str] = []

    for entry in registry["components"]:
        slug = entry["slug"]
        doc_path = PROJECT / entry["docPath"]
        root_class = entry["rootClass"]

        if slug in ANATOMY_OVERRIDES:
            bullets = ANATOMY_OVERRIDES[slug]
        else:
            structure = get_structure_for_slug(slug, structures)
            if not structure:
                issues.append(f"{slug}: no Structure line in component-rules.md")
                continue
            bullets = structure_to_bullets(structure, root_class)

        if slug not in ANATOMY_OVERRIDES:
            if not bullets[0].startswith("* Root"):
                issues.append(f"{slug}: first bullet must describe root")
            if root_class not in bullets[0] and not any(root_class in b for b in bullets):
                issues.append(f"{slug}: rootClass `{root_class}` not in anatomy")
        elif not any(root_class in b for b in bullets):
            issues.append(f"{slug}: rootClass `{root_class}` not in anatomy")

        content = doc_path.read_text(encoding="utf-8")
        new_content = replace_anatomy_section(content, bullets)
        if new_content != content:
            updated += 1
            if not dry_run:
                doc_path.write_text(new_content, encoding="utf-8")

    return updated, issues


def main() -> int:
    dry_run = "--dry-run" in sys.argv
    updated, issues = sync_docs(dry_run=dry_run)
    mode = "would update" if dry_run else "updated"
    print(f"{mode} {updated} Docs/components/*.md anatomy sections")
    if issues:
        print("Issues:")
        for issue in issues:
            print(f"  - {issue}")
    return 0 if not issues else 1


if __name__ == "__main__":
    raise SystemExit(main())
