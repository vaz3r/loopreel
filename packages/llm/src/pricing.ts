// LLM pricing per 1M tokens (USD)
// Source: https://ai.google.dev/gemini-api/docs/pricing (July 2026)

export const MODEL_PRICING: Record<string, { inputPerMillion: number; outputPerMillion: number }> = {
  'gemini-2.5-flash-lite': { inputPerMillion: 0.10, outputPerMillion: 0.40 },
  'gemini-2.5-flash': { inputPerMillion: 0.30, outputPerMillion: 2.50 },
  'gemini-2.5-pro': { inputPerMillion: 1.25, outputPerMillion: 10.00 },
  'gemini-3.1-flash-lite': { inputPerMillion: 0.25, outputPerMillion: 1.50 },
  'gemini-3-flash': { inputPerMillion: 0.50, outputPerMillion: 3.00 },
  'gemini-3.5-flash': { inputPerMillion: 1.50, outputPerMillion: 9.00 },
};

export function calculateCost(model: string, promptTokens: number, completionTokens: number): number {
  const pricing = MODEL_PRICING[model];
  if (!pricing) return 0;
  const inputCost = (promptTokens / 1_000_000) * pricing.inputPerMillion;
  const outputCost = (completionTokens / 1_000_000) * pricing.outputPerMillion;
  return Math.round((inputCost + outputCost) * 1_000_000) / 1_000_000; // round to 6 decimal places
}
