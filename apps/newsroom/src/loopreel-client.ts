import { NewsroomRepository, type NewsroomStoryRow } from '@loopreel/db';
import { getPresignedUrl } from '@loopreel/storage';
import { CONFIG } from './config.js';

export interface CompletedJobResult {
  jobId: string;
  templateSlug: string;
  slideUrls: string[];
  caption: string;
  brand: any;
}

export class LoopreelClient {
  private apiUrl = CONFIG.loopreelApiUrl;

  async triggerGeneration(story: NewsroomStoryRow): Promise<CompletedJobResult> {
    const promptText = `${story.working_title || story.source_headline}: ${story.core_thesis || ''} Receipts: ${story.fine_print_receipt || ''}`.trim();

    console.log(`[LoopreelClient] Submitting job for "${story.working_title}" to ${this.apiUrl}/jobs...`);

    const validPresets = ['storytelling', 'news-reporting', 'deep-dive', 'financial-analysis', 'case-study', 'entertainment', 'mythbuster', 'playbook'];
    const narrativePreset = validPresets.includes(story.narrative_preset) ? story.narrative_preset : 'mythbuster';

    const res = await fetch(`${this.apiUrl}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptText,
        sourceType: 'prompt',
        targetSlideCount: 7,
        narrativePreset,
        platform: 'instagram-feed',
        brandKit: CONFIG.brandPreset,
        generateText: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Failed to create Loopreel job (${res.status}): ${errText}`);
    }

    const { jobId } = (await res.json()) as { jobId: string };
    console.log(`[LoopreelClient] Job created with ID: ${jobId}. Attaching to story ${story.id}...`);

    await NewsroomRepository.attachJob(story.id, jobId);

    // Poll until complete
    const jobResult = await this.pollJobCompletion(jobId);

    // Fetch slide presigned URLs
    const slideUrls: string[] = [];
    const slideAssets = (jobResult.assets || [])
      .filter((a: any) => a.formatType === 'carousel_slide' && a.storageUrl)
      .sort((a: any, b: any) => (a.slideIndex ?? 0) - (b.slideIndex ?? 0));

    for (const asset of slideAssets) {
      const presigned = await getPresignedUrl(asset.storageUrl, 86400); // 24hr valid
      slideUrls.push(presigned);
    }

    // Extract journalistic caption
    const captionAsset = (jobResult.assets || []).find((a: any) => a.formatType === 'instagram_caption');
    const captionText = captionAsset?.contentText ||
      jobResult.contentPayload?.caption?.fullText ||
      story.core_thesis ||
      story.working_title ||
      '';

    await NewsroomRepository.updateStatus(story.id, 'pending_review', {
      loopreelOutput: {
        jobId,
        templateSlug: jobResult.templateId,
        slideCount: slideUrls.length,
        captionSnippet: captionText.slice(0, 100),
        slideUrls,
        captionText,
      },
    });

    console.log(`[LoopreelClient] Job ${jobId} complete! Story ${story.id} placed in 'pending_review' with ${slideUrls.length} slides.`);
    return {
      jobId,
      templateSlug: jobResult.templateId,
      slideUrls,
      caption: captionText,
      brand: jobResult.contentPayload?.brand,
    };
  }

  private async pollJobCompletion(jobId: string, maxWaitMs = 900000): Promise<any> {
    const startTime = Date.now();
    const pollInterval = 5000;

    while (Date.now() - startTime < maxWaitMs) {
      await new Promise((resolve) => setTimeout(resolve, pollInterval));

      const res = await fetch(`${this.apiUrl}/jobs/${jobId}`);
      if (!res.ok) continue;

      const job = await res.json();
      console.log(`[LoopreelClient] Job ${jobId} status: ${job.status}...`);

      if (job.status === 'complete') {
        return job;
      }

      if (job.status === 'failed') {
        const reason = job.errorPayload?.reason || job.errorPayload?.details || 'Unknown error';
        throw new Error(`Loopreel job ${jobId} failed: ${reason}`);
      }
    }

    throw new Error(`Timed out waiting for Loopreel job ${jobId} after ${maxWaitMs / 1000}s`);
  }
}
