import { format } from 'date-fns';

import { getArticle, getArticles } from '@/blog';
import { SOURCE_DATABASE } from '@/const';
import BlockDebugger from '@/notion/renderer/BlockDebugger';
import { BlockRenderer } from '@/notion/renderer/BlockRenderer';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const article = await getArticle(id);

  return (
    <div className=''>
      <header className='px-10'>
        <h1 className='text-6xl'>{article.title}</h1>
        <p>
          작성:
          {article.publishedAt && format(article.publishedAt, 'yyyy/MM/dd')}
        </p>
        <p>카테고리: {article.category}</p>
      </header>
      <div className='px-10'>
        <BlockRenderer blocks={article.blocks} />
        {article.blocks.map((block, idx) => (
          <BlockDebugger key={idx} block={block} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await getArticles(SOURCE_DATABASE);

  return articles.map((article) => ({
    id: article.id,
  }));
}
