# Page Layout

## Source of Truth

`components/Page layout/page-layout.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Kerangka halaman GPOS Lite untuk website, tablet, dan mobile: top navigation, sidebar (persisten atau drawer), konten utama, dan footer navigation. Landasan grid token tanpa overlay visual.

## Anatomy

* Root container (`.ds-page-layout`) — variant `--website`, `--tablet`, `--mobile`
* Top nav (`header.ds-topnav`) — **di atas** `__body`, full width (compose Top & Bottom Navigation)
* Body (`.ds-page-layout__body`) — flex row
* Aside (`.ds-page-layout__aside`, 280px, `--color-neutral-n0`) → compose `.ds-sidebar-nav-expand`
* Main (`.ds-page-layout__main`) → `__content` (grid 12 kolom) + `__footer` → `.ds-footer-nav`
* Drawer (`.ds-page-layout__drawer`), overlay (`.ds-page-layout__overlay`), scrim (`.ds-page-layout__scrim`) — tablet/mobile
* Nav regions (`.ds-page-layout__nav-main`, `__nav-sub`) — konteks mobile drawer

## Variants

* Default appearance only (see source for modifier classes).

## Sizes

* `lg`

## States

* Default · Hover · Pressed · Focus · Disabled (via CSS pseudo-classes and BEM modifiers)

## Tokens Used

* `--border-radius-full`
* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--border-radius-xl`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b50`
* `--color-blue-b75`
* `--color-border`
* `--color-border-light`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n200`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n500`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r300`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--font-primary`
* `--font-size-body2`
* `--font-size-body3`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/dot.svg`
* `assets/icons/icon-adjustments-horizontal.svg`
* `assets/icons/icon-bell.svg`
* `assets/icons/icon-chevron-down.svg`
* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-ellipsis-vertical.svg`
* `assets/icons/icon-magnifying-glass.svg`
* `assets/icons/icon-menu.svg`
* `assets/icons/icon-pencil.svg`
* `assets/icons/icon-sidebar-offline-dashboard-off.svg`
* `assets/icons/icon-sidebar-offline-news-off.svg`
* `assets/icons/icon-sidebar-offline-payable-off.svg`
* `assets/icons/icon-sidebar-offline-pos-off.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Follow native HTML semantics. Use aria-invalid, aria-expanded, aria-pressed, aria-hidden, role, and fieldset/legend patterns as implemented in source. Focus ring: 2px box-shadow with --color-blue-b200. Do not rely on color alone — pair with text labels or icons.

## Usage Rules

Use Page Layout when the interaction pattern matches the documented implementation in components/Page layout/page-layout.html. Compose with existing DS components; do not recreate styles.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-page-layout. Key related classes: .ds-page-layout, .ds-page-layout__body, .ds-page-layout__aside, .ds-page-layout__nav-sub, .ds-page-layout--website, .ds-page-layout--submenu-on.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Page layout/page-layout.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Page Layout for GPOS Lite Design System V2. Source: components/Page layout/page-layout.html Root class: .ds-page-layout Sizes: lg Icons: dot.svg, icon-adjustments-horizontal.svg, icon-bell.svg, icon-chevron-down.svg, icon-chevron-left.svg, icon-ellipsis-vertical.svg, icon-magnifying-glass.svg, icon-menu.svg, icon-pencil.svg, icon-sidebar-offline-dashboard-off.svg, icon-sidebar-offline-news-off.svg, icon-sidebar-offline-payable-off.svg, icon-sidebar-offline-pos-off.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
