# Modal

## Source of Truth

`components/Modal/modal.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Overlay dialog yang memerlukan perhatian pengguna sebelum melanjutkan. Mendukung 3 appearance (default, warning, danger), teks pendek/panjang, dan 4 ukuran.

## Anatomy

* Root container (`.modal-composition-item`)
* Body wrapper (`.modal-composition-body`)
* Header (`.modal-header-item` + `__title`); icon (`.modal-header-icon`)
* Body text (`p.modal-body-text-short` / `modal-body-text-long`)
* Footer (`.modal-footer-container` + `.modal-footer-actions`)
* Footer buttons reuse `.ds-btn`, `.ds-btn--primary`, `.ds-btn--subtle`, `.ds-btn--warning`, `.ds-btn--danger`

## Variants

* `default`
* `warning`
* `danger`

## Sizes

* `xs`
* `sm`
* `md`
* `lg`

## States

* Default · Hover · Pressed · Focus · Disabled (via CSS pseudo-classes and BEM modifiers)

## Tokens Used

* `--border-radius-full`
* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-none`
* `--border-radius-xl`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-blue-b500`
* `--color-border`
* `--color-border-light`
* `--color-green-g300`
* `--color-green-g400`
* `--color-green-g50`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n40`
* `--color-neutral-n50`
* `--color-neutral-n700`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-orange-o200`
* `--color-orange-o300`
* `--color-red-r300`
* `--color-red-r400`
* `--color-red-r50`
* `--color-red-r500`
* `--color-surface`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-solid-exclamation-triangle.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Modal when the interaction pattern matches the documented implementation in components/Modal/modal.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .modal-composition-item
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Modal/modal.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Modal for GPOS Lite Design System V2. Source: components/Modal/modal.html Root class: .modal-composition-item Sizes: xs, sm, md, lg Icons: icon-solid-exclamation-triangle.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
