import type { LLMClient, LLMResponse } from '../client.js';
import { OpenRouterClient } from './openrouter.js';
import { GoogleAIStudioClient } from './google.js';
import { MockLLMClient } from './mock.js';

const PROVIDERS: Record<string, () => LLMClient> = {
  openrouter: () => new OpenRouterClient(),
  google: () => new GoogleAIStudioClient(),
  mock: () => new MockLLMClient(),
};

export class DynamicLLMClient implements LLMClient {
  private provider: LLMClient | null = null;

  private getProvider(): LLMClient {
    if (!this.provider) {
      const name = process.env['LLM_PROVIDER'] ?? 'openrouter';
      const factory = PROVIDERS[name];
      if (!factory) {
        throw new Error(`Unknown LLM provider "${name}". Valid: ${Object.keys(PROVIDERS).join(', ')}`);
      }
      this.provider = factory();
    }
    return this.provider;
  }

  async generateJSON(systemPrompt: string, userText: string, temperature?: number): Promise<LLMResponse> {
    return this.getProvider().generateJSON(systemPrompt, userText, temperature);
  }
}
