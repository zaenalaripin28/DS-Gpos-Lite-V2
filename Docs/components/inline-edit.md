# Inline Edit

## Source of Truth

`components/Inline edit/inline-edit.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Komponen pengeditan langsung pada teks atau nilai — aktif saat diklik, lengkap dengan tombol konfirmasi dan batalkan dengan transisi state yang smooth.

## Anatomy

* Root container (`.ds-inline-edit`)
* Input (ds-inline-edit__input)
* Actions (ds-inline-edit__actions)
* Button (ds-inline-edit-btn)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default
* editing
* hover
* press
* focus

## Tokens Used

* `--border-radius-md`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n100`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n500`
* `--color-neutral-n700`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-primary-200`
* `--color-primary-300`
* `--color-primary-50`
* `--color-primary-500`
* `--color-primary-600`
* `--color-surface`
* `--color-text-disabled`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-check.svg`
* `assets/icons/icon-cross.svg`
* `assets/icons/icon-x-mark.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Edit cepat nilai inline pada tabel, metadata, atau inline message — tanpa membuka modal/form penuh.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-inline-edit
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Inline edit/inline-edit.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Inline Edit for GPOS Lite Design System V2. Source: components/Inline edit/inline-edit.html Root class: .ds-inline-edit States: default, editing, hover, press, focus Icons: icon-check.svg, icon-cross.svg, icon-x-mark.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
