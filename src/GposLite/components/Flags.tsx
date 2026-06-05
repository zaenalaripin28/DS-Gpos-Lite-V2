import { useState, type HTMLAttributes, type ReactNode } from 'react';

export type FlagAppearance =
  | 'normal'
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface FlagsProps extends HTMLAttributes<HTMLElement> {
  appearance?: FlagAppearance;
  title: string;
  description?: ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  iconSrc?: string;
  dismissIconSrc?: string;
  chevronIconSrc?: string;
  onDismiss?: () => void;
  onToggleCollapse?: () => void;
  actions?: ReactNode;
  'aria-label'?: string;
}

const DEFAULT_ICON = 'assets/icons/icon-solid-check-circle.svg';
const DEFAULT_DISMISS = 'assets/icons/icon-x-mark.svg';
const DEFAULT_CHEVRON = 'assets/icons/icon-chevron-down.svg';

export function Flags({
  appearance = 'normal',
  title,
  description,
  collapsed,
  defaultCollapsed = false,
  iconSrc = DEFAULT_ICON,
  dismissIconSrc = DEFAULT_DISMISS,
  chevronIconSrc = DEFAULT_CHEVRON,
  onDismiss,
  onToggleCollapse,
  actions,
  className,
  'aria-label': ariaLabel,
  ...rest
}: FlagsProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = collapsed ?? internalCollapsed;

  const rootClass = [
    'ds-flag',
    `ds-flag--${appearance}`,
    isCollapsed ? 'ds-flag--collapsed' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    if (onToggleCollapse) onToggleCollapse();
    else setInternalCollapsed((v) => !v);
  };

  return (
    <article
      className={rootClass}
      role="region"
      aria-label={ariaLabel ?? `Flag ${appearance}`}
      {...rest}
    >
      <div className="ds-flag__header">
        <div className="ds-flag__icon" aria-hidden="true">
          <img src={iconSrc} alt="" />
        </div>
        <div className="ds-flag__main">
          <div className="ds-flag__title-row">
            <h3 className="ds-flag__title">{title}</h3>
            <div className="ds-flag__controls">
              {onToggleCollapse || defaultCollapsed !== undefined ? (
                <button
                  type="button"
                  className="ds-flag-part ds-flag-part--icon"
                  aria-label="Perluas detail flag"
                  aria-expanded={!isCollapsed}
                  onClick={handleToggle}
                >
                  <img src={chevronIconSrc} alt="" aria-hidden="true" />
                </button>
              ) : null}
              {onDismiss ? (
                <button
                  type="button"
                  className="ds-flag-part ds-flag-part--dismiss"
                  aria-label="Tutup flag"
                  onClick={onDismiss}
                >
                  <img src={dismissIconSrc} alt="" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {!isCollapsed && (description || actions) ? (
        <div className="ds-flag__body">
          {description ? (
            <p className="ds-flag__description">{description}</p>
          ) : null}
          {actions ? <div className="ds-flag__actions">{actions}</div> : null}
        </div>
      ) : null}
    </article>
  );
}
