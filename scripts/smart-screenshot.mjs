#!/usr/bin/env node
/**
 * Smart-fit aware screenshot renderer.
 * Usage: node smart-screenshot.mjs <html-file> <output-png> [viewport]
 */
import { chromium } from 'playwright';
import { resolve } from 'path';

const [,, htmlFile, outputPng, viewport = '1080,1350'] = process.argv;
if (!htmlFile || !outputPng) {
  console.error('Usage: node smart-screenshot.mjs <html-file> <output-png> [viewport]');
  process.exit(1);
}

const [w, h] = viewport.split(',').map(Number);
const url = `file://${resolve(htmlFile)}`;

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: w, height: h } });

await page.goto(url, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);

// Wait for smart-fit script to complete (up to 5s)
try {
  await page.waitForFunction(() => window.__smartFitDone === true, { timeout: 5000 });
} catch {
  // smart-fit may not be present; that's OK
}

await page.screenshot({ type: 'png', path: outputPng });
await browser.close();
