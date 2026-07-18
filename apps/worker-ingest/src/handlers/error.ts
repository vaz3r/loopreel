import { JobRepository } from '@loopreel/db';
import type pino from 'pino';

export type ErrorType = 'transient' | 'fatal';

export interface ClassifiedError extends Error {
  type: ErrorType;
}

export function classifyError(err: unknown): ClassifiedError {
  const error = err instanceof Error ? err : new Error(String(err));
  const msg = error.message.toLowerCase();

  // Transient errors — retryable
  if (
    msg.includes('timeout') ||
    msg.includes('econnreset') ||
    msg.includes('econnrefused') ||
    msg.includes('socket hang up') ||
    msg.includes('rate limit') ||
    msg.includes('429') ||
    msg.includes('503') ||
    msg.includes('502')
  ) {
    const classified = error as ClassifiedError;
    classified.type = 'transient';
    return classified;
  }

  // Fatal errors — not retryable
  const classified = error as ClassifiedError;
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
    await JobRepository.markFailed(jobId, classified.message);
  } else {
    logger.warn({ err, jobId }, 'Transient error, will retry');
    throw classified;
  }
}
