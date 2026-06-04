# Flags

## Source of Truth

`components/Flags/flags.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

GPOS Lite V2 Flags component for dashboard UI patterns.

## Anatomy

* Root container (`.ds-flag`)
* Head (`.ds-flag-part__head`)
* Label (`.ds-flag-part__label`)
* Cell (`.ds-flag-part__cell`)
* Header (`.ds-flag-part__header`)
* Icon (`.ds-flag-part__icon`)
* Main (`.ds-flag-part__main`)
* Title row (`.ds-flag-part__title-row`)
* Title (`.ds-flag-part__title`)
* Controls (`.ds-flag-part__controls`)
* Body (`.ds-flag-part__body`)
* Description (`.ds-flag-part__description`)
* Actions (`.ds-flag-part__actions`)

## Variants

* `normal`
* `success`
* `error`
* `warning`
* `info`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* focus
* hover

## Tokens Used

* `--border-radius-lg`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-border`
* `--color-green-g300`
* `--color-green-g400`
* `--color-green-g500`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n500`
* `--color-neutral-n700`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-orange-o200`
* `--color-orange-o300`
* `--color-orange-o500`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r300`
* `--color-red-r400`
* `--color-red-r500`
* `--color-surface`
* `--color-text-inverse`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-chevron-down.svg`
* `assets/icons/icon-chevron-up.svg`
* `assets/icons/icon-solid-check-circle.svg`
* `assets/icons/icon-solid-exclamation-triangle.svg`
* `assets/icons/icon-solid-information-circle.svg`
* `assets/icons/icon-x-mark.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Gunakan &lt;button type=&quot;button&quot;&gt; dengan aria-label pada ikon. IconButton expand memakai aria-expanded. Jangan gunakan div klik-able.

## Usage Rules

Use Flags when the interaction pattern matches the documented implementation in components/Flags/flags.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-flag
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Flags/flags.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Flags for GPOS Lite Design System V2. Source: components/Flags/flags.html Root class: .ds-flag Appearances/variants: normal, success, error, warning, info States: focus, hover Icons: icon-chevron-down.svg, icon-chevron-up.svg, icon-solid-check-circle.svg, icon-solid-exclamation-triangle.svg, icon-solid-information-circle.svg, icon-x-mark.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
