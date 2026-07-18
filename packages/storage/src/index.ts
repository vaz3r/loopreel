import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env['R2_ACCOUNT_ID']}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env['R2_ACCESS_KEY_ID'] ?? '',
    secretAccessKey: process.env['R2_SECRET_ACCESS_KEY'] ?? '',
  },
});

const BUCKET = process.env['R2_BUCKET_NAME'] ?? 'loopreel';

export async function uploadAudio(jobId: string, data: Buffer, contentType = 'audio/mpeg'): Promise<string> {
  const key = `audio/${jobId}.mp3`;
  await client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: data,
    ContentType: contentType,
  }));
  return key;
}

export async function uploadSlide(jobId: string, slideIndex: number, data: Buffer): Promise<string> {
  const key = `slides/${jobId}/${slideIndex}.png`;
  await client.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: data,
    ContentType: 'image/png',
  }));
  return key;
}

export async function downloadAudio(r2Key: string): Promise<Buffer> {
  const response = await client.send(new GetObjectCommand({
    Bucket: BUCKET,
    Key: r2Key,
  }));

  const stream = response.Body;
  if (!stream) throw new Error('Empty response body');

  const chunks: Uint8Array[] = [];
  const reader = stream.transformToWebStream().getReader();
  let done = false;
  while (!done) {
    const result = await reader.read();
    done = result.done;
    if (result.value) chunks.push(result.value);
  }
  return Buffer.concat(chunks);
}

export async function deleteAudio(r2Key: string): Promise<void> {
  await client.send(new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: r2Key,
  }));
}

export async function getPresignedUrl(key: string, expiresIn = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  return getSignedUrl(client, command, { expiresIn });
}
