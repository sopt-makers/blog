import { FC } from "react";
import { NotionBlock } from "../request";
import Paragraph from "./block/Paragraph";
import Heading1 from "./block/Heading1";
import Heading2 from "./block/Heading2";
import Heading3 from "./block/Heading3";
import BulettedListItem from "./block/BulettedListItem";
import NumberedListItem from "./block/NumberedListItem";
import Code from "./block/Code";

interface BlockRendererProps {
  block: NotionBlock;
}

export const BlockRenderer: FC<BlockRendererProps> = ({ block }) => {
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
  } else if (block.type === "numbered_list_item") {
    return <NumberedListItem block={block} />;
  } else if (block.type === "code") {
    return <Code block={block} />;
  }

  return (
    <div>
      Unknown Block: <span>{JSON.stringify(block)}</span>
    </div>
  );
};
