import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { PLATFORM_LABELS } from '@/lib/constants';
import { Sparkles } from 'lucide-react';
import type { JobSummary } from '@/api/client';

const CLASSIC_TEMPLATES = ['paper-of-record', 'the-globalist', 'the-curator', 'the-academic', 'the-signal', 'the-field-notes'];

export function JobCard({ job }: { job: JobSummary }) {
  const isBespoke = !CLASSIC_TEMPLATES.includes(job.templateId) && job.templateId !== 'auto';
  const hasCover = job.status === 'complete' && (job.slideCount ?? 0) > 0;

  return (
    <Link to={`/jobs/${job.id}`} className="group block">
      <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-surface-hover">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Cover Thumbnail */}
          <div className="relative h-11 w-9 shrink-0 overflow-hidden rounded border border-border bg-surface-2 shadow-xs">
            {hasCover ? (
              <img
                src={`/api/slides/slides/${job.id}/0.png`}
                alt="Cover"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-surface-2 text-text-quaternary text-[9px] font-mono">
                {job.status === 'complete' ? '—' : '...'}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <StatusBadge status={job.status} size="sm" />
              {isBespoke ? (
                <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                  <Sparkles className="h-2.5 w-2.5" />
                  {job.templateId}
                </span>
              ) : (
                <span className="text-[10px] font-mono text-text-quaternary">
                  {job.templateId}
                </span>
              )}
            </div>
            <span className="truncate text-[13px] text-text-secondary group-hover:text-text-primary transition-colors block max-w-[420px]">
              {job.sourceUrl}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="text-[12px] text-text-quaternary hidden sm:block">
            {PLATFORM_LABELS[job.platform] ?? job.platform}
          </span>
          <span className="text-[12px] text-text-quaternary font-mono hidden md:block">
            {job.slideCount ?? '—'} slides
          </span>
          <span className="text-[11px] text-text-quaternary font-mono">
            {new Date(job.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
