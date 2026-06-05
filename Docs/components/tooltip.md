# Tooltip

## Source of Truth

`components/Tooltip/tooltip.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Label konteks (&lt;TooltipPrimitive&gt;) yang muncul saat hover — default, truncate, dan overflow — dibangun dari token typography &amp; spacing.

## Anatomy

* Root (`.ds-tooltip`) — variant posisi `--top`, `--bottom`, `--position-left`, `--position-center`, `--position-right`
* Trigger — elemen interaktif yang membungkus tooltip
* Bubble (`.ds-tooltip-part`) — pointer + label; `--truncate`, `--overflow`

## Variants

* `top`
* `bottom`
* `position-center`
* `position-left`
* `position-right`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* hover
* default

## Tokens Used

* `--border-radius-2xl`
* `--color-blue-b100`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n400`
* `--color-neutral-n500`
* `--color-primary-300`
* `--color-primary-500`
* `--color-surface`
* `--color-text-inverse`
* `--color-text-primary`
* `--color-text-tertiary`
* `--font-primary`
* `--shadow-sm`
* `--space-050`
* `--space-075`
* `--space-100`
* `--space-200`
* `--space-250`
* `--space-300`
* `--space-400`
* `--space-500`
* `--space-600`
* `--space-800`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-solid-information-circle.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Tooltip when the interaction pattern matches the documented implementation in components/Tooltip/tooltip.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-tooltip
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Tooltip/tooltip.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Tooltip for GPOS Lite Design System V2. Source: components/Tooltip/tooltip.html Root class: .ds-tooltip Appearances/variants: top, bottom, position-center, position-left, position-right States: hover, default Icons: icon-solid-information-circle.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
