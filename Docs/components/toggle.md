# Toggle

## Source of Truth

`components/Toggle/toggle.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Switch on/off boolean dengan ikon status check/x. Dua ukuran track dan empat state interaksi berbasis semantic tokens.

## Anatomy

* Root container (`.ds-toggle`)
* Input (`.ds-toggle__input`)
* Track (`.ds-toggle__track`)
* Thumb (`.ds-toggle__thumb`)
* Icon (`.ds-toggle__icon`)
* Head (`.ds-toggle__head`)
* Label (`.ds-toggle__label`)
* Cell (`.ds-toggle__cell`)
* Row (`.ds-toggle__row`)

## Variants

* `large`

## Sizes

* `regular`
* `large`

## States

* default
* hover
* focus
* disabled
* checked

## Tokens Used

* `--border-radius-2xl`
* `--border-radius-sm`
* `--border-radius-xl`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g200`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n500`
* `--color-neutral-n700`
* `--color-primary-300`
* `--color-primary-500`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--shadow-2xl`
* `--shadow-sm`
* `--space-025`
* `--space-050`
* `--transition-fast`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-check.svg`
* `assets/icons/icon-x-mark.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Gunakan &lt;input type="checkbox" role="switch"&gt; dengan aria-checked. Sertakan label terlihat atau aria-label. Jangan mengandalkan warna hijau/abu saja — ikon check/x memberi petunjuk status.

## Usage Rules

Untuk pengaturan on/off tunggal yang berlaku segera (notifikasi, fitur aktif/nonaktif, mode tampilan). Satu toggle = satu boolean; tidak untuk memilih banyak opsi (gunakan checkbox/radio).

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-toggle. Key related classes: .ds-toggle, .ds-toggle__input, .ds-toggle__track, .ds-toggle__thumb, .ds-toggle__icon, .ds-toggle__icon--on.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Toggle/toggle.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Toggle for GPOS Lite Design System V2. Source: components/Toggle/toggle.html Root class: .ds-toggle Appearances/variants: large Sizes: regular, large States: default, hover, focus, disabled, checked Icons: icon-check.svg, icon-x-mark.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
