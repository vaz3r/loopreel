export { createLLMClient } from './client.js';
export type { LLMClient } from './client.js';
export { parseLlmXmlOutput, parseXml, xmlElementToObjects } from './xml-parser.js';
export { generateSlides } from './brain/index.js';
export type { BrainResult, TemplateInfo } from './brain/index.js';
export { introspectSchema } from './schema-introspect.js';
export { calculateCost, MODEL_PRICING } from './pricing.js';
