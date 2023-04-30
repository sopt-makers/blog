import { FC } from "react";
import RichTextRenderer from "../RichTextRenderer";
import { PickNotionBlock } from "@/notion/types";

interface Heading1Props {
  block: PickNotionBlock<"heading_1">;
}

const Heading1: FC<Heading1Props> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.heading_1.rich_text}
      render={(children) => <h1 className="text-3xl">{children}</h1>}
    />
  );
};

export default Heading1;
