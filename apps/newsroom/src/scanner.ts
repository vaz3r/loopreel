import { XMLParser } from 'fast-xml-parser';
import { NewsroomRepository, type NewsroomStoryRow } from '@loopreel/db';
import { CONFIG } from './config.js';

export interface DiscoveredArticle {
  title: string;
  url: string;
  source: string;
  publishedAt: Date;
  snippet?: string;
  query: string;
}

export class NewsScanner {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
  }

  async scanAllFeeds(): Promise<NewsroomStoryRow[]> {
    console.log(`[NewsScanner] Scanning ${CONFIG.topicQueries.length} Google News feeds...`);
    const newArticles: NewsroomStoryRow[] = [];

    for (const query of CONFIG.topicQueries) {
      try {
        const articles = await this.fetchFeed(query);
        console.log(`[NewsScanner] Query "${query.slice(0, 45)}...": found ${articles.length} items.`);

        for (const article of articles) {
          const isSeen = await NewsroomRepository.isUrlSeen(article.url);
          if (isSeen) continue;

          // Clean headline and source
          const { cleanHeadline, outlet } = this.parseHeadlineAndSource(article.title, article.source);

          const record = await NewsroomRepository.createDiscovered({
            sourceUrl: article.url,
            sourceName: outlet || 'News Wire',
            sourceHeadline: cleanHeadline,
            sourceSnippet: article.snippet,
            sourcePublishedAt: article.publishedAt,
            metadata: {
              rawRss: {
                originalTitle: article.title,
                matchedQuery: article.query,
                foundAt: new Date().toISOString(),
              },
            },
          });

          newArticles.push(record);
        }
      } catch (err: any) {
        console.error(`[NewsScanner] Feed scan failed for query "${query}":`, err.message);
      }
    }

    console.log(`[NewsScanner] Scan complete. Ingested ${newArticles.length} new unique articles into newsroom_stories.`);
    return newArticles;
  }

  private async fetchFeed(query: string): Promise<DiscoveredArticle[]> {
    const encoded = encodeURIComponent(query);
    const feedUrl = `https://news.google.com/rss/search?q=${encoded}&hl=en-US&gl=US&ceid=US:en`;

    const res = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TheFinePrintNewsroom/1.0; +https://thefineprint.pub)',
      },
    });

    if (!res.ok) {
      throw new Error(`Google News returned HTTP ${res.status}: ${res.statusText}`);
    }

    const xmlText = await res.text();
    const parsed = this.parser.parse(xmlText);

    const items = parsed?.rss?.channel?.item;
    if (!items) return [];

    const rawList = Array.isArray(items) ? items : [items];

    return rawList.map((item: any) => {
      const title = String(item.title || '');
      const url = String(item.link || item.guid || '');
      const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
      const snippet = typeof item.description === 'string'
        ? item.description.replace(/<[^>]+>/g, '').trim()
        : undefined;

      const sourceTag = item.source;
      const sourceName = typeof sourceTag === 'object' ? sourceTag['#text'] : (typeof sourceTag === 'string' ? sourceTag : '');

      return {
        title,
        url,
        source: sourceName,
        publishedAt: pubDate,
        snippet,
        query,
      };
    });
  }

  private parseHeadlineAndSource(rawTitle: string, defaultSource: string): { cleanHeadline: string; outlet: string } {
    // Google News titles typically end with " - Publisher Name"
    const lastDash = rawTitle.lastIndexOf(' - ');
    if (lastDash !== -1) {
      const cleanHeadline = rawTitle.slice(0, lastDash).trim();
      const outlet = rawTitle.slice(lastDash + 3).trim();
      return { cleanHeadline, outlet: outlet || defaultSource };
    }
    return { cleanHeadline: rawTitle.trim(), outlet: defaultSource };
  }
}
