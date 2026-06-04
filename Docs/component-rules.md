# GPOS Lite — Component Rules

> **Source of truth:** `components/*/*.html`, `styles/tokens.css`, `CLAUDE.md`, `Docs/design-system-knowledge.md`. Hanya aturan yang sudah diimplementasi; tidak menambah variant, state, atau arsitektur baru.

---

## Aturan global

| Aturan | Implementasi |
|---|---|
| File | Satu halaman doc per komponen: `components/{Name}/{slug}.html` |
| Stylesheet | `../../styles/globals.css` + `enhancements.css`; CSS komponen di `<style>` halaman |
| Class | BEM `ds-{block}`, `ds-{block}__{element}`, `ds-{block}--{modifier}` — kecuali Modal (`modal-*`), Popup (`popup-*`) |
| Token | Hanya `var(--*)` / utility Tailwind yang memetakan token; tanpa hex hardcoded |
| Ikon | `../../assets/icons/icon-*.svg` via `<img>` |
| Tailwind | CDN + inline `tailwind.config` mirror `tailwind.config.js`; utility semantic (`bg-blue-b300`, `gap-200`, `shadow-1`, `shadow-md`) |
| Elevation | Default `--shadow-1` / `shadow-1`. Beberapa komponen memakai `--shadow-md` (Modal, Dropdown, Section Message, Time Picker, Tourguide, dll.) — ikuti halaman referensi; tidak custom shadow |
| Bahasa | `lang="id"` |
| State doc | Modifier `--hover`, `--focus`, `--press` untuk matrix dokumentasi; interaksi produksi memakai `:hover`, `:focus-visible`, `:active` di CSS |

---

## Avatar

**File:** `components/Avatar/avatar.html`

| | |
|---|---|
| **Purpose** | Representasi visual identitas pengguna; opsi presence indicator |
| **Variants** | — |
| **Sizes** | `ds-avatar--sm`, `--md`, `--lg`, `--xl` |
| **States** | — (presence via `ds-avatar__presence`) |
| **Structure** | `<div class="ds-avatar">` → `<img class="ds-avatar__image">` + optional `<div class="ds-avatar__presence">` |
| **Accessibility** | `alt` pada image; `aria-label` pada container bila perlu |
| **Tailwind** | Doc shell: `rounded-2xl`, `bg-neutral-n900`; komponen: token radius/border via CSS |

**DO**

- Pilih satu ukuran (`--sm` … `--xl`) konsisten dalam konteks yang sama
- Gunakan presence indicator sesuai status online/offline di doc

**DON'T**

- Jangan campur ukuran avatar dalam satu baris toolbar tanpa alasan layout
- Jangan ganti path ikon ke library eksternal

---

## Badge

**File:** `components/Badge/badge.html`

| | |
|---|---|
| **Purpose** | Label kecil untuk jumlah atau status |
| **Variants** | `ds-badge--default`, `--primary`, `--subtle`, `--important`, `--added`, `--removed` |
| **Sizes** | — |
| **States** | — |
| **Structure** | `<div class="ds-badge">` → `span.ds-badge__prefix` (added/removed) + `span.ds-badge__content` |
| **Accessibility** | `aria-label` jika hanya angka/ikon tanpa teks konteks |
| **Tailwind** | Warna semantic via CSS vars di `<style>` |

**DO**

- Gunakan variant semantic (`--added`, `--removed`) untuk diff status

**DON'T**

- Jangan jadikan badge sebagai satu-satunya label aksi tanpa teks

---

## Breadcrumbs

**File:** `components/Breadcrumbs/breadcrumbs.html`

| | |
|---|---|
| **Purpose** | Navigasi hierarki halaman |
| **Variants** | `ds-bc-container--truncated`; `ds-bc-item--default`, `--hover`, `--focus`, `--press`; `ds-bc-text--truncated` |
| **Sizes** | — |
| **States** | Item: `--hover`, `--focus`, `--press` |
| **Structure** | `<nav class="ds-bc-container" aria-label="…">` → `button.ds-bc-item` + `span.ds-bc-sep` + `span.ds-bc-text` |
| **Accessibility** | `aria-label` pada nav; `aria-current="page"` pada item aktif; separator `aria-hidden` |
| **Tailwind** | `text-body-sm`, warna `text-neutral-n*` |

**DO**

- Tandai halaman aktif dengan `aria-current="page"`
- Gunakan `--truncated` saat path panjang

**DON'T**

- Jangan gunakan `<div>` menggantikan `<nav>` untuk breadcrumb utama

---

## Button

**File:** `components/Button/button.html`

| | |
|---|---|
| **Purpose** | Trigger aksi pengguna |
| **Variants** | `ds-btn--primary`, `--subtle`, `--subtle-link`, `--danger`, `--warning`, `--link`, `--icon-only`, `--compact`, `--loading`, `--none` |
| **Sizes** | `--compact`, `--icon-only` |
| **States** | `--hover`, `--focus`, `--press`, `--disabled`, `--selected`; loading via `--loading` + `.ds-spinner` |
| **Structure** | `<button type="button" class="ds-btn">` → label + optional spinner |
| **Accessibility** | Native `<button>`; `aria-label` (icon-only); `aria-busy` (loading); `aria-pressed`; `disabled` |
| **Tailwind** | Komponen: `--font-size-sm`, `--font-weight-medium`; variant bg via `var(--color-blue-b*)`, `var(--color-neutral-n*)` |

**DO**

- Gunakan `ds-btn--primary` untuk CTA utama
- Gunakan `ds-btn--danger` hanya untuk aksi destruktif
- Beri `aria-label` pada `ds-btn--icon-only`
- Loading: `ds-btn--loading` + `aria-busy`

**DON'T**

- Jangan pakai button default sebagai primary CTA (gunakan `--primary`)
- Jangan letakkan beberapa `ds-btn--primary` berdampingan
- Jangan pakai `--compact` untuk primary CTA utama / layout luas (tap target)
- Jangan gunakan library ikon eksternal

---

## Calendar

**File:** `components/Calendar/calendar.html`

| | |
|---|---|
| **Purpose** | Grid pemilih tanggal (month/week/day parts + composed) |
| **Variants** | `ds-calendar-day--outside`, `--today`, `--selected`, `--range`, `--disabled`, `--text-subtle` |
| **Sizes** | — |
| **States** | `--state-hover`, `--state-pressed`, `--state-focus` |
| **Structure** | `div.ds-calendar` → header + `div.ds-calendar__body` → `button.ds-calendar-day` |
| **Accessibility** | `role="grid"`, `row`, `columnheader`, `group`; `aria-label`; `aria-selected`; `aria-disabled`; `aria-current="date"` |
| **Tailwind** | Layout grid di custom CSS; `shadow-1` pada panel terkait |

**DO**

- Pertahankan pola grid ARIA pada sel hari
- Tandai hari ini dengan `aria-current="date"` / `--today`

**DON'T**

- Jangan hilangkan `aria-disabled` pada hari non-interaktif

---

## Checkbox

**File:** `components/Checkbox/checkbox.html`

| | |
|---|---|
| **Purpose** | Pilihan boolean / indeterminate |
| **Variants** | `ds-checkbox--error`, `--disabled`, `--snapshot` |
| **Sizes** | Box 16×16px (dokumentasi) |
| **States** | `ds-checkbox__box--checked`, `--indeterminate`, `--hover`, `--pressed`, `--focus`, `--focus-unchecked`, `--error`, `--error-unchecked`, `--disabled` |
| **Structure** | `<label class="ds-checkbox">` → `input.ds-checkbox__input` + `span.ds-checkbox__box` + `span.ds-checkbox__icon` + `span.ds-checkbox__label` |
| **Accessibility** | Input native; `aria-invalid`; dekorasi `aria-hidden`; pesan error teks terpisah |
| **Tailwind** | `rounded-sm` pada box |

**DO**

- Selalu bungkus dengan `<label>` + input native
- Tampilkan pesan error saat `--error`

**DON'T**

- Jangan ganti input dengan div clickable saja
- Jangan hapus `aria-hidden` pada box visual

---

## Date Picker

**File:** `components/Date picker/date-picker.html`

| | |
|---|---|
| **Purpose** | Input tanggal: trigger Select + panel Calendar |
| **Variants** | `ds-select-trigger--hover`, `--focus`; day: `ds-calendar-day--outside`, `--selected` |
| **Sizes** | — |
| **States** | Trigger focus/hover; day selected |
| **Structure** | `div.ds-date-picker` → `button.ds-select-trigger` + panel `ds-calendar` |
| **Accessibility** | `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`, `role="dialog"`, calendar `role="grid"` |
| **Tailwind** | Panel: `shadow-1`, `rounded-xl` |

**DO**

- Reuse `ds-select-trigger` + `ds-calendar` tanpa duplikasi token

**DON'T**

- Jangan buat panel kalender tanpa `aria-expanded` pada trigger

---

## Date Time Picker

**File:** `components/Date time picker/date time picker.html`

| | |
|---|---|
| **Purpose** | Tanggal dan waktu dalam satu kontrol |
| **Variants** | `ds-date-time-picker__bar--hover`, `--focus`; `__dropdown--date`, `--time`; `__segment--date`, `--time`, `--active` |
| **Sizes** | — |
| **States** | Segmen `--active`; bar hover/focus |
| **Structure** | `div.ds-date-time-picker` → `__bar` + `__segment` + `__dropdown` |
| **Accessibility** | `aria-haspopup`, `aria-expanded`, `role="dialog"`, `listbox`, `grid` |
| **Tailwind** | Segmen aktif: `text-neutral-n0` (doc) |

**DO**

- Pisahkan dropdown date vs time dengan modifier `__dropdown--*`

**DON'T**

- Jangan gabungkan listbox time tanpa `role="listbox"` / `option`

---

## Dropdown Button

**File:** `components/dropdown/dropdown.html`

| | |
|---|---|
| **Purpose** | Menu aksi dari tombol |
| **Variants** | `ds-dropdown-btn--icon-only`; `ds-dropdown-menu--scrollable`; `ds-dropdown-item--hover`, `--pressed`, `--selected`, `--selected-hover`, `--selected-pressed`, `--disabled`, `--no-lead`, `--no-trail` |
| **Sizes** | `--icon-only` pada trigger |
| **States** | Item hover/pressed/selected |
| **Structure** | `div.ds-dropdown` → `button` (+ `ds-btn`) + `div.ds-dropdown-menu` → `button.ds-dropdown-item` (`__lead`, `__label`, `__trail`, `__checkbox`, `__radio`) |
| **Accessibility** | `role="menu"`, `menuitem`, `menuitemcheckbox`, `menuitemradio`; `aria-expanded`, `aria-haspopup="menu"`, `aria-checked` |
| **Tailwind** | Menu: `shadow-1`, `rounded-xl` |

**DO**

- Gunakan `ds-dropdown-item--selected` + `aria-checked` untuk checkbox/radio item

**DON'T**

- Jangan buka menu tanpa `aria-expanded` pada trigger

---

## Flags

**File:** `components/Flags/flags.html`

| | |
|---|---|
| **Purpose** | Banner notifikasi global collapsible |
| **Variants** | `ds-flag--normal`, `--success`, `--error`, `--warning`, `--info`, `--collapsed` |
| **Sizes** | — |
| **States** | `ds-flag-part--hover`, `--press`, `--focus`; `ds-flag__action--link`, `--primary` |
| **Structure** | `div.ds-flag` → `__header`, `__main`, `__title`, `__icon`, `__body`, `__actions`, `button.ds-flag-part` |
| **Accessibility** | `role="region"`, `aria-expanded`, `aria-controls`, `aria-label` pada dismiss/expand |
| **Tailwind** | Background semantic via CSS vars (`success`, `error`, dll.) |

**DO**

- Ikon dismiss: `icon-x-mark.svg`, chevron: `icon-chevron-down.svg` dari `assets/icons`
- `aria-label` pada tombol ikon; `aria-expanded` pada collapse

**DON'T**

- Jangan teks "X" sebagai dismiss
- Jangan hex hardcoded
- Jangan beberapa dismiss dalam satu flag
- Jangan hapus ring focus

---

## Form

**File:** `components/Form/form.html`

| | |
|---|---|
| **Purpose** | Baris label + field + pesan validasi |
| **Variants** | `ds-form-row--default`, `--valid`, `--invalid`; `ds-form-message--error`, `--information`, `--true` |
| **Sizes** | — |
| **States** | Row invalid/valid |
| **Structure** | `div.ds-form-row` → `p.ds-form-row__label` + `div.ds-form-row__field` + `p.ds-form-message` |
| **Accessibility** | `role="alert"` pada pesan error |
| **Tailwind** | `gap-150`, `text-body-sm` |

**DO**

- Pasangkan `--invalid` row dengan `ds-form-message--error`

**DON'T**

- Jangan tampilkan error tanpa `role="alert"` pada pesan

---

## Inline Edit

**File:** `components/Inline edit/inline-edit.html`

| | |
|---|---|
| **Purpose** | Edit nilai inline dengan konfirmasi/batal |
| **Variants** | `ds-inline-edit--default`, `--hover`, `--press`, `--focus`, `--disabled`; `ds-inline-edit-host--active`; `ds-inline-edit__input--typing`; `ds-inline-edit-btn--confirm`, `--cancel` (+ hover/press/focus) |
| **Sizes** | — |
| **States** | Host `--active`; input `--typing` |
| **Structure** | `div.ds-inline-edit-host` → `div.ds-inline-edit` → `__input`, `__actions`, `button.ds-inline-edit-btn` |
| **Accessibility** | `aria-label` (edit, confirm, cancel); `aria-disabled` |
| **Tailwind** | Reuse state `ds-select-trigger--*` di host |

**DO**

- Gunakan tombol confirm/cancel terpisah dengan label jelas

**DON'T**

- Jangan hilangkan escape/cancel saat mode edit aktif

---

## Lozenge

**File:** `components/Lozenge/lozenge.html`

| | |
|---|---|
| **Purpose** | Status pill ringkas (Jira-style) |
| **Variants** | `ds-lozenge--default`, `--bold`, `--new`, `--removed`, `--success`, `--inprogress`, `--moved` |
| **Sizes** | — |
| **States** | — |
| **Structure** | `<span class="ds-lozenge">` teks |
| **Accessibility** | Makna dari teks lozenge |
| **Tailwind** | `rounded-sm`, ukuran caption |

**DO**

- Gunakan `--bold` untuk penekanan status

**DON'T**

- Jangan lozenge sebagai satu-satunya indikator tanpa konteks halaman

---

## Modal

**File:** `components/Modal/modal.html`

| | |
|---|---|
| **Purpose** | Dialog overlay konfirmasi/informasi |
| **Variants** | `modal-header-icon--warning`, `--danger` |
| **Sizes** | `modal-size-xs`, `modal-size-sm`, `modal-size-md`, `modal-size-lg` |
| **States** | — |
| **Structure** | `article.modal-composition-item` → `div.modal-composition-body` → `div.modal-header-item` + `p.modal-body-text-short|long` + `div.modal-footer-container` → `ds-btn` |
| **Accessibility** | Focus trap (script doc); ikon header dekoratif `aria-hidden` |
| **Tailwind** | `rounded-2xl`, `shadow-1` |

**DO**

- Teks pendek untuk konfirmasi sederhana
- Warning/danger icon variant untuk risiko
- Footer: cancel `ds-btn--subtle`, primary kanan

**DON'T**

- Jangan lebih dari 2 aksi primary
- Jangan `modal-header-icon--danger` untuk non-destruktif
- Jangan teks panjang tanpa area scroll

---

## Navigation Menu

**File:** `components/Navigation menu/navigation.html`

| | |
|---|---|
| **Purpose** | Sidebar navigasi vertikal (parts + composed) |
| **Variants** | `ds-sidebar-nav-expand--hide`, `--interactive`; `ds-nav-mainmenu-snap--hover`, `--press`, `--selected`, `--leaf`; `ds-nav-submenu-snap--*`, `--no-trail`; `ds-nav-menu-search--default`, `--hover`, `--focus`, `--typing`, `--rest`; `ds-nav-heading-snap--no-icons` |
| **Sizes** | — |
| **States** | Item selected/hover/press |
| **Structure** | `div.ds-sidebar-nav-expand` → `ds-nav-heading-snap`, `ds-nav-mainmenu-snap`, `ds-nav-submenu-snap`, `ds-nav-menu-search`, `ds-nav-composed`, `ds-nav-divider` |
| **Accessibility** | `aria-expanded` submenu; `aria-current` item aktif; `:focus-visible` pada snap |
| **Tailwind** | Token `sidebar-*`, `bg-sidebar`, `text-sidebar-link` |

**DO**

- Tandai item aktif dengan `--selected`
- Gunakan pasangan ikon sidebar off/on dari `assets/icons`

**DON'T**

- Jangan hapus focus visible pada item interaktif

---

## Page Header

**File:** `components/Page Header/page-header.html`

| | |
|---|---|
| **Purpose** | Judul halaman, breadcrumb, aksi, search, filter, toolbar tabel |
| **Variants** | `ds-page-header--actions-on`, `--toolbar-on`, `--subfilters-on`; `ds-page-header__row--toolbar` |
| **Sizes** | `ds-btn--icon-only` pada actions |
| **States** | `ds-select-trigger--focus` di demo |
| **Structure** | `<header class="ds-page-header">` → `__row`, `__start`, `__title` (`h1`), `__actions`, `__search`, `__filter`, `__subfilters`, `__toolbar` |
| **Accessibility** | `aria-label` preview; breadcrumb `nav` + label |
| **Tailwind** | Flex layout, `gap-200` |

**DO**

- Compose `ds-bc-*`, `ds-btn`, `ds-select-trigger` yang sudah ada

**DON'T**

- Jangan override token warna header dengan hex

---

## Page Layout

**File:** `components/Page layout/page-layout.html`

| | |
|---|---|
| **Purpose** | Shell halaman: topnav, sidebar/drawer, konten, footer nav |
| **Variants** | `ds-page-layout--website`, `--tablet`, `--mobile`, `--menu-expand`, `--submenu-on`; nested: `ds-topnav--website|tablet|mobile`, `ds-banner--success`, dll. (demo composition) |
| **Sizes** | `ds-topnav--lg`, `--icon-only` |
| **States** | — |
| **Structure** | `div.ds-page-layout` → `__body` → `__aside`, `__drawer`, `__overlay`, `__content`, `__nav-main`, `__nav-sub` |
| **Accessibility** | `role="banner"`, `contentinfo`, `region`, `status` pada komposisi |
| **Tailwind** | Full-height flex; token layout |

**DO**

- Gunakan root `ds-page-layout` + variant breakpoint (`--website`, `--tablet`, `--mobile`)
- Compose child components (topnav, page header, table) tanpa rewrite CSS mereka

**DON'T**

- Jangan hardcode token spacing/warna di shell
- Jangan sidebar persisten di tablet/mobile (sesuai doc)
- Jangan campur variant topnav dalam satu layout
- Jangan beberapa banner sekaligus

---

## Pagination

**File:** `components/Pagination/pagination.html`

| | |
|---|---|
| **Purpose** | Navigasi halaman data |
| **Variants** | `ds-pagination__item--active`, `--ellipsis`, `--prev`, `--next` |
| **Sizes** | — |
| **States** | `--active` |
| **Structure** | `<nav class="ds-pagination" aria-label="Pagination">` → `button|span.ds-pagination__item` |
| **Accessibility** | `aria-current="page"` pada aktif; `aria-hidden` ellipsis; `aria-label` prev/next |
| **Tailwind** | `rounded-md` item |

**DO**

- Bungkus dengan `nav` + `aria-label="Pagination"`
- Chevron + label pada prev/next
- Ellipsis dengan `aria-hidden`

**DON'T**

- Jangan tampilkan semua nomor halaman pada set besar
- Jangan hardcode warna item

---

## Popup

**File:** `components/Popup/popup.html`

| | |
|---|---|
| **Purpose** | Panel kontekstual terikat anchor (bukan modal fullscreen) |
| **Variants** | `popup-anchor-wrap--left`, `--center`, `--right` |
| **Sizes** | — |
| **States** | — |
| **Structure** | `div.popup-anchor-wrap` → trigger `button` + `div.popup-part-panel` |
| **Accessibility** | `aria-live="polite"` (playground doc) |
| **Tailwind** | `shadow-1` pada panel |

**DO**

- Pilih posisi anchor (`--left`, `--center`, `--right`) sesuai ruang layar

**DON'T**

- Jangan gunakan popup untuk konten yang membutuhkan focus trap penuh (gunakan Modal)

---

## Radio

**File:** `components/Radio/radio.html`

| | |
|---|---|
| **Purpose** | Pilihan tunggal dalam grup |
| **Variants** | `ds-radio--error`, `--disabled`, `--snapshot`; `ds-radio-group--snapshot` |
| **Sizes** | — |
| **States** | `ds-radio__circle--hover`, `--pressed`, `--focus`, `--checked`, `--error`, `--disabled` |
| **Structure** | `label.ds-radio` → `input.ds-radio__input` + `span.ds-radio__circle` + `span.ds-radio__label`; grup: `fieldset.ds-radio-group` + `legend` |
| **Accessibility** | `name` sama dalam grup; `aria-invalid`; circle `aria-hidden` |
| **Tailwind** | `rounded-full` pada circle |

**DO**

- Gunakan `fieldset` + `legend` untuk grup

**DON'T**

- Jangan radio tanpa shared `name`

---

## Range

**File:** `components/Range/range.html`

| | |
|---|---|
| **Purpose** | Slider nilai numerik 0–100% |
| **Variants** | `ds-range--empty`, `--filled`, `--disabled`, `--interactive`, `--snapshot`, `--value-0`, `--value-50`, `--value-100` |
| **Sizes** | Thumb 16px (doc) |
| **States** | `ds-range__thumb--hover`, `--pressed`; `ds-range__track--focus`, `--pressed` |
| **Structure** | `div.ds-range` → `div.ds-range__track` → `__fill`, `__thumb` + `input.ds-range__input` type="range" |
| **Accessibility** | `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label` |
| **Tailwind** | Visual track dari `assets/images/range=*.svg` |

**DO**

- Gunakan asset range default/hover/press dari `assets/images/`

**DON'T**

- Jangan slider tanpa label/aria-label

---

## Section Message

**File:** `components/section messages/section-message.html`

| | |
|---|---|
| **Purpose** | Pesan kontekstual in-page (bukan toast) |
| **Variants** | `ds-section-message--information`, `--success`, `--warning`, `--error`, `--discovery` |
| **Sizes** | — |
| **States** | — |
| **Structure** | `div.ds-section-message` → `__icon`, `__main` → `__header`, `__title`, `__description`, `__actions`, `__action` |
| **Accessibility** | `role="region"`, `aria-labelledby` → id judul |
| **Tailwind** | Border/background semantic per variant |

**DO**

- Maksimal 2 tautan aksi (sesuai doc halaman)
- Ring fokus tautan: `Border.Focused` / `b200`

**DON'T**

- Jangan gunakan sebagai pengganti Toast Banner global

---

## Select

**File:** `components/Select/select.html`

| | |
|---|---|
| **Purpose** | Halaman doc fokus **Option Part** + trigger/listbox (komponen pilih nilai) |
| **Variants** | Trigger: `ds-select-trigger--subtle`, `--none`, `--hover`, `--focus`, `--typing`, `--loading`, `--empty`, `--hydrate`, `--reset`, `--filled-invalid`, `--invalid`, `--disabled`; Option: `ds-option--hover`, `--pressed`, `--selected`, `--selected-hover`; `ds-option__control--checkbox`, `--radio` |
| **Sizes** | — |
| **States** | Trigger typing/loading/empty; option selected |
| **Structure** | `div.ds-select-trigger` → `__value`, `__icon`; menu `div.ds-option` → `__control`, `__icon-slot`; `div.ds-groups`, `ds-group-label` |
| **Accessibility** | `role="listbox"`, `option`; `aria-expanded`, `aria-busy`, `aria-multiselectable`, `aria-label` |
| **Tailwind** | `shadow-1`, `rounded-lg` trigger |

**DO**

- Reuse `ds-option` untuk single/multi/checkbox/radio select

**DON'T**

- Jangan listbox tanpa `aria-expanded` pada trigger

---

## Table

**File:** `components/Table/table.html`

| | |
|---|---|
| **Purpose** | Tabel data + parts (sort, kolom, sel) + pagination |
| **Variants** | `ds-table--data`, `--sticky-head`, `--row-hover`; `ds-table-sort--asc`, `--desc`; `ds-table-header-cell--empty`, `--checkbox`; `ds-table-cell--hover`, `--focused`; kolom `ds-table-col-*--hover` |
| **Sizes** | — |
| **States** | Sort asc/desc; cell hover/focused |
| **Structure** | `div.ds-table-scroll` → `table.ds-table` → `th.ds-table-header-cell`, `td.ds-table-cell`, tipe kolom `ds-table-col-text|link|status|…` |
| **Accessibility** | `role="columnheader"`; `aria-sort`; scroll region `role="region"` + `tabindex="0"` |
| **Tailwind** | Sticky head via CSS |

**DO**

- Bungkus dengan `.ds-table-scroll` + `.ds-table--sticky-head` bila perlu

**DON'T**

- Jangan hapus wrapper scroll pada tabel lebar

---

## Tabs

**File:** `components/Tabs/tabs.html`

| | |
|---|---|
| **Purpose** | Navigasi tab horizontal |
| **Variants** | `ds-tab--selected`, `--required`, `--notification`; `ds-tablist--track` |
| **Sizes** | — |
| **States** | `--hover`, `--press`, `--focus` |
| **Structure** | `div.ds-tablist` → `button.ds-tab` → `__label`, `__indicator`, `__badge`, `__required` |
| **Accessibility** | `role="tablist"`, `tab`, `tabpanel`; `aria-selected` |
| **Tailwind** | Border-bottom selected |

**DO**

- Satu tab `.ds-tab--selected` / `aria-selected="true"`
- Notifikasi via `ds-badge--important` di slot badge

**DON'T**

- Jangan dua tab aktif bersamaan
- Jangan `ds-tablist--track` diabaikan bila desain memakai track

---

## Tags

**File:** `components/Tags/tags.html`

| | |
|---|---|
| **Purpose** | Chip label; opsi removable |
| **Variants** | `ds-tag--standard`, `--removable`, `--greylight`, `--bluelight`, `--greenlight`, `--purplelight`, `--redlight`, `--yellowlight` |
| **Sizes** | — |
| **States** | `--state-hover`, `--state-pressed`, `--state-focus`; `ds-tag__remove--state-focus` |
| **Structure** | `span.ds-tag` → `__icon`, `__label`, `button.ds-tag__remove` |
| **Accessibility** | `aria-label` pada remove ("Hapus tag…") |
| **Tailwind** | Background light semantic |

**DO**

- Gunakan variant warna light untuk kategori

**DON'T**

- Jangan remove tanpa `aria-label`

---

## Text Area

**File:** `components/Text Area/text area.html`

| | |
|---|---|
| **Purpose** | Input multi-baris |
| **Variants** | `ds-text-area--compact`, `--invalid` |
| **Sizes** | `--compact` |
| **States** | `ds-text-area__field--hover`, `--focus`, `--invalid`, `--disabled` |
| **Structure** | `div.ds-text-area` → `textarea.ds-text-area__field` |
| **Accessibility** | `aria-invalid`, `aria-describedby` (bila ada di contoh) |
| **Tailwind** | `rounded-lg`, `border-1` |

**DO**

- Pola token sama dengan Text Field

**DON'T**

- Jangan resize handle yang melanggar layout tanpa token spacing

---

## Text Field

**File:** `components/Text Field/text field.html`

| | |
|---|---|
| **Purpose** | Input satu baris + Phone, Icon, Search-select |
| **Variants** | `ds-text-field--compact`, `--subtle`, `--none`, `--invalid`, `--monospaced`, `--disabled`, `--snapshot`; `ds-phone-field--*`, `ds-icon-text-field--*`, `ds-search-select-field--*`; input/group `--hover`, `--focus`, `--invalid`, `--disabled`, `--searching` |
| **Sizes** | `--compact` |
| **States** | hover, focus, invalid, disabled, snapshot |
| **Structure** | `div.ds-text-field` → `input.ds-text-field__input`; variant: `ds-phone-field` + `__group`, `__prefix`; `ds-icon-text-field`; `ds-search-select-field` |
| **Accessibility** | `aria-invalid`, `aria-describedby`, `aria-label` (search/clear) |
| **Tailwind** | `rounded-lg`; compact: spacing `space-100` |

**DO**

- Pilih appearance `--subtle` / `--none` sesuai konteks form
- Tampilkan error dengan `--invalid` + describedby

**DON'T**

- Jangan campur monospaced dengan phone field tanpa kebutuhan doc

---

## Time Picker

**File:** `components/Time picker/time-picker.html`

| | |
|---|---|
| **Purpose** | Pilih waktu: trigger + list interval 30 menit |
| **Variants** | `ds-select-trigger--subtle`, `--focus`, `--disabled` |
| **Sizes** | — |
| **States** | Trigger focus/disabled |
| **Structure** | `button.ds-select-trigger` + `div.ds-time-picker` → `__menu` (options) |
| **Accessibility** | `aria-expanded`, `aria-controls`, `role="listbox"`, `option`, `group` |
| **Tailwind** | Sama pola Select |

**DO**

- Reuse `ds-select-trigger` states

**DON'T**

- Jangan opsi waktu tanpa struktur listbox

---

## Toast Banner

**File:** `components/Toast-Banner/banner.html`

| | |
|---|---|
| **Purpose** | Pesan kontekstual full-width |
| **Variants** | `ds-banner--announcement`, `--success`, `--warning`, `--error` |
| **Sizes** | — |
| **States** | — |
| **Structure** | `div.ds-banner` → `div.ds-banner__icon` + `span.ds-banner__text` — **tanpa** tombol dismiss di implementasi saat ini |
| **Accessibility** | Makna dari teks banner; ikon dekoratif `alt=""` + `aria-hidden="true"` bila tidak informatif |
| **Tailwind** | Warna semantic icon/teks |

**DO**

- Pilih variant semantic sesuai jenis pesan

**DON'T**

- Jangan campur dengan `ds-section-message` untuk pesan in-page panjang
- Jangan dokumentasikan atau tambahkan dismiss button kecuali implementasi di `banner.html` diperbarui

---

## Toggle

**File:** `components/Toggle/toggle.html`

| | |
|---|---|
| **Purpose** | Switch boolean on/off |
| **Variants** | `ds-toggle--large`, `--disabled`, `--snapshot` |
| **Sizes** | `ds-toggle--large` (satu-satunya size modifier; jangan pakai `--lg` — hanya teks salin doc lama di halaman HTML) |
| **States** | `ds-toggle__track--on`, `--hover-on`, `--hover-off`, `--focus`, `--disabled`; `ds-toggle__icon--on`, `--off` |
| **Structure** | `label.ds-toggle` → `input.ds-toggle__input` + `span.ds-toggle__track` → `span.ds-toggle__thumb` + icons |
| **Accessibility** | `role="switch"`, `aria-checked`, `aria-label` |
| **Tailwind** | `rounded-full` track |

**DO**

- Native input di dalam label + switch semantics

**DON'T**

- Jangan toggle tanpa `aria-checked` yang sinkron dengan state

---

## Tooltip

**File:** `components/Tooltip/tooltip.html`

| | |
|---|---|
| **Purpose** | Label bantu pada hover/focus |
| **Variants** | `ds-tooltip--top`, `--bottom`, `--position-left`, `--position-center`, `--position-right`; `ds-tooltip-part--truncate`, `--overflow` |
| **Sizes** | — |
| **States** | — |
| **Structure** | `div.ds-tooltip` → trigger + `span.ds-tooltip-part` (pointer + label) |
| **Accessibility** | `role="tooltip"`, `aria-label` |
| **Tailwind** | `shadow-1`, bg `neutral-n800` (doc) |

**DO**

- Pilih `--top` / `--bottom` + posisi horizontal

**DON'T**

- Jangan tooltip sebagai satu-satunya label kontrol (perlu label visible)

---

## Top & Bottom Navigation

**File:** `components/Top & bottom Navigation/top-bottom-nav.html`

| | |
|---|---|
| **Purpose** | Top bar aplikasi + footer pager |
| **Variants** | `ds-topnav--website`, `--tablet`, `--mobile`; `ds-topnav__logo--start`, `--center`; `ds-topnav__notif--secondary`; `ds-topnav-logo--hover`, `--press` |
| **Sizes** | `--lg`, `--icon-only` |
| **States** | Logo hover/press |
| **Structure** | `header.ds-topnav` → `__menu`, `__logo`, `__center`, `__end`, `__akses`, `__notif`; `footer.ds-footer-nav` → `__actions`, `__pager`, `__nav-btns` |
| **Accessibility** | `role="banner"`, `aria-label` pada logo/footer/pager |
| **Tailwind** | Compose `ds-btn`, `ds-badge`, `ds-avatar` |
| **Assets** | `assets/images/logo-parts.svg` |

**DO**

- Satu variant topnav per breakpoint (`--website`, `--tablet`, `--mobile`)

**DON'T**

- Jangan campur variant topnav dalam satu viewport

---

## Tourguide

**File:** `components/Tourguide/tourguide.html`

| | |
|---|---|
| **Purpose** | Onboarding: spotlight, langkah tour, progress, aksi |
| **Variants** | — (parts: `ds-btn-spotlight--hover`, `--press`, `--focus`; `ds-btn-onboarding-replay--*`) |
| **Sizes** | — |
| **States** | Hover/press/focus pada tombol spotlight/replay |
| **Structure** | `div.ds-tourguide` → `__title`, `__text`, `__body`, `__progress`, `__footer`; `div.ds-spotlight-card` → `__head`, `__title`, `__body`, `__footer`, `__close`; `button.ds-btn-spotlight`, `ds-btn-onboarding-replay` |
| **Accessibility** | `aria-label` pada article/tutup spotlight |
| **Tailwind** | `bg-blue-b300`, `shadow-md` pada card; `rounded-2xl` |

**DO**

- Judul singkat; instruksi satu kalimat
- Progress langkah (mis. 1/3)

**DON'T**

- Jangan instruksi multi-paragraf panjang
- Jangan tanpa cara dismiss/tutup spotlight

---

## Referensi

| Dokumen | Path |
|---|---|
| Knowledge base | `Docs/design-system-knowledge.md` |
| Design principles | `Docs/design-principles.md` |
| Aturan agent | `CLAUDE.md` |
| Implementasi | `components/*/*.html` |
