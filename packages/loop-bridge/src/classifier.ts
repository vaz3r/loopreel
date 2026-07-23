import type { TemplateId } from '@loopreel/schemas';
import { createLLMClient } from '@loopreel/llm';

export interface ClassificationResult {
  templateId: TemplateId;
  rationale: string;
  confidence: number;
}

const TEMPLATE_CHARACTERISTICS: Record<TemplateId, { name: string; keywords: string[]; description: string }> = {
  'the-terminal': {
    name: 'The Terminal',
    keywords: [
      'cpi', 'inflation', 'yield', 'fed', 'interest rate', 'hike', 'cuts', 'market',
      'ticker', 'crypto', 'bitcoin', 'equity', 'bonds', 'sec', 'earnings', 'q1', 'q2',
      'q3', 'q4', 'algorithm', 'quant', 'volatility', 's&p', 'nasdaq', 'fund', 'options'
    ],
    description: 'Quantitative finance, real-time market data, technical algorithms, and high-density financial metrics.',
  },
  'the-academic': {
    name: 'The Academic',
    keywords: [
      'doi:', 'paper', 'research', 'study', 'empirical', 'methodology', 'university',
      'journal', 'hypothesis', 'regression', 'statistically significant', 'p-value',
      'literature review', 'hbr', 'mit', 'stanford', 'harvard', 'meta-analysis', 'dataset'
    ],
    description: 'Academic research, peer-reviewed studies, HBR-style essays, and methodology-driven insights.',
  },
  'the-globalist': {
    name: 'The Globalist',
    keywords: [
      'g7', 'g20', 'imf', 'world bank', 'central bank', 'foreign policy', 'geopolitics',
      'trade war', 'sanctions', 'conglomerate', 'debt maturing', 'tariffs', 'diplomacy',
      'sovereign', 'macro-economics', 'global economy', 'frankfurt', 'davos', 'wef'
    ],
    description: 'Macro-economic policy, geopolitical analysis, international trade, and global affairs.',
  },
  'the-curator': {
    name: 'The Curator',
    keywords: [
      'architecture', 'minimalism', 'negative space', 'moma', 'gallery', 'exhibition',
      'luxury', 'couture', 'aesthetic', 'design system', 'curated', 'monochrome', 'typography',
      'avant-garde', 'sculpture', 'interior', 'visual balance'
    ],
    description: 'Avant-garde design, architectural studies, luxury, minimalist portfolios, and art gallery curation.',
  },
  'paper-of-record': {
    name: 'The Paper of Record',
    keywords: [
      'breaking news', 'investigation', 'report', 'editorial', 'journalism', 'politics',
      'white house', 'congress', 'tech industry', 'ai', 'climate', 'healthcare', 'society'
    ],
    description: 'Classic investigative journalism, broad breaking news, editorial features, and general non-fiction stories.',
  },
};

/**
 * Fast pre-flight heuristic classification based on keyword density
 */
export function classifyByHeuristics(rawText: string): ClassificationResult {
  const text = rawText.toLowerCase();
  const scores: Record<TemplateId, number> = {
    'paper-of-record': 1, // base default score
    'the-globalist': 0,
    'the-terminal': 0,
    'the-curator': 0,
    'the-academic': 0,
  };

  for (const [tid, char] of Object.entries(TEMPLATE_CHARACTERISTICS) as Array<[TemplateId, typeof TEMPLATE_CHARACTERISTICS[TemplateId]]>) {
    for (const kw of char.keywords) {
      if (text.includes(kw)) {
        scores[tid] += 1;
      }
    }
  }

  let bestTemplate: TemplateId = 'paper-of-record';
  let maxScore = scores['paper-of-record'];

  for (const [tid, score] of Object.entries(scores) as Array<[TemplateId, number]>) {
    if (score > maxScore) {
      maxScore = score;
      bestTemplate = tid;
    }
  }

  const confidence = Math.min(1.0, maxScore / 5);

  return {
    templateId: bestTemplate,
    rationale: `Heuristic keyword density score of ${maxScore} for "${TEMPLATE_CHARACTERISTICS[bestTemplate].name}"`,
    confidence,
  };
}

/**
 * State-of-the-Art Dynamic LLM Template Auto-Selection Engine
 */
export async function autoSelectTemplate(rawText: string): Promise<ClassificationResult> {
  const heuristicResult = classifyByHeuristics(rawText);

  // If heuristic confidence is high (3+ matching keywords), return fast heuristic result
  if (heuristicResult.confidence >= 0.6) {
    return heuristicResult;
  }

  try {
    const llm = createLLMClient();
    const systemPrompt = `You are an expert editorial director and design strategist.
Analyze the provided article text and select the single best presentation template ID from the available choices below:

Available Templates:
1. "paper-of-record": Classic newspaper editorial (New York Times style). Best for breaking news, investigative stories, and general journalism.
2. "the-globalist": Macro-economics & geopolitics magazine (Economist / Monocle style). Best for central banks, trade policy, and global affairs.
3. "the-terminal": Quantitative market intelligence (Bloomberg Terminal style). Best for markets, crypto, interest rates, metrics, and algorithms.
4. "the-curator": Avant-garde design & architecture (MoMA gallery style). Best for luxury, minimal design, art, and architectural studies.
5. "the-academic": Peer-reviewed research paper (Harvard Business Review / MIT style). Best for empirical data, academic papers, and scientific studies.

Respond ONLY with a JSON object in the following format:
{
  "selectedTemplate": "paper-of-record" | "the-globalist" | "the-terminal" | "the-curator" | "the-academic",
  "rationale": "Brief 1-sentence reason for selection"
}`;

    const llmResponse = await llm.generateJSON(systemPrompt, rawText.slice(0, 3000));
    const jsonMatch = llmResponse.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as { selectedTemplate?: string; rationale?: string };
      const selected = parsed.selectedTemplate as TemplateId;

      if (TEMPLATE_CHARACTERISTICS[selected]) {
        return {
          templateId: selected,
          rationale: parsed.rationale || `LLM selected "${TEMPLATE_CHARACTERISTICS[selected].name}"`,
          confidence: 0.95,
        };
      }
    }
  } catch {
    // Fall back to heuristic classification on any LLM error
  }

  return heuristicResult;
}
