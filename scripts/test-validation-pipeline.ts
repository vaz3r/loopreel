/**
 * Validation Pipeline & Mock Brain Test
 * Tests:
 * 1. Phase 0 Deterministic Input Validation (short text, error pages, noise, valid)
 * 2. Phase 4.7 Deterministic Coherence Checking (slide count, headline similarity)
 * 3. Phase 4.7 LLM Fidelity & Narrative Coherence Checking (with MockLLMClient)
 * 4. End-to-End generateSlides Orchestrator with MockLLMClient
 */

import { validateInput } from '../packages/llm/src/brain/input-validator.js';
import { checkCoherence, checkSourceFidelity, checkCoherenceLLM } from '../packages/llm/src/brain/content-validator.js';
import { MockLLMClient } from '../packages/llm/src/providers/mock.js';
import { generateSlides } from '../packages/llm/src/brain/orchestrator.js';
import type { TemplateInfo } from '../packages/llm/src/brain/types.js';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${msg}`);
    process.exit(1);
  }
  console.log(`  ✅ ${msg}`);
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 LOOPREEL VALIDATION & PIPELINE VERIFICATION');
  console.log('====================================================\n');

  // 1. Input Validation Tests
  console.log('1. Testing Phase 0: Input Validator');
  const shortResult = validateInput('Too short content');
  assert(!shortResult.valid && shortResult.reason === 'input_too_short', 'Rejects input shorter than 500 chars');

  const errorResult = validateInput(
    'Error 404: Page not found. Access denied. The requested URL was not found on this server. Please contact your system administrator.',
  );
  assert(!errorResult.valid, 'Rejects error pages with error signals');

  const validArticle = `
Artificial intelligence is rapidly advancing across enterprise applications in 2026.
Researchers and engineers have observed that autonomous agents are increasingly capable of executing complex workflows.
Rather than simple single-prompt operations, modern systems coordinate multiple specialized agents in sequence.

Furthermore, on-device compute has matured to the point where latency-critical reasoning can take place at the edge.
Companies are adopting hybrid deployment strategies to keep sensitive customer data localized while leveraging cloud clusters for heavy training.

According to recent industry telemetry, enterprise adoption of agentic pipelines increased by 42% over the previous year.
Organizations report significant reductions in manual processing times for knowledge-heavy document workflows.
These operational shifts represent a structural transformation in software architecture.
`.repeat(2);

  const validResult = validateInput(validArticle);
  assert(validResult.valid, `Accepts valid substantive content (${validResult.textLength} chars, ${validResult.bodyLineCount} lines)`);

  // 2. Coherence Checks
  console.log('\n2. Testing Phase 4.7: Deterministic Coherence Check');
  const tooFewSlides = [
    { id: 'slide-01', headline: 'One' },
    { id: 'slide-02', headline: 'Two' },
  ];
  const tooFewRes = checkCoherence(tooFewSlides);
  assert(tooFewRes.issues.some(i => i.includes('slide_count')), 'Flags slide count outside 5-7 range');

  const duplicateSlides = [
    { id: 'slide-01', headline: 'Why Artificial Intelligence Matters Today' },
    { id: 'slide-02', headline: 'Why Artificial Intelligence Matters Most Today' },
    { id: 'slide-03', headline: 'Another Distinct Topic' },
    { id: 'slide-04', headline: 'Fourth Insight Point' },
    { id: 'slide-05', headline: 'Call To Action Here' },
  ];
  const dupRes = checkCoherence(duplicateSlides);
  assert(dupRes.shouldRetry && dupRes.issues.some(i => i.includes('duplicate_headlines')), 'Detects similar headlines and signals retry');

  // 3. LLM Fidelity & Coherence Checks (Mock)
  console.log('\n3. Testing Phase 4.7: LLM Fidelity & Coherence Checks');
  const mockLlm = new MockLLMClient();
  const fidelityRes = await checkSourceFidelity('<contentBrief>test</contentBrief>', '<presentation/>', mockLlm);
  assert(fidelityRes.verdict === 'pass', 'Source fidelity check passes with mock LLM');
  assert(!fidelityRes.selfReference.detected, 'Self reference detected is false');

  const coherenceRes = await checkCoherenceLLM('<presentation/>', mockLlm);
  assert(coherenceRes.verdict === 'pass', 'Coherence LLM check passes with mock LLM');

  // 4. End-to-End Orchestrator Slide Generation
  console.log('\n4. Testing End-to-End generateSlides Orchestrator');
  const mockTemplates: TemplateInfo[] = [
    {
      id: 'paper-of-record',
      name: 'The Paper of Record',
      aesthetics: 'Authoritative newspaper editorial',
      schemaText: '<template id="paper-of-record"><slide type="cover"/></template>',
      schemaTextConcise: 'cover: Cover slide\nsequence: Sequence items\ntelemetry: Metrics\nquote: Direct quote\ncta: Call to action',
      toneKeywords: ['authoritative', 'editorial'],
    },
  ];

  const brainResult = await generateSlides(validArticle, mockTemplates, {
    llm: mockLlm,
    onProgress: (phase, detail) => {
      console.log(`   [${phase}] ${detail}`);
    },
  });

  assert(brainResult.slides.length >= 5, `Generated ${brainResult.slides.length} slides successfully`);
  assert(brainResult.selectedTemplateId === 'paper-of-record', `Selected template: ${brainResult.selectedTemplateId}`);
  assert(brainResult.domainId === 'tech', `Selected domain: ${brainResult.domainId}`);
  assert(!brainResult.needsReview, 'Pipeline completed without needing manual review');

  console.log('\n🎉 ALL PIPELINE & VALIDATION TESTS PASSED PERFECTLY!\n');
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
