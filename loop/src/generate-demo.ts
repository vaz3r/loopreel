import path from 'path';
import { PaperOfRecordContract } from './layouts/paper-of-record/schema';
import { TheGlobalistContract } from './layouts/the-globalist/schema';
import { TheTerminalContract } from './layouts/the-terminal/schema';
import { exportCarouselToImages } from './exporter';
import { SCHEMES } from './engine-utils';
import { startViteServer } from './vite-server';
import { PLATFORMS, type PlatformId } from './platforms';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.join(__dirname, '../output');

const MOCKS: Record<string, { templateId: string; schemeId: string; contract: any; data: any }> = {
  'paper-of-record': {
    templateId: 'paper-of-record', schemeId: 'archive_paper', contract: PaperOfRecordContract,
    data: {
      slides: [
        { id: 'gen-cover-1', type: 'cover', tag: 'THE FUTURE OF AI', headline: 'Why AI Will Transform Everything', subheadline: 'From automation to augmentation.', footerLeft: 'AI SERIES', footerRight: '01/05' },
        { id: 'gen-cta-1', type: 'cta', tag: 'FINALE', headline: 'The Future Is Being Written.', subtext: 'The only way to predict the future is to create it.', actionLabel: 'FOLLOW', footerLeft: 'END', footerRight: '02/05' },
      ],
    },
  },
  'the-globalist': {
    templateId: 'the-globalist', schemeId: 'globalist_editorial', contract: TheGlobalistContract,
    data: {
      slides: [
        { id: 'gen-cover-1', type: 'cover', tag: 'SPECIAL REPORT', headline: 'The End of Cheap Capital.', subheadline: 'How the sudden shift is forcing conglomerates to restructure.', authorName: 'Julian Sterling', authorRole: 'Reporting from Frankfurt', footerLeft: 'MACRO-ECONOMICS', footerRight: 'PAGE 01' },
        { id: 'gen-telem-1', type: 'telemetry', tag: 'Q3 DATA SET', headline: 'Global Telemetry', stats: [{ value: '5.25', unit: '%', label: 'Baseline interest rate.' }, { value: '1.4', unit: 'T', label: 'Corporate debt maturing.' }], footerLeft: 'TELEMETRY', footerRight: 'PAGE 02' },
        { id: 'gen-cta-1', type: 'cta', tag: 'INTELLIGENCE', headline: 'Master the Global Economy.', subtext: 'Analysis delivered weekly.', actionLabel: 'Subscribe Now', footerLeft: 'SUBSCRIPTION', footerRight: 'PAGE 03' },
      ],
    },
  },
  'the-terminal': {
    templateId: 'the-terminal', schemeId: 'terminal_dark', contract: TheTerminalContract,
    data: {
      slides: [
        { id: 'gen-cover-1', type: 'cover', tag: 'MARKET_DATA', reportId: '994-A', headline: 'The Liquidity Vacuum.', subheadline: 'Quantitative tightening analysis.', authorName: 'J. Stevens', authorRole: 'Macro Strategy', footerLeft: 'MARKET_DATA', footerRight: 'PAGE 01' },
        { id: 'gen-telem-1', type: 'telemetry', tag: 'DATA_SET', headline: 'Real-Time Telemetry', stats: [{ value: '4.8', unit: '%', label: 'U.S. Core CPI.', color: 'green' }, { value: '124', unit: '', label: 'Corp Defaults.', color: 'red' }], footerLeft: 'TELEMETRY', footerRight: 'PAGE 02' },
        { id: 'gen-cta-1', type: 'cta', tag: 'AUTH_REQ', headline: 'Terminal Access Granted.', subtext: 'Macro-economic data feeds.', actionLabel: '> INITIALIZE_SUB', footerLeft: 'SUBSCRIPTION', footerRight: 'PAGE 03' },
      ],
    },
  },
};

async function main() {
  console.log('=== LLM MOCK GENERATION DEMO ===\n');

  const templateArg = process.argv.findIndex(a => a === '--template');
  const templateId = templateArg !== -1 && process.argv[templateArg + 1] ? process.argv[templateArg + 1] : 'paper-of-record';
  const mock = MOCKS[templateId];
  if (!mock) { console.error(`Unknown template: "${templateId}". Available: ${Object.keys(MOCKS).join(', ')}`); process.exit(1); }

  const platformArg = process.argv.findIndex(a => a === '--platform');
  const platformId: PlatformId = platformArg !== -1 && process.argv[platformArg + 1] && PLATFORMS[process.argv[platformArg + 1] as PlatformId] ? process.argv[platformArg + 1] as PlatformId : 'instagram-feed';
  const platformDef = PLATFORMS[platformId];

  console.log(`  Template: ${mock.templateId}`);
  console.log(`  Scheme:   ${mock.schemeId} (${SCHEMES[mock.schemeId as keyof typeof SCHEMES].name})`);
  console.log(`  Platform: ${platformDef.label} (${platformDef.width}x${platformDef.height})\n`);

  console.log('Validating...');
  const result = mock.contract.safeParse(mock.data);
  if (!result.success) { console.error('Validation failed:'); for (const issue of result.error.issues) console.error(`  - ${issue.path.join('.')}: ${issue.message}`); process.exit(1); }
  console.log(`  ${result.data.slides.length} slides valid\n`);

  console.log('Starting Vite...');
  const { server: viteServer, baseUrl } = await startViteServer(5173);
  try {
    const outputSubdir = `generated-${Date.now()}`;
    const exported = await exportCarouselToImages(result.data, mock.schemeId, outputSubdir, { baseUrl, outputDir: OUTPUT_DIR, templateId: mock.templateId, width: platformDef.width, height: platformDef.height });
    console.log(`\nSuccess! ${exported.length} PNGs exported to ${path.join(OUTPUT_DIR, outputSubdir)}`);
  } finally { await viteServer.close(); }
}

main().catch((err) => { console.error('\nFailed:', err.message); process.exit(1); });
