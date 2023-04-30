import { FC } from "react";
import RichTextRenderer from "../RichTextRenderer";
import { PickNotionBlock } from "@/notion/types";

interface ParagraphProps {
  block: PickNotionBlock<"paragraph">;
}

const Paragraph: FC<ParagraphProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.paragraph.rich_text}
      render={(children) => <p>{children}</p>}
    />
  );
};

export default Paragraph;
