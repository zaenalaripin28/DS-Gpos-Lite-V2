import type { HTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonAppearance } from './Button';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg';
export type ModalHeaderAppearance = 'default' | 'warning' | 'danger';
export type ModalBodyVariant = 'short' | 'long';

export interface ModalAction {
  label: string;
  appearance?: ButtonAppearance;
  onClick?: () => void;
}

export interface ModalProps extends HTMLAttributes<HTMLElement> {
  open?: boolean;
  size?: ModalSize;
  headerAppearance?: ModalHeaderAppearance;
  title: string;
  body: ReactNode;
  bodyVariant?: ModalBodyVariant;
  actions?: ModalAction[];
  compositionLabel?: string;
}

export function Modal({
  open = true,
  size = 'sm',
  headerAppearance = 'default',
  title,
  body,
  bodyVariant = 'short',
  actions = [
    { label: 'Batal', appearance: 'subtle' },
    { label: 'Simpan', appearance: 'primary' },
  ],
  compositionLabel,
  className,
  ...rest
}: ModalProps) {
  if (!open) return null;

  const articleClass = [
    'modal-composition-item',
    `modal-size-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const bodyTextClass =
    bodyVariant === 'long' ? 'modal-body-text-long' : 'modal-body-text-short';

  const headerIconClass =
    headerAppearance !== 'default'
      ? `modal-header-icon modal-header-icon--${headerAppearance}`
      : '';

  const primaryAppearance: ButtonAppearance =
    headerAppearance === 'danger'
      ? 'danger'
      : headerAppearance === 'warning'
        ? 'warning'
        : 'primary';

  return (
    <article className={articleClass} {...rest}>
      {compositionLabel ? (
        <p className="modal-composition-item__label">{compositionLabel}</p>
      ) : null}
      <div className="modal-composition-body">
        <div className="modal-header-item">
          {headerIconClass ? (
            <span className={headerIconClass} aria-hidden="true" />
          ) : null}
          <span className="modal-header-item__title">{title}</span>
        </div>
        <p className={bodyTextClass}>{body}</p>
        <div className="modal-footer-container">
          <div className="modal-footer-actions">
            {actions.map((action, i) => (
              <Button
                key={`${action.label}-${i}`}
                type="button"
                appearance={
                  action.appearance ??
                  (i === actions.length - 1 ? primaryAppearance : 'subtle')
                }
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
