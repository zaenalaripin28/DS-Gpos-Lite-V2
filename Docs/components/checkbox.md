# Checkbox

## Source of Truth

`components/Checkbox/checkbox.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Kotak kontrol 16×16px untuk seleksi multi opsi dalam form, tabel bulk-select, atau filter. Mendukung checked, indeterminate, error, dan disabled.

## Anatomy

* Root container (`.ds-checkbox`)
* Hidden input (ds-checkbox__input)
* Box (ds-checkbox__box)
* Icon (ds-checkbox__icon — check/minus)
* Label (ds-checkbox__label)

## Variants

* `default`
* `hover`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* pressed
* disable
* focus
* checked
* error
* indeterminate

## Tokens Used

* `--border-radius-2xl`
* `--border-radius-sm`
* `--border-radius-xl`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-green-g400`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r300`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--shadow-2xl`
* `--shadow-md`
* `--shadow-sm`
* `--space-100`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-check.svg`
* `assets/icons/icon-minus.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Selalu gunakan &lt;input type="checkbox"&gt; native yang disembunyikan secara visual, dengan &lt;label&gt; atau aria-labelledby. Jangan mengandalkan warna saja untuk state error — sertakan pesan teks.

## Usage Rules

Untuk memilih satu atau beberapa opsi independen dalam form, tabel bulk-select, atau filter. Gunakan radio jika hanya satu pilihan dalam grup.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-checkbox. Key related classes: .ds-checkbox, .ds-checkbox__input, .ds-checkbox__box, .ds-checkbox__icon, .ds-checkbox--disabled, .ds-checkbox__box--hover.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Checkbox/checkbox.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Checkbox for GPOS Lite Design System V2. Source: components/Checkbox/checkbox.html Root class: .ds-checkbox Appearances/variants: default, hover States: pressed, disable, focus, checked, error, indeterminate Icons: icon-check.svg, icon-minus.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
