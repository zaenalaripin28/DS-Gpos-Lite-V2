# TimePicker

## Purpose

Dropdown listbox of selectable time options, shown only when open. Each option is a button with a selected state.

## Source of Truth

* HTML Reference: components/Time picker/
* Runtime Component: src/GposLite/components/TimePicker.tsx
* Styles: src/GposLite/styles/time-picker.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-time-picker`, `role="listbox"`)
* Option (`.ds-time-picker__option`, native `<button>`, `role="option"`)
* Selected Option modifier (`.ds-time-picker__option--selected`)

Note: the runtime renders `.ds-time-picker__option`; the stylesheet styles option rows via `.time-parts-item` and selected via `.is-selected` (`.ds-time-picker__menu` / `.time-parts-list` are scroll-shell helpers).

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Single listbox appearance (`.ds-time-picker`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | option min-height 40px | container max-width 320px; single size |

## States

* Default (option)
* Hover (`.time-parts-item:hover`)
* Pressed (`.time-parts-item:active`)
* Focus (`.time-parts-item:focus-visible`)
* Selected (`.time-parts-item.is-selected` / runtime `aria-selected`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n50
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300

### Spacing

* --space-050
* --space-100
* --space-150
* --space-200

### Radius

* --border-radius-sm
* --border-radius-pill

### Shadow

* --shadow-md

### Typography

* --font-primary
* --text-body-small-regular-size
* --text-body-small-regular-weight
* --text-body-small-regular-lh
* --text-body-small-medium-weight

### Transition

* --transition-fast

## Accessibility

* Container has `role="listbox"` with `aria-label` (default "Time picker").
* Options are native `<button>` with `role="option"` and `aria-selected`.
* Returns `null` when not open; visibility controlled via `open` / `defaultOpen`.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component is self-contained (listbox + option buttons); no DS sub-components or icons are used.

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-time-picker` + option buttons)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru
* Jangan membuat ukuran baru
* Jangan membuat custom shadow (gunakan `--shadow-md`)
* Ikuti anatomy yang ada
* Ikuti struktur existing (listbox container + `role="option"` buttons)

## Example Structure

```
TimePicker (.ds-time-picker, role=listbox)
└─ Option (.ds-time-picker__option, role=option) × N
   └─ [.ds-time-picker__option--selected]
```
