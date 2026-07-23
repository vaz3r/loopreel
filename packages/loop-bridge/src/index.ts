export { TEMPLATES, getTemplate, getTemplateIds } from './registry.js';
export type { TemplateEntry } from './registry.js';
export { getPrompt, TEMPLATE_IDS } from './prompts.js';
export { adaptSlideForEngine } from './adapter.js';
export { introspectSchema } from './schema-introspect.js';
export { autoSelectTemplate, classifyByHeuristics } from './classifier.js';
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
