# Tabs

## Purpose

Horizontal tab list for switching between views, with an underline indicator, optional bottom track, and per-tab required/notification markers. Selected state is controllable (`selectedId`) or self-managed via `defaultSelectedId`.

## Source of Truth

* HTML Reference: components/Tabs/
* Runtime Component: src/GposLite/components/Tabs.tsx
* Styles: src/GposLite/styles/tabs.css
* Tokens: styles/tokens.css

## Anatomy

* Tablist (`<div>` `.ds-tablist`, `role="tablist"`, + `--track`)
* Tab (`<button>` `.ds-tab` + `--selected` / `--required` / `--notification`, `role="tab"`)
* Tab label (`<span>` `.ds-tab__label`)
* Tab indicator (`<span>` `.ds-tab__indicator`, `aria-hidden`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Tab without track context (`.ds-tab`) |
| selected | Active tab with blue label + indicator (`.ds-tab--selected` / `[aria-selected="true"]`) |
| required | Tab flagged required (`.ds-tab--required`) |
| notification | Tab flagged with notification (`.ds-tab--notification`) |
| track | Tablist with bottom border track (`.ds-tablist--track`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | auto | Single size; padding `--space-050 --space-100`, indicator height 2px |

## States

* Default
* Hover (`:hover .ds-tab__indicator` / `.ds-tab--hover`)
* Active / Press (`:active` / `.ds-tab--press`)
* Focus (`:focus-visible` / `.ds-tab--focus`, box-shadow ring)
* Selected (`.ds-tab--selected` / `[aria-selected="true"]`)

## Token Usage

### Colors

* --color-neutral-n40
* --color-neutral-n300
* --color-neutral-n900
* --color-blue-b200
* --color-blue-b300
* --color-red-r300

### Spacing

* --space-050
* --space-100
* --space-200

### Radius

* --border-radius-sm
* --border-radius-full

### Typography

* --font-primary
* --text-body-small-medium-size
* --text-body-small-medium-weight
* --text-body-small-medium-lh

### Transition

* --transition-fast

## Accessibility

* Container is `role="tablist"` with `aria-label` (default `Tabs`).
* Each tab is a native `<button type="button">` with `role="tab"` and `aria-selected` reflecting state; keyboard activation via Enter/Space.
* Indicator is `aria-hidden="true"`.
* Selection controlled when `selectedId` is provided, otherwise internal state seeded from `defaultSelectedId` or first tab.
* Focus shown via `:focus-visible` box-shadow ring.

## Responsive Behavior

No responsive-specific behavior found.

(The `tabs.css` media-related rules and demo classes — `.usage-grid-2`, `.usage-info-grid`, `.tw-snippet-row` — are documentation-page chrome, not the `.ds-tablist` / `.ds-tab` component anatomy.)

## Composition Rules

Component may be used together with:

* Badge (`.ds-badge--important`, notification marker)
* Required marker (`.ds-tab__required`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan struktur existing (`.ds-tablist` + `.ds-tab` + label + indicator)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar selected/required/notification/track

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar selected/required/notification/track
* Jangan membuat ukuran baru di luar single size yang ada
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing (`.ds-tablist` > `.ds-tab` + `__label` + `__indicator`)

## Example Structure

```
Tabs (div.ds-tablist[--track][role=tablist])
└─ Tab (button.ds-tab[--selected][--required][--notification])
   ├─ Label (span.ds-tab__label)
   └─ Indicator (span.ds-tab__indicator)
```
