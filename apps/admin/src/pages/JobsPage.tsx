import { useState } from 'react';
import { useJobs } from '../api/hooks';
import { StatusBadge } from '../components/StatusBadge';
import { PLATFORM_LABELS, STATUS_COLORS } from '../lib/constants';
import { ChevronLeft, ChevronRight, ExternalLink, Search } from 'lucide-react';
import type { JobStatus } from '../api/types';

const STATUSES = ['queued', 'ingesting', 'transcribing', 'structuring', 'rendering', 'complete', 'failed'] as const;

export function JobsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const { data, isLoading } = useJobs({ page, status: statusFilter || undefined, search: search || undefined });
  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;
  const limit = data?.limit ?? 20;
  const totalPages = Math.ceil(total / limit);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-100">Jobs</h1>
      <p className="mt-1 text-sm text-gray-400">{total} total jobs</p>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by URL…"
              className="w-64 rounded-lg border border-gray-700 bg-gray-800 pl-9 pr-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Search
          </button>
        </form>

        <div className="flex gap-1">
          <button
            onClick={() => { setStatusFilter(''); setPage(1); }}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              !statusFilter ? 'bg-gray-700 text-gray-100' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            All
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                statusFilter === s ? STATUS_COLORS[s] : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-900/50 text-left text-xs text-gray-500">
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">URL</th>
              <th className="px-4 py-3">Platform</th>
              <th className="px-4 py-3">Template</th>
              <th className="px-4 py-3">Slides</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            )}
            {!isLoading && jobs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-gray-800/50 hover:bg-gray-900/30">
                <td className="px-4 py-3">
                  <StatusBadge status={job.status as JobStatus} />
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-gray-300" title={job.sourceUrl}>
                  {job.sourceUrl}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {PLATFORM_LABELS[job.platform] ?? job.platform}
                </td>
                <td className="px-4 py-3 text-gray-400">{job.templateId}</td>
                <td className="px-4 py-3 text-gray-400">{job.slideCount ?? '—'}</td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-gray-300 hover:bg-gray-800 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-gray-300 hover:bg-gray-800 disabled:opacity-40"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
