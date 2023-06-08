import { bundleImage } from '@/image';
import { PickNotionBlock } from '@/notion/types';
import { wrapAsyncComponent } from '@/util';

interface ImageProps {
  block: PickNotionBlock<'image'>;
}

const Image = async ({ block }: ImageProps) => {
  const { url, key } = (() => {
    if (block.image.type === 'file') {
      const url = block.image.file.url;

      return { url, key: url.split('?')[0] };
    } else if (block.image.type === 'external') {
      const url = block.image.external.url;
      return { url, key: url };
    }
    throw new Error('Invalid image type');
  })();

  const imageUrl = await bundleImage(url, key);

  return (
    <div>
      <img src={imageUrl} width={200} alt='Image' />
    </div>
  );
};

export default wrapAsyncComponent(Image);
