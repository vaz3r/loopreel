import { NewsroomDaemon } from './daemon.js';
import { NewsScanner } from './scanner.js';
import { EditorialCurator } from './curator.js';
import { BufferClient } from './buffer-client.js';
import { publishStory } from './publisher.js';
import { CONFIG } from './config.js';

async function main() {
  const args = process.argv.slice(2);
  let action = 'run-once';
  let storyId: string | undefined;
  let reviewer: string | undefined;
  let confirmUnverified = false;

  for (const arg of args) {
    if (arg.startsWith('--action=')) {
      action = arg.split('=')[1]!;
    } else if (arg.startsWith('--id=')) {
      storyId = arg.split('=')[1]!;
    } else if (arg.startsWith('--reviewer=')) {
      reviewer = arg.split('=')[1]!;
    } else if (arg === '--confirm-unverified') {
      confirmUnverified = true;
    }
  }

  console.log(`[Newsroom CLI] Action: "${action}" | DryRun: ${CONFIG.dryRun} | Channel: ${CONFIG.bufferChannelId}`);

  switch (action) {
    case 'publish': {
      if (!storyId) {
        console.error('[CLI Error] --id=<storyId> is required for publish action.');
        process.exit(1);
      }
      const result = await publishStory({
        storyId,
        reviewer,
        confirmUnverified,
      });
      console.log(`[CLI Publish Result]: ${result.message}`);
      process.exit(0);
    }

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
