# Select

## Purpose

Trigger control for a listbox-style selection, rendering the current value plus a chevron icon and toggling an optional menu node. Open state is controllable (`open`) or self-managed via `defaultOpen`.

## Source of Truth

* HTML Reference: components/Select/
* Runtime Component: src/GposLite/components/Select.tsx
* Styles: src/GposLite/styles/select.css
* Tokens: styles/tokens.css

## Anatomy

* Component root (`<div>` `.ds-select-component`)
* Trigger (`<button>` `.ds-select-trigger` + state/appearance modifiers)
* Value (`<span>` `.ds-select-trigger__value`, + `--empty`)
* Chevron icon (`<svg>` `.ds-select-trigger__icon`)
* Menu (caller-provided `menu` node, rendered only when open)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Bordered surface trigger (`.ds-select-trigger`) |
| subtle | Transparent background, lighter border (`.ds-select-trigger--subtle`) |
| none | Borderless minimal trigger (`.ds-select-trigger--none`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | min-height 40px | base `.ds-select-trigger` |
| none | min-height 24px | `.ds-select-trigger--none` (reverts to 40px on hover/focus/disabled etc.) |
| loading | min-height 44px | `.ds-select-trigger--loading` |

## States

* Default
* Hover (`:hover` / `.ds-select-trigger--hover`)
* Focus / Open (`.ds-select-trigger--focus`, set when open)
* Loading (`.ds-select-trigger--loading`, `aria-busy`)
* Empty (`.ds-select-trigger--empty`)
* Invalid (`.ds-select-trigger--invalid`)
* Disabled (`.ds-select-trigger--disabled`, `disabled` attr)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n100
* --color-neutral-n300
* --color-neutral-n500
* --color-neutral-n800
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-red-r100
* --color-red-r300
* --color-text-disabled

### Spacing

* --space-025
* --space-050
* --space-075
* --space-100

### Shadow

* --shadow-sm

### Typography

* --font-primary
* --text-body-small-regular-size
* --text-body-small-regular-weight
* --text-body-small-regular-lh

### Transition

* --transition-fast

## Accessibility

* Trigger is a native `<button type="button">`; keyboard activation via Enter/Space.
* `aria-haspopup="listbox"` and `aria-expanded` reflect open state.
* `aria-busy` set true when `loading`.
* `aria-label` forwarded from `ariaLabel`.
* `disabled` attribute set when disabled.
* Chevron `<svg>` is `aria-hidden="true"`.
* Focus/open shown via `.ds-select-trigger--focus` box-shadow ring.

## Responsive Behavior

No responsive-specific behavior found.

(The `select.css` media queries target documentation-page demo classes — `.ds-select-state-table`, `.ds-select-playground__controls` — not the `.ds-select-trigger` component anatomy.)

## Composition Rules

Component may be used together with:

* Menu node (caller-provided dropdown content, e.g. `.ds-select-dropdown` / option lists)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-select-component` + `.ds-select-trigger`)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar default/subtle/none

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar default/subtle/none
* Jangan membuat ukuran baru di luar 40px/24px/44px yang ada
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-select-trigger` + `__value` + `__icon`)

## Example Structure

```
Select (.ds-select-component)
├─ Trigger (button.ds-select-trigger[--appearance][--state])
│  ├─ Value (span.ds-select-trigger__value)
│  └─ Icon (svg.ds-select-trigger__icon)
└─ Menu (provided node)   ← only when open
```
