import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import clsx from "clsx";
import { FC, Fragment, ReactElement, ReactNode } from "react";

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
        if (text.href) {
          return (
            <a key={idx} href={text.href}>
              {text.plain_text}
            </a>
          );
        }

        const anno = text.annotations;

        return (
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
      })}
    </>
  );

  return render(rendered);
};

export default RichTextRenderer;
