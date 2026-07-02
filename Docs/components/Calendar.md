# Calendar

## Purpose

Month-grid date selector with a month header, weekday row, and selectable day cells. Days support modifiers such as today, selected, range, outside, and disabled.

## Source of Truth

* HTML Reference: components/Calendar/
* Runtime Component: src/GposLite/components/Calendar.tsx
* Styles: src/GposLite/styles/calendar.css
* Tokens: styles/tokens.css

## Anatomy

* Root container (`.ds-calendar`, `role="group"`)
* Body (`.ds-calendar__body`)
* Month header (`.ds-calendar-month-header`)
  * Nav buttons (`.ds-calendar-month-header__nav`, prev/next icons)
  * Month label (`.ds-calendar-month-header__label`)
* Week header (`.ds-calendar-week-header`, `__day`)
* Days grid (`.ds-calendar-days`, `role="grid"`)
  * Day cell (`.ds-calendar-day`)
* Footer / action (defined in CSS: `.ds-calendar__footer`, `.ds-calendar__action`)

## Variants

Day cell modifiers:

| Variant | Description |
| ------- | ----------- |
| outside | Day from adjacent month (`.ds-calendar-day--outside`) |
| today | Current day marker (`.ds-calendar-day--today`) |
| selected | Selected day (`.ds-calendar-day--selected`) |
| range | In-range day (`.ds-calendar-day--range`) |
| disabled | Non-selectable day (`.ds-calendar-day--disabled`) |
| text-subtle | Muted day text (`.ds-calendar-day--text-subtle`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | day cell 32px × 32px; nav 32px × 32px | single size |

## States

* Default (`.ds-calendar-day`)
* Hover (`.ds-calendar-day:hover:not(:disabled):not(.ds-calendar-day--disabled)`)
* Active / Press (`.ds-calendar-day:active:not(:disabled)`)
* Focus (`.ds-calendar-day:focus-visible`)
* Selected (`.ds-calendar-day--selected`)
* Disabled (`.ds-calendar-day:disabled` / `.ds-calendar-day--disabled`)
* Nav: Hover/Active/Focus/Disabled (`.ds-calendar-month-header__nav:hover|:active|:focus-visible|:disabled`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n60
* --color-neutral-n300
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300
* --color-blue-b400
* --color-blue-b500
* --color-border

### Spacing

* --space-050
* --space-100
* --space-150
* --space-200
* --space-300

### Radius

* --border-radius-sm
* --border-radius-md
* --border-radius-lg

### Shadow

* --shadow-md

### Typography

* --font-primary
* --text-body-medium-medium-size / -weight / -lh
* --text-overline-medium-size / -weight / -lh / -ls / -transform
* --text-body-small-medium-size / -weight / -lh

### Transition

* --transition-fast

## Accessibility

* Root has `role="group"` and an `aria-label` (default `Kalender {monthLabel}`).
* Month nav is a `role="group"` with `aria-label`; prev/next buttons have descriptive `aria-label`.
* Weekday cells use `role="columnheader"`; week row uses `role="row"`.
* Days grid uses `role="grid"`; day buttons set `aria-selected` and `aria-disabled`, and `tabIndex={-1}` when disabled.
* Outside/disabled days set `disabled` on the native `<button>`.

## Responsive Behavior

No responsive-specific behavior found for the `.ds-calendar` component itself (media queries in the stylesheet target documentation-only layout helpers).

## Composition Rules

Component may be used together with:

* Icon (prev/next chevrons, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-calendar` + day modifiers)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar day modifier yang ada
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component

## Example Structure

```
Calendar (.ds-calendar)
└─ Body (.ds-calendar__body)
   ├─ Month header (.ds-calendar-month-header)
   │  ├─ Nav prev (.ds-calendar-month-header__nav)
   │  ├─ Label (.ds-calendar-month-header__label)
   │  └─ Nav next (.ds-calendar-month-header__nav)
   ├─ Week header (.ds-calendar-week-header)
   │  └─ Day name (.ds-calendar-week-header__day) × 7
   └─ Days (.ds-calendar-days)
      └─ Day (.ds-calendar-day[--modifier]) × n
```
