# Design System GPOS Lite V 2.0

Comprehensive design system documentation untuk GPOS Lite dengan design tokens, components, dan implementation guidelines. Dibangun dengan CSS variables dan Tailwind CSS untuk easy scalability dan customization.

## 📁 Struktur File

```
├── index.html                 # Landing page & overview
├── pages/
│   ├── colors.html           # Color system & palette
│   ├── typography.html       # Fonts, sizes, weights
│   ├── spacing.html          # Spacing scale & rhythm
│   ├── shadows.html          # Elevation system
│   ├── borders.html          # Border radius & width
│   ├── grid.html             # Responsive grid & layout
│   └── components.html       # Component library
├── css/
│   └── styles.css            # All CSS variables & base styles
├── js/
│   └── script.js             # Interactive features
├── tailwind.config.js        # Tailwind configuration
└── README.md                 # This file
```

## 🎨 Design Tokens Overview

### Color System
- **Primary**: Indigo (#6366f1) - Main brand color
- **Secondary**: Purple (#a855f7) - Accent color  
- **Semantic Colors**: Success, Warning, Error, Info
- **Grayscale**: Complete 10-step scale (50-900)

**Usage**: Semua color tersedia sebagai CSS variables dan Tailwind utilities
```css
/* CSS Variables */
background-color: var(--color-primary-500);

/* Tailwind */
<div class="bg-primary-500 text-white">...</div>
```

### Typography
- **Primary Font**: System stack (-apple-system, Segoe UI, Roboto, etc)
- **Mono Font**: Courier New (untuk code blocks)
- **Font Sizes**: 9 levels (12px - 48px)
- **Font Weights**: Light (300), Normal (400), Medium (500), Semibold (600), Bold (700)

```html
<h1 class="text-4xl font-bold">Heading 1</h1>
<p class="text-base font-normal">Body text</p>
<code class="font-mono text-sm">Code snippet</code>
```

### Spacing
12-step spacing scale berbasis 4px base unit:
```
1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 
8 (32px), 12 (48px), 16 (64px), 20 (80px), 24 (96px)
```

### Shadows
1-level elevation system:
- `shadow-sm`: Subtle (1px offset)

### Border Radius
- `rounded-none`: 0px
- `rounded-sm`: 4px
- `rounded-md`: 8px (default)
- `rounded-lg`: 12px (cards)
- `rounded-xl`: 16px (modals)
- `rounded-2xl`: 24px
- `rounded-full`: Pill shapes

### Responsive Breakpoints
```
xs: 0 (mobile)
sm: 640px (landscape mobile)
md: 768px (tablet)
lg: 1024px (desktop)
xl: 1280px (wide desktop)
2xl: 1536px (ultra wide)
```

## 🚀 Quick Start

### 1. Copy Tailwind Config
Gunakan `tailwind.config.js` yang sudah dikonfigurasi dengan semua design tokens kami:

```bash
# Copy tailwind.config.js ke project Anda
cp tailwind.config.js ../your-project/
```

### 2. Copy CSS Variables
Gunakan `css/styles.css` sebagai base stylesheet:

```html
<link rel="stylesheet" href="design-system/css/styles.css">
```

### 3. Use Tailwind Classes
Semua design tokens sudah terintegrasi dengan Tailwind:

```html
<!-- Button dengan design tokens -->
<button class="px-6 py-3 rounded-md bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors">
  Button
</button>

<!-- Card dengan design system -->
<div class="p-6 rounded-lg shadow-md border border-gray-200 bg-white">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-gray-600">Card content</p>
</div>
```

### 4. Reference CSS Variables
Atau gunakan CSS variables untuk custom styling:

```css
.custom-component {
  background-color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}
```

## 📖 Documentation Guide

### Untuk Designers
- **Colors**: Lengkap color palette dengan shade levels dan usage
- **Typography**: Font selections, sizes, weights, dan line heights
- **Spacing**: Spacing scale dengan visual examples
- **Shadows**: Elevation system dengan use cases
- **Borders**: Border radius dan width options
- **Components**: Ready-to-use component patterns

### Untuk Developers
- **Tailwind Config**: Siap pakai configuration dengan semua tokens
- **CSS Variables**: Lengkap CSS variable definitions di `css/styles.css`
- **Code Examples**: Copy-paste ready code untuk setiap foundation
- **Best Practices**: Do's and Don'ts untuk consistent implementation

## 💡 Implementation Guidelines

### ✅ Best Practices

1. **Gunakan Design Tokens**
   ```html
   <!-- Good -->
   <div class="bg-primary-500 px-4 py-2 rounded-md">Button</div>
   
   <!-- Avoid -->
   <div style="background-color: #6366f1; padding: 8px 16px;">Button</div>
   ```

2. **Mobile-First Design**
   ```html
   <!-- Base = mobile, then enhance for larger screens -->
   <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
     ...
   </div>
   ```

3. **Semantic Naming**
   ```html
   <!-- Use semantic colors for status -->
   <div class="bg-success-100 text-success-700">Success message</div>
   <div class="bg-error-100 text-error-700">Error message</div>
   ```

4. **Consistent Spacing**
   ```html
   <!-- Maintain rhythm dengan spacing scale -->
   <div class="mb-4">Item 1</div>
   <div class="mb-4">Item 2</div>
   <div class="mt-8">Section break</div>
   ```

5. **Accessibility First**
   - Maintain contrast ratio ≥ 4.5:1 untuk text
   - Use semantic HTML elements
   - Ensure keyboard navigation
   - Test dengan screen readers

### ❌ Avoid

- Hardcode color values - gunakan CSS variables/Tailwind classes
- Create custom color palettes - use existing system
- Skip responsive testing - test semua breakpoints
- Ignore accessibility - always test a11y

## 📱 Responsive Strategy

```html
<!-- Mobile first approach -->
<div class="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8">
  <aside class="w-full md:w-64">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>
```

Breakpoint prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up (tablet)
- `lg:` - 1024px and up (desktop)
- `xl:` - 1280px and up (wide desktop)
- `2xl:` - 1536px and up (ultra wide)

## 🔧 Customization

Untuk customize design system, edit file-file berikut:

### 1. Colors
**File**: `css/styles.css`
```css
:root {
  --color-primary-500: #6366f1; /* Change primary color */
  --color-primary-600: #4f46e5; /* And all shade variations */
  ...
}
```

### 2. Fonts
**File**: `css/styles.css`
```css
:root {
  --font-primary: 'Your Font', sans-serif;
  --font-size-base: 1rem;
}
```

### 3. Spacing
**File**: `css/styles.css` & `tailwind.config.js`
```css
--spacing-4: 1rem; /* Change base spacing unit */
```

## 🧪 Testing Checklist

- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Responsive layout works on all breakpoints
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] No hardcoded values (using tokens)
- [ ] Consistent spacing throughout
- [ ] Button hover/focus states
- [ ] Form validation states

## 📚 Additional Resources

### Tailwind CSS Docs
- https://tailwindcss.com/docs
- Utility classes reference
- Component examples

### Design Tokens
- CSS Variables: `css/styles.css`
- Tailwind Config: `tailwind.config.js`
- All values documented in HTML pages

### WCAG Accessibility
- Color contrast checker: https://webaim.org/resources/contrastchecker/
- Accessibility guidelines: https://www.w3.org/WAI/WCAG21/quickref/

## 🔄 Version History

### V 2.0
- Complete design system documentation
- 6 core color palettes
- Responsive 12-column grid
- Elevation system dengan shadows
- Typography scale dengan multiple font weights
- Spacing system berbasis 4px base unit
- Tailwind CSS integration
- Multi-page documentation dengan best practices

## 👥 Contributing

Saat menambahkan token atau component baru:

1. Update `css/styles.css` dengan CSS variable
2. Update `tailwind.config.js` dengan config
3. Dokumentasikan di halaman yang sesuai
4. Tambahkan usage guidelines (Do's & Don'ts)
5. Test accessibility compliance

## 📝 License

Design System GPOS Lite V 2.0 - Internal Use

---

**Maintained with ❤️ | Last Updated: 2024**
