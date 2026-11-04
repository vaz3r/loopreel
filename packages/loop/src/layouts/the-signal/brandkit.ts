export interface StarterBrandKit {
  bg?: string;
  text?: string;
  accent?: string;
  surface?: string;
  fontHeadline?: string;
  fontBody?: string;
  fontSans?: string;
  wordmark?: string;
  handle?: string;
}

export const defaultBrandKit: StarterBrandKit = {
  bg: '#0F172A',
  text: '#F8FAFC',
  accent: '#38BDF8',
  surface: '#1E293B',
  fontHeadline: 'Geist',
  fontBody: 'Inter',
  fontSans: 'Inter',
  wordmark: 'THE SIGNAL',
  handle: '@thesignal',
};
