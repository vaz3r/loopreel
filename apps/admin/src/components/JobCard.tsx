import type { JobSummary } from '../api/client';
import { StatusBadge } from './StatusBadge';
import { PLATFORM_LABELS } from '../lib/constants';
import { ExternalLink } from 'lucide-react';

export function JobCard({ job }: { job: JobSummary }) {
  return (
    <a
      href={`/jobs/${job.id}`}
      className="block rounded-lg border border-gray-800 bg-gray-900 p-4 transition-colors hover:border-gray-700 hover:bg-gray-850"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <StatusBadge status={job.status} />
            <span className="truncate text-sm text-gray-400">
              {PLATFORM_LABELS[job.platform] ?? job.platform}
            </span>
          </div>
          <p className="mt-2 truncate text-sm text-gray-300" title={job.sourceUrl}>
            {job.sourceUrl}
          </p>
          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
            <span>{job.templateId}</span>
            {job.slideCount != null && <span>{job.slideCount} slides</span>}
            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <ExternalLink className="h-4 w-4 shrink-0 text-gray-600" />
      </div>
    </a>
  );
}
