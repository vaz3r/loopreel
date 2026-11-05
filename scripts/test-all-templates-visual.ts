import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { getAllDecks } from '../packages/loop/src/layouts/registry';

const OUTPUT_DIR = path.resolve(process.cwd(), 'output/template-audit');
const RENDER_URL = process.env['RENDER_URL'] ?? 'http://localhost:3001';
const WIDTH = 1080;
const HEIGHT = 1350;

async function run() {
  console.log('====================================================');
  console.log('🎨 MULTI-TEMPLATE VISUAL AUDIT & RENDER TEST');
  console.log('====================================================');
  console.log(`Target Static Server: ${RENDER_URL}`);
  console.log(`Output Directory:     ${OUTPUT_DIR}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  await page.goto(RENDER_URL, { waitUntil: 'networkidle', timeout: 30000 });

  const decks = getAllDecks();
  const summary: Array<{ template: string; slideType: string; file: string; sizeKb: number }> = [];

  for (const deck of decks) {
    console.log(`\n📁 Testing Template: [${deck.name}] (${deck.templateId})`);
    const templateDir = path.join(OUTPUT_DIR, deck.templateId);
    fs.mkdirSync(templateDir, { recursive: true });

    const slides = (deck.sampleSlides.slides || deck.sampleSlides) as Record<string, any>[];
    const targetTypes = deck.templateId === 'the-field-notes'
      ? slides.map((s) => s.type)
      : ['cover', 'sequence', 'telemetry', 'cta'];

    for (const targetType of targetTypes) {
      const slide = slides.find((s) => s.type === targetType);
      if (!slide) {
        console.log(`  ⚠️  Slide type "${targetType}" not found in sample slides, skipping`);
        continue;
      }

      await page.evaluate(
        ({ slideData, schemeId, templateIdVal, renderSize }) => {
          const w = window as any;
          w.__SLIDE_DATA = slideData;
          w.__SLIDE_SCHEME_ID = schemeId;
          w.__SLIDE_TEMPLATE_ID = templateIdVal;
          w.__SLIDE_SIZE = renderSize;
          w.dispatchEvent(new Event('slide-update'));
        },
        {
          slideData: slide,
          schemeId: deck.schemeId,
          templateIdVal: deck.templateId,
          renderSize: { width: WIDTH, height: HEIGHT },
        }
      );

      await page.waitForSelector(`[data-slide-id="${slide.id}"]`, { timeout: 5000 }).catch(() => {});
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      await page.evaluate(() => document.fonts.ready);

      const filePath = path.join(templateDir, `${targetType}.png`);
      const buffer = await page.screenshot({ type: 'png' });
      fs.writeFileSync(filePath, buffer);

      const sizeKb = Number((buffer.length / 1024).toFixed(1));
      summary.push({ template: deck.templateId, slideType: targetType, file: filePath, sizeKb });
      console.log(`  ✓ Rendered [${targetType}]: ${sizeKb} KB -> ${filePath}`);
    }
  }

  await browser.close();

  console.log('\n====================================================');
  console.log('📊 AUDIT SUMMARY TABLE');
  console.log('====================================================');
  console.table(summary);
  console.log('\n✨ All templates rendered successfully!');
}

run().catch((err) => {
  console.error('\n❌ Visual audit failed:', err);
  process.exit(1);
});
