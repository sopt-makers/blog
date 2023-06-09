'use client';

import clsx from 'clsx';
import { FC, ImgHTMLAttributes, useEffect, useState } from 'react';

interface ImageReplacerProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  preview: string;
  width: number;
  height: number;
}

const ImageReplacer: FC<ImageReplacerProps> = ({ src, preview, alt, className, width, height, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    const loaded = () => {
      setLoaded(true);
      console.log('Loaded!');
    };
    img.addEventListener('load', loaded);

    return () => {
      img.removeEventListener('load', loaded);
    };
  }, [src]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
      console.log('ANIMATE!');
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <img
      src={loaded ? src : preview}
      alt={alt}
      className={clsx(!loaded && 'blur', animate && 'transition-[filter] duration-150', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default ImageReplacer;
