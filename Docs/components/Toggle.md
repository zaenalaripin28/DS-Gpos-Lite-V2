# Toggle

## Purpose

Binary on/off switch built on a visually-hidden checkbox with a sliding thumb and on/off icons. Available in regular and large sizes.

## Source of Truth

* HTML Reference: components/Toggle/
* Runtime Component: src/GposLite/components/Toggle.tsx
* Styles: src/GposLite/styles/toggle.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-toggle`, rendered as `<label>`)
* Input (`.ds-toggle__input`, native checkbox, `role="switch"`, visually hidden)
* Track (`.ds-toggle__track`)
* On Icon (`.ds-toggle__icon.ds-toggle__icon--on`, `<img>` check, default `assets/icons/icon-check.svg`)
* Thumb (`.ds-toggle__thumb`)
* Off Icon (`.ds-toggle__icon.ds-toggle__icon--off`, `<img>` x, default `assets/icons/icon-x-mark.svg`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Standard switch (`.ds-toggle`), on/off driven by `checked` |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| regular | track 40×20px | base `.ds-toggle`, thumb 16px |
| large | track 52×28px | `.ds-toggle--large`, thumb 24px |

## States

* Default (off)
* Checked / On (`.ds-toggle__input:checked + .ds-toggle__track` / `.ds-toggle__track--on`)
* Hover Off (`:hover ... :not(:checked)` / `.ds-toggle__track--hover-off`)
* Hover On (`:hover ... :checked` / `.ds-toggle__track--hover-on`)
* Focus (`.ds-toggle__input:focus-visible + .ds-toggle__track` / `.ds-toggle__track--focus`)
* Disabled (`.ds-toggle__input:disabled + .ds-toggle__track` / `.ds-toggle--disabled` / `.ds-toggle__track--disabled`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n30
* --color-neutral-n400
* --color-neutral-n500
* --color-green-g200
* --color-green-g300
* --color-blue-b200

### Spacing

* --space-025
* --space-050

### Radius

* --border-radius-full

### Typography

* --font-primary

### Transition

* --transition-fast

## Accessibility

* Input is a native checkbox with `role="switch"`, `aria-checked`, and `aria-label` (default "Toggle").
* Input is visually hidden but focusable; focus ring shown on the track via `:focus-visible`.
* Disabled sets `disabled` on input and `cursor: not-allowed`; icons use empty `alt=""` and `aria-hidden`.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* On/Off Icons (from `assets/icons`, default `icon-check.svg` and `icon-x-mark.svg`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-toggle` + track/thumb/icon)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru
* Jangan membuat ukuran baru di luar regular/large
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (hidden checkbox + `.ds-toggle__track`)

## Example Structure

```
Toggle (.ds-toggle[--large])
├─ Input (.ds-toggle__input — checkbox, role=switch)
└─ Track (.ds-toggle__track)
   ├─ Icon On (.ds-toggle__icon--on)
   ├─ Thumb (.ds-toggle__thumb)
   └─ Icon Off (.ds-toggle__icon--off)
```
