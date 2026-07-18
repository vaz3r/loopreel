import { execFile } from 'node:child_process';
import { readFile, unlink } from 'node:fs/promises';
import { promisify } from 'node:util';
import { JobRepository } from '@loopreel/db';
import { uploadAudio, deleteAudio } from '@loopreel/storage';
import type pino from 'pino';

const execFileAsync = promisify(execFile);

export async function handleYouTube(
  jobId: string,
  sourceUrl: string,
  logger: pino.Logger,
): Promise<void> {
  const tmpPath = `/tmp/${jobId}.mp3`;

  try {
    // Download audio via yt-dlp
    logger.info({ sourceUrl }, 'Downloading YouTube audio');
    await execFileAsync('yt-dlp', [
      '-x', '--audio-format', 'mp3',
      '--audio-quality', '5',
      '-o', tmpPath,
      '--no-playlist',
      '--socket-timeout', '30',
      sourceUrl,
    ], { timeout: 300_000 });

    // Read the downloaded file
    const audioBuffer = await readFile(tmpPath);
    logger.info({ size: audioBuffer.length }, 'Audio downloaded');

    // Upload to R2
    const r2Key = await uploadAudio(jobId, audioBuffer);
    logger.info({ r2Key }, 'Audio uploaded to R2');

    // Cleanup local file
    await unlink(tmpPath).catch(() => {});

    // Update job status and dispatch to transcribe queue
    await JobRepository.updateStatusAndOutbox(
      jobId,
      'transcribing',
      'transcribe',
      { jobId, audioR2Key: r2Key },
    );

    logger.info({ r2Key }, 'Dispatched to transcribe queue');
  } catch (err) {
    // Cleanup on failure
    await unlink(tmpPath).catch(() => {});
    throw err;
  }
}

export async function cleanupAudio(_jobId: string, r2Key: string): Promise<void> {
  await deleteAudio(r2Key).catch(() => {});
}
