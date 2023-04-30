import { FC } from "react";
import RichTextRenderer from "../RichTextRenderer";
import { PickNotionBlock } from "@/notion/types";

interface BulettedListItemProps {
  block: PickNotionBlock<"bulleted_list_item">;
}

const BulettedListItem: FC<BulettedListItemProps> = ({ block }) => {
  return (
    <RichTextRenderer
      richText={block.bulleted_list_item.rich_text}
      render={(children) => (
        <div className="list-disc list-inside">BUL: {children}</div>
      )}
    />
  );
};

export default BulettedListItem;
