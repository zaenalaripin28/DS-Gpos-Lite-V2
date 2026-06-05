import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export type ToggleSize = 'regular' | 'large';

export interface ToggleProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: ToggleSize;
  ariaLabel?: string;
  checkIconSrc?: string;
  xIconSrc?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'role' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange'
  >;
}

const DEFAULT_CHECK = 'assets/icons/icon-check.svg';
const DEFAULT_X = 'assets/icons/icon-x-mark.svg';

export function Toggle({
  checked,
  defaultChecked,
  disabled = false,
  size = 'regular',
  ariaLabel = 'Toggle',
  checkIconSrc = DEFAULT_CHECK,
  xIconSrc = DEFAULT_X,
  onChange,
  inputProps,
  className,
  ...rest
}: ToggleProps) {
  const rootClass = [
    'ds-toggle',
    size === 'large' ? 'ds-toggle--large' : '',
    disabled ? 'ds-toggle--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClass} {...rest}>
      <input
        type="checkbox"
        className="ds-toggle__input"
        role="switch"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-checked={checked}
        aria-label={ariaLabel}
        onChange={onChange}
        {...inputProps}
      />
      <span className="ds-toggle__track">
        <span className="ds-toggle__icon ds-toggle__icon--on">
          <img src={checkIconSrc} alt="" aria-hidden="true" />
        </span>
        <span className="ds-toggle__thumb" />
        <span className="ds-toggle__icon ds-toggle__icon--off">
          <img src={xIconSrc} alt="" aria-hidden="true" />
        </span>
      </span>
    </label>
  );
}
