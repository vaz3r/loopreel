import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ChevronLeft, ChevronRight, RotateCcw, ExternalLink, Sparkles } from 'lucide-react';
import { useJobs, useRetryJob } from '@/api/hooks';
import { StatusBadge } from '@/components/StatusBadge';
import { PLATFORM_LABELS } from '@/lib/constants';
import { Link } from 'react-router-dom';
import type { JobStatus } from '@/api/types';

const STATUSES: (JobStatus | '')[] = ['', 'queued', 'ingesting', 'transcribing', 'structuring', 'rendering', 'complete', 'failed', 'needs_review'];

const statusLabels: Record<string, string> = {
  '': 'All',
  queued: 'Queued',
  ingesting: 'Ingesting',
  transcribing: 'Transcribing',
  structuring: 'Structuring',
  rendering: 'Rendering',
  complete: 'Complete',
  failed: 'Failed',
  needs_review: 'Needs Review',
};

const CLASSIC_TEMPLATES = ['paper-of-record', 'the-globalist', 'the-curator', 'the-academic', 'the-signal', 'the-field-notes'];

export function JobsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [engineFilter, setEngineFilter] = useState<'all' | 'bespoke' | 'classic'>('all');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const retryMutation = useRetryJob();

  const { data, isLoading } = useJobs({ page, status: statusFilter || undefined, search });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  // Filter jobs by engine in frontend if selected
  const filteredJobs = (data?.jobs || []).filter((job) => {
    if (engineFilter === 'all') return true;
    const isBespoke = !CLASSIC_TEMPLATES.includes(job.templateId) && job.templateId !== 'auto';
    return engineFilter === 'bespoke' ? isBespoke : !isBespoke;
  });

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">Editorial Jobs</h1>
        <p className="text-[13px] text-text-tertiary mt-1">Review publications, generated slide decks, and editorial pipelines.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Search & Engine Selector Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-quaternary" />
              <Input
                placeholder="Search URL or topic..."
                className="pl-8 w-64 h-8 bg-surface-2 border-border text-[13px] text-text-secondary placeholder:text-text-quaternary"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary" className="h-8 px-3 text-[12px] border-border bg-surface-2 text-text-tertiary hover:text-text-primary hover:bg-surface-hover">
              Search
            </Button>
          </form>

          {/* Engine Filter */}
          <div className="flex items-center gap-1 bg-surface-2 p-0.5 rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setEngineFilter('all')}
              className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                engineFilter === 'all'
                  ? 'bg-surface-4 text-text-primary shadow-xs'
                  : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              All Engines
            </button>
            <button
              type="button"
              onClick={() => setEngineFilter('bespoke')}
              className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                engineFilter === 'bespoke'
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 shadow-xs'
                  : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              <Sparkles className="h-3 w-3 text-emerald-400" />
              Bespoke Only
            </button>
            <button
              type="button"
              onClick={() => setEngineFilter('classic')}
              className={`text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors ${
                engineFilter === 'classic'
                  ? 'bg-surface-4 text-text-primary shadow-xs'
                  : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              Classic Only
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-0.5 overflow-x-auto pb-1">
          {STATUSES.map((s) => (
            <Button
              key={s || 'all'}
              size="sm"
              variant="ghost"
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`h-7 rounded-md px-2.5 text-[12px] font-medium shrink-0 ${
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

      {/* Main Jobs Table */}
      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-xs">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-2/40">
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5 w-14">Cover</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5">Status</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5">Story / Source URL</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5 hidden md:table-cell">Engine & Template</th>
              <th className="text-right text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5 hidden sm:table-cell">Slides</th>
              <th className="text-left text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary px-4 py-2.5 hidden lg:table-cell">Created</th>
              <th className="px-4 py-2.5 text-right text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-4 py-3"><Skeleton className="h-4 w-full bg-surface-2" /></td>
                  ))}
                </tr>
              ))
            ) : filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={7} className="h-24 text-center text-[13px] text-text-quaternary">
                  No editorial jobs match your search or filters.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => {
                const isBespoke = !CLASSIC_TEMPLATES.includes(job.templateId) && job.templateId !== 'auto';
                const hasCover = job.status === 'complete' && (job.slideCount ?? 0) > 0;
                const studioUrl = isBespoke ? `http://localhost:5174/?template=${job.templateId}` : null;

                return (
                  <tr key={job.id} className="hover:bg-surface-hover/50 transition-colors group">
                    {/* Visual Cover Thumbnail */}
                    <td className="px-4 py-2.5">
                      <Link to={`/jobs/${job.id}`} className="block">
                        <div className="relative h-11 w-9 overflow-hidden rounded border border-border bg-surface-2 transition-transform group-hover:scale-105 shadow-xs">
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
                      </Link>
                    </td>

                    {/* Status Badge */}
                    <td className="px-4 py-2.5">
                      <StatusBadge status={job.status} size="sm" />
                    </td>

                    {/* Source URL & Link */}
                    <td className="px-4 py-2.5 max-w-[320px]">
                      <Link
                        to={`/jobs/${job.id}`}
                        className="text-[13px] font-medium text-text-secondary hover:text-text-primary transition-colors truncate block"
                      >
                        {job.sourceUrl}
                      </Link>
                      <span className="text-[11px] text-text-quaternary block mt-0.5">
                        {PLATFORM_LABELS[job.platform] ?? job.platform}
                      </span>
                    </td>

                    {/* Engine & Template Badge */}
                    <td className="px-4 py-2.5 hidden md:table-cell">
                      {isBespoke ? (
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                            <Sparkles className="h-2.5 w-2.5 text-emerald-400" />
                            {job.templateId}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-2 text-text-tertiary border border-border">
                          classic: {job.templateId}
                        </span>
                      )}
                    </td>

                    {/* Slide Count */}
                    <td className="px-4 py-2.5 hidden sm:table-cell text-right text-[12px] text-text-secondary font-mono font-medium">
                      {job.slideCount ?? '—'}
                    </td>

                    {/* Created Date */}
                    <td className="px-4 py-2.5 hidden lg:table-cell text-[11px] text-text-quaternary font-mono">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action Links */}
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {studioUrl && (
                          <a
                            href={studioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                            title="Open in Bespoke Studio"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span className="hidden xl:inline">Studio</span>
                          </a>
                        )}

                        {(job.status === 'failed' || job.status === 'needs_review') && (
                          <button
                            onClick={() => retryMutation.mutate(job.id)}
                            disabled={retryMutation.isPending}
                            className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors p-1"
                            title="Retry job"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </button>
                        )}

                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-[12px] font-medium text-text-tertiary hover:text-text-primary transition-colors px-1"
                        >
                          View →
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
              className="h-8 px-2.5 text-[12px] border-border bg-surface-2 text-text-tertiary hover:text-text-primary"
            >
              <ChevronLeft className="h-3.5 w-3.5 mr-1" />
              Previous
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= Math.ceil(data.total / data.limit)}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 px-2.5 text-[12px] border-border bg-surface-2 text-text-tertiary hover:text-text-primary"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
