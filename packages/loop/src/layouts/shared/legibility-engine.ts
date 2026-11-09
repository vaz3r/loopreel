/**
 * Optical Legibility & Pixel Density Detection Engine
 *
 * Guarantees that carousel slides designed on a 1080x1350 canvas remain fully
 * legible when displayed on real mobile viewports (e.g. iPhone 15 Pro, ~390px width)
 * and in social feed previews / profile thumbnails.
 *
 * Mobile Downscale Math:
 * Reference Canvas Width: 1080px
 * Reference Mobile Screen Width: 390px
 * Mobile Scale Ratio M = 390 / 1080 ≈ 0.3611
 */

export const REFERENCE_CANVAS_WIDTH = 1080;
export const REFERENCE_MOBILE_WIDTH = 390;
export const MOBILE_SCALE_RATIO = REFERENCE_MOBILE_WIDTH / REFERENCE_CANVAS_WIDTH; // ~0.3611

export interface LegibilityFloorConfig {
  /** Absolute minimum size for metadata, kicks, folios, tags (canvas px) */
  minMetadataPx: number; // e.g. 20px -> ~7.2px on phone
  /** Minimum size for body, descriptions, notes (canvas px) */
  minBodyPx: number; // e.g. 26px -> ~9.4px on phone
  /** Minimum size for subheadlines and abstracts (canvas px) */
  minSubheadlinePx: number; // e.g. 32px -> ~11.5px on phone
  /** Minimum size for headlines (canvas px) */
  minHeadlinePx: number; // e.g. 54px -> ~19.5px on phone
  /** Minimum size for telemetry values (canvas px) */
  minTelemetryValuePx: number; // e.g. 72px -> ~26px on phone
  /** Minimum stroke thickness for structural rules and borders (canvas px) */
  minStrokePx: number; // e.g. 1.5px -> ~0.54px on phone (prevents anti-aliased disappearance)
}

export const DEFAULT_LEGIBILITY_FLOORS: LegibilityFloorConfig = {
  minMetadataPx: 20,
  minBodyPx: 26,
  minSubheadlinePx: 32,
  minHeadlinePx: 54,
  minTelemetryValuePx: 72,
  minStrokePx: 1.5,
};

export interface LegibilityViolation {
  tagName: string;
  className: string;
  textSnippet: string;
  canvasFontSize: number;
  mobileFontSize: number;
  expectedFloor: number;
  category: 'metadata' | 'body' | 'subheadline' | 'headline' | 'telemetry' | 'stroke';
}

export interface LegibilityReport {
  passed: boolean;
  score: number; // 0 - 100
  mobileScaleRatio: number;
  totalElementsAudited: number;
  violations: LegibilityViolation[];
}

/**
 * Categorizes a DOM element based on its typography and role
 */
function categorizeElement(el: Element, fontSize: number): keyof LegibilityFloorConfig | null {
  const tag = el.tagName.toLowerCase();
  const cls = (el.className || '').toString().toLowerCase();

  if (cls.includes('value') || cls.includes('metric') || cls.includes('statvalue')) {
    return 'minTelemetryValuePx';
  }
  if (tag === 'h1' || tag === 'h2' || cls.includes('headline')) {
    return 'minHeadlinePx';
  }
  if (cls.includes('subhead') || cls.includes('abstract') || cls.includes('pullquote') || cls.includes('lead')) {
    return 'minSubheadlinePx';
  }
  if (cls.includes('kicker') || cls.includes('tag') || cls.includes('date') || cls.includes('badge') || cls.includes('folio') || cls.includes('handle') || cls.includes('index') || cls.includes('readtime')) {
    return 'minMetadataPx';
  }
  if (tag === 'p' || cls.includes('desc') || cls.includes('body') || cls.includes('label')) {
    return 'minBodyPx';
  }

  // Fallback categorization based on raw canvas font size
  if (fontSize >= 50) return 'minHeadlinePx';
  if (fontSize >= 30) return 'minSubheadlinePx';
  if (fontSize >= 24) return 'minBodyPx';
  return 'minMetadataPx';
}

/**
 * Audits a rendered slide container in the browser DOM for optical mobile legibility.
 * Can be executed in Playwright or browser environments.
 */
export function auditSlideLegibility(
  container: HTMLElement,
  floors: LegibilityFloorConfig = DEFAULT_LEGIBILITY_FLOORS
): LegibilityReport {
  const violations: LegibilityViolation[] = [];
  const allElements = container.querySelectorAll('*');
  let auditedCount = 0;

  allElements.forEach((el) => {
    // Check text elements with direct text content
    const hasDirectText = Array.from(el.childNodes).some(
      (n) => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 0
    );

    if (hasDirectText) {
      auditedCount++;
      const style = window.getComputedStyle(el);
      const fontSize = parseFloat(style.fontSize) || 0;
      const mobileSize = Number((fontSize * MOBILE_SCALE_RATIO).toFixed(2));
      const categoryKey = categorizeElement(el, fontSize);

      if (categoryKey) {
        const floor = floors[categoryKey];
        if (fontSize < floor) {
          const rawText = (el.textContent || '').trim().replace(/\s+/g, ' ');
          const textSnippet = rawText.length > 40 ? rawText.slice(0, 37) + '...' : rawText;

          violations.push({
            tagName: el.tagName.toLowerCase(),
            className: (el.className || '').toString(),
            textSnippet,
            canvasFontSize: Math.round(fontSize),
            mobileFontSize: mobileSize,
            expectedFloor: floor,
            category: categoryKey.replace('min', '').replace('Px', '').toLowerCase() as any,
          });
        }
      }
    }
  });

  const passed = violations.length === 0;
  const score = auditedCount > 0 ? Math.max(0, Math.round(((auditedCount - violations.length) / auditedCount) * 100)) : 100;

  return {
    passed,
    score,
    mobileScaleRatio: Number(MOBILE_SCALE_RATIO.toFixed(3)),
    totalElementsAudited: auditedCount,
    violations,
  };
}
