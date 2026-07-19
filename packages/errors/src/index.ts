import { JobRepository } from '@loopreel/db';
import type pino from 'pino';

export type ErrorType = 'transient' | 'fatal';

export interface ClassifiedError extends Error {
  type: ErrorType;
}

const TRANSIENT_PATTERNS = [
  'timeout',
  'econnreset',
  'econnrefused',
  'socket hang up',
  'rate limit',
  '429',
  '503',
  '502',
  '529',
  'eai_again',
  'fetch failed',
];

export function classifyError(err: unknown): ClassifiedError {
  const error = err instanceof Error ? err : new Error(String(err));
  const msg = error.message.toLowerCase();

  const classified = error as ClassifiedError;

  if (TRANSIENT_PATTERNS.some((p) => msg.includes(p))) {
    classified.type = 'transient';
    return classified;
  }

  classified.type = 'fatal';
  return classified;
}

export async function handleError(
  jobId: string,
  err: unknown,
  logger: pino.Logger,
): Promise<void> {
  const classified = classifyError(err);

  if (classified.type === 'fatal') {
    logger.error({ err, jobId }, 'Fatal error, marking job failed');
    await JobRepository.markFailed(jobId, {
      stage: 'ingesting',
      reason: classified.type,
      details: classified.message,
    });
  } else {
    logger.warn({ err, jobId }, 'Transient error, will retry');
    throw classified;
  }
}
