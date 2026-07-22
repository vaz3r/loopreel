import type { z } from 'zod';

import paperOfRecordSlides from './paper-of-record/slides';
import { PaperOfRecordContract } from './paper-of-record/schema';

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
];

export function getAllDecks(): DeckEntry[] {
  return DECKS;
}
