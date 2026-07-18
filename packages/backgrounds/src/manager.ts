import * as unsplash from './unsplash.js';

export type BackgroundType = 'image' | 'gradient' | 'pattern' | 'solid';

export interface BackgroundRequest {
  type: BackgroundType;
  searchQuery?: string;
  gradientId?: string;
  patternId?: string;
  solidColor?: string;
  width?: number;
  height?: number;
  blur?: number;
  overlay?: string;
}

export interface BackgroundResult {
  type: BackgroundType;
  imageUrl?: string;
  imageAttribution?: string;
  gradientCss?: string;
  patternCss?: string;
  solidColor?: string;
  blur: number;
  overlay: string;
}

const imageCache = new Map<string, unsplash.UnsplashPhoto>();

export async function fetchBackground(request: BackgroundRequest): Promise<BackgroundResult> {
  const {
    type,
    searchQuery,
    width = 1080,
    blur = 0,
    overlay = 'rgba(0,0,0,0.3)',
  } = request;

  switch (type) {
    case 'image':
      return fetchImageBackground(searchQuery ?? 'abstract', width, blur, overlay);

    case 'gradient':
      return {
        type: 'gradient',
        blur: 0,
        overlay: 'transparent',
      };

    case 'pattern':
      return {
        type: 'pattern',
        blur: 0,
        overlay: 'transparent',
      };

    case 'solid':
      return {
        type: 'solid',
        blur: 0,
        overlay: 'transparent',
      };

    default:
      return {
        type: 'solid',
        solidColor: '#1a1a2e',
        blur: 0,
        overlay: 'transparent',
      };
  }
}

async function fetchImageBackground(
  query: string,
  width: number,
  blur: number,
  overlay: string
): Promise<BackgroundResult> {
  if (!unsplash.isConfigured()) {
    // Fallback to gradient if Unsplash not configured
    return {
      type: 'gradient',
      blur: 0,
      overlay: 'transparent',
    };
  }

  const cacheKey = `${query}-${width}`;

  let photo = imageCache.get(cacheKey);

  if (!photo) {
    try {
      const result = await unsplash.searchPhotos(query, {
        perPage: 5,
        orientation: width > 1080 ? 'landscape' : 'squarish',
      });

      if (result.results.length > 0) {
        // Pick a random result for variety
        photo = result.results[Math.floor(Math.random() * result.results.length)];
        imageCache.set(cacheKey, photo);
      }
    } catch (err) {
      console.error('Failed to fetch from Unsplash:', err);
      // Fallback to gradient
      return {
        type: 'gradient',
        blur: 0,
        overlay: 'transparent',
      };
    }
  }

  if (!photo) {
    return {
      type: 'gradient',
      blur: 0,
      overlay: 'transparent',
    };
  }

  const imageUrl = unsplash.getPhotoUrl(photo, 'raw', width);

  return {
    type: 'image',
    imageUrl,
    imageAttribution: `Photo by ${photo.user.name} on Unsplash`,
    blur,
    overlay,
  };
}

export function clearCache(): void {
  imageCache.clear();
}
