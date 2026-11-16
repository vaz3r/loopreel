import { NewsroomRepository, type NewsroomStoryRow } from '@loopreel/db';
import { CONFIG } from './config.js';

export interface SchedulePostResult {
  bufferPostId: string;
  dueAt?: Date;
  status: 'scheduled' | 'dry_run_success';
}

export class BufferClient {
  private endpoint = 'https://api.buffer.com';
  private token = CONFIG.bufferAccessToken;
  private channelId = CONFIG.bufferChannelId;

  async verifyChannel(): Promise<{ id: string; name: string; service: string }> {
    const query = `
      query GetChannels {
        channels(input: { organizationId: "${CONFIG.bufferOrgId}" }) {
          id
          name
          service
        }
      }
    `;

    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`Buffer API HTTP ${res.status}: ${res.statusText}`);
    }

    const data: any = await res.json();
    const channels = data?.data?.channels || [];
    const channel = channels.find((c: any) => c.id === this.channelId) || channels[0];

    if (!channel) {
      throw new Error(`No active channel found for channel ID ${this.channelId}`);
    }

    return channel;
  }

  async scheduleCarousel(
    story: NewsroomStoryRow,
    slideUrls: string[],
    captionText: string
  ): Promise<SchedulePostResult> {
    console.log(`[BufferClient] Preparing to schedule carousel for "${story.working_title}" (${slideUrls.length} slides)...`);

    if (CONFIG.dryRun) {
      console.log(`[BufferClient] 🧪 DRY RUN MODE ENABLED — Simulating Buffer scheduling.`);
      console.log(`[BufferClient] Channel: ${this.channelId} (@thefineprint.pub)`);
      console.log(`[BufferClient] Slides count: ${slideUrls.length}`);
      console.log(`[BufferClient] Caption preview:\n---\n${captionText.slice(0, 200)}...\n---`);

      const simulatedPostId = `dry-run-${Date.now()}`;
      await NewsroomRepository.recordScheduled(story.id, {
        bufferPostId: simulatedPostId,
        bufferChannelId: this.channelId,
        scheduledAt: new Date(Date.now() + 3600000 * 24), // Simulated tomorrow
        instagramCaption: captionText,
        metadata: {
          bufferDryRun: true,
          slideCount: slideUrls.length,
          scheduledAt: new Date().toISOString(),
        },
      });

      return {
        bufferPostId: simulatedPostId,
        status: 'dry_run_success',
      };
    }

    // Format media assets array in strict sequential order
    const assets = slideUrls.map((url, idx) => ({
      image: {
        url,
        metadata: {
          altText: `The Fine Print Investigation - Slide ${idx + 1} of ${slideUrls.length}`,
        },
      },
    }));

    const mutation = `
      mutation CreateInstagramCarousel($input: CreatePostInput!) {
        createPost(input: $input) {
          ... on PostActionSuccess {
            post {
              id
              text
              dueAt
            }
          }
          ... on MutationError {
            message
          }
        }
      }
    `;

    const variables = {
      input: {
        channelId: this.channelId,
        text: captionText,
        schedulingType: 'automatic',
        mode: 'addToQueue', // Slots into the next recommended window (Mon 8:10 PM, Tue 7:55 PM, etc.)
        assets,
        metadata: {
          instagram: {
            type: 'post',
            shouldShareToFeed: true,
          },
        },
      },
    };

    const res = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Buffer API HTTP ${res.status}: ${errText}`);
    }

    const json: any = await res.json();

    if (json.errors && json.errors.length > 0) {
      throw new Error(`Buffer GraphQL Error: ${json.errors[0]?.message}`);
    }

    const payload = json.data?.createPost;
    if (payload?.message) {
      throw new Error(`Buffer Scheduling Mutation Failed: ${payload.message}`);
    }

    const post = payload?.post;
    const bufferPostId = post?.id || `post-${Date.now()}`;
    const dueAt = post?.dueAt ? new Date(post.dueAt) : undefined;

    console.log(`[BufferClient] ✅ Post successfully queued in Buffer! ID: ${bufferPostId}, Scheduled For: ${dueAt ? dueAt.toISOString() : 'Next queue slot'}`);

    await NewsroomRepository.recordScheduled(story.id, {
      bufferPostId,
      bufferChannelId: this.channelId,
      scheduledAt: dueAt,
      instagramCaption: captionText,
      metadata: {
        bufferResponse: post,
        slideCount: slideUrls.length,
        queuedAt: new Date().toISOString(),
      },
    });

    return {
      bufferPostId,
      dueAt,
      status: 'scheduled',
    };
  }
}
