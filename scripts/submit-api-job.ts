import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

function parseArgs() {
  const args = process.argv.slice(2);
  const options: Record<string, string> = {
    url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    template: 'auto',
    platform: 'instagram-feed',
    api: 'http://localhost:3000',
    outDir: '',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if ((arg === '--url' || arg === '-u') && args[i + 1]) options['url'] = args[++i];
    else if ((arg === '--template' || arg === '-t') && args[i + 1]) options['template'] = args[++i];
    else if ((arg === '--platform' || arg === '-p') && args[i + 1]) options['platform'] = args[++i];
    else if (arg === '--api' && args[i + 1]) options['api'] = args[++i];
    else if ((arg === '--outDir' || arg === '-o') && args[i + 1]) options['outDir'] = args[++i];
    else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: pnpm tsx scripts/submit-api-job.ts [options]

Options:
  -u, --url <url>             URL of article, blog post, or YouTube video
                              (default: "https://en.wikipedia.org/wiki/Artificial_intelligence")
  -t, --template <template>   Template ID: auto | paper-of-record | the-globalist | the-terminal | the-curator | the-academic
                              (default: "auto" - Dynamic LLM Template Auto-Selection)
  -p, --platform <platform>   Platform: instagram-feed | instagram-square | instagram-stories | linkedin | x | facebook
                              (default: "instagram-feed")
  -o, --outDir <path>         Directory to save downloaded slide PNGs and text assets
                              (default: "./output/api-job-<timestamp>")
  --api <url>                 API Base URL (default: "http://localhost:3000")
  -h, --help                  Display this help message
`);
      process.exit(0);
    }
  }

  if (!options['outDir']) {
    options['outDir'] = path.join(__dirname, `../output/api-job-${Date.now()}`);
  }

  return options;
}

async function main() {
  const opts = parseArgs();

  console.log('====================================================');
  console.log('🚀 LOOPREEL REST API JOB SUBMISSION CLIENT');
  console.log('====================================================\n');
  console.log(`  Source URL: ${opts['url']}`);
  console.log(`  Template:   ${opts['template']}`);
  console.log(`  Platform:   ${opts['platform']}`);
  console.log(`  API Target: ${opts['api']}\n`);

  // 1. Post Job to API
  console.log('1. Submitting job to POST /api/jobs...');
  const createRes = await fetch(`${opts['api']}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sourceUrl: opts['url'],
      templateId: opts['template'],
      platform: opts['platform'],
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    console.error(`❌ Job creation failed (${createRes.status}):`, errText);
    process.exit(1);
  }

  const createData = (await createRes.json()) as { jobId: string; status: string };
  const jobId = createData.jobId;

  console.log(`   ✅ Job Created! ID: ${jobId} (status: ${createData.status})\n`);

  // 2. Poll API for Job Completion
  console.log('2. Polling API GET /api/jobs/:id until workers complete processing...');
  const startTime = Date.now();
  let completedJobData: any = null;

  while (true) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const statusRes = await fetch(`${opts['api']}/api/jobs/${jobId}`);

    if (!statusRes.ok) {
      console.error(`\n❌ Failed to query job status (${statusRes.status})`);
      process.exit(1);
    }

    const jobStatusData = (await statusRes.json()) as any;
    process.stdout.write(`\r   ⏱️  [${elapsed}s] Current Status: ${jobStatusData.status.toUpperCase()}    `);

    if (jobStatusData.status === 'complete') {
      completedJobData = jobStatusData;
      console.log(`\n\n🎉 Job completed in ${elapsed} seconds! (${jobStatusData.slideCount} slides generated)`);
      break;
    }

    if (jobStatusData.status === 'failed') {
      console.error(`\n\n❌ Job Processing Failed:`, JSON.stringify(jobStatusData.errorPayload, null, 2));
      process.exit(1);
    }

    await new Promise((r) => setTimeout(r, 1500));
  }

  // 3. Fetch Presigned Asset URLs
  console.log('\n3. Requesting presigned download URLs via GET /api/jobs/:id/download...');
  const downloadRes = await fetch(`${opts['api']}/api/jobs/${jobId}/download?format=all`);

  if (!downloadRes.ok) {
    console.error(`❌ Download request failed (${downloadRes.status})`);
    process.exit(1);
  }

  const downloadData = (await downloadRes.json()) as {
    slideCount: number;
    slides?: Array<{ index: number; url: string }>;
    linkedin?: string;
    twitter?: string;
  };

  // 4. Download All Slides and Assets to Disk
  const outDir = opts['outDir'];
  await fs.mkdir(outDir, { recursive: true });

  console.log(`\n4. Downloading ${downloadData.slideCount} slide PNGs & text assets to ${outDir}...`);

  const downloadedFiles: Array<{ name: string; size: string; path: string }> = [];

  if (downloadData.slides) {
    for (const slide of downloadData.slides) {
      const filename = `slide_${String(slide.index + 1).padStart(2, '0')}.png`;
      const filePath = path.join(outDir, filename);

      const imgRes = await fetch(slide.url);
      if (imgRes.ok) {
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        await fs.writeFile(filePath, buffer);
        const kbSize = (buffer.length / 1024).toFixed(1);
        downloadedFiles.push({ name: filename, size: `${kbSize} KB`, path: filePath });
        console.log(`   ✓ Saved ${filename} (${kbSize} KB)`);
      } else {
        console.error(`   ✕ Failed to download slide ${slide.index + 1}: ${imgRes.status}`);
      }
    }
  }

  if (downloadData.linkedin) {
    const linkedinPath = path.join(outDir, 'linkedin_post.txt');
    await fs.writeFile(linkedinPath, downloadData.linkedin, 'utf-8');
    downloadedFiles.push({ name: 'linkedin_post.txt', size: `${downloadData.linkedin.length} chars`, path: linkedinPath });
    console.log(`   ✓ Saved linkedin_post.txt`);
  }

  if (downloadData.twitter) {
    const twitterPath = path.join(outDir, 'twitter_thread.txt');
    await fs.writeFile(twitterPath, downloadData.twitter, 'utf-8');
    downloadedFiles.push({ name: 'twitter_thread.txt', size: `${downloadData.twitter.length} chars`, path: twitterPath });
    console.log(`   ✓ Saved twitter_thread.txt`);
  }

  console.log('\n====================================================');
  console.log(`✨ JOB COMPLETED SUCCESSFULLY! SUMMARY:`);
  console.log(`📂 Output Directory: ${outDir}`);
  console.log(`📊 Assets Downloaded: ${downloadedFiles.length} files`);
  console.log('====================================================\n');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
