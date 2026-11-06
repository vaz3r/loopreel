import "dotenv/config";
import { chromium } from "playwright";
import { JobRepository } from "../../db/dist/index.js";
import { mkdir } from "fs/promises";
import path from "path";

async function renderAll() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2,
  });
  await page.goto("http://localhost:3001");

  const jobs = [
    { id: "ff38a6d7-0db9-4d80-88d2-736101180141", dir: "gnews-ap-globalist" },
    { id: "4144c977-c2fb-4608-8fe8-6d4ab8c6e6ae", dir: "gnews-cnbc-academic" },
    { id: "ffc134a8-8b18-4049-8900-39038ddb42a7", dir: "gnews-verge-signal" },
  ];

  const baseDir = "/home/core/.gemini/antigravity-cli/brain/da27b3cb-1b2b-4f17-868f-3f236e8a90bd";

  for (const j of jobs) {
    const job = await JobRepository.findById(j.id);
    const slides = (job?.content_payload as any)?.slides || [];
    const targetDir = path.join(baseDir, j.dir);
    await mkdir(targetDir, { recursive: true });

    console.log(`Rendering ${j.dir} (${slides.length} slides)...`);

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      await page.evaluate(({ slideData, templateIdVal }) => {
        const w = window as any;
        w.__SLIDE_DATA = slideData;
        w.__SLIDE_TEMPLATE_ID = templateIdVal;
        w.__SLIDE_SIZE = { width: 1080, height: 1350 };
        w.dispatchEvent(new Event("slide-update"));
      }, { slideData: slide, templateIdVal: job?.template_id });

      await page.waitForTimeout(150);

      const filePath = path.join(targetDir, `slide-${i}.png`);
      await page.screenshot({ path: filePath, type: "png" });
      console.log(`Saved ${filePath}`);
    }
  }

  await browser.close();
  console.log("All PNG masters rendered successfully!");
}

renderAll().catch(console.error);
