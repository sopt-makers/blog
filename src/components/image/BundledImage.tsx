import { ImgHTMLAttributes } from 'react';

import { bundleImage } from '@/components/image/bundle';
import { wrapAsyncComponent } from '@/util';

import ImageReplacer from './ImageReplacer';
import { getImageSize, getPreviewImage } from './sizing';

const NOTION_FILE_PREFIX = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/';

interface BundledImage extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const BundledImage = async ({ src, alt, ...props }: BundledImage) => {
  const bundleKey = (() => {
    if (src.startsWith(NOTION_FILE_PREFIX)) {
      const url = new URL(src);
      return url.pathname;
    }
    return src;
  })();

  const { publicUrl, filePath } = await bundleImage(src, bundleKey);
  const { width, height } = await getImageSize(filePath);
  const previewImage = await getPreviewImage(filePath);

  return <ImageReplacer src={publicUrl} preview={previewImage} alt={alt} {...props} width={width} height={height} />;
};

export default wrapAsyncComponent(BundledImage);
