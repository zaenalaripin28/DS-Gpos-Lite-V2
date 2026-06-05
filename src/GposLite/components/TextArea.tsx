import type { LabelHTMLAttributes, TextareaHTMLAttributes } from 'react';

export interface TextAreaProps
  extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  compact?: boolean;
  invalid?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: TextareaHTMLAttributes<HTMLTextAreaElement>['onChange'];
  fieldProps?: Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'className' | 'placeholder' | 'value' | 'defaultValue' | 'onChange'
  >;
}

export function TextArea({
  compact = false,
  invalid = false,
  placeholder = 'Tulis catatan transaksi...',
  value,
  defaultValue,
  onChange,
  fieldProps,
  className,
  ...rest
}: TextAreaProps) {
  const rootClass = [
    'ds-text-area',
    compact ? 'ds-text-area--compact' : '',
    invalid ? 'ds-text-area--invalid' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={rootClass} {...rest}>
      <textarea
        className="ds-text-area__field"
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        {...fieldProps}
      />
    </label>
  );
}
