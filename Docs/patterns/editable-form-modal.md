# Pattern: Editable Form Modal

## Purpose

Display a focused task inside a modal without leaving the current page.

Used when users need to view, edit, calculate, verify, or input data related to a specific record.

---

## Required Component References

Read these component documents before generating UI:

* `Docs/components/modal.md`
* `Docs/components/form.md`
* `Docs/components/button.md`

---

## Optional Component References

Read when required by the use case:

* `Docs/components/text-field.md`
* `Docs/components/text-area.md`
* `Docs/components/select.md`
* `Docs/components/date-picker.md`
* `Docs/components/date-time-picker.md`
* `Docs/components/time-picker.md`
* `Docs/components/radio.md`
* `Docs/components/checkbox.md`
* `Docs/components/toggle.md`
* `Docs/components/table.md`
* `Docs/components/lozenge.md`
* `Docs/components/dropdown.md`
* `Docs/components/section-messages.md`

---

## Composition

Modal
├─ Header
├─ Content
└─ Footer

---

## Header

Source Component:

* `Docs/components/modal.md`

Contains:

* Title
* Close Action

Examples:

* Product Detail
* Edit Product
* Stock Adjustment
* Input Batch ED
* Approval Request

---

## Content

### Summary Section (Optional)

Recommended Components:

* `Docs/components/section-messages.md`

Examples:

* Current Stock
* Product Information
* Current Balance

---

### Form Section

Use documented form controls only.

Reference:

* `Docs/components/form.md`
* `Docs/components/text-field.md`
* `Docs/components/select.md`
* `Docs/components/radio.md`
* `Docs/components/checkbox.md`
* `Docs/components/toggle.md`

---

### Table Section (Optional)

Reference:

* `Docs/components/table.md`

Examples:

* Batch List
* Serial Number List
* Unit Conversion

---

## Footer Actions

Reference:

* `Docs/components/button.md`
* `Docs/components/dropdown.md`

Layout:

Secondary Action → Left

Primary Action → Right

Examples:

* Batal | Simpan
* Tutup | Terapkan
* Kembali | Submit

---

## Accessibility

Follow:

* `Docs/components/modal.md`
* `Docs/components/form.md`

Preserve:

* ARIA attributes
* Keyboard navigation
* Focus management

---

## AI Generation Rules

1. Read all Required Component References first.
2. Reuse existing DS components.
3. Never invent modal layouts.
4. Never invent new form controls.
5. Never invent new button styles.
6. Use tokens from `styles/tokens.css`.
7. Use component HTML as source of truth.
8. Follow component anatomy exactly as documented.

---

## Implementations

Examples:

* Stock Opname Item Entry
* Product Quick Edit
* Customer Quick Edit
* Input Batch ED
* Approval Form
* Stock Adjustment
