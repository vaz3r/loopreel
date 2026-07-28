import { clsx } from 'clsx';
import type { JobStatus } from '../api/types';
import { STATUS_COLORS } from '../lib/constants';

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
        STATUS_COLORS[status] ?? 'bg-gray-600 text-gray-100',
      )}
    >
      {status}
    </span>
  );
}
