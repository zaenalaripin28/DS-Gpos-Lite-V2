# Radio

## Source of Truth

`components/Radio/radio.html`

Global tokens: `styles/tokens.css` · Tailwind: `tailwind.config.js` · Shared CSS: `styles/globals.css`, `styles/enhancements.css`

## Purpose

Pilihan eksklusif dalam grup — part lingkaran, komponen berlabel, dan radio group vertikal dengan state interaktif penuh.

## Anatomy

* Root (`label.ds-radio`)
* Radio Input (`.ds-radio__input`)
* Radio Circle (`.ds-radio__circle`)
* Radio Label (`.ds-radio__label`)

## Variants

* `radio`

## Sizes

* Single default size (dimensions defined in source CSS).

## States

* default
* hover
* press
* focus
* Disabled
* Checked
* Checked/Focus
* Checked/Invalid
* Checked/Disable
* checked
* error
* invalid

## Tokens Used

* `--border-radius-2xl`
* `--border-radius-sm`
* `--border-radius-xl`
* `--color-blue-b200`
* `--color-blue-b300`
* `--color-blue-b75`
* `--color-border`
* `--color-green-g300`
* `--color-green-g400`
* `--color-neutral-n0`
* `--color-neutral-n10`
* `--color-neutral-n20`
* `--color-neutral-n30`
* `--color-neutral-n40`
* `--color-neutral-n400`
* `--color-neutral-n50`
* `--color-neutral-n700`
* `--color-neutral-n900`
* `--color-primary-300`
* `--color-primary-500`
* `--color-red-r300`
* `--color-surface`
* `--color-text-primary`
* `--color-text-secondary`
* `--color-text-tertiary`
* `--font-primary`
* `--font-weight-semibold`
* `--shadow-2xl`
* `--shadow-md`
* `--shadow-sm`

Shared semantic Tailwind utilities: `neutral-n*`, `blue-b*`, `red-r*`, `green-g*`, `orange-o*`, `text-primary`, `text-secondary`, `text-tertiary`, `border`, `surface`, `background`.

Spacing: `--space-025` · `--space-050` · `--space-075` · `--space-100` · `--space-150` · `--space-200` · `--space-250` · `--space-300`

Typography: `--font-primary` · `--text-body-small-medium-*` · `--text-body-medium-regular-*` · `--text-caption-regular-*`

## Icons Used

* None component-specific (navigation shell uses icon-chevron-mini-down.svg)

Icon size tokens: `--icon-size-small` (16px) · `--icon-size-medium` (24px) · `--icon-size-large` (32px) · `--icon-size-xlarge` (48px)

## Accessibility Rules

Gunakan &lt;input type="radio"&gt; dengan name yang sama per grup. Bungkus dengan &lt;fieldset&gt; + &lt;legend&gt; untuk konteks grup. Sertakan pesan teks saat aria-invalid.

## Usage Rules

Untuk memilih tepat satu opsi dalam grup yang saling eksklusif (metode pembayaran, jenis akun, pengaturan default). Gunakan checkbox jika pengguna boleh memilih lebih dari satu.

## AI Generation Rules

* Reuse existing component CSS classes from source file — do not invent new class names.
* Reuse Tailwind semantic token utilities mapped in tailwind.config.js (e.g. bg-blue-b300, text-neutral-n900, gap-100, p-250).
* Use CSS custom properties from styles/tokens.css only — never hardcode hex, rgb, or px values for colors/spacing/radius.
* Use icons from assets/icons/ only — reference via relative path as in source.
* Primary root class: .ds-radio. Key related classes: .ds-radio, .ds-radio__input, .ds-radio__circle, .ds-radio__dot, .ds-radio--disabled, .ds-radio__circle--hover.
* Never create new variants, colors, spacing scales, or typography sizes unless explicitly requested.
* Match HTML structure and state handling from components/Radio/radio.html.
* Preserve semantic HTML, native form controls, and ARIA attributes from the implementation.

## Example Prompt For AI

```
Implement Radio for GPOS Lite Design System V2. Source: components/Radio/radio.html Root class: .ds-radio Appearances/variants: radio States: default, hover, press, focus, Disabled, Checked, Checked/Focus, Checked/Invalid, Checked/Disable, checked, error, invalid Stack: HTML + Tailwind CSS + tokens.css. No React. Copy exact class names from source.
```
