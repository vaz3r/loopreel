import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface VisualAuditResult {
  templateSlug: string;
  slideCount: number;
  totalCollisions: number;
  passed: boolean;
  errors: string[];
  warnings: string[];
  screenshotsDir: string;
}

export async function auditTemplateStudio(
  templateSlug: string,
  slideCount: number,
  options: { baseUrl?: string; deviceScaleFactor?: number; platform?: string } = {}
): Promise<VisualAuditResult> {
  const baseUrl = options.baseUrl || 'http://localhost:5175/studio';
  const screenshotsDir = path.resolve(__dirname, `../templates/${templateSlug}/screenshots`);
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const activePlatform = options.platform || 'instagram-feed';
  const width = 1080;
  const height = activePlatform === 'instagram-stories' ? 1920 : activePlatform === 'instagram-square' ? 1080 : 1350;

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: options.deviceScaleFactor || 1,
  });

  const errors: string[] = [];
  const warnings: string[] = [];
  let totalCollisions = 0;

  try {
    for (let i = 0; i < slideCount; i++) {
      const url = baseUrl.includes('/studio')
        ? `${baseUrl}?template=${templateSlug}&slide=${i}&mode=1:1&export=true&platform=${activePlatform}`
        : `${baseUrl}/?template=${templateSlug}&slide=${i}&mode=1:1&export=true&platform=${activePlatform}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(300); // Allow fonts and AutoFit to settle

      // Detect Vite compilation / runtime error overlay immediately
      const viteOverlay = await page.$('vite-error-overlay');
      if (viteOverlay) {
        const overlayText = await page.evaluate(() => {
          const overlay = document.querySelector('vite-error-overlay');
          const body = overlay?.shadowRoot?.querySelector('.message-body')?.textContent?.trim();
          return body || overlay?.shadowRoot?.textContent?.trim() || 'Vite React Babel compilation error';
        });
        errors.push(`Slide ${i + 1}: Compilation Error Overlay: ${overlayText.slice(0, 300)}`);
        totalCollisions++;
        continue;
      }

      const canvasExists = await page.$('.slide-canvas');
      if (!canvasExists) {
        errors.push(`Slide ${i + 1}: Slide canvas (.slide-canvas) was not rendered into the DOM`);
        totalCollisions++;
        continue;
      }

      // Run collision & balance audit on the rendered slide
      const audit = await page.evaluate((slideIdx) => {
        const collisions: string[] = [];
        const canvas = document.querySelector('.slide-canvas');
        if (!canvas) {
          return { collisions: ['Slide canvas not found in DOM'], fillPercent: 0, scale: '1.000' };
        }

        const autoFit = canvas.querySelector('.loop-autofit-container');
        const scale = autoFit?.getAttribute('data-autofit-scaled') || '1.000';

        // Check text overflow / clipping
        const textNodes = canvas.querySelectorAll('h1, h2, h3, h4, p, span, blockquote');
        textNodes.forEach((node) => {
          const el = node as HTMLElement;
          // Ignore screen-reader only elements and hidden elements
          if (el.classList.contains('sr-only') || el.closest('.sr-only')) return;
          const style = window.getComputedStyle(el);
          if (style.display === 'none' || style.visibility === 'hidden') return;

          if (el.scrollWidth > el.clientWidth + 4) {
            collisions.push(
              `Slide ${slideIdx + 1}: Text clipped in <${el.tagName.toLowerCase()}> "${el.textContent?.slice(0, 30)}..." (scrollWidth ${el.scrollWidth} > clientWidth ${el.clientWidth})`
            );
          }

          // Check mobile legibility floor (0.36x phone scale rule: font < 12px is illegible on mobile)
          const text = el.childNodes.length === 1 && el.childNodes[0]?.nodeType === 3 ? el.textContent?.trim() : '';
          // Ignore frame header and footer elements outside main content
          const isInsideMain = !!el.closest('main');
          if (isInsideMain && text && text.length > 1) {
            const fontSize = parseFloat(style.fontSize);
            if (fontSize < 12) {
              collisions.push(
                `Slide ${slideIdx + 1}: Text too small for mobile (${fontSize}px < 12px floor): <${el.tagName.toLowerCase()}> "${text.slice(0, 30)}..."`
              );
            }
          }
        });

        // Check for banned overflow-hidden on the slide section
        const topSection = canvas.querySelector('main section');
        if (topSection) {
          const secStyle = window.getComputedStyle(topSection);
          if (secStyle.overflow === 'hidden' || secStyle.overflowY === 'hidden') {
            collisions.push(
              `Slide ${slideIdx + 1}: Main <section> has overflow:hidden which risks clipping cards/elements. Size content naturally without overflow:hidden.`
            );
          }
        }

        // Check container boundary overflow
        const canvasRect = canvas.getBoundingClientRect();
        const allElements = canvas.querySelectorAll('h1, h2, h3, h4, p, div, span, blockquote, article, section');
        allElements.forEach((node) => {
          const el = node as HTMLElement;
          if (el.classList.contains('sr-only') || el.closest('.sr-only')) return;
          const rect = el.getBoundingClientRect();
          if (rect.right > canvasRect.right + 6) {
            collisions.push(
              `Slide ${slideIdx + 1}: Element overflows canvas right by ${Math.round(rect.right - canvasRect.right)}px: <${el.tagName.toLowerCase()}> "${el.textContent?.slice(0, 25)}..."`
            );
          }
          if (rect.bottom > canvasRect.bottom + 6) {
            collisions.push(
              `Slide ${slideIdx + 1}: Element overflows canvas bottom by ${Math.round(rect.bottom - canvasRect.bottom)}px: <${el.tagName.toLowerCase()}> "${el.textContent?.slice(0, 25)}..."`
            );
          }
        });

        // Check multi-column card/column boundary overflow
        const columnCards = canvas.querySelectorAll('article, [class*="col-"], [class*="grid-cols"] > div');
        columnCards.forEach((card) => {
          const cardRect = card.getBoundingClientRect();
          if (cardRect.width < canvasRect.width - 100) {
            const cardChildren = card.querySelectorAll('h1, h2, h3, h4, p, span');
            cardChildren.forEach((child) => {
              const el = child as HTMLElement;
              if (el.classList.contains('sr-only') || el.closest('.sr-only')) return;
              const childRect = el.getBoundingClientRect();
              if (childRect.right > cardRect.right + 8) {
                collisions.push(
                  `Slide ${slideIdx + 1}: Element overflows column/card right boundary by ${Math.round(childRect.right - cardRect.right)}px: <${el.tagName.toLowerCase()}> "${el.textContent?.slice(0, 25)}..."`
                );
              }
            });
          }
        });

        // Check for empty vertical voids in content (gap > 180px between consecutive in-flow children)
        const content = canvas.querySelector('.loop-autofit-content');
        const contentChildren = content
          ? Array.from(content.children[0]?.children || []).filter((el) => {
              const style = window.getComputedStyle(el as Element);
              const height = (el as HTMLElement).offsetHeight || (el as Element).getBoundingClientRect().height || 0;
              return style.position !== 'absolute' && style.display !== 'none' && height > 10;
            })
          : [];
        if (contentChildren.length >= 2) {
          for (let c = 0; c < contentChildren.length - 1; c++) {
            const r1 = (contentChildren[c] as HTMLElement).getBoundingClientRect();
            const r2 = (contentChildren[c + 1] as HTMLElement).getBoundingClientRect();
            const gap = r2.top - r1.bottom;
            if (gap > 180) {
              collisions.push(
                `Slide ${slideIdx + 1}: Empty vertical void of ${Math.round(gap)}px detected between elements`
              );
            }
          }
        }

        // Check space balance
        const contentRect = content?.getBoundingClientRect();
        const fillPercent = contentRect ? Math.round((contentRect.height / canvasRect.height) * 100) : 75;

        return { collisions, fillPercent, scale };
      }, i);

      if (audit.collisions.length > 0) {
        totalCollisions += audit.collisions.length;
        errors.push(...audit.collisions);
      }

      const numericScale = parseFloat(audit.scale);
      if (numericScale < 0.88) {
        errors.push(
          `Slide ${i + 1}: AutoFit scale ${audit.scale} is below 0.88 threshold (content too dense / excessive vertical height)`
        );
      } else if (numericScale < 0.95) {
        warnings.push(`Slide ${i + 1}: AutoFit slightly scaled (${audit.scale})`);
      }

      if (audit.fillPercent < 60) {
        warnings.push(`Slide ${i + 1}: Low space utilization (${audit.fillPercent}% fill)`);
      }

      // Capture screenshot
      const screenshotPath = path.join(screenshotsDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
      await page.screenshot({ path: screenshotPath, type: 'png' });
    }
  } catch (err: any) {
    errors.push(`Visual audit failed: ${err.message}`);
  } finally {
    await browser.close();
  }

  return {
    templateSlug,
    slideCount,
    totalCollisions,
    passed: totalCollisions === 0 && errors.length === 0,
    errors,
    warnings,
    screenshotsDir,
  };
}
