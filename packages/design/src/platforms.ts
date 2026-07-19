import type { PlatformFormat } from './types.js';

export const instagramFeed: PlatformFormat = {
  id: 'instagram-feed',
  name: 'Instagram Feed',
  width: 1080,
  height: 1350,
  maxSlides: 10,
  safeZones: { top: 40, right: 40, bottom: 40, left: 40 },
  typographyScale: 1.0,
};

export const instagramStories: PlatformFormat = {
  id: 'instagram-stories',
  name: 'Instagram Stories',
  width: 1080,
  height: 1920,
  maxSlides: 10,
  safeZones: { top: 120, right: 40, bottom: 200, left: 40 },
  typographyScale: 1.1,
};

export const linkedin: PlatformFormat = {
  id: 'linkedin',
  name: 'LinkedIn',
  width: 1200,
  height: 627,
  maxSlides: 10,
  safeZones: { top: 30, right: 30, bottom: 30, left: 30 },
  typographyScale: 0.85,
};

export const facebook: PlatformFormat = {
  id: 'facebook',
  name: 'Facebook',
  width: 1200,
  height: 630,
  maxSlides: 10,
  safeZones: { top: 30, right: 30, bottom: 30, left: 30 },
  typographyScale: 0.85,
};

export const platforms: Record<string, PlatformFormat> = {
  'instagram-feed': instagramFeed,
  'instagram-stories': instagramStories,
  'linkedin': linkedin,
  'facebook': facebook,
};

export function getPlatform(id: string): PlatformFormat | undefined {
  return platforms[id];
}

export function getPlatformIds(): string[] {
  return Object.keys(platforms);
}
