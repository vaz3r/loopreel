/**
 * Deterministic input validation — runs BEFORE any LLM calls.
 * Prevents wasting LLM cost on garbage/empty/error-page input.
 */

export interface InputValidationResult {
  valid: boolean;
  reason?: string;
  details?: string;
  textLength: number;
  lineCount: number;
  bodyLineCount: number;
}

const ERROR_PAGE_SIGNALS = [
  '404', '403', '401', '500', '502', '503',
  'not found', 'page not found', 'does not exist',
  'error loading', 'access denied', 'forbidden',
  'internal server error', 'bad gateway', 'service unavailable',
  'this page could not be found', 'no longer available',
  'this content is not available', 'sign in to confirm',
];

const NAVIGATION_NOISE_PATTERNS = [
  /^skip to (main|content|navigation)/i,
  /^(menu|navigation|nav|home|about|contact|search|login|sign in|sign up|subscribe)$/i,
  /^(cookie|privacy|terms|policy|legal|copyright|all rights reserved)$/i,
  /^(share|tweet|pin|email|print|comment|reply|like|follow)$/i,
  /^(loading|please wait|redirecting)/i,
];

/**
 * Validate raw text input before LLM pipeline.
 * Returns validation result with reason if invalid.
 */
export function validateInput(rawText: string): InputValidationResult {
  const textLength = rawText.length;
  const lines = rawText.split('\n');
  const lineCount = lines.length;

  // 1. Minimum length — real articles are always >500 chars
  if (textLength < 500) {
    return {
      valid: false,
      reason: 'input_too_short',
      details: `Only ${textLength} chars extracted. Article may be behind a paywall, login wall, or the page returned an error.`,
      textLength,
      lineCount,
      bodyLineCount: 0,
    };
  }

  // 2. Content structure — expect meaningful body paragraphs
  const bodyLines = lines.filter(l => {
    const trimmed = l.trim();
    return trimmed.length > 50 && !NAVIGATION_NOISE_PATTERNS.some(p => p.test(trimmed));
  });
  const bodyLineCount = bodyLines.length;

  if (bodyLineCount < 3) {
    return {
      valid: false,
      reason: 'insufficient_content',
      details: `Only ${bodyLineCount} substantial text blocks found. Page may contain mostly navigation, scripts, or error messages.`,
      textLength,
      lineCount,
      bodyLineCount,
    };
  }

  // 3. Error page detection — multiple error signals
  const lowerText = rawText.toLowerCase();
  const errorHits = ERROR_PAGE_SIGNALS.filter(s => lowerText.includes(s));

  if (errorHits.length >= 2) {
    return {
      valid: false,
      reason: 'error_page_detected',
      details: `Detected error page indicators: ${errorHits.slice(0, 3).join(', ')}`,
      textLength,
      lineCount,
      bodyLineCount,
    };
  }

  // 4. Ratio check — if text is mostly short lines (nav/menu), it's noise
  const shortLineRatio = lines.filter(l => l.trim().length < 20).length / Math.max(lineCount, 1);
  if (shortLineRatio > 0.85 && textLength < 2000) {
    return {
      valid: false,
      reason: 'navigation_noise',
      details: `${Math.round(shortLineRatio * 100)}% of lines are very short (<20 chars). Page likely contains navigation/menu content, not an article.`,
      textLength,
      lineCount,
      bodyLineCount,
    };
  }

  return {
    valid: true,
    textLength,
    lineCount,
    bodyLineCount,
  };
}
