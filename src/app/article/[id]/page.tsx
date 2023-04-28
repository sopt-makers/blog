import { SOURCE_DATABASE } from "@/const";
import { getArticle, getArticles } from "@/notion/notion";
import { format } from "date-fns";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const article = await getArticle(id);

  return (
    <div>
      <h1>{article.title}</h1>
      <p>작성: {format(article.createdTime, "yyyy/MM/dd HH:mm")}</p>
      <p>수정: {format(article.editedTime, "yyyy/MM/dd HH:mm")}</p>
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await getArticles(SOURCE_DATABASE);

  return articles.map((article) => ({
    id: article.id,
  }));
}
