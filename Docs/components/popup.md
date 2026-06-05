# Popup

## Source of Truth

`components/Popup/popup.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Overlay kontekstual yang muncul di sekitar elemen trigger. Mendukung 6 posisi (top/bottom × left/center/right) untuk menyesuaikan ruang layar.

## Anatomy

* Root container (`.popup-anchor-wrap`) — posisi: `--left`, `--center`, `--right`
* Panel (`.popup-part-panel`)
* Trigger (`button` + optional `.popup-anchor-btn` pada tombol)
* Playground/doc wrapper memakai class `popup-anchor-btn__*` untuk UI dokumentasi — **bukan** root komponen

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* hover

## Tokens Used

* `--border-radius-full`
* `--border-radius-lg`
* `--border-radius-md`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-border-light`
* `--color-green-g200`
* `--color-green-g300`
* `--color-green-g400`
* `--color-green-g50`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n60`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-primary-500`
* `--color-red-r300`
* `--color-red-r400`
* `--color-red-r50`
* `--color-red-r75`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
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

Use Popup when the interaction pattern matches the documented implementation in components/Popup/popup.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .popup-anchor-wrap. Key related classes: .popup-part-panel, .popup-anchor-wrap--left, .popup-anchor-wrap--center, .popup-anchor-wrap--right.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Popup/popup.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Popup for GPOS Lite Design System V2. Source: components/Popup/popup.html Root class: .popup-anchor-wrap States: hover Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
