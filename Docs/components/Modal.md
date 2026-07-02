# Modal

## Purpose

Dialog surface composed of a header, body text, and a footer action row built from DS Buttons. Supports four widths, three header appearances, and short/long body variants.

## Source of Truth

* HTML Reference: components/Modal/
* Runtime Component: src/GposLite/components/Modal.tsx
* Styles: src/GposLite/styles/modal.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`article.modal-composition-item`, `.modal-size-{size}`)
* Composition label (optional, `p.modal-composition-item__label`)
* Body wrapper (`div.modal-composition-body`)
* Header (`div.modal-header-item`)
* Header icon (optional, `span.modal-header-icon`, `.modal-header-icon--{appearance}`)
* Header title (`span.modal-header-item__title`)
* Body text (`p.modal-body-text-short` or `p.modal-body-text-long`)
* Footer (`div.modal-footer-container`)
* Footer actions (`div.modal-footer-actions`)
* Action buttons (DS `Button` / `.ds-btn`, mapped from `actions`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Plain header, primary confirm button (`headerAppearance="default"`) |
| warning | Orange warning header icon, warning confirm button (`.modal-header-icon--warning`) |
| danger | Red danger header icon, danger confirm button (`.modal-header-icon--danger`) |

Body variant: `short` (`.modal-body-text-short`) or `long` (`.modal-body-text-long`, scrollable, `max-height: 180px`).

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| xs | content height | `max-width: 360px` (`.modal-size-xs`) |
| sm | content height | `max-width: 520px` (`.modal-size-sm`, default) |
| md | content height | `max-width: 640px` (`.modal-size-md`) |
| lg | content height | `max-width: 800px` (`.modal-size-lg`) |

Height is driven by content; sizes control max-width only.

## States

* Open (`open` true → rendered; `open` false → returns null)
* Header appearance: default / warning / danger
* Body long has vertical scroll (`.modal-body-text-long`)

Action button interaction states are provided by the DS Button component.

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n40
* --color-neutral-n50
* --color-neutral-n900
* --color-border-light
* --color-text-primary
* --color-text-secondary
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-blue-b500
* --color-orange-o200
* --color-orange-o300
* --color-red-r300
* --color-red-r400
* --color-red-r500

### Spacing

* --space-025
* --space-100
* --space-150

### Radius

* --border-radius-none
* --border-radius-md
* --border-radius-lg
* --border-radius-full

### Shadow

* --shadow-xs
* --shadow-md

### Typography

* --font-primary
* --font-size-sm
* --font-size-lg
* --font-weight-normal
* --font-weight-medium
* --font-weight-semibold
* --line-height-loose
* --text-body-small-medium-lh
* --text-body-medium-regular-size
* --text-body-medium-regular-weight
* --text-body-medium-regular-lh
* --text-caption-medium-size
* --text-caption-medium-lh
* --letter-spacing-wide

### Transition

* --transition-fast

## Accessibility

* Header icon span is decorative: `aria-hidden="true"`.
* Footer actions are native DS `Button` (`type="button"`); keyboard activation via Enter/Space.
* No `role="dialog"`, `aria-modal`, or focus trap is defined in source — the root is an `<article>`.

## Responsive Behavior

At `max-width: 640px`, `.modal-composition-item` gets `min-width: 280px` (so it scrolls within its composition stage). Other media queries (`768px`, `640px`) target documentation/demo helpers (`.modal-guideline-grid`, `.modal-playground-controls`, `.modal-composition-stage`).

## Composition Rules

Component may be used together with:

* DS `Button` (footer actions; appearance defaults to primary/warning/danger based on `headerAppearance`)
* Header icon via CSS mask (`assets/icons/icon-solid-exclamation-triangle.svg` for warning/danger)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan DS Button untuk footer actions

## Don't

* Hardcode color
* Hardcode spacing
* Tambah size atau header appearance baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat size baru di luar xs/sm/md/lg
* Jangan membuat header appearance baru di luar default/warning/danger
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.modal-composition-item` + header/body/footer)

## Example Structure

```
Modal (article.modal-composition-item.modal-size-{size})
├─ Label (p.modal-composition-item__label) [optional]
└─ Body (div.modal-composition-body)
   ├─ Header (div.modal-header-item)
   │  ├─ Icon (span.modal-header-icon--{appearance}) [optional]
   │  └─ Title (span.modal-header-item__title)
   ├─ Body text (p.modal-body-text-{short|long})
   └─ Footer (div.modal-footer-container)
      └─ Actions (div.modal-footer-actions)
         └─ Button × n (.ds-btn)
```
