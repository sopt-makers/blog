import { FC } from "react";
import { NotionBlock } from "../request";
import Paragraph from "./block/Paragraph";
import Heading1 from "./block/Heading1";
import Heading2 from "./block/Heading2";
import Heading3 from "./block/Heading3";
import BulettedListItem from "./block/BulettedListItem";
import NumberedListItem from "./block/NumberedListItem";
import Code from "./block/Code";
import ImageBlock from "./block/Image";

interface BlockRendererProps {
  block: NotionBlock;
}

export const BlockRenderer: FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "heading_1":
      return <Heading1 block={block} />;
    case "heading_2":
      return <Heading2 block={block} />;
    case "heading_3":
      return <Heading3 block={block} />;
    case "bulleted_list_item":
      return <BulettedListItem block={block} />;
    case "numbered_list_item":
      return <NumberedListItem block={block} />;
    case "code":
      return <Code block={block} />;
    case "image":
      return (
        /* @ts-expect-error Server Component */
        <ImageBlock block={block} />
      );
    default:
      return (
        <div>
          Unknown Block: <span>{JSON.stringify(block)}</span>
        </div>
      );
  }
};
