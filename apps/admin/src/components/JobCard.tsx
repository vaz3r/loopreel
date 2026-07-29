import { Link } from 'react-router-dom';
import { StatusBadge } from './StatusBadge';
import { PLATFORM_LABELS } from '@/lib/constants';
import type { JobSummary } from '@/api/client';

export function JobCard({ job }: { job: JobSummary }) {
  return (
    <Link to={`/jobs/${job.id}`} className="group block">
      <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:bg-surface-hover">
        <div className="flex items-center gap-4 min-w-0">
          <StatusBadge status={job.status} size="sm" />
          <span className="truncate text-[13px] text-text-secondary group-hover:text-text-primary transition-colors">
            {job.sourceUrl}
          </span>
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
