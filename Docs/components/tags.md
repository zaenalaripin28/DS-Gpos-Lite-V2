# Tags

## Source of Truth

`components/Tags/tags.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Chip pill untuk label, filter aktif, atau tag yang bisa dihapus. Tersedia 7 varian warna dengan state interaktif dan opsi removable.

## Anatomy

* Root (`span.ds-tag`)
* Tag Icon (`.ds-tag__icon`)
* Tag Label (`.ds-tag__label`)
* Tag Remove (`.ds-tag__remove`)

## Variants

* `standard`
* `removable`
* `state-hover`
* `state-pressed`
* `state-focus`
* `bluelight`
* `redlight`
* `greenlight`
* `greylight`
* `yellowlight`
* `purplelight`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* hover
* default
* pressed
* focus

## Tokens Used

* `--border-radius-2xl`
* `--border-radius-full`
* `--border-radius-md`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g100`
* `--color-green-g300`
* `--color-green-g400`
* `--color-green-g50`
* `--color-green-g500`
* `--color-green-g75`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n60`
* `--color-neutral-n70`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-orange-o100`
* `--color-orange-o300`
* `--color-orange-o50`
* `--color-orange-o500`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-tag.svg`
* `assets/icons/icon-x-mark.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Untuk menandai kategori, filter aktif, metadata singkat, atau daftar pilihan yang bisa dihapus pengguna — bukan untuk status workflow (gunakan Lozenge) atau angka (gunakan Badge).

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-tag. Key related classes: .ds-tag, .ds-tag--standard, .ds-tag--removable, .ds-tag--state-hover, .ds-tag--state-pressed, .ds-tag--state-focus.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Tags/tags.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Tags for GPOS Lite Design System V2. Source: components/Tags/tags.html Root class: .ds-tag Appearances/variants: standard, removable, state-hover, state-pressed, state-focus, bluelight, redlight, greenlight, greylight, yellowlight, purplelight States: hover, default, pressed, focus Icons: icon-tag.svg, icon-x-mark.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
