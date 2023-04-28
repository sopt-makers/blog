import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getBlocks, getDatabaseContents, getPage } from "./request";

export async function getArticles(id: string) {
  const objects = await getDatabaseContents(id);

  const articles = objects.map(
    ({ properties, id, last_edited_time, created_time }) => {
      const title = getTitle(properties);

      return {
        id,
        title,
        createdTime: Date.parse(created_time),
        editedTime: Date.parse(last_edited_time),
      };
    }
  );

  return articles;
}

export async function getArticle(id: string) {
  const [meta, blocks] = await Promise.all([getPage(id), getBlocks(id)]);

  const title = getTitle(meta.properties);

  return {
    title,
    createdTime: Date.parse(meta.created_time),
    editedTime: Date.parse(meta.last_edited_time),
    blocks,
  };
}

function getTitle(properties: PageObjectResponse["properties"]) {
  const titleProperty = properties["Title"];
  if (titleProperty.type !== "title") {
    throw new Error("This should not happen.");
  }
  const title = titleProperty.title.map((v) => v.plain_text).join("");

  return title;
}
