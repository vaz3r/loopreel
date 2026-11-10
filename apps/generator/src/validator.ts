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

  // 5. Ensure Tailwind v3 CDN Script
  if (!html.includes('cdn.tailwindcss.com')) {
    warnings.push('Missing Tailwind CSS v3 CDN script; injecting.');
    // Remove outdated tailwind links if present
    html = html.replace(/<link[^>]*tailwindcss[^>]*>/gi, '');
    const tailwindScript = '<script src="https://cdn.tailwindcss.com"></script>';
    if (html.includes('</head>')) {
      html = html.replace('</head>', `${tailwindScript}\n</head>`);
    } else {
      html = `${tailwindScript}\n${html}`;
    }
  }

  // 6. Ensure Mandatory Canvas & Slide Layer CSS & Color Tokens exist
  const tokens = ['ink', 'paper', 'accent', 'surface', 'graphite', 'hairline'];
  let colorRules = '';
  for (const token of tokens) {
    const match = html.match(
      new RegExp(`(?:\\.bg-|\\.text-|\\.border-)${token}\\s*\\{\\s*(?:background-color|color|border-color):\\s*([^;\\}]+)[;\\}]`, 'i')
    );
    if (match && match[1]) {
      const val = match[1].trim();
      if (!html.includes(`.bg-${token}`)) colorRules += `    .bg-${token} { background-color: ${val} !important; }\n`;
      if (!html.includes(`.text-${token}`)) colorRules += `    .text-${token} { color: ${val} !important; }\n`;
      if (!html.includes(`.border-${token}`)) colorRules += `    .border-${token} { border-color: ${val} !important; }\n`;
    }
  }

  const mandatoryCss = `
  <style>
    .canvas-container, #export-canvas {
      width: 1080px !important;
      height: 1350px !important;
      position: relative !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      flex-shrink: 0 !important;
    }
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
${colorRules}  </style>
  `;
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${mandatoryCss}\n</head>`);
  } else {
    html = `${mandatoryCss}\n${html}`;
  }

  // 7. Count slide layers
  const slideLayerMatches = html.match(/class=["'][^"']*slide-layer[^"']*["']/gi) || [];
  const slideIdMatches = html.match(/id=["']slide-\d+["']/gi) || [];
  const slideCount = Math.max(slideLayerMatches.length, slideIdMatches.length);

  if (slideCount < 17) {
    warnings.push(`Found ${slideCount} slide layers (expected 17 canonical archetypes).`);
  }

  // 8. Check Interactive Navigation Controls
  if (!html.includes('id="slideSelector"')) {
    warnings.push('Missing interactive #slideSelector dropdown for preview navigation.');
  }
  if (!html.includes('id="modeToggle"')) {
    warnings.push('Missing interactive #modeToggle button for preview/export scaling.');
  }

  // 9. Check Monumental Typographic Scale
  const hasMonumentalHeading = /text-\[(?:1[1-9]\d|[2-9]\d{2})px\]/.test(html);
  if (!hasMonumentalHeading) {
    warnings.push('No headline >= 110px detected; verify typographic scale contrast on 1080x1350 canvas.');
  }

  // 10. Check Tailwind and Google Fonts
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
