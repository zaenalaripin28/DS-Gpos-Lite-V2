# Navigation Menu

## Source of Truth

`components/Navigation menu/navigation.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Menu navigasi vertikal sidebar — parts atomik + komposisi Navigation Menu (Main Menu + Submenu Content).

## Anatomy

* Root container (`.ds-sidebar-nav-expand`) — surface putih `--color-neutral-n0`, **bukan** token `--sidebar-*`
* Scroll (`.ds-sidebar-nav-expand__scroll`)
* Header (`.ds-sidebar-nav-expand__header`) — title `MENU GPOS` + collapse button
* Title (`.ds-sidebar-nav-expand__title`)
* Collapse (`.ds-sidebar-nav-expand__collapse`)
* Search wrap (`.ds-nav-menu-search-wrap`) → `.ds-nav-menu-search` + `__input` + `__trail`
* Heading (`.ds-nav-heading-snap`, `.ds-nav-heading-snap--no-icons`) — mis. "Terakhir Dibuka"
* Recent list (`.ds-sidebar-nav-expand__recent`)
* Divider (`.ds-nav-divider`)
* Menu list (`.ds-sidebar-nav-expand__menu`) → item (`.ds-sidebar-nav-expand__item`)
* Main menu snap (`.ds-nav-mainmenu-snap`) — `__lead` (icon 24px), `__body`, `__title`, `__trail`
* Submenu (`.ds-nav-composed__submenu`) → `.ds-nav-submenu-snap` + `__dot` + `__label`

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default
* hover
* press
* selected
* focus
* typing
* rest

## Tokens Used

* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--border-width-1`
* `--border-width-2`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g100`
* `--color-green-g300`
* `--color-green-g400`
* `--color-green-g50`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n200`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n60`
* `--color-neutral-n900`
* `--color-primary-200`
* `--color-primary-50`
* `--color-primary-500`
* `--color-primary-600`
* `--color-red-r100`
* `--color-red-r300`
* `--color-red-r50`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/</code`
* `assets/icons/dot.svg`
* `assets/icons/dot.svg</code`
* `assets/icons/icon-chevron-down.svg`
* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-chevron-right.svg`
* `assets/icons/icon-chevron-up.svg`
* `assets/icons/icon-magnifying-glass.svg`
* `assets/icons/icon-sidebar-offline-app-off.svg`
* `assets/icons/icon-sidebar-offline-belanja-off.svg`
* `assets/icons/icon-sidebar-offline-company-off.svg`
* `assets/icons/icon-sidebar-offline-customer-off.svg`
* `assets/icons/icon-sidebar-offline-dashboard-off.svg`
* `assets/icons/icon-sidebar-offline-dashboard-on.svg`
* `assets/icons/icon-sidebar-offline-finance-off.svg`
* `assets/icons/icon-sidebar-offline-inventory-off.svg`
* `assets/icons/icon-sidebar-offline-invoice-off.svg`
* `assets/icons/icon-sidebar-offline-kas-bank-off.svg`
* `assets/icons/icon-sidebar-offline-ledger-off.svg`
* `assets/icons/icon-sidebar-offline-master-off.svg`
* `assets/icons/icon-sidebar-offline-medikal-off.svg`
* `assets/icons/icon-sidebar-offline-medikal-on.svg`
* `assets/icons/icon-sidebar-offline-megaphone-off.svg`
* `assets/icons/icon-sidebar-offline-news-off.svg`
* `assets/icons/icon-sidebar-offline-payable-off.svg`
* `assets/icons/icon-sidebar-offline-pos-off.svg`
* `assets/icons/icon-sidebar-offline-pos-on.svg`
* `assets/icons/icon-sidebar-offline-principal-off.svg`
* `assets/icons/icon-sidebar-offline-product-off.svg`
* `assets/icons/icon-sidebar-offline-product-on.svg`
* `assets/icons/icon-sidebar-offline-report-off.svg`
* `assets/icons/icon-sidebar-offline-setting-off.svg`
* `assets/icons/icon-sidebar-offline-smart-forecasrting-off.svg`
* `assets/icons/icon-x-circle-outline.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Navigation Menu when the interaction pattern matches the documented implementation in components/Navigation menu/navigation.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-sidebar-nav-expand
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Navigation menu/navigation.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Navigation Menu for GPOS Lite Design System V2. Source: components/Navigation menu/navigation.html Root class: .ds-sidebar-nav-expand States: default, hover, press, selected, focus, typing, rest Icons: </code, dot.svg, dot.svg</code, icon-chevron-down.svg, icon-chevron-left.svg, icon-chevron-right.svg, icon-chevron-up.svg, icon-magnifying-glass.svg, icon-sidebar-offline-app-off.svg, icon-sidebar-offline-belanja-off.svg, icon-sidebar-offline-company-off.svg, icon-sidebar-offline-customer-off.svg, icon-sidebar-offline-dashboard-off.svg, icon-sidebar-offline-dashboard-on.svg, icon-sidebar-offline-finance-off.svg, icon-sidebar-offline-inventory-off.svg, icon-sidebar-offline-invoice-off.svg, icon-sidebar-offline-kas-bank-off.svg, icon-sidebar-offline-ledger-off.svg, icon-sidebar-offline-master-off.svg, icon-sidebar-offline-medikal-off.svg, icon-sidebar-offline-medikal-on.svg, icon-sidebar-offline-megaphone-off.svg, icon-sidebar-offline-news-off.svg, icon-sidebar-offline-payable-off.svg, icon-sidebar-offline-pos-off.svg, icon-sidebar-offline-pos-on.svg, icon-sidebar-offline-principal-off.svg, icon-sidebar-offline-product-off.svg, icon-sidebar-offline-product-on.svg, icon-sidebar-offline-report-off.svg, icon-sidebar-offline-setting-off.svg, icon-sidebar-offline-smart-forecasrting-off.svg, icon-x-circle-outline.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
