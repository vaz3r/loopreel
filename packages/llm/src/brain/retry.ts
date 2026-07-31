import type { LLMClient } from '../client.js';
import type { PhaseUsage } from './types.js';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const RETRY_BUDGETS: Record<string, number> = {
  extraction: 1,
  classification: 1,
  planning: 1,
  generation: 1,
  labelDetection: 2,
  creativeDirector: 1,
};

export function createUsageTracker() {
  let totalPrompt = 0;
  let totalCompletion = 0;
  const phaseUsages: PhaseUsage[] = [];

  return {
    async callLLM(
      llm: LLMClient,
      phase: string,
      systemPrompt: string,
      userText: string,
      temperature?: number,
    ): Promise<string> {
      // Small delay between calls to avoid hitting rate limits
      await delay(100);
      
      const start = Date.now();
      const response = await llm.generateJSON(systemPrompt, userText, temperature);
      const latencyMs = Date.now() - start;

      const promptTokens = response.usage?.promptTokens ?? 0;
      const completionTokens = response.usage?.completionTokens ?? 0;
      totalPrompt += promptTokens;
      totalCompletion += completionTokens;

      phaseUsages.push({
        phase,
        promptTokens,
        completionTokens,
        latencyMs,
      });

      return response.text;
    },
    getTotals() {
      return { input: totalPrompt, output: totalCompletion };
    },
    getPhaseUsages() {
      return phaseUsages;
    },
  };
}

export async function withPhaseRetry<T>(
  fn: () => Promise<T>,
  phase: string,
  retriesUsed: Record<string, number>,
  onError?: (err: Error) => void,
): Promise<T> {
  const budget = RETRY_BUDGETS[phase] ?? 0;
  const used = retriesUsed[phase] ?? 0;

  try {
    return await fn();
  } catch (err) {
    if (used >= budget) {
      onError?.(err as Error);
      throw err;
    }
    retriesUsed[phase] = used + 1;
    throw err;
  }
}
