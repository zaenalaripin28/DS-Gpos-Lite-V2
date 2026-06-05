# Select

## Source of Truth

`components/Select/select.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Bagian option pada komponen Select untuk state default, hover, pressed, selected, dan selected hover sesuai referensi Figma.

## Anatomy

* Root trigger (`.ds-select-trigger`) → `__value`, `__icon`
* Option (`.ds-option`) → `__control`, `__icon-slot`
* Groups (`.ds-groups`, `.ds-group-label`)
* Wrapper dokumentasi (`.ds-select-component`) — container halaman doc, bukan root komponen

## Variants

* `first`
* `default`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* selected
* typing
* loading
* disabled
* checked
* hover
* pressed

## Tokens Used

* `--border-radius-full`
* `--border-radius-md`
* `--border-radius-sm`
* `--border-radius-xs`
* `--border-width-2`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-blue-b500`
* `--color-border`
* `--color-neutral-n0`
* `--color-neutral-n100`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n500`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-red-r100`
* `--color-red-r300`
* `--color-red-r50`
* `--color-surface`
* `--color-text-disabled`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-ellipsis-vertical.svg`
* `assets/icons/icon-solid-information-circle.svg`
* `assets/icons/icon-square-2-stack.svg`
* `assets/icons/icon-x-mark.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Interaction Notes

## Usage Rules

Use Select — Option Part when the interaction pattern matches the documented implementation in components/Select/select.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-select-trigger. Key related classes: .ds-select-trigger__value, .ds-select-trigger__icon, .ds-option, .ds-option--selected.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Select/select.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Select — Option Part for GPOS Lite Design System V2. Source: components/Select/select.html Root class: .ds-select-trigger Appearances/variants: first, default States: selected, typing, loading, disabled, checked, hover, pressed Icons: icon-ellipsis-vertical.svg, icon-solid-information-circle.svg, icon-square-2-stack.svg, icon-x-mark.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
