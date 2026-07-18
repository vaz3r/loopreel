import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  isArray: (name) => [
    'point',
    'bullet',
    'slide',
    'color',
    'shape',
  ].includes(name),
  trimValues: true,
});

export function parseXml<T>(xml: string): T {
  let cleaned = xml.trim();
  if (cleaned.startsWith('```xml')) {
    cleaned = cleaned.slice(6);
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith('```')) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();

  // Strip only EXACT HTML tags — not XML elements like <body>, <bullet>, <brand>, <brandProfile>
  cleaned = cleaned.replace(/<\/?h[1-6][^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/?p[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/?strong[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/?em[^>]*>/gi, '');
  // <b> and </b> only (no attributes after b, no "ody" etc.)
  cleaned = cleaned.replace(/<(\/?)b>/gi, '');
  cleaned = cleaned.replace(/<(\/?)i>/gi, '');

  return parser.parse(cleaned) as T;
}

export function extractText(value: unknown): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object' && value !== null && '#text' in value) {
    return String((value as Record<string, unknown>)['#text']);
  }
  return '';
}

export function extractString(obj: Record<string, unknown>, key: string): string {
  const value = obj[key];
  return extractText(value);
}

export function extractNumber(obj: Record<string, unknown>, key: string): number {
  const str = extractString(obj, key);
  return Number(str) || 0;
}

export function extractArray<T>(
  obj: Record<string, unknown>,
  key: string,
  mapper: (item: Record<string, unknown>) => T
): T[] {
  const value = obj[key];
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    if (typeof item === 'object' && item !== null) {
      return mapper(item as Record<string, unknown>);
    }
    return mapper({ '#text': item } as Record<string, unknown>);
  });
}
