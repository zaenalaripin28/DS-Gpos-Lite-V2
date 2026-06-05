import { useState, type ButtonHTMLAttributes } from 'react';
import { Button } from './Button';

export type DropdownItemRole =
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio';

export interface DropdownMenuItem {
  id: string;
  label: string;
  role?: DropdownItemRole;
  checked?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  triggerLabel: string;
  items: DropdownMenuItem[];
  open?: boolean;
  defaultOpen?: boolean;
  iconOnly?: boolean;
  scrollable?: boolean;
  chevronIconSrc?: string;
  triggerIconSrc?: string;
  menuAriaLabel?: string;
  onTriggerClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

const DEFAULT_CHEVRON = 'assets/icons/icon-chevron-mini-down.svg';
const DEFAULT_TRIGGER_ICON = 'assets/icons/icon-ellipsis-vertical.svg';

export function Dropdown({
  triggerLabel,
  items,
  open,
  defaultOpen = false,
  iconOnly = false,
  scrollable = false,
  chevronIconSrc = DEFAULT_CHEVRON,
  triggerIconSrc = DEFAULT_TRIGGER_ICON,
  menuAriaLabel = 'Menu',
  onTriggerClick,
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const triggerClass = [
    'ds-btn',
    'ds-dropdown-btn',
    iconOnly ? 'ds-btn--icon-only ds-dropdown-btn--icon-only' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const menuClass = [
    'ds-dropdown-menu',
    scrollable ? 'ds-dropdown-menu--scrollable' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="ds-dropdown">
      <Button
        type="button"
        className={triggerClass}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={iconOnly ? triggerLabel : undefined}
        onClick={(e) => {
          if (open === undefined) setInternalOpen((v) => !v);
          onTriggerClick?.(e);
        }}
      >
        {iconOnly ? (
          <img src={triggerIconSrc} alt="" width={16} height={16} aria-hidden="true" />
        ) : (
          <>
            {triggerLabel}
            <img
              className="ds-dropdown-btn__chevron"
              src={chevronIconSrc}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </>
        )}
      </Button>
      {isOpen ? (
        <div className={menuClass} role="menu" aria-label={menuAriaLabel}>
          {items.map((item) => {
            const itemClass = [
              'ds-dropdown-item',
              item.selected ? 'ds-dropdown-item--selected' : '',
            ]
              .filter(Boolean)
              .join(' ');

            const role = item.role ?? 'menuitem';

            return (
              <button
                key={item.id}
                type="button"
                className={itemClass}
                role={role}
                aria-checked={
                  role === 'menuitemcheckbox' || role === 'menuitemradio'
                    ? !!item.checked || !!item.selected
                    : undefined
                }
                onClick={item.onClick}
              >
                {role === 'menuitemcheckbox' ? (
                  <span
                    className="ds-dropdown-item__checkbox"
                    aria-hidden="true"
                  />
                ) : null}
                {role === 'menuitemradio' ? (
                  <span
                    className="ds-dropdown-item__radio"
                    aria-hidden="true"
                  />
                ) : null}
                <span className="ds-dropdown-item__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
