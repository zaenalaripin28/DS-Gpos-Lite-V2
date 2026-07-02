# Button

## Purpose

Interactive trigger for actions, available in multiple appearances and an icon-only mode. Supports loading and selected (pressed) states.

## Source of Truth

* HTML Reference: components/Button/
* Runtime Component: src/GposLite/components/Button.tsx
* Styles: src/GposLite/styles/button.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-btn`)
* Leading Icon (optional, from `assets/icons`)
* Label (`children`)
* Trailing Icon (optional, from `assets/icons`)
* Spinner (`.ds-spinner`, shown when `loading`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Neutral surface button (`.ds-btn`) |
| primary | Brand bold button (`.ds-btn--primary`) |
| subtle | Transparent background, bold text (`.ds-btn--subtle`) |
| subtle-link | Transparent, subtle text link (`.ds-btn--subtle-link`) |
| danger | Destructive red button (`.ds-btn--danger`) |
| warning | Warning orange button (`.ds-btn--warning`) |
| link | Text link button (`.ds-btn--link`) |
| icon-only | Icon-only square button (`.ds-btn--icon-only`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | min-height 32px | base `.ds-btn` |
| compact | min-height 24px | `.ds-btn--compact` |
| none | min-height 20px | `.ds-btn--none`, reduced padding + radius-sm |

## States

* Default
* Hover (`:hover` / `.ds-btn--hover`)
* Focus (`:focus-visible` / `.ds-btn--focus`)
* Active / Press (`:active` / `.ds-btn--press`)
* Selected / Pressed (`[aria-pressed="true"]` / `.ds-btn--selected`)
* Disabled (`:disabled` / `.ds-btn--disabled`)
* Loading (`.ds-btn--loading`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n50
* --color-neutral-n60
* --color-neutral-n300
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-blue-b500
* --color-primary-500
* --color-red-r300
* --color-red-r400
* --color-red-r500
* --color-orange-o200
* --color-orange-o300

### Spacing

* --space-025
* --space-050
* --space-150

### Radius

* --border-radius-sm

### Typography

* --font-primary
* --font-size-sm
* --font-weight-medium
* --text-body-small-medium-lh

### Transition

* --transition-fast

## Accessibility

* Native `<button>` element; keyboard activation via Enter/Space.
* `aria-busy` set true while `loading`; `tabIndex` becomes -1 during loading.
* `aria-pressed` set true when `selected`.
* Focus shown via `:focus-visible` box-shadow ring (no outline removed without replacement).
* Disabled buttons set `disabled` and `pointer-events: none`.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* Icon (leading/trailing, from `assets/icons`)
* Spinner (`.ds-spinner`, built-in for loading)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class `.ds-btn` dan modifier appearance yang ada

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant atau size baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar 8 appearance yang ada
* Jangan membuat ukuran baru di luar default/compact/none
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.ds-btn` + modifier)

## Example Structure

```
Button (.ds-btn[--appearance])
├─ Leading Icon (optional)
├─ Label (children)
└─ Trailing Icon (optional)
```
