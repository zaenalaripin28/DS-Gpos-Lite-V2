# Calendar

## Source of Truth

`components/Calendar/calendar.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

GPOS Lite V2 Calendar component for dashboard UI patterns.

## Anatomy

* Root (`.ds-calendar`) — `role="group"`
* Body (`.ds-calendar__body`)
* Month header (`.ds-calendar-month-header`) — `__label`, `__nav`
* Week header (`.ds-calendar-week-header`) — `__day` (`role="columnheader"`)
* Days grid (`.ds-calendar-days`) — `role="grid"`
* Day button (`button.ds-calendar-day`) — `--outside`, `--today`, `--selected`, `--disabled`

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* disabled
* default
* hover
* selected

## Tokens Used

* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-blue-b500`
* `--color-border`
* `--color-green-g400`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n60`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-purple-p300`
* `--color-purple-p50`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--shadow-md`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-chevron-right.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

role="columnheader" pada week day, role="grid" pada days, aria-current="date" / aria-selected pada sel aktif.

## Usage Rules

Use Calendar when the interaction pattern matches the documented implementation in components/Calendar/calendar.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-calendar
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Calendar/calendar.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Calendar for GPOS Lite Design System V2. Source: components/Calendar/calendar.html Root class: .ds-calendar States: disabled, default, hover, selected Icons: icon-chevron-left.svg, icon-chevron-right.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
