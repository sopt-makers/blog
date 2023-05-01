import { FC } from "react";
import RichTextRenderer from "../RichTextRenderer";
import { PickNotionBlock } from "@/notion/types";

interface CodeProps {
  block: PickNotionBlock<"code">;
}

const Code: FC<CodeProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.code.rich_text}
      render={(children) => (
        <code className="bg-gray-200 block p-4">{children}</code>
      )}
    />
  );
};

export default Code;
