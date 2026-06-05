# Section Message

## Source of Truth

`components/section messages/section-message.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

GPOS Lite V2 section messages component for dashboard UI patterns.

## Anatomy

* Root container (`.ds-section-message`)
* Section Message Icon (`.ds-section-message__icon`)
* Section Message Main (`.ds-section-message__main`)
* Section Message Header (`.ds-section-message__header`)
* Section Message Title (`.ds-section-message__title`)
* Section Message Description (`.ds-section-message__description`)
* Section Message Actions (`.ds-section-message__actions`)
* Section Message Action (`.ds-section-message__action`)

## Variants

* `information`
* `success`
* `warning`
* `error`
* `discovery`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* hover

## Tokens Used

* `--border-radius-lg`
* `--border-radius-sm`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b400`
* `--color-blue-b50`
* `--color-border`
* `--color-green-g300`
* `--color-green-g400`
* `--color-green-g50`
* `--color-neutral-n0`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n300`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n500`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-orange-o300`
* `--color-orange-o50`
* `--color-primary-300`
* `--color-primary-500`
* `--color-purple-p300`
* `--color-purple-p50`
* `--color-red-r300`
* `--color-red-r50`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* `assets/icons/icon-solid-check-circle.svg`
* `assets/icons/icon-solid-exclamation-triangle.svg`
* `assets/icons/icon-solid-information-circle.svg`
* `assets/icons/icon-solid-question-mark-circle.svg`

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Maksimal 2 tautan aksi. Gunakan role="region" + aria-labelledby pada judul. Tautan fokus memakai ring Border.Focused (b200).

## Usage Rules

Untuk informasi yang relevan dengan konten section atau halaman (onboarding, kebijakan, hasil operasi, peringatan field). Bukan untuk feedback sementara — gunakan Toast Banner.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-section-message. Key related classes: .ds-section-message, .ds-section-message__header, .ds-section-message__icon, .ds-section-message__main, .ds-section-message__title, .ds-section-message__body.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/section messages/section-message.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement section messages for GPOS Lite Design System V2. Source: components/section messages/section-message.html Root class: .ds-section-message Appearances/variants: information, success, warning, error, discovery States: hover Icons: icon-solid-check-circle.svg, icon-solid-exclamation-triangle.svg, icon-solid-information-circle.svg, icon-solid-question-mark-circle.svg Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
