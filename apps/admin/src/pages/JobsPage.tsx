import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useJobs, useRetryJob } from '@/api/hooks';
import { StatusBadge } from '@/components/StatusBadge';
import { PLATFORM_LABELS } from '@/lib/constants';
import { Link } from 'react-router-dom';
import type { JobStatus } from '@/api/types';

const STATUSES: (JobStatus | '')[] = ['', 'queued', 'ingesting', 'transcribing', 'structuring', 'rendering', 'complete', 'failed'];

const statusLabels: Record<string, string> = {
  '': 'All',
  queued: 'Queued',
  ingesting: 'Ingesting',
  transcribing: 'Transcribing',
  structuring: 'Structuring',
  rendering: 'Rendering',
  complete: 'Complete',
  failed: 'Failed',
};

export function JobsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const retryMutation = useRetryJob();

  const { data, isLoading } = useJobs({ page, status: statusFilter || undefined, search });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">Jobs</h1>
        <p className="text-[13px] text-text-tertiary mt-1">All content generation jobs.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-quaternary" />
            <Input
              placeholder="Search..."
              className="pl-8 w-56 h-8 bg-surface-2 border-border text-[13px] text-text-secondary placeholder:text-text-quaternary"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" variant="secondary" className="h-8 px-3 text-[12px] border-border bg-surface-2 text-text-tertiary hover:text-text-primary hover:bg-surface-hover">
            Search
          </Button>
        </form>

        <div className="flex gap-0.5">
          {STATUSES.map((s) => (
            <Button
              key={s || 'all'}
              size="sm"
              variant="ghost"
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`h-7 rounded-md px-2.5 text-[12px] font-medium ${
                statusFilter === s
                  ? 'bg-surface-hover text-text-primary'
                  : 'text-text-quaternary hover:text-text-tertiary hover:bg-surface-2'
              }`}
            >
              {statusLabels[s]}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5">Status</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5">URL</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5 hidden sm:table-cell">Platform</th>
              <th className="text-right text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5 hidden md:table-cell">Slides</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5 hidden sm:table-cell">Created</th>
              <th className="px-4 py-2.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><Skeleton className="h-3.5 w-full bg-surface-2" /></td>
                  ))}
                </tr>
              ))
            ) : data?.jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="h-20 text-center text-[13px] text-text-quaternary">
                  No jobs found.
                </td>
              </tr>
            ) : (
              data?.jobs.map((job) => (
                <tr key={job.id} className="hover:bg-surface-hover/50 transition-colors">
                  <td className="px-4 py-2.5"><StatusBadge status={job.status} size="sm" /></td>
                  <td className="px-4 py-2.5 max-w-[300px]">
                    <Link to={`/jobs/${job.id}`} className="text-[13px] text-text-secondary hover:text-text-primary transition-colors truncate block">
                      {job.sourceUrl}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 hidden sm:table-cell text-[12px] text-text-quaternary">
                    {PLATFORM_LABELS[job.platform] ?? job.platform}
                  </td>
                  <td className="px-4 py-2.5 hidden md:table-cell text-right text-[12px] text-text-quaternary font-mono">
                    {job.slideCount ?? '—'}
                  </td>
                  <td className="px-4 py-2.5 hidden sm:table-cell text-[11px] text-text-quaternary font-mono">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-end gap-1.5">
                      {job.status === 'failed' && (
                        <button
                          onClick={() => retryMutation.mutate(job.id)}
                          disabled={retryMutation.isPending}
                          className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors p-1"
                          title="Retry job"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </button>
                      )}
                      <Link to={`/jobs/${job.id}`} className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors">
                        →
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data && data.total > data.limit && (
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-text-quaternary">
            Page {data.page} of {Math.ceil(data.total / data.limit)}
          </p>
          <div className="flex gap-1.5">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="h-7 px-2 text-[12px] border-border bg-surface-2 text-text-tertiary hover:text-text-primary"
            >
              <ChevronLeft className="h-3 w-3 mr-0.5" />
              Prev
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= Math.ceil(data.total / data.limit)}
              onClick={() => setPage((p) => p + 1)}
              className="h-7 px-2 text-[12px] border-border bg-surface-2 text-text-tertiary hover:text-text-primary"
            >
              Next
              <ChevronRight className="h-3 w-3 ml-0.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
