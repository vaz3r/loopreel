import { Badge } from '@/components/ui/badge';
import type { JobStatus } from '@/api/types';

const statusConfig: Record<JobStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  queued: { label: 'Queued', variant: 'secondary' },
  ingesting: { label: 'Ingesting', variant: 'default' },
  transcribing: { label: 'Transcribing', variant: 'default' },
  structuring: { label: 'Structuring', variant: 'default' },
  rendering: { label: 'Rendering', variant: 'default' },
  complete: { label: 'Complete', variant: 'outline' },
  failed: { label: 'Failed', variant: 'destructive' },
};

export function StatusBadge({ status }: { status: JobStatus }) {
  const config = statusConfig[status] ?? { label: status, variant: 'secondary' as const };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
