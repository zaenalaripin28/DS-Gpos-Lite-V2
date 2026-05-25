# Design System GPOS Lite Rules

## General Rules

- Fokus hanya pada task yang diminta
- Jangan improvisasi apapun selain yang diminta
- Jangan mengubah foundation yang sudah ada
- Jangan mengubah architecture yang sudah ada
- Preserve existing HTML structure
- Preserve existing class naming jika tidak diminta mengganti
- Preserve existing component structure
- Gunakan pendekatan modify existing file, bukan rewrite total component

---

## Tech Stack Rules

- Tailwind CSS only
- No React
- No Vue
- No Mantine
- No external UI library
- Gunakan existing Tailwind setup
- Gunakan existing spacing scale
- Gunakan existing typography scale

---

## Design Token Rules

- Gunakan semantic color token dari pages/colors.html
- Jangan menggunakan hardcoded color
- Gunakan CSS variable/token yang sudah ada
- Gunakan existing typography token
- Gunakan existing spacing token
- Gunakan existing border radius token
- Jangan membuat token baru tanpa instruksi

---

## Icon Rules

- Gunakan icon dari assets/icons
- Gunakan referensi icon dari pages/icons.html
- Jangan membuat icon baru
- Jangan menggunakan external icon library jika tidak diminta

---

## Component Rules

- Fokus pada component parts terlebih dahulu
- Gunakan struktur component yang konsisten
- Preserve existing button architecture
- Preserve existing component variants
- Preserve existing states
- Preserve accessibility yang sudah ada

---

## UI / UX Rules

- Production ready
- Responsive
- Clean hierarchy
- Consistent spacing
- Consistent typography
- Improve microinteraction jika diminta
- Improve hover/focus/loading state jika diminta
- Jangan menambahkan animation berlebihan
- Jangan mengubah visual style utama design system

---

## Figma Rules

- Jangan copy raw Figma structure secara mentah
- Gunakan Figma hanya sebagai referensi visual
- Convert Figma menjadi semantic Tailwind structure
- Hindari absolute positioning dari Figma kecuali memang diperlukan
- Hindari generated class name dari Figma

---

## File Rules

- Buat file sesuai struktur folder existing
- Jangan memindahkan file existing
- Jangan rename file existing tanpa instruksi
- Tambahkan menu baru ke semua sidebar jika diminta
- Fokus hanya pada file yang disebutkan

---

## Output Rules

- Berikan code yang clean
- Hindari duplicate code
- Gunakan reusable structure
- Jangan menjelaskan terlalu panjang
- Fokus langsung ke implementasi
- Jangan rewrite code yang tidak diminta