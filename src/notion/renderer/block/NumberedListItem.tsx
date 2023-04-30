import { FC } from "react";
import RichTextRenderer from "../RichTextRenderer";
import { PickNotionBlock } from "@/notion/types";

interface NumberedListItemProps {
  block: PickNotionBlock<"numbered_list_item">;
}

const NumberedListItem: FC<NumberedListItemProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.numbered_list_item.rich_text}
      render={(children) => (
        <div className="list-disc list-inside">NUM: {children}</div>
      )}
    />
  );
};

export default NumberedListItem;
