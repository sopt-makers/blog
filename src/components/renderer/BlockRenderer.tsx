import { FC, Fragment } from 'react';

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
  let cnt = 0;
  const numbers = blocks.map((block) => {
    if (block.type !== 'numbered_list_item') {
      return null;
    }
    return ++cnt;
  });

  return (
    <>
      {blocks
        .map((block, idx) => {
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
              return (
                /* @ts-expect-error Server Component */
                <BulettedListItem block={block} />
              );
            case 'numbered_list_item':
              return <NumberedListItem block={block} num={numbers[idx] ?? 0} />;
            case 'code':
              return <Code block={block} />;
            case 'image':
              return (
                /* @ts-expect-error Server Component */
                <ImageBlock block={block} />
              );
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
        })
        .map((el, idx) => (
          <Fragment key={idx}>{el}</Fragment>
        ))}
    </>
  );
};
