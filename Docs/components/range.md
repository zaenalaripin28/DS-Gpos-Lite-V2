# Range

## Source of Truth

`components/Range/range.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Slider nilai 0–100% dengan thumb 16×16px; track border/focus token; press tinggi 8px.

## Anatomy

* Root container (`.ds-range`)
* Thumb (`.ds-range__thumb`)
* Track (`.ds-range__track`)
* Input (`.ds-range__input`)
* Fill (`.ds-range__fill`)
* Thumb wrap (`.ds-range__thumb-wrap`)
* Value (`.ds-range__value`)
* Interactive (`.ds-range__interactive`)
* Meta (`.ds-range__meta`)
* Label (`.ds-range__label`)
* Controls (`.ds-range__controls`)
* Control (`.ds-range__control`)
* Stage (`.ds-range__stage`)

## Variants

* `value-0`
* `empty`
* `filled`
* `value-50`
* `value-100`
* `interactive`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default
* hover
* press
* disabled
* focus

## Tokens Used

* `--border-radius-2xl`
* `--border-radius-full`
* `--border-radius-lg`
* `--border-radius-md`
* `--border-width-2`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-border`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n300`
* `--color-neutral-n50`
* `--color-neutral-n500`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--font-weight-semibold`
* `--shadow-sm`
* `--space-050`
* `--space-100`
* `--space-200`
* `--space-250`
* `--text-body-small-regular-lh`
* `--text-body-small-regular-size`
* `--transition-fast`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* None component-specific (navigation shell uses icon-chevron-mini-down.svg)

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Range when the interaction pattern matches the documented implementation in components/Range/range.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-range. Key related classes: .ds-range, .ds-range__thumb, .ds-range__thumb--hover, .ds-range__thumb--pressed, .ds-range__track, .ds-range__track--focus.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Range/range.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Range for GPOS Lite Design System V2. Source: components/Range/range.html Root class: .ds-range Appearances/variants: value-0, empty, filled, value-50, value-100, interactive States: default, hover, press, disabled, focus Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
