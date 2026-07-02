# Table

## Purpose

Horizontally-scrollable data table wrapper that renders a `<table>` with optional sticky header, row hover, and data sizing. Cell/column/header part classes are provided in CSS for composing rows.

## Source of Truth

* HTML Reference: components/Table/
* Runtime Component: src/GposLite/components/Table.tsx
* Styles: src/GposLite/styles/table.css
* Tokens: styles/tokens.css

## Anatomy

* Scroll region (`<div>` `.ds-table-scroll`, `role="region"`, `tabIndex={0}`)
* Table (`<table>` `.ds-table` + `--data` / `--sticky-head` / `--row-hover`)
* Header cell parts (`.ds-table-header-cell`, `__label`, `__checkbox`)
* Cell parts (`.ds-table-cell`, `__content`, `__text`, `__description`, `__icon`)
* Column parts (`.ds-table-col-text` / `-link` / `-status` / `-icon` / `-checkbox`, with `__header` / `__row`)
* Status lozenge (`.ds-lozenge`, `--default`)

## Variants

| Variant | Description |
| ------- | ----------- |
| data | Data table with min-width sizing (`.ds-table--data`, default on) |
| sticky-head | Header sticks on vertical scroll (`.ds-table--sticky-head`) |
| row-hover | Row background on hover (`.ds-table--row-hover`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | auto | Single size; `.ds-table--data` sets `min-width: 36rem` (→ `32rem` ≤640px); row/cell heights driven by content + padding |

## States

* Default
* Scroll-region focus (`.ds-table-scroll:focus-visible`, box-shadow ring)
* Row hover (`.ds-table--row-hover tbody tr:hover td`)
* Cell hover (`.ds-table-cell--hover` / `.ds-table-col-*--hover`)
* Cell focused (`.ds-table-cell--focused` / `.ds-table-col-text--focused`, inset ring)

## Token Usage

### Colors

* --color-neutral-n20
* --color-neutral-n200
* --color-neutral-n300
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-border
* --color-surface
* --color-text-primary

### Spacing

* --space-025
* --space-050
* --space-100
* --space-150
* --space-200

### Radius

* --border-radius-sm
* --border-radius-md

### Border

* --border-width-1
* --border-width-2

### Typography

* --font-primary
* --text-body-small-medium-size
* --text-body-small-medium-weight
* --text-body-small-medium-lh
* --text-body-small-regular-size
* --text-body-small-regular-weight
* --text-body-small-regular-lh
* --text-overline-medium-size
* --text-overline-medium-lh
* --text-overline-medium-ls
* --text-overline-medium-transform
* --font-weight-semibold

## Accessibility

* Scroll wrapper is `role="region"` with `tabIndex={0}` so keyboard users can scroll/focus the table; focus shown via `:focus-visible` box-shadow ring.
* Renders semantic `<table>`; caller supplies `<thead>`/`<tbody>` markup as children.
* Header cell checkbox inputs are visually hidden with `:focus-visible` ring on the styled box.
* Link cells (`.ds-table-col-link__anchor`) expose hover/focus styling with `:focus-visible` ring.

## Responsive Behavior

* `@media (max-width: 640px)`: `.ds-table--data` reduces `min-width` to `32rem`; status/link/icon header cells use `white-space: nowrap`; footer/pagination center.
* `@media (max-width: 768px)`: documentation page chrome adjustments (`.ds-table-part-state`, `.ds-table-col-preview`).
* `@media (prefers-reduced-motion: reduce)`: transitions/animations minimized.

## Composition Rules

Component may be used together with:

* Pagination (`.ds-pagination`, in `.ds-table-footer`)
* Lozenge (`.ds-lozenge`, status column)
* Icon (cell/column icons, from `assets/icons`)
* Checkbox parts (header/column checkbox)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-table-scroll` + `.ds-table` + part classes)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar data/sticky-head/row-hover

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar data/sticky-head/row-hover
* Jangan membuat ukuran baru di luar sizing yang ada
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-table-scroll` > `.ds-table` + cell/column part classes)

## Example Structure

```
Table (div.ds-table-scroll[role=region])
└─ table.ds-table[--data][--sticky-head][--row-hover]
   ├─ thead
   │  └─ tr > th.ds-table-col-* (.ds-table-header-cell)
   └─ tbody
      └─ tr > td.ds-table-col-* (.ds-table-cell)
```
