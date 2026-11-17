import assert from 'node:assert';
import { pool, NewsroomRepository, JobRepository, AssetRepository } from '@loopreel/db';
import { publishStory } from './publisher.js';
import type { BufferClient, SchedulePostResult } from './buffer-client.js';

// Mock Buffer Client to test dispatch, channel verification, and failure rollbacks
class MockBufferClient {
  public verifyCalled = false;
  public scheduleCalled = false;
  public shouldFailSchedule = false;

  async verifyChannel(): Promise<{ id: string; name: string; service: string }> {
    this.verifyCalled = true;
    return { id: 'mock-channel-id', name: 'Mock Channel', service: 'instagram' };
  }

  async scheduleCarousel(): Promise<SchedulePostResult> {
    this.scheduleCalled = true;
    if (this.shouldFailSchedule) {
      throw new Error('Simulated Buffer API 500 error');
    }
    return {
      bufferPostId: 'mock-buffer-post-999',
      status: 'scheduled',
      dueAt: new Date(),
    };
  }
}

async function runTests() {
  console.log('[Test] Starting Review Gate & Publisher Safeguards Test Suite...');

  // 1. Setup mock jobs
  const cleanJobId = await JobRepository.create({
    sourceUrl: 'https://example.com/article-1',
    sourceType: 'article',
    templateId: 'the-fine-print',
    platform: 'instagram-feed',
  });
  await JobRepository.updateStatus(cleanJobId, 'complete', {
    contentPayload: {
      templateSlug: 'the-fine-print-test',
      deck: { slides: [{ headline: 'Test Headline' }] },
      audit: { errors: [], totalCollisions: 0 },
      caption: { fullText: 'Test caption receipts' },
    },
    slideCount: 7,
  });
  await AssetRepository.insertBatch([
    { jobId: cleanJobId, formatType: 'carousel_slide', slideIndex: 0, storageUrl: 'slides/test/0.png' },
  ]);

  const auditFailedJobId = await JobRepository.create({
    sourceUrl: 'https://example.com/article-2',
    sourceType: 'article',
    templateId: 'the-fine-print',
    platform: 'instagram-feed',
  });
  await JobRepository.updateStatus(auditFailedJobId, 'complete', {
    contentPayload: {
      templateSlug: 'the-fine-print-fail',
      audit: {
        errors: ['Slide 1: Font size floor (<12px) mobile readability violation'],
        totalCollisions: 1,
      },
    },
    slideCount: 7,
  });

  const promptJobId = await JobRepository.create({
    sourceUrl: 'prompt:test-unverified-prompt',
    sourceType: 'prompt',
    templateId: 'the-fine-print',
    platform: 'instagram-feed',
  });
  await JobRepository.updateStatus(promptJobId, 'complete', {
    contentPayload: {
      templateSlug: 'the-fine-print-prompt',
      audit: { errors: [], totalCollisions: 0 },
      caption: { fullText: 'Prompt caption' },
    },
    slideCount: 7,
  });
  await AssetRepository.insertBatch([
    { jobId: promptJobId, formatType: 'carousel_slide', slideIndex: 0, storageUrl: 'slides/prompt/0.png' },
  ]);

  // 2. Setup mock stories
  const storyClean = await NewsroomRepository.createDiscovered({
    sourceUrl: `https://example.com/test-clean-${Date.now()}`,
    sourceName: 'Financial Review',
    sourceHeadline: 'Arbitration Trap Exposed',
  });
  await NewsroomRepository.updatePitch(storyClean.id, {
    editorialScore: 9.0,
    workingTitle: 'Arbitration Trap Exposed',
    coreThesis: 'Users waive rights silently',
    finePrintReceipt: 'Section 14.2',
  });
  await NewsroomRepository.attachJob(storyClean.id, cleanJobId);
  await NewsroomRepository.updateStatus(storyClean.id, 'pending_review', {
    loopreelOutput: {
      jobId: cleanJobId,
      slideUrls: ['https://storage.example.com/slide-01.png'],
      captionText: 'Full investigative caption',
    },
  });

  const storyAuditFail = await NewsroomRepository.createDiscovered({
    sourceUrl: `https://example.com/test-audit-fail-${Date.now()}`,
    sourceName: 'Tech Wire',
    sourceHeadline: 'Font Overflow Bug',
  });
  await NewsroomRepository.attachJob(storyAuditFail.id, auditFailedJobId);
  await NewsroomRepository.updateStatus(storyAuditFail.id, 'pending_review');

  const storyPrompt = await NewsroomRepository.createDiscovered({
    sourceUrl: `prompt:test-prompt-${Date.now()}`,
    sourceName: 'Prompt Generator',
    sourceHeadline: 'Unverified Rumor',
  });
  await NewsroomRepository.attachJob(storyPrompt.id, promptJobId);
  await NewsroomRepository.updateStatus(storyPrompt.id, 'pending_review', {
    loopreelOutput: {
      jobId: promptJobId,
      slideUrls: ['https://storage.example.com/prompt-01.png'],
      captionText: 'Unverified prompt caption',
    },
  });

  const storyGenerating = await NewsroomRepository.createDiscovered({
    sourceUrl: `https://example.com/test-generating-${Date.now()}`,
    sourceName: 'Daily Post',
    sourceHeadline: 'In Progress Story',
  });
  await NewsroomRepository.attachJob(storyGenerating.id, cleanJobId);
  // remains in 'generating'

  // --- Test 1: Status Guard ---
  console.log('[Test 1] Status guard: Rejects stories in status !== pending_review');
  await assert.rejects(
    async () => {
      await publishStory({ storyId: storyGenerating.id });
    },
    /Cannot publish story .*: generation is still in progress/
  );
  console.log('  ✓ Status guard passed.');

  // --- Test 2: Visual Audit Guard ---
  console.log('[Test 2] Audit guard: Rejects stories with audit fatal errors');
  await assert.rejects(
    async () => {
      await publishStory({ storyId: storyAuditFail.id });
    },
    /Visual audit failed with 1 fatal error\(s\)/
  );
  console.log('  ✓ Visual audit guard passed.');

  // --- Test 3: Provenance Guard (Prompt Source) ---
  console.log('[Test 3] Provenance guard: Rejects prompt-sourced stories without confirmation');
  await assert.rejects(
    async () => {
      await publishStory({ storyId: storyPrompt.id });
    },
    /\[Provenance Warning\]/
  );
  console.log('  ✓ Provenance guard passed.');

  // --- Test 4: Provenance Override ---
  console.log('[Test 4] Provenance override: Accepts prompt story when confirmUnverified=true');
  const mockBufferPrompt = new MockBufferClient() as unknown as BufferClient;
  const promptResult = await publishStory({
    storyId: storyPrompt.id,
    confirmUnverified: true,
    bufferClient: mockBufferPrompt,
    reviewer: 'fact-checker-jane',
  });
  assert.strictEqual(promptResult.status, 'scheduled');
  assert.strictEqual(promptResult.bufferPostId, 'mock-buffer-post-999');
  console.log('  ✓ Provenance override passed.');

  // --- Test 5: Atomic Claim & Revert on Buffer Failure ---
  console.log('[Test 5] Atomic claim & revert: Rolls back to pending_review on Buffer failure');
  const mockFailingBuffer = new MockBufferClient();
  mockFailingBuffer.shouldFailSchedule = true;

  await assert.rejects(
    async () => {
      await publishStory({
        storyId: storyClean.id,
        bufferClient: mockFailingBuffer as unknown as BufferClient,
      });
    },
    /Simulated Buffer API 500 error/
  );

  const revertedStory = await NewsroomRepository.findById(storyClean.id);
  assert.strictEqual(revertedStory?.status, 'pending_review');
  assert.ok(revertedStory?.metadata?.lastPublishError?.includes('Simulated Buffer API 500 error'));
  console.log('  ✓ Atomic claim and rollback on failure passed.');

  // --- Test 6: Clean Publish to Buffer ---
  console.log('[Test 6] Clean publish: Atomically moves through publishing -> scheduled');
  const mockSuccessBuffer = new MockBufferClient();
  const publishResult = await publishStory({
    storyId: storyClean.id,
    bufferClient: mockSuccessBuffer as unknown as BufferClient,
    reviewer: 'managing-editor-dan',
  });

  assert.strictEqual(publishResult.status, 'scheduled');
  assert.strictEqual(publishResult.bufferPostId, 'mock-buffer-post-999');

  const scheduledStory = await NewsroomRepository.findById(storyClean.id);
  assert.strictEqual(scheduledStory?.status, 'scheduled');
  assert.strictEqual(scheduledStory?.metadata?.approvedBy, 'managing-editor-dan');
  assert.strictEqual(scheduledStory?.buffer_post_id, 'mock-buffer-post-999');
  console.log('  ✓ Clean publish passed.');

  // --- Test 7: Idempotency Guard ---
  console.log('[Test 7] Idempotency guard: Re-publishing already scheduled story is clean no-op');
  const duplicateResult = await publishStory({
    storyId: storyClean.id,
    bufferClient: mockSuccessBuffer as unknown as BufferClient,
  });
  assert.strictEqual(duplicateResult.status, 'already_scheduled');
  assert.strictEqual(duplicateResult.success, true);
  console.log('  ✓ Idempotency guard passed.');

  console.log('\n✅ ALL REVIEW GATE & PUBLISHER TESTS PASSED SUCCESSFULLY!\n');
  await pool.end();
}

runTests().catch(async (err) => {
  console.error('[Test Error]:', err);
  await pool.end();
  process.exit(1);
});
