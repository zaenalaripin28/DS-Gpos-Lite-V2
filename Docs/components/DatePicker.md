# DatePicker

## Purpose

Composes a Select trigger with a Calendar panel to pick a single date. The trigger shows the current value and toggles a dialog containing the calendar.

## Source of Truth

* HTML Reference: components/Date picker/
* Runtime Component: src/GposLite/components/DatePicker.tsx
* Styles: src/GposLite/styles/date-picker.css
* Tokens: styles/tokens.css

## Anatomy

* Root (`.ds-date-picker`)
* Trigger (Select component, `.ds-select-trigger` with `__value`, `__icon`, `__chevron`)
* Panel (`.ds-date-picker__panel`, `role="dialog"`)
  * Calendar (`.ds-calendar`, see Calendar contract)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | base component |
| invalid | Error trigger state (passed as `invalid` prop to Select) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | trigger min-height 40px | single size |

## States

* Default (`.ds-select-trigger`)
* Hover (`.ds-select-trigger:hover`)
* Focus (`.ds-select-trigger--focus` / `.ds-select-trigger:focus-visible`)
* Open (controlled via `open` prop; toggles panel visibility)
* Calendar day states inherited from Calendar (`.ds-calendar-day--outside`, `--selected`, `:hover`, `:focus-visible`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n40
* --color-neutral-n100
* --color-neutral-n300
* --color-neutral-n500
* --color-neutral-n900
* --color-blue-b50
* --color-blue-b200
* --color-blue-b300
* --color-border

### Spacing

* --space-050
* --space-075
* --space-100
* --space-150

### Radius

* --border-radius-sm
* --border-radius-md
* --border-radius-lg

### Shadow

* --shadow-sm

### Typography

* --font-primary
* --text-body-small-regular-size / -weight / -lh
* --text-body-medium-medium-size / -weight / -lh
* --text-overline-medium-size / -weight / -lh / -ls / -transform
* --text-body-small-medium-size / -weight / -lh

### Transition

* --transition-fast

## Accessibility

* Trigger exposes `aria-label="Date picker"` (via Select).
* Panel uses `role="dialog"` with `aria-label="Date picker calendar"`.
* Open/close is controllable (`open`) or uncontrolled (`defaultOpen`); `onOpenChange` reports changes.
* Calendar accessibility (grid roles, day `aria-selected`/`aria-disabled`) is inherited from the Calendar component.

## Responsive Behavior

No responsive-specific behavior found.

## Composition Rules

Component is built from:

* Select (`src/GposLite/components/Select.tsx`) — trigger
* Calendar (`src/GposLite/components/Calendar.tsx`) — panel content
* Icon (chevron/value icons, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-date-picker` + Select + Calendar)

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru

## AI Generation Rules

* Gunakan token yang sudah ada
* Jangan membuat variant baru
* Jangan membuat ukuran baru
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component

## Example Structure

```
DatePicker (.ds-date-picker)
└─ Select (.ds-select-trigger)
   ├─ Value (.ds-select-trigger__value)
   ├─ Chevron (.ds-select-trigger__chevron)
   └─ Panel (.ds-date-picker__panel[role=dialog])
      └─ Calendar (.ds-calendar)
```
