import { useState, type ButtonHTMLAttributes } from 'react';

export interface TimePickerOption {
  value: string;
  label: string;
  selected?: boolean;
}

export interface TimePickerProps {
  options: TimePickerOption[];
  open?: boolean;
  defaultOpen?: boolean;
  listAriaLabel?: string;
  onSelect?: (value: string) => void;
}

export function TimePicker({
  options,
  open,
  defaultOpen = false,
  listAriaLabel = 'Time picker',
  onSelect,
}: TimePickerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  if (!isOpen) return null;

  return (
    <div className="ds-time-picker" role="listbox" aria-label={listAriaLabel}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={[
            'ds-time-picker__option',
            opt.selected ? 'ds-time-picker__option--selected' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          role="option"
          aria-selected={opt.selected}
          onClick={() => {
            if (open === undefined) setInternalOpen(false);
            onSelect?.(opt.value);
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
