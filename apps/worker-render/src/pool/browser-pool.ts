import { chromium, type Browser, type Page } from 'playwright';
import pino from 'pino';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
});

const POOL_SIZE = Number(process.env['PLAYWRIGHT_POOL_SIZE'] ?? '5');
const MAX_USES_PER_PAGE = 100;

interface PooledPage {
  page: Page;
  uses: number;
  index: number;
  inUse: boolean;
}

export class BrowserPool {
  private browser: Browser | null = null;
  private pages: PooledPage[] = [];
  private waitingQueue: Array<{
    resolve: (page: PooledPage) => void;
    reject: (err: Error) => void;
    timeout: ReturnType<typeof setTimeout>;
  }> = [];
  private maxWaiters = 20;

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (let i = 0; i < POOL_SIZE; i++) {
      const page = await this.browser.newPage();
      this.pages.push({ page, uses: 0, index: i, inUse: false });
    }

    logger.info({ poolSize: POOL_SIZE }, 'Browser pool initialized');
  }

  async acquire(): Promise<Page> {
    const available = this.pages.find((p) => !p.inUse);
    if (available) {
      available.inUse = true;
      available.uses++;
      if (available.uses >= MAX_USES_PER_PAGE) {
        void this.replacePage(available.index);
      }
      return available.page;
    }

    if (this.waitingQueue.length >= this.maxWaiters) {
      throw new Error('Browser pool exhausted: too many waiters');
    }

    return new Promise<Page>((resolve, reject) => {
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          const idx = this.waitingQueue.findIndex((w) => w.resolve === waiterResolve);
          if (idx !== -1) this.waitingQueue.splice(idx, 1);
          reject(new Error('Browser pool: acquisition timeout'));
        }
      }, 30_000);

      const waiterResolve = (pooled: PooledPage): void => {
        resolved = true;
        clearTimeout(timeout);
        pooled.inUse = true;
        pooled.uses++;
        if (pooled.uses >= MAX_USES_PER_PAGE) {
          void this.replacePage(pooled.index);
        }
        resolve(pooled.page);
      };

      this.waitingQueue.push({
        resolve: waiterResolve,
        reject: (err) => {
          resolved = true;
          clearTimeout(timeout);
          reject(err);
        },
        timeout,
      });
    });
  }

  release(page: Page): void {
    const pooled = this.pages.find((p) => p.page === page);
    if (pooled) {
      pooled.inUse = false;
    }

    const waiter = this.waitingQueue.shift();
    if (waiter) {
      const next = this.pages.find((p) => !p.inUse);
      if (next) {
        waiter.resolve(next);
      }
    }
  }

  private async replacePage(index: number): Promise<void> {
    if (!this.browser) return;
    const old = this.pages[index];
    if (!old) return;

    await old.page.close().catch(() => {});
    const newPage = await this.browser.newPage();
    this.pages[index] = { page: newPage, uses: 0, index, inUse: false };
    logger.debug({ index }, 'Page replaced');
  }

  getMetrics(): { poolSize: number; inUse: number; waiting: number; totalUses: number } {
    return {
      poolSize: this.pages.length,
      inUse: this.pages.filter((p) => p.inUse).length,
      waiting: this.waitingQueue.length,
      totalUses: this.pages.reduce((sum, p) => sum + p.uses, 0),
    };
  }

  async close(): Promise<void> {
    for (const waiter of this.waitingQueue) {
      waiter.reject(new Error('Browser pool closing'));
    }
    this.waitingQueue = [];

    for (const pooled of this.pages) {
      await pooled.page.close().catch(() => {});
    }
    if (this.browser) {
      await this.browser.close();
    }
    logger.info('Browser pool closed');
  }
}

let pool: BrowserPool | null = null;

export async function getPool(): Promise<BrowserPool> {
  if (!pool) {
    pool = new BrowserPool();
    try {
      await pool.init();
    } catch (err) {
      pool = null;
      throw err;
    }
  }
  return pool;
}
