# Checkbox

## Purpose

Labeled boolean control supporting checked, indeterminate, error, and disabled states. Uses a visually hidden native input with a custom box and check/minus icons.

## Source of Truth

* HTML Reference: components/Checkbox/
* Runtime Component: src/GposLite/components/Checkbox.tsx
* Styles: src/GposLite/styles/checkbox.css
* Tokens: styles/tokens.css

## Anatomy

* Label container (`.ds-checkbox`)
* Hidden input (`.ds-checkbox__input`, native `<input type="checkbox">`)
* Box (`.ds-checkbox__box`)
  * Check icon (`.ds-checkbox__icon--check`, from `assets/icons`)
  * Minus icon (`.ds-checkbox__icon--minus`, from `assets/icons`)
* Label text (`.ds-checkbox__label`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | base component (`.ds-checkbox`) |
| error | Invalid state (`.ds-checkbox--error`) |
| disabled | Non-interactive (`.ds-checkbox--disabled`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | box 16px × 16px | single size |

## States

* Default (`.ds-checkbox__box`)
* Hover (`.ds-checkbox:hover ... .ds-checkbox__box`)
* Checked (`.ds-checkbox__input:checked + .ds-checkbox__box`)
* Indeterminate (`.ds-checkbox__input:indeterminate + .ds-checkbox__box`)
* Focus (`.ds-checkbox__input:focus-visible + .ds-checkbox__box`)
* Active / Press (`.ds-checkbox__input:active ... + .ds-checkbox__box`)
* Disabled (`.ds-checkbox__input:disabled + .ds-checkbox__box` / `.ds-checkbox--disabled`)
* Error (`.ds-checkbox--error ...`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n40
* --color-neutral-n50
* --color-neutral-n900
* --color-blue-b200
* --color-blue-b300
* --color-red-r300

### Spacing

* --space-100

### Radius

* --border-radius-sm

### Typography

* --font-primary
* --text-body-small-medium-size / -weight / -lh

### Transition

* --transition-fast

## Accessibility

* Uses native `<input type="checkbox">` inside a `<label>`, so the label text is clickable.
* `indeterminate` is set imperatively on the input via ref.
* `aria-invalid` is set when `error` is true.
* Custom box and icons are marked `aria-hidden="true"`; state is conveyed by the native input.
* Disabled state sets the native `disabled` attribute.

## Responsive Behavior

No responsive-specific behavior found for the `.ds-checkbox` component itself (media queries in the stylesheet target documentation-only layout helpers).

## Composition Rules

Component may be used together with:

* Icon (check/minus, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-checkbox` + modifier)

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
Checkbox (label.ds-checkbox[--error|--disabled])
├─ Input (.ds-checkbox__input, hidden)
├─ Box (.ds-checkbox__box)
│  ├─ Check icon (.ds-checkbox__icon--check)
│  └─ Minus icon (.ds-checkbox__icon--minus)
└─ Label (.ds-checkbox__label)
```
