# Breadcrumbs

## Purpose

Navigation trail showing the path to the current page, with optional home icon, chevron icon, and truncated labels. The current item is marked non-interactive.

## Source of Truth

* HTML Reference: components/Breadcrumbs/
* Runtime Component: src/GposLite/components/Breadcrumbs.tsx
* Styles: src/GposLite/styles/breadcrumbs.css
* Tokens: styles/tokens.css

## Anatomy

* Nav container (`<nav aria-label>`, utility classes `flex items-center flex-wrap gap-0`)
* Item (`.ds-bc-item`)
* Separator (`.ds-bc-sep`, literal `/`)
* Item container (`.ds-bc-container`, `.ds-bc-container--truncated`)
* Icon (`.ds-bc-icon`, home/chevron from `assets/icons`)
* Label text (`.ds-bc-text`, `.ds-bc-text--truncated`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Standard label width |
| truncated | Fixed-width clamped label (`.ds-bc-container--truncated` + `.ds-bc-text--truncated`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | — | single size |

## States

* Default (`.ds-bc-item--default`)
* Hover (`.ds-bc-item--hover`, underline border)
* Press (`.ds-bc-item--press`)
* Focus (`.ds-bc-item--focus`)

## Token Usage

### Colors

* --color-blue-b300
* --color-blue-b400
* --color-neutral-n300

### Typography

* --font-primary

## Accessibility

* Root `<nav>` with `aria-label` (default `Breadcrumb`).
* Current item label gets `aria-current="page"`.
* Separator marked `aria-hidden="true"`.
* Interactive items (with `onClick`) receive `role="button"` and `tabIndex={0}`.
* Icon images use empty `alt` (decorative).

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* Icon (home/chevron, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-bc-item` + state modifier)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

* Gunakan token yang sudah ada
* Jangan membuat variant baru
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component

## Example Structure

```
Breadcrumbs (nav)
└─ Item (.ds-bc-item[--state]) × n
   ├─ Separator (.ds-bc-sep)
   └─ Container (.ds-bc-container)
      ├─ Icon (.ds-bc-icon, optional)
      ├─ Text (.ds-bc-text)
      └─ Icon (.ds-bc-icon, optional)
```
