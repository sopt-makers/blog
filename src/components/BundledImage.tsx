import { ImgHTMLAttributes } from 'react';

import { bundleImage } from '@/image';

const NOTION_FILE_PREFIX = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/';

interface BundledImage extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const BundledImage = ({ src, ...props }: BundledImage) => {
  if (src.startsWith(NOTION_FILE_PREFIX)) {
    const url = new URL(src);

    return (
      /* @ts-expect-error Server Component */
      <>{<BundledImageInner bundleKey={url.pathname} src={src} {...props} />}</>
    );
  }
  return (
    /* @ts-expect-error Server Component */
    <>{<BundledImageInner bundleKey={src} src={src} {...props} />}</>
  );
};

export default BundledImage;

interface BundledImageInner extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  bundleKey: string;
}

const BundledImageInner = async ({ bundleKey, src, alt, ...props }: BundledImageInner) => {
  const bundledSrc = await bundleImage(src, bundleKey);
  return <img src={bundledSrc} alt={alt} {...props} />;
};
