import BundledImage from '@/components/image/BundledImage';
import { PickNotionBlock } from '@/notion/types';

interface ImageProps {
  block: PickNotionBlock<'image'>;
}

const Image = ({ block }: ImageProps) => {
  const url = (() => {
    if (block.image.type === 'file') {
      return block.image.file.url;
    } else if (block.image.type === 'external') {
      return block.image.external.url;
    }
    throw new Error('Invalid image type');
  })();

  return <BundledImage src={url} alt='Image' className='w-full' />;
};

export default Image;
