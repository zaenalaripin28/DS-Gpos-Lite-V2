# GPOS Lite Design System V2 — Design Principles

> **Source of truth:** perilaku visual dan interaksi yang sudah diimplementasikan di repositori. Dokumen ini diekstrak dari `CLAUDE.md`, `style_guide.md`, `styles/tokens.css`, `src/GposLite/components/*`, halaman `foundations/*`, `components/*`, dan `Docs/design-system-knowledge.md`.

Tidak menambah prinsip baru di luar yang tercermin di kode dan dokumentasi foundation.

---

## Visual Personality

**Yang tercatat di `style_guide.md` dan `CLAUDE.md`:**

- Estetika **premium SaaS dashboard**: hierarki bersih, lapisan permukaan lembut, ritme layout lapang, kepadatan terkontrol.
- Permukaan utama: latar halaman `--color-background` (`#F8FAFC`), konten di atas `--color-surface` (`#FFFFFF`).
- Kartu dan panel dokumentasi: border lembut (`--color-border`, `--color-neutral-n40`), bayangan minimal — **`--shadow-1`** (default) atau **`--shadow-md`** di komponen yang sudah memakainya; bukan bayangan berat atau custom.
- Radius dan spacing konsisten di seluruh UI; alignment rapi.
- Brand visual: **GPOS Blue** `#1E7FD6` (`--color-blue-b300`, `--color-primary-500`).
- Dokumentasi DS memakai **sidebar gelap** (`--sidebar-bg: #0B1526`) berdampingan dengan area konten terang — kontras chrome vs konten.
- Prioritas implementasi (`style_guide.md`, `CLAUDE.md`): **akurasi dan konsistensi** di atas improvisasi; hindari dekorasi berlebihan, gradien dominan, dan bahasa visual yang berbeda antar halaman.

**Yang dihindari di panduan visual repo:**

- Overdesign, gradien berlebihan, shadow berat, spacing/radius acak, section padat, animasi agresif.

---

## Layout Philosophy

### Shell dokumentasi (`styles/globals.css`, `index.html`)

- Struktur **flex**: `.container` → sidebar fixed **270px** (`--sidebar-width`) + `.main-content`.
- Sidebar: full height, `z-index: var(--z-fixed)`, border kanan `--sidebar-border`.
- Topbar dokumentasi: tinggi **56px** (`--topbar-height`), latar `--topbar-bg` putih, border `--topbar-border`.
- `scroll-behavior: smooth` pada `html`.

### Grid produk (`foundations/grid/grid.html`)

- Sistem kolom responsif: **4 / 8 / 12 / 12** (SM → XL).
- **Margin halaman: 24px**; **gutter: 16px**.
- Breakpoint foundation: SM 320–600px, MD 601–1024px, LG 1025–1440px, XL 1400px+.
- (Tailwind `screens` di `tokens.css` / `tailwind.config.js` memakai nilai lain: 640, 768, 1024, 1280, 1536 — keduanya ada di repo.)

### Page layout komponen (`components/Page layout/`)

- Pola aplikasi: `ds-page-layout` → `header.ds-topnav` + main + `footer.ds-footer-nav`.
- Varian topnav: `--website`, `--tablet`, `--mobile` untuk adaptasi lebar.

### Filosofi ruang (`style_guide.md`)

- Jarak antar section besar, pengelompokan konten jelas, ritme visual stabil, whitespace seimbang — **layout tidak didesain padat**.

### Figma & referensi visual (`CLAUDE.md`)

- Figma sebagai referensi visual; proporsi dari `foundations/*`, `components/*/*.html`, dan `components/*/figma/`.
- Folder `.claude/references/` tersedia untuk anatomy reference; bila ada konteks anatomy yang relevan, jadikan source of truth di atas visual reference lain.

---

## Typography Philosophy

### Font & hierarki

- **Satu keluarga:** Poppins (`--font-primary`) untuk seluruh UI — tidak ada font sekunder di token.
- Skala generik: `--font-size-xs` (12px) hingga `--font-size-5xl` (48px).
- **19 text styles** sinkron Figma (`--text-overline-medium-*` … `--text-display-medium-*`).
- Heading global (`globals.css`): `h1`–`h6` memakai `--font-size-*`, weight semibold, `--line-height-tight`, `--letter-spacing-tight`.

### Peran teks (dokumentasi `foundations/typography/typography.html`)

| Peran | Style yang dipakai |
|---|---|
| Konten utama | **Body / Medium / Regular** (16px / 24px line-height) |
| Metadata, label kecil | Caption |
| Hero / judul besar | Header / Large, Display |
| Overline / kategori | Overline / Medium (uppercase, letter-spacing 0.1em) |

### Aturan yang tercatat di foundation

- **Minimal 14px** untuk body copy readability.
- Hanya Poppins; **hindari skip level heading** (mis. H1 langsung ke H4).
- Implementasi komponen umumnya memakai **CSS variables teks** (`--text-body-small-regular-size`, dll.) atau ukuran token (`--font-size-sm` pada button), bukan campuran font ad hoc.

### Link & code (`globals.css`)

- Link: `--color-primary-600`, underline on hover.
- `code` inline: latar `--color-primary-50`, teks `--color-primary-700`, radius `--border-radius-sm`.

---

## Color Philosophy

### Struktur warna

1. **Primitif GP Lite** — blue (brand), orange, red, green, purple, neutral (`b300`, `n900`, dll.).
2. **Skala utilitas 50–900** — primary, secondary, success, warning, error, info, gray (primary = alias brand blue).
3. **Semantic** — `--color-text-primary`, `--color-background`, `--color-border`, dll. untuk makna UI, bukan hex langsung.
4. **Chrome** — `--sidebar-*`, `--topbar-*` untuk shell dokumentasi.

### Prinsip pemakaian (`foundations/colors/colors.html`)

- UI memakai **semantic tokens**, bukan hex hardcoded — agar konsisten saat token berubah.
- **Blue / b300:** aksi primary, link, fokus/selected; dokumentasi menghindari B300 sebagai background luas dan B50–B75 untuk teks.
- **Orange:** peringatan, alert, badge perhatian — bukan brand.
- **Red:** konteks error — bukan dekorasi sembarang.
- **Green:** sukses — bukan pengganti aksi primary (itu biru).
- **Purple:** aksen — bukan pengganti brand blue di elemen fungsional utama.
- **Neutral:** teks gelap di shade tinggi; hindari N0–N30 untuk teks dan N800–N900 sebagai background luas; hindari loncat shade acak.

### Latar & teks default

| Token | Nilai / peran |
|---|---|
| `--color-background` | `#F8FAFC` — halaman |
| `--color-surface` | `#FFFFFF` — kartu/panel |
| `--color-text-primary` | `#0F172A` |
| `--color-text-secondary` | `#475569` — paragraf (`globals.css` `p`) |

### Aturan teknis (`CLAUDE.md`)

- Tidak hardcode warna di implementasi baru; hanya token existing.
- Tailwind: utility semantic (`bg-blue-b300`, `text-neutral-n900`) — bukan palet default Tailwind.

---

## Spacing Philosophy

### Dua sistem (keduanya di `tokens.css`)

| Sistem | Contoh | Basis |
|---|---|---|
| GP Lite Space | `--space-200` = 16px | Token Figma `Space.*` |
| Rem scale | `--spacing-4` = 16px | Kelipatan 4px dalam rem |

**Default dokumentasi foundation:** **Space.200 (16px)** sebagai unit dasar.

### Kategori (`foundations/spacing/spacing.html`)

| Kategori | Token | Peran |
|---|---|---|
| Micro | 025–075 (2–6px) | Outline offset, gap ikon kecil, hairline — **bukan** padding container |
| Small | 100–150 (8–12px) | Badge, tag, chip, button kecil |
| Base | 200–300 (16–24px) | Card padding, form gap, button default |
| Large | 400–600 (32–48px) | Section, blok konten |
| XLarge | 800–1000 (64–80px) | Jarak halaman / section besar |

### Prinsip

- Nilai spacing hanya dari daftar token — foundation menyatakan visual harus harmonis jika tidak keluar skala.
- Tailwind di repo: prefer `gap-200`, `p-150` (GP Lite) atau `p-4` (rem).
- `style_guide.md`: ritme spacing konsisten, section spacing besar, hindari layout ramai.

---

## Border Philosophy

### Radius (`foundations/borders/borders.html`, `tokens.css`)

| Level | Token / px | Pemakaian di dokumentasi |
|---|---|---|
| None | `--border-radius-none` | Tabel, divider, container struktural |
| Small | `--border-radius-sm` (4px) | Checkbox, radio |
| **Medium ★** | `--border-radius-md` (8px) | **Default button & form** (Corner.100) |
| Large | `--border-radius-lg` (12px) | Card, dropdown |
| XL | `--border-radius-xl` (16px) | Dropdown panel |
| 2XL | `--border-radius-2xl` (24px) | Modal |
| Full | `--border-radius-full` | Avatar, pill, toggle track |

**Prinsip:** satu level radius per komponen — foundation menghindari mencampur 8px dan 12px dalam satu komponen; 12px tidak untuk icon button kecil; radius none hindari pada modal/overlay.

### Width

- `--border-width-0|1|2|4`; border 2px “inside” di doc memakai `box-shadow: inset 0 0 0 2px`.

### Warna border

- Default UI: `--color-border` (`#E2E8F0`), varian `--color-border-light`, `--color-border-brand`.
- Kartu dokumentasi: border `--color-neutral-n40` umum.

### Kartu (`style_guide.md`)

- Soft border, radius konsisten, padding konsisten — selaras dengan border philosophy di atas.

---

## Elevation Philosophy

### Token elevation

**`--shadow-1`** — default DS (foundation Shadows):

```css
0px 0px 1px 0px rgba(9, 30, 66, 0.31),
0px 8px 12px 0px rgba(9, 30, 66, 0.15);
```

Base color bayangan: **`#091E42`** (`--color-neutral-n900`).

### Kapan dipakai (`foundations/shadows/shadows.html`)

- Card produk & informasi
- Button elevasi (CTA)
- Panel & sidebar floating
- Dropdown & popover
- Modal & dialog
- Input saat fokus (sesuai dokumentasi foundation)

### Prinsip

- Shadow **memperkuat hierarchy**, bukan dekorasi.
- Default **`--shadow-1`**; **`--shadow-md`** untuk komponen yang sudah mengimplementasikannya (Modal, Dropdown, Section Message, Tourguide, dll.) — ikuti halaman referensi.
- Kombinasi dengan **border-radius**; latar terang/putih agar shadow terbaca.
- **Hindari:** tumpuk shadow, shadow di background gelap, custom shadow di luar token, elemen tanpa kebutuhan elevasi.

### Legacy & z-index

- Token `--shadow-xs` … `--shadow-2xl`, `--shadow-brand`, dan **`--shadow-md`** ada di `tokens.css`; foundation menekankan **Shadow 1** sebagai default produk.
- Lapisan UI: `--z-dropdown` (1000) → `--z-tooltip` (1070); modal backdrop 1040, modal 1050.

---

## Interaction Philosophy

### Transisi (`tokens.css`)

| Token | Durasi |
|---|---|
| `--transition-fast` | 150ms ease-in-out |
| `--transition-base` | 200ms ease-in-out |
| `--transition-slow` | 300ms ease-in-out |
| `--transition-spring` | 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) |

**Contoh implementasi:** `ds-btn` memakai `transition: background-color var(--transition-fast)`; sidebar `transform var(--transition-slow)`.

### State model (komponen)

Modifier dokumentasi dan CSS memisahkan:

- **Variant** — `--primary`, `--subtle`, `--danger`, semantic message (`--success`, `--error`, …)
- **State interaksi** — `--hover`, `--focus`, `--press`, `--disabled`, `--loading`, `--selected`
- **Snapshot** — `--snapshot` pada beberapa komponen untuk matrix dokumentasi

### Hover & press (contoh Button)

- Default/neutral: hover → `--color-neutral-n30`, active → `--color-neutral-n40`
- Primary: hover `--color-blue-b400`, active `--color-blue-b500`
- Subtle: hover `--color-neutral-n20`, press `--color-neutral-n40`
- Link: underline on hover, warna brand

### Focus

- `:focus-visible` dengan ring **`box-shadow: 0 0 0 2px`** — `var(--color-blue-b200)` atau `var(--color-primary-500)` tergantung variant.
- Section Message: ring fokus tautan memakai **Border.Focused (`b200`)** di dokumentasi halaman.

### Motion (`style_guide.md`, `CLAUDE.md`)

- Hover dan fokus **subtle**; transisi smooth; **motion minimal**; hindari animasi agresif dan kompleksitas JS/DOM tidak perlu.
- Filter tab foundation: `transition: all 0.15s ease` — interaksi ringan pada chrome dokumentasi.

### Feedback status

- Loading: `ds-btn--loading`, `aria-busy`; Select `--loading`, `aria-busy`
- Validasi form: row `--invalid`, message `--error` + `role="alert"`
- Toast/Flag/Section Message: variant semantic warna (success, warning, error, information)

---

## Accessibility Philosophy

### Prinsip umum (`CLAUDE.md`)

- **Semantic HTML** dan aksesibilitas dipertahankan; struktur komponen dan class naming dijaga bila memungkinkan.

### Bahasa & landmark

- **`lang="id"`** pada semua halaman HTML DS.
- Landmark: `role="banner"` (topnav), `role="contentinfo"` (footer), `role="region"` (pesan/flag/tabel scroll).

### Form & input

- **Native control first:** checkbox, radio, toggle memakai `<input>` asli; dekorasi visual `aria-hidden="true"`.
- Text field/area: `aria-invalid`, `aria-describedby`, `aria-label`.
- Range: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.
- Error: `role="alert"` pada pesan form.

### Widget kustom

- Pola ARIA yang diimplementasikan: `listbox`/`option`, `menu`/`menuitem`, `tablist`/`tab`/`tabpanel`, `grid` (calendar), `switch` (toggle), `tooltip`, `dialog` (date picker).
- Popup/loading: `aria-live="polite"` di contoh playground.
- Navigasi: `aria-current="page"` (breadcrumbs, pagination), `aria-expanded` + `aria-controls` (dropdown, flags, select).

### Fokus & keyboard

- Focus visible pada kontrol interaktif; modal — focus trap disebut di dokumentasi halaman Modal.
- Tabel: region scroll `tabindex="0"`, `aria-sort` pada header.

### Ikon (`foundations/icons/icons.html`, `CLAUDE.md`)

- Sumber tunggal: `assets/icons/` via `<img>` — tanpa library eksternal.
- Ikon **memperkuat label**, bukan menggantikan teks pada area penting.
- Dekoratif: `alt=""` + `aria-hidden="true"`; informatif: `alt` atau `aria-label` pada induk.
- Ukuran dari token `--icon-size-*` (16 / 24 / 32 / 48px); default medium **24px**.

### Section Message (dokumentasi komponen)

- `role="region"` + `aria-labelledby` pada judul; maksimal **2 tautan aksi** di contoh implementasi halaman.

---

## Prioritas Implementasi (repo)

Urutan yang tercatat di `style_guide.md` dan `CLAUDE.md`:

1. Existing runtime behavior (`src/GposLite/components/*.tsx`)
2. Existing token system (`styles/tokens.css`)
3. Existing `index.html` / halaman foundation & komponen / `.claude/references/` untuk visual-anatomy reference
4. Existing component structure
5. Existing responsive behavior (termasuk varian mobile pada page layout & topnav)

---

## Referensi

| Dokumen | Path |
|---|---|
| Knowledge base | `Docs/design-system-knowledge.md` |
| Aturan agent | `CLAUDE.md` |
| Visual language ringkas | `style_guide.md` |
| Token | `styles/tokens.css` |
| Foundations | `foundations/*/*.html` |
