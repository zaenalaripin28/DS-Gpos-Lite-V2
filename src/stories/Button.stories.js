import { fn } from 'storybook/test';

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
  viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="3" width="18" height="18" rx="3"/>
  <path d="M8 12h8M12 8v8"/>
</svg>`;

const SPINNER_SVG = `<svg class="animate-spin" xmlns="http://www.w3.org/2000/svg"
  width="16" height="16" viewBox="0 0 24 24" fill="none">
  <circle class="opacity-25" cx="12" cy="12" r="10"
    stroke="currentColor" stroke-width="4"/>
  <path class="opacity-75" fill="currentColor"
    d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 12h-4z"/>
</svg>`;

// ---------------------------------------------------------------------------
// Tailwind class maps (sesuai tailwind.config.js proyek)
// ---------------------------------------------------------------------------

const VARIANT_CLASSES = {
  primary: [
    'bg-primary-500 text-white',
    'border border-primary-500',
    'hover:bg-primary-600 hover:border-primary-600',
    'active:bg-primary-700 active:border-primary-700',
    'focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
    'shadow-brand',
  ],
  secondary: [
    'bg-secondary-500 text-white',
    'border border-secondary-500',
    'hover:bg-secondary-600 hover:border-secondary-600',
    'active:bg-secondary-700 active:border-secondary-700',
    'focus-visible:ring-2 focus-visible:ring-secondary-400 focus-visible:ring-offset-2',
  ],
  outline: [
    'bg-white text-primary-600',
    'border border-primary-500',
    'hover:bg-primary-50',
    'active:bg-primary-100',
    'focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2',
  ],
  ghost: [
    'bg-transparent text-neutral-n500',
    'border border-neutral-n40',
    'hover:bg-neutral-n20 hover:text-neutral-n700',
    'active:bg-neutral-n30',
    'focus-visible:ring-2 focus-visible:ring-neutral-n50 focus-visible:ring-offset-2',
  ],
  danger: [
    'bg-error-500 text-white',
    'border border-error-500',
    'hover:bg-error-600 hover:border-error-600',
    'active:bg-error-700 active:border-error-700',
    'focus-visible:ring-2 focus-visible:ring-error-400 focus-visible:ring-offset-2',
  ],
  warning: [
    'bg-warning-500 text-white',
    'border border-warning-500',
    'hover:bg-warning-600 hover:border-warning-600',
    'active:bg-warning-700 active:border-warning-700',
    'focus-visible:ring-2 focus-visible:ring-warning-400 focus-visible:ring-offset-2',
  ],
};

const SIZE_CLASSES = {
  sm: 'px-150 py-075 text-xs rounded-sm gap-1',
  md: 'px-250 py-[10px] text-sm rounded-md gap-2',
  lg: 'px-300 py-150 text-base rounded-md gap-2',
};

// ---------------------------------------------------------------------------
// Factory: createButton
// ---------------------------------------------------------------------------

function createButton({
  label      = 'Klik Disini',
  variant    = 'primary',
  size       = 'md',
  disabled   = false,
  isLoading  = false,
  iconBefore = false,
  iconAfter  = false,
  onClick,
} = {}) {
  const btn = document.createElement('button');
  btn.type     = 'button';
  btn.disabled = disabled || isLoading;

  const variantCls = (VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary).join(' ');
  const sizeCls    = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;

  btn.className = [
    'inline-flex items-center justify-center',
    'font-semibold font-primary',
    'transition-all duration-200 ease-in-out',
    'cursor-pointer whitespace-nowrap select-none',
    'focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantCls,
    sizeCls,
  ].join(' ');

  // Ikon sebelum label (atau spinner saat loading)
  if (isLoading || iconBefore) {
    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'flex-shrink-0';
    iconWrapper.innerHTML = isLoading ? SPINNER_SVG : ICON_SVG;
    btn.appendChild(iconWrapper);
  }

  // Teks label
  const labelEl = document.createElement('span');
  labelEl.textContent = isLoading ? 'Mohon Tunggu…' : label;
  btn.appendChild(labelEl);

  // Ikon setelah label
  if (iconAfter && !isLoading) {
    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'flex-shrink-0';
    iconWrapper.innerHTML = ICON_SVG;
    btn.appendChild(iconWrapper);
  }

  if (onClick) btn.addEventListener('click', onClick);

  return btn;
}

// ---------------------------------------------------------------------------
// Meta (default export)
// ---------------------------------------------------------------------------

export default {
  title: 'Komponen/Tombol',
  tags: ['autodocs'],

  render: (args) => createButton(args),

  argTypes: {
    // ── Konten ──────────────────────────────────────────────────────────────
    label: {
      control: 'text',
      description: 'Teks yang ditampilkan di dalam tombol.',
      table: { category: 'Konten', defaultValue: { summary: 'Klik Disini' } },
    },

    // ── Tampilan ─────────────────────────────────────────────────────────────
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'warning'],
      description:
        'Varian warna tombol. primary = Biru Utama · secondary = Cyan · outline = Garis · ghost = Transparan · danger = Merah · warning = Oranye',
      table: { category: 'Tampilan', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Ukuran tombol — Kecil (sm) · Sedang (md) · Besar (lg).',
      table: { category: 'Tampilan', defaultValue: { summary: 'md' } },
    },

    // ── Status ────────────────────────────────────────────────────────────────
    disabled: {
      control: 'boolean',
      description: 'Nonaktifkan tombol sehingga tidak bisa diklik.',
      table: { category: 'Status', defaultValue: { summary: false } },
    },
    isLoading: {
      control: 'boolean',
      description:
        'Tampilkan spinner dan ubah teks menjadi "Mohon Tunggu…". Tombol otomatis dinonaktifkan.',
      table: { category: 'Status', defaultValue: { summary: false } },
    },

    // ── Ikon ─────────────────────────────────────────────────────────────────
    iconBefore: {
      control: 'boolean',
      description: 'Tampilkan ikon di sebelah kiri label.',
      table: { category: 'Ikon', defaultValue: { summary: false } },
    },
    iconAfter: {
      control: 'boolean',
      description: 'Tampilkan ikon di sebelah kanan label.',
      table: { category: 'Ikon', defaultValue: { summary: false } },
    },

    onClick: { action: 'onClick' },
  },

  args: {
    label:      'Klik Disini',
    variant:    'primary',
    size:       'md',
    disabled:   false,
    isLoading:  false,
    iconBefore: false,
    iconAfter:  false,
    onClick:    fn(),
  },
};

// ---------------------------------------------------------------------------
// Stories — Varian Warna
// ---------------------------------------------------------------------------

export const Utama = {
  name: '🔵 Utama (Primary)',
  args: { variant: 'primary' },
};

export const Kedua = {
  name: '🩵 Kedua (Secondary)',
  args: { variant: 'secondary' },
};

export const Garis = {
  name: '⬜ Garis (Outline)',
  args: { variant: 'outline' },
};

export const Transparan = {
  name: '🔲 Transparan (Ghost)',
  args: { variant: 'ghost' },
};

export const Bahaya = {
  name: '🔴 Bahaya (Danger)',
  args: { variant: 'danger' },
};

export const Peringatan = {
  name: '🟠 Peringatan (Warning)',
  args: { variant: 'warning' },
};

// ---------------------------------------------------------------------------
// Stories — Ukuran
// ---------------------------------------------------------------------------

export const UkuranKecil = {
  name: 'Ukuran Kecil (sm)',
  args: { size: 'sm' },
};

export const UkuranSedang = {
  name: 'Ukuran Sedang (md)',
  args: { size: 'md' },
};

export const UkuranBesar = {
  name: 'Ukuran Besar (lg)',
  args: { size: 'lg' },
};

// ---------------------------------------------------------------------------
// Stories — Status
// ---------------------------------------------------------------------------

export const NonAktif = {
  name: 'Non-Aktif (Disabled)',
  args: { label: 'Tidak Bisa Diklik', disabled: true },
};

export const Memuat = {
  name: 'Sedang Memuat (Loading)',
  args: { isLoading: true },
};

// ---------------------------------------------------------------------------
// Stories — Ikon
// ---------------------------------------------------------------------------

export const DenganIkonKiri = {
  name: 'Dengan Ikon Kiri',
  args: { iconBefore: true },
};

export const DenganIkonKanan = {
  name: 'Dengan Ikon Kanan',
  args: { iconAfter: true },
};

export const DenganIkonKiriKanan = {
  name: 'Dengan Ikon Kiri & Kanan',
  args: { iconBefore: true, iconAfter: true },
};

// ---------------------------------------------------------------------------
// Story — Tampilan Semua Varian & Ukuran (showcase)
// ---------------------------------------------------------------------------

const VARIAN_LABEL = {
  primary:   'Utama',
  secondary: 'Kedua',
  outline:   'Garis',
  ghost:     'Transparan',
  danger:    'Bahaya',
  warning:   'Peringatan',
};

const UKURAN_LABEL = { sm: 'Kecil', md: 'Sedang', lg: 'Besar' };

export const SemuaVarian = {
  name: '📋 Semua Varian & Ukuran',
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'p-6 flex flex-col gap-8 font-primary';

    Object.keys(VARIANT_CLASSES).forEach((v) => {
      const section = document.createElement('div');
      section.className = 'flex flex-col gap-3';

      const heading = document.createElement('p');
      heading.className = 'text-xs font-semibold uppercase tracking-widest text-neutral-n400';
      heading.textContent = `${VARIAN_LABEL[v]} (${v})`;
      section.appendChild(heading);

      // Baris ukuran normal
      const rowNormal = document.createElement('div');
      rowNormal.className = 'flex flex-wrap items-center gap-3';

      Object.keys(UKURAN_LABEL).forEach((s) => {
        rowNormal.appendChild(
          createButton({ label: `${UKURAN_LABEL[s]}`, variant: v, size: s }),
        );
      });

      // Baris disabled & loading
      rowNormal.appendChild(
        createButton({ label: 'Non-Aktif', variant: v, size: 'md', disabled: true }),
      );
      rowNormal.appendChild(
        createButton({ label: 'Memuat', variant: v, size: 'md', isLoading: true }),
      );

      section.appendChild(rowNormal);
      wrapper.appendChild(section);
    });

    return wrapper;
  },
};
