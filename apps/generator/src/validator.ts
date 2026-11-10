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

  // 4. Check Global Placards (Masthead & Folio)
  if (!html.includes('page-num')) {
    warnings.push('Missing dynamic folio indicator (#page-num) in global frame.');
  }

  // 5. Ensure Mandatory Slide Layer CSS exists
  if (!html.includes('.slide-layer {') || !html.includes('inset: 0')) {
    const slideLayerCss = `
    <style>
      .slide-layer {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
      }
      .slide-layer.active {
        display: flex;
        flex-direction: column;
      }
    </style>
    `;
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${slideLayerCss}\n</head>`);
    } else {
      html = `${slideLayerCss}\n${html}`;
    }
  }

  // 6. Count slide layers
  const slideLayerMatches = html.match(/class=["'][^"']*slide-layer[^"']*["']/gi) || [];
  const slideIdMatches = html.match(/id=["']slide-\d+["']/gi) || [];
  const slideCount = Math.max(slideLayerMatches.length, slideIdMatches.length);

  if (slideCount < 8) {
    warnings.push(`Found ${slideCount} slide layers (expected 8 core archetypes).`);
  }

  // 6. Check Monumental Typographic Scale
  const hasMonumentalHeading = /text-\[(?:1[1-9]\d|[2-9]\d{2})px\]/.test(html);
  if (!hasMonumentalHeading) {
    warnings.push('No headline >= 110px detected; verify typographic scale contrast on 1080x1350 canvas.');
  }

  // 7. Check Tailwind and Google Fonts
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
