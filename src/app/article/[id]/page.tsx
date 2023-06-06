import { format } from 'date-fns';

import { getArticle, getArticles } from '@/blog';
import { SOURCE_DATABASE } from '@/const';
import BlockDebugger from '@/notion/renderer/BlockDebugger';
import { BlockRenderer } from '@/notion/renderer/BlockRenderer';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const article = await getArticle(id);

  return (
    <div className='mt-[20px] px-[16px]'>
      <div className='flex'>
        <span className='rounded-[13px] bg-black80 px-[12px] py-[6px] leading-[120%] text-white100'>
          {article.category}
        </span>
      </div>
      <h1 className='text-[28px] font-bold text-white100'>{article.title}</h1>
      <h4 className='text-[14px] font-light text-gray60'>
        {article.publishedAt && format(article.publishedAt, 'yyyy.MM.dd')}
      </h4>
      <div className='mt-[40px] flex flex-col gap-y-[20px]'>
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
