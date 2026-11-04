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
