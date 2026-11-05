import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const RENDER_URL = process.env['RENDER_URL'] ?? 'http://localhost:3001';
const OUTPUT_DIR = path.resolve(process.cwd(), 'output/overflow-verification');

const SLIDE_03 = {
  id: 'slide-03',
  tag: 'DIAL TALLIES / TIME',
  type: 'telemetry',
  stats: [
    { text: 'The Metonic dial covers 235 synodic months in five rotations, corresponding closely to 19 tropical years.', unit: 'months', label: 'Metonic dial links lunar months with solar years', value: '235' },
    { text: 'Its Games dial followed a four-year athletic cycle.', unit: 'years', label: 'Games dial connects astronomy with an athletic cycle', value: 'four' },
    { text: 'The Saros dial contains 223 synodic month cells.', unit: 'cells', label: 'Saros dial contains a sequence of synodic months', value: '223' },
    { text: 'Glyphs in 51 cells specify 38 lunar and 27 solar eclipses.', unit: 'cells', label: 'Inscribed cells specify both lunar and solar eclipses', value: '51' },
  ],
  headline: '235 Months Connect Astronomy With Everyday Timekeeping',
  scribble: 'Astronomical cycles; athletic cycles; eclipse predictions.',
  footerLeft: 'ANTIKYTHERA / FIELD NOTES',
  footerRight: 'PAGE 03',
};

const SLIDE_04 = {
  id: 'slide-04',
  tag: 'SPECIMEN / INTERPRETATION',
  left: {
    items: [
      'In 2005, X-ray tomography and high-resolution scanning revealed hidden structures and inscriptions.',
      'Scans suggest 35 meshing bronze gears, with 30 still visible; the largest gear originally had 223 teeth.',
      'Inscriptions support a display for the five classical planets, but its original gearing remains unresolved.',
    ],
    label: 'SURVIVING EVIDENCE',
  },
  type: 'compare',
  right: {
    items: [
      'A March 2021 reconstruction proposed a system compatible with the currently known evidence.',
      'Missing components and competing reconstructions leave its origins and accuracy unresolved.',
    ],
    label: 'MODERN RECONSTRUCTION',
  },
  headline: 'Evidence vs. Reconstruction: Planetary Gearing Remains Unresolved',
  scribble: 'Compatible with evidence ≠ definitive.',
  footerLeft: 'ANTIKYTHERA / FIELD NOTES',
  footerRight: 'PAGE 04',
};

const TEST_CONFIGS = [
  { name: 'Field Notes Slide 3 (Tally) - Portrait', templateId: 'the-field-notes', slide: SLIDE_03, size: { width: 1080, height: 1350 } },
  { name: 'Field Notes Slide 3 (Tally) - Square', templateId: 'the-field-notes', slide: SLIDE_03, size: { width: 1080, height: 1080 } },
  { name: 'Field Notes Slide 4 (Compare) - Portrait', templateId: 'the-field-notes', slide: SLIDE_04, size: { width: 1080, height: 1350 } },
  { name: 'Field Notes Slide 4 (Compare) - Square', templateId: 'the-field-notes', slide: SLIDE_04, size: { width: 1080, height: 1080 } },
  { name: 'Paper of Record Telemetry - Square', templateId: 'paper-of-record', slide: SLIDE_03, size: { width: 1080, height: 1080 } },
  { name: 'The Signal Telemetry - Square', templateId: 'the-signal', slide: SLIDE_03, size: { width: 1080, height: 1080 } },
  { name: 'The Curator Telemetry - Square', templateId: 'the-curator', slide: SLIDE_03, size: { width: 1080, height: 1080 } },
  { name: 'The Academic Telemetry - Square', templateId: 'the-academic', slide: SLIDE_03, size: { width: 1080, height: 1080 } },
  { name: 'The Globalist Telemetry - Square', templateId: 'the-globalist', slide: SLIDE_03, size: { width: 1080, height: 1080 } },
];

async function main() {
  console.log('====================================================');
  console.log('🔍 RUNNING PERMANENT DOM OVERFLOW & AUTOFIT VERIFICATION');
  console.log('====================================================\n');

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.goto(RENDER_URL, { waitUntil: 'networkidle', timeout: 30000 });

  let allPassed = true;

  for (const cfg of TEST_CONFIGS) {
    await page.setViewportSize({ width: cfg.size.width, height: cfg.size.height });

    await page.evaluate(
      ({ slideData, templateIdVal, renderSize }) => {
        const w = window as any;
        w.__SLIDE_DATA = slideData;
        w.__SLIDE_TEMPLATE_ID = templateIdVal;
        w.__SLIDE_SIZE = renderSize;
        w.dispatchEvent(new Event('slide-update'));
      },
      {
        slideData: cfg.slide,
        templateIdVal: cfg.templateId,
        renderSize: cfg.size,
      },
    );

    // Wait for React re-render & layout effect
    await page.waitForTimeout(300);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    await page.evaluate(() => document.fonts.ready);

    const metrics = await page.evaluate(() => {
      const autofit = document.querySelector('.loop-autofit-container');
      const content = document.querySelector('.loop-autofit-content');

      if (!autofit || !content) {
        return { hasAutofit: false, topClip: 999, bottomClip: 999, leftClip: 999, rightClip: 999, scaledAttr: '0' };
      }

      const clientH = autofit.clientHeight;
      const clientW = autofit.clientWidth;
      const scaledAttr = autofit.getAttribute('data-autofit-scaled') || '1.0';

      const contentBox = content.getBoundingClientRect();
      const autofitBox = autofit.getBoundingClientRect();

      // Visual clipping bounds with 2px floating-point tolerance
      const topClip = Math.max(0, autofitBox.top - contentBox.top - 2);
      const bottomClip = Math.max(0, contentBox.bottom - autofitBox.bottom - 2);
      const leftClip = Math.max(0, autofitBox.left - contentBox.left - 2);
      const rightClip = Math.max(0, contentBox.right - autofitBox.right - 2);

      return {
        hasAutofit: true,
        clientH,
        clientW,
        scaledAttr,
        topClip,
        bottomClip,
        leftClip,
        rightClip,
        totalClip: topClip + bottomClip + leftClip + rightClip,
        autofitBox,
        contentBox,
      };
    });

    const screenshotPath = path.join(OUTPUT_DIR, `${cfg.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`);
    await page.screenshot({ path: screenshotPath });

    const isSuccess = metrics.hasAutofit && metrics.totalClip === 0;

    if (isSuccess) {
      console.log(`✅ [PASS] ${cfg.name}`);
      console.log(`   Scale: ${metrics.scaledAttr} | Container: ${metrics.clientW}x${metrics.clientH}`);
      console.log(`   Visual Clip: 0px (Top: ${metrics.topClip.toFixed(1)}px, Bottom: ${metrics.bottomClip.toFixed(1)}px, Left: ${metrics.leftClip.toFixed(1)}px, Right: ${metrics.rightClip.toFixed(1)}px)`);
    } else {
      console.log(`❌ [FAIL] ${cfg.name}`);
      console.log(`   Metrics:`, metrics);
      allPassed = false;
    }
  }

  await browser.close();

  console.log('\n====================================================');
  if (allPassed) {
    console.log('🎉 ALL DOM OVERFLOW AND AUTOFIT TESTS PASSED WITH 0px OVERFLOW ACROSS ALL TEMPLATES & SIZES!');
  } else {
    console.log('💥 SOME OVERFLOW TESTS FAILED');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
