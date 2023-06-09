import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';

import RichTextRenderer from '../RichTextRenderer';

interface Heading2Props {
  block: PickNotionBlock<'heading_2'>;
}

const Heading2: FC<Heading2Props> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.heading_2.rich_text}
      render={(children) => (
        <h2 className='mt-[24px] text-[24px] font-bold leading-[160%] md:text-[32px]'>{children}</h2>
      )}
    />
  );
};

export default Heading2;
