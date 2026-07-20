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
    const isVoidEditorial = _systemPrompt.includes('void-editorial') || (_systemPrompt.includes('Void') && !isArchive);
    const isArchivePaper = _systemPrompt.includes('archive-paper') || (_systemPrompt.includes('ArchivePaper') || _systemPrompt.includes('Archive Paper'));
    const isIndustrialBrutal = _systemPrompt.includes('industrial-brutal') || _systemPrompt.includes('IndustrialBrutal');
    const isCustomBrand = _systemPrompt.includes('custom-brand') || _systemPrompt.includes('CustomBrand');

    if (isArchivePaper) {
      return `<presentation>
  <meta>
    <title>The Printing Press</title>
    <description>How movable type changed the world</description>
  </meta>
  <slide type="cover">
    <tag>HISTORY</tag>
    <headline>The Printing Press</headline>
    <subheadline>How Gutenberg's invention changed the world</subheadline>
    <metadata>1440 — Mainz, Germany</metadata>
    <footerLeft>Vol. III</footerLeft>
    <footerRight>Education Series</footerRight>
  </slide>
  <slide type="definition">
    <tag>DEFINITION</tag>
    <term>Movable Type</term>
    <phonetic>/ˈmuːvəbəl taɪp/</phonetic>
    <definition>A system of printing that uses movable metal pieces with raised letters, arranged to form pages.</definition>
    <example>Gutenberg's press could produce 3,600 pages per day</example>
    <footerLeft>Technology</footerLeft>
    <footerRight>02 / 06</footerRight>
  </slide>
  <slide type="timeline">
    <tag>TIMELINE</tag>
    <headline>Evolution of the Press</headline>
    <footerLeft>Innovation</footerLeft>
    <footerRight>03 / 06</footerRight>
    <events>
      <event date="1040" title="Woodblock" desc="First movable type using ceramic materials in China" />
      <event date="1450" title="Gutenberg" desc="Mechanical printing press with metal type in Europe" />
      <event date="1814" title="Steam Press" desc="Friedrich Koenig develops steam-powered rotary press" />
      <event date="1845" title="Rotary" desc="Richard Hoe invents the rotary printing press" />
    </events>
  </slide>
  <slide type="quote">
    <tag>QUOTE</tag>
    <quote>Typography is the craft of endowing human language with a durable visual form.</quote>
    <author>Robert Bringhurst</author>
    <role>The Elements of Typographic Style</role>
    <footerLeft>Reference</footerLeft>
    <footerRight>04 / 06</footerRight>
  </slide>
  <slide type="dichotomy">
    <tag>COMPARISON</tag>
    <headline>Before vs After</headline>
    <footerLeft>Analysis</footerLeft>
    <footerRight>05 / 06</footerRight>
    <left>
      <title>Before 1440</title>
      <desc>Hand-copied manuscripts cost a fortune and took months. Only churches and wealthy nobles could afford books.</desc>
    </left>
    <right>
      <title>After 1450</title>
      <desc>Mass-produced books cost 1/500th of hand-copied. Literacy exploded across Europe within decades.</desc>
    </right>
  </slide>
  <slide type="cta">
    <tag>CONCLUSION</tag>
    <headline>Ready to make history?</headline>
    <subtext>Every revolution starts with a single innovation. What will yours be?</subtext>
    <actionLabel>Learn More</actionLabel>
    <socialHandle>@historybuff</socialHandle>
    <footerLeft>End</footerLeft>
    <footerRight>06 / 06</footerRight>
  </slide>
</presentation>`;
    }

    if (isIndustrialBrutal) {
      return `<presentation>
  <meta>
    <title>Quantum Computing</title>
    <description>Why qubits matter for the future</description>
  </meta>
  <slide type="cover">
    <tag>TECH</tag>
    <headline>QUANTUM COMPUTING</headline>
    <subheadline>THE NEXT COMPUTATIONAL PARADIGM</subheadline>
    <metadata>2026 — INDUSTRY OVERVIEW</metadata>
    <footerLeft>VOL. IV</footerLeft>
    <footerRight>DEEP TECH</footerRight>
  </slide>
  <slide type="definition">
    <tag>DEFINE</tag>
    <term>QUBIT</term>
    <phonetic>/ˈkjuːbɪt/</phonetic>
    <definition>A quantum bit that exists in superposition of both 0 and 1 states simultaneously.</definition>
    <example>256 qubits can represent more values than atoms in the universe</example>
    <footerLeft>CORE CONCEPT</footerLeft>
    <footerRight>02 / 07</footerRight>
  </slide>
  <slide type="telemetry">
    <tag>METRICS</tag>
    <headline>QUANTUM LANDSCAPE</headline>
    <footerLeft>DATA</footerLeft>
    <footerRight>03 / 07</footerRight>
    <stats>
      <stat value="$8B+" label="Market Size 2027" />
      <stat value="1,121" label="Qubits (IBM)" />
      <stat value="1,000x" label="Speedup Potential" />
      <stat value="99.9%" label="Error Rate Target" />
    </stats>
  </slide>
  <slide type="sequence">
    <tag>ROADMAP</tag>
    <headline>QUANTUM MATURITY</headline>
    <footerLeft>PROGRESSION</footerLeft>
    <footerRight>04 / 07</footerRight>
    <items>
      <item num="1" title="NISQ Era" desc="Noisy intermediate-scale quantum processors with 50-100 qubits" />
      <item num="2" title="Error Correction" desc="Logical qubits with error rates below physical threshold" />
      <item num="3" title="Quantum Advantage" desc="Useful computation beyond classical reach" />
      <item num="4" title="Universal Quantum" desc="Fault-tolerant general purpose quantum computers" />
    </items>
  </slide>
  <slide type="image-split">
    <tag>HARDWARE</tag>
    <headline>SUPERCONDUCTING QUBITS</headline>
    <bodyText>IBM and Google use superconducting circuits operating at 15 millikelvin — colder than deep space.</bodyText>
    <imageKeywords>quantum computer chip laboratory</imageKeywords>
    <footerLeft>ARCHITECTURE</footerLeft>
    <footerRight>05 / 07</footerRight>
  </slide>
  <slide type="image-cover">
    <tag>FUTURE</tag>
    <headline>THE QUANTUM FUTURE</headline>
    <subtext>Drug discovery, cryptography, and climate modeling will be transformed by quantum computing in the next decade.</subtext>
    <imageKeywords>futuristic technology quantum abstract</imageKeywords>
    <footerLeft>OUTLOOK</footerLeft>
    <footerRight>06 / 07</footerRight>
  </slide>
  <slide type="cta">
    <tag>NEXT STEP</tag>
    <headline>EXPLORE QUANTUM TODAY</headline>
    <subtext>Start learning quantum computing with open-source frameworks</subtext>
    <actionLabel>GET STARTED</actionLabel>
    <socialHandle>@quantum_dev</socialHandle>
    <footerLeft>END</footerLeft>
    <footerRight>07 / 07</footerRight>
  </slide>
</presentation>`;
    }

    if (isVoidEditorial) {
      return `<presentation>
  <meta>
    <title>The Art of Storytelling</title>
    <description>Why narrative structure drives engagement</description>
  </meta>
  <slide type="cover">
    <tag>STORY</tag>
    <headline>The Art of Storytelling</headline>
    <subheadline>Why narrative structure drives engagement</subheadline>
    <metadata>Buffer — 2026</metadata>
    <footerLeft>Vol. I</footerLeft>
    <footerRight>Masterclass</footerRight>
  </slide>
  <slide type="definition">
    <tag>DEFINE</tag>
    <term>Narrative Arc</term>
    <phonetic>/ˈnærətɪv ɑːrk/</phonetic>
    <definition>The chronological construction of plot in a novel or story, from exposition to resolution.</definition>
    <example>Freytag's Pyramid divides stories into five distinct phases</example>
    <footerLeft>Fundamentals</footerLeft>
    <footerRight>02 / 08</footerRight>
  </slide>
  <slide type="quote">
    <tag>THESIS</tag>
    <quote>After all, there are stories that are true and stories that are not true — but the best stories are the ones that make you feel something.</quote>
    <author>Donald Miller</author>
    <role>Building a StoryBrand</role>
    <footerLeft>Reference</footerLeft>
    <footerRight>03 / 08</footerRight>
  </slide>
  <slide type="sequence">
    <tag>FRAMEWORK</tag>
    <headline>StoryBrand Framework</headline>
    <footerLeft>Method</footerLeft>
    <footerRight>04 / 08</footerRight>
    <items>
      <item num="1" title="A Character" desc="The audience is the hero, not the brand" />
      <item num="2" title="Has a Problem" desc="External, internal, and philosophical problems" />
      <item num="3" title="And Meets a Guide" desc="The brand positions itself as the guide" />
      <item num="4" title="Who Gives Them a Plan" desc="A clear path forward for the hero" />
    </items>
  </slide>
  <slide type="dichotomy">
    <tag>CONTRAST</tag>
    <headline>Brand Hero vs Brand Guide</headline>
    <footerLeft>Analysis</footerLeft>
    <footerRight>05 / 08</footerRight>
    <left>
      <title>Brand as Hero</title>
      <desc>Customer is secondary. Brand solves its own problems. Audience feels irrelevant.</desc>
    </left>
    <right>
      <title>Brand as Guide</title>
      <desc>Customer is the hero. Brand provides tools. Audience feels understood and empowered.</desc>
    </right>
  </slide>
  <slide type="image-cover">
    <tag>VISUAL</tag>
    <headline>Stories Connect Us</headline>
    <subtext>The human brain processes narrative 7x faster than data alone. Stories trigger oxytocin, building trust and emotional connection.</subtext>
    <imageKeywords>storytelling connection books warm</imageKeywords>
    <footerLeft>Science</footerLeft>
    <footerRight>06 / 08</footerRight>
  </slide>
  <slide type="telemetry">
    <tag>DATA</tag>
    <headline>Why Stories Work</headline>
    <footerLeft>Evidence</footerLeft>
    <footerRight>07 / 08</footerRight>
    <stats>
      <stat value="7x" label="Faster Processing" />
      <stat value="65%" label="Information Retention" />
      <stat value="3x" label="More Likely to Buy" />
      <stat value="22x" label="More Memorable" />
    </stats>
  </slide>
  <slide type="cta">
    <tag>NEXT</tag>
    <headline>Start telling better stories</headline>
    <subtext>Your audience is waiting for a narrative that resonates. Begin crafting yours today.</subtext>
    <actionLabel>Get Started</actionLabel>
    <socialHandle>@buffer</socialHandle>
    <footerLeft>End</footerLeft>
    <footerRight>08 / 08</footerRight>
  </slide>
</presentation>`;
    }

    if (isCustomBrand) {
      return `<presentation>
  <meta>
    <title>Brand Identity Guide</title>
    <description>Core visual identity and usage guidelines</description>
  </meta>
  <slide type="cover">
    <tag>IDENTITY</tag>
    <headline>Brand Identity Guide</headline>
    <subheadline>Visual standards for consistent brand expression</subheadline>
    <metadata>2026 Edition</metadata>
    <footerLeft>Internal</footerLeft>
    <footerRight>Brand Guide</footerRight>
  </slide>
  <slide type="definition">
    <tag>CORE</tag>
    <term>Brand Identity</term>
    <phonetic>/brænd aɪˈdɛntɪti/</phonetic>
    <definition>The visible elements of a brand, including color, design, and logo, that identify and distinguish the brand in consumers' minds.</definition>
    <example>Consistent brand identity increases revenue by up to 33%</example>
    <footerLeft>Fundamentals</footerLeft>
    <footerRight>02 / 06</footerRight>
  </slide>
  <slide type="sequence">
    <tag>PILLARS</tag>
    <headline>Brand Pillars</headline>
    <footerLeft>Framework</footerLeft>
    <footerRight>03 / 06</footerRight>
    <items>
      <item num="1" title="Purpose" desc="Why the brand exists beyond profit" />
      <item num="2" title="Position" desc="How the brand fits in the market" />
      <item num="3" title="Personality" desc="The character and voice of the brand" />
      <item num="4" title="Promises" desc="What customers can consistently expect" />
    </items>
  </slide>
  <slide type="quote">
    <tag>THESIS</tag>
    <quote>A brand is no longer what we tell the consumer it is — it is what consumers tell each other it is.</quote>
    <author>Scott Cook</author>
    <role>Intuit Co-founder</role>
    <footerLeft>Reference</footerLeft>
    <footerRight>04 / 06</footerRight>
  </slide>
  <slide type="telemetry">
    <tag>IMPACT</tag>
    <headline>Brand Consistency ROI</headline>
    <footerLeft>Data</footerLeft>
    <footerRight>05 / 06</footerRight>
    <stats>
      <stat value="33%" label="Revenue Increase" />
      <stat value="3.5x" label="Brand Recall" />
      <stat value="23%" label="Higher Revenue" />
      <stat value="80%" label="Recognition from Color" />
    </stats>
  </slide>
  <slide type="cta">
    <tag>NEXT</tag>
    <headline>Build your brand consistently</headline>
    <subtext>Use these guidelines to maintain a cohesive brand experience across all touchpoints.</subtext>
    <actionLabel>Download Kit</actionLabel>
    <socialHandle>@brandguide</socialHandle>
    <footerLeft>End</footerLeft>
    <footerRight>06 / 06</footerRight>
  </slide>
</presentation>`;
    }

    if (isArchive) {
      return `<presentation>
  <meta seriesName="Sys. 02 — Archive" authorName="M. Reyes" handle="@mayaruns" category="System Architecture" />
  <cover type="cover" theme="void" titleTop="SYSTEM" titleBottom="ARCHITECTURE" ticker="THE ARCHITECTURE OF VALUE  //  STRUCTURAL ALIGNMENT  //  VOLUME II" headerLeft="Sys. 02" headerRight="Archive" footerLeft="Vol. II" footerRight="Social Export" />
  <context type="context" theme="bone" title="The Baseline." text="Most systems fail not because they lack execution, but because their underlying architecture is fundamentally misaligned with the intended output." headerLeft="Context" headerRight="02 / 08" footerLeft="Observation" footerRight="Sector 01" />
  <list type="list" theme="bone" title="Structural Deficits." headerLeft="Data Set" headerRight="03 / 08" footerLeft="Diagnostics" footerRight="Vol. II">
    <items>
      <item num="01" label="Scope Erosion" desc="Operating without rigid boundaries converts premium strategy into commoditized execution." />
      <item num="02" label="Misaligned Onboarding" desc="Accepting friction early guarantees massive structural failure during deployment." />
      <item num="03" label="Undervalued IP" desc="Charging for hours deployed rather than the transformation delivered limits growth." />
    </items>
  </list>
  <matrix type="matrix" theme="steel" title="The Tension Matrix" headerLeft="Framework" headerRight="04 / 08" footerLeft="Analysis" footerRight="Q3">
    <quadrants>
      <quadrant title="High Friction" text="Manual Intervention &amp; bespoke problem solving." />
      <quadrant title="Low Friction" text="Automated Scaling &amp; systematic deployment." />
      <quadrant title="Commodity" text="Time-Based Billing &amp; scope creep." />
      <quadrant title="Premium" text="Value-Based IP &amp; structural leverage." />
    </quadrants>
  </matrix>
  <insight type="insight" theme="void" title="Pivot Point." text="When you stop selling your hands and start selling your mind, the unit economics fundamentally shift." headerLeft="Insight" headerRight="05 / 08" footerLeft="Shift" footerRight="Mental Model" />
  <quote type="quote" theme="steel" quote="The architecture of your pricing dictates the architecture of your respect in the marketplace." author="M. Reyes — Partner" headerLeft="Thesis" headerRight="06 / 08" footerLeft="Op. Cit." footerRight="2026" />
  <evidence type="evidence" theme="bone" title="Proof of Work." headerLeft="Evidence" headerRight="07 / 08" footerLeft="Metrics" footerRight="Verified">
    <stats>
      <stat value="400%" label="Increase in retained margin over 12 months" />
      <stat value="Zero" label="Scope creep incidents post-deployment protocols" />
    </stats>
  </evidence>
  <cta type="cta" theme="void" title="Deploy the System." buttonText="Initialize Sequence" headerLeft="Terminal" headerRight="08 / 08" footerLeft="@mayaruns" footerRight="End Protocol" />
</presentation>`;
    }

    if (isProtocol) {
      return `<presentation>
  <meta seriesName="The Algorithm" authorName="Buffer Editorial" handle="@buffer" category="Social Strategy" />
  <cover type="cover" theme="void" heading="When To Post" ticker="ENGAGEMENT // TIMING // GROWTH" headerLeft="Sys. 01" headerRight="Archive" footerLeft="Vol. I" footerRight="Insight" />
  <data-list type="data-list" theme="bone" heading="When to Post." headerLeft="Data Set" headerRight="" footerLeft="" footerRight="">
    <item title="Weekday Mornings" description="Mon–Fri, 7–9 AM." />
    <item title="Lunch Window" description="Tue–Wed, 11 AM–1 PM." />
    <item title="Evening Prime" description="Thu–Fri, 7–9 PM." />
  </data-list>
  <quote type="quote" theme="steel" quote="The best time to post is when your audience is most receptive." attribution="Buffer Research — 2026" headerLeft="Thesis" headerRight="" footerLeft="Op. Cit." footerRight="2026" />
  <cta type="cta" theme="void" heading="Deploy the System" buttonLabel="Initialize" headerLeft="Terminal" headerRight="" footerLeft="" footerRight="End Protocol" />
</presentation>`;
    }

    return `<presentation>
  <meta seriesName="Instagram Strategy" authorName="Buffer" handle="@buffer" category="Social Media" />
  <hook type="hook" theme="void" heading="When to Post on Instagram" subtitle="Data-backed timing strategies for maximum engagement in 2026" headerLeft="Sys. 01" headerRight="Strategy" footerLeft="Vol. I" footerRight="Insight" />
  <content type="content" theme="bone" heading="Morning Commute Window" body="Weekday mornings between 7-9 AM capture users checking their phones before the workday." headerLeft="Context" headerRight="02 / 05" footerLeft="Observation" footerRight="Sector 01" />
  <stat type="stat" theme="steel" value="2x" label="higher engagement" body="Posts published Tuesday and Wednesday between 11 AM and 1 PM see double the engagement." headerLeft="Evidence" headerRight="03 / 05" footerLeft="Metrics" footerRight="Verified" />
  <cta type="cta" theme="void" heading="Start scheduling with confidence" buttonLabel="Get Buffer" headerLeft="Terminal" headerRight="05 / 05" footerLeft="@buffer" footerRight="End Protocol" />
</presentation>`;
  }
}

export function createLLMClient(): LLMClient {
  const provider = process.env['LLM_PROVIDER'] ?? 'mock';
  if (provider === 'openrouter') return new OpenRouterClient();
  return new MockLLMClient();
}
