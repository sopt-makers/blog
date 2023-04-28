import { Inter } from "next/font/google";
import Link from "next/link";
import { getArticles } from "@/notion/notion";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  // const res = await getDBInfo();
  // const dbData = await getDBData();
  const articles = await getArticles();

  return (
    <main className="">
      <div className="">
        {articles.map((article) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <h1>{article.title}</h1>
          </Link>
        ))}
      </div>
    </main>
  );
}
