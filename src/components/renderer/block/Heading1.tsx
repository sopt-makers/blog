import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';

import RichTextRenderer from '../RichTextRenderer';

interface Heading1Props {
  block: PickNotionBlock<'heading_1'>;
}

const Heading1: FC<Heading1Props> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.heading_1.rich_text}
      render={(children) => (
        <h2 className='mt-[24px] text-[32px] font-bold leading-[160%] md:text-[32px]'>{children}</h2>
      )}
    />
  );
};

export default Heading1;
