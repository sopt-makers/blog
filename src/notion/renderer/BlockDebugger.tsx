"use client";

import { FC, useEffect } from "react";
import { NotionBlock } from "../request";

interface BlockDebuggerProps {
  block: NotionBlock;
}

const BlockDebugger: FC<BlockDebuggerProps> = ({ block }) => {
  useEffect(() => {
    console.log(block);
  }, [block]);

  return null;
};

export default BlockDebugger;
