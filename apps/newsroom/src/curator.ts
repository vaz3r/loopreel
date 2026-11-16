import { createLLMClient } from '@loopreel/llm';
import { NewsroomRepository, type NewsroomStoryRow } from '@loopreel/db';
import { CONFIG } from './config.js';

export interface EvaluatedPitch {
  id: string;
  editorialScore: number;
  workingTitle: string;
  coreThesis: string;
  finePrintReceipt: string;
  narrativePreset: 'mythbuster' | 'news-reporting' | 'deep-dive' | 'case-study' | 'storytelling';
  rationale: string;
  verdict: 'approved' | 'rejected';
}

function extractJson<T>(raw: string): T {
  let cleaned = raw.trim();
  const jsonMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) cleaned = jsonMatch[1].trim();
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    const lastBrace = cleaned.lastIndexOf('}');
    if (lastBrace !== -1) cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  } else if (firstBracket !== -1) {
    const lastBracket = cleaned.lastIndexOf(']');
    if (lastBracket !== -1) cleaned = cleaned.slice(firstBracket, lastBracket + 1);
  }
  return JSON.parse(cleaned) as T;
}

export class EditorialCurator {
  private llm = createLLMClient();

  async evaluateDiscoveredStories(limit = 15): Promise<EvaluatedPitch[]> {
    const stories = await NewsroomRepository.findAll({ status: 'discovered', limit });
    if (stories.length === 0) {
      console.log('[EditorialCurator] No unreviewed discovered stories in newsroom_stories.');
      return [];
    }

    console.log(`[EditorialCurator] Evaluating ${stories.length} candidate stories through Editorial Desk LLM...`);
    const pitches: EvaluatedPitch[] = [];

    // Process in batches of 5 to preserve rich context
    for (let i = 0; i < stories.length; i += 5) {
      const batch = stories.slice(i, i + 5);
      const batchResults = await this.evaluateBatch(batch);
      for (const pitch of batchResults) {
        pitches.push(pitch);

        if (pitch.verdict === 'approved' && pitch.editorialScore >= CONFIG.minEditorialScore) {
          console.log(`[EditorialCurator] ⭐ Approved pitch (${pitch.editorialScore}/10): "${pitch.workingTitle}"`);
          await NewsroomRepository.updatePitch(pitch.id, {
            editorialScore: pitch.editorialScore,
            workingTitle: pitch.workingTitle,
            coreThesis: pitch.coreThesis,
            finePrintReceipt: pitch.finePrintReceipt,
            narrativePreset: pitch.narrativePreset,
            status: 'pitched',
            metadata: {
              editorialCritique: {
                rationale: pitch.rationale,
                evaluatedAt: new Date().toISOString(),
              },
            },
          });
        } else {
          console.log(`[EditorialCurator] ❌ Passed (${pitch.editorialScore}/10): ${pitch.workingTitle || 'Low signal'}`);
          await NewsroomRepository.updateStatus(pitch.id, 'rejected', {
            editorialCritique: {
              score: pitch.editorialScore,
              rationale: pitch.rationale,
              evaluatedAt: new Date().toISOString(),
            },
          });
        }
      }
    }

    return pitches;
  }

  private async evaluateBatch(stories: NewsroomStoryRow[]): Promise<EvaluatedPitch[]> {
    const systemPrompt = `You are the Executive Managing Editor at "The Fine Print", an elite investigative publication dedicated to corporate contract autopsies, hidden fees, arbitration traps, and fine-print receipts.

YOUR EDITORIAL CRITERIA:
1. High-Value Subject Matter: Must involve a real company or institution using fine print, contract terms, arbitration waivers, deceptive pricing, or regulatory loopholes against consumers or clients.
2. Concrete Receipts: Must have a tangible controversy, dollar figure, court filing, regulatory action (FTC, SEC, CFPB, DOT), or terms revision.
3. Strict Filter: REJECT generic political speeches, macro stock analysis, clickbait gossip, cryptocurrency trading speculation, or superficial consumer complaint articles without structural legal/contractual mechanisms.
4. Score 1.0 to 10.0:
   - 9.0–10.0: Iconic corporate fine print scandal (e.g. Disney claiming Disney+ free trial waives wrongful death lawsuits, Starbucks gift card float exceeding $1.8B without banking regulation, airlines secretly overbooking flights by 115%).
   - 7.5–8.9: Strong, actionable corporate investigation with clear receipts.
   - < 7.5: Reject as low signal.

For each story, output:
- id: the story UUID
- editorialScore: float between 1.0 and 10.0
- verdict: "approved" (if score >= ${CONFIG.minEditorialScore}) or "rejected"
- workingTitle: Punchy, non-clickbait, art-directed editorial headline (under 8 words)
- coreThesis: 2 sentences articulating the exact fine print loophole or contractual trap
- finePrintReceipt: The specific clause, fee, regulatory docket, or dollar amount
- narrativePreset: "mythbuster" | "news-reporting" | "deep-dive" | "case-study" | "storytelling"
- rationale: 1-2 sentences on why it meets or fails the bar`;

    const userPrompt = `Evaluate the following candidate news leads for "The Fine Print":

${stories.map((s, idx) => `[Story ${idx + 1}]
ID: ${s.id}
Source: ${s.source_name}
Headline: ${s.source_headline}
Snippet: ${s.source_snippet || 'No snippet available'}
URL: ${s.source_url}
---`).join('\n\n')}

Return JSON matching:
{
  "pitches": [
    {
      "id": "uuid",
      "editorialScore": 8.5,
      "verdict": "approved",
      "workingTitle": "Headline Under Eight Words",
      "coreThesis": "Two sentences explaining the contract mechanism.",
      "finePrintReceipt": "Specific terms section, dollar amount, or legal docket.",
      "narrativePreset": "mythbuster",
      "rationale": "Why it passes or fails the editorial bar."
    }
  ]
}`;

    try {
      const response = await this.llm.generateJSON(systemPrompt, userPrompt, 0.2);
      const data = extractJson<{ pitches: EvaluatedPitch[] }>(response.text);
      return data.pitches || [];
    } catch (err: any) {
      console.error('[EditorialCurator] Batch LLM evaluation failed:', err.message);
      return [];
    }
  }
}
