import 'server-only';

import sharp from 'sharp';

export async function getImageSize(filePath: string) {
  const image = sharp(filePath);
  const { width, height } = await image.metadata();

  if (!width || !height) {
    throw new Error(`Failed to get image size: ${filePath}`);
  }

  return { width, height };
}

export async function getPreviewImage(filePath: string): Promise<string> {
  const outputBuffer = await sharp(filePath).resize(50).png({ quality: 10 }).toBuffer();
  const base64 = outputBuffer.toString('base64');
  return `data:image/png;base64,${base64}`;
}
