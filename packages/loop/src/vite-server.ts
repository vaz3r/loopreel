import path from 'path';
import { fileURLToPath } from 'url';
import { createServer, type ViteDevServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function startViteServer(basePort = 5173): Promise<{ server: ViteDevServer; baseUrl: string }> {
  const rootDir = path.join(__dirname, '..');
  for (let port = basePort; port < basePort + 10; port++) {
    try {
      const server = await createServer({
        root: rootDir,
        configFile: path.join(rootDir, 'vite.config.ts'),
        server: { port, strictPort: true },
      });
      await server.listen();
      return { server, baseUrl: server.resolvedUrls.local[0].replace(/\/$/, '') };
    } catch {
      // port in use, try next
    }
  }
  throw new Error(`No available port in range ${basePort}-${basePort + 9}`);
}
