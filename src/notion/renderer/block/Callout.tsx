import { FC } from 'react';

import { PickNotionBlock } from '@/notion/types';

import RichTextRenderer from '../RichTextRenderer';

interface CalloutProps {
  block: PickNotionBlock<'callout'>;
}

const Callout: FC<CalloutProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.callout.rich_text}
      render={(children) => (
        <div className='rounded-[8px] border border-black40 bg-[#161717] p-[20px] text-[17px] font-light leading-[160%] text-white100 sm:text-[18px]'>
          {children}
        </div>
      )}
    />
  );
};

export default Callout;
