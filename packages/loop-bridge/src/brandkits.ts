import { z } from 'zod';
import {
  PaperOfRecordBrandKit as POR,
  PAPER_OF_RECORD_BRANDKIT_DESCRIPTION,
} from '../../../loop/src/layouts/paper-of-record/brandkit.js';
import {
  TheGlobalistBrandKit as TG,
  THE_GLOBALIST_BRANDKIT_DESCRIPTION,
} from '../../../loop/src/layouts/the-globalist/brandkit.js';
import {
  TheTerminalBrandKit as TT,
  THE_TERMINAL_BRANDKIT_DESCRIPTION,
} from '../../../loop/src/layouts/the-terminal/brandkit.js';
import {
  TheCuratorBrandKit as TC,
  THE_CURATOR_BRANDKIT_DESCRIPTION,
} from '../../../loop/src/layouts/the-curator/brandkit.js';
import {
  TheAcademicBrandKit as TA,
  THE_ACADEMIC_BRANDKIT_DESCRIPTION,
} from '../../../loop/src/layouts/the-academic/brandkit.js';

export type PaperOfRecordBrandKit = z.infer<typeof POR>;
export type TheGlobalistBrandKit = z.infer<typeof TG>;
export type TheTerminalBrandKit = z.infer<typeof TT>;
export type TheCuratorBrandKit = z.infer<typeof TC>;
export type TheAcademicBrandKit = z.infer<typeof TA>;

export { POR as PaperOfRecordBrandKitSchema, PAPER_OF_RECORD_BRANDKIT_DESCRIPTION };
export { TG as TheGlobalistBrandKitSchema, THE_GLOBALIST_BRANDKIT_DESCRIPTION };
export { TT as TheTerminalBrandKitSchema, THE_TERMINAL_BRANDKIT_DESCRIPTION };
export { TC as TheCuratorBrandKitSchema, THE_CURATOR_BRANDKIT_DESCRIPTION };
export { TA as TheAcademicBrandKitSchema, THE_ACADEMIC_BRANDKIT_DESCRIPTION };

export interface BrandKitEntry {
  schema: z.ZodObject<any>;
  description: Record<string, string>;
}

export const BRANDKITS: Record<string, BrandKitEntry> = {
  'paper-of-record': { schema: POR, description: PAPER_OF_RECORD_BRANDKIT_DESCRIPTION },
  'the-globalist': { schema: TG, description: THE_GLOBALIST_BRANDKIT_DESCRIPTION },
  'the-terminal': { schema: TT, description: THE_TERMINAL_BRANDKIT_DESCRIPTION },
  'the-curator': { schema: TC, description: THE_CURATOR_BRANDKIT_DESCRIPTION },
  'the-academic': { schema: TA, description: THE_ACADEMIC_BRANDKIT_DESCRIPTION },
};

export function getBrandKit(templateId: string): BrandKitEntry {
  const entry = BRANDKITS[templateId];
  if (!entry) throw new Error(`Unknown template "${templateId}" for brand kit`);
  return entry;
}

export function getBrandKitDescription(templateId: string): string {
  const entry = getBrandKit(templateId);
  return Object.entries(entry.description)
    .map(([key, explanation]) => `  - ${key}: ${explanation}`)
    .join('\n');
}
