import { getBlocks } from '@/notion/request';
import { PickNotionBlock } from '@/notion/types';

import { BlockRenderer } from '../BlockRenderer';
import RichTextRenderer from '../RichTextRenderer';

interface NumberedListItemProps {
  block: PickNotionBlock<'numbered_list_item'>;
  num: number;
}

const NumberedListItem = async ({ block, num }: NumberedListItemProps) => {
  const children = await (async () => {
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return <BlockRenderer blocks={children} />;
    }
    return null;
  })();

  return (
    <RichTextRenderer
      richText={block.numbered_list_item.rich_text}
      render={(text) => (
        <div className='flex'>
          <div className='pr-[5px] text-[17px] font-light leading-[160%] text-gray10 md:text-[18px]'>{num}.</div>
          <div className='flex flex-grow flex-col'>
            <div className='text-[17px] font-light leading-[160%] text-gray10 md:text-[18px]'>{text}</div>
            {children}
          </div>
        </div>
      )}
    />
  );
};

export default NumberedListItem;
