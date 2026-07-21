import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';
import { VoidContractSchema } from '../schema';
import { exportCarouselToImages } from './exporter';
import { SCHEMES } from './engine-utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../output');

const mockValidResponse = {
  templateId: 'premium-social',
  schemeId: 'premium_social',
  slides: [
    {
      id: 'gen-cover-1', type: 'cover',
      tag: 'THE FUTURE OF AI', headline: 'Why AI Will Transform Everything',
      subheadline: 'From automation to augmentation — how machine learning is reshaping every industry.',
      metadata: 'VOL. 01 — INSIGHT', footerLeft: 'AI SERIES', footerRight: '01/05',
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
  templateId: 'void-editorial', schemeId: 'void_editorial',
  slides: [
    {
      id: 'bad-1', type: 'cover',
      tag: 'A'.repeat(100), headline: 'Test', subheadline: 'Test',
      metadata: 'Test', footerLeft: 'Test', footerRight: 'Test',
    },
  ],
};

function validateResponse(data: unknown) {
  const result = VoidContractSchema.safeParse(data);
  if (!result.success) {
    console.error('\n❌ Validation failed:');
    for (const issue of result.error.issues) {
      console.error(`  • ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }
  console.log(`  ✅ ${result.data.slides.length} slides valid`);
  return result.data;
}

async function startVite(basePort: number) {
  for (let port = basePort; port < basePort + 10; port++) {
    try {
      const server = await createServer({
        configFile: path.join(__dirname, '../vite.config.ts'),
        server: { port, strictPort: true },
      });
      await server.listen();
      return server;
    } catch {
      // port in use, try next
    }
  }
  throw new Error(`Could not find a free port (tried ${basePort}-${basePort + 9})`);
}

async function main() {
  console.log('=== LLM MOCK GENERATION DEMO ===\n');

  const TEMPLATE_MAP: Record<string, string> = {
    'void-editorial': 'void_editorial',
    'archive-paper': 'archive_paper',
    'industrial-brutal': 'industrial_brutal',
    'custom-brand': 'custom_brand',
    'modern-clean': 'custom_brand',
    'premium-social': 'premium_social',
  };

  const templateArg = process.argv.findIndex(a => a === '--template');
  const templateId = templateArg !== -1 && process.argv[templateArg + 1]
    ? process.argv[templateArg + 1] : 'premium-social';
  const schemeId = TEMPLATE_MAP[templateId];

  if (!schemeId || !SCHEMES[schemeId as keyof typeof SCHEMES]) {
    console.error(`❌ Unknown template: "${templateId}"`);
    console.error(`   Available: ${Object.keys(TEMPLATE_MAP).join(', ')}`);
    process.exit(1);
  }

  const useValid = !process.argv.includes('--bad');
  const mock = useValid ? JSON.parse(JSON.stringify(mockValidResponse)) : mockInvalidResponse;
  mock.templateId = templateId;
  mock.schemeId = schemeId;
  console.log(`Using ${useValid ? 'VALID' : 'INVALID (expect failure)'} mock\n`);
  console.log(`  Template: ${mock.templateId}`);
  console.log(`  Scheme:   ${mock.schemeId} (${SCHEMES[mock.schemeId as keyof typeof SCHEMES].name})\n`);

  console.log('Validating against Zod schema...');
  const contract = validateResponse(mock);

  console.log('\nStarting Vite dev server...');
  const viteServer = await startVite(5173);
  const baseUrl = viteServer.resolvedUrls.local[0].replace(/\/$/, '');
  console.log(`Vite server running at ${baseUrl}\n`);

  try {
    const outputSubdir = `generated-${Date.now()}`;
    console.log('Exporting slides to PNG...');
    const exported = await exportCarouselToImages(contract, mock.schemeId, outputSubdir, {
      baseUrl, outputDir: OUTPUT_DIR, templateId: mock.templateId,
    });
    console.log(`\n✅ Success! ${exported.length} PNGs exported to:`);
    console.log(`   ${path.join(OUTPUT_DIR, outputSubdir)}`);
  } finally {
    await viteServer.close();
  }
}

main().catch((err) => {
  console.error('\n❌ Generation failed:', err.message);
  process.exit(1);
});
