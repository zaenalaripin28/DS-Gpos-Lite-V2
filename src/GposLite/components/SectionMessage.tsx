import type { HTMLAttributes, ReactNode } from 'react';

export type SectionMessageAppearance =
  | 'information'
  | 'success'
  | 'warning'
  | 'error'
  | 'discovery';

export interface SectionMessageAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface SectionMessageProps extends HTMLAttributes<HTMLElement> {
  appearance?: SectionMessageAppearance;
  title: string;
  titleId?: string;
  description: ReactNode;
  actions?: SectionMessageAction[];
}

export function SectionMessage({
  appearance = 'information',
  title,
  titleId,
  description,
  actions = [],
  className,
  ...rest
}: SectionMessageProps) {
  const id = titleId ?? `sm-title-${appearance}`;
  const rootClass = [
    'ds-section-message',
    `ds-section-message--${appearance}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article
      className={rootClass}
      role="region"
      aria-labelledby={id}
      {...rest}
    >
      <div className="ds-section-message__header">
        <span className="ds-section-message__icon" aria-hidden="true" />
        <div className="ds-section-message__main">
          <h3 className="ds-section-message__title" id={id}>
            {title}
          </h3>
        </div>
      </div>
      <div className="ds-section-message__body">
        <p className="ds-section-message__description">{description}</p>
        {actions.length > 0 ? (
          <div className="ds-section-message__actions">
            {actions.map((action, index) => (
              <span key={action.label}>
                {index > 0 ? (
                  <span
                    className="ds-section-message__action-sep"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                ) : null}
                <a
                  href={action.href ?? '#'}
                  className="ds-section-message__action"
                  onClick={action.onClick}
                >
                  {action.label}
                </a>
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
