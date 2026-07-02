# Dropdown

## Purpose

Button-triggered menu listing actionable items, including checkbox and radio item roles. Supports a label trigger, an icon-only trigger, and a scrollable menu.

## Source of Truth

* HTML Reference: components/dropdown/
* Runtime Component: src/GposLite/components/Dropdown.tsx
* Styles: src/GposLite/styles/dropdown.css
* Tokens: styles/tokens.css

## Anatomy

* Root (`.ds-dropdown`)
* Trigger (`.ds-btn.ds-dropdown-btn`; icon-only adds `.ds-btn--icon-only.ds-dropdown-btn--icon-only`)
  * Chevron (`.ds-dropdown-btn__chevron`, from `assets/icons`)
* Menu (`.ds-dropdown-menu`, `.ds-dropdown-menu--scrollable`, `role="menu"`)
* Item (`.ds-dropdown-item`, `.ds-dropdown-item--selected`)
  * Checkbox slot (`.ds-dropdown-item__checkbox`, for `menuitemcheckbox`)
  * Radio slot (`.ds-dropdown-item__radio`, for `menuitemradio`)
  * Label (`.ds-dropdown-item__label`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Label trigger + menu (`.ds-dropdown`) |
| icon-only | Icon-only trigger (`.ds-dropdown-btn--icon-only`) |
| scrollable | Scrollable menu (`.ds-dropdown-menu--scrollable`) |

Item roles: `menuitem`, `menuitemcheckbox`, `menuitemradio`.

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | trigger min-height 32px; item min-height 40px | single size |
| icon-only | 32px × 32px | `.ds-dropdown-btn--icon-only` |

## States

* Default (`.ds-dropdown-item`)
* Hover (`.ds-dropdown-item--hover`)
* Pressed (`.ds-dropdown-item--pressed`)
* Selected (`.ds-dropdown-item--selected`)
* Selected Hover (`.ds-dropdown-item--selected-hover`)
* Selected Pressed (`.ds-dropdown-item--selected-pressed`)
* Disabled (`.ds-dropdown-item--disabled`)
* Trigger Hover/Focus/Expanded (`.ds-btn:hover`, `.ds-btn:focus-visible`, `.ds-btn[aria-expanded="true"]`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n50
* --color-neutral-n60
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b75
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-border
* --color-text-primary
* --color-text-disabled

### Spacing

* --space-025
* --space-050
* --space-075
* --space-100
* --space-150
* --space-200

### Radius

* --border-radius-sm
* --border-radius-md
* --border-radius-full

### Shadow

* --shadow-md

### Typography

* --font-primary
* --font-size-sm
* --font-weight-medium
* --font-weight-semibold
* --text-body-small-regular-size / -weight / -lh
* --text-body-small-medium-lh

### Transition

* --transition-fast

## Accessibility

* Trigger (`Button`) sets `aria-haspopup="menu"` and `aria-expanded`; icon-only trigger sets `aria-label` from `triggerLabel`.
* Menu uses `role="menu"` with `aria-label`.
* Items use `role="menuitem"` by default, or `menuitemcheckbox` / `menuitemradio`; checkbox/radio items set `aria-checked`.
* Chevron and trigger icon images are decorative (`aria-hidden`, empty `alt`).
* Open/close is controllable (`open`) or uncontrolled (`defaultOpen`).
* `prefers-reduced-motion: reduce` disables transitions.

## Responsive Behavior

No responsive-specific behavior found for the `.ds-dropdown` component itself (media queries in the stylesheet target documentation-only layout helpers); `prefers-reduced-motion: reduce` removes transitions.

## Composition Rules

Component is built from:

* Button (`src/GposLite/components/Button.tsx`) — trigger
* Icon (chevron / ellipsis, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-dropdown` + menu/item modifiers)

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
Dropdown (.ds-dropdown)
├─ Trigger (.ds-btn.ds-dropdown-btn[--icon-only])
│  └─ Chevron (.ds-dropdown-btn__chevron)
└─ Menu (.ds-dropdown-menu[--scrollable]) [role=menu]
   └─ Item (.ds-dropdown-item[--selected]) × n
      ├─ Checkbox/Radio slot (optional)
      └─ Label (.ds-dropdown-item__label)
```
