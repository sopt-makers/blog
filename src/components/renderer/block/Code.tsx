import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';

import RichTextRenderer from '../RichTextRenderer';

interface CodeProps {
  block: PickNotionBlock<'code'>;
}

const Code: FC<CodeProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.code.rich_text}
      render={(children) => (
        <code className='block rounded-[8px] bg-black60 p-[20px] font-mono text-[13px] text-white100'>{children}</code>
      )}
    />
  );
};

export default Code;
