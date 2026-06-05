import type { HTMLAttributes } from 'react';

export type AvatarSize = 'xl' | 'lg' | 'md' | 'sm';

const IMAGE_DIMENSIONS: Record<AvatarSize, number> = {
  xl: 64,
  lg: 28,
  md: 20,
  sm: 16,
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Modifier ukuran: `.ds-avatar--xl` | `--lg` | `--md` | `--sm` */
  size?: AvatarSize;
  /** URL gambar (default: `assets/images/avatar.svg`) */
  src?: string;
  /** Alt text gambar */
  alt?: string;
  /** Tampilkan `.ds-avatar__presence` */
  presence?: boolean;
}

export function Avatar({
  size = 'md',
  src = 'assets/images/avatar.svg',
  alt = 'Avatar pengguna',
  presence = true,
  className,
  ...rest
}: AvatarProps) {
  const dim = IMAGE_DIMENSIONS[size];
  const rootClass = ['ds-avatar', `ds-avatar--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} {...rest}>
      <img
        className="ds-avatar__image"
        src={src}
        alt={alt}
        width={dim}
        height={dim}
      />
      {presence ? <div className="ds-avatar__presence" /> : null}
    </div>
  );
}
