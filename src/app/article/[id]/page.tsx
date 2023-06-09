import type { Metadata, ResolvingMetadata } from 'next';

import { getArticleById, getArticles } from '@/blog';
import ArticlePage from '@/components/article/ArticlePage';
import { bundleImage } from '@/components/image/bundle';
import { getBundleKey } from '@/components/image/BundledImage';
import { BASE_URL, DISABLE_ROBOTS } from '@/const';

type Props = { params: { id: string } };

export async function generateStaticParams() {
  const articles = await getArticles();

  return articles
    .filter((article) => article.publish)
    .map((article) => ({
      id: article.id,
    }));
}

export async function generateMetadata({ params }: Props, _parent: ResolvingMetadata): Promise<Metadata> {
  const id = params.id;
  const article = await getArticleById(id);

  const thumbnailImage = await (async () => {
    if (!article.thumbnail) {
      return undefined;
    }
    const { publicUrl } = await bundleImage(article.thumbnail.url, getBundleKey(article.thumbnail.url));
    return [`${BASE_URL}${publicUrl}`];
  })();

  return {
    title: article.title,
    description: 'SOPT Makers 블로그',
    openGraph: {
      title: `${article.title} - SOPT Makers 블로그`,
      description: 'SOPT Makers 블로그',
      type: 'article',
      images: thumbnailImage,
    },
    robots: DISABLE_ROBOTS
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            'index': true,
            'follow': true,
            'noimageindex': false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

export default async function Page({ params }: Props) {
  return <ArticlePage id={params.id} />;
}
