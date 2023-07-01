import ArticleList from './category/[category]/page';

export default async function Home() {
  return <ArticleList params={{ category: undefined }} />;
}
