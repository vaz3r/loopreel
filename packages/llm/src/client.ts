import { DynamicLLMClient } from './providers/index.js';

export interface LLMUsage {
  promptTokens: number;
  completionTokens: number;
}

export interface LLMResponse {
  text: string;
  usage?: LLMUsage;
}

export interface LLMClient {
  generateJSON(systemPrompt: string, userText: string, temperature?: number): Promise<LLMResponse>;
}

export function createLLMClient(): LLMClient {
  return new DynamicLLMClient();
}
