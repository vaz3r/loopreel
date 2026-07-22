import type { z } from 'zod';

import paperOfRecordSlides from './paper-of-record/slides';
import { PaperOfRecordContract } from './paper-of-record/schema';

import theGlobalistSlides from './the-globalist/slides';
import { TheGlobalistContract } from './the-globalist/schema';

import theTerminalSlides from './the-terminal/slides';
import { TheTerminalContract } from './the-terminal/schema';

export interface DeckEntry {
  id: string;
  name: string;
  schemeId: string;
  templateId: string;
  description: string;
  sampleSlides: { slides?: Record<string, unknown>[]; [k: string]: unknown };
  schema: z.ZodTypeAny;
}

const DECKS: DeckEntry[] = [
  { id: 'paper-of-record', name: 'The Paper of Record', schemeId: 'archive_paper', templateId: 'paper-of-record', description: 'Classic newspaper editorial design', sampleSlides: paperOfRecordSlides, schema: PaperOfRecordContract },
  { id: 'the-globalist', name: 'The Globalist', schemeId: 'globalist_editorial', templateId: 'the-globalist', description: 'Newsprint editorial magazine', sampleSlides: theGlobalistSlides, schema: TheGlobalistContract },
  { id: 'the-terminal', name: 'The Terminal', schemeId: 'terminal_dark', templateId: 'the-terminal', description: 'Dark terminal data aesthetic', sampleSlides: theTerminalSlides, schema: TheTerminalContract },
];

export function getAllDecks(): DeckEntry[] {
  return DECKS;
}
