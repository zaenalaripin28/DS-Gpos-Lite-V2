# ToastBanner

## Purpose

Full-width inline banner conveying announcement, success, warning, or error messages with an icon slot and text. Non-interactive status surface.

## Source of Truth

* HTML Reference: components/Toast-Banner/
* Runtime Component: src/GposLite/components/ToastBanner.tsx
* Styles: src/GposLite/styles/toast-banner.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-banner`, rendered as `<div>`)
* Icon slot (`.ds-banner__icon`, empty + `aria-hidden` when no icon)
* Text slot (`.ds-banner__text`)

## Variants

| Variant | Description |
| ------- | ----------- |
| announcement | Neutral bold banner (`.ds-banner--announcement`) |
| success | Green bold banner (`.ds-banner--success`) |
| warning | Orange bold banner (`.ds-banner--warning`) |
| error | Red bold banner (`.ds-banner--error`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | auto (padding `--space-150`) | single size, full width |

## States

* Default only — static, non-interactive banner (no hover/focus/active/disabled states defined).

## Token Usage

### Colors

* --color-orange-o200 (warning bg)
* --color-green-g300 (success bg)
* --color-red-r300 (error bg)
* --color-neutral-n500 (announcement bg)
* --color-neutral-n900 (warning text/icon)
* --color-neutral-n0 (inverse text/icon)

### Spacing

* --space-050
* --space-150
* --space-300

### Radius

* --border-radius-md

### Typography

* --font-primary
* --font-size-sm
* --font-weight-medium
* --text-body-small-medium-lh

## Accessibility

* Container is a `<div>`; no ARIA role is set.
* When no `icon` is provided, the icon slot is rendered with `aria-hidden="true"`.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* Icon (passed via `icon` prop into `.ds-banner__icon`, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-banner` + `.ds-banner__icon` + `.ds-banner__text`)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar announcement/success/warning/error
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-banner` + icon slot + text slot)

## Example Structure

```
ToastBanner (.ds-banner.ds-banner--[appearance])
├─ Icon (.ds-banner__icon)
└─ Text (.ds-banner__text)
```
