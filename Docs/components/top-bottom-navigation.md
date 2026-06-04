# Top & Bottom Nav

## Source of Truth

`components/Top & bottom Navigation/top-bottom-nav.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Top navigation responsif (website, tablet, mobile) dari parts logo, notifikasi, button, dan avatar. Footer navigation untuk aksi bawah halaman.

## Anatomy

* Root container (`.ds-topnav-logo`)
* Img (`.ds-topnav-logo__img`)
* Icon (`.ds-topnav-logo__icon`)
* Indicator (`.ds-topnav-logo__indicator`)
* Start (`.ds-topnav-logo__start`)
* Center (`.ds-topnav-logo__center`)
* End (`.ds-topnav-logo__end`)
* Menu (`.ds-topnav-logo__menu`)
* Logo (`.ds-topnav-logo__logo`)
* Notif (`.ds-topnav-logo__notif`)
* Akses (`.ds-topnav-logo__akses`)
* Image (`.ds-topnav-logo__image`)
* Presence (`.ds-topnav-logo__presence`)

## Variants

* `website`
* `tablet`
* `mobile`

## Sizes

* `lg`

## States

* hover

## Tokens Used

* `--border-radius-full`
* `--border-radius-lg`
* `--border-radius-md`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b500`
* `--color-border`
* `--color-green-g300`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n500`
* `--color-neutral-n800`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r300`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--font-size-sm`
* `--font-size-xs`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-bell.svg`
* `assets/icons/icon-chevron-left.svg`
* `assets/icons/icon-chevron-right.svg`
* `assets/icons/icon-menu.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Bungkus dengan &lt;footer&gt; + aria-label. Tombol chevron wajib aria-label; indikator halaman memakai aria-live="polite".

## Usage Rules

Di pojok kiri top navigation — sebagai tautan ke beranda atau dashboard utama aplikasi GPOS Lite.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-topnav-logo. Key related classes: .ds-topnav-logo, .ds-topnav-logo--hover, .ds-topnav-logo--press, .ds-topnav-logo__img.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Top & bottom Navigation/top-bottom-nav.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Top & Bottom Nav for GPOS Lite Design System V2. Source: components/Top & bottom Navigation/top-bottom-nav.html Root class: .ds-topnav-logo Appearances/variants: website, tablet, mobile Sizes: lg States: hover Icons: icon-bell.svg, icon-chevron-left.svg, icon-chevron-right.svg, icon-menu.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
