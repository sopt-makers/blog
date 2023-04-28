import { FC } from "react";
import { NotionBlock } from "../request";
import Paragraph from "./block/Paragraph";

interface BlockRendererProps {
  block: NotionBlock;
}

export const BlockRenderer: FC<BlockRendererProps> = ({ block }) => {
  if (block.type === "paragraph") {
    return <Paragraph block={block} />;
  }

  return (
    <div>
      Unknown Block: <span>{JSON.stringify(block)}</span>
    </div>
  );
};
