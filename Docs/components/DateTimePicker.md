# DateTimePicker

## Purpose

Combined date and time selector with a two-segment bar; the date segment opens a Calendar dialog and the time segment opens a scrollable time list. Only one panel is open at a time.

## Source of Truth

* HTML Reference: components/Date time picker/
* Runtime Component: src/GposLite/components/DateTimePicker.tsx
* Styles: src/GposLite/styles/date-time-picker.css
* Tokens: styles/tokens.css

## Anatomy

* Root (`.ds-date-time-picker`)
* Bar (`.ds-date-time-picker__bar`, `--focus`)
  * Date segment (`.ds-date-time-picker__segment--date`)
  * Time segment (`.ds-date-time-picker__segment--time`)
* Date dropdown (`.ds-date-time-picker__dropdown--date .ds-calendar`, `role="dialog"`)
* Time dropdown (`.ds-date-time-picker__dropdown--time .ds-time-picker`, `role="listbox"`)
  * Time list (`.ds-time-parts-list`)
  * Time item (`.ds-time-parts-item`, `.is-selected`)

## Variants

| Variant | Description |
| ------- | ----------- |
| default | base component (date + time segments) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| default | bar min-height 40px; segment min-height 40px; time item min-height 40px | single size |

## States

* Default (`.ds-date-time-picker__bar`, `.ds-date-time-picker__segment`)
* Hover (`.ds-date-time-picker__bar:hover`, `.ds-date-time-picker__segment:hover`)
* Focus (`.ds-date-time-picker__bar--focus`, `.ds-date-time-picker__segment:focus-visible`)
* Active segment (`.ds-date-time-picker__segment--active`)
* Time item Hover/Active/Focus (`.ds-time-parts-item:hover|:active|:focus-visible`)
* Time item Selected (`.ds-time-parts-item.is-selected`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n20
* --color-neutral-n30
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
* --space-200

### Radius

* --border-radius-sm
* --border-radius-md
* --border-radius-lg

### Shadow

* --shadow-md

### Typography

* --font-primary
* --text-body-small-regular-size / -weight / -lh
* --text-body-small-medium-weight
* --text-body-medium-medium-size / -weight / -lh
* --text-overline-medium-size / -weight / -lh / -ls / -transform
* --text-body-small-medium-size / -weight / -lh

### Transition

* --transition-fast

## Accessibility

* Date segment is a `<button>` with `aria-haspopup="dialog"` and `aria-expanded`.
* Time segment is a `<button>` with `aria-haspopup="listbox"` and `aria-expanded`.
* Date dropdown uses `role="dialog"` with `aria-label`; time dropdown uses `role="listbox"` with `aria-label`.
* Opening one segment closes the other.

## Responsive Behavior

At `max-width: 960px`, the time segment widens (`.ds-date-time-picker__segment--time { flex: 0 0 46%; }`).

## Composition Rules

Component may be used together with:

* Calendar (`.ds-calendar`) — date panel content
* Time list (`.ds-time-picker` / `.ds-time-parts-item`) — time panel content
* Icon (segment/value icons, from `assets/icons`)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class dan struktur existing (`.ds-date-time-picker` + segment/dropdown)

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
DateTimePicker (.ds-date-time-picker)
├─ Bar (.ds-date-time-picker__bar[--focus])
│  ├─ Date segment (.ds-date-time-picker__segment--date)
│  └─ Time segment (.ds-date-time-picker__segment--time)
├─ Date dropdown (.ds-date-time-picker__dropdown--date .ds-calendar) [dialog]
└─ Time dropdown (.ds-date-time-picker__dropdown--time .ds-time-picker) [listbox]
   └─ Time item (.ds-time-parts-item[.is-selected]) × n
```
