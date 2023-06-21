export const SOURCE_DATABASE = assertString(process.env.SOURCE_DATABASE);
export const NOTION_API_KEY = assertString(process.env.NOTION_API_KEY);
export const DISABLE_ROBOTS = `${process.env.DISABLE_ROBOTS}`.trim().toLowerCase() === 'true';
export const BASE_URL = assertString(process.env.NEXT_PUBLIC_BASE_URL);

function assertString(data: unknown) {
  if (typeof data !== 'string') {
    throw new Error('ENV NOT SET');
  }
  return data;
}
