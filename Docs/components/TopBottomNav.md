# TopBottomNav

## Purpose

Responsive top navigation header container with website, tablet, and mobile variants, hosting start/center/end slots for logo, actions, notification, and profile. Footer navigation and slot elements are styled in the same stylesheet.

## Source of Truth

* HTML Reference: components/Top & bottom Navigation/
* Runtime Component: src/GposLite/components/TopBottomNav.tsx
* Styles: src/GposLite/styles/top-bottom-nav.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`.ds-topnav`, rendered as `<header>`, default `role="banner"`)
* Start slot (`.ds-topnav__start`)
* Center slot (`.ds-topnav__center`)
* End slot (`.ds-topnav__end`)
* Logo (`.ds-topnav-logo` + `.ds-topnav-logo__img`)
* Notification button (`.ds-topnav-notif` + `.ds-topnav-notif__icon` / `__indicator`)
* Badge (`.ds-badge`, `.ds-badge--important`)
* Avatar (`.ds-avatar`, `.ds-avatar--lg`)
* Footer nav (`.ds-footer-nav` + `__pager` / `__page` / `__actions`)
* Button subset (`.ds-btn` and modifiers, composed from Button)

Children are supplied by the consumer; the runtime renders only the `.ds-topnav` header wrapper.

## Variants

| Variant | Description |
| ------- | ----------- |
| website | Flex space-between layout (`.ds-topnav--website`) |
| tablet | 3-column grid with menu + centered logo (`.ds-topnav--tablet`) |
| mobile | 3-column grid, hides secondary actions (`.ds-topnav--mobile`) |

Modifiers: `.ds-topnav--lg` (`large`) and `.ds-topnav--icon-only` (`iconOnly`) are emitted by the runtime; no dedicated CSS rule found for these modifiers.

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | min-height 56px | single size for `.ds-topnav` (and `.ds-footer-nav`) |

## States

The `.ds-topnav` container has no interactive states. Interactive slot elements expose:

* Logo: hover (`.ds-topnav-logo:hover` / `--hover`), press (`:active` / `--press`), focus (`:focus-visible`)
* Notification: hover (`:hover`), press (`:active`), focus (`:focus-visible`)
* Profile: focus (`.ds-topnav-profile:focus-visible`)
* Button subset: hover/active/focus-visible/disabled (`.ds-btn` ...)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n50
* --color-neutral-n900
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-blue-b500
* --color-red-r300
* --color-green-g300
* --color-text-secondary

### Spacing

* --space-025
* --space-050
* --space-075
* --space-100
* --space-150
* --space-200
* --space-250
* --space-300

### Radius

* --border-radius-md
* --border-radius-lg
* --border-radius-full

### Typography

* --font-primary
* --font-size-sm
* --font-size-xs
* --font-weight-medium
* --font-weight-normal
* --text-body-small-medium-size
* --text-body-small-medium-weight
* --text-body-small-medium-lh
* --text-body-small-regular-size

### Transition

* --transition-fast

## Accessibility

* Container is a semantic `<header>` with a configurable `role` (default `banner`).
* Logo, notification, and profile slot elements are native `<button>`/link elements with `:focus-visible` rings.

## Responsive Behavior

`@media (max-width: 640px)` collapses `.ds-topnav` to a single column (`grid-template-columns: 1fr`), left-aligns `.ds-topnav__center`, and wraps `.ds-footer-nav` with full-width right-aligned actions.

## Composition Rules

Component may be used together with:

* Logo, Notification icon, Profile Avatar (icons from `assets/icons`)
* Badge (`.ds-badge`) for notification count
* Button (`.ds-btn` subset) for actions

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-topnav` + start/center/end slots)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar website/tablet/mobile
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`<header class="ds-topnav">` + slot children)

## Example Structure

```
TopBottomNav (.ds-topnav.ds-topnav--[variant], header)
├─ Start (.ds-topnav__start) — logo / menu
├─ Center (.ds-topnav__center) — centered logo
└─ End (.ds-topnav__end) — notif / actions / avatar
```
