import type { LLMClient, LLMResponse } from '../client.js';

export class GoogleAIStudioClient implements LLMClient {
  async generateJSON(systemPrompt: string, userText: string, temperature?: number): Promise<LLMResponse> {
    const apiKey = process.env['LLM_GOOGLE_API_KEY'] ?? '';
    const model = process.env['LLM_MODEL'] ?? 'gemini-2.5-flash-lite';
    const timeout = Number(process.env['LLM_TIMEOUT'] ?? '120000');
    const maxRetries = Number(process.env['LLM_MAX_RETRIES'] ?? '3');

    if (!apiKey) throw new Error('LLM_GOOGLE_API_KEY is not set');

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(timeout),
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemPrompt }],
            },
            contents: [
              {
                role: 'user',
                parts: [{ text: userText }],
              },
            ],
            generationConfig: {
              temperature: temperature ?? 0.7,
              maxOutputTokens: 4096,
            },
          }),
        });

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          throw new Error(`Google AI ${response.status}: ${body.slice(0, 200)}`);
        }

        const data = (await response.json()) as {
          candidates?: Array<{
            content?: { parts?: Array<{ text?: string }>; role?: string };
            finishReason?: string;
          }>;
          usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number };
        };

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            text,
            usage: data.usageMetadata ? {
              promptTokens: data.usageMetadata.promptTokenCount ?? 0,
              completionTokens: data.usageMetadata.candidatesTokenCount ?? 0,
            } : undefined,
          };
        }

        throw new Error(`Empty Google AI response: ${JSON.stringify(data).slice(0, 200)}`);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        const isTransient =
          lastError.message.includes('429') ||
          lastError.message.includes('503') ||
          lastError.message.includes('RESOURCE_EXHAUSTED') ||
          lastError.message.includes('ECONNRESET') ||
          lastError.message.includes('timeout');

        if (!isTransient || attempt === maxRetries - 1) {
          throw lastError;
        }

        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
      }
    }

    throw lastError ?? new Error('Google AI request failed after retries');
  }
}
