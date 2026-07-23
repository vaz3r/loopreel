import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLLMClient, parseLlmXmlOutput } from '@loopreel/llm';
import { getPrompt, getTemplate } from '@loopreel/loop-bridge';
import { exportCarouselToImages } from '@loopreel/loop/exporter';
import { startViteServer } from '@loopreel/loop/vite-server';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const OUTPUT_DIR = path.join(__dirname, '../output');

const SAMPLE_ARTICLE = `
# The Rise of Autonomous AI Agents in Enterprise Workflows

By 2026, artificial intelligence has evolved far beyond passive chatbots and basic autocompletions. The current frontier is defined by autonomous agentic architectures capable of multi-step planning, tool invocation, and self-correcting execution loops.

## Key Shifts in 2026

1. **Local & Edge Execution**: Processing is increasingly offloaded to local device runtimes, drastically cutting latency and cloud API costs while enforcing strict data privacy boundaries.
2. **Multimodal Reasoning**: Modern AI agents process code, structured telemetry, unstructured text, audio streams, and real-time visual frames concurrently within a unified context.
3. **Transactional Outbox & Reliable Orchestration**: Enterprise agents integrate directly with transactional outboxes and event buses to guarantee atomic state transitions without data loss.

## Empirical Metrics

- **42%**: Year-over-year expansion in enterprise agent deployment.
- **$184B**: Projected global market footprint for agentic software by Q4 2026.
- **5.2x**: Observed efficiency multiplier when combining human oversight with autonomous multi-agent task execution.

## Executive Perspective

"We are no longer designing tools that wait for user instructions line-by-line; we are architecting digital colleagues capable of carrying out complex operational goals autonomously."
— Dr. Sarah Chen, Director of AI Research
`;

async function runArticleTest() {
  console.log('====================================================');
  console.log('🚀 TESTING ARTICLE TO SLIDE CONVERSION PIPELINE');
  console.log('====================================================\n');

  const templateId = 'paper-of-record';
  const template = getTemplate(templateId);

  console.log(`1. Generating LLM Prompt for template "${templateId}"...`);
  const prompt = await getPrompt(templateId, SAMPLE_ARTICLE);

  console.log('2. Invoking LLM Structuring Engine...');
  const llm = createLLMClient();
  const rawResponse = await llm.generateJSON(prompt, SAMPLE_ARTICLE);

  console.log('   Raw LLM Output received. Parsing XML structure...');
  const parsed = parseLlmXmlOutput(rawResponse);

  console.log('3. Validating slide schema contract...');
  const validation = template.schema.safeParse(parsed);

  if (!validation.success) {
    console.error('❌ Schema Validation Failed:');
    for (const issue of validation.error.issues) {
      console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
    }
    process.exit(1);
  }

  const carouselData = validation.data as { slides: Array<Record<string, unknown>> };
  console.log(`   ✅ Successfully validated ${carouselData.slides.length} slides for ${template.name}!\n`);

  carouselData.slides.forEach((s, idx) => {
    console.log(`   Slide ${idx + 1} [${s['type']}]: "${s['headline'] || s['term'] || s['quote'] || 'Slide'}"`);
  });

  console.log('\n4. Starting Vite Server for Playwright Image Export...');
  const { server: viteServer, baseUrl } = await startViteServer(5173);

  try {
    const timestamp = Date.now();
    const outputSubdir = `article-run-${timestamp}`;

    console.log('5. Rendering carousel slides to PNG (using single-page event-driven Playwright renderer)...');
    const startTime = Date.now();

    const exportedPaths = await exportCarouselToImages(
      carouselData as any,
      template.schemeId,
      outputSubdir,
      {
        baseUrl,
        outputDir: OUTPUT_DIR,
        templateId,
        width: 1080,
        height: 1350,
      },
    );

    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('\n====================================================');
    console.log(`🎉 SUCCESS! Processed article into ${exportedPaths.length} slides in ${elapsedSec}s!`);
    console.log(`📂 Output Directory: ${path.join(OUTPUT_DIR, outputSubdir)}`);
    exportedPaths.forEach((p) => console.log(`   - ${path.basename(p)}`));
    console.log('====================================================\n');
  } finally {
    await viteServer.close();
  }
}

runArticleTest().catch((err) => {
  console.error('\n❌ Test pipeline failed:', err);
  process.exit(1);
});
