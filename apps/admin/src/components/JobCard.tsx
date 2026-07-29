import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { PLATFORM_LABELS } from '@/lib/constants';
import type { JobSummary } from '@/api/client';

export function JobCard({ job }: { job: JobSummary }) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <Card className="transition-colors hover:border-border/80 hover:bg-accent/50">
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 min-w-0">
            <StatusBadge status={job.status} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{job.sourceUrl}</p>
              <p className="text-xs text-muted-foreground">
                {PLATFORM_LABELS[job.platform] ?? job.platform} · {job.templateId}
                {job.slideCount != null && ` · ${job.slideCount} slides`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground">
              {new Date(job.createdAt).toLocaleDateString()}
            </span>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
