# TextArea

## Purpose

Multi-line text input for longer free-form content such as notes. Supports compact density and an invalid error state.

## Source of Truth

* HTML Reference: components/Text Area/
* Runtime Component: src/GposLite/components/TextArea.tsx
* Styles: src/GposLite/styles/text-area.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-text-area`, rendered as `<label>`)
* Field (`.ds-text-area__field`, native `<textarea>`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Base text area (`.ds-text-area`) |

Modifiers: `.ds-text-area--compact` (reduced height/padding), `.ds-text-area--invalid` (error border/focus).

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | min-height 96px | base `.ds-text-area__field`, vertical resize |
| compact | min-height 72px | `.ds-text-area--compact`, padding `--space-075` `--space-100` |

## States

* Default
* Hover (`:hover:not(:disabled)` / `.ds-text-area__field--hover`)
* Focus (`:focus` / `.ds-text-area__field--focus`)
* Invalid (`.ds-text-area--invalid .ds-text-area__field` / `.ds-text-area__field--invalid`)
* Disabled (`:disabled` / `.ds-text-area__field--disabled`)

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

* --space-075
* --space-100

### Radius

* --border-radius-sm

### Typography

* --font-primary
* --text-body-small-regular-size
* --text-body-small-regular-weight
* --text-body-small-regular-lh

### Transition

* --transition-fast

## Accessibility

* Container is a `<label>` wrapping the field, providing implicit association.
* Field is a native `<textarea>` (keyboard, focus handled natively).
* Disabled state sets `cursor: not-allowed` and dimmed colors.

## Responsive Behavior

`@media (max-width: 640px)` sets `.ds-text-area` `max-width: 100%`.

## Composition Rules

Component is self-contained (label + textarea); no DS sub-components or icons are used.

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-text-area` + `.ds-text-area__field`)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru
* Jangan membuat ukuran baru di luar default/compact
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`<label>` + `<textarea>`)

## Example Structure

```
TextArea (.ds-text-area)
└─ Field (.ds-text-area__field — textarea)
```
