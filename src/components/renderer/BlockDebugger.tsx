'use client';

import { FC, useEffect } from 'react';

import { NotionBlock } from '../../notion/request';

interface BlockDebuggerProps {
  block: NotionBlock;
}

const BlockDebugger: FC<BlockDebuggerProps> = ({ block }) => {
  useEffect(() => {
    console.log('Block Type: ', block.type, block);
  }, [block]);

  return null;
};

export default BlockDebugger;
