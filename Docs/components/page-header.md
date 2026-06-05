# Page Header

## Source of Truth

`components/Page Header/page-header.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Header halaman dengan breadcrumb, judul, aksi primer, pencarian, filter, dan kontrol tabel. Menggabungkan Button, Breadcrumbs, Select, dan Dropdown dari DS yang ada.

## Anatomy

* Root (`header.ds-page-header`) — `--actions-on`, `--toolbar-on`, `--subfilters-on`
* Row (`.ds-page-header__row`, `__row--toolbar`)
* Start (`.ds-page-header__start`) → title (`h1.ds-page-header__title`)
* Actions (`.ds-page-header__actions`), search (`.ds-page-header__search`), filter (`.ds-page-header__filter`)
* Subfilters (`.ds-page-header__subfilters`), toolbar (`.ds-page-header__toolbar`)

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default

## Tokens Used

* `--border-radius-md`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-neutral-n0`
* `--color-primary-300`
* `--color-primary-500`
* `--color-text-primary`
* `--color-text-secondary`
* `--font-primary`
* `--shadow-md`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-adjustments-horizontal.svg`
* `assets/icons/icon-ellipsis-vertical.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Page Header when the interaction pattern matches the documented implementation in components/Page Header/page-header.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-page-header
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Page Header/page-header.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Page Header for GPOS Lite Design System V2. Source: components/Page Header/page-header.html Root class: .ds-page-header States: default Icons: icon-adjustments-horizontal.svg, icon-ellipsis-vertical.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
