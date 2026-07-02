# Pattern: Detail Faktur Page

Purpose:
Display and manage sales invoice details with product items and financial calculations.

Components:
- Page Layout 
- Navigation Menu 
- Top Navigation 
- Page Header
- Table (Product Items)
- Form Fields (TextField, Select, TextArea)
- Button (Cetak, Jurnal, Faktur Baru)

Structure Layout:

Page Layout
├─ Top Navigation
├─ Navigation Menu 
└─ Content
   ├─ Page Header with invoice number & action buttons
   ├─ Invoice Details Section (Left column)
   │  ├─ Basic Info (No. Sales Invoice, No. Sales Order, Date)
   │  ├─ Supplier Info (Pelanggan, Lokasi, Dokter)
   │  └─ Payment Info (Metode Pembayaran, Term Pembayaran)
   ├─ Status Section (Right column)
   ├─ Product Table with items
   └─ Financial Summary (Subtotal, Tax, Total)

Required Components:
- page-layout.md (`Docs/components/page-layout.md`)
- navigation-menu.md (`Docs/components/navigation-menu.md`)
- top-bottom-navigation.md (`Docs/components/top-bottom-navigation.md`)
- page-header.md (`Docs/components/page-header.md`)
- table.md (`Docs/components/table.md`)
- text-field.md (`Docs/components/text-field.md`)
- select.md (`Docs/components/select.md`)

Responsive:
Desktop
Tablet
Mobile

Rules:
- Never create custom layout
- Never replace Table component
- Never replace Navigation Menu