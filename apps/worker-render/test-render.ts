import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  
  // Editorial (Job 65bc344e-44e1-4057-8028-3fcfffe58721)
  await page.goto('http://localhost:5173/render/65bc344e-44e1-4057-8028-3fcfffe58721/0?template=editorial', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/core/.gemini/antigravity-cli/brain/af5ec6ff-22f4-4c0b-a237-7bac42dedbbd/editorial-0.png' });
  
  await page.goto('http://localhost:5173/render/65bc344e-44e1-4057-8028-3fcfffe58721/1?template=editorial', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/core/.gemini/antigravity-cli/brain/af5ec6ff-22f4-4c0b-a237-7bac42dedbbd/editorial-1.png' });

  // Glassmorphism (Same job, override template via param)
  await page.goto('http://localhost:5173/render/65bc344e-44e1-4057-8028-3fcfffe58721/0?template=glassmorphism', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/core/.gemini/antigravity-cli/brain/af5ec6ff-22f4-4c0b-a237-7bac42dedbbd/glassmorphism-0.png' });

  await page.goto('http://localhost:5173/render/65bc344e-44e1-4057-8028-3fcfffe58721/1?template=glassmorphism', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/core/.gemini/antigravity-cli/brain/af5ec6ff-22f4-4c0b-a237-7bac42dedbbd/glassmorphism-1.png' });

  await browser.close();
  console.log("Screenshots saved to artifacts directory");
})();
