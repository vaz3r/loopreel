import { Queue, Worker, type QueueOptions, type WorkerOptions } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis(process.env['REDIS_URL'] ?? 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

export { connection };

const QUEUE_DEFAULTS: QueueOptions = {
  connection,
  defaultJobOptions: {
    removeOnComplete: { age: 3600 },
    removeOnFail: { age: 86400 },
  },
};

const WORKER_DEFAULTS: WorkerOptions = {
  connection,
  concurrency: 1,
};

export function createQueue(name: string, opts?: Partial<QueueOptions>): Queue {
  return new Queue(name, { ...QUEUE_DEFAULTS, ...opts });
}

export function createWorker<T = unknown>(
  name: string,
  handler: (job: { data: T; attemptsMade: number }) => Promise<void>,
  opts?: Partial<WorkerOptions>,
): Worker<T> {
  return new Worker<T>(name, handler as (job: { data: T }) => Promise<void>, { ...WORKER_DEFAULTS, ...opts });
}

export const QUEUE_RETRY_CONFIG: Record<string, { attempts: number; backoff: { type: 'fixed' | 'exponential'; delay: number } }> = {
  ingest: {
    attempts: 2,
    backoff: { type: 'fixed', delay: 5000 },
  },
  transcribe: {
    attempts: 2,
    backoff: { type: 'fixed', delay: 10000 },
  },
  structure: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  },
  render: {
    attempts: 1,
    backoff: { type: 'fixed', delay: 5000 },
  },
};
