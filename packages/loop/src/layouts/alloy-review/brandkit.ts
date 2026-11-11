export interface AlloyReviewBrandKit {
  bg?: string;
  text?: string;
  accent?: string;
  surface?: string;
  border?: string;
  fontHeadline?: string;
  fontSans?: string;
  wordmark?: string;
  handle?: string;
}

export const defaultBrandKit: AlloyReviewBrandKit = {
  bg: '#F5F5F7',
  text: '#1D1D1F',
  accent: '#C74416',
  surface: '#E9EAED',
  border: '#C5C7CD',
  fontHeadline: 'Syne',
  fontSans: 'Manrope',
  wordmark: 'THE ALLOY REVIEW',
  handle: '@alloyreview',
};
