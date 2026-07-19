import * as cheerio from 'cheerio';
import { JobRepository } from '@loopreel/db';
import { createQueue } from '@loopreel/queue';
import type pino from 'pino';

const MAX_TEXT_LENGTH = 100_000;
const structureQueue = createQueue('structure');

async function scrapeWithCheerioHtml(html: string): Promise<string> {
  const $ = cheerio.load(html);

  $('script, style, nav, header, footer, iframe, noscript').remove();

  const article = $('article').length > 0
    ? $('article')
    : $('main').length > 0
      ? $('main')
      : $('body');

  const textParts: string[] = [];
  article.find('h1, h2, h3, h4, p, li, blockquote').each((_i, el) => {
    const tag = $(el).prop('tagName')?.toLowerCase() ?? '';
    const text = $(el).text().trim();
    if (text.length === 0) return;

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

  return textParts.join('\n\n').trim();
}

async function scrapeWithPuppeteer(url: string, logger: pino.Logger): Promise<string> {
  const puppeteer = await import('puppeteer');
  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
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
  logger.info({ sourceUrl }, 'Scraping blog/article content');

  let rawText = '';

  try {
    const response = await fetch(sourceUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LoopreelBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(30_000),
    });

    if (response.ok) {
      const html = await response.text();
      const $ = cheerio.load(html);

      $('script, style, nav, header, footer, iframe, noscript').remove();

      const article = $('article').length > 0
        ? $('article')
        : $('main').length > 0
          ? $('main')
          : $('body');

      const textParts: string[] = [];
      article.find('h1, h2, h3, h4, p, li, blockquote').each((_i, el) => {
        const tag = $(el).prop('tagName')?.toLowerCase() ?? '';
        const text = $(el).text().trim();
        if (text.length === 0) return;

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

      rawText = textParts.join('\n\n').trim();

      if (rawText.length < 200) {
        rawText = $.text().trim();
      }
    }
  } catch (err) {
    logger.warn({ err }, 'Cheerio scrape failed, trying Puppeteer');
  }

  if (rawText.length < 200) {
    logger.info('Falling back to Puppeteer for JS-rendered content');
    try {
      rawText = await scrapeWithPuppeteer(sourceUrl, logger);
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

  logger.info({ textLength: rawText.length }, 'Content scraped');

  await JobRepository.updateStatus(jobId, 'structuring');

  await structureQueue.add(`job-${jobId}`, {
    jobId,
    rawText,
  });

  logger.info('Dispatched to structure queue');
}
