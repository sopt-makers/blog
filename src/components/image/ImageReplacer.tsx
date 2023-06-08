'use client';

import clsx from 'clsx';
import { FC, ImgHTMLAttributes, useEffect, useState } from 'react';

interface ImageReplacerProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  preview: string;
}

const ImageReplacer: FC<ImageReplacerProps> = ({ src, preview, alt, className, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    const loaded = () => {
      setLoaded(true);
    };
    img.addEventListener('load', loaded);

    return () => {
      img.removeEventListener('load', loaded);
    };
  }, [src]);

  return (
    <img
      src={loaded ? src : preview}
      alt={alt}
      className={clsx(!loaded && 'blur-md', 'transition-[filter] duration-100', className)}
      {...props}
    />
  );
};

export default ImageReplacer;
