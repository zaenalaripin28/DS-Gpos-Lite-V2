# Dropdown Button

## Source of Truth

`components/dropdown/dropdown.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Trigger .ds-btn + panel .ds-dropdown-menu dengan item parts (default, checkbox, radio). State open memakai aria-expanded dan token Background.Selected.

## Anatomy

* Root (`.ds-dropdown`)
* Trigger (`button` + `.ds-dropdown-btn`, optional `--icon-only`)
* Menu (`.ds-dropdown-menu`, optional `--scrollable`)
* Item (`button.ds-dropdown-item`) — `__lead`, `__label`, `__trail`, `__checkbox`, `__radio`

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* open
* default
* hover
* pressed
* selected

## Tokens Used

* `--border-radius-full`
* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g400`
* `--color-neutral-n0`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n50`
* `--color-neutral-n60`
* `--color-neutral-n900`
* `--color-surface`
* `--color-text-code`
* `--color-text-disabled`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--font-size-sm`
* `--font-weight-medium`
* `--font-weight-semibold`
* `--shadow-md`
* `--space-025`
* `--space-050`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-check.svg`
* `assets/icons/icon-chevron-right.svg`
* `assets/icons/icon-ellipsis-vertical.svg`
* `assets/icons/icon-shopping-bag.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Dropdown Button when the interaction pattern matches the documented implementation in components/dropdown/dropdown.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-dropdown
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/dropdown/dropdown.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Dropdown Button for GPOS Lite Design System V2. Source: components/dropdown/dropdown.html Root class: .ds-dropdown States: open, default, hover, pressed, selected Icons: icon-check.svg, icon-chevron-right.svg, icon-ellipsis-vertical.svg, icon-shopping-bag.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
