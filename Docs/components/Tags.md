# Tags

## Purpose

Compact inline label for categorization or status, available in multiple color appearances and an optional removable mode. Supports snapshot states for documentation previews.

## Source of Truth

* HTML Reference: components/Tags/
* Runtime Component: src/GposLite/components/Tags.tsx
* Styles: src/GposLite/styles/tags.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-tag`, rendered as `<span>`)
* Label (`.ds-tag__label`)
* Remove Button (`.ds-tag__remove`, optional when `removable`, native `<button>`)
* Remove Icon (`<img>` inside `.ds-tag__remove`, default `assets/icons/icon-x-mark.svg`)
* Leading Icon slot (`.ds-tag__icon`, styled in css, not emitted by runtime)

## Variants

| Variant | Description |
| ------- | ----------- |
| standard | Neutral grey tag (`.ds-tag--standard`) |
| bluelight | Blue subtle tag (`.ds-tag--bluelight`) |
| greenlight | Green subtle tag (`.ds-tag--greenlight`) |
| greylight | Grey subtle tag (`.ds-tag--greylight`) |
| yellowlight | Orange/yellow subtle tag (`.ds-tag--yellowlight`) |
| purplelight | Purple subtle tag (`.ds-tag--purplelight`) |
| redlight | Red subtle tag (`.ds-tag--redlight`) |

Modifier: `.ds-tag--removable` (adds remove button + danger-tinted interaction).

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | single size | padding `--space-050` `--space-100`; no size modifiers |

## States

* Default
* Hover (`:hover` / `.ds-tag--state-hover`)
* Pressed (`:active` / `.ds-tag--state-pressed`)
* Focus (`:focus-visible` / `.ds-tag--state-focus`)
* Remove button focus (`.ds-tag__remove:focus-visible` / `.ds-tag__remove--state-focus`)

Removable variants shift to danger tokens on hover/pressed; non-removable variants keep their own color family.

## Token Usage

### Colors

* --color-neutral-n20
* --color-neutral-n40
* --color-neutral-n60
* --color-neutral-n70
* --color-neutral-n300
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b75
* --color-blue-b200
* --color-blue-b300
* --color-red-r50
* --color-red-r75
* --color-red-r100
* --color-red-r300
* --color-red-r500
* --color-green-g50
* --color-green-g75
* --color-green-g100
* --color-green-g300
* --color-green-g500
* --color-orange-o50
* --color-orange-o75
* --color-orange-o100
* --color-orange-o300
* --color-orange-o500
* --color-purple-p50
* --color-purple-p75
* --color-purple-p100
* --color-purple-p300
* --color-purple-p500

### Spacing

* --space-025
* --space-050
* --space-100

### Radius

* --border-radius-full

### Typography

* --font-primary
* --text-body-small-medium-size
* --text-body-small-medium-weight
* --text-body-small-medium-lh

### Transition

* --transition-fast

## Accessibility

* Container is a `<span>`; remove control is a native `<button type="button">`.
* Remove button has `aria-label` "Hapus tag {label}".
* Remove icon `<img>` uses empty `alt=""` and `aria-hidden="true"`.
* `tabIndex` defaults to 0 when `snapshotState="focus"`, otherwise passthrough.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* Remove Icon (from `assets/icons`, default `icon-x-mark.svg`)
* Leading Icon slot `.ds-tag__icon` (from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-tag` + appearance modifier)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar 7 appearance yang ada
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-tag` + `.ds-tag__label` + optional `.ds-tag__remove`)

## Example Structure

```
Tag (.ds-tag.ds-tag--[appearance])
├─ Label (.ds-tag__label)
└─ Remove Button (.ds-tag__remove, optional)
   └─ Icon (img)
```
