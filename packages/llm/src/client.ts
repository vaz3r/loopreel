// @ts-nocheck
const LLM_API_KEY = process.env['LLM_API_KEY'] ?? '';
const LLM_BASE_URL = process.env['LLM_BASE_URL'] ?? 'https://openrouter.ai/api/v1';
const LLM_MODEL = process.env['LLM_MODEL'] ?? 'openrouter/free';
const LLM_TIMEOUT = Number(process.env['LLM_TIMEOUT'] ?? '60000');
const LLM_MAX_RETRIES = Number(process.env['LLM_MAX_RETRIES'] ?? '3');

export interface LLMMessage {
  role: 'system' | 'user';
  content: string;
}

export interface LLMResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
  };
}

function isRetryableStatus(status: number): boolean {
  return status === 429 || status === 502 || status === 503 || status === 529;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateStructuredContent(
  messages: LLMMessage[],
  logger?: { info: (obj: object, msg: string) => void; warn: (obj: object, msg: string) => void },
): Promise<LLMResponse> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= LLM_MAX_RETRIES; attempt++) {
    try {
      logger?.info({ model: LLM_MODEL, attempt }, 'Calling LLM');

      const response = await fetch(`${LLM_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${LLM_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://loopreel.com',
          'X-Title': 'Loopreel',
        },
        body: JSON.stringify({
          model: LLM_MODEL,
          messages,
          response_format: { type: 'json_object' },
          temperature: 0.3,
          max_tokens: 4096,
        }),
        signal: AbortSignal.timeout(LLM_TIMEOUT),
      });

      if (!response.ok) {
        const text = await response.text().catch(() => 'No response body');
        const error = new Error(`LLM API error ${response.status}: ${text}`);
        (error as Error & { status: number }).status = response.status;

        if (isRetryableStatus(response.status) && attempt < LLM_MAX_RETRIES) {
          const delay = response.status === 429
            ? Math.min(1000 * 2 ** attempt, 30000)
            : 1000 * attempt;
          logger?.warn({ status: response.status, attempt, delay }, 'Retryable LLM error, retrying');
          await sleep(delay);
          lastError = error;
          continue;
        }
        throw error;
      }

      const data = await response.json() as {
        choices: Array<{ message: { content: string } }>;
        model: string;
        usage: { prompt_tokens: number; completion_tokens: number };
      };

      const content = data.choices[0]?.message?.content;
      if (!content) {
        throw new Error('LLM returned empty content');
      }

      logger?.info({ model: data.model, usage: data.usage }, 'LLM response received');

      return {
        content,
        model: data.model,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
        },
      };
    } catch (err) {
      if (err instanceof Error && 'status' in err) {
        throw err;
      }
      lastError = err instanceof Error ? err : new Error(String(err));

      if (attempt < LLM_MAX_RETRIES) {
        const delay = 1000 * attempt;
        logger?.warn({ attempt, delay }, 'LLM request failed, retrying');
        await sleep(delay);
        continue;
      }
    }
  }

  throw lastError ?? new Error('LLM request failed after all retries');
}
