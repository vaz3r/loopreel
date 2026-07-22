import type { z } from 'zod';
import type { VoidContract } from '../../schema';

import voidEditorialSlides from './void-editorial/slides';
import archivePaperSlides from './archive-paper/slides';
import industrialBrutalSlides from './industrial-brutal/slides';
import customBrandSlides from './custom-brand/slides';
import modernCleanSlides from './modern-clean/slides';
import premiumSocialSlides from './premium-social/slides';

import { VoidEditorialContract } from './void-editorial/schema';
import { ArchivePaperContract } from './archive-paper/schema';
import { IndustrialBrutalContract } from './industrial-brutal/schema';
import { CustomBrandContract } from './custom-brand/schema';
import { ModernCleanContract } from './modern-clean/schema';
import { PremiumSocialContract } from './premium-social/schema';

export interface DeckEntry {
  id: string;
  name: string;
  schemeId: string;
  templateId: string;
  description: string;
  sampleSlides: VoidContract;
  schema: z.ZodTypeAny;
}

const DECKS: DeckEntry[] = [
  { id: 'void-editorial', name: 'Void Editorial', schemeId: 'void_editorial', templateId: 'void-editorial', description: 'Dark editorial aesthetic', sampleSlides: voidEditorialSlides, schema: VoidEditorialContract },
  { id: 'archive-paper', name: 'Archive Paper', schemeId: 'archive_paper', templateId: 'archive-paper', description: 'Light paper texture', sampleSlides: archivePaperSlides, schema: ArchivePaperContract },
  { id: 'industrial-brutal', name: 'Industrial Brutal', schemeId: 'industrial_brutal', templateId: 'industrial-brutal', description: 'Bold industrial style', sampleSlides: industrialBrutalSlides, schema: IndustrialBrutalContract },
  { id: 'custom-brand', name: 'Custom Brand', schemeId: 'custom_brand', templateId: 'custom-brand', description: 'Customizable brand kit', sampleSlides: customBrandSlides, schema: CustomBrandContract },
  { id: 'modern-clean', name: 'Modern Clean', schemeId: 'custom_brand', templateId: 'modern-clean', description: 'Minimal modern design', sampleSlides: modernCleanSlides, schema: ModernCleanContract },
  { id: 'premium-social', name: 'Premium Social', schemeId: 'premium_social', templateId: 'premium-social', description: 'Instagram carousel style', sampleSlides: premiumSocialSlides, schema: PremiumSocialContract },
];

export function getAllDecks(): DeckEntry[] {
  return DECKS;
}
