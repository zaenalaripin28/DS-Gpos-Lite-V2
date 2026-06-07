# Components — GPOS Lite DS V2

> **Registry AI:** `Docs/components-index.md` · **Machine-readable:** `scripts/figma_component_registry.json`  
> **DO/DON'T:** `Docs/component-rules.md` · **Per-component AI docs:** `Docs/components/{slug}.md`

---

## Stack hybrid

| Layer | Path | Peran |
|-------|------|-------|
| **Runtime (canonical)** | `src/GposLite/components/*.tsx` | Behavior/API produk |
| **Visual reference** | `components/{Name}/{slug}.html` | Anatomi, variant matrix, CSS scoped |
| **Styles runtime** | `src/GposLite/styles/*.css` | CSS komponen React |

**Rule:** Behavior → TSX · Visual fidelity → HTML · Token → `tokens.css`

---

## Aturan global

| Aturan | Detail |
|--------|--------|
| Naming | BEM `ds-{block}`, `ds-{block}__{element}`, `ds-{block}--{modifier}` |
| Pengecualian | Modal: `modal-*` · Popup: `popup-*` |
| State doc | `--hover`, `--focus`, `--press` untuk matrix; produksi: pseudo-class CSS |
| Stylesheet | CSS `ds-*` di `<style>` per halaman HTML — bukan `globals.css` |
| Ikon | `assets/icons/icon-*.svg` via `<img>` |
| Bahasa | `lang="id"` |

---

## Registry (34 komponen)

| # | Komponen | HTML | Root class | AI doc |
|---|----------|------|------------|--------|
| 1 | Avatar | `components/Avatar/avatar.html` | `.ds-avatar` | [avatar.md](../components/avatar.md) |
| 2 | Badge | `components/Badge/badge.html` | `.ds-badge` | [badge.md](../components/badge.md) |
| 3 | Breadcrumbs | `components/Breadcrumbs/breadcrumbs.html` | `.ds-bc-container` | [breadcrumbs.md](../components/breadcrumbs.md) |
| 4 | Button | `components/Button/button.html` | `.ds-btn` | [button.md](../components/button.md) |
| 5 | Calendar | `components/Calendar/calendar.html` | `.ds-calendar` | [calendar.md](../components/calendar.md) |
| 6 | Checkbox | `components/Checkbox/checkbox.html` | `.ds-checkbox` | [checkbox.md](../components/checkbox.md) |
| 7 | Date Picker | `components/Date picker/date-picker.html` | `.ds-date-picker` | [date-picker.md](../components/date-picker.md) |
| 8 | Date Time Picker | `components/Date time picker/date time picker.html` | `.ds-date-time-picker` | [date-time-picker.md](../components/date-time-picker.md) |
| 9 | Dropdown Button | `components/dropdown/dropdown.html` | `.ds-dropdown` | [dropdown.md](../components/dropdown.md) |
| 10 | Flags | `components/Flags/flags.html` | `.ds-flag` | [flags.md](../components/flags.md) |
| 11 | Form | `components/Form/form.html` | `.ds-form-row` | [form.md](../components/form.md) |
| 12 | Inline Edit | `components/Inline edit/inline-edit.html` | `.ds-inline-edit` | [inline-edit.md](../components/inline-edit.md) |
| 13 | Lozenge | `components/Lozenge/lozenge.html` | `.ds-lozenge` | [lozenge.md](../components/lozenge.md) |
| 14 | Modal | `components/Modal/modal.html` | `.modal-composition-item` | [modal.md](../components/modal.md) |
| 15 | Navigation Menu | `components/Navigation menu/navigation.html` | `.ds-sidebar-nav-expand` | [navigation-menu.md](../components/navigation-menu.md) |
| 16 | Page Header | `components/Page Header/page-header.html` | `.ds-page-header` | [page-header.md](../components/page-header.md) |
| 17 | Page Layout | `components/Page layout/page-layout.html` | `.ds-page-layout` | [page-layout.md](../components/page-layout.md) |
| 18 | Pagination | `components/Pagination/pagination.html` | `.ds-pagination` | [pagination.md](../components/pagination.md) |
| 19 | Popup | `components/Popup/popup.html` | `.popup-anchor-wrap` | [popup.md](../components/popup.md) |
| 20 | Radio | `components/Radio/radio.html` | `.ds-radio` | [radio.md](../components/radio.md) |
| 21 | Range | `components/Range/range.html` | `.ds-range` | [range.md](../components/range.md) |
| 22 | Section Message | `components/section messages/section-message.html` | `.ds-section-message` | [section-messages.md](../components/section-messages.md) |
| 23 | Select | `components/Select/select.html` | `.ds-select-trigger` | [select.md](../components/select.md) |
| 24 | Table | `components/Table/table.html` | `.ds-table` | [table.md](../components/table.md) |
| 25 | Tabs | `components/Tabs/tabs.html` | `.ds-tab` | [tabs.md](../components/tabs.md) |
| 26 | Tags | `components/Tags/tags.html` | `.ds-tag` | [tags.md](../components/tags.md) |
| 27 | Text Area | `components/Text Area/text area.html` | `.ds-text-area` | [text-area.md](../components/text-area.md) |
| 28 | Text Field | `components/Text Field/text field.html` | `.ds-text-field` | [text-field.md](../components/text-field.md) |
| 29 | Time Picker | `components/Time picker/time-picker.html` | `.ds-time-picker` | [time-picker.md](../components/time-picker.md) |
| 30 | Toast Banner | `components/Toast-Banner/banner.html` | `.ds-banner` | [toast-banner.md](../components/toast-banner.md) |
| 31 | Toggle | `components/Toggle/toggle.html` | `.ds-toggle` | [toggle.md](../components/toggle.md) |
| 32 | Tooltip | `components/Tooltip/tooltip.html` | `.ds-tooltip` | [tooltip.md](../components/tooltip.md) |
| 33 | Top & Bottom Nav | `components/Top & bottom Navigation/top-bottom-nav.html` | `.ds-topnav` | [top-bottom-navigation.md](../components/top-bottom-navigation.md) |
| 34 | Tourguide | `components/Tourguide/tourguide.html` | `.ds-tourguide` | [tourguide.md](../components/tourguide.md) |

Setiap folder `components/{Name}/figma/` berisi referensi visual PNG (34/34).

---

## Kategori fungsional

### Atoms
Avatar, Badge, Button, Checkbox, Lozenge, Radio, Tags, Toggle, Tooltip, Range

### Inputs
Text Field, Text Area, Select

### Molecules
Dropdown, Pagination, Tabs, Calendar, Date Picker, Time Picker, Date Time Picker, Inline Edit, Breadcrumbs

### Feedback & Overlays
Section Message, Toast Banner, Flags, Modal, Popup, Tourguide

### Data
Table

### Navigation
Navigation Menu, Top & Bottom Nav

### Layout & Shell
Page Header, Form, Page Layout

---

## Variant & state — ringkas

| Komponen | Variants / states utama |
|----------|-------------------------|
| Button | `--primary`, `--subtle`, `--danger`, `--link`, `--icon-only`, `--loading`; states: hover/focus/press/disabled |
| Select | `--subtle`, `--disabled`, `--loading`, `--typing`, `--filled-invalid` |
| Checkbox/Radio/Toggle | `--error`, `--disabled`, `--snapshot`; checked/indeterminate |
| Modal | `modal-size-xs\|sm\|md\|lg`; header icon `--warning`, `--danger` |
| Section Message | `--information`, `--success`, `--warning`, `--error`, `--discovery` |
| Toast Banner | `--announcement`, `--success`, `--warning`, `--error` — **tanpa dismiss button** |
| Toggle size | **`--large`** (canonical — bukan `--lg`) |
| Page Layout | `ds-topnav--website\|tablet\|mobile` |

Detail lengkap per komponen: `Docs/design-system-knowledge.md` § Components · `Docs/component-rules.md`

---

## Komponen dengan dokumentasi tipis (TODO depth)

| Komponen | Gap |
|----------|-----|
| Modal | `aria-modal`, backdrop interaction, focus trap belum distandarkan |
| Popup | Open/closed, focus management undocumented |
| Avatar | Presence colors belum tokenized |
| Calendar | Month/week/day composed parts belum mapped ke variants |

---

## Workflow AI

1. Resolve `htmlPath` + `rootClass` dari `scripts/figma_component_registry.json`
2. Buka `components/{Name}/{slug}.html` — **jangan skip**
3. Baca `Docs/components/{slug}.md` + section di `Docs/component-rules.md`
4. Buka `src/GposLite/components/{Name}.tsx` untuk behavior
5. Figma: `.claude/figma/{id}.spec.json`

Screen/dashboard: lihat [patterns.md](./patterns.md)

---

## Referensi

| File | Path |
|------|------|
| Index | `Docs/components-index.md` |
| Registry JSON | `scripts/figma_component_registry.json` |
| Katalog detail | `Docs/design-system-knowledge.md` |
| Compose patterns | [patterns.md](./patterns.md) |
