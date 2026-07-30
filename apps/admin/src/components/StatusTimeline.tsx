import { Check, Loader2, X, AlertTriangle } from 'lucide-react';
import { STATUS_FLOW } from '@/lib/constants';
import type { JobDetail } from '@/api/client';

const stepLabels: Record<string, string> = {
  queued: 'Queued',
  ingesting: 'Ingest',
  transcribing: 'Transcribe',
  structuring: 'Structure',
  rendering: 'Render',
  complete: 'Done',
};

export function StatusTimeline({ job }: { job: JobDetail }) {
  const currentIdx = STATUS_FLOW.indexOf(job.status as typeof STATUS_FLOW[number]);
  const isFailed = job.status === 'failed';
  const isNeedsReview = job.status === 'needs_review';
  const isTerminal = isFailed || isNeedsReview;
  const failedStage = job.errorPayload?.stage;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[13px] font-medium text-text-secondary">Pipeline</h3>
        <span className="text-[11px] text-text-quaternary font-mono">{job.status}</span>
      </div>

      <div className="flex items-center">
        {STATUS_FLOW.map((step, idx) => {
          let state: 'done' | 'active' | 'upcoming' = 'upcoming';
          if (isTerminal && failedStage === step) state = 'active';
          else if (idx < currentIdx) state = 'done';
          else if (idx === currentIdx) state = 'active';

          return (
            <div key={step} className="flex items-center flex-1 last:flex-initial">
              <div className="flex flex-col items-center gap-2">
                <div className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                  state === 'done'
                    ? 'bg-text-primary'
                    : state === 'active'
                      ? isTerminal && failedStage === step
                        ? 'bg-text-primary'
                        : 'border-2 border-text-primary bg-transparent'
                      : 'border border-border bg-transparent'
                }`}>
                  {state === 'done' ? (
                    <Check className="h-3 w-3 text-background" />
                  ) : state === 'active' ? (
                    isTerminal && failedStage === step ? (
                      isNeedsReview ? (
                        <AlertTriangle className="h-3 w-3 text-background" />
                      ) : (
                        <X className="h-3 w-3 text-background" />
                      )
                    ) : (
                      <Loader2 className="h-3 w-3 text-text-primary animate-spin" />
                    )
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                  )}
                </div>
                <span className={`text-[11px] hidden sm:block ${
                  state === 'upcoming' ? 'text-text-quaternary' : 'text-text-tertiary'
                }`}>
                  {stepLabels[step]}
                </span>
              </div>
              {idx < STATUS_FLOW.length - 1 && (
                <div className={`h-px flex-1 mx-1.5 ${
                  idx < currentIdx ? 'bg-text-primary' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {isFailed && job.errorPayload && (
        <div className="mt-5 rounded-md border border-border bg-surface-2 p-3">
          <p className="text-[13px] font-medium text-text-primary">
            Failed at {job.errorPayload.stage}
          </p>
          <p className="text-[12px] text-text-tertiary mt-1">
            {job.errorPayload.reason}: {job.errorPayload.details}
          </p>
        </div>
      )}

      {isNeedsReview && (
        <div className="mt-5 rounded-md border border-border bg-surface-2 p-3">
          <p className="text-[13px] font-medium text-text-primary">
            Needs review — label detection failed after retries
          </p>
          <p className="text-[12px] text-text-tertiary mt-1">
            Headlines may contain labels that violate platform guidelines. Review the slides and retry or mark as complete.
          </p>
        </div>
      )}
    </div>
  );
}
