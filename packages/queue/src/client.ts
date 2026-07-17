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
  handler: (job: { data: T }) => Promise<void>,
  opts?: Partial<WorkerOptions>,
): Worker<T> {
  return new Worker<T>(name, handler as (job: { data: T }) => Promise<void>, { ...WORKER_DEFAULTS, ...opts });
}
