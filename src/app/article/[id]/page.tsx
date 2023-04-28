import { retrieveBlockChildren } from "@/notion/api";
import { getArticles } from "@/notion/notion";

export default async function Page({ params }: { params: { id: string } }) {
  const article = await retrieveBlockChildren(params.id);

  if (!("type" in article)) {
    throw new Error();
  }

  return (
    <div>
      <div>{params.id}</div>
      <h1 className="whitespace-pre">{JSON.stringify(article, null, 2)}</h1>
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles.map((article) => ({
    id: article.id,
  }));
}
