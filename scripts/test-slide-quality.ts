/**
 * SLIDE GENERATION QUALITY TEST
 *
 * Focus: Making carousel slides so good that agencies can't live without them.
 *
 * Tests 3 dimensions:
 * 1. Copy Quality — Emotional hooks, power words, scroll-stopping headlines
 * 2. Slide Variety — Advanced types (before/after, problem/solution, controversial)
 * 3. Engagement Hooks — "Save this", "Share with someone", "Comment your answer"
 *
 * Run: pnpm tsx scripts/test-slide-quality.ts
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
  score: number;
  details: string[];
  output?: unknown;
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

// ─── TEST 1: Copy Quality ───────────────────────────────────────────────────

async function testCopyQuality(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 1: COPY QUALITY ─────────────────────────────────────┐');

  const prompt = `You are a world-class social media copywriter. Generate premium carousel slides with scroll-stopping copy.

## Article Summary
${article.slice(0, 2000)}

## Output Format
Return a single <carousel> element with 6 slides:

<carousel>
  <slide type="cover">
    <headline>Max 8 words. Must hook in 0.3 seconds.</headline>
    <subheadline>Max 15 words. Must make them NEED to swipe.</subheadline>
  </slide>
  <slide type="sequence">
    <headline>Max 6 words. Pattern interrupt.</headline>
    <items>
      <item num="1" title="Max 5 words" desc="Max 12 words. Punchy." />
      <item num="2" title="Max 5 words" desc="Max 12 words. Punchy." />
      <item num="3" title="Max 5 words" desc="Max 12 words. Punchy." />
    </items>
  </slide>
  <slide type="myth-fact">
    <headline>Max 6 words.</headline>
    <myth>Max 12 words. Something everyone believes.</myth>
    <fact>Max 12 words. Sharp, surprising counterpoint.</fact>
  </slide>
  <slide type="controversial">
    <headline>Max 6 words. Hot take.</headline>
    <statement>Max 20 words. Unpopular opinion.</statement>
    <why>Max 15 words. Why this is true.</why>
  </slide>
  <slide type="save-this">
    <headline>Max 6 words. High-value reference.</headline>
    <items>
      <item num="1" title="Max 5 words" desc="Max 12 words" />
      <item num="2" title="Max 5 words" desc="Max 12 words" />
      <item num="3" title="Max 5 words" desc="Max 12 words" />
    </items>
    <saveText>Save this for later</saveText>
  </slide>
  <slide type="cta">
    <headline>Max 6 words. Action-oriented.</headline>
    <subtext>Max 12 words. Tell them what to do.</subtext>
    <shareText>Share with someone who needs this</shareText>
    <commentText>Comment your answer below</commentText>
  </slide>
</carousel>

## COPY RULES (NON-NEGOTIABLE)
1. HEADLINES: Must use curiosity gaps or pattern interrupts
2. POWER WORDS: Secret, Mistake, Truth, Nobody, Stop, Never, Why, How
3. MAX 5 words per line. Fragments, not sentences.
4. Active voice only. Contractions mandatory.
5. End EVERY slide with emotional punch.
6. Use "YOU" language. Make it personal.

## RETURN ONLY THE XML. NO MARKDOWN FENCES.`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Generate premium carousel slides.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const slides = parsed.root.children.filter(c => c.tag === 'slide');
    details.push(`✓ Generated ${slides.length} slides`);

    // Check copy quality
    const powerWords = ['secret', 'nobody', 'truth', 'mistake', 'stop', 'never', 'why', 'how', 'shocking', 'hidden', 'reverse'];
    let powerWordCount = 0;
    let hookCount = 0;
    let shortHeadlines = 0;

    for (const slide of slides) {
      const headline = slide.children.find(c => c.tag === 'headline')?.text?.toLowerCase() ?? '';
      const words = headline.split(' ').length;

      // Check power words
      for (const pw of powerWords) {
        if (headline.includes(pw)) powerWordCount++;
      }

      // Check hooks (curiosity gaps, pattern interrupts)
      if (headline.includes('nobody') || headline.includes('stop') || headline.includes('why') || headline.includes('you')) {
        hookCount++;
      }

      // Check short headlines
      if (words <= 6) shortHeadlines++;
    }

    details.push(`  Power words: ${powerWordCount}`);
    details.push(`  Hooks: ${hookCount}/${slides.length}`);
    details.push(`  Short headlines: ${shortHeadlines}/${slides.length}`);

    // Score
    if (slides.length >= 6) score += 20;
    if (powerWordCount >= 3) score += 25;
    if (hookCount >= 4) score += 30;
    if (shortHeadlines >= 5) score += 25;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Copy Quality',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 2: Slide Variety ──────────────────────────────────────────────────

async function testSlideVariety(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 2: SLIDE VARIETY ────────────────────────────────────┐');

  const prompt = `You are a carousel designer. Generate a carousel with VARIED slide types for maximum engagement.

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
- list: Curated list of resources/tips

## Output Format
Return a single <carousel> element with 7 slides using DIFFERENT types:

<carousel>
  <slide type="slide-type" headline="Headline" purpose="Why this slide is here" />
  <!-- ... more slides with different types -->
</carousel>

## RULES
1. Must use at least 5 DIFFERENT slide types
2. Must include at least ONE of: before-after, problem-solution, controversial, save-this
3. No two consecutive slides can be the same type
4. Each slide must have a clear purpose
5. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Generate a carousel with varied slide types.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const slides = parsed.root.children.filter(c => c.tag === 'slide');
    details.push(`✓ Generated ${slides.length} slides`);

    const types = new Set<string>();
    let consecutiveCount = 0;
    let lastType = '';

    for (const s of slides) {
      const type = s.attributes['type'];
      if (type) {
        types.add(type);
        if (type === lastType) consecutiveCount++;
        lastType = type;
      }
    }

    details.push(`  Unique types: ${types.size} — ${[...types].join(', ')}`);
    details.push(`  Consecutive duplicates: ${consecutiveCount}`);

    // Check for advanced types
    const advancedTypes = ['before-after', 'problem-solution', 'controversial', 'save-this'];
    const hasAdvanced = [...types].filter(t => advancedTypes.includes(t));
    details.push(`  Advanced types: ${hasAdvanced.length} — ${hasAdvanced.join(', ') || 'none'}`);

    // Score
    if (slides.length >= 7) score += 20;
    if (types.size >= 5) score += 30;
    if (hasAdvanced.length >= 2) score += 30;
    if (consecutiveCount === 0) score += 20;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Slide Variety',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 3: Engagement Hooks ───────────────────────────────────────────────

async function testEngagementHooks(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 3: ENGAGEMENT HOOKS ─────────────────────────────────┐');

  const prompt = `You are a social media engagement expert. Generate slides that drive saves, shares, and comments.

## Article Summary
${article.slice(0, 2000)}

## Output Format
Return a single <carousel> element with 6 slides, each with an engagement hook:

<carousel>
  <slide type="cover" headline="Hook headline" subheadline="Subheadline">
    <engagement type="scroll-stop">What makes them stop scrolling</engagement>
  </slide>
  <slide type="sequence" headline="Framework headline">
    <items>
      <item num="1" title="Title" desc="Description" />
      <item num="2" title="Title" desc="Description" />
      <item num="3" title="Title" desc="Description" />
    </items>
    <engagement type="save">What makes them save this</engagement>
  </slide>
  <slide type="myth-fact" headline="Myth headline" myth="Myth" fact="Fact">
    <engagement type="share">What makes them share this</engagement>
  </slide>
  <slide type="quote" quote="Quote text" author="Author">
    <engagement type="comment">What makes them comment</engagement>
  </slide>
  <slide type="save-this" headline="Reference headline">
    <items>
      <item num="1" title="Tip 1" desc="Description" />
      <item num="2" title="Tip 2" desc="Description" />
      <item num="3" title="Tip 3" desc="Description" />
    </items>
    <saveText>Save this for later</saveText>
    <engagement type="save">Reference card value</engagement>
  </slide>
  <slide type="cta" headline="CTA headline" subtext="CTA subtext">
    <shareText>Share with someone who needs this</shareText>
    <commentText>Comment your answer below</commentText>
    <engagement type="conversion">What action they take</engagement>
  </slide>
</carousel>

## ENGAGEMENT RULES
1. Every slide MUST have an engagement hook
2. Cover: Must stop the scroll (curiosity, pattern interrupt)
3. Sequence: Must make them save (framework, reference)
4. Myth-fact: Must make them share (surprising, contrarian)
5. Quote: Must make them comment (debate, opinion)
6. Save-this: Must make them save (high-value reference)
7. CTA: Must make them act (share, comment, follow)
8. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Generate slides with engagement hooks.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const slides = parsed.root.children.filter(c => c.tag === 'slide');
    details.push(`✓ Generated ${slides.length} slides`);

    let hooksCount = 0;
    let saveHooks = 0;
    let shareHooks = 0;
    let commentHooks = 0;

    for (const s of slides) {
      const engagement = s.children.find(c => c.tag === 'engagement');
      if (engagement) {
        hooksCount++;
        const type = engagement.attributes['type'];
        if (type === 'save') saveHooks++;
        if (type === 'share') shareHooks++;
        if (type === 'comment') commentHooks++;
      }
    }

    details.push(`  Engagement hooks: ${hooksCount}/${slides.length}`);
    details.push(`  Save hooks: ${saveHooks}`);
    details.push(`  Share hooks: ${shareHooks}`);
    details.push(`  Comment hooks: ${commentHooks}`);

    // Check for save/share text
    let hasSaveText = false;
    let hasShareText = false;
    let hasCommentText = false;

    for (const s of slides) {
      const saveText = s.children.find(c => c.tag === 'saveText')?.text;
      const shareText = s.children.find(c => c.tag === 'shareText')?.text;
      const commentText = s.children.find(c => c.tag === 'commentText')?.text;

      if (saveText) hasSaveText = true;
      if (shareText) hasShareText = true;
      if (commentText) hasCommentText = true;
    }

    details.push(`  Has save text: ${hasSaveText}`);
    details.push(`  Has share text: ${hasShareText}`);
    details.push(`  Has comment text: ${hasCommentText}`);

    // Score
    if (slides.length >= 6) score += 15;
    if (hooksCount >= 5) score += 25;
    if (saveHooks >= 2) score += 15;
    if (shareHooks >= 1) score += 15;
    if (commentHooks >= 1) score += 15;
    if (hasSaveText) score += 5;
    if (hasShareText) score += 5;
    if (hasCommentText) score += 5;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Engagement Hooks',
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
  console.log('  SLIDE GENERATION QUALITY TEST');
  console.log(`  Provider: ${PROVIDER} | Model: ${MODEL}`);
  console.log('═══════════════════════════════════════════════════════════════');

  const results: TestResult[] = [];

  // Run all tests
  results.push(await testCopyQuality(article));
  results.push(await testSlideVariety(article));
  results.push(await testEngagementHooks(article));

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');

  let totalScore = 0;
  let passed = 0;

  for (const r of results) {
    const status = r.passed ? '✓ PASS' : '✗ FAIL';
    const score = `${r.score}/100`;
    console.log(`\n  ${status} ${r.name.padEnd(25)} ${score.padStart(6)}`);
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
    console.log('  🦄 PREMIUM: Slide generation is ready for $59/month pricing.');
  } else if (avgScore >= 60) {
    console.log('  📈 GOOD: Slide generation needs iteration.');
  } else {
    console.log('  ⚠️  NEEDS WORK: Slide generation needs improvements.');
  }

  // Save results
  const outPath = new URL('../test-slide-quality-results.json', import.meta.url).pathname;
  await import('node:fs/promises').then(fs => fs.writeFile(outPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    provider: PROVIDER,
    model: MODEL,
    results: results.map(r => ({
      name: r.name,
      passed: r.passed,
      score: r.score,
      details: r.details,
      output: r.output,
    })),
    overall: {
      passed,
      total: results.length,
      averageScore: avgScore,
    },
  }, null, 2)));
  console.log(`\n  Results saved to test-slide-quality-results.json`);

  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
