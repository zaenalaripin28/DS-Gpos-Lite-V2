# Breadcrumbs

## Source of Truth

`components/Breadcrumbs/breadcrumbs.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Navigasi hierarkis yang menunjukkan posisi halaman saat ini dalam struktur situs. Tersedia dalam 4 state (default, hover, press, focus) dengan varian truncationWidth untuk kontrol teks panjang.

## Anatomy

* Root container (`.ds-bc-container`)
* Bc Item (`.ds-bc-item`)
* Bc Sep (`.ds-bc-sep`)
* Bc Text (`.ds-bc-text`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default
* hover
* press
* focus
* pressed

## Tokens Used

* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b75`
* `--color-green-g300`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n400`
* `--color-neutral-n700`
* `--color-primary-500`
* `--color-primary-600`
* `--color-text-secondary`
* `--font-primary`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-chevron-right.svg`
* `assets/icons/icon-home.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Lebih dari 4–5 level membingungkan pengguna. Pertimbangkan menyederhanakan atau menyembunyikan level tengah.

## Usage Rules

Use Breadcrumbs when the interaction pattern matches the documented implementation in components/Breadcrumbs/breadcrumbs.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-bc-container
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Breadcrumbs/breadcrumbs.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Breadcrumbs for GPOS Lite Design System V2. Source: components/Breadcrumbs/breadcrumbs.html Root class: .ds-bc-container States: default, hover, press, focus, pressed Icons: icon-chevron-right.svg, icon-home.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
