import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { chromium } from 'playwright';
import { Archive } from '@loopreel/templates';

const testSlides = [
  {
    type: 'cover',
    titleTop: 'SYSTEM',
    titleBottom: 'ARCHITECTURE',
    ticker: 'THE ARCHITECTURE OF VALUE  //  STRUCTURAL ALIGNMENT  //  VOLUME II',
    headerLeft: 'Sys. 02',
    headerRight: 'Archive',
    footerLeft: 'Vol. II',
    footerRight: 'Social Export',
    theme: 'void',
  },
  {
    type: 'context',
    title: 'The Baseline.',
    text: 'Most systems fail not because they lack execution, but because their underlying architecture is fundamentally misaligned with the intended output.',
    headerLeft: 'Context',
    headerRight: '02 / 08',
    footerLeft: 'Observation',
    footerRight: 'Sector 01',
    theme: 'bone',
  },
  {
    type: 'list',
    title: 'Structural Deficits.',
    items: [
      { num: '01', label: 'Scope Erosion', desc: 'Operating without rigid boundaries converts premium strategy into commoditized execution.' },
      { num: '02', label: 'Misaligned Onboarding', desc: 'Accepting friction early guarantees massive structural failure during deployment.' },
      { num: '03', label: 'Undervalued IP', desc: 'Charging for hours deployed rather than the transformation delivered limits growth.' },
    ],
    headerLeft: 'Data Set',
    headerRight: '03 / 08',
    footerLeft: 'Diagnostics',
    footerRight: 'Vol. II',
    theme: 'bone',
  },
  {
    type: 'matrix',
    title: 'The Tension Matrix',
    quadrants: [
      { title: 'High Friction', text: 'Manual Intervention & bespoke problem solving.' },
      { title: 'Low Friction', text: 'Automated Scaling & systematic deployment.' },
      { title: 'Commodity', text: 'Time-Based Billing & scope creep.' },
      { title: 'Premium', text: 'Value-Based IP & structural leverage.' },
    ],
    headerLeft: 'Framework',
    headerRight: '04 / 08',
    footerLeft: 'Analysis',
    footerRight: 'Q3',
    theme: 'steel',
  },
  {
    type: 'insight',
    title: 'Pivot Point.',
    text: 'When you stop selling your hands and start selling your mind, the unit economics fundamentally shift.',
    headerLeft: 'Insight',
    headerRight: '05 / 08',
    footerLeft: 'Shift',
    footerRight: 'Mental Model',
    theme: 'void',
  },
  {
    type: 'quote',
    quote: 'The architecture of your pricing dictates the architecture of your respect in the marketplace.',
    author: 'M. Reyes — Partner',
    headerLeft: 'Thesis',
    headerRight: '06 / 08',
    footerLeft: 'Op. Cit.',
    footerRight: '2026',
    theme: 'steel',
  },
  {
    type: 'evidence',
    title: 'Proof of Work.',
    stats: [
      { value: '400%', label: 'Increase in retained margin over 12 months' },
      { value: 'Zero', label: 'Scope creep incidents post-deployment protocols' },
    ],
    headerLeft: 'Evidence',
    headerRight: '07 / 08',
    footerLeft: 'Metrics',
    footerRight: 'Verified',
    theme: 'bone',
  },
  {
    type: 'cta',
    title: 'Deploy the System.',
    buttonText: 'Initialize Sequence',
    headerLeft: 'Terminal',
    headerRight: '08 / 08',
    footerLeft: '@mayaruns',
    footerRight: 'End Protocol',
    theme: 'void',
  },
];

const debugDir = '/tmp/loopreel-slides';
mkdirSync(debugDir, { recursive: true });

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2,
  });

  for (let i = 0; i < testSlides.length; i++) {
    const slide = testSlides[i];
    const page = await context.newPage();

    const html = renderToStaticMarkup(
      React.createElement(Archive.Component, {
        slide,
        meta: {},
        slideIndex: i,
        slideCount: testSlides.length,
      })
    );

    const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Manrope:wght@200;300;400;500;600;700&display=swap">
    <style>body { margin: 0; padding: 0; }</style>
  </head>
  <body>${html}</body>
</html>`;

    await page.setContent(fullHtml, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const screenshot = await page.screenshot({ type: 'png' });
    const pngPath = join(debugDir, `archive-slide-${i}.png`);
    writeFileSync(pngPath, screenshot);

    console.log(`✓ Slide ${i + 1} (${slide.type}) → ${pngPath} (${(screenshot.length / 1024).toFixed(1)} KB)`);

    await page.close();
  }

  await browser.close();
  console.log(`\n✓ All ${testSlides.length} slides captured as PNGs to ${debugDir}/`);
}

main().catch(console.error);
