import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

export interface CollisionIssue {
  slideNumber: number;
  elementA: string;
  elementB: string;
  overlapArea: number;
}

export interface SlideAudit {
  slideNumber: number;
  fillRatio: number;
  collisions: CollisionIssue[];
  screenshotPath?: string;
}

export interface AuditReport {
  passed: boolean;
  slideCount: number;
  slides: SlideAudit[];
  totalCollisions: number;
  minFillRatio: number;
  warnings: string[];
  errors: string[];
}

export async function auditTemplateHtml(
  htmlFilePath: string,
  options?: { screenshotDir?: string; failOnCollision?: boolean }
): Promise<AuditReport> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1600 } });
  
  const warnings: string[] = [];
  const errors: string[] = [];
  const slidesAudit: SlideAudit[] = [];

  try {
    await page.goto(`file://${path.resolve(htmlFilePath)}`, { waitUntil: 'networkidle' });

    // Force export mode (100% scale, 1080x1350)
    await page.evaluate(() => {
      const canvas = document.getElementById('export-canvas') || document.querySelector('.canvas-container');
      if (canvas instanceof HTMLElement) {
        canvas.style.transform = 'scale(1)';
        canvas.style.margin = '0 auto';
        canvas.classList.remove('mode-preview');
        canvas.classList.add('mode-export');
      }
    });

    const slideCount = await page.evaluate(() => document.querySelectorAll('.slide-layer').length);

    if (options?.screenshotDir && !fs.existsSync(options.screenshotDir)) {
      fs.mkdirSync(options.screenshotDir, { recursive: true });
    }

    for (let i = 0; i < slideCount; i++) {
      // Activate only slide i
      await page.evaluate((idx) => {
        const slides = document.querySelectorAll('.slide-layer');
        slides.forEach((s, sIdx) => {
          if (s instanceof HTMLElement) {
            if (sIdx === idx) {
              s.classList.add('active');
              s.style.display = 'flex';
              s.style.opacity = '1';
              s.style.visibility = 'visible';
            } else {
              s.classList.remove('active');
              s.style.display = 'none';
              s.style.opacity = '0';
              s.style.visibility = 'hidden';
            }
          }
        });
        const pageNum = document.getElementById('page-num');
        if (pageNum) pageNum.textContent = String(idx + 1).padStart(2, '0');
      }, i);

      await page.waitForTimeout(200);

      let screenshotPath: string | undefined;
      if (options?.screenshotDir) {
        const canvasEl = page.locator('#export-canvas');
        screenshotPath = path.join(options.screenshotDir, `slide-${i + 1}.png`);
        await canvasEl.screenshot({ path: screenshotPath });
      }

      // Audit DOM geometry inside current active slide
      const slideAnalysis = await page.evaluate((slideIdx) => {
        const slide = document.querySelectorAll('.slide-layer')[slideIdx];
        if (!slide) return { fillRatio: 0, collisions: [] };

        // 1. Gather all meaningful text/content leaf elements
        const allCandidates = Array.from(
          slide.querySelectorAll('h1, h2, h3, h4, p, span, blockquote, a, button, div')
        );
        const elements = allCandidates.filter((el) => {
          if (!(el instanceof HTMLElement)) return false;
          const rect = el.getBoundingClientRect();
          if (rect.width < 5 || rect.height < 5) return false;
          // Must have text
          if (!el.textContent?.trim()) return false;
          // Must not have block-level child elements with text (we want the innermost/leaf blocks)
          const hasInnerBlock = Array.from(el.children).some(
            (c) => c instanceof HTMLElement && c.textContent?.trim() && ['DIV', 'P', 'H1', 'H2', 'H3', 'H4', 'BLOCKQUOTE'].includes(c.tagName)
          );
          if (hasInnerBlock) return false;
          return true;
        }) as HTMLElement[];

        // 2. Measure vertical space fill
        let minTop = Infinity;
        let maxBottom = -Infinity;
        elements.forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < minTop) minTop = r.top;
          if (r.bottom > maxBottom) maxBottom = r.bottom;
        });

        const safeHeight = 1070; // 1350 - 150 (top) - 130 (bottom)
        const contentHeight = maxBottom > minTop ? maxBottom - minTop : 0;
        const fillRatio = Math.min(1, Math.max(0, contentHeight / safeHeight));

        // 3. Collision detection between non-nested elements
        const collisions: Array<{ elementA: string; elementB: string; overlapArea: number }> = [];

        for (let a = 0; a < elements.length; a++) {
          for (let b = a + 1; b < elements.length; b++) {
            const elA = elements[a]!;
            const elB = elements[b]!;

            // Ignore parent-child relationships
            if (elA.contains(elB) || elB.contains(elA)) continue;

            const rA = elA.getBoundingClientRect();
            const rB = elB.getBoundingClientRect();

            // Calculate overlap
            const xOverlap = Math.max(0, Math.min(rA.right, rB.right) - Math.max(rA.left, rB.left));
            const yOverlap = Math.max(0, Math.min(rA.bottom, rB.bottom) - Math.max(rA.top, rB.top));
            const overlapArea = xOverlap * yOverlap;

            // Flag if overlap is significant (> 150 square pixels)
            if (overlapArea > 150) {
              const labelA = `${elA.tagName.toLowerCase()}: "${(elA.textContent || '').trim().slice(0, 30)}"`;
              const labelB = `${elB.tagName.toLowerCase()}: "${(elB.textContent || '').trim().slice(0, 30)}"`;
              collisions.push({ elementA: labelA, elementB: labelB, overlapArea });
            }
          }
        }

        return { fillRatio, collisions };
      }, i);

      const slideCollisions: CollisionIssue[] = slideAnalysis.collisions.map((c) => ({
        slideNumber: i + 1,
        elementA: c.elementA,
        elementB: c.elementB,
        overlapArea: c.overlapArea,
      }));

      if (slideAnalysis.fillRatio < 0.60) {
        warnings.push(`Slide ${i + 1} has low vertical space fill (${Math.round(slideAnalysis.fillRatio * 100)}% < 60%).`);
      }

      if (slideCollisions.length > 0) {
        const colDesc = slideCollisions
          .map((c) => `[Slide ${c.slideNumber}] ${c.elementA} overlaps with ${c.elementB}`)
          .join('; ');
        errors.push(`Collisions detected on Slide ${i + 1}: ${colDesc}`);
      }

      slidesAudit.push({
        slideNumber: i + 1,
        fillRatio: slideAnalysis.fillRatio,
        collisions: slideCollisions,
        screenshotPath,
      });
    }

    const totalCollisions = slidesAudit.reduce((acc, s) => acc + s.collisions.length, 0);
    const minFillRatio = Math.min(...slidesAudit.map((s) => s.fillRatio));
    const passed = totalCollisions === 0;

    return {
      passed,
      slideCount,
      slides: slidesAudit,
      totalCollisions,
      minFillRatio,
      warnings,
      errors,
    };
  } finally {
    await browser.close();
  }
}
