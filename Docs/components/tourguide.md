# Tourguide

## Source of Truth

`components/Tourguide/tourguide.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Komponen guided tour interaktif dengan spotlight overlay, tooltip langkah, progress step, dan action button. Digunakan untuk onboarding pengguna baru ke fitur-fitur produk.

## Anatomy

* Root container (`.ds-tourguide`)
* Head (`.ds-tourguide__head`)
* Title (`.ds-tourguide__title`)
* Close (`.ds-tourguide__close`)
* Body (`.ds-tourguide__body`)
* Footer (`.ds-tourguide__footer`)
* Text (`.ds-tourguide__text`)
* Progress (`.ds-tourguide__progress`)
* Overlay (`.ds-tourguide__overlay`)
* Target (`.ds-tourguide__target`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default
* hover
* focus
* press

## Tokens Used

* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--border-radius-xl`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-border-light`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n50`
* `--color-neutral-n500`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-surface`
* `--color-text-inverse`
* `--color-text-primary`
* `--color-text-secondary`
* `--font-primary`
* `--font-size-sm`
* `--font-size-xl`
* `--font-weight-medium`
* `--font-weight-semibold`
* `--letter-spacing-wide`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-arrow-uturn-left.svg`
* `assets/icons/icon-x-mark.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Tourguide when the interaction pattern matches the documented implementation in components/Tourguide/tourguide.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-tourguide. Key related classes: .ds-tourguide, .ds-tourguide__body, .ds-tourguide__title, .ds-tourguide__text, .ds-tourguide__footer, .ds-tourguide__progress.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Tourguide/tourguide.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Tourguide for GPOS Lite Design System V2. Source: components/Tourguide/tourguide.html Root class: .ds-tourguide States: default, hover, focus, press Icons: icon-arrow-uturn-left.svg, icon-x-mark.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
