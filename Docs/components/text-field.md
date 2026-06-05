# Text Field

## Source of Truth

`components/Text Field/text field.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Input teks satu baris untuk formulir — termasuk varian Phone Number Field dengan prefix kode negara. Tiga appearance, dua ukuran, opsi monospaced, dan tujuh state interaksi.

## Anatomy

* Root (`.ds-text-field`) → `input.ds-text-field__input`
* Group (`.ds-text-field__group`), prefix (`.ds-text-field__prefix`), divider (`.ds-text-field__divider`)
* Variants: `ds-phone-field`, `ds-icon-text-field`, `ds-search-select-field` (+ `__group`, `__prefix`)

## Variants

* `standard`
* `subtle`
* `none`

## Sizes

* `compact`

## States

* default
* hover
* focus
* typing
* disabled
* invalid
* selected
* error

## Tokens Used

* `--border-radius-md`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n100`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n500`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r100`
* `--color-red-r300`
* `--color-secondary-400`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--font-size-xs`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* None component-specific (navigation shell uses icon-chevron-mini-down.svg)

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Gunakan input[type=\"search\"], label yang jelas, dan tombol kiri/kanan dengan aria-label deskriptif untuk screen reader.

## Usage Rules

Form registrasi, profil pelanggan, verifikasi OTP, atau checkout yang membutuhkan nomor HP Indonesia (+62). Jangan dipakai jika pengguna perlu memilih kode negara lain — pertimbangkan combobox terpisah.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-text-field. Key related classes: .ds-text-field, .ds-text-field__input, .ds-text-field__input--snapshot, .ds-text-field__input--hover, .ds-text-field__input--focus, .ds-text-field--invalid.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Text Field/text field.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Text Field for GPOS Lite Design System V2. Source: components/Text Field/text field.html Root class: .ds-text-field Appearances/variants: standard, subtle, none Sizes: compact States: default, hover, focus, typing, disabled, invalid, selected, error Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
