import { BASE_URL } from '@/const';
import { wrapAsyncComponent } from '@/util';

import ArticleList from './category/[category]/page';

const WrappedArticleList = wrapAsyncComponent(ArticleList);

export const metadata = {
  title: '메이커스 블로그',
  description: '',
  openGraph: {
    title: '메이커스 블로그',
    description: 'SOPT Makers가 만들어가는 블로그입니다.',
    url: BASE_URL ?? undefined,
    type: 'website',
  },
  metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      'index': false,
      'follow': true,
      'noimageindex': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function Home() {
  return <WrappedArticleList params={{ category: undefined }} />;
}
