import type { VoidContract } from '../../schema';

import voidEditorialSlides from './void-editorial/slides';
import archivePaperSlides from './archive-paper/slides';
import industrialBrutalSlides from './industrial-brutal/slides';
import customBrandSlides from './custom-brand/slides';
import modernCleanSlides from './modern-clean/slides';
import premiumSocialSlides from './premium-social/slides';

export interface DeckEntry {
  id: string;
  name: string;
  schemeId: string;
  templateId: string;
  description: string;
  sampleSlides: VoidContract;
}

const DECKS: DeckEntry[] = [
  { id: 'void-editorial', name: 'Void Editorial', schemeId: 'void_editorial', templateId: 'void-editorial', description: 'Dark editorial aesthetic', sampleSlides: voidEditorialSlides },
  { id: 'archive-paper', name: 'Archive Paper', schemeId: 'archive_paper', templateId: 'archive-paper', description: 'Light paper texture', sampleSlides: archivePaperSlides },
  { id: 'industrial-brutal', name: 'Industrial Brutal', schemeId: 'industrial_brutal', templateId: 'industrial-brutal', description: 'Bold industrial style', sampleSlides: industrialBrutalSlides },
  { id: 'custom-brand', name: 'Custom Brand', schemeId: 'custom_brand', templateId: 'custom-brand', description: 'Customizable brand kit', sampleSlides: customBrandSlides },
  { id: 'modern-clean', name: 'Modern Clean', schemeId: 'custom_brand', templateId: 'modern-clean', description: 'Minimal modern design', sampleSlides: modernCleanSlides },
  { id: 'premium-social', name: 'Premium Social', schemeId: 'premium_social', templateId: 'premium-social', description: 'Instagram carousel style', sampleSlides: premiumSocialSlides },
];

export function getAllDecks(): DeckEntry[] {
  return DECKS;
}
