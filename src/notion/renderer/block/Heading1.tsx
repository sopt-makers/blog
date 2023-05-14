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
      render={(children) => <h1 className='text-3xl'>{children}</h1>}
    />
  );
};

export default Heading1;
