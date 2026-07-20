export type ImageMood = 'dark' | 'light' | 'warm' | 'cool' | 'muted' | 'dramatic';

export interface ImageFilterConfig {
  filter: string;
  overlay: string;
  gradient?: string;
}

const IMAGE_FILTERS: Record<ImageMood, ImageFilterConfig> = {
  dark: {
    filter: 'grayscale(30%) contrast(1.1) brightness(0.6)',
    overlay: 'rgba(0,0,0,0.5)',
    gradient:
      'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)',
  },
  light: {
    filter: 'grayscale(20%) contrast(1.05) brightness(1.1)',
    overlay: 'rgba(255,255,255,0.65)',
  },
  warm: {
    filter: 'sepia(20%) contrast(1.05) brightness(0.9)',
    overlay: 'rgba(30,20,10,0.4)',
  },
  cool: {
    filter: 'saturate(0.8) contrast(1.1) brightness(0.7)',
    overlay: 'rgba(10,20,40,0.5)',
  },
  muted: {
    filter: 'grayscale(50%) contrast(1.0) brightness(0.8)',
    overlay: 'rgba(0,0,0,0.3)',
  },
  dramatic: {
    filter: 'grayscale(40%) contrast(1.3) brightness(0.5)',
    overlay: 'rgba(0,0,0,0.6)',
    gradient:
      'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 60%)',
  },
};

export function getImageFilter(mood: ImageMood = 'dark'): ImageFilterConfig {
  return IMAGE_FILTERS[mood] ?? IMAGE_FILTERS.dark;
}

export function getImageSplitStyles(mood: ImageMood = 'dark') {
  const config = getImageFilter(mood);
  return {
    container: {
      overflow: 'hidden' as const,
      borderRadius: 8,
    },
    image: {
      width: '100%' as const,
      height: '100%' as const,
      objectFit: 'cover' as const,
      filter: config.filter,
    },
  };
}

export function getImageCoverStyles(mood: ImageMood = 'dark') {
  const config = getImageFilter(mood);
  return {
    imageContainer: {
      position: 'absolute' as const,
      inset: 0,
      zIndex: 0,
    },
    image: {
      width: '100%' as const,
      height: '100%' as const,
      objectFit: 'cover' as const,
      filter: config.filter,
    },
    overlay: {
      position: 'absolute' as const,
      inset: 0,
      background: config.gradient ?? config.overlay,
      zIndex: 1,
    },
  };
}
