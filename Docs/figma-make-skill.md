# GPOS Lite — Figma Make Rules

> Canonical source untuk Figma Make:
> 1) Runtime behavior/API: `src/GposLite/components/*.tsx`
> 2) Token system: `styles/tokens.css`, `tailwind.config.js`
> 3) Visual/anatomy reference: `components/*/*.html`, `foundations/*/*.html`, `components/*/figma/`, `.claude/references/`
> 4) Wajib baca konteks lengkap: `Docs/figma-make-context.md`

## Core Principle

GPOS Lite adalah Design System yang sudah jadi.

Jangan membuat visual language baru.

Selalu gunakan:

* Existing Layout
* Existing Navigation
* Existing Foundation
* Existing Component
* Existing Variant

Konsistensi lebih penting daripada kreativitas.

---

# Required Design Workflow

Sebelum membuat desain apa pun, WAJIB mengikuti urutan berikut:

## Step 0 — Read Canonical Context

Baca dulu:

* `Docs/figma-make-context.md`
* `Docs/components-index.md`
* `Docs/component-rules.md`

Tujuan:

* Menentukan komponen existing yang bisa di-reuse
* Menentukan token, state, dan struktur yang valid
* Menghindari mismatch antara React runtime vs HTML reference

---

## Step 1 — Read Layout

Baca terlebih dahulu:

* Page Layout

Tujuan:

* Menentukan struktur halaman
* Menentukan area konten
* Menentukan responsive pattern

Dilarang membuat layout baru jika layout yang sesuai sudah tersedia.

---

## Step 2 — Read Navigation

Baca:

* Navigation Menu
* Top Navigation
* Bottom Navigation

Tujuan:

* Memahami struktur navigasi
* Memahami hierarchy menu
* Memahami navigation pattern

Gunakan struktur yang sudah tersedia.

Jangan membuat pola navigasi baru.

---

## Step 3 — Build Page Structure

Susun halaman dengan urutan:

1. Layout
2. Navigation
3. Page Header
4. Main Content
5. Supporting Components

Jangan membuat content sebelum Page Header selesai.

---

## Step 4 — Read Components

Sebelum menambahkan UI:

Cari terlebih dahulu apakah komponen sudah tersedia.

Gunakan source sesuai kebutuhan:

* Behavior/runtime: `src/GposLite/components/{Name}.tsx`
* Visual/anatomy: `components/{Name}/{slug}.html`

Prioritas:

1. Existing Component
2. Existing Variant
3. Existing Pattern
4. New Component (jika benar-benar tidak tersedia)

---

# Component Reuse Priority

Gunakan urutan berikut:

1. Page Layout
2. Navigation
3. Page Header
4. Existing Components
5. Existing Variants

Jangan membuat komponen baru jika versi yang setara sudah tersedia.

Jika ada konflik source:

1. Ikuti behavior/API dari `src/GposLite/components/*.tsx`
2. Ikuti token dari `styles/tokens.css`
3. Ikuti visual fidelity dari HTML reference

---

# Design Tokens

Gunakan hanya token yang tersedia.

Wajib menggunakan:

* Colors Foundation
* Typography Foundation
* Spacing Foundation
* Border Foundation
* Shadow Foundation
* Icon Foundation

Dilarang:

* Warna baru
* Typography baru
* Radius baru
* Shadow baru
* Spacing baru
* Icon baru

---

# Layout Hierarchy

Urutan halaman:

Layout
→ Navigation
→ Page Header
→ Content Section
→ Supporting Component

Jangan menempatkan komponen secara acak.

Selalu ikuti hierarchy yang tersedia.

---

# Responsive Rules

Gunakan variant yang sudah tersedia:

* Website
* Tablet
* Mobile

Jangan mencampur variant dalam satu layout.

**Decision matrix (P2):** lihat `Docs/figma-make-context.md` (RESPONSIVE DECISION MATRIX) dan `Docs/engineer-skill.md` — contoh Table (horizontal scroll), Form (stack ≤640px), Page Layout (satu topnav variant per viewport).

---

# Component Rules

Sebelum membuat desain:

1. Cari komponen yang tersedia.
2. Cari variant yang tersedia.
3. Gunakan variant tersebut.
4. Jika tidak tersedia, gunakan pattern terdekat.
5. Buat komponen baru hanya sebagai opsi terakhir.

---

# Design Validation Checklist

Sebelum final:

✓ Layout menggunakan Page Layout

✓ Navigation menggunakan Navigation Menu

✓ Top Navigation menggunakan Top Navigation

✓ Bottom Navigation menggunakan Bottom Navigation

✓ Page Header digunakan

✓ Komponen berasal dari Design System

✓ Menggunakan token Design System

✓ Konsisten dengan source React runtime (`src/GposLite/components/*.tsx`)

✓ Konsisten dengan visual reference (`components/*/*.html`)

✓ Tidak ada warna baru

✓ Tidak ada spacing baru

✓ Tidak ada typography baru

✓ Tidak ada shadow baru

✓ Tidak ada icon baru

✓ Responsive menggunakan variant existing

✓ Kontras WCAG AA (4.5:1 body) dan reduced motion dipertimbangkan

✓ Overlay punya kontrak keyboard (Escape) bila applicable

Jika komponen sudah tersedia di Design System, gunakan komponen tersebut dan jangan membuat komponen baru.

**A11y detail:** `Docs/engineer-skill.md` (Appendix — WCAG, motion, keyboard) · `Docs/figma-make-context.md` (ACCESSIBILITY APPENDIX).
