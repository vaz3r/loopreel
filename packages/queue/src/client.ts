import { Queue, Worker, type QueueOptions, type WorkerOptions } from 'bullmq';
import { Redis } from 'ioredis';

const REDIS_URL = process.env['REDIS_URL'] ?? 'redis://localhost:6379';

function createConnection() {
  return new Redis(REDIS_URL, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
    family: 4,
  });
}

const connection = createConnection();

export { connection };

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
};

const QUEUE_DEFAULTS: QueueOptions = {
  connection,
  defaultJobOptions: {
    removeOnComplete: { age: 3600 },
    removeOnFail: { age: 86400 },
  },
};

export function createQueue(name: string, opts?: Partial<QueueOptions>): Queue {
  const retryConfig = QUEUE_RETRY_CONFIG[name] ?? { attempts: 2, backoff: { type: 'fixed', delay: 5000 } };
  return new Queue(name, {
    ...QUEUE_DEFAULTS,
    defaultJobOptions: {
      ...QUEUE_DEFAULTS.defaultJobOptions,
      attempts: retryConfig.attempts,
      backoff: retryConfig.backoff,
      ...opts?.defaultJobOptions,
    },
    ...opts,
  });
}

export function createWorker<T = unknown>(
  name: string,
  handler: (job: { data: T; attemptsMade: number }) => Promise<void>,
  opts?: Partial<WorkerOptions>,
): Worker<T> {
  const workerConnection = createConnection();
  const WORKER_DEFAULTS: WorkerOptions = {
    connection: workerConnection,
    concurrency: 1,
  };
  return new Worker<T>(name, handler as (job: { data: T }) => Promise<void>, { ...WORKER_DEFAULTS, ...opts });
}
