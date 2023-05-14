export const SOURCE_DATABASE = assertString(process.env.SOURCE_DATABASE);
export const NOTION_API_KEY = assertString(process.env.NOTION_API_KEY);

function assertString(data: unknown) {
  if (typeof data !== 'string') {
    throw new Error('ENV NOT SET');
  }
  return data;
}
