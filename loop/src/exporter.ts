import { chromium, type Browser } from 'playwright';
import fs from 'fs';
import path from 'path';
import type { PaperOfRecordContract } from './layouts/paper-of-record/schema';

export interface ExportOptions {
  baseUrl?: string;
  outputDir?: string;
  deviceScaleFactor?: number;
  width?: number;
  height?: number;
  templateId?: string;
}

export async function exportCarouselToImages(
  contract: PaperOfRecordContract,
  schemeId: string,
  outputSubdir: string,
  options: ExportOptions = {}
): Promise<string[]> {
  const {
    baseUrl = 'http://localhost:5173',
    outputDir = './output',
    deviceScaleFactor = 2,
    width = 1080,
    height = 1350,
    templateId = 'paper-of-record',
  } = options;

  const fullOutputDir = path.join(outputDir, outputSubdir);
  if (!fs.existsSync(fullOutputDir)) {
    fs.mkdirSync(fullOutputDir, { recursive: true });
  }

  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor,
  });

  const exportedPaths: string[] = [];
  let page;

  for (let i = 0; i < contract.slides.length; i++) {
    const slide = contract.slides[i];

    page = await context.newPage();

    await page.addInitScript({
      content: `
        window.__SLIDE_DATA = ${JSON.stringify(slide)};
        window.__SLIDE_SCHEME_ID = ${JSON.stringify(schemeId)};
        window.__SLIDE_TEMPLATE_ID = ${JSON.stringify(templateId)};
        window.__SLIDE_SIZE = ${JSON.stringify({ width, height })};
      `,
    });

    await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);

    const errorText = await page.evaluate(() => {
      const el = document.querySelector('[style*="color: red"]');
      return el ? el.textContent : null;
    });

    if (errorText) {
      console.warn(`  WARNING: Slide ${i + 1} shows error: "${errorText}"`);
    }

    const paddedIdx = String(i + 1).padStart(2, '0');
    const outputPath = path.join(fullOutputDir, `slide_${paddedIdx}.png`);

    await page.screenshot({
      path: outputPath,
      type: 'png',
      clip: { x: 0, y: 0, width, height },
    });

    exportedPaths.push(outputPath);
    console.log(`  Exported: ${outputPath}`);

    await page.close();
  }

  await browser.close();
  return exportedPaths;
}
