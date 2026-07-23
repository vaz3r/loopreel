import { execFile } from 'node:child_process';
import { readFile, unlink } from 'node:fs/promises';
import { promisify } from 'node:util';
import { JobRepository } from '@loopreel/db';
import { createQueue } from '@loopreel/queue';
import { uploadAudio, deleteAudio } from '@loopreel/storage';
import type pino from 'pino';

const execFileAsync = promisify(execFile);
const transcribeQueue = createQueue('transcribe');

export async function handleYouTube(
  jobId: string,
  sourceUrl: string,
  logger: pino.Logger,
): Promise<void> {
  const tmpPath = `/tmp/${jobId}.mp3`;

  try {
    logger.info({ sourceUrl }, 'Downloading YouTube audio');
    await execFileAsync('yt-dlp', [
      '-x', '--audio-format', 'mp3',
      '--audio-quality', '5',
      '-o', tmpPath,
      '--no-playlist',
      '--socket-timeout', '30',
      sourceUrl,
    ], { timeout: 300_000 });

    const audioBuffer = await readFile(tmpPath);
    logger.info({ size: audioBuffer.length }, 'Audio downloaded');

    const r2Key = await uploadAudio(jobId, audioBuffer);
    logger.info({ r2Key }, 'Audio uploaded to R2');

    await JobRepository.updateStatus(jobId, 'transcribing');

    await transcribeQueue.add(`job-${jobId}`, {
      jobId,
      audioR2Key: r2Key,
    });

    logger.info({ r2Key }, 'Dispatched to transcribe queue');
  } finally {
    await unlink(tmpPath).catch(() => {});
  }
}

export async function cleanupAudio(_jobId: string, r2Key: string): Promise<void> {
  await deleteAudio(r2Key).catch(() => {});
}
