import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type SelectTriggerAppearance = 'default' | 'subtle' | 'none';

export interface SelectProps {
  value: ReactNode;
  appearance?: SelectTriggerAppearance;
  open?: boolean;
  defaultOpen?: boolean;
  empty?: boolean;
  loading?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  menu?: ReactNode;
  onTriggerClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  className?: string;
}

export function Select({
  value,
  appearance = 'default',
  open,
  defaultOpen = false,
  empty = false,
  loading = false,
  invalid = false,
  disabled = false,
  ariaLabel,
  menu,
  onTriggerClick,
  className,
}: SelectProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const triggerClass = [
    'ds-select-trigger',
    appearance !== 'default' ? `ds-select-trigger--${appearance}` : '',
    empty ? 'ds-select-trigger--empty' : '',
    loading ? 'ds-select-trigger--loading' : '',
    invalid ? 'ds-select-trigger--invalid' : '',
    disabled ? 'ds-select-trigger--disabled' : '',
    isOpen ? 'ds-select-trigger--focus' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const valueClass = [
    'ds-select-trigger__value',
    empty ? 'ds-select-trigger__value--empty' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="ds-select-component">
      <button
        type="button"
        className={triggerClass}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-busy={loading || undefined}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={(e) => {
          if (open === undefined) setInternalOpen((v) => !v);
          onTriggerClick?.(e);
        }}
      >
        <span className={valueClass}>{value}</span>
        <svg
          className="ds-select-trigger__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      {isOpen && menu ? menu : null}
    </div>
  );
}
