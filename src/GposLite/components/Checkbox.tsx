import { useEffect, useRef } from 'react';
import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export interface CheckboxProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  error?: boolean;
  disabled?: boolean;
  checkIconSrc?: string;
  minusIconSrc?: string;
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange'
  >;
}

const DEFAULT_CHECK = 'assets/icons/icon-check.svg';
const DEFAULT_MINUS = 'assets/icons/icon-minus.svg';

export function Checkbox({
  label,
  checked,
  defaultChecked,
  indeterminate = false,
  error = false,
  disabled = false,
  checkIconSrc = DEFAULT_CHECK,
  minusIconSrc = DEFAULT_MINUS,
  onChange,
  inputProps,
  className,
  ...rest
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const rootClass = [
    'ds-checkbox',
    error ? 'ds-checkbox--error' : '',
    disabled ? 'ds-checkbox--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={rootClass} {...rest}>
      <input
        ref={inputRef}
        type="checkbox"
        className="ds-checkbox__input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={error || undefined}
        onChange={onChange}
        {...inputProps}
      />
      <span className="ds-checkbox__box" aria-hidden="true">
        <img
          src={checkIconSrc}
          alt=""
          className="ds-checkbox__icon ds-checkbox__icon--check"
        />
        <img
          src={minusIconSrc}
          alt=""
          className="ds-checkbox__icon ds-checkbox__icon--minus"
        />
      </span>
      <span className="ds-checkbox__label">{label}</span>
    </label>
  );
}
