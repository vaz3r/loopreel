/**
 * ADVANCED LLM FEATURES TEST SUITE
 *
 * Tests 5 advanced features that make this product truly irreplaceable:
 * 1. Performance Prediction Engine — Will this carousel go viral?
 * 2. A/B Testing Suggestions — Multiple variations for testing
 * 3. Platform-Specific Optimization — Instagram vs LinkedIn vs Twitter
 * 4. Content Scoring & Improvement — Rate quality and suggest improvements
 * 5. Repurpose Engine — Carousel → Stories → Reels → Posts
 *
 * Run: pnpm tsx scripts/test-advanced-features.ts
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

// ─── TEST 1: Performance Prediction Engine ───────────────────────────────────

async function testPerformancePrediction(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 1: PERFORMANCE PREDICTION ENGINE ────────────────────┐');

  const prompt = `You are a social media analytics expert. Analyze a carousel's potential performance BEFORE it goes live.

## Carousel Content
The carousel is about: ${article.slice(0, 2000)}

## Output Format
Return a single <performancePrediction> element:

<performancePrediction>
  <viralityScore>0-100</viralityScore>
  <engagementPrediction>
    <saves>Expected save rate (e.g., "High - reference card style")</saves>
    <shares>Expected share rate (e.g., "Medium - niche topic")</shares>
    <comments>Expected comment rate (e.g., "High - controversial take")</comments>
    <completionRate>Expected completion rate (e.g., "85% - strong hook")</completionRate>
  </engagementPrediction>
  <strengths>
    <strength>What makes this carousel strong</strength>
  </strengths>
  <weaknesses>
    <weakness>What could be improved</weakness>
  </weaknesses>
  <improvementSuggestions>
    <suggestion specific="true">Specific actionable improvement</suggestion>
  </improvementSuggestions>
  <bestTimeToPost>Optimal posting time based on content type</bestTimeToPost>
  <targetAudience>Who will engage most with this content</targetAudience>
</performancePrediction>

## Rules
1. Virality score must be realistic (not everything is 100)
2. Strengths and weaknesses must be specific to THIS carousel
3. Improvements must be actionable (not generic advice)
4. Best time to post must consider the niche (tech/startups = weekday mornings)
5. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Predict the performance of this carousel.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const virality = parsed.root.children.find(c => c.tag === 'viralityScore')?.text;
    details.push(`✓ Virality score: ${virality}/100`);

    const strengths = parsed.root.children.find(c => c.tag === 'strengths')?.children ?? [];
    const weaknesses = parsed.root.children.find(c => c.tag === 'weaknesses')?.children ?? [];
    const suggestions = parsed.root.children.find(c => c.tag === 'improvementSuggestions')?.children ?? [];

    details.push(`  Strengths: ${strengths.length}`);
    details.push(`  Weaknesses: ${weaknesses.length}`);
    details.push(`  Improvement suggestions: ${suggestions.length}`);

    const bestTime = parsed.root.children.find(c => c.tag === 'bestTimeToPost')?.text;
    details.push(`  Best time to post: ${bestTime}`);

    const audience = parsed.root.children.find(c => c.tag === 'targetAudience')?.text;
    details.push(`  Target audience: ${audience?.slice(0, 60)}...`);

    // Score
    if (virality && parseInt(virality) > 0) score += 20;
    if (strengths.length >= 2) score += 20;
    if (weaknesses.length >= 2) score += 20;
    if (suggestions.length >= 2) score += 20;
    if (bestTime) score += 10;
    if (audience) score += 10;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Performance Prediction Engine',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 2: A/B Testing Suggestions ────────────────────────────────────────

async function testABTesting(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 2: A/B TESTING SUGGESTIONS ──────────────────────────┐');

  const prompt = `You are a conversion optimization expert. Generate 3 A/B test variations for a carousel cover slide.

## Article Summary
${article.slice(0, 2000)}

## Output Format
Return a single <abTests> element containing 3 <variation> elements:

<abTests>
  <variation id="A" hypothesis="Why this version should win">
    <headline>Max 8 words</headline>
    <subheadline>Max 15 words</subheadline>
    <visualStyle>How this version looks different</visualStyle>
    <targetEmotion>What emotion this triggers</targetEmotion>
    <expectedWinner>true/false</expectedWinner>
    <reasoning>Why you think this will win</reasoning>
  </variation>
  <variation id="B" hypothesis="Why this version should win">
    <!-- Same structure -->
  </variation>
  <variation id="C" hypothesis="Why this version should win">
    <!-- Same structure -->
  </variation>
  <testStrategy>How to run this A/B test (duration, metrics, sample size)</testStrategy>
</abTests>

## Rules
1. Each variation MUST be meaningfully different (not just word swaps)
2. Hypotheses must be specific and testable
3. Visual styles must be different (colors, layouts, typography)
4. Target emotions must be different (curiosity vs fear vs FOMO)
5. Only ONE variation can be expected winner
6. Test strategy must be actionable
7. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Generate 3 A/B test variations for this carousel.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const variations = parsed.root.children.filter(c => c.tag === 'variation');
    details.push(`✓ Generated ${variations.length} variations`);

    const hypotheses = new Set<string>();
    const emotions = new Set<string>();
    let winnerCount = 0;

    for (const v of variations) {
      const hypothesis = v.attributes['hypothesis'];
      if (hypothesis) hypotheses.add(hypothesis);

      const emotion = v.children.find(c => c.tag === 'targetEmotion')?.text;
      if (emotion) emotions.add(emotion);

      const winner = v.attributes['expectedWinner'];
      if (winner === 'true') winnerCount++;
    }

    details.push(`  Hypotheses: ${hypotheses.size} unique`);
    details.push(`  Emotions: ${emotions.size} unique — ${[...emotions].join(', ')}`);
    details.push(`  Expected winners: ${winnerCount}`);

    const testStrategy = parsed.root.children.find(c => c.tag === 'testStrategy')?.text;
    details.push(`  Test strategy: ${testStrategy?.slice(0, 80)}...`);

    // Score
    if (variations.length >= 3) score += 25;
    if (hypotheses.size >= 3) score += 25;
    if (emotions.size >= 3) score += 25;
    if (winnerCount === 1) score += 15;
    if (testStrategy && testStrategy.length > 20) score += 10;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'A/B Testing Suggestions',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 3: Platform-Specific Optimization ─────────────────────────────────

async function testPlatformOptimization(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 3: PLATFORM-SPECIFIC OPTIMIZATION ───────────────────┐');

  const prompt = `You are a social media strategist. Optimize the same carousel for 3 different platforms.

## Article Summary
${article.slice(0, 2000)}

## Output Format
Return a single <platformOptimizations> element:

<platformOptimizations>
  <platform name="instagram">
    <optimalLength>Number of slides</optimalLength>
    <captionStyle>How to write the caption (e.g., "Storytelling with emojis")</captionStyle>
    <hashtagStrategy>Number and type of hashtags</hashtagStrategy>
    <bestTime>When to post</bestTime>
    <visualAdjustments>What to change visually (e.g., "More colorful, bolder fonts")</visualAdjustments>
    <engagementTactics>Platform-specific engagement tactics</engagementTactics>
  </platform>
  <platform name="linkedin">
    <!-- Same structure -->
  </platform>
  <platform name="twitter">
    <!-- Same structure -->
  </platform>
</platformOptimizations>

## Rules
1. Each platform MUST have different recommendations
2. Instagram: Visual-first, hashtags critical, Stories integration
3. LinkedIn: Professional tone, longer captions, thought leadership
4. Twitter: Concise, thread-friendly, conversation-starting
5. Best times must be platform-specific
6. Visual adjustments must consider platform norms
7. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Optimize this carousel for 3 different platforms.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const platforms = parsed.root.children.filter(c => c.tag === 'platform');
    details.push(`✓ Optimized for ${platforms.length} platforms`);

    const platformNames = platforms.map(p => p.attributes['name']);
    details.push(`  Platforms: ${platformNames.join(', ')}`);

    // Check each platform has unique recommendations
    const lengths = new Set<string>();
    const times = new Set<string>();

    for (const p of platforms) {
      const length = p.children.find(c => c.tag === 'optimalLength')?.text;
      const time = p.children.find(c => c.tag === 'bestTime')?.text;
      if (length) lengths.add(length);
      if (time) times.add(time);
    }

    details.push(`  Unique lengths: ${lengths.size}`);
    details.push(`  Unique best times: ${times.size}`);

    // Score
    if (platforms.length >= 3) score += 30;
    if (lengths.size >= 2) score += 20;
    if (times.size >= 3) score += 30;

    // Check for platform-specific features
    for (const p of platforms) {
      const name = p.attributes['name'];
      const tactics = p.children.find(c => c.tag === 'engagementTactics')?.text ?? '';
      if (name === 'instagram' && (tactics.includes('hashtag') || tactics.includes('story'))) score += 5;
      if (name === 'linkedin' && (tactics.includes('professional') || tactics.includes('thought'))) score += 5;
      if (name === 'twitter' && (tactics.includes('thread') || tactics.includes('conversation'))) score += 5;
    }
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Platform-Specific Optimization',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 4: Content Scoring & Improvement ──────────────────────────────────

async function testContentScoring(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 4: CONTENT SCORING & IMPROVEMENT ────────────────────┐');

  const prompt = `You are a content quality auditor. Score a carousel and provide specific improvements.

## Carousel Content
The carousel is about: ${article.slice(0, 2000)}

## Output Format
Return a single <contentAudit> element:

<contentAudit>
  <overallScore>0-100</overallScore>
  <scores>
    <hookScore>0-100: How strong is the hook?</hookScore>
    <valueScore>0-100: How much value does it provide?</valueScore>
    <clarityScore>0-100: How clear is the messaging?</clarityScore>
    <engagementScore>0-100: How engaging is it?</engagementScore>
    <uniquenessScore>0-100: How unique is it?</uniquenessScore>
  </scores>
  <improvements>
    <improvement priority="high" area="hook">Specific improvement for the hook</improvement>
    <improvement priority="medium" area="value">Specific improvement for value</improvement>
    <improvement priority="low" area="clarity">Specific improvement for clarity</improvement>
  </improvements>
  <beforeAfter>
    <before>Current headline/subheadline</before>
    <after>Improved version</after>
    <why>This is better because...</why>
  </beforeAfter>
</contentAudit>

## Rules
1. Scores must be realistic (not everything is 100)
2. Improvements must be SPECIFIC and ACTIONABLE
3. Before/after must show clear improvement
4. Priority must be based on impact (high = biggest improvement)
5. Each improvement must address a different area
6. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Audit and score this carousel.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const overall = parsed.root.children.find(c => c.tag === 'overallScore')?.text;
    details.push(`✓ Overall score: ${overall}/100`);

    const scores = parsed.root.children.find(c => c.tag === 'scores');
    if (scores) {
      const scoreNames = ['hookScore', 'valueScore', 'clarityScore', 'engagementScore', 'uniquenessScore'];
      for (const s of scoreNames) {
        const val = scores.children.find(c => c.tag === s)?.text;
        details.push(`  ${s}: ${val}/100`);
      }
    }

    const improvements = parsed.root.children.find(c => c.tag === 'improvements')?.children ?? [];
    details.push(`  Improvements: ${improvements.length}`);

    const beforeAfter = parsed.root.children.find(c => c.tag === 'beforeAfter');
    if (beforeAfter) {
      const before = beforeAfter.children.find(c => c.tag === 'before')?.text;
      const after = beforeAfter.children.find(c => c.tag === 'after')?.text;
      details.push(`  Before: "${before?.slice(0, 50)}..."`);
      details.push(`  After: "${after?.slice(0, 50)}..."`);
    }

    // Score
    if (overall && parseInt(overall) > 0) score += 20;
    if (scores) score += 20;
    if (improvements.length >= 3) score += 20;
    if (beforeAfter) score += 20;

    // Check for actionable improvements
    let actionableCount = 0;
    for (const imp of improvements) {
      const text = imp.text ?? '';
      if (text.includes('use') || text.includes('add') || text.includes('change') || text.includes('make')) {
        actionableCount++;
      }
    }
    details.push(`  Actionable improvements: ${actionableCount}/${improvements.length}`);
    if (actionableCount >= 2) score += 20;
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Content Scoring & Improvement',
    passed: score >= 70,
    score,
    details,
    output: parsed.root ? xmlToObjects(parsed.root) : null,
  };
}

// ─── TEST 5: Repurpose Engine ───────────────────────────────────────────────

async function testRepurposeEngine(article: string): Promise<TestResult> {
  console.log('\n┌─ TEST 5: REPURPOSE ENGINE ─────────────────────────────────┐');

  const prompt = `You are a content repurposing expert. Transform a carousel into multiple content formats.

## Original Carousel
The carousel is about: ${article.slice(0, 2000)}

## Output Format
Return a single <repurposedContent> element:

<repurposedContent>
  <format name="instagram-story">
    <content>How to adapt this carousel for Instagram Stories (3-5 slides)</content>
    <textOverlay>What text goes on each story slide</textOverlay>
    <cta>Call to action for stories</cta>
  </format>
  <format name="linkedin-post">
    <content>How to adapt this carousel for a LinkedIn text post</content>
    <hook>Opening line that stops the scroll</hook>
    <body>Post body (max 1300 characters)</body>
    <cta>Call to action</cta>
  </format>
  <format name="twitter-thread">
    <content>How to adapt this carousel for a Twitter thread</content>
    <tweet1>First tweet (hook)</tweet1>
    <tweetCount>Number of tweets in thread</tweetCount>
    <cta>Final tweet CTA</cta>
  </format>
  <format name="youtube-short">
    <content>How to adapt this carousel for a YouTube Short script</content>
    <hook>First 3 seconds</hook>
    <script>15-60 second script</script>
    <cta>End screen CTA</cta>
  </format>
  <format name="newsletter">
    <content>How to adapt this carousel for an email newsletter</content>
    <subjectLine>Email subject line</subjectLine>
    <previewText>Preview text (max 100 chars)</previewText>
    <body>Email body (max 500 words)</body>
  </format>
</repurposedContent>

## Rules
1. Each format must be native to the platform (not just copy-paste)
2. Instagram Stories: Vertical, quick cuts, text overlays
3. LinkedIn: Professional, thought leadership, longer form
4. Twitter: Concise, thread-friendly, conversation-starting
5. YouTube Short: Hook in 3 seconds, visual, fast-paced
6. Newsletter: Personal, valuable, action-oriented
7. Return ONLY the XML, no markdown fences`;

  const { text: raw, latencyMs } = await callLLM(prompt, 'Repurpose this carousel into multiple formats.');
  const cleaned = stripFences(raw);
  const parsed = tryParseXml(cleaned);

  const details: string[] = [];
  let score = 0;

  if (parsed.ok && parsed.root) {
    const formats = parsed.root.children.filter(c => c.tag === 'format');
    details.push(`✓ Generated ${formats.length} repurposed formats`);

    const formatNames = formats.map(f => f.attributes['name']);
    details.push(`  Formats: ${formatNames.join(', ')}`);

    // Check each format has content
    let formatsWithContent = 0;
    for (const f of formats) {
      const content = f.children.find(c => c.tag === 'content')?.text ?? '';
      if (content.length > 20) formatsWithContent++;
    }
    details.push(`  Formats with content: ${formatsWithContent}/${formats.length}`);

    // Score
    if (formats.length >= 5) score += 25;
    if (formatsWithContent >= 4) score += 25;

    // Check for platform-specific features
    for (const f of formats) {
      const name = f.attributes['name'];
      if (name === 'instagram-story') {
        const textOverlay = f.children.find(c => c.tag === 'textOverlay')?.text ?? '';
        if (textOverlay.length > 10) score += 5;
      }
      if (name === 'twitter-thread') {
        const tweetCount = f.children.find(c => c.tag === 'tweetCount')?.text;
        if (tweetCount && parseInt(tweetCount) > 0) score += 5;
      }
      if (name === 'newsletter') {
        const subjectLine = f.children.find(c => c.tag === 'subjectLine')?.text ?? '';
        if (subjectLine.length > 5) score += 5;
      }
    }
  } else {
    details.push(`✗ Parse error: ${parsed.error}`);
  }

  details.push(`  Latency: ${latencyMs}ms`);

  return {
    name: 'Repurpose Engine',
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
  console.log('  ADVANCED LLM FEATURES TEST SUITE');
  console.log(`  Provider: ${PROVIDER} | Model: ${MODEL}`);
  console.log('═══════════════════════════════════════════════════════════════');

  const results: TestResult[] = [];

  // Run all tests
  results.push(await testPerformancePrediction(article));
  results.push(await testABTesting(article));
  results.push(await testPlatformOptimization(article));
  results.push(await testContentScoring(article));
  results.push(await testRepurposeEngine(article));

  // Summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');

  let totalScore = 0;
  let passed = 0;

  for (const r of results) {
    const status = r.passed ? '✓ PASS' : '✗ FAIL';
    const score = `${r.score}/100`;
    console.log(`\n  ${status} ${r.name.padEnd(35)} ${score.padStart(6)}`);
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
    console.log('  🦄 UNICORN STATUS: Advanced features ready for implementation.');
    console.log('  Product is truly irreplaceable for marketing agencies.');
  } else if (avgScore >= 60) {
    console.log('  📈 STRONG: Advanced features need iteration.');
    console.log('  Close to irreplaceable, but not there yet.');
  } else {
    console.log('  ⚠️  NEEDS WORK: Advanced features need significant improvements.');
  }

  // Save results
  const outPath = new URL('../test-advanced-results.json', import.meta.url).pathname;
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
  console.log(`\n  Results saved to test-advanced-results.json`);

  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
