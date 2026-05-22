/**
 * Button Stories — DS GPOS Lite V2
 * Canonical story file. Prop names mirror the Figma component.
 */
import { fn } from 'storybook/test';
import { createButton } from './Button';

// ── Meta ──────────────────────────────────────────────────────────────────────

export default {
  title: 'Components/Button',
  tags: ['autodocs'],

  render: (args) => createButton(args),

  argTypes: {
    // Content ─────────────────────────────────────────────────────────────────
    label: {
      control: 'text',
      description: 'Visible button text.',
      table: {
        category: 'Content',
        defaultValue: { summary: 'Button' },
      },
    },

    // Appearance ──────────────────────────────────────────────────────────────
    appearance: {
      control: { type: 'select' },
      options: ['default'],
      description: 'Visual style. Matches Figma "appearance" prop.',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },
    spacing: {
      control: { type: 'radio' },
      options: ['default', 'compact'],
      description: 'Padding scale — default (38px height) · compact (34px height).',
      table: {
        category: 'Appearance',
        defaultValue: { summary: 'default' },
      },
    },

    // State ───────────────────────────────────────────────────────────────────
    isSelected: {
      control: 'boolean',
      description: 'Toggle/selected state. White bg with blue border.',
      table: {
        category: 'State',
        defaultValue: { summary: false },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disabled — non-interactive and visually faded.',
      table: {
        category: 'State',
        defaultValue: { summary: false },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading — spinner visible, interaction locked.',
      table: {
        category: 'State',
        defaultValue: { summary: false },
      },
    },
    iconOnly: {
      control: 'boolean',
      description: 'Icon-only mode — hides label text.',
      table: {
        category: 'State',
        defaultValue: { summary: false },
      },
    },

    onClick: { action: 'onClick' },
  },

  args: {
    label:        'Button',
    appearance:   'default',
    spacing:      'default',
    isSelected:   false,
    isDisabled:   false,
    isLoading:    false,
    iconOnly:     false,
    leadingIcon:  null,
    trailingIcon: null,
    onClick:      fn(),
  },
};

// ── Stories ───────────────────────────────────────────────────────────────────

/** The canonical default button. appearance=default / state=default / spacing=default */
export const Default = {
  name: 'Default',
  args: {
    label:      'Button',
    appearance: 'default',
    spacing:    'default',
  },
};

/** Compact padding variant */
export const DefaultCompact = {
  name: 'Default — Compact',
  args: {
    label:   'Button',
    spacing: 'compact',
  },
};

/** isSelected=true — white bg with blue border */
export const Selected = {
  name: 'Default — Selected',
  args: {
    isSelected: true,
  },
};

/** isDisabled=true */
export const Disabled = {
  name: 'Default — Disabled',
  args: {
    isDisabled: true,
  },
};

/** isLoading=true */
export const Loading = {
  name: 'Default — Loading',
  args: {
    isLoading: true,
  },
};

// ── Showcase ──────────────────────────────────────────────────────────────────

/** All states side by side — useful for visual regression checks */
export const AllStates = {
  name: 'All States',
  render: () => {
    const wrap = document.createElement('div');
    wrap.className = 'p-8 flex flex-col gap-10 bg-white';

    const section = (title, items) => {
      const el = document.createElement('div');
      el.className = 'flex flex-col gap-3';

      const heading = document.createElement('p');
      heading.className = 'text-xs font-semibold uppercase tracking-widest text-neutral-n400';
      heading.textContent = title;
      el.appendChild(heading);

      const row = document.createElement('div');
      row.className = 'flex flex-wrap items-center gap-3';
      items.forEach((btn) => row.appendChild(btn));
      el.appendChild(row);

      return el;
    };

    wrap.appendChild(
      section('Spacing', [
        createButton({ label: 'Default spacing' }),
        createButton({ label: 'Compact spacing', spacing: 'compact' }),
      ]),
    );

    wrap.appendChild(
      section('States', [
        createButton({ label: 'Default' }),
        createButton({ label: 'Selected', isSelected: true }),
        createButton({ label: 'Disabled', isDisabled: true }),
        createButton({ label: 'Loading',  isLoading: true }),
      ]),
    );

    return wrap;
  },
};
