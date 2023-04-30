import { FC } from "react";
import { NotionBlock } from "../request";
import Paragraph from "./block/Paragraph";
import Heading1 from "./block/Heading1";
import RichTextRenderer from "./RichTextRenderer";
import Heading2 from "./block/Heading2";
import Heading3 from "./block/Heading3";
import BulettedListItem from "./block/BulettedListItem";

interface BlockRendererProps {
  block: NotionBlock;
}

export const BlockRenderer: FC<BlockRendererProps> = ({ block }) => {
  type BlockType = typeof block.type;

  if (block.type === "paragraph") {
    return <Paragraph block={block} />;
  } else if (block.type === "heading_1") {
    return <Heading1 block={block} />;
  } else if (block.type === "heading_2") {
    return <Heading2 block={block} />;
  } else if (block.type === "heading_3") {
    return <Heading3 block={block} />;
  } else if (block.type === "bulleted_list_item") {
    return <BulettedListItem block={block} />;
  }

  return (
    <div>
      Unknown Block: <span>{JSON.stringify(block)}</span>
    </div>
  );
};
