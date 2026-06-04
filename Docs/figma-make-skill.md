# GPOS Lite — Figma Make Skill

> **Instruksi desain untuk Figma Make.** Terjemahan implementasi repositori `DS-Gpos-Lite-V2` menjadi panduan visual — bukan sistem desain baru.

**Source of truth:** `styles/tokens.css`, `foundations/*/*.html`, `components/*/*.html`, `components/*/figma/` (referensi visual). Folder `.claude/references/` **kosong saat ini** — reserved untuk anatomy spec.

**Dokumen terkait:** `Docs/design-system-knowledge.md` · `Docs/design-principles.md` · `Docs/component-rules.md` · `CLAUDE.md`

---

## Cara pakai di Figma Make

1. Tempel bagian **Foundations** + **Components** yang relevan ke prompt.
2. Gunakan **nama token Figma** yang sudah dipetakan (`Space.200`, `Corner.100`, `Text.Body.Medium.Regular`, `Shadow 1`).
3. Untuk proporsi, buka halaman HTML komponen dan folder `components/*/figma/` (bila ada).
4. Bila anatomy spec ditambahkan ke `.claude/references/`, ikuti proporsi di sana; sampai itu **jangan estimasi** spacing/radius di luar skala token.
5. Bahasa UI contoh: **Indonesia** (`lang="id"` di implementasi).

---

## Larangan (Figma Make)

| Jangan | Lakukan |
|---|---|
| Bahasa visual / palet baru | GP Lite tokens (`blue-b*`, `neutral-n*`, semantic) |
| Komponen atau variant baru | 34 komponen + modifier di `Docs/component-rules.md` |
| Skala spacing baru | `Space.025` … `Space.1000` (2–80px) |
| Skala tipografi baru | 19 text styles + Poppins |
| Shadow custom | Hanya token existing: **Shadow 1** (default) dan **shadow-md** (komponen yang sudah memakainya) |
| Gradien dekoratif dominan | Brand solid `#1E7FD6`; gradien hanya jika sudah di contoh (mis. sidebar logo doc) |
| Layout padat | Whitespace lapang, section spacing besar |
| Ikon set eksternal | Katalog `assets/icons/` (146 entri doc, 188 file) |
| Beberapa primary CTA berdampingan | Satu `Button / Primary` per area |

---

## Design language

| Aspek | Implementasi repo |
|---|---|
| Produk | GPOS Lite Design System V2 — dashboard SaaS premium |
| Brand | **GPOS Blue** `#1E7FD6` — token `blue-b300` / `primary-500` |
| Suasana | Hierarki bersih, permukaan lembut, kepadatan terkontrol, alignment rapi |
| Prioritas | Akurasi & konsistensi di atas improvisasi (`CLAUDE.md`, `style_guide.md`) |
| Chrome vs konten | Sidebar gelap `#0B1526` (dokumentasi DS) + area konten terang `#F8FAFC` / `#FFFFFF` |
| Interaksi | Hover/focus **subtle**; transisi 150–300ms; tanpa animasi agresif |
| Komponen | BEM `ds-*` di kode — di Figma: gunakan nama komponen yang sama dengan halaman doc |

---

## Visual style

### Permukaan & layer

| Layer | Token / hex | Pemakaian |
|---|---|---|
| Page background | `--color-background` `#F8FAFC` | Latar halaman aplikasi |
| Surface / card | `--color-surface` `#FFFFFF` | Kartu, panel, input |
| Border default | `--color-border` `#E2E8F0` / `neutral-n40` | Outline kartu, input |
| Text primary | `--color-text-primary` `#0F172A` | Judul, label utama |
| Text secondary | `--color-text-secondary` `#475569` | Deskripsi, paragraf |

### Elevation

**Shadow 1** (default — card, dropdown, modal, floating CTA):

- Layer 1: `0 0 1px rgba(9, 30, 66, 0.31)`
- Layer 2: `0 8px 12px rgba(9, 30, 66, 0.15)`
- Base: `#091E42` (`neutral-n900`)

**Shadow md** (sekunder — dipakai di implementasi untuk Modal, Dropdown, Section Message, Time Picker, Tourguide spotlight, dll.): gunakan token `--shadow-md` yang ada, bukan shadow custom.

Latar panel harus **terang/putih** agar shadow terbaca. Jangan tumpuk shadow.

### Radius (Corner tokens)

| Corner | px | Komponen |
|---|---|---|
| Corner.0 | 0 | Tabel, divider struktural |
| sm | 4 | Checkbox, radio |
| **Corner.100 ★** | **8** | **Button, input, textarea (default)** |
| Corner.150 | 12 | Card, dropdown surface |
| Corner.200 | 16 | Dropdown panel, hero doc |
| 2xl | 24 | Modal |
| Full | pill | Avatar, toggle, tag pill |

Satu radius per komponen — jangan campur 8px dan 12px dalam satu control.

### Kartu & section

- Border lembut + **Shadow 1** minimal
- Padding konsisten: **Space.200 (16px)** default; **Space.300 (24px)** section
- Jarak antar section: **Space.400–1000** (32–80px)

---

## Foundations

### Colors (GP Lite + semantic)

**Brand & aksi:** `blue-b300` `#1E7FD6` · hover `b400` `#155996` · press `b500` `#124D83` · tint `b50` `#E9F2FB`

**Neutral (UI chrome & teks):** `n0` `#FFFFFF` … `n900` `#091E42` — teks utama `n900`; hindari `n0–n30` untuk teks; hindari `n800–n900` sebagai background luas.

**Semantic families (notifikasi / status):**

| Family | Base (contoh) | Peran |
|---|---|---|
| Orange `o*` | `o300` `#FF9015` | Warning |
| Red `r*` | `r300` `#EC1C24` | Error / danger |
| Green `g*` | `g300` `#00AA5B` | Success |
| Purple `p*` | `p300` `#6E3EF6` | Aksen (bukan brand) |

**Semantic UI:** Background, Text, Border, Icon, Notification, Elevation — pakai grup di `foundations/colors/colors.html`, bukan hex acak.

**Sidebar chrome (doc):** `sidebar-bg` `#0B1526`, link `#94A3B8`, active border `#1E7FD6`.

### Typography

| Aturan | Nilai |
|---|---|
| Font | **Poppins** only (300–700) |
| Body default | **Text.Body.Medium.Regular** — 16px / 24px lh / 400 |
| UI kecil / button | **Text.Body.Small** — 14px / 20px |
| Metadata | **Text.Caption** — 12px |
| Section label | **Text.Overline.Medium** — 12px, uppercase, ls 0.1em |
| Page title | **Text.Title.Medium** — 20px / 500 |
| Hero | **Text.Header.*** / **Text.Display.*** |
| Minimum body | **14px** untuk readability |

Mapping Figma → CSS: `Text.{Category}.{Variant}` → variabel `--text-{category}-{variant}-*`.

### Spacing (Space tokens)

| Token | px | Kategori | Pemakaian |
|---|---|---|---|
| Space.025 | 2 | Micro | Outline offset, hairline |
| Space.050 | 4 | Micro | Gap ikon dalam chip |
| Space.075 | 6 | Micro | Nudge vertikal |
| Space.100 | 8 | Small | Badge/tag padding horizontal |
| Space.150 | 12 | Small | Button small vertical |
| **Space.200** | **16** | **Base ★** | **Card padding, form gap, default** |
| Space.250 | 20 | Base | — |
| Space.300 | 24 | Base | Section dalam card |
| Space.400 | 32 | Large | Blok konten |
| Space.500 | 40 | Large | — |
| Space.600 | 48 | Large | — |
| Space.800 | 64 | XLarge | Section halaman |
| Space.1000 | 80 | XLarge | Section halaman |

Jangan pakai Micro untuk padding container atau margin section utama.

### Icons

| Size | px | Default |
|---|---|---|
| small | 16 | — |
| **medium** | **24** | **★ default** |
| large | 32 | — |
| xlarge | 48 | — |

- Gaya: stroke SVG dari katalog repo (`icon-{name}.svg`)
- Sidebar: pasangan **off/on** (`icon-sidebar-*`)
- Ikon **memperkuat label**, bukan menggantikan teks pada aksi penting

### Grid (layout produk)

| Breakpoint | Lebar | Kolom | Margin | Gutter |
|---|---|---|---|---|
| SM | 320–600 | 4 | 24px | 16px |
| MD | 601–1024 | 8 | 24px | 16px |
| LG | 1025–1440 | 12 | 24px | 16px |
| XL | 1400+ | 12 | 24px | 16px |

---

## Layout behavior

### Design system documentation shell

| Elemen | Ukuran / perilaku |
|---|---|
| Sidebar | Fixed **270px**, bg `#0B1526`, full viewport height |
| Topbar doc | **56px** tinggi, bg putih, border bawah |
| Main content | Flex fill, bg `#F8FAFC`, padding konsisten token |

### Application shell (`Page Layout`)

```
┌─────────────────────────────────────────┐
│ Topnav (ds-topnav) — role banner       │
├──────────┬──────────────────────────────┤
│ Aside /  │ Main content                 │
│ Drawer   │ (page header, table, forms)  │
│ (tablet/ │                              │
│  mobile) │                              │
├──────────┴──────────────────────────────┤
│ Footer nav (ds-footer-nav) — pager      │
└─────────────────────────────────────────┘
```

- **Website:** sidebar + topnav penuh
- **Tablet / Mobile:** drawer overlay; **jangan** sidebar persisten penuh (sesuai doc Page Layout)
- Compose: Page Header + Table + Banner — jangan redesain child di dalam shell

### Page Header

Baris horizontal: breadcrumb → title (`h1`) → actions (button group) → optional search / filters / table toolbar.

Flags: `--actions-on`, `--toolbar-on`, `--subfilters-on` mengaktifkan baris tambahan.

### Z-index (lapisan)

| Layer | z-index |
|---|---|
| Dropdown | 1000 |
| Sticky | 1020 |
| Fixed (sidebar) | 1030 |
| Modal backdrop | 1040 |
| Modal | 1050 |
| Popover | 1060 |
| Tooltip | 1070 |

---

## Responsive behavior

### Dua referensi breakpoint di repo

**Grid foundation (desain layout produk):** 320 / 601 / 1025 / 1400 px.

**Tailwind screens (implementasi utility):** 640 / 768 / 1024 / 1280 / 1536 px.

Untuk mockup Figma Make: gunakan **tiga frame** yang sudah ada di komponen:

| Frame | Komponen | Perilaku |
|---|---|---|
| Website | `ds-topnav--website`, `ds-page-layout--website` | Nav penuh, sidebar/aside visible |
| Tablet | `ds-topnav--tablet`, `ds-page-layout--tablet` | Drawer, nav disederhanakan |
| Mobile | `ds-topnav--mobile`, `ds-page-layout--mobile` | Menu icon, footer nav, icon-only actions |

**Top & Bottom Navigation:** variant `--website` | `--tablet` | `--mobile`; size `--lg`, `--icon-only` pada item.

**Prinsip:** satu variant topnav per viewport; jangan campur website + mobile dalam satu artboard.

---

## Accessibility expectations (desain)

Desain harus mendukung pola yang sudah diimplementasi di HTML:

| Area | Ekspektasi desain |
|---|---|
| Bahasa | Konten UI **Indonesia**; hierarki heading tidak loncat level |
| Kontras | Teks pada `n900` / semantic text tokens; jangan `b50–b75` untuk teks |
| Focus | Ring **2px** `blue-b200` `#7DB5E7` (atau `primary-500`) — visible pada semua kontrol |
| Target tap | Button default ≥ tinggi comfortable; **jangan** compact untuk primary CTA utama |
| Label | Setiap input punya label visible; icon-only control punya nama aksesibel |
| Error | Pesan error terpisah, warna `red-r*`; state invalid pada field |
| Navigasi | Breadcrumb/pagination: halaman aktif visually distinct (`aria-current` di kode) |
| Modal | Maks. 2 aksi di footer; danger hanya untuk destruktif; teks pendek atau scroll |
| Section message | Judul + deskripsi + **maks. 2** tautan aksi |
| Flags | Dismiss = ikon `x-mark`, bukan teks "X"; satu dismiss |
| Tooltip | Tidak menggantikan label visible pada kontrol utama |
| Tabel | Header sort indicator; area scroll jelas bila kolom banyak |

---

## Components (34)

Setiap entri: **Appearance** · **Layout** · **Variants** · **States** · **Referensi repo**

---

### Avatar

| | |
|---|---|
| **Appearance** | Lingkaran `rounded-full`; border neutral; optional presence dot |
| **Layout** | Image fill + presence overlay |
| **Sizes** | sm, md, lg, xl |
| **States** | Presence online/offline |
| **Ref** | `components/Avatar/avatar.html` |

---

### Badge

| | |
|---|---|
| **Appearance** | Pill kecil; prefix optional (+/−) |
| **Variants** | default, primary, subtle, important, added, removed |
| **Ref** | `components/Badge/badge.html` |

---

### Breadcrumbs

| | |
|---|---|
| **Appearance** | Teks 14px; separator antar item; item aktif emphasized |
| **Layout** | Horizontal; truncated path variant |
| **Variants** | container truncated; item default/hover/focus/press |
| **Ref** | `components/Breadcrumbs/breadcrumbs.html` |

---

### Button

| | |
|---|---|
| **Appearance** | Radius **8px**; label 14px medium; primary fill `b300`, white text |
| **Layout** | Horizontal center; icon + label; spinner saat loading |
| **Variants** | primary, subtle, subtle-link, danger, warning, link, icon-only, compact, loading, none |
| **States** | hover: b400 (primary) / n20 (subtle); press: b500 / n40; focus: 2px ring b200; disabled: reduced opacity |
| **Ref** | `components/Button/button.html` |

**Design:** Satu primary per section. Danger = red `r300` family. Icon-only = square tap target + label aksesibel di spek.

---

### Calendar

| | |
|---|---|
| **Appearance** | Grid 7 kolom; header bulan; hari outside muted |
| **Layout** | Month header + week header + day grid |
| **Day variants** | outside, today, selected, range, disabled, text-subtle |
| **States** | hover, pressed, focus pada day cell |
| **Ref** | `components/Calendar/calendar.html` |

---

### Checkbox

| | |
|---|---|
| **Appearance** | Box **16×16**, radius **4px**; check/indeterminate icons |
| **Layout** | Horizontal: box + label |
| **Variants** | error, disabled |
| **States** | checked, indeterminate, hover, pressed, focus, error |
| **Ref** | `components/Checkbox/checkbox.html` |

---

### Date Picker

| | |
|---|---|
| **Appearance** | Select trigger + calendar panel (Shadow 1, radius 16px panel) |
| **Layout** | Trigger bar + dropdown calendar below |
| **Ref** | `components/Date picker/date-picker.html` — compose Select + Calendar |

---

### Date Time Picker

| | |
|---|---|
| **Appearance** | Bar dengan segmen date | time; dropdown terpisah |
| **Layout** | Horizontal bar; active segment inverted (n0 text on brand) |
| **Variants** | bar hover/focus; dropdown date/time; segment active |
| **Ref** | `components/Date time picker/date time picker.html` |

---

### Dropdown Button

| | |
|---|---|
| **Appearance** | Menu panel Shadow 1, radius 12–16px; item dengan optional lead/trail/checkbox |
| **Layout** | Trigger + menu vertical list |
| **Variants** | item selected/hover/pressed/disabled; menu scrollable; icon-only trigger |
| **Ref** | `components/dropdown/dropdown.html` |

---

### Flags

| | |
|---|---|
| **Appearance** | Full-width banner; semantic bg (success/error/warning/info); collapsible chevron |
| **Layout** | Header row (title + dismiss) + body + actions (link/primary) |
| **Variants** | normal, success, error, warning, info, collapsed |
| **States** | part hover/press/focus |
| **Ref** | `components/Flags/flags.html` — ikon x-mark, chevron-down |

---

### Form

| | |
|---|---|
| **Appearance** | Label body-sm; field below; message row dengan icon |
| **Layout** | Vertical stack per row |
| **Variants** | row valid/invalid; message error/information/true |
| **Ref** | `components/Form/form.html` |

---

### Inline Edit

| | |
|---|---|
| **Appearance** | Mirip select trigger; mode edit dengan confirm/cancel buttons |
| **States** | default, hover, focus, active, typing, disabled |
| **Ref** | `components/Inline edit/inline-edit.html` |

---

### Lozenge

| | |
|---|---|
| **Appearance** | Pill radius 4px; caption size; semantic colors per status |
| **Variants** | default, bold, new, removed, success, inprogress, moved |
| **Ref** | `components/Lozenge/lozenge.html` |

---

### Modal

| | |
|---|---|
| **Appearance** | Radius **24px**; Shadow 1; header optional warning/danger icon |
| **Layout** | Header + body (short/long text) + footer actions (subtle + primary) |
| **Sizes** | xs, sm, md, lg |
| **Variants** | header-icon warning, danger |
| **Ref** | `components/Modal/modal.html` — **bukan** prefix `ds-` |

---

### Navigation Menu

| | |
|---|---|
| **Appearance** | Sidebar vertical; item selected dengan bg tint brand; search field |
| **Layout** | Heading + main menu + submenu + divider |
| **States** | item hover/press/selected; search typing/focus |
| **Ref** | `components/Navigation menu/navigation.html` |

---

### Page Header

| | |
|---|---|
| **Appearance** | Title large; toolbar secondary controls |
| **Layout** | Rows: title row, optional toolbar, subfilters |
| **Variants** | actions-on, toolbar-on, subfilters-on |
| **Ref** | `components/Page Header/page-header.html` |

---

### Page Layout

| | |
|---|---|
| **Appearance** | Full app chrome |
| **Layout** | Topnav + aside/drawer + content + footer nav |
| **Variants** | website, tablet, mobile, menu-expand, submenu-on |
| **Ref** | `components/Page layout/page-layout.html`, `logo-parts.svg` |

---

### Pagination

| | |
|---|---|
| **Appearance** | Item radius 8px; active filled brand |
| **Layout** | Horizontal: prev + numbers + ellipsis + next |
| **Variants** | item active, ellipsis, prev, next |
| **Ref** | `components/Pagination/pagination.html` |

---

### Popup

| | |
|---|---|
| **Appearance** | Panel kecil Shadow 1; anchor ke trigger |
| **Layout** | Position left / center / right relatif anchor |
| **Ref** | `components/Popup/popup.html` — `popup-*` classes |

---

### Radio

| | |
|---|---|
| **Appearance** | Circle **full**; dot saat selected |
| **Layout** | Vertical group dengan legend |
| **Variants** | error, disabled |
| **States** | checked, hover, pressed, focus |
| **Ref** | `components/Radio/radio.html` |

---

### Range

| | |
|---|---|
| **Appearance** | Track + fill + thumb 16px; asset visual default/hover/press |
| **Layout** | Horizontal slider + optional label |
| **Variants** | value 0/50/100, disabled, interactive |
| **Ref** | `components/Range/range.html`, `assets/images/range=*.svg` |

---

### Section Message

| | |
|---|---|
| **Appearance** | Bordered region; icon leading; semantic border/bg |
| **Layout** | Icon + title + description + actions (max 2 links) |
| **Variants** | information, success, warning, error, discovery |
| **Ref** | `components/section messages/section-message.html` |

---

### Select

| | |
|---|---|
| **Appearance** | Trigger radius 8px; chevron; listbox Shadow 1 |
| **Layout** | Trigger + dropdown options; groups + group label |
| **Trigger states** | subtle, none, hover, focus, typing, loading, empty, invalid, disabled |
| **Option states** | hover, pressed, selected, selected-hover |
| **Ref** | `components/Select/select.html` (Option Part + full select) |

---

### Table

| | |
|---|---|
| **Appearance** | Header row sticky optional; row hover; sort icons |
| **Layout** | Scroll wrapper + table; column types: text, link, status, checkbox, icon |
| **Variants** | data, sticky-head, row-hover; sort asc/desc |
| **Ref** | `components/Table/table.html` |

---

### Tabs

| | |
|---|---|
| **Appearance** | Horizontal tabs; bottom border selected; optional badge/required dot |
| **Layout** | Tablist + tab panels |
| **Variants** | selected, required, notification; tablist track |
| **States** | hover, press, focus |
| **Ref** | `components/Tabs/tabs.html` — **satu** tab selected |

---

### Tags

| | |
|---|---|
| **Appearance** | Chip pill; light semantic backgrounds |
| **Layout** | Icon optional + label + remove button |
| **Variants** | standard, removable, greylight, bluelight, greenlight, purplelight, redlight, yellowlight |
| **States** | hover, pressed, focus |
| **Ref** | `components/Tags/tags.html` |

---

### Text Area

| | |
|---|---|
| **Appearance** | Radius 8px; border neutral; min-height multiline |
| **Variants** | compact, invalid |
| **States** | hover, focus, invalid, disabled |
| **Ref** | `components/Text Area/text area.html` |

---

### Text Field

| | |
|---|---|
| **Appearance** | Input radius 8px; variants phone prefix, leading icon, search |
| **Variants** | compact, subtle, none, invalid, monospaced, disabled |
| **Types** | text-field, phone-field, icon-text-field, search-select-field |
| **Ref** | `components/Text Field/text field.html` |

---

### Time Picker

| | |
|---|---|
| **Appearance** | Select trigger + vertical time list (30 min interval) |
| **Ref** | `components/Time picker/time-picker.html` |

---

### Toast Banner

| | |
|---|---|
| **Appearance** | Full-width horizontal bar; leading icon; semantic colors |
| **Layout** | Icon + teks — **tanpa** tombol dismiss di implementasi saat ini |
| **Variants** | announcement, success, warning, error |
| **Ref** | `components/Toast-Banner/banner.html` |

---

### Toggle

| | |
|---|---|
| **Appearance** | Track pill + thumb; check/x icons |
| **Sizes** | `ds-toggle--large` (satu-satunya size modifier di CSS) |
| **States** | track on/off, hover-on/off, focus, disabled |
| **Ref** | `components/Toggle/toggle.html` |

---

### Tooltip

| | |
|---|---|
| **Appearance** | Dark bg `neutral-n800`; Shadow 1; pointer triangle |
| **Layout** | top / bottom; position left / center / right |
| **Variants** | truncate, overflow |
| **Ref** | `components/Tooltip/figma/` (variant top, part PNG) |

---

### Top & Bottom Navigation

| | |
|---|---|
| **Appearance** | Topnav bar + footer pager; logo `logo-parts.svg` |
| **Layout** | Start (menu/logo) · center · end (akses, notif, avatar) |
| **Variants** | topnav website / tablet / mobile; lg, icon-only |
| **Ref** | `components/Top & bottom Navigation/top-bottom-nav.html` |

---

### Tourguide

| | |
|---|---|
| **Appearance** | Spotlight overlay gelap; card `b300` + **Shadow md**; progress step (e.g. 1/3) |
| **Layout** | Title + one-line instruction + footer actions (dismiss, next/replay) |
| **Parts** | spotlight card, btn-spotlight, btn-onboarding-replay |
| **Ref** | `components/Tourguide/tourguide.html` |

**Design:** Judul singkat; instruksi **satu kalimat**; progress visible; jangan paragraf panjang.

---

## State & interaction (semua komponen)

| State | Visual (token) |
|---|---|
| Hover | Neutral `n20`/`n30` atau brand `b400` (primary) |
| Press / Active | `n40` atau `b500` |
| Focus | 2px ring `b200` |
| Disabled | Reduced contrast; tidak hilang dari layout |
| Loading | Spinner pada button; busy state select |
| Selected | Brand fill atau border emphasis |

Durasi transisi: **150ms** (fast) untuk background; **300ms** (slow) untuk sidebar transform.

---

## Compose patterns (Figma frames)

| Screen type | Stack komponen |
|---|---|
| Form page | Form rows + Text Field / Select / Checkbox + Button primary |
| List page | Page Header + Table + Pagination |
| Dashboard | Page Layout + cards (Shadow 1) + semantic badges/lozenges |
| Settings | Navigation Menu + Section Message + Toggle / Radio group |
| Onboarding | Tourguide overlay + spotlight card |
| Alert context | Flags (global) atau Section Message (in-page) atau Toast Banner |

---

## Prompt template (Figma Make)

```
Desain [NAMA SCREEN] untuk GPOS Lite Design System V2.

WAJIB:
- Font Poppins; body Text.Body.Medium.Regular 16/24
- Brand #1E7FD6 (blue-b300); neutrals dari GP Lite n*
- Spacing hanya Space.025–Space.1000 (default padding Space.200)
- Corner.100 (8px) untuk button/input; Shadow 1 (default) atau Shadow md (komponen yang sudah memakainya) — bukan shadow custom
- Komponen existing: [list dari Docs/component-rules.md]
- Frame responsive: website / tablet / mobile jika layout app
- Bahasa Indonesia; focus ring 2px #7DB5E7

JANGAN:
- Komponen/variant/warna/spacing baru
- Gradien berat, shadow custom, layout padat
- Lebih dari satu primary button per area

Referensi implementasi: components/[Name]/*.html
```

---

## Referensi file

| Kebutuhan | Path |
|---|---|
| Token hex/nama | `styles/tokens.css` |
| Foundation visual | `foundations/{colors,typography,spacing,borders,shadows,grid,icons}/*.html` |
| Komponen + variant | `components/*/*.html`, `Docs/component-rules.md` |
| Snapshot Figma | `components/*/figma/*.png` (bila ada) |
| Proporsi / anatomy | `foundations/*`, `components/*/*.html`, `components/*/figma/` (`.claude/references/` bila terisi) |
| Ikon katalog | `foundations/icons/iconsData.js`, `assets/icons/` |
