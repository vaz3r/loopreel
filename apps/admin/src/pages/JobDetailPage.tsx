import { useParams, Link, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { useJob, useRetryJob } from '@/api/hooks';
import { StatusTimeline } from '@/components/StatusTimeline';
import { SlidePreview } from '@/components/SlidePreview';
import { JobHeader } from '@/components/jobs/JobHeader';
import { JobInfoGrid } from '@/components/jobs/JobInfoGrid';
import { CostBreakdown } from '@/components/jobs/CostBreakdown';
import { ErrorDetails } from '@/components/jobs/ErrorDetails';
import { SocialPostCard } from '@/components/jobs/SocialPostCard';
import { BrandInspector } from '@/components/jobs/BrandInspector';
import { VisualAuditCard } from '@/components/jobs/VisualAuditCard';
import { StoryboardInspector } from '@/components/jobs/StoryboardInspector';

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, error } = useJob(id!);
  const retryMutation = useRetryJob();

  function handleRetry() {
    if (!id) return;
    retryMutation.mutate(id, {
      onSuccess: () => {
        navigate('/jobs');
      },
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-6 w-40 bg-surface-2" />
        <Skeleton className="h-24 w-full rounded-lg bg-surface-2" />
        <Skeleton className="h-32 w-full rounded-lg bg-surface-2" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-[15px] text-text-primary font-medium">Failed to load job</p>
        <p className="text-[13px] text-text-quaternary mt-1">{error?.message ?? 'Not found'}</p>
        <Link to="/jobs" className="text-[13px] text-text-tertiary hover:text-text-primary transition-colors mt-4">
          ← Back to jobs
        </Link>
      </div>
    );
  }

  const linkedinPost = job.assets.find((a) => a.formatType === 'linkedin_post' && a.contentText);
  const twitterThread = job.assets.find((a) => a.formatType === 'twitter_thread' && a.contentText);

  const CLASSIC_TEMPLATES = ['paper-of-record', 'the-globalist', 'the-curator', 'the-academic', 'the-signal', 'the-field-notes'];
  const contentPayload = job.contentPayload as any;
  const templateSlug = contentPayload?.templateSlug || (!CLASSIC_TEMPLATES.includes(job.templateId) && job.templateId !== 'auto' && job.templateId !== 'bespoke' ? job.templateId : null);
  const studioUrl = templateSlug ? `/studio?template=${templateSlug}` : null;

  const bespokeBrand = contentPayload?.brand;
  const bespokeAudit = contentPayload?.audit;
  const bespokeDeck = contentPayload?.deck;

  return (
    <div className="space-y-8 pb-12">
      <JobHeader
        jobId={job.id}
        status={job.status}
        studioUrl={studioUrl}
        onRetry={handleRetry}
        isRetrying={retryMutation.isPending}
      />

      <StatusTimeline job={job} />

      <JobInfoGrid
        sourceUrl={job.sourceUrl}
        platform={job.platform}
        templateId={templateSlug || job.templateId}
        slideCount={job.slideCount}
      />

      {/* Visual Quality & Playwright Audit Telemetry */}
      {bespokeAudit && <VisualAuditCard audit={bespokeAudit} />}

      {/* Editorial Art Direction & Brand Inspector */}
      {bespokeBrand && <BrandInspector brand={bespokeBrand} />}

      {/* Interactive Carousel Simulator & Slide Gallery */}
      <SlidePreview job={job} />

      {/* Editorial Storyboard Copy & Structure Breakdown */}
      {bespokeDeck && <StoryboardInspector deck={bespokeDeck} />}

      <CostBreakdown
        totalCostUsd={job.totalCostUsd}
        totalPromptTokens={job.totalPromptTokens}
        totalCompletionTokens={job.totalCompletionTokens}
        llmUsage={job.llmUsage}
      />

      <ErrorDetails status={job.status} errorPayload={job.errorPayload} />

      {linkedinPost && (
        <SocialPostCard
          title="LinkedIn Post"
          content={linkedinPost.contentText!}
          copyLabel="linkedin"
        />
      )}

      {twitterThread && (
        <SocialPostCard
          title="Twitter Thread"
          content={twitterThread.contentText!}
          copyLabel="twitter"
        />
      )}
    </div>
  );
}
