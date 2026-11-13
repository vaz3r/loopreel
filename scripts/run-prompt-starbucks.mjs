// Submit and track a prompt job with the new prompt engine
const API_URL = 'http://localhost:3000/api/jobs';

async function main() {
  console.log('Submitting live job to API...');
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: 'Starbucks Gift Card Bank: How unspent balances create an interest-free unregulated float',
      sourceType: 'prompt',
      targetSlideCount: 7,
      narrativePreset: 'mythbuster',
      platform: 'instagram-feed',
      brandKit: {
        name: 'The Fine Print',
        slug: 'the-fine-print',
        vibe: 'Investigative Corporate Autopsies, Fine Print Tricks & Receipts',
        domain: 'thefineprint.co',
        palette: {
          paper: '#0A0A0C',
          ink: '#F5F5F7',
          accent: '#FF2A2A',
          surface: '#141418',
          border: '#26262E',
          subtle: '#858592',
        },
        typography: {
          headlineFont: 'Space Grotesk',
          bodyFont: 'Inter',
          monoFont: 'JetBrains Mono',
          googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
        wordmark: 'THE FINE PRINT',
        wordmarkStyle: 'small-caps',
        handle: '@thefineprint.co',
        texture: 'grid',
        motif: 'bracket',
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed to create job: ${res.status} ${text}`);
    process.exit(1);
  }

  const data = await res.json();
  const jobId = data.jobId || data.id;
  console.log(`Job created successfully: ${jobId}`);
  console.log(`Track job at: http://localhost:5175/jobs/${jobId}`);

  // Poll for completion
  let attempts = 0;
  const maxAttempts = 120; // 10 minutes max
  while (attempts < maxAttempts) {
    await new Promise((r) => setTimeout(r, 5000));
    attempts++;

    const statusRes = await fetch(`${API_URL}/${jobId}`);
    if (!statusRes.ok) continue;

    const job = await statusRes.json();
    console.log(`[${attempts * 5}s] Job ${jobId} status: ${job.status}`);

    if (job.status === 'completed') {
      console.log('>>> Job completed successfully! <<<');
      console.log(`Admin URL: http://localhost:5175/jobs/${jobId}`);
      process.exit(0);
    }

    if (job.status === 'failed') {
      console.error('>>> Job failed! <<<', JSON.stringify(job.errorPayload || job.error_payload, null, 2));
      process.exit(1);
    }
  }

  console.error('Job timed out waiting for completion.');
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
