import type {
  FieldsetHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react';

export interface RadioProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  defaultChecked?: boolean;
  error?: boolean;
  disabled?: boolean;
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'name' | 'value' | 'checked' | 'defaultChecked' | 'disabled' | 'onChange'
  >;
}

export function Radio({
  label,
  name,
  value,
  checked,
  defaultChecked,
  error = false,
  disabled = false,
  onChange,
  inputProps,
  className,
  ...rest
}: RadioProps) {
  const rootClass = [
    'ds-radio',
    error ? 'ds-radio--error' : '',
    disabled ? 'ds-radio--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClass} {...rest}>
      <input
        type="radio"
        className="ds-radio__input"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={error || undefined}
        onChange={onChange}
        {...inputProps}
      />
      <span className="ds-radio__circle" aria-hidden="true">
        <span className="ds-radio__dot" />
      </span>
      <span className="ds-radio__label">{label}</span>
    </label>
  );
}

export interface RadioGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: string;
  name: string;
  children: ReactNode;
}

export function RadioGroup({
  legend,
  name,
  children,
  className,
  ...rest
}: RadioGroupProps) {
  const rootClass = ['ds-radio-group', className].filter(Boolean).join(' ');

  return (
    <fieldset className={rootClass} {...rest}>
      <legend className="ds-radio-group__legend">{legend}</legend>
      {children}
    </fieldset>
  );
}
