import 'server-only';

import type {
  GetPageResponse,
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';

const NOTION_API_KEY = process.env.NOTION_API_KEY;

const defaultHeaders = {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Notion-Version': '2022-06-28',
};

async function fetchWithErrorHandling(url: string, options: RequestInit): Promise<Response> {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData);
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
}

export async function databaseRetrieve(id: string) {
  const response = await fetchWithErrorHandling(`https://api.notion.com/v1/databases/${id}/query`, {
    method: 'POST',
    headers: defaultHeaders,
  });

  const data: QueryDatabaseResponse = await response.json();
  return data;
}

export const retrieveBlockChildren = cache(async (id: string) => {
  const response = await fetchWithErrorHandling(`https://api.notion.com/v1/blocks/${id}/children?page_size=100`, {
    headers: defaultHeaders,
  });

  const data: ListBlockChildrenResponse = await response.json();
  return data;
});

export async function retrievePage(id: string) {
  const response = await fetchWithErrorHandling(`https://api.notion.com/v1/pages/${id}`, {
    headers: defaultHeaders,
  });

  const data: GetPageResponse = await response.json();
  return data;
}
