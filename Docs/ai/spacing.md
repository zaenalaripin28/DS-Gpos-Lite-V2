# Spacing — GPOS Lite DS V2

> **Source of truth:** `styles/tokens.css` · **Foundation page:** `foundations/spacing/spacing.html`  
> **Default dokumentasi:** **Space.200 (16px)** = `--space-200`

---

## Aturan

1. Spacing hanya dari daftar token — **tidak arbitrary px**.
2. Prefer GP Lite `--space-*` (`gap-200`, `p-150`) atau rem `--spacing-*` (`p-4`, `gap-4`).
3. Micro spacing (2–6px) untuk outline offset & gap ikon kecil — **bukan** padding container.
4. Ritme layout lapang; section spacing besar (`style_guide.md`).

---

## Dua sistem spacing

Keduanya valid di `tokens.css`:

| Sistem | Prefix | Basis | Tailwind contoh |
|--------|--------|-------|-----------------|
| GP Lite Space | `--space-*` | Token Figma `Space.*` | `p-200`, `gap-150`, `m-100` |
| Rem scale | `--spacing-*` | Kelipatan 4px dalam rem | `p-4`, `gap-6`, `m-8` |

**16px = `--space-200` = `--spacing-4`** — unit dasar dokumentasi.

---

## GP Lite Space scale

| Token | px | Figma |
|-------|-----|-------|
| `--space-0` | 0 | Space.0 |
| `--space-025` | 2 | Space.025 |
| `--space-050` | 4 | Space.050 |
| `--space-075` | 6 | Space.075 |
| `--space-100` | 8 | Space.100 |
| `--space-150` | 12 | Space.150 |
| `--space-200` | 16 | Space.200 ★ |
| `--space-250` | 20 | Space.250 |
| `--space-300` | 24 | Space.300 |
| `--space-400` | 32 | Space.400 |
| `--space-500` | 40 | Space.500 |
| `--space-600` | 48 | Space.600 |
| `--space-800` | 64 | Space.800 |
| `--space-1000` | 80 | Space.1000 |

---

## Rem scale

| Token | px |
|-------|-----|
| `--spacing-0` | 0 |
| `--spacing-1` | 4 |
| `--spacing-2` | 8 |
| `--spacing-3` | 12 |
| `--spacing-4` | 16 |
| `--spacing-5` | 20 |
| `--spacing-6` | 24 |
| `--spacing-8` | 32 |
| `--spacing-10` | 40 |
| `--spacing-12` | 48 |
| `--spacing-16` | 64 |
| `--spacing-20` | 80 |
| `--spacing-24` | 96 |

---

## Kategori (`foundations/spacing/spacing.html`)

| Kategori | Token | px range | Peran |
|----------|-------|----------|-------|
| **Micro** | 025–075 | 2–6 | Outline offset, gap ikon kecil, hairline |
| **Small** | 100–150 | 8–12 | Badge, tag, chip, button kecil |
| **Base** | 200–300 | 16–24 | Card padding, form gap, button default |
| **Large** | 400–600 | 32–48 | Section, blok konten |
| **XLarge** | 800–1000 | 64–80 | Jarak halaman / section besar |

---

## Pemakaian umum di komponen

| Konteks | Token tipikal |
|---------|---------------|
| Button default padding | `--space-150` / `--space-200` |
| Form row gap | `--space-200` |
| Card padding | `--space-200` / `--space-300` |
| Section margin | `--space-400`–`--space-600` |
| Icon gap (inline) | `--space-050` / `--space-100` |
| Focus ring offset | `--space-025` |

---

## Layout grid (bukan spacing token global)

Dari `foundations/grid/grid.html`:

| Property | Nilai |
|----------|-------|
| Page margin | **24px** (`--grid-margin`) |
| Column gutter | **16px** (`--grid-gutter`) |
| Kolom | 4 / 8 / 12 / 12 (SM → XL) |

---

## Touch target (guidance)

- Action button: padding ~12–16px (`--space-150` / `--space-200`).
- Icon-only: hit area ≥ **40px** — lihat `ds-form-row__action-btn` di `components/Form/form.html`.
- `--compact` / `--icon-only`: jangan kurangi di bawah area sentuh nyaman tanpa alasan layout.

> Minimum 44px (Apple HIG) belum distandarkan sebagai token — TODO.

---

## TODO

- [ ] Token max content / prose width — belum ada
- [ ] Density modes (compact/comfortable) — belum distandarkan global
- [ ] Spacing matrix per komponen — sebagian hanya di halaman HTML individual

---

## Referensi

| File | Path |
|------|------|
| Token CSS | `styles/tokens.css` |
| Foundation page | `foundations/spacing/spacing.html` |
| Prinsip spacing | `Docs/design-principles.md` § Spacing Philosophy |
| Token index | [tokens.md](./tokens.md) |
