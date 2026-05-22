import { fn } from 'storybook/test';
import { createButton } from './Button';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  render: ({ label, ...args }) => createButton({ label, ...args }),
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    label:    { control: 'text' },
    disabled: { control: 'boolean' },
    onClick:  { action: 'onClick' },
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: { label: 'Button', variant: 'primary' },
};

export const Secondary = {
  args: { label: 'Button', variant: 'secondary' },
};

export const Ghost = {
  args: { label: 'Button', variant: 'ghost' },
};

export const Danger = {
  args: { label: 'Button', variant: 'danger' },
};

export const Small = {
  args: { label: 'Button', size: 'sm' },
};

export const Large = {
  args: { label: 'Button', size: 'lg' },
};

export const Disabled = {
  args: { label: 'Button', disabled: true },
};
