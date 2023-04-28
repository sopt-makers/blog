import type {
  ListBlockChildrenResponse,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import axios from "axios";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${NOTION_API_KEY}`,
    "Notion-Version": "2022-06-28",
  },
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data);
    }
    return Promise.reject(error);
  }
);

export async function databaseRetrieve(id: string) {
  const { data } = await axiosInstance.post<QueryDatabaseResponse>(
    `https://api.notion.com/v1/databases/${id}/query`
  );

  return data;
}

export async function retrieveBlockChildren(id: string) {
  const { data } = await axiosInstance.get<ListBlockChildrenResponse>(
    `https://api.notion.com/v1/blocks/${id}/children?page_size=100`
  );

  return data;
}
