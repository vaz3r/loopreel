export {
  searchPhotos,
  getRandomPhoto,
  getPhotoUrl,
  isConfigured,
  getPlaceholderUrl,
} from './unsplash.js';

export type { UnsplashPhoto, UnsplashSearchResult } from './unsplash.js';

export {
  fetchBackground,
  clearCache,
} from './manager.js';

export type { BackgroundType, BackgroundRequest, BackgroundResult } from './manager.js';
