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

function resolveLoopDistDir(): string {
  if (process.env['LOOP_DIST_DIR'] && fs.existsSync(process.env['LOOP_DIST_DIR'])) {
    return process.env['LOOP_DIST_DIR'];
  }

  const candidates = [
    path.resolve(process.cwd(), '../../packages/loop/dist'),
    path.resolve(process.cwd(), 'packages/loop/dist'),
    path.resolve(import.meta.dirname ?? '.', '../../../packages/loop/dist'),
    path.resolve(import.meta.dirname ?? '.', '../../../../packages/loop/dist'),
    '/app/packages/loop/dist',
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir) && fs.existsSync(path.join(dir, 'index.html'))) {
      return dir;
    }
  }

  return candidates[0]!;
}

function createDistServer(distDir: string, label: string) {
  if (!fs.existsSync(distDir) || !fs.existsSync(path.join(distDir, 'index.html'))) {
    logger.warn({ distDir, label }, `${label} static dist not found, render may fail`);
  }

  return http.createServer((req, res) => {
    const parsedUrl = new URL(req.url ?? '/', 'http://localhost');
    const pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
    let filePath = path.join(distDir, pathname);

    if (!fs.existsSync(filePath) && !path.extname(pathname)) {
      filePath = path.join(distDir, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' });
      res.end(data);
    });
  });
}

export function startStaticServer(port: number): void {
  const classicDistDir = resolveLoopDistDir();

  createDistServer(classicDistDir, 'Classic Loop').listen(port, () => {
    logger.info({ port, distDir: classicDistDir }, 'Static render server (Classic Loop) started');
  });
}
