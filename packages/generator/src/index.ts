import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';
import { generateTemplateReference } from './engine.js';
import type { TemplateBrief } from './prompt.js';

// Robustly locate and load root .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let envDir = __dirname;
while (envDir !== path.dirname(envDir)) {
  const candidate = path.join(envDir, '.env');
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate });
    break;
  }
  envDir = path.dirname(envDir);
}

const PRESET_ARCHETYPES: Record<string, TemplateBrief> = {
  '1': {
    name: 'The Tokyo Review',
    vibe: 'Minimalist Japanese architecture & spatial design. Washi paper canvas (#F5F2EB), sumi-e charcoal (#1A1918), cinnabar vermilion accent (#E85A3C), refined serif paired with clean geometric sans.',
    domain: 'Architecture, Industrial Design & Spatial Philosophy',
    inspiration: 'Muji monographs, Monocle Tokyo Bureau, Kenzo Tange spatial philosophy',
  },
  '2': {
    name: 'The Zurich Typographer',
    vibe: 'Swiss International Typographic Style. Stark white newsprint (#FFFFFF), absolute black ink (#0A0A0A), sharp crimson red (#E11D48), cool surface (#F8FAFC), rigorous asymmetric grid with registration crosshairs.',
    domain: 'Graphic Design, Product Engineering & Systems Thinking',
    inspiration: 'Josef Müller-Brockmann, Wim Crouwel, Neue Grafik magazine',
  },
  '3': {
    name: 'The Nordic Diplomat',
    vibe: 'Scandinavian diplomacy, sustainable infrastructure & macroeconomics. Cool fjord blue (#0284C7), oat-milk canvas (#FBF9F5), deep charcoal ink (#1E293B), structured editorial typography.',
    domain: 'Geopolitics, Macroeconomics & Renewable Energy',
    inspiration: 'Monocle Nordic reports, Danish design review, Copenhagen climate summits',
  },
  '4': {
    name: 'The Silicon Architect',
    vibe: 'Deep technology, AI compute infrastructure & systems architecture. Dark slate paper (#0B0F17), electric cobalt highlights (#38BDF8), crisp monospace telemetry badges, dense engineering placards.',
    domain: 'Artificial Intelligence, Distributed Systems & Compute Infrastructure',
    inspiration: 'MIT Technology Review, Bell Labs research monographs, Stripe Press',
  },
};

function parseArgs(): { brief: TemplateBrief | null; provider?: string; runAudit?: boolean; concurrency?: number } {
  const args = process.argv.slice(2);
  let name = '';
  let vibe = '';
  let domain = '';
  let inspiration = '';
  let url = '';
  let provider = '';
  let runAudit: boolean | undefined = undefined;
  let concurrency: number | undefined = undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--name' && args[i + 1]) name = args[++i]!;
    else if (arg === '--vibe' && args[i + 1]) vibe = args[++i]!;
    else if (arg === '--domain' && args[i + 1]) domain = args[++i]!;
    else if (arg === '--inspiration' && args[i + 1]) inspiration = args[++i]!;
    else if (arg === '--url' && args[i + 1]) url = args[++i]!;
    else if (arg === '--provider' && args[i + 1]) provider = args[++i]!;
    else if ((arg === '--concurrency' || arg === '-c') && args[i + 1]) concurrency = parseInt(args[++i]!, 10);
    else if (arg === '--audit') runAudit = true;
    else if (arg === '--no-audit') runAudit = false;
  }

  if (url) {
    return {
      brief: {
        url,
        name: name || undefined,
        vibe: vibe || undefined,
        domain: domain || undefined,
        inspiration: inspiration || undefined,
      },
      provider: provider || 'copilot',
      runAudit: runAudit ?? true, // Default to true for story generation
      concurrency,
    };
  }

  if (name && vibe) {
    return {
      brief: { name, vibe, domain: domain || undefined, inspiration: inspiration || undefined },
      provider: provider || undefined,
      runAudit,
      concurrency,
    };
  }

  return { brief: null, provider: provider || undefined, runAudit, concurrency };
}

async function promptUser(): Promise<TemplateBrief> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q: string): Promise<string> =>
    new Promise((resolve) => rl.question(q, (ans) => resolve(ans.trim())));

  console.log('\n======================================================');
  console.log('   Loopreel React Template Generator (@loopreel/generator)   ');
  console.log('======================================================\n');
  console.log('Select an option:\n');
  console.log('  [1] The Tokyo Review      — Japanese architecture, warm washi & sumi-e ink');
  console.log('  [2] The Zurich Typographer— Swiss international style, vermilion & grid');
  console.log('  [3] The Nordic Diplomat   — Scandinavian policy, fjord blue & sand');
  console.log('  [4] The Silicon Architect — Deep tech, cobalt blue & engineering placards');
  console.log('  [5] Custom Archetype      — Enter your own name, vibe, and domain');
  console.log('  [6] Story from Live URL   — Ingest Google News / TechCrunch / Verge URL\n');

  const choice = await question('Select [1-6] (default: 6): ');
  rl.close();

  const selectedKey = choice || '6';
  if (PRESET_ARCHETYPES[selectedKey]) {
    return PRESET_ARCHETYPES[selectedKey]!;
  }

  if (selectedKey === '6') {
    const rlUrl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const qUrl = (q: string): Promise<string> =>
      new Promise((resolve) => rlUrl.question(q, (ans) => resolve(ans.trim())));

    const inputUrl = await qUrl('Article or Google News URL: ');
    const optionalVibe = await qUrl('Optional Vibe / Aesthetic (press Enter for auto-inference): ');
    rlUrl.close();

    return {
      url: inputUrl,
      vibe: optionalVibe || undefined,
    };
  }

  const rlCustom = readline.createInterface({ input: process.stdin, output: process.stdout });
  const qCustom = (q: string): Promise<string> =>
    new Promise((resolve) => rlCustom.question(q, (ans) => resolve(ans.trim())));

  const customName = await qCustom('Template Name (e.g. "The Atlantic Dossier"): ');
  const customVibe = await qCustom('Visual Vibe & Palette (e.g. "Heritage navy, copper accents, classic serif"): ');
  const customDomain = await qCustom('Content Domain (e.g. "Maritime trade & geopolitics"): ');
  rlCustom.close();

  return {
    name: customName || 'The Custom Dossier',
    vibe: customVibe || 'Clean editorial broadsheet',
    domain: customDomain || 'General Editorial',
  };
}

async function main() {
  try {
    const { brief: cliBrief, provider, runAudit, concurrency } = parseArgs();
    const brief = cliBrief || (await promptUser());

    if (brief.url) {
      console.log(`\nStarting Story-Driven React Generation from URL: ${brief.url}...`);
      console.log('AI will autonomously infer:');
      console.log('  • Publication identity & brand tokens (palette, typography, textures)');
      console.log('  • Content domain & editorial angle');
      console.log('  • Scroll-stopping hook & 10-slide high-signal narrative');
      console.log('  • Bespoke vector SVGs & spatial layouts');
    } else {
      console.log(`\nStarting React template generation for: "${brief.name}"...`);
      if (brief.vibe) console.log(`Vibe:   ${brief.vibe}`);
      if (brief.domain) console.log(`Domain: ${brief.domain}`);
    }

    const startTime = Date.now();
    const result = await generateTemplateReference(brief, {
      provider,
      runAudit,
      url: brief.url,
      concurrency,
    });
    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n======================================================');
    console.log('   React Template Generated Successfully!             ');
    console.log('======================================================');
    console.log(`Story/Brand: ${result.brand.name} (${result.templateSlug})`);
    console.log(`Directory:   ${result.templateDir}`);
    console.log(`Slides:      ${result.slideCount} bespoke React + Tailwind components`);
    console.log(`Time:        ${elapsedSec}s`);

    if (result.audit) {
      console.log(`Audit:       Collisions: ${result.audit.totalCollisions} | Passed: ${result.audit.passed ? 'YES' : 'NO'}`);
      if (result.audit.errors.length > 0) {
        console.log(`Errors:      ${result.audit.errors.join('; ')}`);
      }
    }

    console.log('\nPreview in Interactive Studio:');
    console.log(`  http://localhost:5174/?template=${result.templateSlug}`);
    console.log('  (Make sure the studio dev server is running: pnpm --filter @loopreel/generator dev)\n');

    console.log('Convert to Loopreel Production Layout when approved:');
    console.log(`  pnpm --filter @loopreel/generator convert ${result.templateSlug}`);
    console.log('======================================================\n');
  } catch (err) {
    console.error('\n[Error] Failed to generate template:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

export { generateTemplateReference } from './engine.js';
export type { GenerationResult } from './engine.js';
export { runTemplatePipeline } from './pipeline.js';
export type { PipelineOptions, PipelineResult } from './pipeline.js';
export { auditTemplateStudio } from './visual-auditor.js';
export type { VisualAuditResult } from './visual-auditor.js';
export type { TemplateBrief } from './prompt.js';
export type { BrandTokens, DeckData, SlideData } from './skeleton/types.js';

// Run CLI main only when executed directly
const invokedFile = process.argv[1];
if (invokedFile && (invokedFile.endsWith('/generator/src/index.ts') || invokedFile.endsWith('\\generator\\src\\index.ts') || invokedFile.endsWith('src/index.ts'))) {
  main();
}
