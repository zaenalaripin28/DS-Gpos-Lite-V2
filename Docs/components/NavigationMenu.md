# NavigationMenu

## Purpose

Expandable sidebar navigation container that hosts heading, search, main-menu, submenu, and divider parts. Supports an expanded/collapsed (hide) layout and an interactive mode for hover/press/selected/focus states.

## Source of Truth

* HTML Reference: components/Navigation menu/
* Runtime Component: src/GposLite/components/NavigationMenu.tsx
* Styles: src/GposLite/styles/navigation-menu.css
* Tokens: styles/tokens.css

## Anatomy

* Container (`div.ds-sidebar-nav-expand`, `.ds-sidebar-nav-expand--hide`, `.ds-sidebar-nav-expand--interactive`)
* Header (`.ds-sidebar-nav-expand__header`) with title (`.ds-sidebar-nav-expand__title`) and collapse control (`.ds-sidebar-nav-expand__collapse`)
* Scroll region (`.ds-sidebar-nav-expand__scroll`)
* Search (`.ds-nav-menu-search-wrap` > `.ds-nav-menu-search` > `.ds-nav-menu-search__input`, `__trail`)
* Heading snap (`.ds-nav-heading-snap`, `__label-row`, `__lead`, `__toggle`)
* Menu / recent lists (`.ds-sidebar-nav-expand__menu`, `.ds-sidebar-nav-expand__recent`, `.ds-sidebar-nav-expand__item`)
* Main menu item (`.ds-nav-mainmenu-snap`, `__lead`, `__body`, `__trail`)
* Submenu item (`.ds-nav-submenu-snap`, `__dot`, `__label`, `__trail`)
* Divider (`.ds-nav-divider`)

> The runtime component renders the container only; the parts above are supplied as `children`.

## Variants

| Variant | Description |
| ------- | ----------- |
| default | Expanded interactive sidebar (`.ds-sidebar-nav-expand` + `--interactive`) |
| interactive | Enables hover/press/selected/focus styling on items (`.ds-sidebar-nav-expand--interactive`) |
| hide | Collapsed icon-only rail (`.ds-sidebar-nav-expand--hide`) |

## Sizes

| Size | Height | Notes |
| ---- | ------ | ----- |
| expanded | flex column | `max-width: 280px` (default) |
| hide | flex column | `max-width`/`width: var(--space-600)` (48px) icon rail |

## States

* Default
* Collapsed / hide (`.ds-sidebar-nav-expand--hide`)
* Item hover (`--interactive .ds-nav-mainmenu-snap:hover` / `.ds-nav-submenu-snap:hover` / `--hover`)
* Item active / press (`:active` / `--press`)
* Item selected (`--selected`, blue surface + blue label)
* Item focus (`--interactive ... :focus-visible`, `outline: 2px solid`)
* Search hover (`.ds-nav-menu-search--hover`)
* Search focus / typing (`.ds-nav-menu-search--focus` / `--typing`)

## Token Usage

### Colors

* --color-neutral-n0
* --color-neutral-n10
* --color-neutral-n30
* --color-neutral-n40
* --color-neutral-n60
* --color-neutral-n200
* --color-neutral-n900
* --color-border
* --color-text-primary
* --color-blue-b50
* --color-blue-b300

### Spacing

* --space-050
* --space-075
* --space-100
* --space-150
* --space-250
* --space-400
* --space-600

### Radius

* --border-radius-sm
* --border-radius-md

### Typography

* --font-primary
* --font-size-body2
* --font-size-body3
* --font-weight-semibold
* --font-weight-regular
* --line-height-tight
* --letter-spacing-tight
* --text-caption-regular-size
* --text-caption-regular-weight
* --text-caption-regular-lh

## Accessibility

* Runtime root is a `<div>` with no ARIA roles applied by the component; semantics come from the `children` parts.
* In interactive mode, `.ds-nav-mainmenu-snap` and `.ds-nav-submenu-snap` expose focus via `:focus-visible { outline: 2px solid }` with `outline-offset`.
* Item lead/trail/dot graphics are `img`/svg elements sized from the icon system.

## Responsive Behavior

At `max-width: 640px`, navigation parts (`.ds-nav-mainmenu-snap`, `.ds-nav-submenu-snap`, `.ds-nav-heading-snap`, `.ds-nav-menu-search-wrap`, `.ds-nav-menu-search-state`) expand to `max-width: 100%`. Other media queries (`1024px`, `900px`, `768px`, `480px`) target documentation/demo helpers and page layout.

## Composition Rules

Component may be used together with:

* Heading snap, main-menu snap, submenu snap, divider, and search parts (as `children`)
* Icons from `assets/icons` (lead, trail, dot, search trail)

## Do

* Gunakan semantic tokens dari styles/tokens.css
* Gunakan icon dari assets/icons
* Gunakan class `.ds-sidebar-nav-expand` dan part `.ds-nav-*` yang ada

## Don't

* Hardcode color
* Hardcode spacing
* Tambah variant baru di luar hide/interactive

## AI Generation Rules

When AI generates this component:

* Gunakan token yang sudah ada
* Jangan membuat variant baru di luar default/interactive/hide
* Jangan membuat ukuran baru di luar expanded/hide
* Jangan membuat custom shadow
* Ikuti anatomy yang ada
* Ikuti struktur existing component (`.ds-sidebar-nav-expand` + `.ds-nav-*` parts)

## Example Structure

```
NavigationMenu (div.ds-sidebar-nav-expand[--hide][--interactive])
├─ Header (.ds-sidebar-nav-expand__header)
│  ├─ Title (.ds-sidebar-nav-expand__title)
│  └─ Collapse (.ds-sidebar-nav-expand__collapse)
└─ Scroll (.ds-sidebar-nav-expand__scroll)
   ├─ Search (.ds-nav-menu-search-wrap)
   ├─ Heading (.ds-nav-heading-snap)
   ├─ Menu (.ds-sidebar-nav-expand__menu)
   │  ├─ Main item (.ds-nav-mainmenu-snap)
   │  └─ Submenu item (.ds-nav-submenu-snap)
   └─ Divider (.ds-nav-divider)
```
