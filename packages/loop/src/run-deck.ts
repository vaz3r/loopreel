import fs from 'fs';
import path from 'path';
import { TheTerminalContract } from './layouts/the-terminal/schema';
import { exportCarouselToImages } from './exporter';
import { startViteServer } from './vite-server';
import { PLATFORMS, type PlatformId } from './platforms';
import { paginateContract } from './engine-utils';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function main() {
  const jsonPath = process.argv[2];
  const platformArg = process.argv.findIndex(a => a === '--platform');
  const platformId: PlatformId = platformArg !== -1 && process.argv[platformArg + 1] && PLATFORMS[process.argv[platformArg + 1] as PlatformId] ? process.argv[platformArg + 1] as PlatformId : 'instagram-feed';
  const platformDef = PLATFORMS[platformId];

  if (!jsonPath) { console.error('Usage: tsx run-deck.ts <path-to-json> [--platform <id>]'); process.exit(1); }

  const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  const result = TheTerminalContract.safeParse(raw);
  if (!result.success) {
    console.error('Validation failed:');
    for (const issue of result.error.issues) console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    process.exit(1);
  }

  const deckName = path.basename(jsonPath, '.json');
  console.log(`=== RUN DECK: ${deckName} ===`);
  console.log(`Platform: ${platformDef.label} (${platformDef.width}x${platformDef.height})`);
  console.log(`Slides: ${result.data.slides.length} - VALID`);

  const paginated = paginateContract(result.data);
  console.log(`After pagination: ${paginated.slides.length} slides\n`);

  const { server: viteServer, baseUrl } = await startViteServer(5173);
  try {
    const outputDir = path.join(__dirname, 'output');
    const exported = await exportCarouselToImages(paginated, 'terminal_dark', deckName, {
      baseUrl, outputDir, templateId: 'the-terminal', width: platformDef.width, height: platformDef.height,
    });
    console.log(`\nDone! ${exported.length} PNGs → ${path.join(outputDir, deckName)}`);
  } finally {
    await viteServer.close();
  }
}

main().catch(err => { console.error('Failed:', err.message); process.exit(1); });
