# Avatar

## Purpose

Circular user image container with an optional presence indicator dot. Available in four fixed sizes.

## Source of Truth

* HTML Reference: components/Avatar/
* Runtime Component: src/GposLite/components/Avatar.tsx
* Styles: src/GposLite/styles/avatar.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-avatar`)
* Image (`.ds-avatar__image`)
* Presence dot (optional, `.ds-avatar__presence`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | base component |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| xl | 96px | `.ds-avatar--xl`, image 64px, presence 16px |
| lg | 40px | `.ds-avatar--lg`, image 28px, presence 14px |
| md | 32px | `.ds-avatar--md` (default), image 20px, presence 14px |
| sm | 24px | `.ds-avatar--sm`, image 16px, presence 12px |

## States

* Default (`.ds-avatar`)

## Token Usage

### Colors

* --color-blue-b200
* --color-green-g300
* --color-neutral-n0

### Radius

* --border-radius-full

## Accessibility

* `<img>` carries an `alt` text (default `Avatar pengguna`); set a meaningful `alt` per usage.
* Presence dot is decorative (no semantic role).

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component may be used together with:

* Image asset (default `assets/images/avatar.svg`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-avatar` + size modifier)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

* Gunakan token yang sudah ada
* Jangan membuat variant baru
* Jangan membuat ukuran baru di luar xl/lg/md/sm
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component

## Example Structure

```
Avatar (.ds-avatar[--size])
├─ Image (.ds-avatar__image)
└─ Presence (.ds-avatar__presence, optional)
```
