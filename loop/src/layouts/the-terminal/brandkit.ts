import { z } from 'zod';

export const TheTerminalBrandKit = z.object({
  bg: z.string().optional().describe('Terminal background color (e.g. #080808 for deep black, #0D1117 for GitHub dark)'),
  text: z.string().optional().describe('Terminal text color (e.g. #E2E8F0 for light gray, #00FF41 for classic green)'),
  accent: z.string().optional().describe('Amber data highlight color for indicators, tags, and emphasis (e.g. #FFB000)'),
});

export type TheTerminalBrandKit = z.infer<typeof TheTerminalBrandKit>;

export const THE_TERMINAL_BRANDKIT_DESCRIPTION = {
  bg: 'Terminal background color. Deep black (#080808) is the default. Dark blue (#0D1117) for GitHub dark style. Pure black (#000000) for OLED.',
  text: 'Terminal text color. Light gray (#E2E8F0) is modern terminal. Classic green (#00FF41) for retro CRT. White (#FFFFFF) for high contrast.',
  accent: 'Amber data highlight color used for status indicators, category tags, and emphasis. Amber (#FFB000) is the default. Cyan (#00D4FF) for alternate feel.',
} as const;
