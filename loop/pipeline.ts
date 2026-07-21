import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { VoidContractSchema, type VoidContract } from './schema';
import { exportCarouselToImages } from './exporter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DECKS_DIR = path.join(__dirname, 'decks');
const OUTPUT_DIR = path.join(__dirname, 'output');

interface DeckManifest {
  templateId: string;
  schemeId: string;
  name: string;
  description: string;
  brandKit?: {
    bg: string;
    text: string;
    accent: string;
    fontSerif: string;
    fontSans: string;
    logoUrl: string;
  };
}

interface DeckData {
  folderName: string;
  manifest: DeckManifest;
  contract: VoidContract;
}

async function discoverDecks(): Promise<DeckData[]> {
  const decks: DeckData[] = [];
  const entries = fs.readdirSync(DECKS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const deckDir = path.join(DECKS_DIR, entry.name);
    const manifestPath = path.join(deckDir, 'manifest.json');
    const slidesPath = path.join(deckDir, 'slides.ts');

    if (!fs.existsSync(manifestPath) || !fs.existsSync(slidesPath)) {
      console.warn(`Skipping ${entry.name}: missing manifest.json or slides.ts`);
      continue;
    }

    const manifest: DeckManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    const slidesModule = await import(path.join(deckDir, 'slides.ts'));
    const contract: VoidContract = slidesModule.default;

    decks.push({
      folderName: entry.name,
      manifest,
      contract,
    });
  }

  return decks;
}

function validateContract(contract: VoidContract, deckName: string): void {
  const result = VoidContractSchema.safeParse(contract);
  if (!result.success) {
    const errors = result.error.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Validation failed for deck "${deckName}":\n${errors}`);
  }
}

async function main() {
  console.log('=== LOOP ENGINE PIPELINE ===\n');

  // 1. Discover decks
  console.log('Discovering decks...');
  const decks = await discoverDecks();
  console.log(`Found ${decks.length} decks: ${decks.map(d => d.manifest.name).join(', ')}\n`);

  if (decks.length === 0) {
    console.error('No decks found. Exiting.');
    process.exit(1);
  }

  // 2. Validate all contracts
  console.log('Validating slide contracts...');
  for (const deck of decks) {
    validateContract(deck.contract, deck.folderName);
    console.log(`  ${deck.manifest.name}: ${deck.contract.slides.length} slides - VALID`);
  }
  console.log('');

  // 3. Start Vite dev server
  console.log('Starting Vite dev server...');
  const viteServer = await createServer({
    configFile: path.join(__dirname, 'vite.config.ts'),
    server: { port: 5173, strictPort: true },
  });
  await viteServer.listen();
  const baseUrl = viteServer.resolvedUrls.local[0].replace(/\/$/, '');
  console.log(`Vite server running at ${baseUrl}\n`);

  try {
    // 4. Export each deck
    console.log('Exporting slides to PNG...');
    let totalExports = 0;

    for (const deck of decks) {
      console.log(`\n[${deck.manifest.name}] (${deck.contract.slides.length} slides)`);

      const exportedPaths = await exportCarouselToImages(
        deck.contract,
        deck.manifest.schemeId,
        deck.folderName,
        { baseUrl, outputDir: OUTPUT_DIR, templateId: deck.manifest.templateId }
      );

      totalExports += exportedPaths.length;
    }

    // 5. Summary
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
