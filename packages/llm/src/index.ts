export { createLLMClient } from './client.js';
export type { LLMClient } from './client.js';
export { parseLlmXmlOutput, parseXml, xmlElementToObjects } from './xml-parser.js';
export { generateSlidesMultiPhase } from './multi-phase.js';
export type { MultiPhaseResult, TemplateInfo } from './multi-phase.js';
export { introspectSchema } from './schema-introspect.js';
export { calculateCost, MODEL_PRICING } from './pricing.js';
