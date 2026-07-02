# Radio

## Purpose

Single-choice form control rendered as a label wrapping a visually-hidden native radio input plus a styled circle/dot. `RadioGroup` wraps related radios in a `<fieldset>` with a legend.

## Source of Truth

* HTML Reference: components/Radio/
* Runtime Component: src/GposLite/components/Radio.tsx
* Styles: src/GposLite/styles/radio.css
* Tokens: styles/tokens.css

## Anatomy

* Root (`<label>` `.ds-radio`, + `--error` / `--disabled` modifiers)
* Input (`<input type="radio">` `.ds-radio__input`, visually hidden)
* Circle (`<span>` `.ds-radio__circle`, `aria-hidden`)
* Dot (`<span>` `.ds-radio__dot`)
* Label (`<span>` `.ds-radio__label`)
* Group root (`<fieldset>` `.ds-radio-group`)
* Group legend (`<legend>` `.ds-radio-group__legend`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Base radio (`.ds-radio`) |
| error | Invalid state (`.ds-radio--error`) |
| disabled | Non-interactive (`.ds-radio--disabled`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | 16px | Single size; circle is 16×16px, dot 6×6px |

## States

* Default
* Hover (`:hover:not(.ds-radio--disabled) .ds-radio__input:not(:checked) + .ds-radio__circle`)
* Checked (`.ds-radio__input:checked + .ds-radio__circle`)
* Focus (`:focus-visible + .ds-radio__circle`, box-shadow ring; both unchecked and checked)
* Active / Press (`:active:not(:disabled):not(:checked) + .ds-radio__circle`)
* Disabled (`.ds-radio__input:disabled + .ds-radio__circle`, incl. disabled+checked)
* Error (`.ds-radio--error .ds-radio__input:checked + .ds-radio__circle`)

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

* --space-050
* --space-100
* --space-150

### Typography

* --font-primary
* --text-body-small-medium-size
* --text-body-small-medium-weight
* --text-body-small-medium-lh
* --font-weight-semibold

### Transition

* --transition-fast

## Accessibility

* Native `<input type="radio">`; keyboard selection via arrow keys within a group, focus via Tab.
* `aria-invalid` set when `error` is true.
* `disabled` attribute set on the input when disabled.
* Circle and dot are presentational (`aria-hidden`); the visible `<label>` wraps the input for click/label association.
* `RadioGroup` uses semantic `<fieldset>` + `<legend>` for grouping.
* Focus shown via `:focus-visible` box-shadow ring.

## Responsive Behavior

No responsive-specific behavior found.

(The `radio.css` media queries target documentation-page layout classes — `.parts-grid`, `.usage-grid-2`, `.component-states-list`, sidebar/topbar — not the `.ds-radio` component anatomy.)

## Composition Rules

Component may be used together with:

* RadioGroup (`.ds-radio-group` fieldset/legend wrapping multiple `.ds-radio`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-radio` label + hidden input + circle + dot + label)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar default/error/disabled

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar default/error/disabled
* Jangan membuat ukuran baru di luar circle 16px
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-radio` + `.ds-radio__circle` + `.ds-radio__dot`)

## Example Structure

```
RadioGroup (fieldset.ds-radio-group)
├─ Legend (legend.ds-radio-group__legend)
└─ Radio (label.ds-radio)
   ├─ Input (input.ds-radio__input, hidden)
   ├─ Circle (span.ds-radio__circle)
   │  └─ Dot (span.ds-radio__dot)
   └─ Label (span.ds-radio__label)
```
