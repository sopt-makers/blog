import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { getBlocks, getDatabaseContents, getPage } from './notion/request';

export async function getArticles(id: string) {
  const objects = await getDatabaseContents(id);

  const articles = objects.map(({ properties, id }) => {
    const { title, thumbnail, publishedAt, category } = extractArticleProperties(properties);

    return {
      id,
      title,
      thumbnail,
      publishedAt,
      category,
    };
  });

  return articles;
}

export async function getArticle(id: string) {
  const [meta, blocks] = await Promise.all([getPage(id), getBlocks(id)]);

  const { title, publishedAt, category, thumbnail } = extractArticleProperties(meta.properties);

  return {
    title,
    publishedAt,
    category,
    thumbnail,
    blocks,
  };
}

function extractArticleProperties(properties: PageObjectResponse['properties']) {
  const resolver = propertyResolver(properties);

  const title = resolver.title('title');
  const editorIds = resolver
    .richText('editorIds')
    .split(',')
    .map((s) => parseInt(s, 10));
  const publishedAt = resolver.date('publishedAt');
  const category = resolver.select('category');
  const thumbnailFiles = resolver.files('thumbnail');
  const thumbnail = thumbnailFiles.length > 0 ? thumbnailFiles[0] : null;

  return {
    title,
    editorIds,
    publishedAt,
    category,
    thumbnail,
  };
}

function propertyResolver(properties: PageObjectResponse['properties']) {
  function getTypedProperty<T extends PageObjectResponse['properties'][string]['type']>(
    name: string,
    type: T,
  ): PageObjectResponse['properties'][string] & { type: T } {
    const property = properties[name];

    if (property.type !== type) {
      throw new Error(`${name} 필드는 ${type} 타입의 속성이 아닙니다.`);
    }

    return property as PageObjectResponse['properties'][string] & { type: T };
  }

  // console.log(JSON.stringify(properties, null, 2));

  return {
    title(name: string) {
      const titleProperty = getTypedProperty(name, 'title');
      const title = titleProperty.title.map((v) => v.plain_text).join('');

      return title;
    },
    date(name: string) {
      const dateProperty = getTypedProperty(name, 'date');

      const rawDate = dateProperty.date;
      if (!rawDate) {
        return null;
      }

      return new Date(Date.parse(rawDate.start));
    },
    richText(name: string) {
      const richTextProperty = getTypedProperty(name, 'rich_text');

      return richTextProperty.rich_text.map((v) => v.plain_text).join('');
    },
    select(name: string) {
      const selectProperty = getTypedProperty(name, 'select');

      return selectProperty.select?.name ?? null;
    },
    files(name: string) {
      const filesProperty = getTypedProperty(name, 'files');

      return filesProperty.files.map((file) => {
        if (file.type === 'file') {
          return {
            name: file.name,
            url: file.file.url,
          };
        } else if (file.type === 'external') {
          return {
            name: file.name,
            url: file.external.url,
          };
        }

        return null;
      });
    },
  };
}
