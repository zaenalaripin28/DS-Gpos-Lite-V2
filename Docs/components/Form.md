# Form

## Purpose

Form row layout that pairs a label with a field slot and an optional validation message. Supports default, valid, and invalid states.

## Source of Truth

* HTML Reference: components/Form/
* Runtime Component: src/GposLite/components/Form.tsx
* Styles: src/GposLite/styles/form.css
* Tokens: styles/tokens.css

## Anatomy

* Row container (`div.ds-form-row`, `.ds-form-row--{state}`)
* Label (`p.ds-form-row__label`)
* Field slot (`div.ds-form-row__field`, holds `children`)
* Message (optional, `p.ds-form-message`, `.ds-form-message--{messageType}`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Neutral row state (`.ds-form-row--default`) |
| valid | Valid field state (`.ds-form-row--valid`) |
| invalid | Invalid field state with red field treatment (`.ds-form-row--invalid`) |

Message type modifiers (from runtime): `error`, `information`, `true` (`.ds-form-message--{type}`).

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | content height | Single size only; row `max-width: 540px`, action button `40px` |

Single size — no size modifiers in source.

## States

* Default (`.ds-form-row--default`)
* Valid (`.ds-form-row--valid` → `.ds-select-trigger` neutral border, dark text)
* Invalid (`.ds-form-row--invalid` → `.ds-select-trigger` red border + 1px red ring)

## Token Usage

### Colors

* --color-text-secondary
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n200
* --color-neutral-n800
* --color-red-r300

### Spacing

* --space-050

### Radius

* --border-radius-sm

### Typography

* --font-primary
* --text-caption-medium-size
* --text-caption-medium-weight
* --text-caption-medium-lh

## Accessibility

* Validation message renders `role="alert"` when `messageType === 'error'`; otherwise no role.
* Label rendered as `<p>` element associated visually with the field slot.
* Field slot (`.ds-form-row__field`) holds the actual input/control passed as `children`.

## Responsive Behavior

At `max-width: 640px`, `.ds-form-row__field` collapses to a single column (`grid-template-columns: 1fr`) and `.ds-form-row` expands to `max-width: 100%`.

## Composition Rules

Component may be used together with:

* Field control passed as `children` (e.g. `.ds-select-trigger`)
* Action button (`.ds-form-row__action-btn`) with icon from `assets/icons`

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class `.ds-form-row` dan state modifier yang ada

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant atau state baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar default/valid/invalid
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.ds-form-row` + `.ds-form-row__*` parts)

## Example Structure

```
FormRow (div.ds-form-row[--state])
├─ Label (p.ds-form-row__label)
├─ Field (div.ds-form-row__field → children)
└─ Message (p.ds-form-message[--type]) [optional]
```
