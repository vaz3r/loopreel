import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Download, ClipboardCopy, Check } from 'lucide-react';
import { useJob } from '@/api/hooks';
import { StatusTimeline } from '@/components/StatusTimeline';
import { SlidePreview } from '@/components/SlidePreview';
import { PLATFORM_LABELS } from '@/lib/constants';

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, error } = useJob(id!);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  function copyToClipboard(text: string, label: string) {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
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

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Link to="/jobs" className="text-text-quaternary hover:text-text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">Job Details</h1>
          <p className="text-[11px] text-text-quaternary font-mono mt-0.5">{job.id}</p>
        </div>
        {job.status === 'complete' && (
          <Button asChild className="h-8 rounded-md bg-text-primary text-background hover:bg-text-secondary px-3 text-[13px] font-medium">
            <a href={`/api/jobs/${job.id}/download?format=all`}>
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Download
            </a>
          </Button>
        )}
      </div>

      <StatusTimeline job={job} />

      <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden sm:grid-cols-4">
        {[
          { label: 'Source', value: job.sourceUrl, truncate: true },
          { label: 'Platform', value: PLATFORM_LABELS[job.platform] ?? job.platform },
          { label: 'Template', value: job.templateId },
          { label: 'Slides', value: String(job.slideCount ?? '—') },
        ].map((item) => (
          <div key={item.label} className="bg-card p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">{item.label}</p>
            <p className={`text-[13px] text-text-secondary mt-1 ${item.truncate ? 'truncate' : ''}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <SlidePreview job={job} />

      {linkedinPost && (
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-medium text-text-secondary">LinkedIn Post</h3>
            <button
              onClick={() => copyToClipboard(linkedinPost.contentText!, 'linkedin')}
              className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors flex items-center gap-1"
            >
              {copiedText === 'linkedin' ? (
                <><Check className="h-3 w-3" /> Copied</>
              ) : (
                <><ClipboardCopy className="h-3 w-3" /> Copy</>
              )}
            </button>
          </div>
          <pre className="text-[13px] text-text-tertiary whitespace-pre-wrap font-sans leading-relaxed bg-surface-1 rounded-md p-3 max-h-64 overflow-y-auto border border-border">
            {linkedinPost.contentText}
          </pre>
        </div>
      )}

      {twitterThread && (
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[13px] font-medium text-text-secondary">Twitter Thread</h3>
            <button
              onClick={() => copyToClipboard(twitterThread.contentText!, 'twitter')}
              className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors flex items-center gap-1"
            >
              {copiedText === 'twitter' ? (
                <><Check className="h-3 w-3" /> Copied</>
              ) : (
                <><ClipboardCopy className="h-3 w-3" /> Copy</>
              )}
            </button>
          </div>
          <pre className="text-[13px] text-text-tertiary whitespace-pre-wrap font-sans leading-relaxed bg-surface-1 rounded-md p-3 max-h-64 overflow-y-auto border border-border">
            {twitterThread.contentText}
          </pre>
        </div>
      )}
    </div>
  );
}
