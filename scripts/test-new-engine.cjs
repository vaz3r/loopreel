const { chromium } = require('/home/core/projects/loopreel/apps/worker-render/node_modules/playwright');
const { renderToStaticMarkup } = require('/home/core/projects/loopreel/apps/api/node_modules/react-dom/server');
const React = require('/home/core/projects/loopreel/apps/api/node_modules/react');
const { mkdirSync, writeFileSync } = require('fs');
const { join } = require('path');

const OUTPUT_DIR = '/home/core/projects/loopreel/slides-output/new-engine';

// Test data matching the EditorialRunway contract exactly
const TEST_CONTENT = {
  meta: {
    seriesName: 'Field Notes',
    handle: '@loopreel',
    authorName: 'Loopreel Editorial',
    date: new Date().toISOString().split('T')[0],
  },
  hook: {
    type: 'hook',
    heading: 'The Architecture of Scale',
    kicker: 'DEEP DIVE',
  },
  slides: [
    {
      type: 'content',
      heading: 'Why Monoliths Break',
      body: 'When systems grow beyond a certain complexity, the original architecture becomes the bottleneck. Teams step on each other, deployments slow, and the cost of change rises exponentially.',
    },
    {
      type: 'list',
      heading: 'Signs Your System Needs Redesign',
      items: [
        'Deployments take hours instead of minutes',
        'A single bug takes down the entire platform',
        'Adding one feature breaks three others',
        'New engineers need months to understand the codebase',
      ],
    },
    {
      type: 'quote',
      quote: 'The best architecture is the one that lets you change your mind.',
      attribution: 'Martin Fowler',
    },
    {
      type: 'stat',
      value: '73%',
      label: 'of engineering time spent on maintenance',
      body: 'Teams spend most of their energy working around the architecture rather than building new value.',
    },
  ],
  cta: {
    type: 'cta',
    heading: 'Start Your Transformation',
    ctaLabel: 'Read the guide',
  },
};

async function main() {
  // Dynamic imports
  const { EditorialRunway } = await import('/home/core/projects/loopreel/packages/templates/dist/EditorialRunway/index.js');
  const { EditorialRunwayRenderContractSchema } = await import('/home/core/projects/loopreel/packages/templates/dist/EditorialRunway/index.js');

  console.log('🎨 New Engine — EditorialRunway Test\n');

  // Validate the contract
  const check = EditorialRunwayRenderContractSchema.safeParse(TEST_CONTENT);
  if (!check.success) {
    console.error('❌ Contract validation failed:', check.error.message);
    process.exit(1);
  }
  console.log('✅ Contract validation passed\n');

  const platforms = [
    { id: 'portrait', width: 1080, height: 1350, label: 'Instagram Feed' },
    { id: 'story', width: 1080, height: 1920, label: 'Instagram Stories' },
    { id: 'landscape', width: 1200, height: 627, label: 'LinkedIn/Facebook' },
    { id: 'square', width: 1080, height: 1080, label: 'Square' },
  ];

  const browser = await chromium.launch();

  for (const platform of platforms) {
    console.log(`\n📐 ${platform.label} (${platform.width}x${platform.height})`);
    const platformDir = join(OUTPUT_DIR, platform.id);
    mkdirSync(platformDir, { recursive: true });

    // Calculate total slides: hook + content slides + CTA
    const totalSlides = 2 + TEST_CONTENT.slides.length;

    for (let i = 0; i < totalSlides; i++) {
      try {
        const element = React.createElement(EditorialRunway, {
          content: TEST_CONTENT,
          slideIndex: i,
          format: platform.id,
        });

        const html = renderToStaticMarkup(element);
        const renderGateScript = `
<script>
  (function() {
    document.fonts.ready.then(function() {
      document.body.setAttribute('data-render-complete', 'true');
    });
  })();
</script>`;

        const fullHtml = `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Archivo:wght@400;500;600;700&display=swap">
    <style>body { margin: 0; padding: 0; }</style>
  </head>
  <body>${html}</body>
  ${renderGateScript}
</html>`;

        const page = await browser.newPage();
        await page.setViewportSize({ width: platform.width, height: platform.height });
        await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => document.fonts.ready);

        // Measure-and-shrink for variable-length text
        await page.evaluate(() => {
          const elements = document.querySelectorAll('[data-smart-fit]');
          elements.forEach((el) => {
            const htmlEl = el;
            const parent = htmlEl.parentElement;
            if (!parent) return;
            let size = parseFloat(getComputedStyle(htmlEl).fontSize);
            while (htmlEl.scrollHeight > parent.clientHeight && size > 14) {
              size -= 1;
              htmlEl.style.fontSize = `${size}px`;
            }
          });
        });

        // Wait for render-complete signal
        await page.waitForFunction(
          () => document.body.getAttribute('data-render-complete') === 'true',
          { timeout: 5000 },
        );

        const screenshot = await page.screenshot({ type: 'png' });
        const slideType = i === 0 ? 'hook' : i === totalSlides - 1 ? 'cta' : TEST_CONTENT.slides[i - 1]?.type ?? 'content';
        const filePath = join(platformDir, `${String(i + 1).padStart(2, '0')}-${slideType}.png`);
        writeFileSync(filePath, screenshot);
        console.log(`  ✓ Slide ${i + 1} (${slideType}) → ${filePath}`);

        await page.close();
      } catch (err) {
        console.error(`  ✗ Slide ${i + 1}: ${err.message}`);
      }
    }
  }

  await browser.close();
  console.log(`\n✅ Done! Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
