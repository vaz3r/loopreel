const LLM_API_KEY = process.env['LLM_API_KEY'] ?? '';
const LLM_BASE_URL = process.env['LLM_BASE_URL'] ?? 'https://openrouter.ai/api/v1';
const LLM_MODEL = process.env['LLM_MODEL'] ?? 'openrouter/free';
const LLM_TIMEOUT = Number(process.env['LLM_TIMEOUT'] ?? '60000');
const LLM_MAX_RETRIES = Number(process.env['LLM_MAX_RETRIES'] ?? '3');

export interface LLMClient {
  generateJSON(systemPrompt: string, userText: string): Promise<string>;
}

class OpenRouterClient implements LLMClient {
  async generateJSON(systemPrompt: string, userText: string): Promise<string> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < LLM_MAX_RETRIES; attempt++) {
      try {
        const response = await fetch(`${LLM_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${LLM_API_KEY}`,
          },
          signal: AbortSignal.timeout(LLM_TIMEOUT),
          body: JSON.stringify({
            model: LLM_MODEL,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userText },
            ],
            response_format: { type: 'json_object' },
          }),
        });

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          throw new Error(`OpenRouter ${response.status}: ${body.slice(0, 200)}`);
        }

        const data = await response.json() as {
          choices: Array<{ message: { content: string } }>;
        };

        return data.choices[0]?.message?.content ?? '';
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));

        const isTransient =
          lastError.message.includes('429') ||
          lastError.message.includes('503') ||
          lastError.message.includes('ECONNRESET') ||
          lastError.message.includes('timeout');

        if (!isTransient || attempt === LLM_MAX_RETRIES - 1) {
          throw lastError;
        }

        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }

    throw lastError ?? new Error('LLM request failed after retries');
  }
}

class MockLLMClient implements LLMClient {
  async generateJSON(_systemPrompt: string, _userText: string): Promise<string> {
    const isProtocol = _systemPrompt.includes('protocol-001') || _systemPrompt.includes('Protocol');
    const isArchive = _systemPrompt.includes('archive') || _systemPrompt.includes('Archive');

    if (isArchive) {
      return JSON.stringify({
        meta: {
          seriesName: 'Sys. 02 — Archive',
          authorName: 'M. Reyes',
          handle: '@mayaruns',
          category: 'System Architecture',
        },
        slides: [
          {
            type: 'cover',
            titleTop: 'SYSTEM',
            titleBottom: 'ARCHITECTURE',
            ticker: 'THE ARCHITECTURE OF VALUE  //  STRUCTURAL ALIGNMENT  //  VOLUME II',
            headerLeft: 'Sys. 02',
            headerRight: 'Archive',
            footerLeft: 'Vol. II',
            footerRight: 'Social Export',
            theme: 'void',
          },
          {
            type: 'context',
            title: 'The Baseline.',
            text: 'Most systems fail not because they lack execution, but because their underlying architecture is fundamentally misaligned with the intended output.',
            headerLeft: 'Context',
            headerRight: '02 / 08',
            footerLeft: 'Observation',
            footerRight: 'Sector 01',
            theme: 'bone',
          },
          {
            type: 'list',
            title: 'Structural Deficits.',
            items: [
              { num: '01', label: 'Scope Erosion', desc: 'Operating without rigid boundaries converts premium strategy into commoditized execution.' },
              { num: '02', label: 'Misaligned Onboarding', desc: 'Accepting friction early guarantees massive structural failure during deployment.' },
              { num: '03', label: 'Undervalued IP', desc: 'Charging for hours deployed rather than the transformation delivered limits growth.' },
            ],
            headerLeft: 'Data Set',
            headerRight: '03 / 08',
            footerLeft: 'Diagnostics',
            footerRight: 'Vol. II',
            theme: 'bone',
          },
          {
            type: 'matrix',
            title: 'The Tension Matrix',
            quadrants: [
              { title: 'High Friction', text: 'Manual Intervention & bespoke problem solving.' },
              { title: 'Low Friction', text: 'Automated Scaling & systematic deployment.' },
              { title: 'Commodity', text: 'Time-Based Billing & scope creep.' },
              { title: 'Premium', text: 'Value-Based IP & structural leverage.' },
            ],
            headerLeft: 'Framework',
            headerRight: '04 / 08',
            footerLeft: 'Analysis',
            footerRight: 'Q3',
            theme: 'steel',
          },
          {
            type: 'insight',
            title: 'Pivot Point.',
            text: 'When you stop selling your hands and start selling your mind, the unit economics fundamentally shift.',
            headerLeft: 'Insight',
            headerRight: '05 / 08',
            footerLeft: 'Shift',
            footerRight: 'Mental Model',
            theme: 'void',
          },
          {
            type: 'quote',
            quote: 'The architecture of your pricing dictates the architecture of your respect in the marketplace.',
            author: 'M. Reyes — Partner',
            headerLeft: 'Thesis',
            headerRight: '06 / 08',
            footerLeft: 'Op. Cit.',
            footerRight: '2026',
            theme: 'steel',
          },
          {
            type: 'evidence',
            title: 'Proof of Work.',
            stats: [
              { value: '400%', label: 'Increase in retained margin over 12 months' },
              { value: 'Zero', label: 'Scope creep incidents post-deployment protocols' },
            ],
            headerLeft: 'Evidence',
            headerRight: '07 / 08',
            footerLeft: 'Metrics',
            footerRight: 'Verified',
            theme: 'bone',
          },
          {
            type: 'cta',
            title: 'Deploy the System.',
            buttonText: 'Initialize Sequence',
            headerLeft: 'Terminal',
            headerRight: '08 / 08',
            footerLeft: '@mayaruns',
            footerRight: 'End Protocol',
            theme: 'void',
          },
        ],
      });
    }

    if (isProtocol) {
      return JSON.stringify({
        meta: {
          seriesName: 'The Algorithm',
          authorName: 'Buffer Editorial',
          handle: '@buffer',
          category: 'Social Strategy',
        },
        slides: [
          {
            type: 'cover',
            heading: 'When To Post',
            ticker: 'ENGAGEMENT // TIMING // GROWTH',
            headerLeft: 'Sys. 01',
            headerRight: 'Archive',
            footerLeft: 'Vol. I',
            footerRight: 'Insight',
            theme: 'void',
          },
          {
            type: 'data-list',
            heading: 'When to Post.',
            headerLeft: 'Data Set',
            headerRight: '',
            footerLeft: '',
            footerRight: '',
            theme: 'bone',
            items: [
              {
                title: 'Weekday Mornings',
                description: 'Mon–Fri, 7–9 AM.',
              },
              {
                title: 'Lunch Window',
                description: 'Tue–Wed, 11 AM–1 PM.',
              },
              {
                title: 'Evening Prime',
                description: 'Thu–Fri, 7–9 PM.',
              },
            ],
          },
          {
            type: 'quote',
            quote: 'The best time to post is when your audience is most receptive.',
            attribution: 'Buffer Research — 2026',
            headerLeft: 'Thesis',
            headerRight: '',
            footerLeft: 'Op. Cit.',
            footerRight: '2026',
            theme: 'steel',
          },
          {
            type: 'cta',
            heading: 'Deploy the System',
            buttonLabel: 'Initialize',
            handle: '@buffer',
            headerLeft: 'Terminal',
            headerRight: '',
            footerLeft: '',
            footerRight: 'End Protocol',
            theme: 'void',
          },
        ],
      });
    }

    return JSON.stringify({
      meta: {
        seriesName: 'Instagram Strategy',
        authorName: 'Buffer',
        handle: '@buffer',
        category: 'Social Media',
      },
      slides: [
        {
          type: 'hook',
          heading: 'When to Post on Instagram',
          subtitle: 'Data-backed timing strategies for maximum engagement in 2026',
          layout: 'centered-display',
          palette: 'midnight',
        },
        {
          type: 'content',
          heading: 'Morning Commute Window',
          body: 'Weekday mornings between 7-9 AM capture users checking their phones before the workday. This window is ideal for educational and inspirational content.',
          layout: 'left-aligned-text',
          palette: 'ocean',
        },
        {
          type: 'stat',
          value: '2x',
          label: 'higher engagement',
          body: 'Posts published Tuesday and Wednesday between 11 AM and 1 PM see double the engagement of weekend posts.',
          layout: 'stat-focus',
          palette: 'sunset',
        },
        {
          type: 'list',
          heading: 'Key Timing Insights',
          items: [
            'Tuesday & Wednesday are the highest-traffic days',
            'Evenings 7-9 PM drive the most saves and shares',
            'Sunday afternoons outperform Saturday across all verticals',
            'Post consistency matters more than perfect timing',
          ],
          layout: 'split-screen',
          palette: 'forest',
        },
        {
          type: 'cta',
          heading: 'Start scheduling with confidence',
          buttonLabel: 'Get Buffer',
          layout: 'cta-display',
          palette: 'charcoal',
        },
      ],
    });
  }
}

export function createLLMClient(): LLMClient {
  const provider = process.env['LLM_PROVIDER'] ?? 'mock';
  if (provider === 'openrouter') return new OpenRouterClient();
  return new MockLLMClient();
}
