/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.html",
    "./js/**/*.js",
    "./**/*.html",
  ],
  theme: {
    extend: {

      // =============================================
      // COLOR SYSTEM — Brand: GPOS Blue #1E7FD6
      // =============================================
      colors: {

        // Primary — GPOS Blue (Brand)
        primary: {
          50:  '#EEF7FF',
          100: '#D9EFFE',
          200: '#BADDFD',
          300: '#86C3FA',
          400: '#4FA6F5',
          500: '#1E7FD6',  // ← Brand Color
          600: '#1668B0',
          700: '#115188',
          800: '#0D3C63',
          900: '#09293F',
        },

        // Secondary — Cyan (Complementary)
        secondary: {
          50:  '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },

        // Success — Green
        success: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#145231',
        },

        // Warning — Amber
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },

        // Error — Red
        error: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        // Info — Sky
        info: {
          50:  '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
        },

        // Grayscale
        gray: {
          50:  '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },

      // =============================================
      // TYPOGRAPHY
      // =============================================
      fontFamily: {
        sans:  ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono:  ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        serif: ['Georgia', '"Times New Roman"', 'serif'],
      },

      fontSize: {
        xs:   ['0.75rem',  { lineHeight: '1rem'   }],  // 12px
        sm:   ['0.875rem', { lineHeight: '1.25rem'}],  // 14px
        base: ['1rem',     { lineHeight: '1.5rem' }],  // 16px
        lg:   ['1.125rem', { lineHeight: '1.75rem'}],  // 18px
        xl:   ['1.25rem',  { lineHeight: '1.75rem'}],  // 20px
        '2xl':['1.5rem',   { lineHeight: '2rem'   }],  // 24px
        '3xl':['1.875rem', { lineHeight: '2.25rem'}],  // 30px
        '4xl':['2.25rem',  { lineHeight: '2.5rem' }],  // 36px
        '5xl':['3rem',     { lineHeight: '3.5rem' }],  // 48px
      },

      fontWeight: {
        light:    '300',
        normal:   '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },

      lineHeight: {
        tight:   '1.2',
        snug:    '1.375',
        normal:  '1.5',
        relaxed: '1.625',
        loose:   '2',
      },

      letterSpacing: {
        tight:  '-0.02em',
        normal: '0',
        wide:   '0.04em',
        wider:  '0.08em',
      },

      // =============================================
      // SPACING (4px base unit)
      // =============================================
      spacing: {
        '0':  '0',
        '1':  '0.25rem',  //  4px
        '2':  '0.5rem',   //  8px
        '3':  '0.75rem',  // 12px
        '4':  '1rem',     // 16px
        '5':  '1.25rem',  // 20px
        '6':  '1.5rem',   // 24px
        '8':  '2rem',     // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
      },

      // =============================================
      // BORDER RADIUS
      // =============================================
      borderRadius: {
        none: '0',
        sm:   '0.25rem',   //  4px
        md:   '0.5rem',    //  8px
        lg:   '0.75rem',   // 12px
        xl:   '1rem',      // 16px
        '2xl':'1.5rem',    // 24px
        '3xl':'2rem',      // 32px
        full: '9999px',
      },

      // =============================================
      // BORDER WIDTH
      // =============================================
      borderWidth: {
        '0': '0',
        '1': '1px',
        '2': '2px',
        '4': '4px',
      },

      // =============================================
      // SHADOWS — Elevation System
      // =============================================
      boxShadow: {
        none:  'none',
        xs:    '0 1px 2px 0 rgba(0,0,0,0.04)',
        sm:    '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        md:    '0 4px 8px -2px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.06)',
        lg:    '0 12px 24px -6px rgba(0,0,0,0.12), 0 4px 8px -4px rgba(0,0,0,0.06)',
        xl:    '0 20px 40px -8px rgba(0,0,0,0.15), 0 8px 16px -4px rgba(0,0,0,0.06)',
        '2xl': '0 32px 64px -16px rgba(0,0,0,0.20)',
        brand: '0 4px 14px 0 rgba(30,127,214,0.35)',
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      },

      // =============================================
      // Z-INDEX
      // =============================================
      zIndex: {
        hide:           '-1',
        auto:           'auto',
        base:           '0',
        dropdown:       '1000',
        sticky:         '1020',
        fixed:          '1030',
        'modal-backdrop': '1040',
        modal:          '1050',
        popover:        '1060',
        tooltip:        '1070',
      },

      // =============================================
      // TRANSITIONS
      // =============================================
      transitionDuration: {
        fast:  '150ms',
        base:  '200ms',
        slow:  '300ms',
        spring:'400ms',
      },

      transitionTimingFunction: {
        'ease':   'ease-in-out',
        'spring': 'cubic-bezier(0.175,0.885,0.32,1.275)',
      },

      // =============================================
      // BREAKPOINTS
      // =============================================
      screens: {
        xs:   '0px',
        sm:   '640px',
        md:   '768px',
        lg:   '1024px',
        xl:   '1280px',
        '2xl':'1536px',
      },

    },
  },
  plugins: [],
}
