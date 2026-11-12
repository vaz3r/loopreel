import type { FastifyPluginAsync } from 'fastify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface TemplateSummary {
  slug: string;
  name: string;
  domain?: string;
  platform: string;
  slideCount: number;
  hasAudit?: boolean;
  createdAt?: string;
}

export const templatesRoute: FastifyPluginAsync = async (app) => {
  app.get('/api/templates', async (_request, reply) => {
    // Locate packages/generator/templates relative to apps/api/src/routes
    const templatesDir = path.resolve(__dirname, '../../../../packages/generator/templates');
    if (!fs.existsSync(templatesDir)) {
      return reply.send({ templates: [] });
    }

    const slugs = fs.readdirSync(templatesDir).filter((f) => {
      const p = path.join(templatesDir, f);
      return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'brand.json'));
    });

    const templates: TemplateSummary[] = [];

    for (const slug of slugs) {
      const p = path.join(templatesDir, slug);
      let brand: any = {};
      let deck: any = {};
      let ctime: string | undefined;

      try {
        const stat = fs.statSync(path.join(p, 'brand.json'));
        ctime = stat.mtime.toISOString();
        brand = JSON.parse(fs.readFileSync(path.join(p, 'brand.json'), 'utf-8'));
      } catch {}

      try {
        deck = JSON.parse(fs.readFileSync(path.join(p, 'deck.json'), 'utf-8'));
      } catch {}

      templates.push({
        slug,
        name: brand.name || slug,
        domain: brand.domain,
        platform: deck.platform || brand.platform || 'instagram-feed',
        slideCount: deck.slides?.length || 0,
        hasAudit: fs.existsSync(path.join(p, 'audit.json')),
        createdAt: ctime,
      });
    }

    // Sort newest first
    templates.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return 0;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return reply.send({ templates });
  });
};
