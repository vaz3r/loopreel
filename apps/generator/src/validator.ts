export interface ValidationResult {
  valid: boolean;
  html: string;
  slideCount: number;
  warnings: string[];
  errors: string[];
}

export function cleanAndValidateHtml(rawText: string): ValidationResult {
  const warnings: string[] = [];
  const errors: string[] = [];

  // 1. Strip markdown fences if present
  let html = rawText.trim();
  if (html.startsWith('```html')) {
    html = html.replace(/^```html\s*/i, '');
  } else if (html.startsWith('```')) {
    html = html.replace(/^```\s*/i, '');
  }
  if (html.endsWith('```')) {
    html = html.replace(/\s*```$/i, '');
  }
  html = html.trim();

  // 2. Check DOCTYPE and HTML tags
  if (!html.toLowerCase().includes('<!doctype html>')) {
    warnings.push('Missing <!DOCTYPE html> declaration at start; prepending.');
    html = `<!DOCTYPE html>\n${html}`;
  }
  if (!html.toLowerCase().includes('<html')) {
    errors.push('Missing <html> root element.');
  }
  if (!html.toLowerCase().includes('</html>')) {
    warnings.push('Missing closing </html> tag; appending.');
    html = `${html}\n</html>`;
  }

  // 3. Check canvas-container specification
  if (!html.includes('canvas-container')) {
    errors.push('Missing .canvas-container element.');
  }
  if (!html.includes('1080') || !html.includes('1350')) {
    warnings.push('1080x1350 dimensions not explicitly referenced in canvas styles.');
  }

  // 4. Count slide layers
  const slideLayerMatches = html.match(/class=["'][^"']*slide-layer[^"']*["']/gi) || [];
  const slideIdMatches = html.match(/id=["']slide-\d+["']/gi) || [];
  const slideCount = Math.max(slideLayerMatches.length, slideIdMatches.length);

  if (slideCount < 6) {
    warnings.push(`Only found ${slideCount} slide layers (expected at least 6 to 8).`);
  }

  // 5. Check Tailwind and Google Fonts
  if (!html.includes('cdn.tailwindcss.com')) {
    warnings.push('Missing Tailwind CSS CDN script tag.');
  }
  if (!html.includes('fonts.googleapis.com')) {
    warnings.push('Missing Google Fonts link.');
  }

  const valid = errors.length === 0;

  return {
    valid,
    html,
    slideCount,
    warnings,
    errors,
  };
}
