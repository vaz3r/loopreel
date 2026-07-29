/**
 * PREMIUM QUALITY TEST SUITE — Unicorn Content Repurposing
 *
 * Tests 5 dimensions that make this product indispensable:
 * 1. Visual Uniqueness Engine — Each job gets unique styling
 * 2. Emotional Trigger System — Curiosity gaps, power words, save/share hooks
 * 3. Smart Slide Type Selection — Before/after, problem/solution, controversial takes
 * 4. Engagement Optimization — Designed for saves, shares, comments, DMs
 * 5. Brand Kit Integration — Unique variations per job
 *
 * Run: pnpm tsx scripts/test-premium-quality.ts
 */

import 'dotenv/config';

const PROVIDER = process.env['LLM_PROVIDER'] ?? 'openrouter';
const API_KEY = process.env['LLM_API_KEY'] ?? '';
const GOOGLE_API_KEY = process.env['LLM_GOOGLE_API_KEY'] ?? '';
const BASE_URL = process.env['LLM_BASE_URL'] ?? 'https://openrouter.ai/api/v1';
const MODEL = process.env['LLM_MODEL'] ?? (PROVIDER === 'google' ? 'gemini-2.5-flash-lite' : 'google/gemma-4-26b-a4b-it:free');
const TIMEOUT_MS = 180_000;

// ─── Types ───────────────────────────────────────────────────────────────────

interface TestResult {
  name: string;
  passed: boolean;
  score: number; // 0-100
  details: string[];
  output?: unknown;
}

interface TestSuite {
  name: string;
  tests: TestResult[];
  totalScore: number;
}

// ─── LLM Call ────────────────────────────────────────────────────────────────

async function callLLM(systemPrompt: string, userContent: string, retries = 3): Promise<{ text: string; latencyMs: number }> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const start = Date.now();
    try {
      if (PROVIDER === 'google') {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_API_KEY}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(TIMEOUT_MS),
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: 'user', parts: [{ text: userContent }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 8192 },
          }),
        });

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          if ((response.status === 429 || response.status >= 500) && attempt < retries - 1) {
            await new Promise(r => setTimeout(r, 5000 * (attempt + 1)));
            continue;
          }
          throw new Error(`Google AI ${response.status}: ${body.slice(0, 300)}`);
        }

        const data = (await response.json()) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          if (attempt < retries - 1) {
            await new Promise(r => setTimeout(r, 3000 * (attempt + 1)));
            continue;
          }
          throw new Error(`Empty response`);
        }

        return { text, latencyMs: Date.now() - start };
      }

      // Default: OpenRouter
      const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userContent },
          ],
        }),
      });

      if (!response.ok) {
        const body = await response.text().catch(() => '');
        if ((response.status === 429 || response.status >= 500) && attempt < retries - 1) {
          await new Promise(r => setTimeout(r, 5000 * (attempt + 1)));
          continue;
        }
        throw new Error(`OpenRouter ${response.status}: ${body.slice(0, 300)}`);
      }

      const data = (await response.json()) as {
        choices?: Array<{ message: { content: string } }>;
      };

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        if (attempt < retries - 1) {
          await new Promise(r => setTimeout(r, 3000 * (attempt + 1)));
          continue;
        }
        throw new Error(`Empty response`);
      }

      return { text: content, latencyMs: Date.now() - start };
    } catch (e) {
      if (attempt < retries - 1) {
        await new Promise(r => setTimeout(r, 5000 * (attempt + 1)));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Failed after retries');
}

// ─── XML Parser ──────────────────────────────────────────────────────────────

interface XmlElement {
  tag: string;
  attributes: Record<string, string>;
  children: XmlElement[];
  text?: string;
}

function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /(\w+)="([^"]*)"/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    attrs[match[1]!] = match[2]!
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'");
  }
  return attrs;
}

function parseXmlNode(xml: string, pos: number): { element: XmlElement; endPos: number } {
  while (pos < xml.length && /\s/.test(xml[pos]!)) pos++;
  if (pos >= xml.length || xml[pos] !== '<') throw new Error(`Expected '<' at ${pos}`);
  pos++;
  if (xml[pos] === '/') throw new Error(`Unexpected closing tag at ${pos}`);
  let tag = '';
  while (pos < xml.length && /[a-zA-Z0-9_-]/.test(xml[pos]!)) { tag += xml[pos]!; pos++; }
  let attrStr = '';
  while (pos < xml.length && xml[pos] !== '>' && !(xml[pos] === '/' && xml[pos + 1] === '>')) { attrStr += xml[pos]!; pos++; }
  const attributes = parseAttributes(attrStr);
  if (xml[pos] === '/' && xml[pos + 1] === '>') return { element: { tag, attributes, children: [] }, endPos: pos + 2 };
  pos++;
  const children: XmlElement[] = [];
  let text = '';
  while (pos < xml.length) {
    while (pos < xml.length && /\s/.test(xml[pos]!)) pos++;
    if (pos >= xml.length) break;
    if (xml[pos] === '<') {
      if (xml[pos + 1] === '/') { while (pos < xml.length && xml[pos] !== '>') pos++; pos++; break; }
      const { element: child, endPos } = parseXmlNode(xml, pos);
      children.push(child);
      pos = endPos;
    } else {
      while (pos < xml.length && xml[pos] !== '<') { text += xml[pos]!; pos++; }
    }
  }
  return { element: { tag, attributes, children, text: text || undefined }, endPos: pos };
}

function parseXml(xmlString: string): XmlElement {
  const { element } = parseXmlNode(xmlString.trim(), 0);
  return element;
}

function xmlToObjects(el: XmlElement): unknown {
  if (el.text && el.children.length === 0) return el.text;
  const result: Record<string, unknown> = { ...el.attributes };
  if (el.children.length > 0) {
    const grouped: Record<string, unknown[]> = {};
    for (const child of el.children) {
      const obj = xmlToObjects(child);
      (grouped[child.tag] ??= []).push(obj);
    }
    for (const [k, v] of Object.entries(grouped)) {
      result[k] = v.length === 1 ? v[0] : v;
    }
  }
  return result;
}

function stripFences(text: string): string {
  return text.replace(/^```(?:xml)?\s*\n?/i, '').replace(/\n?```\s*$/i, '').trim();
}

function tryParseXml(text: string): { ok: boolean; root: XmlElement | null; error: string | null } {
  try {
    const root = parseXml(text);
    return { ok: true, root, error: null };
  } catch (e) {
    return { ok: false, root: null, error: String(e) };
  }
}

// ─── Article Fetch ───────────────────────────────────────────────────────────

async function fetchArticle(): Promise<string> {
  console.log('  Fetching real article from paulgraham.com...');
  const res = await fetch('https://www.paulgraham.com/startupideas.html');
  const html = await res.text();
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log(`  Article fetched: ${text.length} chars`);
  return text;
}

// ─── TEST 1: Visual Uniqueness Engine ────────────────────────────────────────

async function testVisualUniqueness(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 1: VISUAL UNIQUENESS ENGINE ─────────────────────────┐');

  const prompt = `You are a visual design strategist. Given a content brief, generate 3 UNIQUE visual styling variations for the same carousel.

## Content Brief
${article.slice(0, 3000)}

## Output Format
Return a single <variations> element containing 3 <variation> elements:

<variations>
  <variation id="v1">
    <name>Variation 1 name</name>
    <mood>The emotional mood (e.g., "bold and provocative", "calm and authoritative", "dark and mysterious")</mood>
    <colorPalette>
      <primary>#hex color</primary>
      <secondary>#hex color</secondary>
      <accent>#hex color</accent>
      <background>#hex color</background>
    </colorPalette>
    <typography>
      <headlineFont>Font name and weight</headlineFont>
      <bodyFont>Font name and weight</bodyFont>
      <style>Typography style description (e.g., "bold condensed sans-serif for impact")</style>
    </typography>
    <layoutStyle>How slides should be arranged (e.g., "heavy left alignment with large numbers", "centered with lots of white space")</layoutStyle>
    <visualMetaphor>The visual concept (e.g., "newspaper front page", "terminal dashboard", "gallery exhibition")</visualMetaphor>
  </variation>
  <variation id="v2">
    <!-- Same structure -->
  </variation>
  <variation id="v3">
    <!-- Same structure -->
  </variation>
</variations>

## Rules
1. Each variation MUST be visually distinct — different colors, different typography, different layout
2. Color palettes must be harmonious (use color theory: complementary, analogous, or triadic)
3. Typography must match the mood (bold for provocative, elegant for authoritative, monospace for tech)
4. Layout styles must be different (left-aligned vs centered vs asymmetric)
5. Visual metaphors must be unique (newspaper vs dashboard vs gallery)
6. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Generate 3 unique visual variations for this content.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const variations = parsed.root.children.filter(c => c.tag === 'variation');
    details.push(`✓ Generated ${variations.length} variations`);

    // Check each variation has unique elements
    const colors = new Set<string>();
    const fonts = new Set<string>();
    const metaphors = new Set<string>();

    for (const v of variations) {
      const colorChildren = v.children.find(c => c.tag === 'colorPalette')?.children ?? [];
      for (const c of colorChildren) {
        if (c.attributes['primary']) colors.add(c.attributes['primary']);
      }

      const typoChildren = v.children.find(c => c.tag === 'typography')?.children ?? [];
      for (const t of typoChildren) {
        if (t.text) fonts.add(t.text);
      }

      const metaphor = v.children.find(c => c.tag === 'visualMetaphor')?.text;
      if (metaphor) metaphors.add(metaphor);
    }

    details.push(`  Colors: ${colors.size} unique`);
    details.push(`  Fonts: ${fonts.size} unique`);
    details.push(`  Metaphors: ${metaphors.size} unique — ${[...metaphors].join(', ')}`);

    // Score based on uniqueness
    if (variations.length >= 3) score += 30;
    if (colors.size >= 3) score += 20;
    if (fonts.size >= 3) score += 20;
    if (metaphors.size >= 3) score += 30;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Visual Uniqueness Engine',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 2: Emotional Trigger System ────────────────────────────────────────

async function testEmotionalTriggers(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 2: EMOTIONAL TRIGGER SYSTEM ─────────────────────────┐');

  const prompt = `You are a social media copywriter who creates viral carousels. Generate 5 DIFFERENT cover headline + subheadline combinations for the same article, each using a different emotional trigger.

## Article Summary
${article.slice(0, 2000)}

## Output Format
Return a single <covers> element containing 5 <cover> elements:

<covers>
  <cover trigger="curiosity_gap">
    <headline>Max 8 words. Creates an information void.</headline>
    <subheadline>Max 15 words. Makes them NEED to swipe.</subheadline>
    <engagementHook>The emotional trigger used (e.g., "Nobody tells you this")</engagementHook>
  </cover>
  <cover trigger="pattern_interrupt">
    <headline>Breaks expectations.</headline>
    <subheadline>Makes them stop and think.</subheadline>
    <engagementHook>Why this works</engagementHook>
  </cover>
  <cover trigger="controversial_take">
    <headline>Something大多数人 would disagree with.</headline>
    <subheadline>Sharp, contrarian.</subheadline>
    <engagementHook>Why this works</engagementHook>
  </cover>
  <cover trigger="save_this">
    <headline>Makes them want to save for later.</headline>
    <subheadline>Implies high value.</subheadline>
    <engagementHook>Why this works</engagementHook>
  </cover>
  <cover trigger="share_bait">
    <headline>Makes them want to share with someone.</headline>
    <subheadline>Relatable, shareable.</subheadline>
    <engagementHook>Why this works</engagementHook>
  </cover>
</covers>

## Emotional Triggers to Use
1. **Curiosity Gap**: "Nobody tells you this about..." "The secret behind..."
2. **Pattern Interrupt**: "Stop doing this." "You're wrong about..."
3. **Controversial Take**: "Unpopular opinion:..." "Everyone gets this backwards."
4. **Save This**: "Save this for later." "You'll need this."
5. **Share Bait**: "Tag someone who needs this." "Share with a founder friend."

## Rules
1. Each cover MUST use a DIFFERENT emotional trigger
2. Headlines must be punchy (max 8 words)
3. Subheadlines must create intrigue (max 15 words)
4. Each must make the reader feel something (curiosity, surprise, urgency, FOMO)
5. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Generate 5 cover variations with different emotional triggers.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const covers = parsed.root.children.filter(c => c.tag === 'cover');
    details.push(`✓ Generated ${covers.length} cover variations`);

    const triggers = new Set<string>();
    for (const c of covers) {
      const trigger = c.attributes['trigger'];
      if (trigger) triggers.add(trigger);
    }

    details.push(`  Triggers: ${triggers.size} unique — ${[...triggers].join(', ')}`);

    // Check for power words in headlines
    const powerWords = ['secret', 'nobody', 'truth', 'mistake', 'stop', 'never', 'shocking', 'hidden', 'reverse', 'why', 'how'];
    let powerWordCount = 0;
    for (const c of covers) {
      const headline = c.children.find(ch => ch.tag === 'headline')?.text?.toLowerCase() ?? '';
      for (const pw of powerWords) {
        if (headline.includes(pw)) powerWordCount++;
      }
    }
    details.push(`  Power words in headlines: ${powerWordCount}`);

    // Score
    if (covers.length >= 5) score += 25;
    if (triggers.size >= 4) score += 25;
    if (powerWordCount >= 3) score += 25;

    // Check for engagement hooks
    const hooks = covers.filter(c => {
      const hook = c.children.find(ch => ch.tag === 'engagementHook')?.text ?? '';
      return hook.length > 10;
    });
    details.push(`  Engagement hooks: ${hooks.length}/${covers.length}`);
    if (hooks.length >= 4) score += 25;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Emotional Trigger System',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 3: Smart Slide Type Selection ──────────────────────────────────────

async function testSmartSlideSelection(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 3: SMART SLIDE TYPE SELECTION ───────────────────────┐');

  const prompt = `You are a carousel strategist. Given an article, design a carousel that uses ADVANCED slide types for maximum engagement.

## Article Summary
${article.slice(0, 2000)}

## Available Slide Types
- cover: Hook the reader
- sequence: Step-by-step framework
- myth-fact: Challenge misconceptions
- quote: Feature memorable quotes
- cta: Drive action
- before-after: Show transformation
- problem-solution: Present problem then solution
- controversial: Hot take / unpopular opinion
- save-this: High-value reference card
- share-bait: Designed to be shared

## Output Format
Return a single <carousel> element:

<carousel>
  <hook>The emotional hook for the entire carousel (1 sentence)</hook>
  <slidePlan>
    <slide type="slide-type" purpose="Why this slide is here" engagement="What engagement it drives (save/share/comment)" />
  </slidePlan>
  <engagementStrategy>How this carousel drives saves, shares, and comments</engagementStrategy>
</carousel>

## Rules
1. Plan 6-8 slides with VARIED types (no repeats)
2. Must include at least ONE of: before-after, problem-solution, controversial, save-this, share-bait
3. Each slide must have a clear engagement purpose (save, share, or comment)
4. The hook must create curiosity or urgency
5. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Design an engaging carousel with advanced slide types.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const slidePlan = parsed.root.children.find(c => c.tag === 'slidePlan');
    const slides = slidePlan?.children.filter(c => c.tag === 'slide') ?? [];
    details.push(`✓ Planned ${slides.length} slides`);

    const types = new Set<string>();
    for (const s of slides) {
      const type = s.attributes['type'];
      if (type) types.add(type);
    }
    details.push(`  Slide types: ${types.size} unique — ${[...types].join(', ')}`);

    // Check for advanced types
    const advancedTypes = ['before-after', 'problem-solution', 'controversial', 'save-this', 'share-bait'];
    const hasAdvanced = [...types].filter(t => advancedTypes.includes(t));
    details.push(`  Advanced types: ${hasAdvanced.length} — ${hasAdvanced.join(', ') || 'none'}`);

    // Check for engagement purposes
    const engagements = new Set<string>();
    for (const s of slides) {
      const engagement = s.attributes['engagement'];
      if (engagement) engagements.add(engagement);
    }
    details.push(`  Engagement types: ${engagements.size} — ${[...engagements].join(', ')}`);

    // Score
    if (slides.length >= 6) score += 20;
    if (types.size >= 5) score += 25;
    if (hasAdvanced.length >= 2) score += 25;
    if (engagements.size >= 2) score += 20;

    // Check engagement strategy
    const strategy = parsed.root.children.find(c => c.tag === 'engagementStrategy')?.text ?? '';
    if (strategy.length > 20) {
      score += 10;
      details.push(`  Engagement strategy: ${strategy.slice(0, 100)}...`);
    }
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Smart Slide Type Selection',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 4: Engagement Optimization ────────────────────────────────────────

async function testEngagementOptimization(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 4: ENGAGEMENT OPTIMIZATION ──────────────────────────┐');

  const prompt = `You are a social media engagement expert. Design a carousel that is OPTIMIZED for algorithm performance.

## Article Summary
${article.slice(0, 2000)}

## Algorithm Optimization Factors
1. **Saves** — High-value reference content gets saved
2. **Shares** — Controversial or relatable content gets shared
3. **Comments** — Questions and debates drive comments
4. **Watch Time** — Hook in first 0.3s, keep them swiping
5. **Completion Rate** — End with CTA, not a fade-out

## Output Format
Return a single <engagementPlan> element:

<engagementPlan>
  <hookStrategy>How to hook in 0.3 seconds</hookStrategy>
  <saveTriggers>What makes people save this carousel</saveTriggers>
  <shareTriggers>What makes people share this carousel</shareTriggers>
  <commentTriggers>What makes people comment on this carousel</commentTriggers>
  <completionStrategy>How to keep them swiping to the end</completionStrategy>
  <ctaStrategy>What action to drive at the end</ctaStrategy>
  <slideBySlideEngagement>
    <slide num="1" engagement="What engagement this slide drives" />
    <slide num="2" engagement="What engagement this slide drives" />
    <slide num="3" engagement="What engagement this slide drives" />
    <slide num="4" engagement="What engagement this slide drives" />
    <slide num="5" engagement="What engagement this slide drives" />
    <slide num="6" engagement="What engagement this slide drives" />
  </slideBySlideEngagement>
</engagementPlan>

## Rules
1. Every strategy must be SPECIFIC, not generic
2. Hook strategy must mention timing (0.3 seconds)
3. Save triggers must mention "reference card" or "save for later"
4. Share triggers must mention "tag someone" or "share with"
5. Comment triggers must mention "question" or "debate"
6. Slide-by-slide must show increasing engagement
7. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Design an engagement-optimized carousel strategy.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const strategies = ['hookStrategy', 'saveTriggers', 'shareTriggers', 'commentTriggers', 'completionStrategy', 'ctaStrategy'];
    let filledStrategies = 0;
    for (const s of strategies) {
      const text = parsed.root.children.find(c => c.tag === s)?.text ?? '';
      if (text.length > 15) filledStrategies++;
      details.push(`  ${s}: ${text.slice(0, 80)}...`);
    }
    details.push(`  Filled strategies: ${filledStrategies}/${strategies.length}`);

    const slideEngagement = parsed.root.children.find(c => c.tag === 'slideBySlideEngagement');
    const slideCount = slideEngagement?.children.length ?? 0;
    details.push(`  Slide-by-slide engagement: ${slideCount} slides`);

    // Score
    if (filledStrategies >= 5) score += 40;
    if (slideCount >= 5) score += 30;

    // Check for specific hooks
    const hookText = parsed.root.children.find(c => c.tag === 'hookStrategy')?.text ?? '';
    if (hookText.includes('0.3') || hookText.includes('scroll')) score += 15;

    const saveText = parsed.root.children.find(c => c.tag === 'saveTriggers')?.text ?? '';
    if (saveText.includes('save') || saveText.includes('reference')) score += 15;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Engagement Optimization',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 5: Brand Kit Integration ──────────────────────────────────────────

async function testBrandKitIntegration(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 5: BRAND KIT INTEGRATION ────────────────────────────┐');

  const prompt = `You are a brand designer. Given a brand kit and content, generate unique styling for each slide in a carousel.

## Brand Kit
- Primary Color: #1a1a2e (deep navy)
- Secondary Color: #16213e (dark blue)
- Accent Color: #e94560 (coral red)
- Font: "Inter" for body, "Playfair Display" for headlines

## Content Brief
${article.slice(0, 2000)}

## Output Format
Return a single <styledSlides> element containing 6 <styledSlide> elements:

<styledSlides>
  <styledSlide num="1">
    <slideType>cover</slideType>
    <uniqueStyling>
      <bgColor>#hex</bgColor>
      <textColor>#hex</textColor>
      <accentColor>#hex</accentColor>
      <headlineStyle>Bold, large, with accent underline</headlineStyle>
      <subheadlineStyle>Muted, smaller, italic</subheadlineStyle>
      <layoutPosition>Left-aligned with large number</layoutPosition>
    </uniqueStyling>
    <headline>Headline text</headline>
    <subheadline>Subheadline text</subheadline>
  </styledSlide>
  <styledSlide num="2">
    <!-- Same structure -->
  </styledSlide>
  <!-- ... up to 6 slides -->
</styledSlides>

## Rules
1. Each slide MUST have unique styling — different bg, different layout, different emphasis
2. Use the brand kit colors as BASE but create VARIATIONS (lighter, darker, inverted)
3. Headlines must use the headline font, body must use the body font
4. Layout positions must vary (left, center, right, asymmetric)
5. Each slide should feel like a different "page" of the same story
6. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Generate unique styling for each slide using this brand kit.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const slides = parsed.root.children.filter(c => c.tag === 'styledSlide');
    details.push(`✓ Generated ${slides.length} styled slides`);

    const bgColors = new Set<string>();
    const layouts = new Set<string>();

    for (const s of slides) {
      const styling = s.children.find(c => c.tag === 'uniqueStyling');
      if (styling) {
        const bg = styling.children.find(c => c.tag === 'bgColor')?.text;
        const layout = styling.children.find(c => c.tag === 'layoutPosition')?.text;
        if (bg) bgColors.add(bg);
        if (layout) layouts.add(layout);
      }
    }

    details.push(`  Unique bg colors: ${bgColors.size}`);
    details.push(`  Unique layouts: ${layouts.size} — ${[...layouts].join(', ')}`);

    // Score
    if (slides.length >= 6) score += 25;
    if (bgColors.size >= 3) score += 35;
    if (layouts.size >= 3) score += 40;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Brand Kit Integration',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const article = await fetchArticle();

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  PREMIUM QUALITY TEST SUITE — Unicorn Content Repurposing');
  console.log(`  Provider: ${PROVIDER} | Model: ${MODEL}`);
  console.log('═══════════════════════════════════════════════════════════════');

  const results: TestResult[] = [];

  // Run all tests
  results.push(await testVisualUniqueness(article));
  results.push(await testEmotionalTriggers(article));
  results.push(await testSmartSlideSelection(article));
  results.push(await testEngagementOptimization(article));
  results.push(await testBrandKitIntegration(article));

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');

  let totalScore = 0;
  let passed = 0;

  for (const r of results) {
    const status = r.passed ? '✓ PASS' : '✗ FAIL';
    const score = `${r.score}/100`;
    console.log(`\n  ${status} ${r.name.padEnd(30)} ${score.padStart(6)}`);
    for (const d of r.details) {
      console.log(`    ${d}`);
    }
    totalScore += r.score;
    if (r.passed) passed++;
  }

  const avgScore = Math.round(totalScore / results.length);
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`  OVERALL: ${passed}/${results.length} passed | Average score: ${avgScore}/100`);
  console.log('═══════════════════════════════════════════════════════════════');

  // Verdict
  console.log('\n  VERDICT:');
  if (avgScore >= 80) {
    console.log('  🦄 UNICORN STATUS: Product is ready for $59/month pricing.');
    console.log('  Indispensable for marketing agencies and content creators.');
  } else if (avgScore >= 60) {
    console.log('  📈 STRONG: Product is solid but needs iteration.');
    console.log('  Close to indispensable, but not there yet.');
  } else {
    console.log('  ⚠️  NEEDS WORK: Product needs significant improvements.');
    console.log('  Not ready for premium pricing.');
  }

  // Save results
  const outPath = new URL('../test-premium-results.json', import.meta.url).pathname;
  await import('node:fs/promises').then(fs => fs.writeFile(outPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    provider: PROVIDER,
    model: MODEL,
    results: results.map(r => ({
      name: r.name,
      passed: r.passed,
      score: r.score,
      details: r.details,
    })),
    overall: {
      passed,
      total: results.length,
      averageScore: avgScore,
    },
  }, null, 2)));
  console.log(`\n  Results saved to test-premium-results.json`);

  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
