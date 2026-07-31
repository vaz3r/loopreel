import type { LLMClient, LLMResponse } from '../client.js';

export class OpenRouterClient implements LLMClient {
  async generateJSON(systemPrompt: string, userText: string, temperature?: number): Promise<LLMResponse> {
    const apiKey = process.env['LLM_API_KEY'] ?? '';
    const baseUrl = process.env['LLM_BASE_URL'] ?? 'https://openrouter.ai/api/v1';
    const model = process.env['LLM_MODEL'] ?? 'openai/gpt-oss-20b:free';
    const timeout = Number(process.env['LLM_TIMEOUT'] ?? '60000');
    const maxRetries = Number(process.env['LLM_MAX_RETRIES'] ?? '3');

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(`${baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          signal: AbortSignal.timeout(timeout),
          body: JSON.stringify({
            model,
            temperature: temperature ?? 0.7,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userText },
            ],
          }),
        });

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          throw new Error(`OpenRouter ${response.status}: ${body.slice(0, 200)}`);
        }

        const data = (await response.json()) as {
          choices?: Array<{ message: { content: string } }>;
          usage?: { prompt_tokens?: number; completion_tokens?: number };
        };

        const content = data.choices?.[0]?.message?.content;
        if (content) {
          return {
            text: content,
            usage: data.usage ? {
              promptTokens: data.usage.prompt_tokens ?? 0,
              completionTokens: data.usage.completion_tokens ?? 0,
            } : undefined,
          };
        }

        throw new Error(`Empty LLM response: ${JSON.stringify(data).slice(0, 200)}`);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        const isTransient =
          lastError.message.includes('429') ||
          lastError.message.includes('503') ||
          lastError.message.includes('ECONNRESET') ||
          lastError.message.includes('timeout');

        if (!isTransient || attempt === maxRetries - 1) {
          throw lastError;
        }

        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }

    throw lastError ?? new Error('LLM request failed after retries');
  }
}
