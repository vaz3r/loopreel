import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useJobs } from '@/api/hooks';
import { StatusBadge } from '@/components/StatusBadge';
import { PLATFORM_LABELS, STATUS_COLORS } from '@/lib/constants';
import { Link } from 'react-router-dom';
import type { JobStatus } from '@/api/types';

const STATUSES: (JobStatus | '')[] = ['', 'queued', 'ingesting', 'transcribing', 'structuring', 'rendering', 'complete', 'failed'];

export function JobsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useJobs({ page, status: statusFilter || undefined, search });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>
        <p className="text-muted-foreground">Manage and monitor all content generation jobs.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search URLs..."
              className="pl-9 w-64"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button type="submit" variant="secondary">Search</Button>
        </form>

        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((s) => (
            <Button
              key={s || 'all'}
              size="sm"
              variant={statusFilter === s ? 'default' : 'ghost'}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className="h-7 text-xs"
            >
              {s ? STATUS_COLORS[s]?.label ?? s : 'All'}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28">Status</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="hidden sm:table-cell">Platform</TableHead>
                <TableHead className="hidden md:table-cell">Template</TableHead>
                <TableHead className="hidden md:table-cell text-right">Slides</TableHead>
                <TableHead className="hidden sm:table-cell">Created</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : data?.jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No jobs found
                  </TableCell>
                </TableRow>
              ) : (
                data?.jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell><StatusBadge status={job.status} /></TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm">
                      {job.sourceUrl}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {PLATFORM_LABELS[job.platform] ?? job.platform}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {job.templateId}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-right text-sm text-muted-foreground">
                      {job.slideCount ?? '—'}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/jobs/${job.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {data && data.total > data.limit && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {data.page} of {Math.ceil(data.total / data.limit)}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= Math.ceil(data.total / data.limit)}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
