# TextField

## Purpose

Single-line text input with multiple border appearances, supporting compact density, invalid state, and a monospaced mode. Renders a native input wrapped in a label.

## Source of Truth

* HTML Reference: components/Text Field/
* Runtime Component: src/GposLite/components/TextField.tsx
* Styles: src/GposLite/styles/text-field.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-text-field`, rendered as `<label>`)
* Input (`.ds-text-field__input`, native `<input>`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Bordered input (`.ds-text-field`) |
| subtle | Transparent border until interaction (`.ds-text-field--subtle`) |
| none | Borderless with bottom underline (`.ds-text-field--none`) |

Modifiers: `.ds-text-field--compact`, `.ds-text-field--invalid`, `.ds-text-field--monospaced` (`.ds-text-field__input--monospaced`).

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | min-height 40px | base `.ds-text-field__input` |
| compact | min-height 32px | `.ds-text-field--compact`, `--font-size-xs` |

## States

* Default
* Hover (`:hover:not(:disabled)` / `.ds-text-field__input--hover`)
* Focus (`:focus` / `.ds-text-field__input--focus`)
* Invalid (`.ds-text-field--invalid` / `.ds-text-field__input--invalid`)
* Disabled (`:disabled` / `.ds-text-field__input--disabled`)
* Snapshot (`.ds-text-field__input--snapshot`, pointer-events none for previews)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n50
* --color-neutral-n100
* --color-neutral-n900
* --color-blue-b200
* --color-blue-b300
* --color-red-r100
* --color-red-r300

### Spacing

* --space-050
* --space-075
* --space-100

### Radius

* --border-radius-sm

### Typography

* --font-primary
* --text-body-small-regular-size
* --text-body-small-regular-weight
* --text-body-small-regular-lh
* --font-size-xs

### Transition

* --transition-fast

## Accessibility

* Container is a `<label>` wrapping the input for implicit labeling.
* Input is a native `<input>`; `aria-invalid` set when `invalid` is true.
* Disabled state sets `cursor: not-allowed` and dimmed colors/placeholder.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component is self-contained (label + input); no DS sub-components or icons are used in the runtime component.

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-text-field` + `.ds-text-field__input`)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar default/subtle/none
* Jangan membuat ukuran baru di luar default/compact
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`<label>` + `<input>`)

## Example Structure

```
TextField (.ds-text-field[--appearance])
└─ Input (.ds-text-field__input)
```
