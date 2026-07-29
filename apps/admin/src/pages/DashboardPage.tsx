import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, BarChart3, Loader2, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { useStats, useJobs } from '@/api/hooks';
import { JobCard } from '@/components/JobCard';

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: jobsData, isLoading: jobsLoading } = useJobs({ limit: 10 });

  const statCards = [
    { label: 'Total Jobs', value: stats?.total ?? 0, icon: BarChart3, color: 'text-primary' },
    { label: 'Processing', value: stats?.processing ?? 0, icon: Loader2, color: 'text-blue-500' },
    { label: 'Complete', value: stats?.complete ?? 0, icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Failed', value: stats?.failed ?? 0, icon: XCircle, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link to="/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Job
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-12" />
                </CardContent>
              </Card>
            ))
          : statCards.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    {stat.label}
                  </div>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Jobs</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/jobs">
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {jobsLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : jobsData?.jobs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No jobs yet</p>
              <Button asChild>
                <Link to="/create">Create your first job</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {jobsData?.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
