import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import pino from 'pino';

const logger = pino({
  level: process.env['LOG_LEVEL'] ?? 'info',
  formatters: { level: (label) => ({ level: label.toUpperCase() }) },
});

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

export function startStaticServer(port: number): void {
  const distDir = path.resolve(process.cwd(), 'packages/loop/dist');

  if (!fs.existsSync(distDir)) {
    logger.warn({ distDir }, 'Loop static dist not found, render will fail');
  }

  http.createServer((req, res) => {
    const url = req.url === '/' ? '/index.html' : req.url!;
    const filePath = path.join(distDir, url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
      res.end(data);
    });
  }).listen(port, () => {
    logger.info({ port, distDir }, 'Static render server started');
  });
}
