import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { databaseRetrieve, retrieveBlockChildren } from "./api";

export async function getArticles(): Promise<ArticleMeta[]> {
  const dbData = await databaseRetrieve("69b53266e67340f882a3a5af7cd5df42");

  const articles: ArticleMeta[] = dbData.results
    .filter((result): result is PageObjectResponse => "properties" in result)
    .map(({ properties, id }) => {
      const titleProperty = properties["Title"];
      if (titleProperty.type !== "title") {
        throw new Error("This should not happen.");
      }
      const title = titleProperty.title.map((v) => v.plain_text).join("");

      return {
        id,
        title,
      };
    });

  return articles;
}

interface ArticleMeta {
  id: string;
  title: string;
}

export async function getArticle(id: string) {
  const data = await retrieveBlockChildren(id);

  const datas = data.results
    .filter((result): result is BlockObjectResponse => "properties" in result)
    .map(({}) => {});
}
