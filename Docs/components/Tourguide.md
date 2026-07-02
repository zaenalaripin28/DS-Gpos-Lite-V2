# Tourguide

## Purpose

Floating spotlight callout for onboarding steps, showing a title, instruction, optional progress, and action buttons over a highlighted target. Positioned absolutely on a brand-blue surface.

## Source of Truth

* HTML Reference: components/Tourguide/
* Runtime Component: src/GposLite/components/Tourguide.tsx
* Styles: src/GposLite/styles/tourguide.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-tourguide`, rendered as `<article>`, `aria-label="Tourguide"`)
* Body (`.ds-tourguide__body`)
* Title (`.ds-tourguide__title`, `<h3>`)
* Instruction (`.ds-tourguide__instruction`, `<p>`)
* Footer (`.ds-tourguide__footer`)
* Progress (`.ds-tourguide__progress`, optional `<span>`)
* Actions (`.ds-tourguide__actions`, holds Button components)

Note: the runtime renders the paragraph as `.ds-tourguide__instruction`; the stylesheet defines text styling on `.ds-tourguide__text`.

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Single spotlight callout (`.ds-tourguide`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | auto | single size; fixed width 292px, absolutely positioned |

## States

* Default only — the container is static; action buttons carry their own states (see Button).

## Token Usage

### Colors

* --color-blue-b300
* --color-neutral-n0
* --color-text-inverse

### Spacing

* --space-050
* --space-100
* --space-150

### Radius

* --border-radius-sm

### Shadow

* --shadow-md

### Typography

* --font-primary
* --font-size-xl
* --font-weight-semibold
* --font-weight-medium
* --line-height-snug
* --text-body-small-regular-size
* --text-body-small-regular-lh
* --text-body-small-medium-size
* --text-body-small-medium-weight
* --text-body-small-medium-lh

## Accessibility

* Container is a semantic `<article>` labeled via `aria-label="Tourguide"`.
* Title uses an `<h3>` heading.
* Actions are rendered with the Button component (native `<button>`).

## Responsive Behavior

`@media (max-width: 768px)` sets `.ds-tourguide` `width: calc(100% - 24px)`, `left: 12px`, `top: 132px`.

## Composition Rules

Component may be used together with:

* Button (imported component; default action appearance `subtle`, class `.ds-btn-spotlight`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-tourguide` + body/footer/actions)

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
* Ikuti struktur existing (`<article class="ds-tourguide">` + Button actions)

## Example Structure

```
Tourguide (.ds-tourguide, article)
└─ Body (.ds-tourguide__body)
   ├─ Title (.ds-tourguide__title, h3)
   ├─ Instruction (.ds-tourguide__instruction, p)
   └─ Footer (.ds-tourguide__footer)
      ├─ Progress (.ds-tourguide__progress, optional)
      └─ Actions (.ds-tourguide__actions)
         └─ Button × N
```
