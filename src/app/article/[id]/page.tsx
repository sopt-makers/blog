import { format } from 'date-fns';
import Link from 'next/link';

import { getArticle, getArticles } from '@/blog';
import BundledImage from '@/components/BundledImage';
import { SOURCE_DATABASE } from '@/const';
import BlockDebugger from '@/notion/renderer/BlockDebugger';
import { BlockRenderer } from '@/notion/renderer/BlockRenderer';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const article = await getArticle(id);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex max-w-[800px] flex-col px-[16px]'>
        <Link href='/' className='flex gap-x-[8px] self-start py-[24px] pr-[8px]'>
          <BackIcon />
          <span className='text-[16px] font-light leading-[20px] text-gray80'>블로그 홈 가기</span>
        </Link>
        {article.thumbnail && (
          <BundledImage src={article.thumbnail.url} className='rounded-lg border border-real-white/10 md:rounded-3xl' />
        )}
        <div className='mt-[20px] flex md:mt-[32px]'>
          <span className='rounded-[13px] bg-black80 px-[12px] py-[6px] leading-[120%] text-white100'>
            {article.category}
          </span>
        </div>
        <h1 className='mt-[12px] break-keep text-[28px] font-bold leading-[130%] text-white100 md:text-[40px]'>
          {article.title}
        </h1>
        <h4 className='mt-[8px] text-[14px] font-light text-gray60'>
          {article.publishedAt && format(article.publishedAt, 'yyyy.MM.dd')}
        </h4>
        <div className='mt-[40px] flex flex-col gap-y-[20px] md:mt-[80px]'>
          <BlockRenderer blocks={article.blocks} />
          {article.blocks.map((block, idx) => (
            <BlockDebugger key={idx} block={block} />
          ))}
        </div>
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

function BackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={20} height={20} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M13.852 2.642a.498.498 0 010 .7L7.194 10l6.658 6.658a.498.498 0 010 .7.498.498 0 01-.7 0L6.144 10.35a.498.498 0 010-.7l7.008-7.008a.498.498 0 01.7 0z'
        fill='#808388'
      />
    </svg>
  );
}
