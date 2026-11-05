import type { LLMClient, LLMResponse } from '../client.js';

interface DirectLineConversationResponse {
  conversationId: string;
  token: string;
  streamUrl: string;
  expires_in?: number;
}

interface DirectLineActivity {
  type: string;
  id?: string;
  replyToId?: string;
  from?: { id?: string; name?: string };
  text?: string;
  attachments?: Array<{
    contentType?: string;
    content?: {
      title?: string;
      text?: string;
      body?: Array<{ text?: string }>;
    };
  }>;
}

interface DirectLineStreamPayload {
  activities?: DirectLineActivity[];
}

export class CopilotStudioClient implements LLMClient {
  async generateJSON(systemPrompt: string, userText: string, _temperature?: number): Promise<LLMResponse> {
    const secret = process.env['COPILOT_DIRECT_LINE_SECRET'] || process.env['DIRECT_LINE_SECRET'] || '';
    const baseUrl =
      process.env['COPILOT_DIRECT_LINE_BASE_URL'] ||
      process.env['DIRECT_LINE_BASE_URL'] ||
      'https://europe.directline.botframework.com/v3/directline';
    const timeoutMs = Number(process.env['LLM_TIMEOUT'] ?? '120000');
    const maxRetries = Number(process.env['LLM_MAX_RETRIES'] ?? '3');

    if (!secret) {
      throw new Error(
        'Direct Line secret missing. Please set DIRECT_LINE_SECRET or COPILOT_DIRECT_LINE_SECRET in environment.',
      );
    }

    const promptText = systemPrompt
      ? `[SYSTEM INSTRUCTIONS]\n${systemPrompt}\n\n[USER REQUEST]\n${userText}`
      : userText;

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // 1. Initialize an isolated conversation using the secret
        const convUrl = `${baseUrl}/conversations`;
        const convRes = await fetch(convUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${secret}`,
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(Math.min(timeoutMs, 15000)),
        });

        if (!convRes.ok) {
          const errBody = await convRes.text().catch(() => '');
          throw new Error(`Copilot start conversation failed (${convRes.status}): ${errBody.slice(0, 200)}`);
        }

        const convData = (await convRes.json()) as DirectLineConversationResponse;
        const conversationId = convData.conversationId;
        const convToken = convData.token;
        const streamUrl = convData.streamUrl;
        const clientId = `loopreel_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

        // 2. Connect to WebSocket and exchange message
        const responseText = await new Promise<string>((resolve, reject) => {
          let isSettled = false;
          let ws: WebSocket | null = null;
          let timer: NodeJS.Timeout | null = null;
          let sentActivityId: string | null = null;

          const cleanup = () => {
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
            if (ws) {
              try {
                ws.close();
              } catch {
                // ignore
              }
              ws = null;
            }
          };

          const safeResolve = (val: string) => {
            if (!isSettled) {
              isSettled = true;
              cleanup();
              resolve(val);
            }
          };

          const safeReject = (err: Error) => {
            if (!isSettled) {
              isSettled = true;
              cleanup();
              reject(err);
            }
          };

          timer = setTimeout(() => {
            safeReject(new Error(`Copilot Direct Line request timed out after ${timeoutMs}ms`));
          }, timeoutMs);

          try {
            ws = new WebSocket(streamUrl);

            ws.addEventListener('open', async () => {
              try {
                const messageUrl = `${baseUrl}/conversations/${conversationId}/activities`;
                const msgRes = await fetch(messageUrl, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${convToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    type: 'message',
                    from: {
                      id: clientId,
                      name: 'Loopreel Client',
                    },
                    text: promptText,
                  }),
                });

                if (!msgRes.ok) {
                  const errText = await msgRes.text().catch(() => '');
                  safeReject(
                    new Error(`Failed to send message activity to Copilot (${msgRes.status}): ${errText.slice(0, 200)}`),
                  );
                  return;
                }

                const postData = (await msgRes.json()) as { id?: string };
                sentActivityId = postData.id ?? null;
              } catch (postErr) {
                safeReject(postErr instanceof Error ? postErr : new Error(String(postErr)));
              }
            });

            ws.addEventListener('message', (event) => {
              const raw = typeof event.data === 'string' ? event.data : '';
              if (!raw.trim()) return; // ignore heartbeat / ping

              try {
                const payload = JSON.parse(raw) as DirectLineStreamPayload;
                for (const act of payload.activities ?? []) {
                  // Filter out activities sent from our own client
                  if (act.from?.id === clientId) continue;

                  if (act.type === 'message') {
                    // Match either by replyToId or accept first bot reply in this isolated conversation
                    if (sentActivityId && act.replyToId && act.replyToId !== sentActivityId) {
                      continue;
                    }

                    let text = act.text ?? '';

                    // Extract text from attachments if text is missing or brief
                    if (!text && act.attachments && act.attachments.length > 0) {
                      for (const att of act.attachments) {
                        if (att.content?.text) text += att.content.text + '\n';
                        if (att.content?.body) {
                          for (const b of att.content.body) {
                            if (b.text) text += b.text + '\n';
                          }
                        }
                      }
                      text = text.trim();
                    }

                    if (text) {
                      // Strip Copilot/Bing web grounding citations if present (e.g. [1], [2] and trailing footnotes [1]: <url>)
                      text = text.replace(/\[\d+\]:\s*<https?:\/\/[^\n]+>\s*(?:"[^"]*")?/g, '').trim();
                      text = text.replace(/\[\d+\]/g, '').trim();
                      safeResolve(text);
                      return;
                    }
                  }
                }
              } catch (parseErr) {
                // If ping packet was unparseable or chunk malformed, log but keep listening
              }
            });

            ws.addEventListener('error', (event) => {
              safeReject(new Error(`WebSocket connection error to Copilot Direct Line: ${String((event as any).message ?? 'Unknown WS error')}`));
            });

            ws.addEventListener('close', () => {
              if (!isSettled) {
                safeReject(new Error('WebSocket stream closed by server before response was received'));
              }
            });
          } catch (initErr) {
            safeReject(initErr instanceof Error ? initErr : new Error(String(initErr)));
          }
        });

        const promptTokens = Math.ceil(promptText.length / 4);
        const completionTokens = Math.ceil(responseText.length / 4);

        return {
          text: responseText,
          usage: {
            promptTokens,
            completionTokens,
          },
        };
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        const isTransient =
          lastError.message.includes('429') ||
          lastError.message.includes('503') ||
          lastError.message.includes('ECONNRESET') ||
          lastError.message.includes('timed out') ||
          lastError.message.includes('closed by server');

        if (!isTransient || attempt === maxRetries - 1) {
          throw lastError;
        }

        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      }
    }

    throw lastError ?? new Error('Copilot Studio request failed after retries');
  }
}
