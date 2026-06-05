# Date Time Picker

## Source of Truth

`components/Date time picker/date time picker.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Komposisi Select trigger + Calendar + Time picker untuk memilih tanggal dan waktu dalam satu komponen yang terintegrasi.

## Anatomy

* Root container (`.ds-date-time-picker`)
* Date Time Picker Bar (`.ds-date-time-picker__bar`)
* Date Time Picker Segment (`.ds-date-time-picker__segment`)
* Date Time Picker Dropdown (`.ds-date-time-picker__dropdown`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* focus
* disabled
* selected

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
* `--color-neutral-n60`
* `--color-neutral-n900`
* `--color-primary-200`
* `--color-primary-50`
* `--color-primary-600`
* `--color-text-secondary`
* `--font-primary`
* `--shadow-md`
* `--space-050`
* `--space-075`
* `--space-100`
* `--space-150`
* `--space-200`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-calendar-days.svg`
* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-chevron-right.svg`
* `assets/icons/icon-clock.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Date Time Picker when the interaction pattern matches the documented implementation in components/Date time picker/date time picker.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-date-time-picker. Key related classes: .ds-date-time-picker, .ds-date-time-picker__bar, .ds-date-time-picker__bar--hover, .ds-date-time-picker__bar--focus, .ds-date-time-picker__segment, .ds-date-time-picker__segment--time.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Date time picker/date time picker.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Date Time Picker for GPOS Lite Design System V2. Source: components/Date time picker/date time picker.html Root class: .ds-date-time-picker States: focus, disabled, selected Icons: icon-calendar-days.svg, icon-chevron-left.svg, icon-chevron-right.svg, icon-clock.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
