import * as cheerio from 'cheerio';
import { execFile, execSync } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export interface ArticleIntel {
  url: string;
  canonicalUrl: string;
  title: string;
  publisher: string;
  byline?: string;
  publishedDate?: string;
  cleanText: string;
  summary: string;
  extractedQuotes: string[];
  extractedMetrics: string[];
}

const BOILERPLATE_PATTERNS = [
  /^advertisement$/i,
  /^share full article$/i,
  /^give this article$/i,
  /^read in app$/i,
  /^supported by$/i,
  /^sign up for/i,
  /^subscribed to/i,
  /^send any friend a story/i,
  /^cookie policy/i,
  /^all rights reserved/i,
  /^newsletter/i,
  /^privacy policy/i,
];

function isBoilerplate(text: string): boolean {
  const trimmed = text.trim();
  if (trimmed.length < 4) return true;
  return BOILERPLATE_PATTERNS.some((p) => p.test(trimmed));
}

export async function resolveGoogleNewsUrl(url: string): Promise<string> {
  if (!url.includes('news.google.com')) return url;
  try {
    const pythonCode = `from googlenewsdecoder import gnewsdecoder\nimport sys\nres = gnewsdecoder(sys.argv[1])\nif res.get("success") or res.get("status"):\n    print(res.get("decoded_url") or "")\n`;
    const { stdout } = await execFileAsync('python3', ['-c', pythonCode, url], {
      timeout: 15_000,
    });
    const decoded = stdout.trim();
    if (decoded.startsWith('http')) {
      console.log(`[Ingest] Resolved Google News URL -> ${decoded}`);
      return decoded;
    }
  } catch (err) {
    console.warn('[Ingest] Failed to decode Google News redirect via python, using original URL:', err);
  }
  return url;
}

export async function fetchHtml(url: string): Promise<string> {
  // Use curl with realistic browser headers for maximum reliability
  const userAgent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
  try {
    const html = execSync(
      `curl -sL -m 20 -H "User-Agent: ${userAgent}" -H "Accept: text/html,application/xhtml+xml" "${url}"`,
      { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
    );
    return html;
  } catch (err: any) {
    throw new Error(`Failed to fetch article from ${url}: ${err.message}`);
  }
}

export function extractArticleFromHtml(html: string, url: string): ArticleIntel {
  const $ = cheerio.load(html);

  // 1. Extract Title
  const metaTitle =
    $('meta[property="og:title"]').attr('content')?.trim() ||
    $('meta[name="twitter:title"]').attr('content')?.trim();
  const h1 = $('h1').first().text().trim();
  const docTitle = $('title').text().trim();
  const rawTitle = metaTitle || (h1.length > 5 ? h1 : docTitle) || 'Untitled Article';
  const title = rawTitle.replace(/\s*[|•–—]\s*.*$/, '').replace(/\s+-\s+.*$/, '').trim();

  // 2. Extract Publisher / Source
  let publisher =
    $('meta[property="og:site_name"]').attr('content')?.trim() ||
    $('meta[name="application-name"]').attr('content')?.trim();
  if (!publisher) {
    try {
      const hostname = new URL(url).hostname.replace(/^www\./, '');
      publisher = hostname.charAt(0).toUpperCase() + hostname.slice(1).replace(/\..*$/, '');
    } catch {
      publisher = 'The Daily Briefing';
    }
  }

  // 3. Extract Author / Byline
  const byline =
    $('meta[name="author"]').attr('content')?.trim() ||
    $('[itemprop="author"]').first().text().trim() ||
    $('[rel="author"]').first().text().trim() ||
    $('.author-name').first().text().trim() ||
    $('.byline').first().text().trim() ||
    undefined;

  // 4. Extract Published Date
  const publishedDate =
    $('meta[property="article:published_time"]').attr('content')?.trim() ||
    $('time').first().attr('datetime')?.trim() ||
    $('time').first().text().trim() ||
    undefined;

  // 5. Clean Article Body
  $(
    'script, style, nav, header, footer, iframe, noscript, aside, form, svg, [aria-hidden="true"], .advertisement, [data-testid*="ad"], .story-ad, [class*="advertis"], [id*="advertis"], .social-share, .comments'
  ).remove();

  const paragraphs: string[] = [];
  $('article p, main p, .article-content p, .post-content p, p').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text.length > 30 && !isBoilerplate(text)) {
      paragraphs.push(text);
    }
  });

  const cleanText = paragraphs.slice(0, 40).join('\n\n');
  const summary = paragraphs.slice(0, 3).join(' ');

  // 6. Extract Quotes
  const extractedQuotes: string[] = [];
  $('blockquote, q').each((_, el) => {
    const qText = $(el).text().trim();
    if (qText.length > 25 && qText.length < 280) {
      extractedQuotes.push(qText);
    }
  });

  // Also regex search for quotes in paragraphs
  const quoteRegex = /"([^"]{25,250})"/g;
  let qMatch: RegExpExecArray | null;
  while ((qMatch = quoteRegex.exec(cleanText)) !== null && extractedQuotes.length < 6) {
    if (qMatch[1]) extractedQuotes.push(qMatch[1].trim());
  }

  // 7. Extract Numerical Metrics
  const extractedMetrics: string[] = [];
  const metricRegex = /(?:\$|\+|\-)?\b\d+(?:\.\d+)?(?:\%|x|\s*(?:billion|million|trillion|percent|users|basis points|hours|days|ms))\b/gi;
  let mMatch: RegExpExecArray | null;
  while ((mMatch = metricRegex.exec(cleanText)) !== null && extractedMetrics.length < 10) {
    if (mMatch[0]) extractedMetrics.push(mMatch[0].trim());
  }

  return {
    url,
    canonicalUrl: url,
    title,
    publisher,
    byline,
    publishedDate,
    cleanText: cleanText.slice(0, 30_000),
    summary: summary.slice(0, 1000),
    extractedQuotes: Array.from(new Set(extractedQuotes)).slice(0, 5),
    extractedMetrics: Array.from(new Set(extractedMetrics)).slice(0, 8),
  };
}

export async function ingestArticle(url: string): Promise<ArticleIntel> {
  console.log(`[Ingest] Ingesting URL: ${url}`);
  const canonicalUrl = await resolveGoogleNewsUrl(url);
  const html = await fetchHtml(canonicalUrl);
  const article = extractArticleFromHtml(html, canonicalUrl);
  article.url = url;

  console.log(`[Ingest] Ingested successfully:`);
  console.log(`  Title:     ${article.title}`);
  console.log(`  Publisher: ${article.publisher}`);
  console.log(`  Author:    ${article.byline || 'Staff Bureau'}`);
  console.log(`  Length:    ${article.cleanText.length} characters`);
  console.log(`  Quotes:    ${article.extractedQuotes.length} extracted`);
  console.log(`  Metrics:   ${article.extractedMetrics.length} extracted`);

  return article;
}
