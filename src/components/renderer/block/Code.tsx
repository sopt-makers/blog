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
      render={(children) => <code className='block bg-gray-200 p-4'>{children}</code>}
    />
  );
};

export default Code;
