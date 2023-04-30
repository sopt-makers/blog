import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { FC, ReactElement, ReactNode } from "react";

interface RichTextRendererProps {
  render?: (content: ReactNode) => ReactElement;
  richText: RichTextItemResponse[];
}

const RichTextRenderer: FC<RichTextRendererProps> = ({
  richText,
  render = (node) => <>{node}</>,
}) => {
  const rendered = (
    <>
      {richText.map((text, idx) => {
        const anno = text.annotations;

        const block = (
          <span
            key={idx}
            className={clsx([
              anno.bold && "font-bold",
              anno.underline && "underline",
              anno.italic && "italic",
              anno.strikethrough && "line-through",
            ])}
          >
            {text.plain_text}
          </span>
        );

        if (text.href) {
          return (
            <a
              key={idx}
              href={text.href}
              className="text-gray-500 underline"
              target="_blank"
            >
              {block}
            </a>
          );
        }

        return block;
      })}
    </>
  );

  return render(rendered);
};

export default RichTextRenderer;
