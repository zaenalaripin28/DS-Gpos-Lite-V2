# GPOS Lite DS V2 — Figma Make / AI Context

> Single knowledge base for Figma Make, Claude, Cursor, ChatGPT. Dense reference — no invented components/tokens/variants.
> **Priority:** source HTML → `styles/tokens.css` → `tailwind.config.js` → this file.

## HARD CONSTRAINTS

| Rule | Enforcement |
|------|-------------|
| Stack | HTML + Tailwind CSS — no React/Vue/Mantine/Bootstrap |
| Colors | `var(--*)` or Tailwind semantic aliases — no hex in markup/CSS |
| Spacing | `--space-*` / `--spacing-*` — no arbitrary px |
| Icons | `assets/icons/icon-*.svg` via `<img>` — `foundations/icons/iconsData.js` |
| Classes | BEM `ds-*` — exceptions: Modal `modal-*`, Popup `popup-*` |
| CSS load | `styles/globals.css` + `enhancements.css` + component `<style>` |
| Tailwind | CDN config mirrors `tailwind.config.js`; use `bg-blue-b300`, `gap-100`, `shadow-1` |
| States (prod) | `:hover`, `:focus-visible`, `:active`, `:disabled` |
| Focus | `box-shadow: 0 0 0 2px var(--color-blue-b200)` |
| Shadow | Default `shadow-1`; overlays per source (`shadow-md` on Modal/Dropdown/Tourguide) |

## SOURCE HIERARCHY

1. `components/{Name}/*.html` — implementation truth
2. `styles/tokens.css` — all `--*` tokens
3. `tailwind.config.js` — utility aliases
4. `foundations/*/*.html` — color/typography/spacing/border/shadow/grid/icons reference
5. `Docs/component-rules.md` — per-component DO/DON'T
6. `Docs/components/{slug}.md` — extended AI docs

> `docs/foundations/` not present; foundations live in `foundations/` directory.

## DESIGN TOKENS (`styles/tokens.css`)

### Brand palette (use in UI components)
Blue `--color-blue-b50|b75|b100|b200|b300|b400|b500` · Neutral `--color-neutral-n0..n900` · Red `--color-red-r50..r500` · Green `--color-green-g50..g500` · Orange `--color-orange-o50..o500` · Purple `--color-purple-p50..p500`

### Semantic UI
`--color-text-primary|secondary|tertiary|disabled|inverse|brand|code` · `--color-border|border-light|border-brand` · `--color-background` · `--color-surface`

### System scales (foundations only)
Primary/Secondary/Success/Warning/Error/Info/Gray `--color-{scale}-50..900`

### Spacing (4px base)
| Token | px | Tailwind |
|-------|----|---------|
| `--space-025` | 2 | `gap-025`, `p-025` |
| `--space-050` | 4 | `gap-050`, `p-050` |
| `--space-075` | 6 | `gap-075` |
| `--space-100` | 8 | `gap-100` |
| `--space-150` | 12 | `gap-150` |
| `--space-200` | 16 | `gap-200` |
| `--space-250` | 20 | `gap-250`, `p-250` |
| `--space-300` | 24 | `gap-300`, `p-300` |
| `--space-400` | 32 | `gap-400` |
| `--space-500` | 40 | `gap-500` |
| `--space-600` | 48 | `gap-600` |

### Typography
Font: `--font-primary` (Poppins) · Sizes: `--font-size-xs|sm|base|lg|xl|2xl|3xl|4xl|5xl`
Styles: `--text-body-small|medium|large-{regular|medium}-{size|weight|lh}` · `--text-caption-*` · `--text-overline-medium-*` · `--text-title-medium-*` · `--text-header-*` · `--text-display-*`
Tailwind: `text-body-sm`, `text-body-md`, `text-body-lg`, `text-caption`, `text-overline`, `text-title`, `font-medium`, `font-semibold`

### Radius · Border · Shadow · Z
`--border-radius-none|sm|md|lg|xl|2xl|3xl|full` · `--border-width-0|1|2|4` · `--shadow-1|xs|sm|md|lg|xl|2xl|brand|inner|none` · `--z-dropdown|sticky|fixed|modal-backdrop|modal|popover|tooltip`

### Layout tokens
Sidebar: `--sidebar-*` → `bg-sidebar`, `text-sidebar-link`, `text-sidebar-link-active` · Topbar: `--topbar-bg|border`

### Icons
Path: `assets/icons/` · Sizes: small 16px (`w-4`), medium 24px (`w-6`), large 32px (`w-8`), xlarge 48px (`w-12`)

## TAILWIND IMPLEMENTATION

- Color utilities: `bg-neutral-n10`, `text-neutral-n900`, `border-neutral-n30`, `bg-blue-b300`, `text-red-r300`, `bg-green-g50`
- Never: `bg-blue-500`, `text-gray-600`, `bg-red-500` (raw Tailwind palette)
- Spacing utilities use token keys: `gap-100`, `p-250`, `px-300`, `mb-150` — not `gap-2`, `p-4`
- Radius: `rounded-sm|md|lg|xl|2xl|full` mapped to `--border-radius-*`
- Shadow: `shadow-1`, `shadow-sm`, `shadow-md` mapped to `--shadow-*`
- Component-specific styling lives in `<style>` with `var(--color-*)`; reuse those classes, do not duplicate

## COMPONENT REGISTRY

| # | Component | Source | Root | Doc |
|---|-----------|--------|------|-----|
| 1 | Avatar | `components/Avatar/avatar.html` | `.ds-avatar` | `Docs/components/avatar.md` |
| 2 | Badge | `components/Badge/badge.html` | `.ds-badge` | `Docs/components/badge.md` |
| 3 | Breadcrumbs | `components/Breadcrumbs/breadcrumbs.html` | `.ds-bc-container` | `Docs/components/breadcrumbs.md` |
| 4 | Button | `components/Button/button.html` | `.ds-btn` | `Docs/components/button.md` |
| 5 | Calendar | `components/Calendar/calendar.html` | `.ds-calendar` | `Docs/components/calendar.md` |
| 6 | Checkbox | `components/Checkbox/checkbox.html` | `.ds-checkbox` | `Docs/components/checkbox.md` |
| 7 | Date Picker | `components/Date picker/date-picker.html` | `.ds-date-picker` | `Docs/components/date-picker.md` |
| 8 | Date Time Picker | `components/Date time picker/date time picker.html` | `.ds-date-time-picker` | `Docs/components/date-time-picker.md` |
| 9 | Dropdown Button | `components/dropdown/dropdown.html` | `.ds-dropdown` | `Docs/components/dropdown.md` |
| 10 | Flags | `components/Flags/flags.html` | `.ds-flag` | `Docs/components/flags.md` |
| 11 | Form | `components/Form/form.html` | `.ds-form-row` | `Docs/components/form.md` |
| 12 | Inline Edit | `components/Inline edit/inline-edit.html` | `.ds-inline-edit` | `Docs/components/inline-edit.md` |
| 13 | Lozenge | `components/Lozenge/lozenge.html` | `.ds-lozenge` | `Docs/components/lozenge.md` |
| 14 | Modal | `components/Modal/modal.html` | `.modal-composition-item` | `Docs/components/modal.md` |
| 15 | Navigation Menu | `components/Navigation menu/navigation.html` | `.ds-sidebar-nav-expand` | `Docs/components/navigation-menu.md` |
| 16 | Page Header | `components/Page Header/page-header.html` | `.ds-page-header` | `Docs/components/page-header.md` |
| 17 | Page Layout | `components/Page layout/page-layout.html` | `.ds-page-layout` | `Docs/components/page-layout.md` |
| 18 | Pagination | `components/Pagination/pagination.html` | `.ds-pagination` | `Docs/components/pagination.md` |
| 19 | Popup | `components/Popup/popup.html` | `.popup-anchor-wrap` | `Docs/components/popup.md` |
| 20 | Radio | `components/Radio/radio.html` | `.ds-radio` | `Docs/components/radio.md` |
| 21 | Range | `components/Range/range.html` | `.ds-range` | `Docs/components/range.md` |
| 22 | Section Message | `components/section messages/section-message.html` | `.ds-section-message` | `Docs/components/section-messages.md` |
| 23 | Select | `components/Select/select.html` | `.ds-select-trigger` | `Docs/components/select.md` |
| 24 | Table | `components/Table/table.html` | `.ds-table` | `Docs/components/table.md` |
| 25 | Tabs | `components/Tabs/tabs.html` | `.ds-tab` | `Docs/components/tabs.md` |
| 26 | Tags | `components/Tags/tags.html` | `.ds-tag` | `Docs/components/tags.md` |
| 27 | Text Area | `components/Text Area/text area.html` | `.ds-text-area` | `Docs/components/text-area.md` |
| 28 | Text Field | `components/Text Field/text field.html` | `.ds-text-field` | `Docs/components/text-field.md` |
| 29 | Time Picker | `components/Time picker/time-picker.html` | `.ds-time-picker` | `Docs/components/time-picker.md` |
| 30 | Toast Banner | `components/Toast-Banner/banner.html` | `.ds-banner` | `Docs/components/toast-banner.md` |
| 31 | Toggle | `components/Toggle/toggle.html` | `.ds-toggle` | `Docs/components/toggle.md` |
| 32 | Tooltip | `components/Tooltip/tooltip.html` | `.ds-tooltip` | `Docs/components/tooltip.md` |
| 33 | Top & Bottom Nav | `components/Top & bottom Navigation/top-bottom-nav.html` | `.ds-topnav` | `Docs/components/top-bottom-navigation.md` |
| 34 | Tourguide | `components/Tourguide/tourguide.html` | `.ds-tourguide` | `Docs/components/tourguide.md` |

## COMPONENT SPECS

### Avatar
`components/Avatar/avatar.html` · root `.ds-avatar` · `Docs/components/avatar.md`
Purpose: Representasi visual identitas pengguna; opsi presence indicator
Sizes: ds-avatar--sm, --md, --lg, --xl
States: — (presence via ds-avatar__presence)
Structure: <div class="ds-avatar"> → <img class="ds-avatar__image"> + optional <div class="ds-avatar__presence">
A11y: alt pada image; aria-label pada container bila perlu
CSS/TW: Doc shell: rounded-2xl, bg-neutral-n900; komponen: token radius/border via CSS
DO: Pilih satu ukuran (`--sm` … `--xl`) konsisten dalam konteks yang sama | Gunakan presence indicator sesuai status online/offline di doc
DONT: Jangan campur ukuran avatar dalam satu baris toolbar tanpa alasan layout | Jangan ganti path ikon ke library eksternal

### Badge
`components/Badge/badge.html` · root `.ds-badge` · `Docs/components/badge.md`
Purpose: Label kecil untuk jumlah atau status
Variants: ds-badge--default, --primary, --subtle, --important, --added, --removed
Structure: <div class="ds-badge"> → span.ds-badge__prefix (added/removed) + span.ds-badge__content
A11y: aria-label jika hanya angka/ikon tanpa teks konteks
CSS/TW: Warna semantic via CSS vars di <style>
DO: Gunakan variant semantic (`--added`, `--removed`) untuk diff status
DONT: Jangan jadikan badge sebagai satu-satunya label aksi tanpa teks

### Breadcrumbs
`components/Breadcrumbs/breadcrumbs.html` · root `.ds-bc-container` · `Docs/components/breadcrumbs.md`
Purpose: Navigasi hierarki halaman
Variants: ds-bc-container--truncated; ds-bc-item--default, --hover, --focus, --press; ds-bc-text--truncated
States: Item: --hover, --focus, --press
Structure: <nav class="ds-bc-container" aria-label="…"> → button.ds-bc-item + span.ds-bc-sep + span.ds-bc-text
A11y: aria-label pada nav; aria-current="page" pada item aktif; separator aria-hidden
CSS/TW: text-body-sm, warna text-neutral-n*
Icons: `icon-chevron-right.svg`, `icon-home.svg`
DO: Tandai halaman aktif dengan `aria-current="page"` | Gunakan `--truncated` saat path panjang
DONT: Jangan gunakan `<div>` menggantikan `<nav>` untuk breadcrumb utama

### Button
`components/Button/button.html` · root `.ds-btn` · `Docs/components/button.md`
Purpose: Trigger aksi pengguna
Variants: ds-btn--primary, --subtle, --subtle-link, --danger, --warning, --link, --icon-only, --compact, --loading, --none
Sizes: --compact, --icon-only
States: --hover, --focus, --press, --disabled, --selected; loading via --loading + .ds-spinner
Structure: <button type="button" class="ds-btn"> → label + optional spinner
A11y: Native <button>; aria-label (icon-only); aria-busy (loading); aria-pressed; disabled
CSS/TW: Komponen: --font-size-sm, --font-weight-medium; variant bg via var(--color-blue-b*), var(--color-neutral-n*)
DO: Gunakan `ds-btn--primary` untuk CTA utama | Gunakan `ds-btn--danger` hanya untuk aksi destruktif | Beri `aria-label` pada `ds-btn--icon-only` | Loading: `ds-btn--loading` + `aria-busy`
DONT: Jangan pakai button default sebagai primary CTA (gunakan `--primary`) | Jangan letakkan beberapa `ds-btn--primary` berdampingan | Jangan pakai `--compact` untuk primary CTA utama / layout luas (tap target) | Jangan gunakan library ikon eksternal

### Calendar
`components/Calendar/calendar.html` · root `.ds-calendar` · `Docs/components/calendar.md`
Purpose: Grid pemilih tanggal (month/week/day parts + composed)
Variants: ds-calendar-day--outside, --today, --selected, --range, --disabled, --text-subtle
States: --state-hover, --state-pressed, --state-focus
Structure: div.ds-calendar → header + div.ds-calendar__body → button.ds-calendar-day
A11y: role="grid", row, columnheader, group; aria-label; aria-selected; aria-disabled; aria-current="date"
CSS/TW: Layout grid di custom CSS; shadow-1 pada panel terkait
Icons: `icon-chevron-left.svg`, `icon-chevron-right.svg`
DO: Pertahankan pola grid ARIA pada sel hari | Tandai hari ini dengan `aria-current="date"` / `--today`
DONT: Jangan hilangkan `aria-disabled` pada hari non-interaktif

### Checkbox
`components/Checkbox/checkbox.html` · root `.ds-checkbox` · `Docs/components/checkbox.md`
Purpose: Pilihan boolean / indeterminate
Variants: ds-checkbox--error, --disabled, --snapshot
Sizes: Box 16×16px (dokumentasi)
States: ds-checkbox__box--checked, --indeterminate, --hover, --pressed, --focus, --focus-unchecked, --error, --error-unchecked, --disabled
Structure: <label class="ds-checkbox"> → input.ds-checkbox__input + span.ds-checkbox__box + span.ds-checkbox__icon + span.ds-checkbox__label
A11y: Input native; aria-invalid; dekorasi aria-hidden; pesan error teks terpisah
CSS/TW: rounded-sm pada box
Icons: `icon-check.svg`, `icon-minus.svg`
DO: Selalu bungkus dengan `<label>` + input native | Tampilkan pesan error saat `--error`
DONT: Jangan ganti input dengan div clickable saja | Jangan hapus `aria-hidden` pada box visual

### Date Picker
`components/Date picker/date-picker.html` · root `.ds-date-picker` · `Docs/components/date-picker.md`
Purpose: Input tanggal: trigger Select + panel Calendar
Variants: ds-select-trigger--hover, --focus; day: ds-calendar-day--outside, --selected
States: Trigger focus/hover; day selected
Structure: div.ds-date-picker → button.ds-select-trigger + panel ds-calendar
A11y: aria-haspopup="dialog", aria-expanded, aria-controls, role="dialog", calendar role="grid"
CSS/TW: Panel: shadow-1, rounded-xl
Icons: `icon-calendar-days.svg`, `icon-chevron-down.svg`, `icon-chevron-left.svg`, `icon-chevron-right.svg`
DO: Reuse `ds-select-trigger` + `ds-calendar` tanpa duplikasi token
DONT: Jangan buat panel kalender tanpa `aria-expanded` pada trigger

### Date Time Picker
`components/Date time picker/date time picker.html` · root `.ds-date-time-picker` · `Docs/components/date-time-picker.md`
Purpose: Tanggal dan waktu dalam satu kontrol
Variants: ds-date-time-picker__bar--hover, --focus; __dropdown--date, --time; __segment--date, --time, --active
States: Segmen --active; bar hover/focus
Structure: div.ds-date-time-picker → __bar + __segment + __dropdown
A11y: aria-haspopup, aria-expanded, role="dialog", listbox, grid
CSS/TW: Segmen aktif: text-neutral-n0 (doc)
Icons: `icon-calendar-days.svg`, `icon-chevron-left.svg`, `icon-chevron-right.svg`, `icon-clock.svg`
DO: Pisahkan dropdown date vs time dengan modifier `__dropdown--*`
DONT: Jangan gabungkan listbox time tanpa `role="listbox"` / `option`

### Dropdown Button
`components/dropdown/dropdown.html` · root `.ds-dropdown` · `Docs/components/dropdown.md`
Purpose: Menu aksi dari tombol
Variants: ds-dropdown-btn--icon-only; ds-dropdown-menu--scrollable; ds-dropdown-item--hover, --pressed, --selected, --selected-hover, --selected-pressed, --disabled, --no-lead, --no-trail
Sizes: --icon-only pada trigger
States: Item hover/pressed/selected
Structure: div.ds-dropdown → button (+ ds-btn) + div.ds-dropdown-menu → button.ds-dropdown-item (__lead, __label, __trail, __checkbox, __radio)
A11y: role="menu", menuitem, menuitemcheckbox, menuitemradio; aria-expanded, aria-haspopup="menu", aria-checked
CSS/TW: Menu: shadow-1, rounded-xl
Icons: `icon-check.svg`, `icon-chevron-right.svg`, `icon-ellipsis-vertical.svg`, `icon-shopping-bag.svg`
DO: Gunakan `ds-dropdown-item--selected` + `aria-checked` untuk checkbox/radio item
DONT: Jangan buka menu tanpa `aria-expanded` pada trigger

### Flags
`components/Flags/flags.html` · root `.ds-flag` · `Docs/components/flags.md`
Purpose: Banner notifikasi global collapsible
Variants: ds-flag--normal, --success, --error, --warning, --info, --collapsed
States: ds-flag-part--hover, --press, --focus; ds-flag__action--link, --primary
Structure: div.ds-flag → __header, __main, __title, __icon, __body, __actions, button.ds-flag-part
A11y: role="region", aria-expanded, aria-controls, aria-label pada dismiss/expand
CSS/TW: Background semantic via CSS vars (success, error, dll.)
Icons: `icon-chevron-down.svg`, `icon-chevron-up.svg`, `icon-solid-check-circle.svg`, `icon-solid-exclamation-triangle.svg`, `icon-solid-information-circle.svg`, `icon-x-mark.svg`
DO: Ikon dismiss: `icon-x-mark.svg`, chevron: `icon-chevron-down.svg` dari `assets/icons` | `aria-label` pada tombol ikon; `aria-expanded` pada collapse
DONT: Jangan teks "X" sebagai dismiss | Jangan hex hardcoded | Jangan beberapa dismiss dalam satu flag | Jangan hapus ring focus

### Form
`components/Form/form.html` · root `.ds-form-row` · `Docs/components/form.md`
Purpose: Baris label + field + pesan validasi
Variants: ds-form-row--default, --valid, --invalid; ds-form-message--error, --information, --true
States: Row invalid/valid
Structure: div.ds-form-row → p.ds-form-row__label + div.ds-form-row__field + p.ds-form-message
A11y: role="alert" pada pesan error
CSS/TW: gap-150, text-body-sm
Icons: `icon-ellipsis-vertical.svg`
DO: Pasangkan `--invalid` row dengan `ds-form-message--error`
DONT: Jangan tampilkan error tanpa `role="alert"` pada pesan

### Inline Edit
`components/Inline edit/inline-edit.html` · root `.ds-inline-edit` · `Docs/components/inline-edit.md`
Purpose: Edit nilai inline dengan konfirmasi/batal
Variants: ds-inline-edit--default, --hover, --press, --focus, --disabled; ds-inline-edit-host--active; ds-inline-edit__input--typing; ds-inline-edit-btn--confirm, --cancel (+ hover/press/focus)
States: Host --active; input --typing
Structure: div.ds-inline-edit-host → div.ds-inline-edit → __input, __actions, button.ds-inline-edit-btn
A11y: aria-label (edit, confirm, cancel); aria-disabled
CSS/TW: Reuse state ds-select-trigger--* di host
Icons: `icon-check.svg`, `icon-cross.svg`, `icon-x-mark.svg`
DO: Gunakan tombol confirm/cancel terpisah dengan label jelas
DONT: Jangan hilangkan escape/cancel saat mode edit aktif

### Lozenge
`components/Lozenge/lozenge.html` · root `.ds-lozenge` · `Docs/components/lozenge.md`
Purpose: Status pill ringkas (Jira-style)
Variants: ds-lozenge--default, --bold, --new, --removed, --success, --inprogress, --moved
Structure: <span class="ds-lozenge"> teks
A11y: Makna dari teks lozenge
CSS/TW: rounded-sm, ukuran caption
DO: Gunakan `--bold` untuk penekanan status
DONT: Jangan lozenge sebagai satu-satunya indikator tanpa konteks halaman

### Modal
`components/Modal/modal.html` · root `.modal-composition-item` · `Docs/components/modal.md`
Purpose: Dialog overlay konfirmasi/informasi
Variants: modal-header-icon--warning, --danger
Sizes: modal-size-xs, modal-size-sm, modal-size-md, modal-size-lg
A11y: Focus trap (script doc); ikon header dekoratif aria-hidden
CSS/TW: rounded-2xl, shadow-1
Icons: `icon-solid-exclamation-triangle.svg`
DO: Teks pendek untuk konfirmasi sederhana | Warning/danger icon variant untuk risiko | Footer: cancel `ds-btn--subtle`, primary kanan
DONT: Jangan lebih dari 2 aksi primary | Jangan `modal-header-icon--danger` untuk non-destruktif | Jangan teks panjang tanpa area scroll

### Navigation Menu
`components/Navigation menu/navigation.html` · root `.ds-sidebar-nav-expand` · `Docs/components/navigation-menu.md`
Purpose: Sidebar navigasi vertikal (parts + composed)
Variants: ds-sidebar-nav-expand--hide, --interactive; ds-nav-mainmenu-snap--hover, --press, --selected, --leaf; ds-nav-submenu-snap--*, --no-trail; ds-nav-menu-search--default, --hover, --focus, --typing, --rest; ds-nav-heading-snap--no-icons
States: Item selected/hover/press
Structure: div.ds-sidebar-nav-expand → ds-nav-heading-snap, ds-nav-mainmenu-snap, ds-nav-submenu-snap, ds-nav-menu-search, ds-nav-composed, ds-nav-divider
A11y: aria-expanded submenu; aria-current item aktif; :focus-visible pada snap
CSS/TW: Token sidebar-*, bg-sidebar, text-sidebar-link
Icons: `</code`, `dot.svg`, `dot.svg</code`, `icon-chevron-down.svg`, `icon-chevron-left.svg`, `icon-chevron-right.svg`, `icon-chevron-up.svg`, `icon-magnifying-glass.svg`, `icon-sidebar-offline-app-off.svg`, `icon-sidebar-offline-belanja-off.svg`, `icon-sidebar-offline-company-off.svg`, `icon-sidebar-offline-customer-off.svg`, `icon-sidebar-offline-dashboard-off.svg`, `icon-sidebar-offline-dashboard-on.svg`, `icon-sidebar-offline-finance-off.svg`, `icon-sidebar-offline-inventory-off.svg`, `icon-sidebar-offline-invoice-off.svg`, `icon-sidebar-offline-kas-bank-off.svg`, `icon-sidebar-offline-ledger-off.svg`, `icon-sidebar-offline-master-off.svg`, `icon-sidebar-offline-medikal-off.svg`, `icon-sidebar-offline-medikal-on.svg`, `icon-sidebar-offline-megaphone-off.svg`, `icon-sidebar-offline-news-off.svg`, `icon-sidebar-offline-payable-off.svg`, `icon-sidebar-offline-pos-off.svg`, `icon-sidebar-offline-pos-on.svg`, `icon-sidebar-offline-principal-off.svg`, `icon-sidebar-offline-product-off.svg`, `icon-sidebar-offline-product-on.svg`, `icon-sidebar-offline-report-off.svg`, `icon-sidebar-offline-setting-off.svg`, `icon-sidebar-offline-smart-forecasrting-off.svg`, `icon-x-circle-outline.svg`
DO: Tandai item aktif dengan `--selected` | Gunakan pasangan ikon sidebar off/on dari `assets/icons`
DONT: Jangan hapus focus visible pada item interaktif

### Page Header
`components/Page Header/page-header.html` · root `.ds-page-header` · `Docs/components/page-header.md`
Purpose: Judul halaman, breadcrumb, aksi, search, filter, toolbar tabel
Variants: ds-page-header--actions-on, --toolbar-on, --subfilters-on; ds-page-header__row--toolbar
Sizes: ds-btn--icon-only pada actions
States: ds-select-trigger--focus di demo
Structure: <header class="ds-page-header"> → __row, __start, __title (h1), __actions, __search, __filter, __subfilters, __toolbar
A11y: aria-label preview; breadcrumb nav + label
CSS/TW: Flex layout, gap-200
Icons: `icon-adjustments-horizontal.svg`, `icon-ellipsis-vertical.svg`
DO: Compose `ds-bc-*`, `ds-btn`, `ds-select-trigger` yang sudah ada
DONT: Jangan override token warna header dengan hex

### Page Layout
`components/Page layout/page-layout.html` · root `.ds-page-layout` · `Docs/components/page-layout.md`
Purpose: Shell halaman: topnav, sidebar/drawer, konten, footer nav
Sizes: ds-topnav--lg, --icon-only
Structure: div.ds-page-layout → __body → __aside, __drawer, __overlay, __content, __nav-main, __nav-sub
A11y: role="banner", contentinfo, region, status pada komposisi
CSS/TW: Full-height flex; token layout
Icons: `dot.svg`, `icon-adjustments-horizontal.svg`, `icon-bell.svg`, `icon-chevron-down.svg`, `icon-chevron-left.svg`, `icon-ellipsis-vertical.svg`, `icon-magnifying-glass.svg`, `icon-menu.svg`, `icon-pencil.svg`, `icon-sidebar-offline-dashboard-off.svg`, `icon-sidebar-offline-news-off.svg`, `icon-sidebar-offline-payable-off.svg`, `icon-sidebar-offline-pos-off.svg`
DO: Gunakan root `ds-page-layout` + variant breakpoint (`--website`, `--tablet`, `--mobile`) | Compose child components (topnav, page header, table) tanpa rewrite CSS mereka
DONT: Jangan hardcode token spacing/warna di shell | Jangan sidebar persisten di tablet/mobile (sesuai doc) | Jangan campur variant topnav dalam satu layout | Jangan beberapa banner sekaligus

### Pagination
`components/Pagination/pagination.html` · root `.ds-pagination` · `Docs/components/pagination.md`
Purpose: Navigasi halaman data
Variants: ds-pagination__item--active, --ellipsis, --prev, --next
States: --active
A11y: aria-current="page" pada aktif; aria-hidden ellipsis; aria-label prev/next
CSS/TW: rounded-md item
Icons: `icon-chevron-left.svg`, `icon-chevron-right.svg`
DO: Bungkus dengan `nav` + `aria-label="Pagination"` | Chevron + label pada prev/next | Ellipsis dengan `aria-hidden`
DONT: Jangan tampilkan semua nomor halaman pada set besar | Jangan hardcode warna item

### Popup
`components/Popup/popup.html` · root `.popup-anchor-wrap` · `Docs/components/popup.md`
Purpose: Panel kontekstual terikat anchor (bukan modal fullscreen)
Variants: popup-anchor-wrap--left, --center, --right
Structure: div.popup-anchor-wrap → trigger button + div.popup-part-panel
A11y: aria-live="polite" (playground doc)
CSS/TW: shadow-1 pada panel
DO: Pilih posisi anchor (`--left`, `--center`, `--right`) sesuai ruang layar
DONT: Jangan gunakan popup untuk konten yang membutuhkan focus trap penuh (gunakan Modal)

### Radio
`components/Radio/radio.html` · root `.ds-radio` · `Docs/components/radio.md`
Purpose: Pilihan tunggal dalam grup
Variants: ds-radio--error, --disabled, --snapshot; ds-radio-group--snapshot
States: ds-radio__circle--hover, --pressed, --focus, --checked, --error, --disabled
Structure: label.ds-radio → input.ds-radio__input + span.ds-radio__circle + span.ds-radio__label; grup: fieldset.ds-radio-group + legend
A11y: name sama dalam grup; aria-invalid; circle aria-hidden
CSS/TW: rounded-full pada circle
DO: Gunakan `fieldset` + `legend` untuk grup
DONT: Jangan radio tanpa shared `name`

### Range
`components/Range/range.html` · root `.ds-range` · `Docs/components/range.md`
Purpose: Slider nilai numerik 0–100%
Variants: ds-range--empty, --filled, --disabled, --interactive, --snapshot, --value-0, --value-50, --value-100
Sizes: Thumb 16px (doc)
States: ds-range__thumb--hover, --pressed; ds-range__track--focus, --pressed
Structure: div.ds-range → div.ds-range__track → __fill, __thumb + input.ds-range__input type="range"
A11y: aria-valuemin, aria-valuemax, aria-valuenow, aria-label
CSS/TW: Visual track dari assets/images/range=*.svg
DO: Gunakan asset range default/hover/press dari `assets/images/`
DONT: Jangan slider tanpa label/aria-label

### Section Message
`components/section messages/section-message.html` · root `.ds-section-message` · `Docs/components/section-messages.md`
Purpose: Pesan kontekstual in-page (bukan toast)
Variants: ds-section-message--information, --success, --warning, --error, --discovery
Structure: div.ds-section-message → __icon, __main → __header, __title, __description, __actions, __action
A11y: role="region", aria-labelledby → id judul
CSS/TW: Border/background semantic per variant
Icons: `icon-solid-check-circle.svg`, `icon-solid-exclamation-triangle.svg`, `icon-solid-information-circle.svg`, `icon-solid-question-mark-circle.svg`
DO: Maksimal 2 tautan aksi (sesuai doc halaman) | Ring fokus tautan: `Border.Focused` / `b200`
DONT: Jangan gunakan sebagai pengganti Toast Banner global

### Select
`components/Select/select.html` · root `.ds-select-trigger` · `Docs/components/select.md`
Purpose: Halaman doc fokus **Option Part** + trigger/listbox (komponen pilih nilai)
Variants: Trigger: ds-select-trigger--subtle, --none, --hover, --focus, --typing, --loading, --empty, --hydrate, --reset, --filled-invalid, --invalid, --disabled; Option: ds-option--hover, --pressed, --selected, --selected-hover; ds-option__control--checkbox, --radio
States: Trigger typing/loading/empty; option selected
Structure: div.ds-select-trigger → __value, __icon; menu div.ds-option → __control, __icon-slot; div.ds-groups, ds-group-label
A11y: role="listbox", option; aria-expanded, aria-busy, aria-multiselectable, aria-label
CSS/TW: shadow-1, rounded-lg trigger
Icons: `icon-ellipsis-vertical.svg`, `icon-solid-information-circle.svg`, `icon-square-2-stack.svg`, `icon-x-mark.svg`
DO: Reuse `ds-option` untuk single/multi/checkbox/radio select
DONT: Jangan listbox tanpa `aria-expanded` pada trigger

### Table
`components/Table/table.html` · root `.ds-table` · `Docs/components/table.md`
Purpose: Tabel data + parts (sort, kolom, sel) + pagination
Variants: ds-table--data, --sticky-head, --row-hover; ds-table-sort--asc, --desc; ds-table-header-cell--empty, --checkbox; ds-table-cell--hover, --focused; kolom ds-table-col-*--hover
States: Sort asc/desc; cell hover/focused
A11y: role="columnheader"; aria-sort; scroll region role="region" + tabindex="0"
CSS/TW: Sticky head via CSS
Icons: `icon-chevron-left.svg`, `icon-chevron-right.svg`, `icon-lock-closed.svg`, `icon-pencil.svg`, `icon-shopping-bag.svg`, `sortOrder`, `sortOrder%20=default.svg`, `sortOrder=ascending.svg`, `sortOrder=descending.svg`
DO: Bungkus dengan `.ds-table-scroll` + `.ds-table--sticky-head` bila perlu
DONT: Jangan hapus wrapper scroll pada tabel lebar

### Tabs
`components/Tabs/tabs.html` · root `.ds-tab` · `Docs/components/tabs.md`
Purpose: Navigasi tab horizontal
Variants: ds-tab--selected, --required, --notification; ds-tablist--track
States: --hover, --press, --focus
Structure: div.ds-tablist → button.ds-tab → __label, __indicator, __badge, __required
A11y: role="tablist", tab, tabpanel; aria-selected
CSS/TW: Border-bottom selected
DO: Satu tab `.ds-tab--selected` / `aria-selected="true"` | Notifikasi via `ds-badge--important` di slot badge
DONT: Jangan dua tab aktif bersamaan | Jangan `ds-tablist--track` diabaikan bila desain memakai track

### Tags
`components/Tags/tags.html` · root `.ds-tag` · `Docs/components/tags.md`
Purpose: Chip label; opsi removable
Variants: ds-tag--standard, --removable, --greylight, --bluelight, --greenlight, --purplelight, --redlight, --yellowlight
States: --state-hover, --state-pressed, --state-focus; ds-tag__remove--state-focus
Structure: span.ds-tag → __icon, __label, button.ds-tag__remove
A11y: aria-label pada remove ("Hapus tag…")
CSS/TW: Background light semantic
Icons: `icon-tag.svg`, `icon-x-mark.svg`
DO: Gunakan variant warna light untuk kategori
DONT: Jangan remove tanpa `aria-label`

### Text Area
`components/Text Area/text area.html` · root `.ds-text-area` · `Docs/components/text-area.md`
Purpose: Input multi-baris
Variants: ds-text-area--compact, --invalid
Sizes: --compact
States: ds-text-area__field--hover, --focus, --invalid, --disabled
Structure: div.ds-text-area → textarea.ds-text-area__field
A11y: aria-invalid, aria-describedby (bila ada di contoh)
CSS/TW: rounded-lg, border-1
Icons: `icon-document-text.svg`
DO: Pola token sama dengan Text Field
DONT: Jangan resize handle yang melanggar layout tanpa token spacing

### Text Field
`components/Text Field/text field.html` · root `.ds-text-field` · `Docs/components/text-field.md`
Purpose: Input satu baris + Phone, Icon, Search-select
Variants: ds-text-field--compact, --subtle, --none, --invalid, --monospaced, --disabled, --snapshot; ds-phone-field--*, ds-icon-text-field--*, ds-search-select-field--*; input/group --hover, --focus, --invalid, --disabled, --searching
Sizes: --compact
States: hover, focus, invalid, disabled, snapshot
Structure: div.ds-text-field → input.ds-text-field__input; variant: ds-phone-field + __group, __prefix; ds-icon-text-field; ds-search-select-field
A11y: aria-invalid, aria-describedby, aria-label (search/clear)
CSS/TW: rounded-lg; compact: spacing space-100
DO: Pilih appearance `--subtle` / `--none` sesuai konteks form | Tampilkan error dengan `--invalid` + describedby
DONT: Jangan campur monospaced dengan phone field tanpa kebutuhan doc

### Time Picker
`components/Time picker/time-picker.html` · root `.ds-time-picker` · `Docs/components/time-picker.md`
Purpose: Pilih waktu: trigger + list interval 30 menit
Variants: ds-select-trigger--subtle, --focus, --disabled
States: Trigger focus/disabled
Structure: button.ds-select-trigger + div.ds-time-picker → __menu (options)
A11y: aria-expanded, aria-controls, role="listbox", option, group
CSS/TW: Sama pola Select
Icons: `icon-chevron-down.svg`
DO: Reuse `ds-select-trigger` states
DONT: Jangan opsi waktu tanpa struktur listbox

### Toast Banner
`components/Toast-Banner/banner.html` · root `.ds-banner` · `Docs/components/toast-banner.md`
Purpose: Pesan kontekstual full-width
Variants: ds-banner--announcement, --success, --warning, --error
Structure: div.ds-banner → div.ds-banner__icon + span.ds-banner__text — **tanpa** tombol dismiss di implementasi saat ini
A11y: Makna dari teks banner; ikon dekoratif alt="" + aria-hidden="true" bila tidak informatif
CSS/TW: Warna semantic icon/teks
DO: Pilih variant semantic sesuai jenis pesan
DONT: Jangan campur dengan `ds-section-message` untuk pesan in-page panjang | Jangan dokumentasikan atau tambahkan dismiss button kecuali implementasi di `banner.html` diperbarui

### Toggle
`components/Toggle/toggle.html` · root `.ds-toggle` · `Docs/components/toggle.md`
Purpose: Switch boolean on/off
Variants: ds-toggle--large, --disabled, --snapshot
Sizes: ds-toggle--large (satu-satunya size modifier; jangan pakai --lg — hanya teks salin doc lama di halaman HTML)
States: ds-toggle__track--on, --hover-on, --hover-off, --focus, --disabled; ds-toggle__icon--on, --off
Structure: label.ds-toggle → input.ds-toggle__input + span.ds-toggle__track → span.ds-toggle__thumb + icons
A11y: role="switch", aria-checked, aria-label
CSS/TW: rounded-full track
Icons: `icon-check.svg`, `icon-x-mark.svg`
DO: Native input di dalam label + switch semantics
DONT: Jangan toggle tanpa `aria-checked` yang sinkron dengan state

### Tooltip
`components/Tooltip/tooltip.html` · root `.ds-tooltip` · `Docs/components/tooltip.md`
Purpose: Label bantu pada hover/focus
Variants: ds-tooltip--top, --bottom, --position-left, --position-center, --position-right; ds-tooltip-part--truncate, --overflow
Structure: div.ds-tooltip → trigger + span.ds-tooltip-part (pointer + label)
A11y: role="tooltip", aria-label
CSS/TW: shadow-1, bg neutral-n800 (doc)
Icons: `icon-solid-information-circle.svg`
DO: Pilih `--top` / `--bottom` + posisi horizontal
DONT: Jangan tooltip sebagai satu-satunya label kontrol (perlu label visible)

### Top & Bottom Nav
`components/Top & bottom Navigation/top-bottom-nav.html` · root `.ds-topnav` · `Docs/components/top-bottom-navigation.md`
Purpose: Top bar aplikasi + footer pager
Variants: ds-topnav--website, --tablet, --mobile; ds-topnav__logo--start, --center; ds-topnav__notif--secondary; ds-topnav-logo--hover, --press
Sizes: --lg, --icon-only
States: Logo hover/press
Structure: header.ds-topnav → __menu, __logo, __center, __end, __akses, __notif; footer.ds-footer-nav → __actions, __pager, __nav-btns
A11y: role="banner", aria-label pada logo/footer/pager
CSS/TW: Compose ds-btn, ds-badge, ds-avatar
Assets: `assets/images/logo-parts.svg`
Icons: `icon-bell.svg`, `icon-chevron-left.svg`, `icon-chevron-right.svg`, `icon-menu.svg`
DO: Satu variant topnav per breakpoint (--website, --tablet, --mobile)
DONT: Jangan campur variant topnav dalam satu viewport

### Tourguide
`components/Tourguide/tourguide.html` · root `.ds-tourguide` · `Docs/components/tourguide.md`
Purpose: Onboarding: spotlight, langkah tour, progress, aksi
Variants: — (parts: ds-btn-spotlight--hover, --press, --focus; ds-btn-onboarding-replay--*)
States: Hover/press/focus pada tombol spotlight/replay
Structure: div.ds-tourguide → __title, __text, __body, __progress, __footer; div.ds-spotlight-card → __head, __title, __body, __footer, __close; button.ds-btn-spotlight, ds-btn-onboarding-replay
A11y: aria-label pada article/tutup spotlight
CSS/TW: bg-blue-b300, shadow-md pada card; rounded-2xl
Icons: `icon-arrow-uturn-left.svg`, `icon-x-mark.svg`
DO: Judul singkat; instruksi satu kalimat | Progress langkah (mis. 1/3)
DONT: Jangan instruksi multi-paragraf panjang | Jangan tanpa cara dismiss/tutup spotlight

## COMPOSITION (reuse — do not rebuild)

| UI | Components | Source |
|----|------------|--------|
| App shell | `ds-page-layout` + `ds-topnav` + sidebar + `ds-footer-nav` | `components/Page layout/page-layout.html` |
| List page | `ds-page-header` + `ds-table` + `ds-pagination` | `components/Page Header/page-header.html`, `Table/table.html` |
| Form row | `ds-form-row` + `ds-text-field`/`ds-select-trigger` + `ds-form-message` | `components/Form/form.html` |
| Date input | `ds-select-trigger` + `ds-calendar` | `components/Date picker/date-picker.html` |
| DateTime | `ds-date-time-picker` | `components/Date time picker/date time picker.html` |
| Time input | `ds-select-trigger` + `ds-time-picker` | `components/Time picker/time-picker.html` |
| Confirm dialog | `modal-composition-item` + `ds-btn--subtle` + `ds-btn--primary` | `components/Modal/modal.html` |
| Context menu | `ds-dropdown` + `ds-dropdown-menu` + `ds-dropdown-item` | `components/dropdown/dropdown.html` |

## PROMPT SHELL

```
Task: [describe screen]
Context: Docs/figma-make-context.md
Rules: copy classes from components/*/*.html; tokens from styles/tokens.css; icons from assets/icons/; no new variants/colors/spacing; Tailwind semantic utilities only.
Output: HTML + Tailwind matching GPOS Lite DS V2.
```