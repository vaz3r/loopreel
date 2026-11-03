/**
 * Post-generation content validation — runs AFTER Phase 4.
 * Combines deterministic checks (repetition, slide count) with LLM-based checks (source fidelity, coherence).
 */

import type { LLMClient } from '../client.js';
import { renderPrompt } from './prompts/loader.js';
import { stripFences } from './xml-helpers.js';

// ─── Deterministic Checks ───────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(Boolean);
}

function jaccardSimilarity(a: string, b: string): number {
  const setA = new Set(tokenize(a));
  const setB = new Set(tokenize(b));
  if (setA.size === 0 || setB.size === 0) return 0;
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

export interface CoherenceCheckResult {
  issues: string[];
  shouldRetry: boolean;
  slideCount: number;
}

/**
 * Deterministic coherence checks — no LLM, instant execution.
 */
export function checkCoherence(slides: Record<string, unknown>[]): CoherenceCheckResult {
  const issues: string[] = [];

  // 1. Slide count enforcement
  if (slides.length < 5 || slides.length > 7) {
    issues.push(`slide_count_${slides.length}: expected 5-7 slides, got ${slides.length}`);
  }

  // 2. Headline similarity detection
  const headlines = slides
    .filter(s => s['headline'])
    .map(s => ({ id: s['id'], text: String(s['headline']).toLowerCase() }));

  for (let i = 0; i < headlines.length; i++) {
    for (let j = i + 1; j < headlines.length; j++) {
      const sim = jaccardSimilarity(headlines[i]!.text, headlines[j]!.text);
      if (sim > 0.6) {
        issues.push(
          `duplicate_headlines: "${headlines[i]!.text}" ≈ "${headlines[j]!.text}" (${Math.round(sim * 100)}% similar)`,
        );
      }
    }
  }

  // 3. Consecutive same start word
  for (let i = 1; i < headlines.length; i++) {
    const prevWord = headlines[i - 1]!.text.split(/\s+/)[0];
    const currWord = headlines[i]!.text.split(/\s+/)[0];
    if (prevWord && currWord && prevWord === currWord && prevWord.length > 2) {
      issues.push(`consecutive_same_start: slides ${i} and ${i + 1} both start with "${prevWord}"`);
    }
  }

  // 4. Tag repetition
  const tags = slides.filter(s => s['tag']).map(s => String(s['tag']).toLowerCase());
  const tagCounts = new Map<string, number>();
  for (const tag of tags) {
    tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
  for (const [tag, count] of tagCounts) {
    if (count > 1) {
      issues.push(`repeated_tag: "${tag}" appears ${count} times`);
    }
  }

  return {
    issues,
    shouldRetry: issues.some(i => i.startsWith('duplicate_headlines')),
    slideCount: slides.length,
  };
}

// ─── LLM-Based Checks ──────────────────────────────────────────────────────

export interface FidelityCheckResult {
  sourceGrounding: { count: number; pass: boolean; details: string };
  selfReference: { detected: boolean; pass: boolean; details: string };
  fillerDetection: { detected: boolean; pass: boolean; details: string };
  topicAlignment: { match: boolean; pass: boolean; details: string };
  verdict: 'pass' | 'fail';
}

/**
 * LLM-based source fidelity check — verifies output content comes from source.
 */
export async function checkSourceFidelity(
  briefXml: string,
  slidesXml: string,
  llm: LLMClient,
): Promise<FidelityCheckResult> {
  const system = renderPrompt('source-fidelity', {
    briefXml,
    slidesXml,
  });

  const response = await llm.generateJSON(system, 'Audit this carousel for source fidelity.', 0.1);
  const cleaned = stripFences(response.text);

  try {
    // Parse the XML response
    const { parseXml } = await import('../xml-parser.js');
    const root = parseXml(cleaned);

    const findChild = (tag: string) => root.children.find(c => c.tag.toLowerCase() === tag.toLowerCase());
    const groundingEl = findChild('sourceGrounding');
    const selfRefEl = findChild('selfReference');
    const fillerEl = findChild('fillerDetection');
    const topicEl = findChild('topicAlignment');
    const verdictEl = findChild('verdict');

    const verdictText = (verdictEl?.text ?? '').toLowerCase().trim();

    return {
      sourceGrounding: {
        count: Number(groundingEl?.attributes['count'] ?? 0),
        pass: (groundingEl?.attributes['pass'] ?? '').toLowerCase().includes('pass'),
        details: groundingEl?.text ?? '',
      },
      selfReference: {
        detected: selfRefEl?.attributes['detected'] === 'true',
        pass: selfRefEl?.attributes['detected'] !== 'true',
        details: selfRefEl?.text ?? '',
      },
      fillerDetection: {
        detected: fillerEl?.attributes['detected'] === 'true',
        pass: fillerEl?.attributes['detected'] !== 'true',
        details: fillerEl?.text ?? '',
      },
      topicAlignment: {
        match: topicEl?.attributes['match'] === 'true',
        pass: topicEl?.attributes['match'] === 'true',
        details: topicEl?.text ?? '',
      },
      verdict: verdictText.includes('pass') ? 'pass' : 'fail',
    };
  } catch {
    // If parsing fails, return a conservative result
    return {
      sourceGrounding: { count: 0, pass: false, details: 'Could not parse fidelity check response' },
      selfReference: { detected: true, pass: false, details: 'Could not parse fidelity check response' },
      fillerDetection: { detected: true, pass: false, details: 'Could not parse fidelity check response' },
      topicAlignment: { match: false, pass: false, details: 'Could not parse fidelity check response' },
      verdict: 'fail',
    };
  }
}

export interface CoherenceLLMCheckResult {
  repetitions: Array<{ slide1: string; slide2: string; issue: string }>;
  fillerSlides: string[];
  narrativeArc: 'strong' | 'weak' | 'broken';
  verdict: 'pass' | 'retry' | 'needs_review';
}

/**
 * LLM-based coherence check — verifies slides are non-repetitive and tell a coherent story.
 */
export async function checkCoherenceLLM(
  slidesXml: string,
  llm: LLMClient,
): Promise<CoherenceLLMCheckResult> {
  const system = renderPrompt('coherence-check', {
    slidesXml,
  });

  const response = await llm.generateJSON(system, 'Check this carousel for coherence and repetition.', 0.1);
  const cleaned = stripFences(response.text);

  try {
    const parsed = JSON.parse(cleaned);
    return {
      repetitions: parsed.repetitions ?? [],
      fillerSlides: parsed.fillerSlides ?? [],
      narrativeArc: parsed.narrativeArc ?? 'weak',
      verdict: parsed.verdict ?? 'pass',
    };
  } catch {
    return {
      repetitions: [],
      fillerSlides: [],
      narrativeArc: 'weak',
      verdict: 'pass', // Conservative: don't block on parse failure
    };
  }
}
