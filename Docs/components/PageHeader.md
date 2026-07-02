# PageHeader

## Purpose

Page-level header with a title and optional breadcrumbs, actions, toolbar, and subfilters rows. Each optional region is toggled on via a boolean modifier.

## Source of Truth

* HTML Reference: components/Page Header/
* Runtime Component: src/GposLite/components/PageHeader.tsx
* Styles: src/GposLite/styles/page-header.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`header.ds-page-header`, `.ds-page-header--actions-on`, `--toolbar-on`, `--subfilters-on`)
* Primary row (`.ds-page-header__row`)
* Start (`.ds-page-header__start`) with breadcrumbs slot + title (`h1.ds-page-header__title`)
* Actions (optional, `.ds-page-header__actions`)
* Toolbar row (optional, `.ds-page-header__row.ds-page-header__row--toolbar` > `.ds-page-header__toolbar`)
* Subfilters (optional, `.ds-page-header__subfilters`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Title-only header (`.ds-page-header`) |
| actions-on | Reveals the actions region (`.ds-page-header--actions-on`) |
| toolbar-on | Reveals the toolbar row (`.ds-page-header--toolbar-on`) |
| subfilters-on | Reveals the subfilters region (`.ds-page-header--subfilters-on`) |

Toggles are additive (can be combined).

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | content height | Single size only; title uses header-small-medium type |

Single size — no size modifiers in source.

## States

* Default (optional regions hidden by default)
* actions visible (`.ds-page-header--actions-on .ds-page-header__actions { display: flex }`)
* toolbar visible (`.ds-page-header--toolbar-on .ds-page-header__row--toolbar { display: flex }`)
* subfilters visible (`.ds-page-header--subfilters-on .ds-page-header__subfilters { display: flex }`)

## Token Usage

### Colors

* --color-neutral-n900

### Spacing

* --space-100
* --space-200

### Typography

* --font-primary
* --text-header-small-medium-size
* --text-header-small-medium-weight
* --text-header-small-medium-lh

## Accessibility

* Root is a semantic `<header>` element.
* Title rendered as `<h1>` (`.ds-page-header__title`).
* Breadcrumbs, actions, toolbar, and subfilters are passed as slots (`ReactNode`); no extra ARIA applied by the component.

## Responsive Behavior

No responsive-specific behavior found. (Rows use `flex-wrap` but the stylesheet contains no media queries.)

## Composition Rules

Component may be used together with:

* Breadcrumbs (`breadcrumbs` slot)
* DS `Button` (in `.ds-page-header__actions`)
* Search / filter / table-action controls (in `.ds-page-header__toolbar`)
* Subfilter controls (in `.ds-page-header__subfilters`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class `.ds-page-header` dan toggle modifier yang ada

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant atau region baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar actions-on/toolbar-on/subfilters-on
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.ds-page-header` + `.ds-page-header__*` parts)

## Example Structure

```
PageHeader (header.ds-page-header[--actions-on][--toolbar-on][--subfilters-on])
├─ Row (.ds-page-header__row)
│  ├─ Start (.ds-page-header__start)
│  │  ├─ Breadcrumbs [optional]
│  │  └─ Title (h1.ds-page-header__title)
│  └─ Actions (.ds-page-header__actions) [optional]
├─ Toolbar row (.ds-page-header__row--toolbar) [optional]
│  └─ Toolbar (.ds-page-header__toolbar)
└─ Subfilters (.ds-page-header__subfilters) [optional]
```
