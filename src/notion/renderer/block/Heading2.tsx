import { FC } from "react";
import RichTextRenderer from "../RichTextRenderer";
import { PickNotionBlock } from "@/notion/types";

interface Heading2Props {
  block: PickNotionBlock<"heading_2">;
}

const Heading2: FC<Heading2Props> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.heading_2.rich_text}
      render={(children) => <h2 className="text-2xl">{children}</h2>}
    />
  );
};

export default Heading2;
