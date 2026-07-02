# Popup

## Purpose

Anchored panel that shows a short text message stacked relative to a trigger button. Open state is controllable (`open`) or self-managed via `defaultOpen`.

## Source of Truth

* HTML Reference: components/Popup/
* Runtime Component: src/GposLite/components/Popup.tsx
* Styles: src/GposLite/styles/popup.css
* Tokens: styles/tokens.css

## Anatomy

* Wrapper (`.popup-anchor-wrap` + `.popup-anchor-wrap--{position}`)
* Panel (`.popup-part-panel`, rendered only when open)
* Panel text (`<p>` `.popup-part-text`)
* Trigger (`Button` with `.ds-btn ds-btn-default-selected popup-anchor-btn`)

## Variants

| Variant | Description |
| ------- | ----------- |
| left | Anchor aligned to start (`.popup-anchor-wrap--left`) |
| center | Anchor centered (`.popup-anchor-wrap--center`) |
| right | Anchor aligned to end (`.popup-anchor-wrap--right`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | auto | Single size; wrapper is `width: max-content`, height driven by content |

## States

* Open (panel rendered)
* Closed (panel not rendered)

## Token Usage

### Spacing

* --space-100

## Accessibility

* Trigger is the DS `Button` (native `<button type="button">`); keyboard activation via Enter/Space.
* Open/close toggled on trigger click; controlled when `open` is provided, otherwise internal state.
* Panel text rendered as plain `<p>`; no extra ARIA wiring in source.

## Responsive Behavior

No responsive-specific behavior found.

(The `popup.css` media queries target documentation-page demo classes — `.popup-demo-grid`, `.popup-playground`, `.usage-grid-2` — not the `.popup-anchor-wrap` / `.popup-part-panel` component anatomy.)

## Composition Rules

Component may be used together with:

* Button (trigger, `.ds-btn`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.popup-anchor-wrap` + `.popup-part-panel`)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar left/center/right

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar 3 position yang ada
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (wrap + panel + Button trigger)

## Example Structure

```
Popup (.popup-anchor-wrap[--position])
├─ Panel (.popup-part-panel)   ← only when open
│  └─ Text (p.popup-part-text)
└─ Trigger (Button .ds-btn .popup-anchor-btn)
```
