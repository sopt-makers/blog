import { NotionBlock } from "@/notion/request";
import clsx from "clsx";
import { FC } from "react";

interface ParagraphProps {
  block: NotionBlock & { type: "paragraph" };
}

const Paragraph: FC<ParagraphProps> = ({ block }) => {
  return (
    <p>
      {block.paragraph.rich_text.map((text, idx) => {
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
    </p>
  );
};

export default Paragraph;
