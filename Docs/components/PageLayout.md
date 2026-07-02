# PageLayout

## Purpose

App shell that arranges a top nav, a sidebar (aside or drawer), an optional overlay, the main content grid, and an optional footer nav. Adapts between website, tablet, and mobile arrangements via a variant modifier.

## Source of Truth

* HTML Reference: components/Page layout/
* Runtime Component: src/GposLite/components/PageLayout.tsx
* Styles: src/GposLite/styles/page-layout.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`div.ds-page-layout`, `.ds-page-layout--{variant}`, `--menu-expand`, `--submenu-on`)
* Top nav slot (`topnav`)
* Body (`div.ds-page-layout__body`)
* Aside (optional, `aside.ds-page-layout__aside`)
* Drawer (optional, `div.ds-page-layout__drawer`)
* Overlay (optional, `div.ds-page-layout__overlay`)
* Content (`main.ds-page-layout__content`, holds `children`)
* Footer nav (optional, `footer.ds-footer-nav`)

## Variants

| Variant | Description |
| ------- | ----------- |
| website | Persistent sidebar aside, no overlay (`.ds-page-layout--website`, default) |
| tablet | Sidebar hidden; drawer + overlay scrim on expand (`.ds-page-layout--tablet`) |
| mobile | Sidebar hidden; drawer + overlay scrim on expand (`.ds-page-layout--mobile`) |

Toggle modifiers: `menu-expand` (`.ds-page-layout--menu-expand`) shows drawer/overlay on tablet/mobile; `submenu-on` (`.ds-page-layout--submenu-on`) swaps main nav for submenu.

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | min-height 520px | Single base size; `aside` width 280px, `drawer` width `min(280px, 88%)` |

Single base size — layout differences are driven by the `variant` prop, not size modifiers.

## States

* Variant: website / tablet / mobile
* Menu expanded (`.ds-page-layout--menu-expand` → drawer + overlay visible on tablet/mobile)
* Submenu on (`.ds-page-layout--submenu-on` → nav main hidden, nav sub shown)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n900
* --color-border

### Spacing

* --space-050
* --space-100
* --space-150

### Radius

* --border-radius-lg

### Typography

* --font-primary

> The content grid also consumes layout CSS variables `--grid-columns-lg`, `--grid-columns-md`, `--grid-columns-sm`, `--grid-gutter`, and `--grid-margin`, which are expected to be provided by the grid foundation (not defined in `styles/tokens.css`).

## Accessibility

* Sidebar rendered as semantic `<aside>` (`.ds-page-layout__aside`).
* Main content rendered as `<main>` (`.ds-page-layout__content`).
* Footer rendered as `<footer role="contentinfo">` (`.ds-footer-nav`).
* Overlay/scrim is a non-interactive surface (no ARIA applied by the component).

## Responsive Behavior

Responsive arrangement is controlled by the `variant` prop (`website` / `tablet` / `mobile`) through modifier classes rather than media queries. Media queries in the stylesheet (`640px`, `768px`) target documentation/demo helpers (`.pl-variant-card`, `.guideline-grid`, `.ds-hero-banner`).

## Composition Rules

Component may be used together with:

* Top nav content (`topnav` slot)
* `NavigationMenu` (`.ds-sidebar-nav-expand`) inside `aside` or `drawer`
* `PageHeader` and page content inside `.ds-page-layout__content`
* Footer nav content (`footerNav` slot)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class `.ds-page-layout` dan slot/part yang ada

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar website/tablet/mobile

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar website/tablet/mobile
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.ds-page-layout` + `__body`/`__aside`/`__drawer`/`__overlay`/`__content`)

## Example Structure

```
PageLayout (div.ds-page-layout.ds-page-layout--{variant}[--menu-expand][--submenu-on])
├─ Top nav (topnav slot)
├─ Body (div.ds-page-layout__body)
│  ├─ Aside (aside.ds-page-layout__aside)        [optional]
│  ├─ Drawer (div.ds-page-layout__drawer)        [optional]
│  ├─ Overlay (div.ds-page-layout__overlay)      [optional]
│  └─ Content (main.ds-page-layout__content → children)
└─ Footer (footer.ds-footer-nav)                 [optional]
```
