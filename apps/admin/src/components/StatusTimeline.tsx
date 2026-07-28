import type { JobDetail } from '../api/client';
import { STATUS_FLOW } from '../lib/constants';
import { StatusBadge } from './StatusBadge';
import { Check, Loader2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

export function StatusTimeline({ job }: { job: JobDetail }) {
  const currentIdx = STATUS_FLOW.indexOf(job.status as typeof STATUS_FLOW[number]);
  const isFailed = job.status === 'failed';
  const failedStage = job.errorPayload?.stage;

  return (
    <div className="flex items-center gap-1">
      {STATUS_FLOW.map((step, i) => {
        let state: 'done' | 'active' | 'upcoming' = 'upcoming';
        if (isFailed && failedStage === step) state = 'active';
        else if (i < currentIdx) state = 'done';
        else if (i === currentIdx) state = 'active';

        return (
          <div key={step} className="flex items-center gap-1">
            <div
              className={clsx(
                'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                state === 'done' && 'bg-emerald-600 text-emerald-100',
                state === 'active' && !isFailed && 'bg-indigo-600 text-indigo-100 animate-pulse',
                state === 'active' && isFailed && 'bg-red-600 text-red-100',
                state === 'upcoming' && 'bg-gray-700 text-gray-500',
              )}
              title={step}
            >
              {state === 'done' && <Check className="h-3.5 w-3.5" />}
              {state === 'active' && !isFailed && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {state === 'active' && isFailed && <XCircle className="h-3.5 w-3.5" />}
              {state === 'upcoming' && <span>{i + 1}</span>}
            </div>
            {i < STATUS_FLOW.length - 1 && (
              <div
                className={clsx(
                  'h-px w-6',
                  i < currentIdx ? 'bg-emerald-600' : 'bg-gray-700',
                )}
              />
            )}
          </div>
        );
      })}
      <div className="ml-2">
        <StatusBadge status={job.status} />
      </div>
    </div>
  );
}
