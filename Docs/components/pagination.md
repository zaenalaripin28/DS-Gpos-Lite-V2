# Pagination

## Source of Truth

`components/Pagination/pagination.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Navigasi halaman berbasis token untuk list dan tabel dengan data besar. Mendukung keyboard navigation, ellipsis, dan ARIA attributes.

## Anatomy

* Root container (`.ds-pagination`)
* Item (`.ds-pagination__item`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* active

## Tokens Used

* `--border-radius-md`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-green-g400`
* `--color-neutral-n0`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-primary-500`
* `--color-primary-600`
* `--color-surface`
* `--color-text-secondary`
* `--font-primary`
* `--shadow-md`
* `--space-050`
* `--text-body-small-medium-lh`
* `--text-body-small-medium-size`
* `--text-body-small-medium-weight`
* `--transition-fast`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-chevron-right.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Pagination when the interaction pattern matches the documented implementation in components/Pagination/pagination.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-pagination. Key related classes: .ds-pagination, .ds-pagination__item, .ds-pagination__item--active, .ds-pagination__item--ellipsis.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Pagination/pagination.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Pagination for GPOS Lite Design System V2. Source: components/Pagination/pagination.html Root class: .ds-pagination States: active Icons: icon-chevron-left.svg, icon-chevron-right.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
