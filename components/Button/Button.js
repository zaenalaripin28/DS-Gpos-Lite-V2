/**
 * Button — DS GPOS Lite V2
 *
 * Factory function aligned with Figma component props:
 * appearance / spacing / isSelected / isDisabled / isLoading / iconOnly
 *
 * Usage:
 *   import { createButton } from './Button';
 *   document.body.appendChild(createButton({ label: 'Save', appearance: 'default' }));
 */

// ── Appearance token map ──────────────────────────────────────────────────────
//
// Each entry defines:
//   base     — resting colors (bg + text + border)
//   hover    — hover override
//   active   — pressed override
//   ring     — focus-visible ring color
//   selected — isSelected=true override (keeps same sizing/shape)
//
// Add new appearances here when the Figma spec grows (primary, subtle, danger…).

const APPEARANCES = {
  default: {
    base:     'bg-neutral-n30 text-neutral-n900 border-transparent',
    hover:    'hover:bg-neutral-n40',
    active:   'active:bg-neutral-n50',
    ring:     'focus-visible:ring-neutral-n100',
    selected: 'bg-white text-neutral-n900 border-blue-b300',
  },
};

// ── Spacing token map ─────────────────────────────────────────────────────────
//
// Maps Figma "spacing" prop to Tailwind padding utilities.
// Uses GP Lite spacing tokens (see tailwind.config.js → theme.extend.spacing).
//   default → py-100 (8px) px-200 (16px) → ~38px total height
//   compact → py-075 (6px) px-150 (12px) → ~34px total height

const SPACINGS = {
  default: 'py-100 px-200',
  compact: 'py-075 px-150',
};

// ── SVG assets ────────────────────────────────────────────────────────────────

const SPINNER_SVG = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg"
  width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <circle class="opacity-25" cx="12" cy="12" r="10"
    stroke="currentColor" stroke-width="4"/>
  <path class="opacity-75" fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 12h-4z"/>
</svg>`;

// ── createButton factory ──────────────────────────────────────────────────────

/**
 * @param {object}   options
 * @param {string}   [options.label='Button']   - Visible button text
 * @param {string}   [options.appearance]       - Visual style key (see APPEARANCES)
 * @param {string}   [options.spacing]          - Size key (see SPACINGS)
 * @param {boolean}  [options.isSelected]       - Toggle / active state
 * @param {boolean}  [options.isDisabled]       - Prevents interaction, visually faded
 * @param {boolean}  [options.isLoading]        - Shows spinner, locks interaction
 * @param {boolean}  [options.iconOnly]         - Omit label, show icon only
 * @param {string}   [options.leadingIcon]      - SVG string rendered before label
 * @param {string}   [options.trailingIcon]     - SVG string rendered after label
 * @param {Function} [options.onClick]          - Click event handler
 * @returns {HTMLButtonElement}
 */
export function createButton({
  label        = 'Button',
  appearance   = 'default',
  spacing      = 'default',
  isSelected   = false,
  isDisabled   = false,
  isLoading    = false,
  iconOnly     = false,
  leadingIcon  = null,
  trailingIcon = null,
  onClick,
} = {}) {
  const tokens     = APPEARANCES[appearance] ?? APPEARANCES.default;
  const spacingCls = SPACINGS[spacing] ?? SPACINGS.default;
  const inactive   = isDisabled || isLoading;

  // Resolve appearance classes — selected state overrides base/hover/active
  const appearanceCls = isSelected
    ? tokens.selected
    : `${tokens.base} ${tokens.hover} ${tokens.active}`;

  const btn = document.createElement('button');
  btn.type     = 'button';
  btn.disabled = inactive;

  if (isSelected) btn.setAttribute('aria-pressed', 'true');

  btn.className = [
    // Layout
    'inline-flex items-center justify-center',
    'gap-2',
    // Typography — inherits Poppins from body
    'text-sm font-semibold leading-5',
    'whitespace-nowrap select-none',
    // Shape
    'rounded-md',
    'border',
    // Interaction
    'cursor-pointer',
    'transition-all duration-[150ms] ease-in-out',
    // Accessibility — focus ring
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    tokens.ring,
    'focus-visible:ring-offset-2',
    // Spacing
    spacingCls,
    // Appearance (state-resolved)
    appearanceCls,
    // Disabled / loading overlay
    inactive ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
  ].filter(Boolean).join(' ');

  // ── Content ───────────────────────────────────────────────────────────────

  if (isLoading) {
    const spin = document.createElement('span');
    spin.className = 'flex-shrink-0';
    spin.innerHTML = SPINNER_SVG;
    btn.appendChild(spin);
  } else if (leadingIcon) {
    const icon = document.createElement('span');
    icon.className = 'flex-shrink-0 w-4 h-4 flex items-center justify-center';
    icon.innerHTML = leadingIcon;
    btn.appendChild(icon);
  }

  if (!iconOnly) {
    const text = document.createElement('span');
    text.textContent = isLoading ? 'Loading…' : label;
    btn.appendChild(text);
  }

  if (trailingIcon && !isLoading) {
    const icon = document.createElement('span');
    icon.className = 'flex-shrink-0 w-4 h-4 flex items-center justify-center';
    icon.innerHTML = trailingIcon;
    btn.appendChild(icon);
  }

  if (onClick) btn.addEventListener('click', onClick);

  return btn;
}
