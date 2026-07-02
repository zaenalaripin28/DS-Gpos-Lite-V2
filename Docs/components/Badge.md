# Badge

## Purpose

Small inline label for counts or short status text, rendered as a pill. The `added`/`removed` variants prefix the content with a `+`/`-` sign.

## Source of Truth

* HTML Reference: components/Badge/
* Runtime Component: src/GposLite/components/Badge.tsx
* Styles: src/GposLite/styles/badge.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-badge`)
* Prefix (`.ds-badge__prefix`, only for `added`/`removed`)
* Content (`.ds-badge__content` for `added`/`removed`; otherwise raw `children`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Neutral surface badge (`.ds-badge--default`) |
| primary | Bold blue badge (`.ds-badge--primary`) |
| subtle | Light surface, blue text (`.ds-badge--subtle`) |
| important | Bold red badge (`.ds-badge--important`) |
| added | Green badge with `+` prefix (`.ds-badge--added`) |
| removed | Red badge with `-` prefix (`.ds-badge--removed`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | — | single size (`padding: --space-025 --space-075`) |

## States

* Default (`.ds-badge`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n10
* --color-neutral-n20
* --color-neutral-n900
* --color-blue-b300
* --color-red-r300
* --color-red-r50
* --color-green-g50
* --color-green-g300

### Spacing

* --space-025
* --space-075

### Radius

* --border-radius-full

### Typography

* --font-primary
* --font-size-xs
* --font-weight-normal

## Accessibility

* Renders as a `<div>`; no interactive semantics. Provide surrounding text/ARIA when used as a status indicator.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

No other DS components used in source.

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-badge` + appearance modifier)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar 6 appearance yang ada
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component

## Example Structure

```
Badge (.ds-badge[--appearance])
├─ Prefix (.ds-badge__prefix, added/removed only)
└─ Content (.ds-badge__content | children)
```
