import { writeFile, unlink } from 'node:fs/promises';
import { downloadAudio, deleteAudio } from '@loopreel/storage';
import type pino from 'pino';

const WHISPER_URL = process.env['WHISPER_URL'] ?? 'http://localhost:8000';

export async function transcribeAudio(
  jobId: string,
  audioR2Key: string,
  logger: pino.Logger,
): Promise<string> {
  const tmpPath = `/tmp/${jobId}.mp3`;

  try {
    // Download audio from R2
    logger.info({ audioR2Key }, 'Downloading audio from R2');
    const audioBuffer = await downloadAudio(audioR2Key);
    await writeFile(tmpPath, audioBuffer);
    logger.info({ size: audioBuffer.length }, 'Audio downloaded');

    // Upload to Whisper
    logger.info({ whisperUrl: WHISPER_URL }, 'Sending to Whisper');
    const formData = new FormData();
    formData.append('audio_file', new Blob([audioBuffer], { type: 'audio/mpeg' }), `${jobId}.mp3`);
    formData.append('output_format', 'txt');

    const response = await fetch(`${WHISPER_URL}/asr`, {
      method: 'POST',
      body: formData,
      signal: AbortSignal.timeout(600_000), // 10 min timeout for long audio
    });

    if (!response.ok) {
      const text = await response.text().catch(() => 'No response body');
      throw new Error(`Whisper error ${response.status}: ${text}`);
    }

    const transcript = await response.text();
    logger.info({ transcriptLength: transcript.length }, 'Transcription complete');

    return transcript;
  } finally {
    // Always cleanup
    await unlink(tmpPath).catch(() => {});
    await deleteAudio(audioR2Key).catch(() => {});
  }
}
