import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const slides = [
  {
    "id": "slide-01",
    "tag": "FIELD ALERT",
    "note": "Status recorded: UNABLE TO EXTRACT. Keep the article's conclusions open until readable source material is available.",
    "type": "cover",
    "headline": "Stop publishing from an unreadable source.",
    "scribble": "Unreadable does not mean unimportant.",
    "footerLeft": "THE FIELD NOTES",
    "footerRight": "PAGE 01",
    "subheadline": "The source content could not be read or contains no meaningful article text. Pause before publishing from this brief.",
    "index": 0,
    "totalSlides": 5
  },
  {
    "id": "slide-02",
    "tag": "OBSERVATION",
    "note": "Keep the distinction clear: unavailable evidence does not establish what the original article says.",
    "text": "The source content could not be read or contains no meaningful article text. This describes the supplied material, not the quality of the original article. You cannot conclude that the article itself lacks substance.",
    "type": "statement",
    "headline": "What does “UNABLE TO EXTRACT” establish?",
    "scribble": "Missing text is not a finding.",
    "footerLeft": "THE FIELD NOTES",
    "footerRight": "PAGE 02",
    "index": 1,
    "totalSlides": 5
  },
  {
    "id": "slide-03",
    "tag": "EVIDENCE INVENTORY",
    "note": "These fields contain no material to support article-specific claims. Treat them as unresolved, not as findings about the original.",
    "type": "list",
    "items": [
      {
        "desc": "No key insights appear in the brief. Leave the central argument unresolved rather than assigning the article a takeaway.",
        "title": "Key insights — not supplied"
      },
      {
        "desc": "The quotations field is empty. Do not introduce a speaker's words when no passage has been provided.",
        "title": "Quotations — not supplied"
      },
      {
        "desc": "No counterpoints appear in the brief. Neither agreement nor disagreement can be established from this empty field.",
        "title": "Counterpoints — not supplied"
      },
      {
        "desc": "The hard-data field is empty, and the brief flags no real numbers. There is no supplied statistic to feature.",
        "title": "Hard data — not supplied"
      },
      {
        "desc": "No people are listed. Leave names, roles, and attribution unassigned until they can be drawn from readable material.",
        "title": "People — not supplied"
      }
    ],
    "headline": "Your evidence fields are empty.",
    "footerLeft": "THE FIELD NOTES",
    "footerRight": "PAGE 03",
    "index": 2,
    "totalSlides": 5
  },
  {
    "id": "slide-04",
    "tag": "RECOVERY ROUTE",
    "type": "sequence",
    "items": [
      {
        "num": "1",
        "desc": "Return to the original article or document so you can recover its content rather than interpret an empty brief.",
        "title": "Retrieve the original source"
      },
      {
        "num": "2",
        "desc": "Paste the article text or supply a readable document, keeping its wording and surrounding context together for review.",
        "title": "Provide readable article text"
      },
      {
        "num": "3",
        "desc": "Compare the recovered text with the original source, looking for missing passages before relying on quotations or figures.",
        "title": "Check against the original"
      },
      {
        "num": "4",
        "desc": "Use the checked text to populate the brief, including insights, quotations, counterpoints, data, and people only where supported.",
        "title": "Rebuild from supported material"
      }
    ],
    "headline": "From unreadable source to supported brief",
    "scribble": "Return to the source before interpreting.",
    "footerLeft": "THE FIELD NOTES",
    "footerRight": "PAGE 04",
    "index": 3,
    "totalSlides": 5
  },
  {
    "id": "slide-05",
    "tag": "YOUR NEXT MOVE",
    "note": "The next plan should address the article's topic using its own evidence.",
    "type": "cta",
    "subtext": "To give your readers the actual story, paste the article text or upload a readable source now. Include the passages you want covered with their surrounding context.",
    "headline": "Bring the article. Preserve its meaning.",
    "footerLeft": "THE FIELD NOTES",
    "actionLabel": "Provide readable source text",
    "footerRight": "PAGE 05",
    "index": 4,
    "totalSlides": 5
  }
];

const outDir = path.resolve('output/overflow-verification-fixed');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  
  for (const s of slides) {
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
    await page.goto('http://localhost:3001');

    await page.evaluate(async ({ slideData }) => {
      const w = window as any;
      w.__SLIDE_DATA = slideData;
      w.__SLIDE_TEMPLATE_ID = 'the-field-notes';
      w.__SLIDE_SIZE = { width: 1080, height: 1350 };
      w.dispatchEvent(new Event('slide-update'));
      if (document.fonts) {
        await document.fonts.ready;
      }
      w.dispatchEvent(new Event('slide-update'));
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    }, { slideData: s });

    await page.waitForTimeout(600);

    const metrics = await page.evaluate(() => {
      const container = document.querySelector('.loop-autofit-container') as HTMLElement;
      const content = document.querySelector('.loop-autofit-content') as HTMLElement;
      const note = document.querySelector('p[class*="note"]') as HTMLElement;

      const containerRect = container?.getBoundingClientRect();
      const contentRect = content?.getBoundingClientRect();
      const noteRect = note?.getBoundingClientRect();

      const overflowBottom = contentRect && containerRect ? Math.max(0, contentRect.bottom - containerRect.bottom) : 0;
      const noteOverflow = noteRect && containerRect ? Math.max(0, noteRect.bottom - containerRect.bottom) : 0;

      return {
        scale: container?.getAttribute('data-autofit-scaled') || '1.000',
        containerH: containerRect?.height,
        contentH: contentRect?.height,
        overflowBottom,
        noteOverflow,
        noteBottom: noteRect?.bottom,
        containerBottom: containerRect?.bottom,
      };
    });

    const shotPath = path.join(outDir, `${s.id}.png`);
    await page.screenshot({ path: shotPath });
    console.log(`[${s.id}] scale=${metrics.scale} overflowBottom=${metrics.overflowBottom.toFixed(2)}px noteOverflow=${metrics.noteOverflow.toFixed(2)}px -> Saved ${shotPath}`);

    if (metrics.overflowBottom > 0.5) {
      console.error(`FAIL: ${s.id} overflowed by ${metrics.overflowBottom}px!`);
    }

    await page.close();
  }

  // Also verify Square 1:1 on dense slide 3
  const pageSquare = await browser.newPage({ viewport: { width: 1080, height: 1080 } });
  await pageSquare.goto('http://localhost:3001');
  await pageSquare.evaluate(async ({ slideData }) => {
    const w = window as any;
    w.__SLIDE_DATA = slideData;
    w.__SLIDE_TEMPLATE_ID = 'the-field-notes';
    w.__SLIDE_SIZE = { width: 1080, height: 1080 };
    w.dispatchEvent(new Event('slide-update'));
    if (document.fonts) {
      await document.fonts.ready;
    }
    w.dispatchEvent(new Event('slide-update'));
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
  }, { slideData: slides[2] });

  await pageSquare.waitForTimeout(600);
  const sqMetrics = await pageSquare.evaluate(() => {
    const container = document.querySelector('.loop-autofit-container') as HTMLElement;
    const content = document.querySelector('.loop-autofit-content') as HTMLElement;
    const cRect = container?.getBoundingClientRect();
    const ctRect = content?.getBoundingClientRect();
    return {
      scale: container?.getAttribute('data-autofit-scaled') || '1.000',
      overflowBottom: ctRect && cRect ? Math.max(0, ctRect.bottom - cRect.bottom) : 0,
    };
  });
  const sqPath = path.join(outDir, 'slide-03-square.png');
  await pageSquare.screenshot({ path: sqPath });
  console.log(`[slide-03-square] scale=${sqMetrics.scale} overflowBottom=${sqMetrics.overflowBottom.toFixed(2)}px -> Saved ${sqPath}`);

  await browser.close();
  console.log('Verification completed successfully!');
})();
