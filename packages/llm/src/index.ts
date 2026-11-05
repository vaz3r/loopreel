export { createLLMClient } from './client.js';
export type { LLMClient } from './client.js';
export { parseLlmXmlOutput, parseXml, xmlElementToObjects } from './xml-parser.js';
export { generateSlides } from './brain/index.js';
export type { BrainResult, TemplateInfo } from './brain/index.js';
export { calculateCost, MODEL_PRICING } from './pricing.js';
export { validateInput } from './brain/input-validator.js';
