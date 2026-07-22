import Frame from './frame';
import Cover from './cover';
import Definition from './definition';
import Quote from './quote';
import ImageSplit from './image-split';
import Cta from './cta';
import EditorialCatalog from './editorial-catalog';

export const templateMeta = {
  id: 'avant-garde-editorial',
  name: 'Avant-garde Editorial',
  schemeId: 'avant_garde_editorial',
  visualDescription: 'High-fashion magazine print design. Playfair Display serif + Oswald condensed sans. Crimson red accents on cream paper. Sharp corners, circular seal badges, rotated mockups, vertical text. Vogue/Kinfolk aesthetic.',
};

export { default as frame } from './frame';

export const slides: Record<string, any> = {
  cover: Cover,
  definition: Definition,
  quote: Quote,
  'image-split': ImageSplit,
  cta: Cta,
  'editorial-catalog': EditorialCatalog,
};

export function getLayout(type: string) {
  return slides[type] ?? slides.cover;
}
