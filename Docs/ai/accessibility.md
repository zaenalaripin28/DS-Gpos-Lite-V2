# Accessibility — GPOS Lite DS V2

> Pola yang **sudah muncul di implementasi** HTML/TSX. Bukan standar baru di luar repo.

---

## Prinsip

- **Semantic HTML** first — native control sebelum custom widget.
- **`lang="id"`** pada semua halaman HTML DS.
- Focus visible pada semua kontrol interaktif.
- Ikon memperkuat label — bukan menggantikan teks pada area penting.

---

## WCAG 2.1 AA — target kontras

| Konteks | Target | Referensi repo |
|---------|--------|----------------|
| Body copy / label | **4.5:1** minimum | `foundations/colors/colors.html` |
| Teks besar (≥18px regular / ≥14px bold) | **3:1** minimum | Typography foundation |
| Fokus / state interaktif | Ring terlihat | `blue-b200` / `primary-500` |

Pasangan default: `--color-text-primary` on `--color-surface`.

---

## Dokumen & landmark

```html
<html lang="id">
```

| Landmark | Role / element | Komponen |
|----------|----------------|----------|
| Top navigation | `role="banner"` | `ds-topnav` |
| Footer | `role="contentinfo"` | `ds-footer-nav` |
| Pesan / flag | `role="region"` | Section Message, Flags |
| Breadcrumb | `<nav aria-label="…">` | Breadcrumbs |
| Pagination | `<nav aria-label="Pagination">` | Pagination |
| Table scroll | `role="region"` `tabindex="0"` | Table |

---

## Form controls — native first

```html
<label class="ds-checkbox">
  <input type="checkbox" class="ds-checkbox__input" />
  <span class="ds-checkbox__box" aria-hidden="true">…</span>
  <span class="ds-checkbox__label">Label</span>
</label>
```

| Komponen | Atribut |
|----------|---------|
| Text Field / Text Area | `aria-invalid`, `aria-describedby`, `aria-label` |
| Checkbox / Radio | Native `<input>`; visual `aria-hidden="true"` |
| Toggle | `role="switch"`, `aria-checked="true\|false"` |
| Range | `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label` |
| Form error | `role="alert"` pada `ds-form-message--error` |

---

## Custom widgets — ARIA matrix

| UI | Roles / attributes |
|----|-------------------|
| Select, Time Picker, Date Time Picker | `listbox`, `option`, `aria-expanded`, `aria-controls`, `aria-busy`, `aria-multiselectable` |
| Dropdown | `menu`, `menuitem`, `aria-expanded`, `aria-haspopup="menu"`, `aria-checked` |
| Tabs | `tablist`, `tab`, `tabpanel`, `aria-selected` |
| Calendar | `grid`, `aria-selected`, `aria-disabled`, `aria-current="date"` |
| Date Picker | `aria-haspopup="dialog"`, `role="dialog"` |
| Flags, Section Message | `role="region"`, `aria-labelledby`, `aria-expanded`, `aria-controls` |
| Breadcrumbs, Pagination | `aria-current="page"` |
| Table | `aria-sort`, `columnheader` |
| Button loading | `aria-busy` |
| Button toggle | `aria-pressed` |
| Tooltip | `role="tooltip"`, `aria-label` |
| Navigation Menu | `aria-expanded`, `aria-current` |

---

## Focus

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-blue-b200);
}
```

- Button: ring `blue-b200` atau `primary-500` tergantung variant — lihat `button.html`.
- Section Message links: Border.Focused (`b200`).
- Table scroll region: focus ring pada `:focus-visible`.

---

## Keyboard

### Escape menutup overlay

| Komponen | Perilaku | File |
|----------|----------|------|
| Select | Escape menutup listbox | `select.html` |
| Date Picker | Escape menutup panel | `date-picker.html` |
| Date Time Picker | Escape menutup dropdown | `date-time-picker.html` |

Overlay baru sebaiknya mengikuti kontrak yang sama.

### Skip link

```html
<a href="#main-content" class="skip-link">Lewati ke konten utama</a>
```

Referensi: `components/Table/table.html` — visible on `:focus`.

### TODO keyboard

- [ ] Roving tabindex untuk Tabs/menus — belum distandarkan
- [ ] Focus order / tabindex policy global — belum terdokumentasi
- [ ] Arrow key navigation Calendar — partial di implementasi

---

## Live regions

| Pola | Pemakaian |
|------|-----------|
| `role="alert"` | Pesan error form |
| `aria-live="polite"` | Loading Select, Popup playground |
| Toast Banner | Makna dari copy teks — **tanpa** dismiss button |

Politeness levels (`assertive` vs `polite`) — belum distandarkan global.

---

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

**Contoh:** `index.html`, `button.html`, `table.html`, `avatar.html`, foundations.

Terapkan pada komponen baru yang punya transisi/animasi.

---

## Ikon

```html
<!-- Dekoratif -->
<img src="../../assets/icons/icon-x-mark.svg" alt="" aria-hidden="true" />

<!-- Informatif — alt deskriptif atau aria-label pada parent button -->
<button aria-label="Tutup">
  <img src="…" alt="" aria-hidden="true" />
</button>
```

| Ukuran | px | Token |
|--------|-----|-------|
| Small | 16 | `--icon-size-small` |
| Medium ★ | 24 | `--icon-size-medium` |
| Large | 32 | `--icon-size-large` |
| XLarge | 48 | `--icon-size-xlarge` |

---

## Touch target

- Action button: padding ~12–16px.
- Icon-only: hit area ≥ **40px** — `ds-form-row__action-btn` (40×40) di `form.html`.
- `--compact` / `--icon-only`: pertahankan area sentuh nyaman.

> TODO: minimum 44px belum distandarkan sebagai token.

---

## Modal & overlay (status implementasi)

| Aspek | Status |
|-------|--------|
| Focus trap | Disebut di doc Modal (script inline) |
| `aria-modal="true"` | **Belum distandarkan** di seluruh contoh |
| `aria-labelledby` / `aria-describedby` | **Partial** — perlu saat memperluas Modal/Popup |
| Backdrop interaction | **TODO** — belum terdokumentasi |

Saat memperluas Modal/Popup: tambahkan `aria-modal="true"`, label/deskripsi, trap fokus konsisten.

---

## Screen reader — TODO

- [ ] Loading/skeleton states — belum ada pola SR text
- [ ] Avatar presence — belum ada aria pattern standar
- [ ] Tourguide step active — belum distandarkan

---

## Checklist (sebelum PR)

- [ ] `lang="id"` pada halaman HTML baru
- [ ] Native input + label untuk form controls
- [ ] `aria-expanded` / roles sesuai widget kustom
- [ ] Focus visible dengan ring token
- [ ] Kontras teks/latar ≥ target AA
- [ ] `prefers-reduced-motion` bila ada transisi
- [ ] Escape menutup overlay bila applicable
- [ ] Icon-only: `aria-label`
- [ ] Error: `role="alert"`

---

## Referensi

| File | Path |
|------|------|
| ARIA di knowledge base | `Docs/design-system-knowledge.md` § Pola Aksesibilitas |
| Engineer checklist | `Docs/engineer-skill.md` § Accessibility |
| WCAG di README | `README.md` |
| Anti-patterns a11y | [anti-patterns.md](./anti-patterns.md) |
