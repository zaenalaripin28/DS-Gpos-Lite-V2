# Date picker

## Source of Truth

`components/Date picker/date-picker.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

GPOS Lite V2 Date picker component for dashboard UI patterns.

## Anatomy

* Root container (`.ds-date-picker-layout`)
* Value (`.ds-date-picker-layout__value`)
* Icon (`.ds-date-picker-layout__icon`)
* Chevron (`.ds-date-picker-layout__chevron`)
* Body (`.ds-date-picker-layout__body`)
* Label (`.ds-date-picker-layout__label`)
* Nav (`.ds-date-picker-layout__nav`)
* Day (`.ds-date-picker-layout__day`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* disabled
* selected
* focus

## Tokens Used

* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--border-width-2`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-border`
* `--color-green-g400`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n100`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n500`
* `--color-neutral-n900`
* `--color-surface`
* `--color-text-secondary`
* `--font-primary`
* `--shadow-sm`
* `--space-050`
* `--space-075`
* `--space-100`
* `--space-150`
* `--space-200`
* `--text-body-medium-medium-lh`
* `--text-body-medium-medium-size`
* `--text-body-medium-medium-weight`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-calendar-days.svg`
* `assets/icons/icon-chevron-down.svg`
* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-chevron-right.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Input dengan ikon kalender

## Usage Rules

Use Date picker when the interaction pattern matches the documented implementation in components/Date picker/date-picker.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-date-picker-layout. Key related classes: .ds-date-picker-layout.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Date picker/date-picker.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Date picker for GPOS Lite Design System V2. Source: components/Date picker/date-picker.html Root class: .ds-date-picker-layout States: disabled, selected, focus Icons: icon-calendar-days.svg, icon-chevron-down.svg, icon-chevron-left.svg, icon-chevron-right.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
