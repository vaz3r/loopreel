import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  
  const jobId = '6f145028-4a6c-4e77-816c-298532307eeb';
  const brainDir = '/home/core/.gemini/antigravity-cli/brain/af5ec6ff-22f4-4c0b-a237-7bac42dedbbd';

  for (let i = 0; i < 3; i++) {
    await page.goto(`http://localhost:5173/render/${jobId}/${i}?template=editorial`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${brainDir}/asus-${i}.png` });
  }

  await browser.close();
  console.log("Screenshots saved");
})();
