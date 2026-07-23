export type PlatformId = 'instagram-feed' | 'instagram-square' | 'instagram-story' | 'linkedin' | 'x' | 'facebook';

export interface Platform {
  id: PlatformId;
  width: number;
  height: number;
  label: string;
  shortLabel: string;
}

export const PLATFORMS: Record<PlatformId, Platform> = {
  'instagram-feed':   { id: 'instagram-feed',   width: 1080, height: 1350, label: 'Instagram Feed (4:5)',     shortLabel: 'Feed' },
  'instagram-square': { id: 'instagram-square',  width: 1080, height: 1080, label: 'Instagram Square (1:1)',   shortLabel: 'Square' },
  'instagram-story':  { id: 'instagram-story',   width: 1080, height: 1920, label: 'Instagram Story (9:16)',   shortLabel: 'Story' },
  'linkedin':         { id: 'linkedin',          width: 1200, height: 627,  label: 'LinkedIn (1.91:1)',        shortLabel: 'LinkedIn' },
  'x':               { id: 'x',                width: 1600, height: 900,  label: 'X / Twitter (16:9)',       shortLabel: 'X' },
  'facebook':         { id: 'facebook',          width: 1200, height: 630,  label: 'Facebook (1.91:1)',        shortLabel: 'Facebook' },
};

export const PLATFORM_IDS = Object.keys(PLATFORMS);
export const DEFAULT_PLATFORM = 'instagram-feed';

export function getPlatform(id: string): Platform {
  return PLATFORMS[id as PlatformId] ?? PLATFORMS[DEFAULT_PLATFORM];
}
