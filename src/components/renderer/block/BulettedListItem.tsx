import { getBlocks } from '@/notion/request';
import { PickNotionBlock } from '@/notion/types';

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
        <div className='list-inside list-disc'>
          <div>- {text}</div>
          <div className='ml-3'>{children}</div>
        </div>
      )}
    />
  );
};

export default BulettedListItem;
