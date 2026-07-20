export { EditorialRunway, Protocol001, Archive, CustomBrand, VoidEditorial, ArchivePaper, IndustrialBrutal, TEMPLATES } from './registry.js';
export { ArchivePaperSingle } from './archive-paper/index.js';
export { IndustrialBrutalSingle } from './industrial-brutal/index.js';
export { CustomBrandSingle } from './custom-brand/index.js';
export type { TemplateId, TemplateModule } from './registry.js';
export { EditorialContractSchema, EditorialSlideSchema, EditorialMetaSchema } from './editorial-runway/schema.js';
export type { EditorialContract, EditorialSlide, EditorialMeta } from './editorial-runway/schema.js';
export { ProtocolContractSchema, ProtocolSlideSchema, ProtocolMetaSchema } from './protocol-001/schema.js';
export type { ProtocolContract, ProtocolSlide, ProtocolMeta } from './protocol-001/schema.js';
export { ArchiveContractSchema, ArchiveSlideSchema } from './archive/schema.js';
export type { ArchiveContract, ArchiveSlide } from './archive/schema.js';
export { CustomBrandContractSchema, SlideSchema } from './custom-brand/schema.js';
export type { CustomBrandContract, Slide } from './custom-brand/schema.js';
export { VoidContractSchema, VoidSlideSchema, VoidMetaSchema } from './void-editorial/schema.js';
export type { VoidContract, VoidSlide, VoidMeta } from './void-editorial/schema.js';
export { ArchivePaperContractSchema, SlideSchema as ArchivePaperSlideSchema } from './archive-paper/schema.js';
export type { ArchivePaperContract, Slide as ArchivePaperSlide } from './archive-paper/schema.js';
export { IndustrialBrutalContractSchema, SlideSchema as IndustrialBrutalSlideSchema } from './industrial-brutal/schema.js';
export type { IndustrialBrutalContract, Slide as IndustrialBrutalSlide } from './industrial-brutal/schema.js';

export {
  CANVAS,
  getContentArea,
  getSafeAreaStyle,
  getHeadlineFontSize,
  getBodyFontSize,
  getHeadlineLineHeight,
  getOverflowStyles,
  getImageFilter,
  getImageSplitStyles,
  getImageCoverStyles,
} from './engine/index.js';

export type { ImageMood, ImageFilterConfig, SafeAreaConfig } from './engine/index.js';
