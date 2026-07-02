# Section Message

## Purpose

Inline contextual message block with an appearance-driven icon, title, description, and optional inline link actions. Used to communicate information, success, warning, error, or discovery status within a page section.

## Source of Truth

* HTML Reference: components/section messages/
* Runtime Component: src/GposLite/components/SectionMessage.tsx
* Styles: src/GposLite/styles/section-message.css
* Tokens: styles/tokens.css

## Anatomy

* Root (`<article>` `.ds-section-message` + `--{appearance}`)
* Header (`.ds-section-message__header`)
* Icon (`<span>` `.ds-section-message__icon`, CSS mask, `aria-hidden`)
* Main (`.ds-section-message__main`)
* Title (`<h3>` `.ds-section-message__title`, with `id`)
* Body (`.ds-section-message__body`)
* Description (`<p>` `.ds-section-message__description`)
* Actions (`.ds-section-message__actions`)
* Action link (`<a>` `.ds-section-message__action`)
* Action separator (`<span>` `.ds-section-message__action-sep`, `aria-hidden`)

## Variants

| Variant | Description |
| ------- | ----------- |
| information | Blue surface, info-circle icon (`.ds-section-message--information`) |
| success | Green surface, check-circle icon (`.ds-section-message--success`) |
| warning | Orange surface, exclamation-triangle icon (`.ds-section-message--warning`) |
| error | Red surface, exclamation-triangle icon (`.ds-section-message--error`) |
| discovery | Purple surface, question-mark-circle icon (`.ds-section-message--discovery`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | auto | Single size; `max-width: 400px`, padding `--space-150`, icon 24×24px |

## States

* Default
* Action hover (`.ds-section-message__action:hover`)
* Action focus (`.ds-section-message__action:focus-visible`, box-shadow ring)

## Token Usage

### Colors

* --color-neutral-n300
* --color-neutral-n500
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-green-g50
* --color-green-g300
* --color-orange-o50
* --color-orange-o300
* --color-red-r50
* --color-red-r300
* --color-purple-p50
* --color-purple-p300

### Spacing

* --space-025
* --space-050
* --space-100
* --space-150

### Radius

* --border-radius-sm
* --border-radius-lg

### Typography

* --font-primary
* --font-size-sm
* --font-weight-semibold
* --font-weight-regular
* --font-weight-medium
* --text-body-small-medium-lh
* --text-body-small-regular-lh

### Transition

* --transition-fast

## Accessibility

* Root is `<article role="region">` with `aria-labelledby` pointing to the title `id` (auto `sm-title-{appearance}` if `titleId` omitted).
* Title is a semantic `<h3>`.
* Icon and action separators are `aria-hidden="true"`.
* Actions render as `<a>` links (`href` defaults to `#`); support `onClick`.
* Action focus shown via `:focus-visible` box-shadow ring.

## Responsive Behavior

No responsive-specific behavior found.

(The `section-message.css` media queries target documentation-page layout classes — `.usage-info-grid`, `.usage-grid-2`, `.anatomy-grid` — not the `.ds-section-message` component anatomy.)

## Composition Rules

Component may be used together with:

* Icon (appearance icon via CSS mask, from `assets/icons`: information-circle, check-circle, exclamation-triangle, question-mark-circle)
* Link actions (inline `<a>` `.ds-section-message__action`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-section-message` + header/body)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar information/success/warning/error/discovery

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar 5 appearance yang ada
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-section-message` + `--appearance` + header/body/actions)

## Example Structure

```
SectionMessage (article.ds-section-message[--appearance])
├─ Header (.ds-section-message__header)
│  ├─ Icon (span.ds-section-message__icon)
│  └─ Main (.ds-section-message__main)
│     └─ Title (h3.ds-section-message__title)
└─ Body (.ds-section-message__body)
   ├─ Description (p.ds-section-message__description)
   └─ Actions (.ds-section-message__actions)
      └─ Action (a.ds-section-message__action) [· sep · ...]
```
