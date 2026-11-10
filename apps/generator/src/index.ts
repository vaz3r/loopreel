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
    vibe: 'Minimalist Japanese architecture & industrial design. Warm washi paper canvas, warm stone grey panels, deep sumi-e black ink, refined serif headlines paired with subtle geometric sans.',
    domain: 'Architecture, Industrial Design & Spatial Philosophy',
    inspiration: 'Muji monographs, Monocle Tokyo Bureau, Kenzo Tange design philosophy',
  },
  '2': {
    name: 'The Zurich Typographer',
    vibe: 'Swiss International Typographic Style. Stark white newsprint, absolute black ink, sharp vermilion red accents, rigorous asymmetric grid, high-contrast grotesque typography.',
    domain: 'Graphic Design, Product Engineering & Systems Thinking',
    inspiration: 'Josef Müller-Brockmann, Wim Crouwel, Neue Grafik magazine',
  },
  '3': {
    name: 'The Nordic Diplomat',
    vibe: 'Scandinavian diplomacy, sustainable infrastructure & macroeconomics. Cool fjord blue accents, warm oat-milk paper background, deep charcoal ink, structured editorial typography.',
    domain: 'Geopolitics, Macroeconomics & Renewable Energy',
    inspiration: 'Monocle Nordic reports, Danish design review, Copenhagen climate summits',
  },
  '4': {
    name: 'The Silicon Architect',
    vibe: 'Deep technology, AI compute infrastructure & systems architecture. Muted dark-slate paper, electric cobalt blue highlights, crisp monospace telemetry badges, dense engineering placards.',
    domain: 'Artificial Intelligence, Distributed Systems & Compute Infrastructure',
    inspiration: 'MIT Technology Review, Bell Labs research monographs, Stripe Press',
  },
};

function parseArgs(): { brief: TemplateBrief | null; provider?: string } {
  const args = process.argv.slice(2);
  let name = '';
  let vibe = '';
  let domain = '';
  let inspiration = '';
  let provider = '';

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--name' && args[i + 1]) name = args[++i]!;
    else if (arg === '--vibe' && args[i + 1]) vibe = args[++i]!;
    else if (arg === '--domain' && args[i + 1]) domain = args[++i]!;
    else if (arg === '--inspiration' && args[i + 1]) inspiration = args[++i]!;
    else if (arg === '--provider' && args[i + 1]) provider = args[++i]!;
  }

  if (name && vibe) {
    return {
      brief: { name, vibe, domain: domain || undefined, inspiration: inspiration || undefined },
      provider: provider || undefined,
    };
  }

  return { brief: null, provider: provider || undefined };
}

async function promptUser(): Promise<TemplateBrief> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (q: string): Promise<string> =>
    new Promise((resolve) => rl.question(q, (ans) => resolve(ans.trim())));

  console.log('\n======================================================');
  console.log('   Loopreel Template Generator (@loopreel/generator)   ');
  console.log('======================================================\n');
  console.log('Select a pre-engineered archetype, or enter custom details:\n');
  console.log('  [1] The Tokyo Review      — Japanese architecture, warm washi & sumi-e ink');
  console.log('  [2] The Zurich Typographer— Swiss international style, vermilion & grid');
  console.log('  [3] The Nordic Diplomat   — Scandinavian policy, fjord blue & sand');
  console.log('  [4] The Silicon Architect — Deep tech, cobalt blue & engineering placards');
  console.log('  [5] Custom Archetype      — Enter your own name, vibe, and domain\n');

  const choice = await question('Select [1-5] (default: 1): ');
  rl.close();

  const selectedKey = choice || '1';
  if (PRESET_ARCHETYPES[selectedKey]) {
    return PRESET_ARCHETYPES[selectedKey]!;
  }

  // Custom prompt
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
    const { brief: cliBrief, provider } = parseArgs();
    const brief = cliBrief || (await promptUser());

    console.log(`\nStarting design reference generation for: "${brief.name}"...`);
    console.log(`Vibe: ${brief.vibe}`);
    if (brief.domain) console.log(`Domain: ${brief.domain}`);

    const startTime = Date.now();
    const result = await generateTemplateReference(brief, { provider });
    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n======================================================');
    console.log('   Design Reference Generated Successfully!          ');
    console.log('======================================================');
    console.log(`File:       ${result.filePath}`);
    console.log(`Slides:     ${result.validation.slideCount}`);
    console.log(`Time:       ${elapsedSec}s`);
    if (result.usage) {
      console.log(`Tokens:     Input: ${result.usage.promptTokens} | Output: ${result.usage.completionTokens}`);
    }
    if (result.audit) {
      console.log(`Audit:      Collisions: ${result.audit.totalCollisions} | Passed: ${result.audit.passed ? 'YES' : 'NO'}`);
      if (result.audit.errors.length > 0) {
        console.log(`Errors:     ${result.audit.errors.join('; ')}`);
      }
    }
    if (result.validation.warnings.length > 0) {
      console.log(`Warnings:   ${result.validation.warnings.join('; ')}`);
    }

    console.log('\nPreview in your browser:');
    console.log(`  file://${result.filePath}`);

    console.log('\nNext step when ready to convert to a production React template:');
    const slug = brief.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    console.log(`  pnpm run create-template ${slug} "${brief.name}"`);
    console.log('======================================================\n');
  } catch (err) {
    console.error('\n[Error] Failed to generate template reference:', err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
