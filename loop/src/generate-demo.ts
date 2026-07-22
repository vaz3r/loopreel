import path from 'path';
import { PaperOfRecordContract } from './layouts/paper-of-record/schema';
import { exportCarouselToImages } from './exporter';
import { SCHEMES } from './engine-utils';
import { startViteServer } from './vite-server';
import { PLATFORMS, type PlatformId } from './platforms';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const OUTPUT_DIR = path.join(__dirname, '../output');

const mockValidResponse = {
  templateId: 'paper-of-record',
  schemeId: 'archive_paper',
  slides: [
    {
      id: 'gen-cover-1', type: 'cover',
      tag: 'THE FUTURE OF AI', headline: 'Why AI Will Transform Everything',
      subheadline: 'From automation to augmentation — how machine learning is reshaping every industry.',
      footerLeft: 'AI SERIES', footerRight: '01/05',
    },
    {
      id: 'gen-def-1', type: 'definition',
      tag: 'TERM // 01', term: 'Artificial General Intelligence',
      phonetic: '/ˌɑːrtɪˈfɪʃl ˈdʒɛnərəl ɪnˌtɛlɪˈdʒɛns/',
      definition: 'A hypothetical AI system that can understand, learn, and apply knowledge across a wide range of tasks at a level equal to or beyond human capability.',
      example: 'e.g., An AGI could write a novel, solve climate change, and compose a symphony simultaneously.',
      footerLeft: 'GLOSSARY', footerRight: '02/05',
    },
    {
      id: 'gen-dichotomy-1', type: 'dichotomy',
      tag: 'STRATEGIC POLARITY', headline: 'Narrow AI vs. General AI',
      left: { title: 'Narrow AI', desc: 'Excels at a single task. Powerful but limited in scope.' },
      right: { title: 'General AI', desc: 'Handles any intellectual task a human can. Still theoretical.' },
      footerLeft: 'COMPARISON', footerRight: '03/05',
    },
    {
      id: 'gen-timeline-1', type: 'timeline',
      tag: 'EVOLUTION', headline: 'The AI Timeline',
      events: [
        { date: '2012', title: 'Deep Learning Breakthrough', desc: 'AlexNet wins ImageNet.' },
        { date: '2017', title: 'Transformers Arrive', desc: 'The "Attention Is All You Need" paper changes everything.' },
        { date: '2020', title: 'GPT-3', desc: 'LLMs reach general-purpose usefulness.' },
        { date: '2024', title: 'Multimodal AI', desc: 'Models that see, hear, read, and generate.' },
      ],
      footerLeft: 'HISTORY', footerRight: '04/05',
    },
    {
      id: 'gen-cta-1', type: 'cta',
      tag: 'FINALE', headline: 'The Future Is Being Written.',
      subtext: 'The only way to predict the future is to create it.',
      actionLabel: 'FOLLOW THE JOURNEY', socialHandle: '@builtwithai',
      footerLeft: 'END', footerRight: '05/05',
    },
  ],
};

const mockInvalidResponse = {
  templateId: 'paper-of-record', schemeId: 'archive_paper',
  slides: [
    {
      id: 'bad-1', type: 'cover',
      tag: 'A'.repeat(100), headline: 'Test',
    },
  ],
};

function validateResponse(data: unknown) {
  const result = PaperOfRecordContract.safeParse(data);
  if (!result.success) {
    console.error('\nValidation failed:');
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }
  console.log(`  ${result.data.slides.length} slides valid`);
  return result.data;
}

async function main() {
  console.log('=== LLM MOCK GENERATION DEMO ===\n');

  const platformArg = process.argv.findIndex(a => a === '--platform');
  const platformId: PlatformId = platformArg !== -1 && process.argv[platformArg + 1]
    && PLATFORMS[process.argv[platformArg + 1] as PlatformId]
    ? process.argv[platformArg + 1] as PlatformId : 'instagram-feed';
  const platformDef = PLATFORMS[platformId];

  const useValid = !process.argv.includes('--bad');
  const mock = useValid ? JSON.parse(JSON.stringify(mockValidResponse)) : mockInvalidResponse;
  console.log(`Using ${useValid ? 'VALID' : 'INVALID (expect failure)'} mock\n`);
  console.log(`  Template: ${mock.templateId}`);
  console.log(`  Scheme:   ${mock.schemeId} (${SCHEMES[mock.schemeId as keyof typeof SCHEMES].name})`);
  console.log(`  Platform: ${platformDef.label} (${platformDef.width}x${platformDef.height})\n`);

  console.log('Validating against Zod schema...');
  const contract = validateResponse(mock);

  console.log('\nStarting Vite dev server...');
  const { server: viteServer, baseUrl } = await startViteServer(5173);
  console.log(`Vite server running at ${baseUrl}\n`);

  try {
    const outputSubdir = `generated-${Date.now()}`;
    console.log('Exporting slides to PNG...');
    const exported = await exportCarouselToImages(contract, mock.schemeId, outputSubdir, {
      baseUrl, outputDir: OUTPUT_DIR, templateId: mock.templateId,
      width: platformDef.width, height: platformDef.height,
    });
    console.log(`\nSuccess! ${exported.length} PNGs exported to:`);
    console.log(`   ${path.join(OUTPUT_DIR, outputSubdir)}`);
  } finally {
    await viteServer.close();
  }
}

main().catch((err) => {
  console.error('\nGeneration failed:', err.message);
  process.exit(1);
});
