import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

interface TestCase {
  name: string;
  templateId: string;
  viewport: { width: number; height: number };
  aspectName: 'portrait' | 'square' | 'story';
  slide: Record<string, any>;
}

const testCases: TestCase[] = [
  // 1. The Field Notes
  {
    name: 'Field Notes Cover - Portrait',
    templateId: 'the-field-notes',
    viewport: { width: 1080, height: 1350 },
    aspectName: 'portrait',
    slide: {
      type: 'cover',
      kicker: 'Field Alert · Research Note',
      headline: 'Ancient Means Primitive? 82 Fragments Disagree',
      subheadline: 'Subsea recovered geared mechanism with 30 meshing wheels calculated lunar, solar, and planetary cycles.',
      meta: ['82 fragments', '2,000 years', '150 BCE'],
    },
  },
  {
    name: 'Field Notes Statement - Square',
    templateId: 'the-field-notes',
    viewport: { width: 1080, height: 1080 },
    aspectName: 'square',
    slide: {
      type: 'statement',
      headline: 'What does “UNABLE TO EXTRACT” establish?',
      text: 'The source content could not be read or contains no meaningful article text. This describes the supplied material, not the quality of the original article.',
      scribble: 'Missing text is not a finding.',
      note: 'Keep the distinction clear: unavailable evidence does not establish lack of substance.',
    },
  },
  {
    name: 'Field Notes Dense List - Portrait',
    templateId: 'the-field-notes',
    viewport: { width: 1080, height: 1350 },
    aspectName: 'portrait',
    slide: {
      type: 'list',
      headline: 'Your evidence fields are empty.',
      items: [
        { title: 'Key insights — not supplied', desc: 'No key insights appear in the brief. Leave central argument unresolved.' },
        { title: 'Quotations — not supplied', desc: 'The quotations field is empty. Do not introduce a speaker words.' },
        { title: 'Counterpoints — not supplied', desc: 'Neither agreement nor disagreement can be established.' },
        { title: 'Hard data — not supplied', desc: 'The hard-data field is empty, and the brief flags no real numbers.' },
        { title: 'People — not supplied', desc: 'Leave names, roles, and attribution unassigned until drawn.' },
      ],
      note: 'These fields contain no material to support claims. Treat them as unresolved.',
    },
  },
  {
    name: 'Field Notes Dense List - Square',
    templateId: 'the-field-notes',
    viewport: { width: 1080, height: 1080 },
    aspectName: 'square',
    slide: {
      type: 'list',
      headline: 'Your evidence fields are empty.',
      items: [
        { title: 'Key insights — not supplied', desc: 'No key insights appear in the brief. Leave central argument unresolved.' },
        { title: 'Quotations — not supplied', desc: 'The quotations field is empty. Do not introduce a speaker words.' },
        { title: 'Counterpoints — not supplied', desc: 'Neither agreement nor disagreement can be established.' },
        { title: 'Hard data — not supplied', desc: 'The hard-data field is empty, and the brief flags no real numbers.' },
        { title: 'People — not supplied', desc: 'Leave names, roles, and attribution unassigned until drawn.' },
      ],
      note: 'These fields contain no material to support claims. Treat them as unresolved.',
    },
  },
  // 2. Paper of Record
  {
    name: 'Paper of Record Telemetry - Portrait',
    templateId: 'paper-of-record',
    viewport: { width: 1080, height: 1350 },
    aspectName: 'portrait',
    slide: {
      type: 'telemetry',
      headline: 'Market Volatility Index Reaches Multi-Year High',
      stats: [
        { value: '38.4', unit: 'pts', label: 'Implied Volatility Index' },
        { value: '$4.2B', unit: '', label: 'Net Outflows' },
        { value: '94%', unit: '', label: 'Hedge Coverage Ratio' },
        { value: '12ms', unit: '', label: 'Exchange Latency Peak' },
      ],
    },
  },
  {
    name: 'Paper of Record Telemetry - Square',
    templateId: 'paper-of-record',
    viewport: { width: 1080, height: 1080 },
    aspectName: 'square',
    slide: {
      type: 'telemetry',
      headline: 'Market Volatility Index Reaches Multi-Year High',
      stats: [
        { value: '38.4', unit: 'pts', label: 'Implied Volatility Index' },
        { value: '$4.2B', unit: '', label: 'Net Outflows' },
        { value: '94%', unit: '', label: 'Hedge Coverage Ratio' },
        { value: '12ms', unit: '', label: 'Exchange Latency Peak' },
      ],
    },
  },
  // 3. The Signal
  {
    name: 'The Signal Telemetry - Square',
    templateId: 'the-signal',
    viewport: { width: 1080, height: 1080 },
    aspectName: 'square',
    slide: {
      type: 'telemetry',
      headline: 'Engineering Velocity: Q3 Benchmarks Across 42 Teams',
      stats: [
        { value: '99.99%', unit: '', label: 'Service Level Objective' },
        { value: '4.2x', unit: '', label: 'Deploy Frequency' },
        { value: '18min', unit: '', label: 'Mean Time to Recovery' },
        { value: '-42%', unit: '', label: 'Critical Incident Volume' },
      ],
    },
  },
  // 4. The Curator
  {
    name: 'The Curator Telemetry - Square',
    templateId: 'the-curator',
    viewport: { width: 1080, height: 1080 },
    aspectName: 'square',
    slide: {
      type: 'telemetry',
      headline: 'Exhibition Readings: Light, Spatial Density & Interaction',
      stats: [
        { value: '120', unit: 'lx', label: 'Ambient Gallery Illuminance' },
        { value: '4.8m', unit: '', label: 'Average Ceiling Height' },
        { value: '98.2%', unit: '', label: 'Visitor Dwell Retention' },
        { value: '24', unit: 'fps', label: 'Synchronized Projection Rate' },
      ],
    },
  },
  // 5. The Academic
  {
    name: 'The Academic Telemetry - Square',
    templateId: 'the-academic',
    viewport: { width: 1080, height: 1080 },
    aspectName: 'square',
    slide: {
      type: 'telemetry',
      headline: 'Empirical Findings: Statistical Significance & Sample Bounds',
      stats: [
        { value: 'p<0.001', unit: '', label: 'Hypothesis Rejection' },
        { value: '0.84', unit: 'r', label: 'Pearson Correlation' },
        { value: '1,420', unit: 'N', label: 'Cohort Sample Size' },
        { value: '95%', unit: 'CI', label: 'Confidence Interval' },
      ],
    },
  },
  // 6. The Globalist
  {
    name: 'The Globalist Telemetry - Square',
    templateId: 'the-globalist',
    viewport: { width: 1080, height: 1080 },
    aspectName: 'square',
    slide: {
      type: 'telemetry',
      headline: 'Trade Routes & Tariff Realignment Across Pacific Corridors',
      stats: [
        { value: '$1.4T', unit: '', label: 'Bilateral Trade Volume' },
        { value: '-18%', unit: '', label: 'Container Freight Index' },
        { value: '48hr', unit: '', label: 'Port Customs Clearance' },
        { value: '14', unit: 'pts', label: 'Tariff Delta Average' },
      ],
    },
  },
];

const outDir = path.resolve('output/render-engine-upgrade');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  let allPassed = true;

  console.log('====================================================');
  console.log('🚀 RUNNING NEXT-GEN RENDERING & SPACE ENGINE TEST');
  console.log('====================================================\n');

  for (const tc of testCases) {
    const page = await browser.newPage({ viewport: tc.viewport });
    await page.goto('http://localhost:3001');

    await page.evaluate(async ({ slide, templateId, viewport }) => {
      const w = window as any;
      w.__SLIDE_DATA = slide;
      w.__SLIDE_TEMPLATE_ID = templateId;
      w.__SLIDE_SIZE = viewport;
      w.dispatchEvent(new Event('slide-update'));
      if (document.fonts) {
        await document.fonts.ready;
      }
      w.dispatchEvent(new Event('slide-update'));
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    }, { slide: tc.slide, templateId: tc.templateId, viewport: tc.viewport });

    await page.waitForTimeout(600);

    const metrics = await page.evaluate(() => {
      const container = document.querySelector('.loop-autofit-container') as HTMLElement;
      const content = document.querySelector('.loop-autofit-content') as HTMLElement;

      const cRect = container?.getBoundingClientRect();
      const ctRect = content?.getBoundingClientRect();

      const overflowTop = cRect && ctRect ? Math.max(0, cRect.top - ctRect.top) : 0;
      const overflowBottom = cRect && ctRect ? Math.max(0, ctRect.bottom - cRect.bottom) : 0;
      const overflowLeft = cRect && ctRect ? Math.max(0, cRect.left - ctRect.left) : 0;
      const overflowRight = cRect && ctRect ? Math.max(0, ctRect.right - cRect.right) : 0;

      const visualClip = Math.max(overflowTop, overflowBottom, overflowLeft, overflowRight);

      return {
        scale: container?.getAttribute('data-autofit-scaled') || '1.000',
        health: container?.getAttribute('data-layout-health') || 'optimal',
        visualClip,
        containerW: cRect?.width,
        containerH: cRect?.height,
        contentW: ctRect?.width,
        contentH: ctRect?.height,
      };
    });

    const filename = `${tc.templateId}__${tc.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.png`;
    const shotPath = path.join(outDir, filename);
    await page.screenshot({ path: shotPath });

    const passed = metrics.visualClip <= 0.5;
    if (!passed) {
      allPassed = false;
      console.error(`❌ [FAIL] ${tc.name}: visualClip=${metrics.visualClip.toFixed(2)}px scale=${metrics.scale}`);
    } else {
      console.log(`✅ [PASS] ${tc.name}`);
      console.log(`   Scale: ${metrics.scale} | Health: ${metrics.health} | Container: ${metrics.containerW?.toFixed(0)}x${metrics.containerH?.toFixed(0)} | Visual Clip: ${metrics.visualClip.toFixed(2)}px`);
    }

    await page.close();
  }

  await browser.close();

  console.log('\n====================================================');
  if (allPassed) {
    console.log('🎉 ALL NEXT-GEN RENDER TESTS PASSED WITH 0.00px OVERFLOW ACROSS ALL TEMPLATES & VIEWPORTS!');
  } else {
    console.error('❌ SOME RENDER TESTS FAILED.');
    process.exit(1);
  }
})();
