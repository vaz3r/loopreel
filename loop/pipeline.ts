import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { VoidContractSchema, type VoidContract } from './schema';
import { exportCarouselToImages } from './exporter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THEMES_DIR = path.join(__dirname, 'themes');
const OUTPUT_DIR = path.join(__dirname, 'output');

interface ThemeManifest {
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

interface ThemeData {
  folderName: string;
  manifest: ThemeManifest;
  contract: VoidContract;
}

async function discoverThemes(): Promise<ThemeData[]> {
  const themes: ThemeData[] = [];
  const entries = fs.readdirSync(THEMES_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const themeDir = path.join(THEMES_DIR, entry.name);
    const manifestPath = path.join(themeDir, 'manifest.json');
    const slidesPath = path.join(themeDir, 'slides.ts');

    if (!fs.existsSync(manifestPath) || !fs.existsSync(slidesPath)) {
      console.warn(`Skipping ${entry.name}: missing manifest.json or slides.ts`);
      continue;
    }

    const manifest: ThemeManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    // Import the slides module dynamically
    const slidesModule = await import(path.join(themeDir, 'slides.ts'));
    const contract: VoidContract = slidesModule.default;

    themes.push({
      folderName: entry.name,
      manifest,
      contract,
    });
  }

  return themes;
}

function validateContract(contract: VoidContract, themeName: string): void {
  const result = VoidContractSchema.safeParse(contract);
  if (!result.success) {
    const errors = result.error.issues.map(i => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Validation failed for theme "${themeName}":\n${errors}`);
  }
}

async function main() {
  console.log('=== LOOP ENGINE PIPELINE ===\n');

  // 1. Discover themes
  console.log('Discovering themes...');
  const themes = await discoverThemes();
  console.log(`Found ${themes.length} themes: ${themes.map(t => t.manifest.name).join(', ')}\n`);

  if (themes.length === 0) {
    console.error('No themes found. Exiting.');
    process.exit(1);
  }

  // 2. Validate all contracts
  console.log('Validating slide contracts...');
  for (const theme of themes) {
    validateContract(theme.contract, theme.folderName);
    console.log(`  ${theme.manifest.name}: ${theme.contract.slides.length} slides - VALID`);
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
    // 4. Export each theme
    console.log('Exporting slides to PNG...');
    let totalExports = 0;

    for (const theme of themes) {
      console.log(`\n[${theme.manifest.name}] (${theme.contract.slides.length} slides)`);

      const exportedPaths = await exportCarouselToImages(
        theme.contract,
        theme.manifest.schemeId,
        theme.folderName,
        { baseUrl, outputDir: OUTPUT_DIR }
      );

      totalExports += exportedPaths.length;
    }

    // 5. Summary
    console.log('\n=== PIPELINE COMPLETE ===');
    console.log(`Total themes: ${themes.length}`);
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
