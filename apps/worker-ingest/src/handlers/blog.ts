import * as cheerio from 'cheerio';
import { JobRepository } from '@loopreel/db';
import { createQueue } from '@loopreel/queue';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import type pino from 'pino';

const execFileAsync = promisify(execFile);

async function resolveGoogleNewsUrl(url: string, logger: pino.Logger): Promise<string> {
  if (!url.includes('news.google.com')) return url;
  try {
    const pythonCode = `from googlenewsdecoder import gnewsdecoder\nimport sys\nres = gnewsdecoder(sys.argv[1])\nif res.get("success") or res.get("status"):\n    print(res.get("decoded_url") or "")\n`;
    const { stdout } = await execFileAsync('python3', ['-c', pythonCode, url], { timeout: 15_000 });
    const decoded = stdout.trim();
    if (decoded.startsWith('http')) {
      logger.info({ from: url, to: decoded }, 'Resolved Google News redirect to canonical article URL');
      return decoded;
    }
  } catch (err) {
    logger.warn({ err }, 'Failed to decode Google News URL, proceeding with original');
  }
  return url;
}

const DEBUG_LOG = process.env['DEBUG_LOG'] === 'true';
const DEBUG_DIR = process.env['DEBUG_DIR'] ?? '/app/debug';
const MAX_TEXT_LENGTH = 100_000;
const structureQueue = createQueue('structure');

const BOILERPLATE_LINE_PATTERNS = [
  /^advertisement$/i,
  /^share full article$/i,
  /^give this article$/i,
  /^read in app$/i,
  /^supported by$/i,
  /^sign up for/i,
  /^subscribed to/i,
  /^send any friend a story/i,
  /^live reporting has ended/i,
];

function isBoilerplateLine(text: string): boolean {
  const trimmed = text.trim();
  return BOILERPLATE_LINE_PATTERNS.some(pattern => pattern.test(trimmed));
}

async function scrapeWithCheerioHtml(html: string): Promise<string> {
  const $ = cheerio.load(html);

  // Extract article title from meta tags or main h1 before removing headers
  const metaTitle = $('meta[property="og:title"]').attr('content')?.trim()
    || $('meta[name="twitter:title"]').attr('content')?.trim();
  const mainH1 = $('h1').first().text().trim();
  const headline = metaTitle || (mainH1.length > 5 ? mainH1 : null);

  $('script, style, nav, header, footer, iframe, noscript, aside, [aria-hidden="true"], .advertisement, [data-testid*="ad"], .story-ad, [class*="advertis"], [id*="advertis"]').remove();

  const article = $('article').length > 0
    ? $('article')
    : $('main').length > 0
      ? $('main')
      : $('body');

  const textParts: string[] = [];
  article.find('h1, h2, h3, h4, p, li, blockquote').each((_i, el) => {
    const tag = $(el).prop('tagName')?.toLowerCase() ?? '';
    const text = $(el).text().trim();
    if (text.length === 0 || isBoilerplateLine(text)) return;

    if (tag.startsWith('h')) {
      textParts.push(`\n## ${text}\n`);
    } else if (tag === 'li') {
      textParts.push(`- ${text}`);
    } else if (tag === 'blockquote') {
      textParts.push(`> ${text}`);
    } else {
      textParts.push(text);
    }
  });

  let content = textParts.join('\n\n').trim();
  if (headline && !content.toLowerCase().startsWith(`# ${headline.toLowerCase()}`)) {
    content = `# ${headline}\n\n${content}`;
  }

  return content;
}

async function scrapeWithPuppeteer(url: string, logger: pino.Logger): Promise<string> {
  const puppeteer = await import('puppeteer');
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30_000 });
    const html = await page.content();
    const content = await scrapeWithCheerioHtml(html);
    logger.info({ textLength: content.length }, 'Puppeteer scrape complete');
    return content;
  } finally {
    await browser.close();
  }
}

export async function handleBlog(
  jobId: string,
  sourceUrl: string,
  logger: pino.Logger,
): Promise<void> {
  const targetUrl = await resolveGoogleNewsUrl(sourceUrl, logger);
  logger.info({ sourceUrl, targetUrl }, 'Scraping blog/article content');

  let rawText = '';

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(30_000),
    });

    if (response.ok) {
      const html = await response.text();
      rawText = await scrapeWithCheerioHtml(html);

      if (rawText.length < 200) {
        const $ = cheerio.load(html);
        rawText = $.text().trim();
      }
    }
  } catch (err) {
    logger.warn({ err }, 'Cheerio scrape failed, trying Puppeteer');
  }

  if (rawText.length < 200) {
    logger.info('Falling back to Puppeteer for JS-rendered content');
    try {
      rawText = await scrapeWithPuppeteer(targetUrl, logger);
    } catch (err) {
      logger.error({ err }, 'Puppeteer scrape also failed');
      throw new Error('Failed to scrape content with both cheerio and Puppeteer');
    }
  }

  if (rawText.length > MAX_TEXT_LENGTH) {
    rawText = rawText.substring(0, MAX_TEXT_LENGTH);
  }

  if (rawText.length < 10) {
    throw new Error('Extracted text is too short (< 10 chars)');
  }

  // Pre-structure validation: fail fast on garbage/insufficient content
  if (rawText.length < 500) {
    logger.warn({ textLength: rawText.length, sourceUrl }, 'Content too short for reliable structuring — marking failed');
    await JobRepository.updateStatus(jobId, 'failed');
    await JobRepository.markFailed(jobId, {
      stage: 'ingesting',
      reason: 'content_too_short',
      details: `Only ${rawText.length} chars scraped from ${sourceUrl}. Article may be behind a paywall, login wall, or the page returned an error. Minimum required: 500 chars.`,
    });
    return;
  }

  logger.info({ textLength: rawText.length }, 'Content scraped');

  if (DEBUG_LOG) {
    try {
      const dir = join(DEBUG_DIR, jobId);
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, '00-extracted.txt'), rawText, 'utf-8');
    } catch {
      // best effort
    }
  }

  await JobRepository.updateStatus(jobId, 'structuring');

  await structureQueue.add(`job-${jobId}`, {
    jobId,
    rawText,
  });

  logger.info('Dispatched to structure queue');
}
