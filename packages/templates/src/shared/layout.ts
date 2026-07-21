export { hexToRgba, clampFontSize } from '@loopreel/design';

export const FORMAT_DIMENSIONS: Record<string, { width: number; height: number; formatClass: 'tall' | 'wide' }> = {
  square: { width: 1080, height: 1080, formatClass: 'tall' },
  portrait: { width: 1080, height: 1350, formatClass: 'tall' },
  story: { width: 1080, height: 1920, formatClass: 'tall' },
  landscape: { width: 1200, height: 627, formatClass: 'wide' },
};

export type SlideFormat = keyof typeof FORMAT_DIMENSIONS;

export function formatFromPlatform(platform: string): SlideFormat {
  const map: Record<string, SlideFormat> = {
    'instagram-feed': 'portrait',
    'instagram-stories': 'story',
    'linkedin': 'landscape',
    'facebook': 'landscape',
  };
  return map[platform] ?? 'portrait';
}
