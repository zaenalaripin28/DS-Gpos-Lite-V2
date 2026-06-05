# Text Area

## Source of Truth

`components/Text Area/text area.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Komponen input multi-baris untuk konten panjang seperti catatan, deskripsi, dan alasan. Mengikuti semantic color token, spacing token, typography token, dan interaction pattern yang sama seperti input komponen lain.

## Anatomy

* Root container (`.ds-text-area`)
* Text Area Field (`.ds-text-area__field`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* `compact`

## States

* error
* invalid

## Tokens Used

* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n100`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r100`
* `--color-red-r300`
* `--color-surface`
* `--color-text-primary`
* `--font-primary`
* `--space-075`
* `--space-100`
* `--text-body-small-regular-lh`
* `--text-body-small-regular-size`
* `--text-body-small-regular-weight`
* `--transition-fast`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-document-text.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Text Area when the interaction pattern matches the documented implementation in components/Text Area/text area.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-text-area. Key related classes: .ds-text-area, .ds-text-area__field, .ds-text-area__field--hover, .ds-text-area__field--focus, .ds-text-area--invalid, .ds-text-area__field--invalid.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Text Area/text area.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Text Area for GPOS Lite Design System V2. Source: components/Text Area/text area.html Root class: .ds-text-area Sizes: compact States: error, invalid Icons: icon-document-text.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
