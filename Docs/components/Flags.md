# Flags

## Purpose

Inline contextual message banner with a title, optional description, dismiss and collapse controls. Available in five appearances for neutral, success, error, warning, and info messaging.

## Source of Truth

* HTML Reference: components/Flags/
* Runtime Component: src/GposLite/components/Flags.tsx
* Styles: src/GposLite/styles/flags.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`article.ds-flag`, `.ds-flag--{appearance}`, `.ds-flag--collapsed`)
* Header (`.ds-flag__header`)
* Icon (`.ds-flag__icon` > `img`, from `assets/icons`)
* Main (`.ds-flag__main`)
* Title Row (`.ds-flag__title-row`)
* Title (`h3.ds-flag__title`)
* Controls (`.ds-flag__controls`)
* Collapse toggle (optional, `button.ds-flag-part.ds-flag-part--icon`, chevron)
* Dismiss button (optional, `button.ds-flag-part.ds-flag-part--dismiss`)
* Body (`.ds-flag__body`, shown when not collapsed and description/actions exist)
* Description (`p.ds-flag__description`)
* Actions (`.ds-flag__actions`)

## Variants

| Variant | Description |
| ------- | ----------- |
| normal | Neutral surface, white background with border (`.ds-flag--normal`) |
| success | Green bold surface (`.ds-flag--success`) |
| error | Red bold surface (`.ds-flag--error`) |
| warning | Orange bold surface (`.ds-flag--warning`) |
| info | Neutral dark bold surface (`.ds-flag--info`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | content height | Single size only; `padding: var(--space-150)`, `max-width: 400px` |

Single size — no size modifiers in source.

## States

* Default
* Collapsed (`.ds-flag--collapsed` → `.ds-flag__body { display: none }`)
* Control hover (`.ds-flag-part--icon:hover` / `.ds-flag-part--dismiss:hover` / `.ds-flag-part--hover`)
* Control active / press (`:active` / `.ds-flag-part--press`)
* Control focus (`:focus-visible` / `.ds-flag-part--focus`, box-shadow ring)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n500
* --color-neutral-n700
* --color-neutral-n800
* --color-neutral-n900
* --color-text-inverse
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-green-g300
* --color-green-g400
* --color-green-g500
* --color-red-r300
* --color-red-r400
* --color-red-r500
* --color-orange-o200
* --color-orange-o300
* --color-orange-o500

### Spacing

* --space-025
* --space-050
* --space-100
* --space-150

### Radius

* --border-radius-sm
* --border-radius-lg

### Shadow

* --shadow-sm

### Typography

* --font-primary
* --font-size-sm
* --font-weight-medium
* --font-weight-semibold
* --font-weight-regular
* --text-body-small-medium-lh
* --text-body-small-regular-lh

### Transition

* --transition-fast

## Accessibility

* Root is `<article>` with `role="region"` and `aria-label` (defaults to `Flag {appearance}`).
* Title rendered as `<h3>`.
* Collapse toggle is a `<button>` with `aria-label="Perluas detail flag"` and `aria-expanded={!isCollapsed}`.
* Dismiss is a `<button>` with `aria-label="Tutup flag"`.
* Icon images are decorative: `alt=""` with `aria-hidden="true"` on icon wrapper/images.
* Control focus shown via `:focus-visible` box-shadow ring (outline removed with replacement).

## Responsive Behavior

No responsive-specific behavior found for the component itself. Media queries in the stylesheet target documentation/demo helpers (`.flag-parts-matrix`, `.usage-info-grid`) and a `prefers-reduced-motion` rule for the demo only.

## Composition Rules

Component may be used together with:

* Icon (status, dismiss, chevron — from `assets/icons`)
* Actions slot (`.ds-flag__actions`, may contain Button)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class `.ds-flag` dan modifier appearance yang ada

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant atau appearance baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar normal/success/error/warning/info
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.ds-flag` + `.ds-flag__*` parts)

## Example Structure

```
Flag (article.ds-flag[--appearance])
├─ Header (.ds-flag__header)
│  ├─ Icon (.ds-flag__icon)
│  └─ Main (.ds-flag__main)
│     └─ Title Row (.ds-flag__title-row)
│        ├─ Title (h3.ds-flag__title)
│        └─ Controls (.ds-flag__controls)
│           ├─ Collapse toggle (.ds-flag-part--icon) [optional]
│           └─ Dismiss (.ds-flag-part--dismiss) [optional]
└─ Body (.ds-flag__body) [when expanded]
   ├─ Description (.ds-flag__description)
   └─ Actions (.ds-flag__actions)
```
