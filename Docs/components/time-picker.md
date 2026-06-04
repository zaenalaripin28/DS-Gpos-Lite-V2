# Time picker

## Source of Truth

`components/Time picker/time-picker.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

GPOS Lite V2 Time picker component for dashboard UI patterns.

## Anatomy

* Root container (`.ds-time-picker`)
* Value (`.ds-time-picker__value`)
* Icon (`.ds-time-picker__icon`)
* Menu (`.ds-time-picker__menu`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* focus
* selected
* hover

## Tokens Used

* `--border-radius-pill`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n100`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n50`
* `--color-neutral-n500`
* `--color-neutral-n900`
* `--color-surface`
* `--color-text-disabled`
* `--font-primary`
* `--shadow-md`
* `--space-050`
* `--space-075`
* `--space-100`
* `--space-150`
* `--space-200`
* `--text-body-small-medium-weight`
* `--text-body-small-regular-lh`
* `--text-body-small-regular-size`
* `--text-body-small-regular-weight`
* `--text-caption-medium-lh`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-chevron-down.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Time picker when the interaction pattern matches the documented implementation in components/Time picker/time-picker.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-time-picker. Key related classes: .ds-time-picker, .ds-time-picker__menu.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Time picker/time-picker.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Time picker for GPOS Lite Design System V2. Source: components/Time picker/time-picker.html Root class: .ds-time-picker States: focus, selected, hover Icons: icon-chevron-down.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
