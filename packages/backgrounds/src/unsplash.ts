const UNSPLASH_ACCESS_KEY = process.env['UNSPLASH_ACCESS_KEY'] ?? '';
const UNSPLASH_BASE_URL = 'https://api.unsplash.com';

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
  };
  alt_description: string | null;
}

export interface UnsplashSearchResult {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export async function searchPhotos(
  query: string,
  options: {
    perPage?: number;
    page?: number;
    orientation?: 'landscape' | 'portrait' | 'squarish';
  } = {}
): Promise<UnsplashSearchResult> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('UNSPLASH_ACCESS_KEY not configured');
  }

  const { perPage = 10, page = 1, orientation } = options;

  const params = new URLSearchParams({
    query,
    per_page: String(perPage),
    page: String(page),
  });

  if (orientation) {
    params.set('orientation', orientation);
  }

  const response = await fetch(`${UNSPLASH_BASE_URL}/search/photos?${params}`, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status}`);
  }

  return response.json() as Promise<UnsplashSearchResult>;
}

export async function getRandomPhoto(
  query: string,
  options: {
    orientation?: 'landscape' | 'portrait' | 'squarish';
  } = {}
): Promise<UnsplashPhoto> {
  if (!UNSPLASH_ACCESS_KEY) {
    throw new Error('UNSPLASH_ACCESS_KEY not configured');
  }

  const params = new URLSearchParams({ query });

  if (options.orientation) {
    params.set('orientation', options.orientation);
  }

  const response = await fetch(`${UNSPLASH_BASE_URL}/photos/random?${params}`, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Unsplash API error: ${response.status}`);
  }

  return response.json() as Promise<UnsplashPhoto>;
}

export function getPhotoUrl(
  photo: UnsplashPhoto,
  size: 'raw' | 'full' | 'regular' | 'small' | 'thumb' = 'regular',
  width?: number
): string {
  let url = photo.urls[size];

  if (width && size === 'raw') {
    url += `&w=${width}`;
  }

  return url;
}

export function isConfigured(): boolean {
  return UNSPLASH_ACCESS_KEY.length > 0;
}
