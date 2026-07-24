export interface LLMClient {
  generateJSON(systemPrompt: string, userText: string): Promise<string>;
}

class OpenRouterClient implements LLMClient {
  async generateJSON(systemPrompt: string, userText: string): Promise<string> {
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

        if (!isTransient || attempt === maxRetries - 1) {
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
    if (_systemPrompt.includes('"The Paper of Record"')) {
      return `<presentation>
  <slide type="cover" id="slide-01" tag="TECHNOLOGY" headline="The Future of Artificial Intelligence" subheadline="How machine learning is reshaping every industry from healthcare to finance" authorName="Jane Smith" authorRole="Technology Correspondent" footerLeft="AI SERIES" footerRight="PAGE 01" />
  <slide type="sequence" id="slide-02" tag="KEY FINDINGS" headline="Five Trends Shaping AI in 2026" footerLeft="ANALYSIS" footerRight="PAGE 02">
    <items>
      <item num="1" title="Edge AI" desc="Processing moves to devices, reducing latency and cloud costs" />
      <item num="2" title="Multimodal Models" desc="Systems that understand text, images, audio, and video simultaneously" />
      <item num="3" title="AI Agents" desc="Autonomous systems that can plan, reason, and execute complex tasks" />
    </items>
  </slide>
  <slide type="telemetry" id="slide-03" tag="DATA" headline="AI Market Growth" footerLeft="METRICS" footerRight="PAGE 03">
    <stats>
      <stat value="42" unit="%" label="Year-over-year growth in enterprise AI adoption" />
      <stat value="184" unit="B" label="Global AI market size projected for 2026" />
    </stats>
  </slide>
  <slide type="quote" id="slide-04" tag="THESIS" quote="Artificial intelligence is the new electricity. It will transform every industry in the same way electricity did 100 years ago." author="Andrew Ng" role="Stanford Professor" footerLeft="REFERENCE" footerRight="PAGE 04" />
  <slide type="cta" id="slide-05" tag="CONCLUSION" headline="Stay Ahead of the Curve" subtext="Subscribe for weekly AI intelligence briefings" actionLabel="Subscribe" socialHandle="@aibriefing" footerLeft="END" footerRight="PAGE 05" />
</presentation>`;
    }

    if (_systemPrompt.includes('"The Globalist"')) {
      return `<presentation>
  <slide type="cover" id="slide-01" tag="SPECIAL REPORT" headline="The End of Cheap Capital" subheadline="How rising rates are forcing a global restructuring of corporate debt" authorName="Maria Torres" authorRole="Financial Correspondent" footerLeft="MACRO-ECONOMICS" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="DATA SET" headline="Global Telemetry" footerLeft="TELEMETRY" footerRight="PAGE 02">
    <stats>
      <stat value="5.25" unit="%" label="Baseline interest rate across G7 economies" />
      <stat value="1.4" unit="T" label="Corporate debt maturing within 18 months" />
    </stats>
  </slide>
  <slide type="interview" id="slide-03" tag="EXPERT VOICE" headline="Central Bank Perspective" question="What does the current rate environment mean for emerging markets?" answer="We are seeing a structural shift. Countries with dollar-denominated debt face significant refinancing risk. The window for adjustment is narrowing." respondentName="Dr. Sarah Chen" respondentRole="IMF Chief Economist" footerLeft="INTERVIEW" footerRight="PAGE 03" />
  <slide type="quadrant" id="slide-04" tag="ANALYSIS" headline="Risk Matrix" footerLeft="FRAMEWORK" footerRight="PAGE 04">
    <topLeft title="High Yield" desc="Corporate bonds with elevated default risk" />
    <topRight title="Investment Grade" desc="Stable returns with lower volatility" />
    <bottomLeft title="Emerging Markets" desc="Currency and sovereign risk exposure" />
    <bottomRight title="Private Credit" desc="Illiquid but higher yield potential" />
  </slide>
  <slide type="cta" id="slide-05" tag="SUBSCRIPTION" headline="Intelligence Delivered Weekly" subtext="Join 50,000 professionals reading The Globalist" actionLabel="Subscribe Now" socialHandle="@theglobalist" footerLeft="SUBSCRIPTION" footerRight="PAGE 05" />
</presentation>`;
    }

    if (_systemPrompt.includes('"The Terminal"')) {
      return `<presentation>
  <slide type="cover" id="slide-01" tag="MARKET_DATA" headline="Terminal Access Granted" subheadline="Real-time quantitative analysis of global macro trends" authorName="J. Stevens" authorRole="Macro Strategy" footerLeft="SYSTEM" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="DATA_SET" headline="Real-Time Telemetry" footerLeft="TELEMETRY" footerRight="PAGE 02">
    <stats>
      <stat value="4.8" unit="%" label="U.S. Core CPI year-over-year" color="green" />
      <stat value="124" unit="" label="Corporate defaults YTD" color="red" />
      <stat value="2.1" unit="T" label="Total repo market volume" color="amber" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="ALGORITHM" headline="Signal Processing Pipeline" footerLeft="PIPELINE" footerRight="PAGE 03">
    <items>
      <item num="1" title="Data Ingestion" desc="Real-time feeds from 47 global exchanges" />
      <item num="2" title="Feature Engineering" desc="200+ derived indicators across 6 asset classes" />
      <item num="3" title="Signal Generation" desc="Ensemble model with 73% directional accuracy" />
    </items>
  </slide>
  <slide type="myth-fact" id="slide-04" tag="ANALYSIS" headline="Market Misconceptions" myth="Rising interest rates always hurt equities" fact="In 68% of rate hiking cycles since 1970, the S&amp;P 500 delivered positive returns within 12 months" footerLeft="RESEARCH" footerRight="PAGE 04" />
  <slide type="cta" id="slide-05" tag="ACCESS" headline="Initialize Subscription" subtext="Full terminal access with real-time data feeds" actionLabel="&gt; INITIALIZE_SUB" socialHandle="@terminal_hq" footerLeft="SUBSCRIPTION" footerRight="PAGE 05" />
</presentation>`;
    }

    if (_systemPrompt.includes('"The Curator"')) {
      return `<presentation>
  <slide type="cover" id="slide-01" tag="EXHIBITION" headline="The Space Between" subheadline="An architectural study of negative space in modern design" pullQuote="True luxury is never loud." footerLeft="ARCHIVE REF: CURATOR.STUDIO" footerRight="PAGE 01" />
  <slide type="hero-metric" id="slide-02" tag="METRIC" value="68" unit="%" headline="Cognitive Load Reduction" bodyText="Minimal interfaces reduce decision fatigue by eliminating visual noise" footerLeft="ARCHIVE REF: CURATOR.STUDIO" footerRight="PAGE 02" />
  <slide type="juxtaposition" id="slide-03" tag="CONTRAST" headline="Design Approaches" footerLeft="ARCHIVE REF: CURATOR.STUDIO" footerRight="PAGE 03">
    <donts>
      <item>Clutter every pixel with information</item>
      <item>Use color as a crutch for hierarchy</item>
      <item>Follow trends without understanding principles</item>
    </donts>
    <dos>
      <item>Let whitespace breathe and guide the eye</item>
      <item>Build hierarchy through typography alone</item>
      <item>Design for the content, not the container</item>
    </dos>
  </slide>
  <slide type="checklist" id="slide-04" tag="PROTOCOL" headline="Curatorial Checklist" footerLeft="ARCHIVE REF: CURATOR.STUDIO" footerRight="PAGE 04">
    <items>
      <item text="Does every element earn its space?" />
      <item text="Is the hierarchy clear without color?" />
      <item text="Would this work in monochrome?" />
      <item text="Does the negative space tell a story?" />
    </items>
  </slide>
  <slide type="cta" id="slide-05" tag="ACQUISITION" headline="Enter the Gallery" subtext="A private collection of architectural strategy" actionLabel="Acquire Access" footerLeft="ARCHIVE REF: CURATOR.STUDIO" footerRight="PAGE 05" />
</presentation>`;
    }

    if (_systemPrompt.includes('"The Academic"')) {
      return `<presentation>
  <slide type="cover" id="slide-01" tag="ABSTRACT" headline="The Organizational Friction Matrix" subheadline="This paper examines the counter-intuitive paradigm wherein intentionally introducing friction yields expansion in net margins" authorName="Dr. Arthur Vance" authorRole="Department of Behavioral Economics" footerLeft="DOI: 10.1016/J.BUSRES.2026" footerRight="PAGE 01" />
  <slide type="telemetry" id="slide-02" tag="EMPIRICAL DATA" headline="Empirical Findings" footerLeft="DOI: 10.1016/J.BUSRES.2026" footerRight="PAGE 02">
    <stats>
      <stat value="42" unit="%" label="Increase in Lifetime Value" color="crimson" />
      <stat value="3.5" unit="x" label="Premium Price Multiplier" color="ink" />
    </stats>
  </slide>
  <slide type="sequence" id="slide-03" tag="METHOD" headline="Research Methodology" footerLeft="DOI: 10.1016/J.BUSRES.2026" footerRight="PAGE 03">
    <items>
      <item num="1" title="Literature Review" desc="Meta-analysis of 247 peer-reviewed studies on friction and consumer behavior" />
      <item num="2" title="Field Experiment" desc="A/B testing across 12 enterprises over 18 months with control groups" />
      <item num="3" title="Regression Analysis" desc="Multivariate models controlling for industry, size, and market conditions" />
    </items>
  </slide>
  <slide type="checklist" id="slide-04" tag="FINDINGS" headline="Key Findings Summary" footerLeft="DOI: 10.1016/J.BUSRES.2026" footerRight="PAGE 04">
    <items>
      <item text="Onboarding friction correlates with 3.2x retention" />
      <item text="Tiered pricing increases perceived value by 47%" />
      <item text="Switching friction boosts LTV by 2.8x over 24 months" />
    </items>
  </slide>
  <slide type="cta" id="slide-05" tag="ACQUISITION" headline="Review the Full Manuscript" subtext="Access the complete dataset and regression models" actionLabel="Download PDF [2.4MB]" footerLeft="DOI: 10.1016/J.BUSRES.2026" footerRight="PAGE 05" />
</presentation>`;
    }

    // Fallback: generic response
    return `<presentation>
  <slide type="cover" id="slide-01" tag="INSIGHT" headline="Key Insights from Your Content" subheadline="A structured analysis of the source material" footerLeft="ANALYSIS" footerRight="PAGE 01" />
  <slide type="sequence" id="slide-02" tag="HIGHLIGHTS" headline="Main Takeaways" footerLeft="INSIGHTS" footerRight="PAGE 02">
    <items>
      <item num="1" title="First Point" desc="The primary insight from the source content" />
      <item num="2" title="Second Point" desc="A supporting observation with data backing" />
    </items>
  </slide>
  <slide type="cta" id="slide-03" tag="ACTION" headline="Take the Next Step" subtext="Apply these insights to your work" actionLabel="Learn More" footerLeft="END" footerRight="PAGE 03" />
</presentation>`;
  }
}

class DynamicLLMClient implements LLMClient {
  private openRouter = new OpenRouterClient();
  private mock = new MockLLMClient();

  async generateJSON(systemPrompt: string, userText: string): Promise<string> {
    const provider = process.env['LLM_PROVIDER'] ?? 'openrouter';
    if (provider === 'openrouter') {
      return this.openRouter.generateJSON(systemPrompt, userText);
    }
    return this.mock.generateJSON(systemPrompt, userText);
  }
}

export function createLLMClient(): LLMClient {
  return new DynamicLLMClient();
}
