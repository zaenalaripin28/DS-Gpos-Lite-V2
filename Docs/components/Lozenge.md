# Lozenge

## Purpose

Small uppercase status label used to tag state or category. Each appearance has a subtle (default) and a bold treatment.

## Source of Truth

* HTML Reference: components/Lozenge/
* Runtime Component: src/GposLite/components/Lozenge.tsx
* Styles: src/GposLite/styles/lozenge.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`span.ds-lozenge`, `.ds-lozenge--{appearance}`)
* Label (`children`, string)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Neutral subtle (`.ds-lozenge--default`); bold via `.ds-lozenge--bold` |
| bold | Bold modifier combined with another appearance (`.ds-lozenge--bold`) |
| new | Purple (`.ds-lozenge--new`) |
| removed | Red (`.ds-lozenge--removed`) |
| success | Green (`.ds-lozenge--success`) |
| inprogress | Blue (`.ds-lozenge--inprogress`) |
| moved | Orange (`.ds-lozenge--moved`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | content height | Single size only; `padding: var(--space-025) var(--space-100)` |

Single size — no size modifiers in source.

## States

* Default (subtle appearance)
* Bold (`.ds-lozenge--bold` combined with appearance)

No interactive (hover/focus/active) states in source.

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n500
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b300
* --color-orange-o50
* --color-orange-o300
* --color-purple-p50
* --color-purple-p300
* --color-red-r50
* --color-red-r300
* --color-green-g50
* --color-green-g300

### Spacing

* --space-025
* --space-100

### Radius

* --border-radius-sm

### Typography

* --font-primary
* --text-overline-medium-size
* --font-weight-semibold
* --text-overline-medium-lh
* --text-overline-medium-ls
* --text-overline-medium-transform

## Accessibility

* Renders a non-interactive `<span>`; no ARIA roles or keyboard handling in source.
* Inherits any `HTMLSpanElement` attributes passed via props (`...rest`).

## Responsive Behavior

No responsive-specific behavior found for the component itself. Media queries in the stylesheet target documentation/demo helpers (`.variant-matrix`, `.usage-info-grid`, doc page layout) only.

## Composition Rules

Component is standalone (text-only label). No DS sub-components or icons used in source.

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan class `.ds-lozenge` dan modifier appearance yang ada
* Gunakan struktur existing (`span` + text)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant atau appearance baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar default/bold/new/removed/success/inprogress/moved
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.ds-lozenge` + modifier)

## Example Structure

```
Lozenge (span.ds-lozenge[--appearance][--bold])
└─ Label (children)
```
