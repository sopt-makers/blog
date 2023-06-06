import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';

import RichTextRenderer from '../RichTextRenderer';

interface ParagraphProps {
  block: PickNotionBlock<'paragraph'>;
}

const Paragraph: FC<ParagraphProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.paragraph.rich_text}
      render={(children) => <p className='line-height text-[17px] font-light leading-[27px] text-gray10'>{children}</p>}
    />
  );
};

export default Paragraph;
