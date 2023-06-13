import { getBlocks } from '@/notion/request';
import { PickNotionBlock } from '@/notion/types';
import { wrapAsyncComponent } from '@/util';

import { BlockRenderer } from '../BlockRenderer';
import RichTextRenderer from '../RichTextRenderer';

interface BulettedListItemProps {
  block: PickNotionBlock<'bulleted_list_item'>;
}

const BulettedListItem = async ({ block }: BulettedListItemProps) => {
  const children = await (async () => {
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return <BlockRenderer blocks={children} />;
    }
    return null;
  })();

  return (
    <RichTextRenderer
      richText={block.bulleted_list_item.rich_text}
      render={(text) => (
        <div className='flex'>
          <div className='pr-[8px] text-[17px] font-light leading-[160%] text-gray10 md:text-[18px]'>•</div>
          <div className='flex flex-grow flex-col'>
            <div className='text-[17px] font-light leading-[160%] text-gray10 md:text-[18px]'>{text}</div>
            {children}
          </div>
        </div>
      )}
    />
  );
};

export default wrapAsyncComponent(BulettedListItem);
