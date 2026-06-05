import { useState, type ReactNode } from 'react';
import { Calendar, type CalendarProps } from './Calendar';
import { Select } from './Select';

export interface DatePickerProps {
  triggerValue: ReactNode;
  calendar: CalendarProps;
  open?: boolean;
  defaultOpen?: boolean;
  invalid?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DatePicker({
  triggerValue,
  calendar,
  open,
  defaultOpen = false,
  invalid = false,
  onOpenChange,
}: DatePickerProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className="ds-date-picker">
      <Select
        value={triggerValue}
        open={isOpen}
        invalid={invalid}
        ariaLabel="Date picker"
        onTriggerClick={() => setOpen(!isOpen)}
        menu={
          <div
            className="ds-date-picker__panel"
            role="dialog"
            aria-label="Date picker calendar"
          >
            <Calendar {...calendar} />
          </div>
        }
      />
    </div>
  );
}
