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
      render={(children) => <h2 className='text-2xl'>{children}</h2>}
    />
  );
};

export default Heading2;
