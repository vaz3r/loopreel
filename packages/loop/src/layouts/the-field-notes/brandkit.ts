export interface TheFieldNotesBrandKit {
  bg?: string;
  bg2?: string;
  text?: string;
  accent?: string;
  surface?: string;
  margin?: string;
  highlighter?: string;
  muted?: string;
  fontHeadline?: string;
  fontBody?: string;
  fontMono?: string;
  fontHand?: string;
  wordmark?: string;
  handle?: string;
  wordmarkStyle?: 'serif' | 'sans' | 'mono' | 'small-caps';
}

export const defaultBrandKit: TheFieldNotesBrandKit = {
  bg: '#EEE5D0',
  bg2: '#E6DBC2',
  text: '#2B2219',
  accent: '#B8432A',
  surface: '#F6F0E2',
  margin: 'rgba(184, 67, 42, 0.5)',
  highlighter: 'rgba(236, 182, 62, 0.55)',
  muted: 'rgba(43, 34, 25, 0.68)',
  fontHeadline: 'Fraunces, Georgia, serif',
  fontBody: 'Newsreader, Georgia, serif',
  fontMono: '"DM Mono", ui-monospace, monospace',
  fontHand: 'Caveat, cursive',
  wordmark: 'FIELD NOTES',
  handle: '@fieldnotes',
  wordmarkStyle: 'mono',
};

export const googleFontsUrl =
  'https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=DM+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap';
