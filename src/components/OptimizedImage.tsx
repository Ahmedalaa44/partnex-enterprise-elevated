import { type ImgHTMLAttributes } from "react";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcWebp?: string;
  srcAvif?: string;
  alt: string;
  lazy?: boolean;
}

export function OptimizedImage({
  src,
  srcWebp,
  srcAvif,
  alt,
  lazy = false,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <picture>
      {srcAvif && <source srcSet={srcAvif} type="image/avif" />}
      {srcWebp && <source srcSet={srcWebp} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        {...props}
      />
    </picture>
  );
}
