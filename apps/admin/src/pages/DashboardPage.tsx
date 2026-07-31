import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from 'lucide-react';
import { useStats, useJobs } from '@/api/hooks';
import { JobCard } from '@/components/JobCard';

const statLabels = ['Total Jobs', 'Processing', 'Complete', 'Failed', 'Needs Review'] as const;

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: jobsData, isLoading: jobsLoading } = useJobs({ limit: 10 });

  const statValues = [
    stats?.total ?? 0,
    stats?.processing ?? 0,
    stats?.complete ?? 0,
    stats?.failed ?? 0,
    stats?.needsReview ?? 0,
  ];

  const formatCost = (cost: number) => {
    if (cost === 0) return '$0.00';
    if (cost < 0.01) return '<$0.01';
    return `$${cost.toFixed(4)}`;
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">Dashboard</h1>
        <Button asChild className="h-8 rounded-md bg-text-primary text-background hover:bg-text-secondary px-3 text-[13px] font-medium">
          <Link to="/create">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Job
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
        {statsLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-5">
                <Skeleton className="h-3 w-16 mb-3 bg-surface-2" />
                <Skeleton className="h-8 w-10 bg-surface-2" />
              </div>
            ))
          : statLabels.map((label, i) => (
              <div key={label} className="rounded-lg border border-border bg-card p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">{label}</p>
                <p className="text-[28px] font-semibold tracking-[-0.02em] text-text-primary mt-1">{statValues[i]}</p>
              </div>
            ))}
      </div>

      {/* Cost Stats */}
      {stats && stats.costJobs > 0 && (
        <div className="grid gap-4 grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">Avg Cost/Job</p>
            <p className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary mt-1">{formatCost(stats.avgCost)}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">Total Cost</p>
            <p className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary mt-1">{formatCost(stats.totalCost)}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">Jobs with Cost Data</p>
            <p className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary mt-1">{stats.costJobs}</p>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[13px] font-medium text-text-secondary">Recent Jobs</h2>
          <Link to="/jobs" className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors">
            View all →
          </Link>
        </div>

        {jobsLoading ? (
          <div className="space-y-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-3">
                <Skeleton className="h-4 w-full bg-surface-2" />
              </div>
            ))}
          </div>
        ) : jobsData?.jobs.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <p className="text-[13px] text-text-tertiary">No jobs yet.</p>
            <Link to="/create" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors mt-1 inline-block">
              Create your first job →
            </Link>
          </div>
        ) : (
          <div className="space-y-1">
            {jobsData?.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
