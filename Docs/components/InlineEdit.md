# InlineEdit

## Purpose

Inline editable value that switches between a read-only display and an active edit field with confirm/cancel controls. Supports controlled and uncontrolled active/value state.

## Source of Truth

* HTML Reference: components/Inline edit/
* Runtime Component: src/GposLite/components/InlineEdit.tsx
* Styles: src/GposLite/styles/inline-edit.css
* Tokens: styles/tokens.css

## Anatomy

* Host (`div.ds-inline-edit-host`, `.ds-inline-edit-host--active` when editing)
* Read display (`span.ds-inline-edit.ds-inline-edit--default`, shown when inactive)
* Edit container (`div.ds-inline-edit`, shown when active)
* Input (`input.ds-inline-edit__input`, `.ds-inline-edit__input--typing`)
* Actions (`div.ds-inline-edit__actions`)
* Confirm button (`button.ds-inline-edit-btn.ds-inline-edit-btn--confirm` > `img`)
* Cancel button (`button.ds-inline-edit-btn.ds-inline-edit-btn--cancel` > `img`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Single inline-edit treatment (`.ds-inline-edit--default` read / `.ds-inline-edit` active) |

No appearance variants in source.

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | input min-height 40px | Single size; host/container `max-width: 250px`, buttons `32×32px` |

Single size — no size modifiers in source.

## States

* Read / inactive (host without `--active`, renders `.ds-inline-edit--default`)
* Active / editing (`.ds-inline-edit-host--active`)
* Input hover (`.ds-inline-edit__input:hover:not(:disabled)`)
* Input focus (`.ds-inline-edit__input:focus`)
* Input typing (`.ds-inline-edit__input--typing`)
* Input disabled (`:disabled`)
* Button hover (`:hover:not(:disabled)` / `.ds-inline-edit-btn--hover`)
* Button active / press (`:active:not(:disabled)` / `.ds-inline-edit-btn--press`)
* Button focus (`:focus-visible` / `.ds-inline-edit-btn--focus`, box-shadow ring)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n100
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300

### Spacing

* --space-050
* --space-075
* --space-100

### Radius

* --border-radius-sm

### Shadow

* --shadow-xs

### Typography

* --font-primary
* --text-body-small-regular-size
* --text-body-small-regular-weight
* --text-body-small-regular-lh

### Transition

* --transition-fast

## Accessibility

* Input has `aria-label="Nilai inline edit"`.
* Confirm button has `aria-label="Simpan perubahan"`; cancel button has `aria-label="Batalkan perubahan"`.
* Button icon images are decorative: `alt=""` with `aria-hidden="true"`.
* Buttons are native `<button type="button">`; focus shown via `:focus-visible` box-shadow ring.
* `disabled` prop disables the input.

## Responsive Behavior

No responsive-specific behavior found for the component itself. Media queries in the stylesheet target documentation/demo helpers (`.usage-info-grid`, `.parts-grid`, `.component-states-list__row`) only.

## Composition Rules

Component may be used together with:

* Confirm icon (`assets/icons/icon-check.svg`) and cancel icon (`assets/icons/icon-x-mark.svg`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-inline-edit-host` + `.ds-inline-edit` parts)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (read `span` vs active `input` + actions)

## Example Structure

```
InlineEdit (div.ds-inline-edit-host[--active])
├─ Read (span.ds-inline-edit--default)            [when inactive]
└─ Edit (div.ds-inline-edit)                       [when active]
   ├─ Input (input.ds-inline-edit__input)
   └─ Actions (div.ds-inline-edit__actions)
      ├─ Confirm (button.ds-inline-edit-btn--confirm)
      └─ Cancel (button.ds-inline-edit-btn--cancel)
```
