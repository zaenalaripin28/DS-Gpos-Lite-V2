# Setup & Push ke GitHub

Panduan lengkap untuk push design system ke GitHub repository Anda.

## 📋 Prerequisites

- Git installed di computer Anda
- GitHub account dan repository sudah dibuat
- SSH key atau personal access token sudah setup

## 🚀 Setup Steps

### 1. Clone Repository (Jika belum)

```bash
# Clone repository Anda
git clone https://github.com/zaenalaripin28/gpos-lite-design-system.git
cd gpos-lite-design-system
```

### 2. Copy Design System Files

Copy semua file dari output folder ini ke repository:

```bash
# Copy dari output folder ke repo
# (Sesuaikan path dengan lokasi file Anda)

# Struktur folder yang sudah disiapkan:
cp -r pages/ .
cp -r css/ .
cp -r js/ .
cp index.html .
cp README.md .
cp tailwind.config.js .
```

### 3. Buat .gitignore (Opsional)

```bash
# Create .gitignore file
cat > .gitignore << EOF
node_modules/
dist/
.env
.DS_Store
*.log
EOF
```

### 4. Buat package.json (Untuk project setup)

```bash
npm init -y
npm install -D tailwindcss
```

Atau create file `package.json` manual:

```json
{
  "name": "gpos-lite-design-system",
  "version": "2.0.0",
  "description": "Comprehensive design system documentation untuk GPOS Lite",
  "main": "index.html",
  "scripts": {
    "dev": "npx tailwindcss -i ./css/styles.css -o ./dist/output.css --watch",
    "build": "npx tailwindcss -i ./css/styles.css -o ./dist/output.css --minify"
  },
  "keywords": ["design-system", "tailwind", "gpos"],
  "author": "Your Team",
  "license": "INTERNAL"
}
```

### 5. Push ke GitHub

```bash
# Initialize git (jika belum)
git init

# Add semua files
git add .

# Commit
git commit -m "Initial commit: Design System GPOS Lite V 2.0

- Complete design tokens documentation
- Color system dengan 6 palettes
- Typography scale (12px - 48px)
- Spacing system berbasis 4px base unit
- Responsive grid dengan 6 breakpoints
- Shadow elevation system
- Multi-page documentation website
- Tailwind CSS configuration
- HTML, CSS, JavaScript untuk interactive features"

# Add remote (jika belum)
git remote add origin https://github.com/zaenalaripin28/gpos-lite-design-system.git

# Push ke main branch
git branch -M main
git push -u origin main
```

## 📁 File Structure di GitHub

```
gpos-lite-design-system/
├── README.md                 # Main documentation
├── SETUP_GITHUB.md          # This file
├── package.json             # Project metadata
├── tailwind.config.js       # Tailwind configuration
├── index.html               # Landing page
│
├── pages/
│   ├── colors.html
│   ├── typography.html
│   ├── spacing.html
│   ├── shadows.html
│   ├── borders.html
│   ├── grid.html
│   └── components.html
│
├── css/
│   └── styles.css           # All CSS variables
│
├── js/
│   └── script.js            # Interactive features
│
└── .gitignore
```

## 🌐 Deploy ke GitHub Pages (Opsional)

Untuk host design system documentation secara gratis:

### Option 1: Automatic Deploy

1. Go to repository settings
2. Scroll ke "GitHub Pages"
3. Select "main" branch sebagai source
4. Design system akan available di: `https://zaenalaripin28.github.io/gpos-lite-design-system`

### Option 2: GitHub Actions

Create file `.github/workflows/deploy.yml`:

```yaml
name: Deploy Design System

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 📝 Update Repository

### Saat ada perubahan design tokens:

```bash
# Update files yang berubah
git add .

# Commit dengan descriptive message
git commit -m "Update: Add new color variant - Secondary-950"

# Push
git push origin main
```

### Update yang sering:

```bash
# Quick update
git add pages/colors.html css/styles.css
git commit -m "docs: Update color documentation"
git push
```

## 🔍 Verification

Setelah push, verify setup:

1. Buka repository di GitHub
2. Check semua files ada
3. Verify README.md terlihat dengan baik
4. Test link ke pages (jika GitHub Pages enabled)

## 🔗 Useful Commands

```bash
# Check git status
git status

# View commit history
git log --oneline

# Create branch untuk features
git checkout -b feature/add-new-tokens

# Merge ke main
git checkout main
git merge feature/add-new-tokens

# Delete branch
git branch -d feature/add-new-tokens
```

## 📧 Sharing dengan Team

### Share Repository URL
```
https://github.com/zaenalaripin28/gpos-lite-design-system
```

### Share GitHub Pages URL (if deployed)
```
https://zaenalaripin28.github.io/gpos-lite-design-system
```

### Share Direct Link ke Spesifik Page
```
https://zaenalaripin28.github.io/gpos-lite-design-system/pages/colors.html
```

## ⚠️ Important Notes

1. **Keep Repository Updated**: Update design tokens saat ada changes
2. **Document Everything**: Dokumentasi adalah kunci design system
3. **Version Control**: Use meaningful commit messages
4. **Collaboration**: Use branches untuk feature development
5. **Accessibility**: Always test WCAG compliance

## 🆘 Troubleshooting

### Push rejection
```bash
# Pull latest changes first
git pull origin main

# Then push
git push origin main
```

### Commit mistakes
```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Or modify last commit
git commit --amend
```

### Reset ke last commit
```bash
git reset --hard HEAD
```

## 📚 Next Steps

1. ✅ Push initial design system to GitHub
2. Create GitHub Pages untuk live documentation
3. Invite team members ke repository
4. Setup branch protection rules
5. Document contribution guidelines
6. Create issues untuk future enhancements

---

**Happy designing! 🎨**
