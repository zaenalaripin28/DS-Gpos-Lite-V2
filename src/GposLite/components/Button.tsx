import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonAppearance =
  | 'default'
  | 'primary'
  | 'subtle'
  | 'subtle-link'
  | 'danger'
  | 'warning'
  | 'link'
  | 'icon-only';

export type ButtonSnapshotState = 'hover' | 'press' | 'focus' | 'disabled';

const APPEARANCE_MOD: Record<ButtonAppearance, string> = {
  default: '',
  primary: 'ds-btn--primary',
  subtle: 'ds-btn--subtle',
  'subtle-link': 'ds-btn--subtle-link',
  danger: 'ds-btn--danger',
  warning: 'ds-btn--warning',
  link: 'ds-btn--link',
  'icon-only': 'ds-btn--icon-only',
};

function ButtonSpinner({ compact }: { compact?: boolean }) {
  const size = compact ? 16 : 16;
  return (
    <span className="ds-spinner" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle
          cx="8"
          cy="8"
          r="6"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <path
          d="M8 2a6 6 0 0 1 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: ButtonAppearance;
  compact?: boolean;
  none?: boolean;
  loading?: boolean;
  selected?: boolean;
  /** Snapshot state dokumentasi: `.ds-btn--{state}` */
  snapshotState?: ButtonSnapshotState;
  children?: ReactNode;
}

export function Button({
  appearance = 'default',
  compact = false,
  none = false,
  loading = false,
  selected = false,
  snapshotState,
  disabled,
  className,
  children,
  type = 'button',
  tabIndex,
  'aria-busy': ariaBusy,
  'aria-pressed': ariaPressed,
  ...rest
}: ButtonProps) {
  const appearanceClass = APPEARANCE_MOD[appearance];
  const rootClass = [
    'ds-btn',
    appearanceClass,
    compact ? 'ds-btn--compact' : '',
    none ? 'ds-btn--none' : '',
    loading ? 'ds-btn--loading' : '',
    snapshotState === 'disabled' || disabled ? 'ds-btn--disabled' : '',
    snapshotState && snapshotState !== 'disabled'
      ? `ds-btn--${snapshotState}`
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading || snapshotState === 'disabled';

  return (
    <button
      type={type}
      className={rootClass}
      disabled={isDisabled}
      aria-busy={loading ? true : ariaBusy}
      aria-pressed={selected ? true : ariaPressed}
      tabIndex={loading ? -1 : tabIndex}
      {...rest}
    >
      {loading ? <ButtonSpinner compact={compact} /> : children}
    </button>
  );
}
