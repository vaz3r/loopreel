export { TEMPLATES, getTemplate, getTemplateIds, getTemplatesByCluster, getClusters } from './registry.js';
export type { TemplateEntry } from './registry.js';
export { getPrompt, TEMPLATE_IDS } from './prompts.js';
export { adaptSlideForEngine } from './adapter.js';
export { introspectSchema, introspectSchemaConcise, extractSlideTypes } from './schema-introspect.js';
export { autoSelectTemplate, classifyByHeuristics } from './classifier.js';
export { paginateContract, chunkArray } from '@loopreel/loop/engine-utils';
export {
  PaperOfRecordBrandKitSchema,
  TheGlobalistBrandKitSchema,
  TheTerminalBrandKitSchema,
  TheCuratorBrandKitSchema,
  TheAcademicBrandKitSchema,
  BRANDKITS,
  getBrandKit,
  getBrandKitDescription,
} from './brandkits.js';
export type {
  PaperOfRecordBrandKit,
  TheGlobalistBrandKit,
  TheTerminalBrandKit,
  TheCuratorBrandKit,
  TheAcademicBrandKit,
  BrandKitEntry,
} from './brandkits.js';
export {
  PaperOfRecordContract,
  TheGlobalistContract,
  TheTerminalContract,
  TheCuratorContract,
  TheAcademicContract,
} from './schemas.js';
export { generateUniqueColors } from './color-utils.js';
export type { UniqueColors } from './color-utils.js';
export { generateUniqueLayouts, describeLayout } from './layout-utils.js';
export type { LayoutType } from './layout-utils.js';
