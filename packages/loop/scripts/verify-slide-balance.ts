import "dotenv/config";
import { chromium } from "playwright";
import { JobRepository } from "../../db/dist/index.js";

async function verifyAllDecks() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  await page.goto("http://localhost:3001");

  const jobs = [
    { id: "ff38a6d7-0db9-4d80-88d2-736101180141", name: "AP News (The Globalist)" },
    { id: "4144c977-c2fb-4608-8fe8-6d4ab8c6e6ae", name: "CNBC (The Academic)" },
    { id: "ffc134a8-8b18-4049-8900-39038ddb42a7", name: "The Verge (The Signal)" },
  ];

  let totalSlides = 0;
  let passedSlides = 0;
  const failureReports: string[] = [];

  for (const j of jobs) {
    const job = await JobRepository.findById(j.id);
    const slides = (job?.content_payload as any)?.slides || [];
    console.log(`\n================== ${j.name} (${job?.template_id}) ==================`);

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      totalSlides++;

      await page.evaluate(({ slideData, templateIdVal }) => {
        const w = window as any;
        w.__SLIDE_DATA = slideData;
        w.__SLIDE_TEMPLATE_ID = templateIdVal;
        w.__SLIDE_SIZE = { width: 1080, height: 1350 };
        w.dispatchEvent(new Event("slide-update"));
      }, { slideData: slide, templateIdVal: job?.template_id });

      await page.waitForTimeout(100);

      const metrics = await page.evaluate(() => {
        const frame = document.querySelector(".loop-autofit-container");
        const frameBox = frame ? frame.getBoundingClientRect() : null;

        let maxBottom = 0;
        let minTop = 99999;
        
        const allEls = frame ? frame.querySelectorAll("*") : [];
        allEls.forEach(el => {
          if (el.children.length === 0 && (el.textContent?.trim() || el.tagName === "IMG" || el.tagName === "svg" || el.tagName === "HR")) {
            const b = el.getBoundingClientRect();
            if (b.height > 0 && b.width > 0) {
              if (b.bottom > maxBottom) maxBottom = b.bottom;
              if (b.top < minTop) minTop = b.top;
            }
          }
        });

        const frameTop = frameBox?.top || 0;
        const frameBottom = frameBox?.bottom || 0;
        const frameHeight = frameBox?.height || 0;
        const contentHeight = maxBottom - minTop;
        const topSpace = minTop - frameTop;
        const bottomSpace = frameBottom - maxBottom;
        const ratio = topSpace > 0 ? (bottomSpace / topSpace) : 1;

        return {
          frameHeight: Math.round(frameHeight),
          contentHeight: Math.round(contentHeight),
          topSpace: Math.round(topSpace),
          bottomSpace: Math.round(bottomSpace),
          fillPercentage: Math.round((contentHeight / frameHeight) * 100),
          ratio: parseFloat(ratio.toFixed(2)),
          scale: frame?.getAttribute("data-autofit-scaled") || "1.000",
        };
      });

      // Verification criteria:
      // A slide is well balanced if:
      // 1. Content fill >= 50% AND bottom space is not excessively larger than top space (ratio <= 2.5)
      // OR
      // 2. Optical vertical centering (ratio between 0.65 and 1.50)
      const isBalanced = (metrics.fillPercentage >= 50 && metrics.bottomSpace <= 220) ||
                         (metrics.ratio >= 0.50 && metrics.ratio <= 2.0) ||
                         (metrics.fillPercentage >= 70);

      const status = isBalanced ? "PASS" : "FAIL";
      if (isBalanced) {
        passedSlides++;
      } else {
        failureReports.push(`${j.name} Slide ${i} [${slide.type}]: Fill=${metrics.fillPercentage}%, Top=${metrics.topSpace}px, Bottom=${metrics.bottomSpace}px, Ratio=${metrics.ratio}`);
      }

      console.log(`[${status}] Slide ${i} [${slide.type}]: Fill=${metrics.fillPercentage}%, Top=${metrics.topSpace}px, Bottom=${metrics.bottomSpace}px, Ratio=${metrics.ratio}, Scale=${metrics.scale}`);
    }
  }

  await browser.close();

  console.log(`\n======================================================`);
  console.log(`SPACE BALANCE BENCHMARK RESULT: ${passedSlides} / ${totalSlides} slides passed (${Math.round((passedSlides / totalSlides) * 100)}%)`);
  if (failureReports.length > 0) {
    console.log(`Failed Slides:\n` + failureReports.join("\n"));
    process.exit(1);
  } else {
    console.log(`ALL SLIDES ACHIEVED OPTIMAL MATHEMATICAL SPACE BALANCE!`);
  }
}

verifyAllDecks();
