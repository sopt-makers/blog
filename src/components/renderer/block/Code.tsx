import { Code as SyntaxHighlight } from 'bright';
import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';
import { wrapAsyncComponent } from '@/util';

interface CodeProps {
  block: PickNotionBlock<'code'>;
}
SyntaxHighlight.theme = 'material-darker';

const WrappedSyntaxHighlight = wrapAsyncComponent(SyntaxHighlight);

const Code: FC<CodeProps> = ({ block }) => {
  const codeContent = block.code.rich_text.map((text) => text.plain_text).join('');

  return (
    <WrappedSyntaxHighlight
      lang={block.code.language}
      codeClassName='font-mono text-[13px]'
      className='rounded-[8px]'
      style={{ borderRadius: '8px' }}
      lineNumbers
    >
      {codeContent}
    </WrappedSyntaxHighlight>
  );
};

export default Code;
