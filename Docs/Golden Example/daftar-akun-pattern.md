# Pattern: Daftar Akun Page

Purpose:
Display and manage chart of accounts with hierarchical account codes, grouping, and balances.

Components:
- Page Layout 
- Navigation Menu 
- Top Navigation 
- Page Header
- Table
- TextField (Search)
- Button (Daftar Akun)
- Dropdown (Filter)

Structure Layout:

Page Layout
├─ Top Navigation (Menu Akses)
├─ Navigation Menu (Sidebar with Buku Besar submenu)
└─ Content
   ├─ Page Header with title & action button
   ├─ Search & Filter Section
   │  ├─ TextField (Search by Kode/Nama Akun)
   │  └─ Dropdown (Filter)
   └─ Table (Account List)
      ├─ Kode Akun (Code column - linked)
      ├─ Nama Akun (Account Name - linked)
      ├─ Grup Akun (Account Group)
      ├─ Tipe Akun (Account Type)
      └─ Total Saldo (Balance)

Required Components:
- page-layout.md (`Docs/components/page-layout.md`)
- navigation-menu.md (`Docs/components/navigation-menu.md`)
- top-bottom-navigation.md (`Docs/components/top-bottom-navigation.md`)
- page-header.md (`Docs/components/page-header.md`)
- table.md (`Docs/components/table.md`)
- text-field.md (`Docs/components/text-field.md`)
- dropdown.md (`Docs/components/dropdown.md`)
- button.md (`Docs/components/button.md`)

Responsive:
Desktop
Tablet
Mobile

Rules:
- Never create custom layout
- Never replace Table component
- Never replace Navigation Menu
- Support hierarchical account structure display