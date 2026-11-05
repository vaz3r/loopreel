import type { LLMClient, LLMResponse } from '../client.js';
import { OpenRouterClient } from './openrouter.js';
import { GoogleAIStudioClient } from './google.js';
import { MockLLMClient } from './mock.js';
import { CopilotStudioClient } from './copilot.js';

export { OpenRouterClient, GoogleAIStudioClient, MockLLMClient, CopilotStudioClient };

const PROVIDERS: Record<string, () => LLMClient> = {
  openrouter: () => new OpenRouterClient(),
  google: () => new GoogleAIStudioClient(),
  copilot: () => new CopilotStudioClient(),
  'copilot-studio': () => new CopilotStudioClient(),
  directline: () => new CopilotStudioClient(),
  mock: () => new MockLLMClient(),
};

export class DynamicLLMClient implements LLMClient {
  private provider: LLMClient | null = null;

  constructor(private explicitProvider?: string) {}

  private getProvider(): LLMClient {
    if (!this.provider) {
      const rawName = this.explicitProvider ?? process.env['LLM_PROVIDER'] ?? 'google';
      const name = rawName.toLowerCase();
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
