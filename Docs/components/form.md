# Form

## Source of Truth

`components/Form/form.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

GPOS Lite V2 Form component for dashboard UI patterns.

## Anatomy

* Root container (`.ds-form-row`)
* Form Row Label (`.ds-form-row__label`)
* Form Row Field (`.ds-form-row__field`)
* Form Message (`.ds-form-message`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* error
* true
* information
* default
* invalid
* valid

## Tokens Used

* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n200`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n500`
* `--color-neutral-n700`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r300`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--font-size-sm`
* `--font-weight-medium`
* `--space-025`
* `--space-050`
* `--space-075`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-ellipsis-vertical.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Untuk field form yang butuh validasi cepat sekaligus tombol aksi contextual di sisi kanan input.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-form-row
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Form/form.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Form for GPOS Lite Design System V2. Source: components/Form/form.html Root class: .ds-form-row States: error, true, information, default, invalid, valid Icons: icon-ellipsis-vertical.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
