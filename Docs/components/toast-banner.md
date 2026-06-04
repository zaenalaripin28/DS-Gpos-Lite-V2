# Toast Banner

## Source of Truth

`components/Toast-Banner/banner.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Notifikasi lebar penuh yang tampil di area konten untuk menyampaikan pesan kontekstual. Tersedia dalam 4 varian appearance dengan makna semantik yang berbeda.

## Anatomy

* Root container (`.ds-banner`)
* Icon (`.ds-banner__icon`)
* Text (`.ds-banner__text`)

## Variants

* `warning`
* `success`
* `error`
* `announcement`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* Default · Hover · Pressed · Focus · Disabled (via CSS pseudo-classes and BEM modifiers)

## Tokens Used

* `--border-radius-md`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n400`
* `--color-neutral-n700`
* `--color-primary-200`
* `--color-primary-50`
* `--color-primary-500`
* `--color-primary-600`
* `--color-text-secondary`
* `--font-primary`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* None component-specific (navigation shell uses icon-chevron-mini-down.svg)

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Toast Banner when the interaction pattern matches the documented implementation in components/Toast-Banner/banner.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-banner. Key related classes: .ds-banner, .ds-banner__icon, .ds-banner__text, .ds-banner--warning, .ds-banner--success, .ds-banner--error.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Toast-Banner/banner.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Toast Banner for GPOS Lite Design System V2. Source: components/Toast-Banner/banner.html Root class: .ds-banner Appearances/variants: warning, success, error, announcement Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
