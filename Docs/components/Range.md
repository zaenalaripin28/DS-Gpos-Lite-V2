# Range

## Purpose

Slider control built around a visually-hidden native range input with a styled track, fill, and thumb. Renders in interactive mode (`.ds-range--interactive`) with an optional label.

## Source of Truth

* HTML Reference: components/Range/
* Runtime Component: src/GposLite/components/Range.tsx
* Styles: src/GposLite/styles/range.css
* Tokens: styles/tokens.css

## Anatomy

* Root (`.ds-range .ds-range--interactive`)
* Label (`<span>` `.ds-range__label`, optional)
* Track (`.ds-range__track`)
* Fill (`.ds-range__fill`, `background-image` from `fillImageSrc`, default `assets/images/range=default.svg`)
* Thumb (`.ds-range__thumb`)
* Input (`<input type="range">` `.ds-range__input`, visually hidden / overlaid)

## Variants

| Variant | Description |
| ------- | ----------- |
| interactive | Default rendered mode (`.ds-range--interactive`); input overlaid full-width over track |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | track `--space-050` (4px) | Single size; track grows to `--space-100` (8px) when pressed; thumb 16px → 24px when active/focus |

## States

* Default
* Hover (`:hover:not(:has(:disabled)) ... .ds-range__thumb`)
* Focus (`.ds-range__input:focus-visible + .ds-range__track`)
* Active / Press (`.ds-range__input:active + .ds-range__track`)
* Disabled (`.ds-range--disabled` / `:has(.ds-range__input:disabled)`)
* Value position modifiers (`.ds-range--value-0` / `--value-50` / `--value-100`)

## Token Usage

### Colors

* --color-neutral-n20
* --color-neutral-n50
* --color-neutral-n300
* --color-neutral-n500
* --color-blue-b200
* --color-blue-b300
* --color-border

### Spacing

* --space-050
* --space-100

### Radius

* --border-radius-full

### Border

* --border-width-2

### Typography

* --font-primary

### Transition

* --transition-fast

## Accessibility

* Native `<input type="range">`; keyboard adjustment via arrow keys, Home/End.
* `aria-label` derived from `label` prop (falls back to `Range`).
* `min`/`max` default to 0/100 and forward to the input.
* Track/fill/thumb are presentational; the real input remains focusable and overlaid (`z-index: 2`).
* Focus shown via `:focus-visible` track/thumb styling (box-shadow/border ring).

## Responsive Behavior

No responsive-specific behavior found.

(The `range.css` media queries target documentation-page layout classes — `.parts-grid` etc. — not the `.ds-range` component anatomy.)

## Composition Rules

Component may be used together with:

* Fill image asset (from `assets/images`, e.g. `range=default.svg`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon/asset dari assets/
* Gunakan struktur existing (`.ds-range` + track + fill + thumb + hidden input)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar interactive

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar `.ds-range--interactive`
* Jangan membuat ukuran baru di luar track 4px/8px dan thumb 16px/24px
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-range__track` + `__fill` + `__thumb` + `__input`)

## Example Structure

```
Range (.ds-range.ds-range--interactive)
├─ Label (span.ds-range__label)   ← optional
└─ Track (.ds-range__track)
   ├─ Fill (.ds-range__fill)
   ├─ Thumb (.ds-range__thumb)
   └─ Input (input.ds-range__input, hidden/overlaid)
```
