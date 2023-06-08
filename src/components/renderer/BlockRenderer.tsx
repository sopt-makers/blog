import { FC, Fragment, ReactElement } from 'react';

import { NotionBlock } from '../../notion/request';
import BulettedListItem from './block/BulettedListItem';
import Callout from './block/Callout';
import Code from './block/Code';
import Heading1 from './block/Heading1';
import Heading2 from './block/Heading2';
import Heading3 from './block/Heading3';
import ImageBlock from './block/Image';
import NumberedListItem from './block/NumberedListItem';
import Paragraph from './block/Paragraph';
import Quote from './block/Quote';

interface BlockRendererProps {
  blocks: NotionBlock[];
}

export const BlockRenderer: FC<BlockRendererProps> = ({ blocks }) => {
  const merged = mergeBlocks(blocks);

  return (
    <div className='flex flex-col gap-y-[20px]'>
      {merged.map((blockOrArray, idx) => {
        if (Array.isArray(blockOrArray)) {
          return (
            <div key={idx} className='flex flex-col gap-[1px]'>
              {blockOrArray.map((block, idx) => (
                <BlockResolver key={idx} block={block} position={idx + 1} />
              ))}
            </div>
          );
        }
        return <BlockResolver key={idx} block={blockOrArray} position={idx + 1} />;
      })}
    </div>
  );
};

function BlockResolver({ block, position }: { block: NotionBlock; position: number }) {
  switch (block.type) {
    case 'paragraph':
      return <Paragraph block={block} />;
    case 'heading_1':
      return <Heading1 block={block} />;
    case 'heading_2':
      return <Heading2 block={block} />;
    case 'heading_3':
      return <Heading3 block={block} />;
    case 'bulleted_list_item':
      return <BulettedListItem block={block} />;
    case 'numbered_list_item':
      return <NumberedListItem block={block} num={position} />;
    case 'code':
      return <Code block={block} />;
    case 'image':
      return <ImageBlock block={block} />;
    case 'quote':
      return <Quote block={block} />;
    case 'callout':
      return <Callout block={block} />;
    default:
      const type = block.type;
      const content = block[type as never];
      return (
        <div className='whitespace-pre-wrap'>
          Unknown {type}: {JSON.stringify(content, null, 2)}
        </div>
      );
  }
}

function mergeBlocks(blocks: NotionBlock[]) {
  const result: (NotionBlock[] | NotionBlock)[] = [];
  let buffer: NotionBlock[] = [];

  for (const block of blocks) {
    if (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') {
      buffer.push(block);
      continue;
    }

    if (buffer.length > 0) {
      result.push(buffer);
      buffer = [];
    }

    result.push(block);
  }

  return result;
}
