# Button

## Source of Truth

`components/Button/button.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Triggers an action or event. Follows the Figma variant architecture with appearance, state, spacing, and boolean properties.

## Anatomy

* Root container (`.ds-btn`)

## Variants

* `default`
* `primary`
* `subtle`
* `link`
* `subtle-link`
* `danger`
* `warning`
* `icon-only`

## Sizes

* `compact`

## States

* default
* hover
* press
* focus
* disabled
* loading
* selected

## Tokens Used

* `--border-radius-2xl`
* `--border-radius-md`
* `--border-radius-sm`
* `--color-background`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-blue-b500`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n100`
* `--color-neutral-n20`
* `--color-neutral-n200`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n60`
* `--color-neutral-n900`
* `--color-orange-o200`
* `--color-orange-o300`
* `--color-primary-200`
* `--color-primary-300`
* `--color-primary-50`
* `--color-primary-500`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* None component-specific (navigation shell uses icon-chevron-mini-down.svg)

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Button when the interaction pattern matches the documented implementation in components/Button/button.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-btn. Key related classes: .ds-btn, .ds-btn--disabled, .ds-btn--hover, .ds-btn--press, .ds-btn--focus, .ds-btn--selected.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Button/button.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Button for GPOS Lite Design System V2. Source: components/Button/button.html Root class: .ds-btn Appearances/variants: default, primary, danger, subtle, link, subtle-link, warning, icon-only Sizes: compact States: hover, focus, press, disabled, open, loading, active Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
