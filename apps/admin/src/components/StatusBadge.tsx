import type { JobStatus } from '@/api/types';
import { Check, Loader2, X, Clock, AlertTriangle } from 'lucide-react';

const statusConfig: Record<JobStatus, {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}> = {
  queued: { label: 'Queued', icon: Clock, active: false },
  ingesting: { label: 'Ingesting', icon: Loader2, active: true },
  transcribing: { label: 'Transcribing', icon: Loader2, active: true },
  structuring: { label: 'Structuring', icon: Loader2, active: true },
  rendering: { label: 'Rendering', icon: Loader2, active: true },
  complete: { label: 'Complete', icon: Check, active: false },
  failed: { label: 'Failed', icon: X, active: false },
  needs_review: { label: 'Needs Review', icon: AlertTriangle, active: false },
};

export function StatusBadge({ status, size = 'default' }: { status: JobStatus; size?: 'sm' | 'default' }) {
  const config = statusConfig[status] ?? { label: status, icon: Clock, active: false };
  const Icon = config.icon;
  const isAnimating = config.active && status !== 'queued';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium ${
      size === 'sm' ? 'text-[11px]' : 'text-[13px]'
    } ${config.active ? 'text-text-primary' : 'text-text-tertiary'}`}>
      <Icon className={`${isAnimating ? 'animate-spin' : ''} ${size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
      {config.label}
    </span>
  );
}
