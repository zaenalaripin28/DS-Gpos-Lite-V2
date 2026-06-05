import type { HTMLAttributes, ReactNode } from 'react';

export type FormRowState = 'default' | 'valid' | 'invalid';
export type FormMessageType = 'error' | 'information' | 'true';

export interface FormRowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  state?: FormRowState;
  message?: string;
  messageType?: FormMessageType;
  children: ReactNode;
}

export function FormRow({
  label,
  state = 'default',
  message,
  messageType = 'error',
  children,
  className,
  ...rest
}: FormRowProps) {
  const rowClass = [
    'ds-form-row',
    state !== 'default' ? `ds-form-row--${state}` : 'ds-form-row--default',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const messageClass = message
    ? ['ds-form-message', `ds-form-message--${messageType}`].join(' ')
    : '';

  return (
    <div className={rowClass} {...rest}>
      <p className="ds-form-row__label">{label}</p>
      <div className="ds-form-row__field">{children}</div>
      {message ? (
        <p
          className={messageClass}
          role={messageType === 'error' ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
