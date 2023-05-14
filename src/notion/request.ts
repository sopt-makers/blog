import type { BlockObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { databaseRetrieve, retrieveBlockChildren, retrievePage } from './api';

export type { BlockObjectResponse as NotionBlock };

export async function getDatabaseContents(id: string) {
  const dbData = await databaseRetrieve(id);

  const objects = dbData.results.filter((result): result is PageObjectResponse => 'properties' in result);

  return objects;
}

export async function getBlocks(id: string) {
  const data = await retrieveBlockChildren(id);

  const blocks = data.results.filter((result): result is BlockObjectResponse => 'type' in result);

  return blocks;
}

export async function getPage(id: string) {
  const page = await retrievePage(id);
  if (!('properties' in page)) {
    throw new Error();
  }

  return page;
}
