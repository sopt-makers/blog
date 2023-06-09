import { format } from 'date-fns';
import { decode, encode } from 'js-base64';
import Link from 'next/link';

import { getArticles } from '@/blog';
import Chip from '@/components/common/Chip';
import BundledImage from '@/components/image/BundledImage';

export async function generateStaticParams() {
  const articles = await getArticles();

  const params = articles
    .map((article) => article.category)
    .filter((category): category is string => !!category)
    .map((category) => ({ category: encode(category) }));

  return params;
}

export default async function ArticleList({ params }: { params: { category?: string } }) {
  const currentCategory = params.category ? decode(decodeURIComponent(params.category)) : undefined;

  const articles = (await getArticles()).filter((article) => article.publish);
  const categories = articles.map((article) => article.category).filter((category): category is string => !!category);
  const filteredArticles = articles.filter((article) => !currentCategory || article.category === currentCategory);

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-[800px]'>
        <div className='px-[16px] py-[20px]'>
          <MakersLogo className='h-[50px]' />
        </div>
        <div className='sticky top-0 flex gap-[8px] bg-black100 px-[16px] py-[12px] md:mt-[56px]'>
          <Link href='/'>
            <Chip active={!currentCategory}>전체</Chip>
          </Link>
          {categories.map((category) => (
            <Link key={category} href={`/category/${encode(category)}`}>
              <Chip active={category === currentCategory}>{category}</Chip>
            </Link>
          ))}
        </div>
        <div className=''>
          {filteredArticles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`} className='flex px-[24px] py-[16px] md:py-[40px]'>
              <div className='flex flex-grow flex-col'>
                <div className='text-[14px] font-light text-gray60 md:text-[16px]'>
                  {article.category} | {article.publishedAt && format(article.publishedAt, 'yyyy.MM.dd')}
                </div>
                <h1 className='mt-[6px] line-clamp-2 break-keep text-[22px] font-bold leading-tight text-white100 md:mt-[8px] md:text-[28px]'>
                  {article.title}
                </h1>
                <div className='mt-[12px] text-[14px] font-light md:text-[16px]'>
                  {article.editors.length === 1 && (
                    <>
                      <span className='text-white100'>{article.editors[0].name}</span>
                      <span className='px-[4px] text-gray60'>∙</span>
                      <span className='text-gray60'>{article.editors[0].role}</span>
                    </>
                  )}
                  {article.editors.length >= 2 && (
                    <span className='text-white100'>{article.editors.map((editor) => editor.name).join(', ')}</span>
                  )}
                </div>
              </div>
              {article.thumbnail && (
                <div className='mt-[25px] flex h-[68px] w-[68px] justify-center overflow-hidden md:mt-0 md:h-[140px] md:w-[140px]'>
                  <BundledImage
                    src={article.thumbnail.url}
                    alt='Thumbnail'
                    height='140'
                    className='h-full w-full object-cover'
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MakersLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 137 50' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        d='M25.422 40.447V32.49c0-1.088.48-2.121 1.313-2.822L52.002 8.399c1.008-.849 2.547-.132 2.547 1.185v8.077a3.689 3.689 0 01-1.32 2.828L27.965 41.636c-1.009.844-2.544.127-2.544-1.189zM46.382 42a1.55 1.55 0 01-1.55-1.55v-6.61c0-.856.694-1.55 1.55-1.55h6.61c.855 0 1.55.694 1.55 1.55v6.61a1.55 1.55 0 01-1.55 1.55h-6.61z'
        fill='#fff'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.131 41.068A1.545 1.545 0 016 40.442v-6.61c0-.045.002-.09.006-.134v-1.21c0-1.087.48-2.12 1.313-2.821L32.58 8.399c1.007-.849 2.546-.132 2.546 1.185v8.077a3.689 3.689 0 01-1.32 2.828L15.705 35.645v4.797a1.55 1.55 0 01-1.55 1.55H7.72a1.567 1.567 0 01-1.589-.924z'
        fill='#fff'
      />
      <path
        d='M68.063 21.891H63.77a2.442 2.442 0 01-2.443-2.441v-.177c0-.098.08-.177.177-.177h1.764c.097 0 .176.079.176.177 0 .278.225.503.504.503h4.219a.846.846 0 00.846-.846v-.65a.676.676 0 00-.676-.675h-4.276a2.917 2.917 0 01-2.917-2.917v-.683a3.065 3.065 0 013.065-3.064h4.036a2.699 2.699 0 012.699 2.698c0 .097-.08.176-.177.176h-1.82a.119.119 0 01-.119-.118v-.077a.565.565 0 00-.565-.564H64.09a.83.83 0 00-.83.83v.68c0 .51.414.924.924.924h4.372a2.572 2.572 0 012.573 2.571v.765a3.065 3.065 0 01-3.065 3.064v.001zM128.12 41.87h-4.294a2.442 2.442 0 01-2.442-2.441v-.178c0-.097.079-.176.177-.176h1.763c.098 0 .177.079.177.176 0 .279.225.504.504.504h4.218a.846.846 0 00.847-.846v-.65a.676.676 0 00-.676-.676h-4.275a2.917 2.917 0 01-2.918-2.916v-.683a3.065 3.065 0 013.065-3.064h4.037a2.699 2.699 0 012.699 2.698c0 .097-.08.176-.177.176h-1.821a.119.119 0 01-.118-.118v-.077a.565.565 0 00-.565-.564h-4.174a.83.83 0 00-.83.83v.68c0 .51.414.924.923.924h4.373a2.571 2.571 0 012.572 2.571v.765a3.064 3.064 0 01-3.065 3.064v.001zM79.062 13.102c.543 0 .984.442.984.984v4.741a.986.986 0 01-.984.985h-3.73a.986.986 0 01-.983-.985v-4.74c0-.544.442-.985.984-.985h3.729zm0-2.114h-3.73a3.098 3.098 0 00-3.098 3.098v4.741a3.098 3.098 0 003.099 3.1h3.729a3.098 3.098 0 003.099-3.1v-4.74a3.098 3.098 0 00-3.099-3.1zM85.473 10.988h-1.547a.284.284 0 00-.284.284v14.88c0 .157.127.284.284.284h1.547a.284.284 0 00.284-.284v-14.88a.284.284 0 00-.284-.284zM92.187 26.456h-1.563a.276.276 0 00-.276.276v14.897c0 .153.123.276.276.276h1.563a.276.276 0 00.276-.276V26.732a.276.276 0 00-.276-.276zM120.536 31.196a.275.275 0 00-.276-.276h-3.486c-1.022 0-1.482.506-1.758 1.425v-1.196a.275.275 0 00-.276-.276h-1.565a.276.276 0 00-.276.276v10.48c0 .153.124.276.276.276h1.565a.275.275 0 00.276-.276v-7.077c0-.838.68-1.518 1.519-1.518h3.724a.275.275 0 00.276-.275v-1.564l.001.001z'
        fill='#fff'
      />
      <path d='M94.853 37.034V34.92h-4.416v2.115h4.416z' fill='#fff' />
      <path
        d='M98.134 30.78h2.171c.135 0 .212.157.127.264l-4.019 5.072h-2.757l4.072-5.14a.518.518 0 01.407-.196h-.001zM98.504 41.998h2.173a.162.162 0 00.128-.262l-4.392-5.62h-2.757l4.44 5.683c.099.126.25.2.408.2zM78.883 31.148v1.564c0 .152.123.276.276.276h6.382c.489 0 .884.395.884.883v7.758c0 .153.124.276.276.276h1.565a.276.276 0 00.276-.276v-8.457a2.306 2.306 0 00-2.3-2.299H79.16a.276.276 0 00-.276.276h-.001zM90.695 11.034h-3.394c-.958 0-1.734.776-1.734 1.733v7.208c0 1.084.88 1.963 1.964 1.963h3.165a2.74 2.74 0 002.74-2.738v-5.427a2.74 2.74 0 00-2.74-2.738zm.67 7.69c0 .6-.487 1.087-1.088 1.087h-3.304a1.22 1.22 0 01-1.222-1.22v-4.18c0-.675.547-1.221 1.222-1.221h3.304c.6 0 1.088.487 1.088 1.087v4.448zM98.817 19.776a1.29 1.29 0 01-1.29-1.29v-5.389h3.771a.275.275 0 00.276-.275v-1.564a.275.275 0 00-.276-.276h-3.771V8.276A.275.275 0 0097.25 8h-1.38a.275.275 0 00-.277.276v2.073c0 .35-.283.633-.633.633h-.287a.276.276 0 00-.276.276v1.564c0 .152.124.276.276.276h.736v5.388a3.406 3.406 0 003.406 3.405h2.501a.275.275 0 00.276-.276v-1.564a.275.275 0 00-.276-.275h-2.5zM73.9 30.747h-1.873c-.93 0-1.757.434-2.293 1.109a2.786 2.786 0 00-2.227-1.109h-1.782a2.921 2.921 0 00-2.464 1.35v-1.074a.276.276 0 00-.276-.276H61.42a.275.275 0 00-.276.276V41.63c0 .153.123.276.276.276h1.565a.276.276 0 00.276-.276v-7.65c0-.618.5-1.118 1.117-1.118h2.324c.64 0 1.159.519 1.159 1.159v7.608c0 .153.123.276.276.276h1.533a.276.276 0 00.276-.276V33.98c0-.617.5-1.117 1.118-1.117h2.323c.64 0 1.16.519 1.16 1.158v7.607c0 .153.122.276.275.276h1.597a.276.276 0 00.276-.276v-8.092a2.79 2.79 0 00-2.791-2.789l-.004.001z'
        fill='#fff'
      />
      <path
        d='M80.41 35.672a2.223 2.223 0 00-2.224 2.223v1.787c0 1.227.996 2.223 2.224 2.223h3.467c2.232 0 3.097-1.809 3.097-4.04v-2.853l-6.564.66zm6.012 2.307c0 1.11-.706 1.827-1.817 1.827h-3.197c-.61 0-1.106-.312-1.106-.922v-.339c0-.61.495-.921 1.106-.921l5.014-.513v.868zM103.142 37.701v-1.039h-2.115v1.426a3.91 3.91 0 003.909 3.91h5.195a.275.275 0 00.276-.276v-1.565a.275.275 0 00-.276-.276h-4.808a2.181 2.181 0 01-2.181-2.18z'
        fill='#fff'
      />
      <path
        d='M101.027 33.911v3.216h9.925a.28.28 0 00.28-.28v-2.934a3.038 3.038 0 00-3.037-3.04h-4.129a3.038 3.038 0 00-3.038 3.04l-.001-.002zm8.091 1.1h-5.779a.197.197 0 01-.197-.196V33.74c0-.414.336-.751.751-.751h4.473c.415 0 .751.337.751.752v1.272l.001-.001z'
        fill='#fff'
      />
    </svg>
  );
}
