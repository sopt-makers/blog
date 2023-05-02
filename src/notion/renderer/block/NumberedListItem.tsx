import { FC } from "react";
import RichTextRenderer from "../RichTextRenderer";
import { PickNotionBlock } from "@/notion/types";

interface NumberedListItemProps {
  block: PickNotionBlock<"numbered_list_item">;
  num: number;
}

const NumberedListItem: FC<NumberedListItemProps> = ({ block, num }) => {
  return (
    <RichTextRenderer
      richText={block.numbered_list_item.rich_text}
      render={(children) => (
        <div className="list-disc list-inside">
          {num}. {children}
        </div>
      )}
    />
  );
};

export default NumberedListItem;
