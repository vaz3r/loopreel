import path from 'path';
import { exportCarouselToImages } from './exporter';
import { startViteServer } from './vite-server';
import { getAllDecks } from './layouts/registry';
import { PLATFORMS, type PlatformId } from './platforms';
import { paginateContract } from './engine-utils';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.join(__dirname, '../output');

function parseArgs(): { platform: PlatformId } {
  const args = process.argv.slice(2);
  let platform: PlatformId = 'instagram-feed';
  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--platform' && args[i + 1]) {
      const val = args[i + 1] as PlatformId;
      if (PLATFORMS[val]) platform = val;
      i++;
    }
  }
  return { platform };
}

function validateContract(contract: unknown, name: string, schema: unknown): void {
  const result = (schema as { safeParse: (d: unknown) => { success: boolean; error?: { issues: Array<{ path: { join: (s: string) => string }; message: string }> } } }).safeParse(contract);
  if (!result.success) {
    const errors = result.error!.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Validation failed for "${name}":\n${errors}`);
  }
}

async function main() {
  const { platform } = parseArgs();
  const platformDef = PLATFORMS[platform];

  console.log('=== LOOP ENGINE PIPELINE ===');
  console.log(`Platform: ${platformDef.label} (${platformDef.width}x${platformDef.height})\n`);

  const decks = getAllDecks();
  console.log(`Found ${decks.length} decks: ${decks.map(d => d.name).join(', ')}\n`);

  if (decks.length === 0) {
    console.error('No decks found. Exiting.');
    process.exit(1);
  }

  console.log('Validating slide contracts...');
  for (const deck of decks) {
    validateContract(deck.sampleSlides, deck.name, deck.schema);
    console.log(`  ${deck.name}: ${deck.sampleSlides.slides.length} slides - VALID`);
  }
  console.log('');

  console.log('Starting Vite dev server...');
  const { server: viteServer, baseUrl } = await startViteServer(5173);
  console.log(`Vite server running at ${baseUrl}\n`);

  try {
    console.log('Exporting slides to PNG...');
    let totalExports = 0;

    for (const deck of decks) {
      console.log(`\n[${deck.name}] (${deck.sampleSlides.slides.length} slides)`);

      const paginated = paginateContract(deck.sampleSlides);
      console.log(`  After pagination: ${paginated.slides.length} slides`);

      const exportedPaths = await exportCarouselToImages(
        paginated,
        deck.schemeId,
        deck.id,
        { baseUrl, outputDir: OUTPUT_DIR, templateId: deck.templateId, width: platformDef.width, height: platformDef.height }
      );

      totalExports += exportedPaths.length;
    }

    console.log('\n=== PIPELINE COMPLETE ===');
    console.log(`Total decks: ${decks.length}`);
    console.log(`Total PNGs exported: ${totalExports}`);
    console.log(`Output directory: ${OUTPUT_DIR}`);
  } finally {
    await viteServer.close();
  }
}

main().catch(err => {
  console.error('Pipeline failed:', err.message);
  process.exit(1);
});
