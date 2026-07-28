import { useStats, useJobs } from '../api/hooks';
import { JobCard } from '../components/JobCard';
import { LayoutDashboard, CheckCircle, XCircle, Clock, Loader2, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function StatCard({ label, value, icon: Icon, color }: { label: string; value: number; icon: typeof Clock; color: string }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-100">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useStats();
  const { data: jobsData, isLoading: jobsLoading } = useJobs({ limit: 10 });
  const jobs = jobsData?.jobs ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-400">Overview of content generation activity.</p>
        </div>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          <PlusCircle className="h-4 w-4" />
          New Job
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statsLoading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg border border-gray-800 bg-gray-900" />
            ))}
          </>
        ) : (
          <>
            <StatCard label="Total Jobs" value={stats?.total ?? 0} icon={LayoutDashboard} color="bg-gray-700 text-gray-300" />
            <StatCard label="Processing" value={stats?.processing ?? 0} icon={Loader2} color="bg-blue-900/50 text-blue-400" />
            <StatCard label="Complete" value={stats?.complete ?? 0} icon={CheckCircle} color="bg-emerald-900/50 text-emerald-400" />
            <StatCard label="Failed" value={stats?.failed ?? 0} icon={XCircle} color="bg-red-900/50 text-red-400" />
          </>
        )}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-200">Recent Jobs</h2>
          <Link to="/jobs" className="text-sm text-indigo-400 hover:text-indigo-300">
            View all →
          </Link>
        </div>
        {jobsLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg border border-gray-800 bg-gray-900" />
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-12 text-center text-gray-500">
            No jobs yet.{' '}
            <Link to="/create" className="text-indigo-400 hover:text-indigo-300">
              Create your first job →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
