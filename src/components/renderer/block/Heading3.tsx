import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';

import RichTextRenderer from '../RichTextRenderer';

interface Heading3Props {
  block: PickNotionBlock<'heading_3'>;
}

const Heading3: FC<Heading3Props> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.heading_3.rich_text}
      render={(children) => (
        <h3 className='mt-[16px] text-[20px] font-bold leading-[160%] md:text-[24px]'>{children}</h3>
      )}
    />
  );
};

export default Heading3;
