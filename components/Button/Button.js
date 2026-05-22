export function createButton({
  label    = 'Button',
  variant  = 'primary',
  size     = 'md',
  disabled = false,
  onClick,
} = {}) {
  const variants = {
    primary:   'bg-primary-500 text-white border border-primary-500 hover:bg-primary-600 hover:border-primary-600 shadow-brand',
    secondary: 'bg-white text-primary-600 border border-primary-500 hover:bg-primary-50',
    ghost:     'bg-transparent text-neutral-n500 border border-neutral-n40 hover:bg-neutral-n20 hover:text-neutral-n700',
    danger:    'bg-error-500 text-white border border-error-500 hover:bg-error-600 hover:border-error-600',
  };

  const sizes = {
    sm: 'px-150 py-075 text-xs',
    md: 'px-250 py-[10px] text-sm',
    lg: 'px-300 py-150 text-base',
  };

  const btn = document.createElement('button');
  btn.type      = 'button';
  btn.textContent = label;
  btn.disabled  = disabled;

  btn.className = [
    'inline-flex items-center justify-center gap-2',
    'font-semibold rounded-md',
    'transition-all duration-200 ease-in-out',
    'cursor-pointer whitespace-nowrap',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
  ].join(' ');

  if (onClick) btn.addEventListener('click', onClick);

  return btn;
}
