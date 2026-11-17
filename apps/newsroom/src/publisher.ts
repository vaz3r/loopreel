import {
  NewsroomRepository,
  JobRepository,
  AssetRepository,
} from '@loopreel/db';
import { getPresignedUrl } from '@loopreel/storage';
import { BufferClient } from './buffer-client.js';

export interface PublishOptions {
  storyId: string;
  reviewer?: string;
  confirmUnverified?: boolean;
  bufferClient?: BufferClient;
}

export interface PublishResult {
  success: boolean;
  storyId: string;
  status: 'scheduled' | 'already_scheduled' | 'failed';
  bufferPostId?: string;
  message: string;
}

/**
 * Shared publish function used by both the Newsroom CLI and Daemon.
 * Enforces:
 * 1. Story existence and idempotency check (scheduled/published -> clean return).
 * 2. Story status must be 'pending_review'.
 * 3. Attached Loopreel job must exist, be 'complete', and pass visual audit (0 errors).
 * 4. Unverified prompt sources require explicit confirmUnverified flag.
 * 5. Atomic state transition: claims story as 'publishing' before dispatching to Buffer.
 * 6. Error handling: reverts to 'pending_review' if Buffer dispatch fails.
 */
export async function publishStory(options: PublishOptions): Promise<PublishResult> {
  const { storyId } = options;

  // 1. Fetch story
  const story = await NewsroomRepository.findById(storyId);
  if (!story) {
    throw new Error(`Story ${storyId} not found.`);
  }

  // 2. Idempotency check: Already scheduled or published
  if (story.status === 'scheduled' || story.status === 'published') {
    return {
      success: true,
      storyId,
      status: 'already_scheduled',
      bufferPostId: story.buffer_post_id ?? undefined,
      message: `Story ${storyId} is already ${story.status} (Buffer Post ID: ${story.buffer_post_id || 'none'}).`,
    };
  }

  // 3. Status guard
  if (story.status !== 'pending_review') {
    if (story.status === 'publishing') {
      throw new Error(`Story ${storyId} is currently in 'publishing' status (another publish process is active).`);
    }
    if (story.status === 'generating') {
      throw new Error(`Cannot publish story ${storyId}: generation is still in progress.`);
    }
    throw new Error(
      `Story ${storyId} must be in 'pending_review' status to publish (current status: '${story.status}').`
    );
  }

  // 4. Associated Job & Visual Audit Validation
  if (!story.job_id) {
    throw new Error(`Story ${storyId} has no associated Loopreel generation job.`);
  }

  const job = await JobRepository.findById(story.job_id);
  if (!job) {
    throw new Error(`Associated generation job ${story.job_id} not found.`);
  }

  if (job.status !== 'complete') {
    throw new Error(
      `Associated generation job ${story.job_id} is in status '${job.status}', expected 'complete'.`
    );
  }

  const contentPayload = job.content_payload as Record<string, any> | null;
  const audit = contentPayload?.audit;
  if (audit) {
    if (Array.isArray(audit.errors) && audit.errors.length > 0) {
      throw new Error(
        `Visual audit failed with ${audit.errors.length} fatal error(s): ${audit.errors.join('; ')}`
      );
    }
    if (typeof audit.totalCollisions === 'number' && audit.totalCollisions > 0) {
      throw new Error(
        `Visual audit failed with ${audit.totalCollisions} collision error(s).`
      );
    }
  }

  // 5. Provenance / Unverified Prompt Guard
  const isPromptSource =
    job.source_type === 'prompt' ||
    (story.source_url && story.source_url.startsWith('prompt:'));

  if (isPromptSource && !options.confirmUnverified) {
    throw new Error(
      `[Provenance Warning] Story "${story.working_title || story.id}" was generated from an unverified prompt source. ` +
      `Review all editorial claims and re-run with --confirm-unverified to proceed with Buffer publication.`
    );
  }

  // 6. Slide presigned URLs and caption resolution
  let slideUrls: string[] = story.metadata?.loopreelOutput?.slideUrls || [];
  if (slideUrls.length === 0) {
    const assets = await AssetRepository.findByJobId(job.id);
    const slideAssets = assets
      .filter((a) => a.format_type === 'carousel_slide' && a.storage_url)
      .sort((a, b) => (a.slide_index ?? 0) - (b.slide_index ?? 0));

    if (slideAssets.length === 0) {
      throw new Error(`No slide image assets found for generation job ${job.id}.`);
    }

    slideUrls = [];
    for (const asset of slideAssets) {
      const presigned = await getPresignedUrl(asset.storage_url!, 86400);
      slideUrls.push(presigned);
    }
  }

  const captionText =
    story.metadata?.loopreelOutput?.captionText ||
    story.instagram_caption ||
    contentPayload?.caption?.fullText ||
    story.core_thesis ||
    story.working_title ||
    '';

  // 7. Atomic Claim: Move from 'pending_review' -> 'publishing'
  const claimedStory = await NewsroomRepository.claimForPublishing(story.id);
  if (!claimedStory) {
    throw new Error(
      `Failed to claim story ${story.id} for publishing: status is no longer 'pending_review' (concurrent modification).`
    );
  }

  // 8. Buffer Dispatch with Reversion on Failure
  const buffer = options.bufferClient || new BufferClient();
  try {
    const channel = await buffer.verifyChannel();
    console.log(`[Publisher] Verified channel ${channel.name} (${channel.service}). Dispatching story ${story.id}...`);

    const result = await buffer.scheduleCarousel(claimedStory, slideUrls, captionText);

    const reviewer = options.reviewer || process.env.USER || 'editorial-reviewer';
    await NewsroomRepository.recordScheduled(story.id, {
      bufferPostId: result.bufferPostId,
      bufferChannelId: channel.id,
      scheduledAt: result.dueAt,
      instagramCaption: captionText,
      metadata: {
        approvedBy: reviewer,
        approvedAt: new Date().toISOString(),
      },
    });

    console.log(`[Publisher] ✅ Successfully published story ${story.id} to Buffer! Post ID: ${result.bufferPostId}`);
    return {
      success: true,
      storyId: story.id,
      status: 'scheduled',
      bufferPostId: result.bufferPostId,
      message: `Story successfully scheduled to Buffer (Post ID: ${result.bufferPostId}).`,
    };
  } catch (err: any) {
    console.error(`[Publisher] ❌ Buffer scheduling failed for story ${story.id}: ${err.message}. Reverting status to 'pending_review'...`);
    await NewsroomRepository.revertPublishing(story.id, err.message);
    throw err;
  }
}
