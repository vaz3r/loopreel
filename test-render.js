import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  await page.goto('http://localhost:5173/render/65bc344e-44e1-4057-8028-3fcfffe58721/0', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/core/.gemini/antigravity-cli/brain/af5ec6ff-22f4-4c0b-a237-7bac42dedbbd/editorial-0.png' });
  
  await page.goto('http://localhost:5173/render/65bc344e-44e1-4057-8028-3fcfffe58721/1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '/home/core/.gemini/antigravity-cli/brain/af5ec6ff-22f4-4c0b-a237-7bac42dedbbd/editorial-1.png' });

  await browser.close();
  console.log("Screenshots saved to artifacts directory");
})();
