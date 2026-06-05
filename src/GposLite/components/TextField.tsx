import type { InputHTMLAttributes, LabelHTMLAttributes } from 'react';

export type TextFieldAppearance = 'default' | 'subtle' | 'none';

export interface TextFieldProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  appearance?: TextFieldAppearance;
  compact?: boolean;
  invalid?: boolean;
  monospaced?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'className' | 'placeholder' | 'value' | 'defaultValue' | 'onChange'
  >;
}

export function TextField({
  appearance = 'default',
  compact = false,
  invalid = false,
  monospaced = false,
  placeholder,
  value,
  defaultValue,
  type = 'text',
  onChange,
  inputProps,
  className,
  ...rest
}: TextFieldProps) {
  const rootClass = [
    'ds-text-field',
    appearance !== 'default' ? `ds-text-field--${appearance}` : '',
    compact ? 'ds-text-field--compact' : '',
    invalid ? 'ds-text-field--invalid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputClass = [
    'ds-text-field__input',
    monospaced ? 'ds-text-field__input--monospaced' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClass} {...rest}>
      <input
        type={type}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        aria-invalid={invalid || undefined}
        {...inputProps}
      />
    </label>
  );
}
