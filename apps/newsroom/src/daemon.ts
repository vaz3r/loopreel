import { NewsScanner } from './scanner.js';
import { EditorialCurator } from './curator.js';
import { LoopreelClient } from './loopreel-client.js';
import { BufferClient } from './buffer-client.js';
import { NewsroomRepository } from '@loopreel/db';
import { CONFIG } from './config.js';

export class NewsroomDaemon {
  private scanner = new NewsScanner();
  private curator = new EditorialCurator();
  private loopreel = new LoopreelClient();
  private buffer = new BufferClient();

  async runOnce(): Promise<void> {
    console.log('\n======================================================');
    console.log(`[Newsroom] Starting Autonomous Newsroom Cycle (${new Date().toISOString()})`);
    console.log('======================================================\n');

    // Step 1: Scan Google News Wire
    console.log('[Newsroom] >>> Step 1: Scanning Wire Feeds for Breaking Stories...');
    await this.scanner.scanAllFeeds();

    // Step 2: Editorial Review & Pitch Scoring
    console.log('\n[Newsroom] >>> Step 2: Pitching Candidate Stories through Managing Editor LLM...');
    const pitches = await this.curator.evaluateDiscoveredStories(10);
    const approvedPitches = pitches.filter((p) => p.verdict === 'approved' && p.editorialScore >= CONFIG.minEditorialScore);

    console.log(`[Newsroom] Evaluated ${pitches.length} stories. ${approvedPitches.length} met the editorial bar.\n`);

    // Step 3: Publish Top Story if available
    console.log('[Newsroom] >>> Step 3: Checking for Top Pitched Stories to Generate & Publish...');
    const topPitched = await NewsroomRepository.findPitched(CONFIG.minEditorialScore, 1);

    if (topPitched.length === 0) {
      console.log('[Newsroom] No un-generated pitched stories ready for production. Cycle complete.');
      return;
    }

    const storyToProduce = topPitched[0]!;
    console.log(`[Newsroom] Selected story for production: "${storyToProduce.working_title}" (Score: ${storyToProduce.editorial_score}/10)`);

    try {
      // Generate through Loopreel Engine
      const generationResult = await this.loopreel.triggerGeneration(storyToProduce);

      // Verify Buffer Channel
      const channel = await this.buffer.verifyChannel();
      console.log(`[Newsroom] Verified distribution channel: ${channel.name} (${channel.service})`);

      // Dispatch to Buffer Queue
      await this.buffer.scheduleCarousel(
        storyToProduce,
        generationResult.slideUrls,
        generationResult.caption
      );

      console.log('\n======================================================');
      console.log(`[Newsroom] Cycle Complete! Post successfully scheduled for @thefineprint.pub`);
      console.log('======================================================\n');
    } catch (err: any) {
      console.error(`[Newsroom] Generation/Scheduling failed for "${storyToProduce.working_title}":`, err.message);
      await NewsroomRepository.updateStatus(storyToProduce.id, 'failed', {
        error: err.message,
        failedAt: new Date().toISOString(),
      });
    }
  }

  async startDaemon(): Promise<void> {
    console.log(`[NewsroomDaemon] Starting standing newsroom daemon (Scan interval: ${CONFIG.scanIntervalMinutes} minutes)...`);

    // Run first cycle immediately
    await this.runOnce();

    // Schedule subsequent cycles
    const intervalMs = CONFIG.scanIntervalMinutes * 60 * 1000;
    setInterval(async () => {
      try {
        await this.runOnce();
      } catch (err: any) {
        console.error('[NewsroomDaemon] Unhandled error during scheduled cycle:', err);
      }
    }, intervalMs);
  }
}
