import { createServer } from 'node:http';

const METRICS_PORT = Number(process.env['METRICS_PORT'] ?? '8004');

export function startMetricsServer(getPoolMetrics: () => { poolSize: number; inUse: number; waiting: number; totalUses: number }): void {
  const server = createServer((req, res) => {
    if (req.url === '/metrics' && req.method === 'GET') {
      const metrics = getPoolMetrics();
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
