# Components Index — GPOS Lite DS V2

> AI-readable registry for Figma Make, Cursor, Claude, and code-generation tools.
> Read individual component docs in `docs/components/` before generating UI.

## System Constraints

| Rule | Detail |
|------|--------|
| Stack | HTML + Tailwind CSS only — no React, Vue, Mantine, Bootstrap |
| Colors | Semantic tokens only via `styles/tokens.css` and Tailwind aliases |
| Spacing | `--space-*` and `--spacing-*` tokens — no arbitrary px |
| Icons | `assets/icons/` only — catalog in `foundations/icons/iconsData.js` |
| Typography | `--font-primary`, `--text-*` tokens from foundations |
| Pages | No `/pages` directory — component docs live in `components/` |

## Foundation References

| Foundation | Path |
|------------|------|
| Colors | `foundations/colors/colors.html` |
| Typography | `foundations/typography/typography.html` |
| Spacing | `foundations/spacing/spacing.html` |
| Borders & Radius | `foundations/borders/borders.html` |
| Shadows | `foundations/shadows/shadows.html` |
| Grid & Layout | `foundations/grid/grid.html` |
| Icons | `foundations/icons/icons.html` |

## Token Quick Reference

**Semantic colors:** `--color-neutral-n0`–`n900` · `--color-blue-b50`–`b500` · `--color-red-r*` · `--color-green-g*` · `--color-orange-o*` · `--color-text-primary` · `--color-border` · `--color-surface` · `--color-background`

**Spacing:** `--space-025`(2px) · `--space-050`(4px) · `--space-075`(6px) · `--space-100`(8px) · `--space-150`(12px) · `--space-200`(16px) · `--space-250`(20px) · `--space-300`(24px)

**Typography:** body-sm · body-md · body-lg · caption · overline · title (see `foundations/typography/typography.html`)

## Component Registry (34 components)

| Component | AI Doc | Source File | Primary Class |
|-----------|--------|-------------|---------------|
| Avatar | [avatar.md](./components/avatar.md) | `components/Avatar/avatar.html` | `.ds-avatar` |
| Badge | [badge.md](./components/badge.md) | `components/Badge/badge.html` | `.ds-badge` |
| Breadcrumbs | [breadcrumbs.md](./components/breadcrumbs.md) | `components/Breadcrumbs/breadcrumbs.html` | `.ds-bc-container` |
| Button | [button.md](./components/button.md) | `components/Button/button.html` | `.ds-btn` |
| Calendar | [calendar.md](./components/calendar.md) | `components/Calendar/calendar.html` | `.ds-calendar` |
| Checkbox | [checkbox.md](./components/checkbox.md) | `components/Checkbox/checkbox.html` | `.ds-checkbox` |
| Date picker | [date-picker.md](./components/date-picker.md) | `components/Date picker/date-picker.html` | `.ds-date-picker-layout` |
| Date Time Picker | [date-time-picker.md](./components/date-time-picker.md) | `components/Date time picker/date time picker.html` | `.ds-date-time-picker` |
| Flags | [flags.md](./components/flags.md) | `components/Flags/flags.html` | `.ds-flag` |
| Form | [form.md](./components/form.md) | `components/Form/form.html` | `.ds-form-row` |
| Inline Edit | [inline-edit.md](./components/inline-edit.md) | `components/Inline edit/inline-edit.html` | `.ds-inline-edit` |
| Lozenge | [lozenge.md](./components/lozenge.md) | `components/Lozenge/lozenge.html` | `.ds-lozenge` |
| Modal | [modal.md](./components/modal.md) | `components/Modal/modal.html` | `.modal-composition-item` |
| Navigation Menu | [navigation-menu.md](./components/navigation-menu.md) | `components/Navigation menu/navigation.html` | `.ds-nav-item` |
| Page Header | [page-header.md](./components/page-header.md) | `components/Page Header/page-header.html` | `.ds-page-header` |
| Page Layout | [page-layout.md](./components/page-layout.md) | `components/Page layout/page-layout.html` | `.ds-page-layout` |
| Pagination | [pagination.md](./components/pagination.md) | `components/Pagination/pagination.html` | `.ds-pagination` |
| Popup | [popup.md](./components/popup.md) | `components/Popup/popup.html` | `.popup-anchor-btn` |
| Radio | [radio.md](./components/radio.md) | `components/Radio/radio.html` | `.ds-radio` |
| Range | [range.md](./components/range.md) | `components/Range/range.html` | `.ds-range` |
| Select — Option Part | [select.md](./components/select.md) | `components/Select/select.html` | `.ds-select-component` |
| Table | [table.md](./components/table.md) | `components/Table/table.html` | `.ds-table` |
| Tabs | [tabs.md](./components/tabs.md) | `components/Tabs/tabs.html` | `.ds-tab` |
| Tags | [tags.md](./components/tags.md) | `components/Tags/tags.html` | `.ds-tag` |
| Text Area | [text-area.md](./components/text-area.md) | `components/Text Area/text area.html` | `.ds-text-area` |
| Text Field | [text-field.md](./components/text-field.md) | `components/Text Field/text field.html` | `.ds-text-field` |
| Time picker | [time-picker.md](./components/time-picker.md) | `components/Time picker/time-picker.html` | `.ds-time-picker` |
| Toast Banner | [toast-banner.md](./components/toast-banner.md) | `components/Toast-Banner/banner.html` | `.ds-banner` |
| Toggle | [toggle.md](./components/toggle.md) | `components/Toggle/toggle.html` | `.ds-toggle` |
| Tooltip | [tooltip.md](./components/tooltip.md) | `components/Tooltip/tooltip.html` | `.ds-tooltip` |
| Top & Bottom Nav | [top-bottom-navigation.md](./components/top-bottom-navigation.md) | `components/Top & bottom Navigation/top-bottom-nav.html` | `.ds-topnav-logo` |
| Tourguide | [tourguide.md](./components/tourguide.md) | `components/Tourguide/tourguide.html` | `.ds-tourguide` |
| Dropdown Button | [dropdown.md](./components/dropdown.md) | `components/dropdown/dropdown.html` | `.ds-dropdown` |
| section messages | [section-messages.md](./components/section-messages.md) | `components/section messages/section-message.html` | `.ds-section-message` |

## AI Workflow

1. Identify component from registry above
2. Read `docs/components/{slug}.md`
3. Open source HTML — copy exact class names and DOM structure
4. Reference `styles/tokens.css` for any CSS custom property
5. Never invent variants, colors, or spacing outside documented tokens
