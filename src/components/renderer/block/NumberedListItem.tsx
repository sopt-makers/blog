import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';

import RichTextRenderer from '../RichTextRenderer';

interface NumberedListItemProps {
  block: PickNotionBlock<'numbered_list_item'>;
  num: number;
}

const NumberedListItem: FC<NumberedListItemProps> = ({ block, num }) => {
  return (
    <RichTextRenderer
      richText={block.numbered_list_item.rich_text}
      render={(children) => (
        <div className='list-inside list-disc'>
          {num}. {children}
        </div>
      )}
    />
  );
};

export default NumberedListItem;
