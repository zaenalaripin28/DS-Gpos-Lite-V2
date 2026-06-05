# Tabs

## Source of Truth

`components/Tabs/tabs.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Navigasi horizontal antar panel konten. Satu tab aktif per baris; sisanya default. Dua layout: tanpa garis dasar atau dengan track penuh di bawah bar tab.

## Anatomy

* Tab list (`.ds-tablist`) — `role="tablist"`, optional `--track`
* Tab button (`.ds-tab`) — registry root; child dalam tablist
* Label (`.ds-tab__label`), indicator (`.ds-tab__indicator`), badge (`.ds-tab__badge`), required (`.ds-tab__required`)

## Variants

* `important`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* Default · Hover · Pressed · Focus · Disabled (via CSS pseudo-classes and BEM modifiers)

## Tokens Used

* `--border-radius-full`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n500`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-primary-500`
* `--color-primary-600`
* `--color-red-r300`
* `--color-secondary-400`
* `--color-surface`
* `--color-text-secondary`
* `--font-primary`
* `--font-size-xs`
* `--font-weight-normal`
* `--space-025`
* `--space-050`
* `--space-075`
* `--space-100`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* None component-specific (navigation shell uses icon-chevron-mini-down.svg)

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Gunakan saat konten dibagi 2–6 bagian setara (mis. Ringkasan, Detail, Riwayat). Jangan ganti navigasi utama aplikasi — itu peran menu/sidebar.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-tab. Key related classes: .ds-tab, .ds-tab__label, .ds-tab__indicator, .ds-tab--hover, .ds-tab--press, .ds-tab--focus.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Tabs/tabs.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Tabs for GPOS Lite Design System V2. Source: components/Tabs/tabs.html Root class: .ds-tab Appearances/variants: important Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
