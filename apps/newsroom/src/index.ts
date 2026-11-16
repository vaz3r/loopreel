import { NewsroomDaemon } from './daemon.js';
import { NewsScanner } from './scanner.js';
import { EditorialCurator } from './curator.js';
import { BufferClient } from './buffer-client.js';
import { CONFIG } from './config.js';

async function main() {
  const args = process.argv.slice(2);
  let action = 'run-once';

  for (const arg of args) {
    if (arg.startsWith('--action=')) {
      action = arg.split('=')[1]!;
    }
  }

  console.log(`[Newsroom CLI] Action: "${action}" | DryRun: ${CONFIG.dryRun} | Channel: ${CONFIG.bufferChannelId}`);

  switch (action) {
    case 'scan': {
      const scanner = new NewsScanner();
      const discovered = await scanner.scanAllFeeds();
      console.log(`[CLI] Discovered ${discovered.length} new articles.`);
      process.exit(0);
    }

    case 'pitch': {
      const scanner = new NewsScanner();
      await scanner.scanAllFeeds();
      const curator = new EditorialCurator();
      const pitches = await curator.evaluateDiscoveredStories(15);
      console.log(`\n--- Evaluated Pitches (${pitches.length}) ---`);
      for (const p of pitches) {
        console.log(`[${p.editorialScore}/10] [${p.verdict.toUpperCase()}] ${p.workingTitle}`);
        console.log(`  Thesis: ${p.coreThesis}`);
        console.log(`  Receipt: ${p.finePrintReceipt}`);
        console.log(`  Rationale: ${p.rationale}\n`);
      }
      process.exit(0);
    }

    case 'verify-buffer': {
      const buffer = new BufferClient();
      const channel = await buffer.verifyChannel();
      console.log(`[CLI] Verified Buffer Connection!`);
      console.log(`  Channel Name: ${channel.name}`);
      console.log(`  Channel Service: ${channel.service}`);
      console.log(`  Channel ID: ${channel.id}`);
      process.exit(0);
    }

    case 'daemon': {
      const daemon = new NewsroomDaemon();
      await daemon.startDaemon();
      break;
    }

    case 'run-once':
    default: {
      const daemon = new NewsroomDaemon();
      await daemon.runOnce();
      process.exit(0);
    }
  }
}

main().catch((err) => {
  console.error('[Newsroom Fatal Error]:', err);
  process.exit(1);
});
