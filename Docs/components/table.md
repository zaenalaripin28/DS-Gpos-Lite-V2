# Table

## Source of Truth

`components/Table/table.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Parts tabel (sort, header, cell, kolom) dan komponen lengkap dengan pagination. Semua token dari tokens.css.

## Anatomy

* Scroll wrapper (`.ds-table-scroll`) — `role="region"`, `tabindex="0"`
* Table (`table.ds-table`) — variant `--data`, `--sticky-head`, `--row-hover`
* Header cell (`th.ds-table-header-cell`) — optional `.ds-table-sort` (`--asc`, `--desc`)
* Body cell (`td.ds-table-cell`) — `--hover`, `--focused`
* Column types (`.ds-table-col-text`, `--link`, `--status`, dll.)

## Variants

* `data`
* `sticky-head`
* `row-hover`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default
* hover

## Tokens Used

* `--border-radius-full`
* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--border-width-1`
* `--border-width-2`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g100`
* `--color-green-g400`
* `--color-green-g50`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n200`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n500`
* `--color-neutral-n900`
* `--color-primary-500`
* `--color-red-r100`
* `--color-red-r400`
* `--color-red-r50`
* `--color-secondary-300`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-chevron-right.svg`
* `assets/icons/icon-lock-closed.svg`
* `assets/icons/icon-pencil.svg`
* `assets/icons/icon-shopping-bag.svg`
* `assets/icons/sortOrder`
* `assets/icons/sortOrder%20=default.svg`
* `assets/icons/sortOrder=ascending.svg`
* `assets/icons/sortOrder=descending.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Table when the interaction pattern matches the documented implementation in components/Table/table.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-table
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Table/table.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Table for GPOS Lite Design System V2. Source: components/Table/table.html Root class: .ds-table Appearances/variants: data, sticky-head, row-hover States: default, hover Icons: icon-chevron-left.svg, icon-chevron-right.svg, icon-lock-closed.svg, icon-pencil.svg, icon-shopping-bag.svg, sortOrder, sortOrder%20=default.svg, sortOrder=ascending.svg, sortOrder=descending.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
