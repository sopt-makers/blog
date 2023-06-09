import { wrapAsyncComponent } from '@/util';

import ArticleList from './category/[category]/page';

const WrappedArticleList = wrapAsyncComponent(ArticleList);

export default async function Home() {
  return <WrappedArticleList params={{ category: undefined }} />;
}
