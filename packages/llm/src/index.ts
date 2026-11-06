export { createLLMClient } from './client.js';
export type { LLMClient, LLMResponse, LLMUsage } from './client.js';
export {
  DynamicLLMClient,
  OpenRouterClient,
  GoogleAIStudioClient,
  MockLLMClient,
  CopilotStudioClient,
} from './providers/index.js';
export { parseLlmXmlOutput, parseXml, xmlElementToObjects } from './xml-parser.js';
export { generateSlides, generateChameleonSlides } from './brain/index.js';
export type {
  BrainResult,
  TemplateInfo,
  ChameleonResult,
  ChameleonOptions,
  ChameleonThemeSpec,
  ChameleonThemePalette,
  ChameleonThemeTypography,
  ChameleonThemeDecorations,
} from './brain/index.js';
export { calculateCost, MODEL_PRICING } from './pricing.js';
export { validateInput } from './brain/input-validator.js';
