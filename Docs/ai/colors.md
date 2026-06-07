# Colors — GPOS Lite DS V2

> **Source of truth:** `styles/tokens.css` · **Foundation page:** `foundations/colors/colors.html`  
> **Brand:** GPOS Blue `#1E7FD6` → `--color-blue-b300` · `--color-primary-500`

---

## Aturan

1. UI memakai **semantic tokens** atau primitif GP Lite — **bukan hex hardcoded**.
2. Tailwind: `bg-blue-b300`, `text-neutral-n900`, `border-border` — bukan `bg-blue-500`.
3. **Blue / b300:** aksi primary, link, fokus/selected — bukan background luas.
4. **Orange:** peringatan, alert — bukan brand.
5. **Red:** konteks error — bukan dekorasi.
6. **Green:** sukses — bukan pengganti aksi primary.
7. **Purple:** aksen — bukan pengganti brand blue di elemen fungsional utama.
8. **Neutral:** teks gelap di shade tinggi; hindari N0–N30 untuk teks dan N800–N900 sebagai background luas.

---

## Struktur warna

### 1. Primitif GP Lite

| Family | CSS prefix | Steps | Brand |
|--------|------------|-------|-------|
| Blue | `--color-blue-b*` | b50, b75, b100, b200, **b300**, b400, b500 | **b300 = brand** |
| Orange | `--color-orange-o*` | o50–o500 | — |
| Red | `--color-red-r*` | r50–r500 | — |
| Green | `--color-green-g*` | g50–g500 | — |
| Purple | `--color-purple-p*` | p50–p500 | — |
| Neutral | `--color-neutral-n*` | n0–n900 | — |

### 2. Skala utilitas (50–900)

`primary`, `secondary`, `success`, `warning`, `error`, `info`, `gray` — primary = alias brand blue.

### 3. Semantic tokens

| Token | Nilai / peran |
|-------|---------------|
| `--color-background` | `#F8FAFC` — latar halaman |
| `--color-surface` | `#FFFFFF` — kartu/panel |
| `--color-text-primary` | `#0F172A` |
| `--color-text-secondary` | `#475569` — paragraf |
| `--color-text-tertiary` | `#94A3B8` |
| `--color-text-disabled` | `#CBD5E1` |
| `--color-text-inverse` | `#FFFFFF` |
| `--color-text-brand` | `var(--color-primary-600)` |
| `--color-border` | `#E2E8F0` |
| `--color-border-light` | `#F1F5F9` |
| `--color-border-brand` | `var(--color-primary-200)` |

### 4. Chrome (doc site only)

Token `--sidebar-*` dan `--topbar-*` untuk shell **dokumentasi DS** (`index.html`).  
**Jangan** pakai `--sidebar-bg` navy untuk sidebar aplikasi — app shell memakai `--color-neutral-n0` via `ds-sidebar-nav-expand`.

---

## GP Lite Blue (brand)

| Token | Hex |
|-------|-----|
| `--color-blue-b50` | `#E9F2FB` |
| `--color-blue-b75` | `#A3CBEE` |
| `--color-blue-b100` | `#7DB5E7` |
| `--color-blue-b200` | `#4495DD` |
| `--color-blue-b300` | `#1E7FD6` |
| `--color-blue-b400` | `#155996` |
| `--color-blue-b500` | `#124D83` |

Focus ring umum: `--color-blue-b200` atau `--color-primary-500`.

---

## Neutral scale (ringkas)

| Token | Hex | Pemakaian umum |
|-------|-----|----------------|
| `--color-neutral-n0` | `#FFFFFF` | Surface app sidebar |
| `--color-neutral-n20` | `#F5F6F7` | Hover subtle |
| `--color-neutral-n30` | `#EBEDF0` | Hover default |
| `--color-neutral-n40` | `#DFE2E6` | Border kartu doc |
| `--color-neutral-n900` | `#091E42` | Shadow base, teks gelap |

Foundation mendokumentasikan **57 token primitif** + grup semantic (Background, Text, Notification, Elevation, Border, Icon).

---

## Tailwind utilities

| Kebutuhan | Utility |
|-----------|---------|
| Brand | `bg-blue-b300`, `text-blue-b300`, `bg-primary-500` |
| Neutral | `text-neutral-n900`, `bg-neutral-n20`, `border-neutral-n40` |
| Semantic | `bg-surface`, `text-text-primary`, `border-border`, `bg-background` |
| State | `bg-blue-b400` (hover primary), `bg-red-r300` (error) |

---

## Kontras (WCAG 2.1 AA)

| Konteks | Target |
|---------|--------|
| Body copy / label | **4.5:1** minimum |
| Teks besar (≥18px regular / ≥14px bold) | **3:1** minimum |

Pasangan default: `--color-text-primary` on `--color-surface`.  
Referensi badge WCAG: `foundations/colors/colors.html`, `components/Button/button.html`, `components/Form/form.html`.

Detail: [accessibility.md](./accessibility.md)

---

## TODO

- [ ] Tabel kontras per pasangan token semantic (automated audit belum ada di Docs)
- [ ] Spesifikasi warna presence Avatar (online/offline/busy) — belum tokenized

---

## Referensi

| File | Path |
|------|------|
| Token CSS | `styles/tokens.css` |
| Foundation page | `foundations/colors/colors.html` |
| Prinsip warna | `Docs/design-principles.md` § Color Philosophy |
| Token index | [tokens.md](./tokens.md) |
