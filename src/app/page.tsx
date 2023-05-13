import Link from "next/link";
import { getArticles } from "@/blog";
import { SOURCE_DATABASE } from "@/const";

export default async function Home() {
  const articles = await getArticles(SOURCE_DATABASE);

  return (
    <main className="">
      <div className="">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="flex gap-3 hover:bg-gray-100"
          >
            <h1>{article.title}</h1>
          </Link>
        ))}
      </div>
    </main>
  );
}
