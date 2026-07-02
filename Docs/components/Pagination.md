# Pagination

## Purpose

Navigation control for moving between pages of a paginated result. Renders an ordered list of page numbers, ellipsis gaps, and previous/next icon buttons.

## Source of Truth

* HTML Reference: components/Pagination/
* Runtime Component: src/GposLite/components/Pagination.tsx
* Styles: src/GposLite/styles/pagination.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`<nav>` `.ds-pagination`, `aria-label`)
* Page item (`<button>` `.ds-pagination__item`, label = `item.page`)
* Active page (`.ds-pagination__item--active`, `aria-current="page"`)
* Ellipsis (`<span>` `.ds-pagination__item ds-pagination__item--ellipsis`, `aria-hidden`)
* Prev button (`.ds-pagination__item` + `<img>` from `assets/icons/icon-chevron-left.svg`)
* Next button (`.ds-pagination__item` + `<img>` from `assets/icons/icon-chevron-right.svg`)

## Variants

| Variant | Description |
| ------- | ----------- |
| page | Numbered page button (`.ds-pagination__item`) |
| active | Current page (`.ds-pagination__item--active`) |
| ellipsis | Non-interactive gap (`.ds-pagination__item--ellipsis`) |
| prev | Previous-page icon button (`type: 'prev'`) |
| next | Next-page icon button (`type: 'next'`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | 32px | Single size; item is 32×32px (`.ds-pagination__item`) |

## States

* Default
* Hover (`:hover`)
* Active / Press (`:active`)
* Focus (`:focus-visible`, box-shadow ring)
* Active page (`.ds-pagination__item--active`)
* Ellipsis (`.ds-pagination__item--ellipsis`, `pointer-events: none`)

## Token Usage

### Colors

* --color-neutral-n20
* --color-neutral-n300
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300

### Spacing

* --space-050

### Radius

* --border-radius-md

### Typography

* --font-primary
* --text-body-small-medium-size
* --text-body-small-medium-weight
* --text-body-small-medium-lh

### Transition

* --transition-fast

## Accessibility

* Container is a native `<nav>` with `aria-label` (default `Pagination`).
* Page/prev/next are native `<button type="button">`; keyboard activation via Enter/Space.
* Active page sets `aria-current="page"`.
* Prev/next buttons expose `aria-label` (default `Halaman sebelumnya` / `Halaman berikutnya`); their `<img>` is `alt=""` `aria-hidden`.
* Ellipsis is `aria-hidden="true"`.
* Focus shown via `:focus-visible` box-shadow ring (no bare outline removal).

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* Icon (prev/next chevrons, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-pagination` + `.ds-pagination__item`)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar page/active/ellipsis/prev/next

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar item type yang ada
* Jangan membuat ukuran baru di luar 32px item
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-pagination` + `.ds-pagination__item`)

## Example Structure

```
Pagination (nav.ds-pagination)
├─ Prev (button.ds-pagination__item > img)
├─ Page (button.ds-pagination__item)
├─ Active (button.ds-pagination__item--active)
├─ Ellipsis (span.ds-pagination__item--ellipsis)
└─ Next (button.ds-pagination__item > img)
```
