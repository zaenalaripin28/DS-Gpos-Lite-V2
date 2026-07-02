# Tooltip

## Purpose

Small contextual label bubble paired with an information trigger icon, positionable above or below and aligned center/left/right. Supports default, truncate, and overflow content modes.

## Source of Truth

* HTML Reference: components/Tooltip/
* Runtime Component: src/GposLite/components/Tooltip.tsx
* Styles: src/GposLite/styles/tooltip.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-tooltip`, rendered as `<div>`)
* Bubble / Part (`.ds-tooltip-part`, `role="tooltip"`)
* Trigger (`.ds-tooltip__trigger`, `aria-hidden`)
* Trigger Icon (`<img>`, default `assets/icons/icon-solid-information-circle.svg`)

## Variants

| Variant | Description |
| ------- | ----------- |
| placement: top | Bubble above trigger (`.ds-tooltip--top`) |
| placement: bottom | Bubble below trigger (`.ds-tooltip--bottom`) |
| position: center | Centered alignment (`.ds-tooltip--position-center`) |
| position: left | Start alignment (`.ds-tooltip--position-left`) |
| position: right | End alignment (`.ds-tooltip--position-right`) |
| content: default | Fixed max-width bubble (`.ds-tooltip-part`) |
| content: truncate | Single-line ellipsis (`.ds-tooltip-part--truncate`) |
| content: overflow | Wrapping bubble (`.ds-tooltip-part--overflow`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | auto | single size; bubble max-width via space tokens, trigger `--space-300` |

## States

* Default only — the runtime component is static (no interactive state rules on `.ds-tooltip` / `.ds-tooltip-part`).

## Token Usage

### Colors

* --color-neutral-n500
* --color-text-inverse

### Spacing

* --space-050
* --space-075
* --space-100
* --space-300
* --space-400
* --space-500
* --space-600
* --space-800

### Typography

* --font-primary
* --text-caption-regular-size
* --text-caption-regular-weight
* --text-caption-regular-lh

## Accessibility

* Bubble has `role="tooltip"`.
* Trigger wrapper is `aria-hidden="true"`; trigger `<img>` uses empty `alt=""`.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* Trigger Icon (from `assets/icons`, default `icon-solid-information-circle.svg`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-tooltip` + `.ds-tooltip-part` + `.ds-tooltip__trigger`)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar placement/position/content yang ada
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (bubble `role="tooltip"` + trigger)

## Example Structure

```
Tooltip (.ds-tooltip.ds-tooltip--[placement].ds-tooltip--position-[pos])
├─ Bubble (.ds-tooltip-part, role=tooltip)
└─ Trigger (.ds-tooltip__trigger, aria-hidden)
   └─ Icon (img)
```
