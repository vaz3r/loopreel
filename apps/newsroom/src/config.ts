import dotenv from 'dotenv';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Robustly locate root .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let envDir = __dirname;
while (envDir !== path.dirname(envDir)) {
  const candidate = path.join(envDir, '.env');
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate });
    break;
  }
  envDir = path.dirname(envDir);
}

export const CONFIG = {
  loopreelApiUrl: process.env.LOOPREEL_API_URL || 'http://localhost:3000/api',
  bufferAccessToken: process.env.BUFFER_ACCESS_TOKEN || '',
  bufferChannelId: process.env.BUFFER_CHANNEL_ID || '6afb338aece6dfde5fe6e48e',
  bufferOrgId: process.env.BUFFER_ORGANIZATION_ID || '5aa437d48f0f393b18cc8b85',
  minEditorialScore: parseFloat(process.env.NEWSROOM_MIN_SCORE || '7.5'),
  dryRun: process.env.NEWSROOM_DRY_RUN === 'true',
  autoPublish: process.env.NEWSROOM_AUTO_PUBLISH === 'true',
  scanIntervalMinutes: parseInt(process.env.NEWSROOM_INTERVAL_MINUTES || '240', 10), // Default: every 4 hours

  // Targeted Google News RSS queries for "The Fine Print" investigative beat
  topicQueries: [
    '"terms of service" OR "arbitration clause" OR "class action waiver" lawsuit',
    '"hidden fees" OR "deceptive practices" FTC OR SEC OR CFPB',
    '"automatic renewal" OR "cancellation trap" OR "unregulated float" investigation',
    '"mandatory arbitration" OR "wrongful death" terms of service',
    'airline "hidden fee" OR "overbooking" DOT investigation',
  ],

  brandPreset: {
    name: 'The Fine Print',
    slug: 'the-fine-print',
    vibe: 'Investigative Corporate Autopsies, Fine Print Tricks & Receipts',
    domain: 'thefineprint.pub',
    handle: '@thefineprint.pub',
    palette: {
      paper: '#0A0A0C',
      ink: '#F5F5F7',
      accent: '#FF2A2A',
      surface: '#121216',
      border: '#24242C',
      subtle: '#8E8E98',
    },
    typography: {
      headlineFont: 'Space Grotesk',
      bodyFont: 'Space Grotesk',
      monoFont: 'JetBrains Mono',
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap',
    },
    wordmark: 'THE FINE PRINT',
    wordmarkStyle: 'small-caps' as const,
    texture: 'grid' as const,
    motif: 'bracket' as const,
  },
};
