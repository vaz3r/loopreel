import type { BrowserPool } from './pool/browser-pool.js';
import { createServer } from 'node:http';

const METRICS_PORT = Number(process.env['METRICS_PORT'] ?? '8004');

export function startMetricsServer(pool: BrowserPool): void {
  const server = createServer((req, res) => {
    if (req.url === '/metrics' && req.method === 'GET') {
      const metrics = pool.getMetrics();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(metrics));
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(METRICS_PORT, () => {
    console.log(`Metrics sidecar listening on port ${METRICS_PORT}`);
  });
}
