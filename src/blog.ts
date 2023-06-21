import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { SOURCE_DATABASE } from '@/const';

import { propertyResolver } from './notion/property';
import { getBlocks, getDatabaseContents, getPage } from './notion/request';

export async function getArticles() {
  const objects = await getDatabaseContents(SOURCE_DATABASE);

  const articles = objects.map(({ properties, id }) => {
    const { title, thumbnail, publishedAt, category, editors } = extractArticleProperties(properties);

    return {
      id,
      title,
      editors,
      thumbnail,
      publishedAt,
      category,
    };
  });

  return articles;
}

export async function getArticleById(id: string) {
  const [meta, blocks] = await Promise.all([getPage(id), getBlocks(id)]);

  const { title, publishedAt, category, thumbnail, editors } = extractArticleProperties(meta.properties);

  return {
    title,
    editors,
    publishedAt,
    category,
    thumbnail,
    blocks,
  };
}

export async function getArticleIdBySeq(seq: string) {
  const articles = await getArticles();
}

function extractArticleProperties(properties: PageObjectResponse['properties']) {
  const resolver = propertyResolver(properties);

  const title = resolver.title('title');
  const editors = resolver.multiSelect('editors').map((raw) => {
    const [name, role = undefined] = raw.split('|');

    return {
      name,
      role,
    };
  });
  const publishedAt = resolver.date('publishedAt');
  const category = resolver.select('category');
  const thumbnailFiles = resolver.files('thumbnail');
  const thumbnail = thumbnailFiles.length > 0 ? thumbnailFiles[0] : null;

  return {
    title,
    editors,
    publishedAt,
    category,
    thumbnail,
  };
}
