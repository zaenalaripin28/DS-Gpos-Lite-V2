# Tailwind Token Refactor Tool

Automated, incremental refactor for static HTML in the GPOS Lite design system. Replaces hardcoded Tailwind utilities with token-based classes defined in `token_mapping.json`.

## What it does

- Scans `pages/`, `components/`, and `index.html`
- Updates **only** real HTML `class` attribute values
- Skips escaped documentation snippets (`&lt;div class="..."`)
- Preserves variant/responsive prefixes (`hover:`, `md:`, …)
- Leaves unmapped utilities unchanged
- Creates timestamped backups before `--apply`
- Supports rollback from backup

## Requirements

- Python 3.9+ (stdlib only, no pip install)

## Quick start

From the repository root:

```bash
# 0. Validate HTML for legacy / unmigrated utilities
python scripts/validate_tokens.py

# 1. Preview changes (no files modified)
python scripts/refactor_tokens.py --dry-run

# 2. Verbose preview
python scripts/refactor_tokens.py --dry-run --verbose

# 3. Apply changes (backup created automatically)
python scripts/refactor_tokens.py --apply

# 3b. Components only + documentation snippets (code blocks, copyCode)
python scripts/refactor_tokens.py --apply --only-target components --include-snippets

# 4. Rollback to latest backup
python scripts/refactor_tokens.py --rollback

# 5. Rollback to a specific backup
python scripts/refactor_tokens.py --rollback --backup-id 20260529-143022

# 6. List available backups
python scripts/refactor_tokens.py --list-backups
```

## Files

| File | Purpose |
|------|---------|
| `scripts/refactor_tokens.py` | Main refactor script |
| `scripts/token_mapping.json` | Utility → token class mappings |
| `.refactor-backups/` | Timestamped file backups (gitignored recommended) |

## Incremental workflow

1. Add a small batch of mappings to `token_mapping.json` (one category at a time).
2. Run `--dry-run` and review the log.
3. Open affected pages in the browser and confirm visuals.
4. Run `--apply`.
5. Commit mapping + HTML changes together.

Recommended order: **colors → spacing → radius → typography → shadows → borders → states**.

## Adding mappings

Edit `scripts/token_mapping.json` under `categories`:

```json
{
  "categories": {
    "colors": {
      "text-slate-600": "text-neutral-n200"
    },
    "spacing": {
      "p-4": "p-100"
    }
  }
}
```

Rules:

- Map only to classes that exist in `tailwind.config.js` or that use project CSS variables.
- Do **not** add mappings that change pixel values unless intentional.
- Remove identity mappings (`"shadow-sm": "shadow-sm"`).
- Prefer longest, most specific keys (script sorts longest-first).

You can also use a flat `"mappings"` object at the root level.

## Options

| Flag | Description |
|------|-------------|
| `--dry-run` | Preview replacements, no writes |
| `--apply` | Write changes + create backup |
| `--rollback` | Restore from backup |
| `--backup-id ID` | Specific backup for rollback |
| `--backup-dir PATH` | Custom backup folder (default: `.refactor-backups`) |
| `--mapping PATH` | Custom mapping JSON |
| `--verbose` / `-v` | Log full class strings before/after |
| `--target PATH` | Scan path (repeatable) |
| `--only-target` | Scan only `--target` paths (skip default pages/components/index) |
| `--include-snippets` | Also refactor `<code>` utilities, `copyCode`/`copyTailwind`, escaped markup |

## Safety

- **Structure**: Only `class="..."` / `class='...'` on real tags are touched.
- **Attributes**: `aria-*`, `data-*`, `id`, `role`, etc. are never modified.
- **Unknown classes**: Unlisted utilities stay as-is.
- **Backups**: Each `--apply` copies changed files to `.refactor-backups/<timestamp>/` with `manifest.json`.
- **Rollback**: Restores exact pre-apply file contents from backup.

## Scope

Included by default:

- `pages/**/*.html`
- `components/**/*.html`
- `index.html`

Not scanned unless you pass `--target`:

- `foundations/`
- `styles/`
- Storybook / JS files

## Troubleshooting

**No files found**  
`pages/` may not exist yet; only `components/` and `index.html` are scanned.

**Documentation examples changed**  
Escaped `&lt;... class="..."` blocks are skipped. If an example still changes, report the pattern.

**Visual regression after apply**  
```bash
python scripts/refactor_tokens.py --rollback
```
Then remove or fix the offending mapping and re-run `--dry-run`.

## Example npm script (optional)

Add to `package.json`:

```json
"refactor:tokens:dry": "python scripts/refactor_tokens.py --dry-run",
"refactor:tokens:apply": "python scripts/refactor_tokens.py --apply"
```
