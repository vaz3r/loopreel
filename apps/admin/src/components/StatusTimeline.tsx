import { Check, Loader2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
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
  const failedStage = job.errorPayload?.stage;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Pipeline Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          {STATUS_FLOW.map((step, idx) => {
            let state: 'done' | 'active' | 'upcoming' = 'upcoming';
            if (isFailed && failedStage === step) state = 'active';
            else if (idx < currentIdx) state = 'done';
            else if (idx === currentIdx) state = 'active';

            return (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors ${
                      state === 'done'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                        : state === 'active'
                          ? isFailed && failedStage === step
                            ? 'border-red-500 bg-red-500/10 text-red-500'
                            : 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-muted text-muted-foreground'
                    }`}
                  >
                    {state === 'done' ? (
                      <Check className="h-4 w-4" />
                    ) : state === 'active' ? (
                      isFailed && failedStage === step ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )
                    ) : (
                      <span className="text-xs font-medium">{idx + 1}</span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted-foreground hidden sm:block">
                    {stepLabels[step]}
                  </span>
                </div>
                {idx < STATUS_FLOW.length - 1 && (
                  <div
                    className={`h-px w-6 sm:w-10 mx-0.5 ${
                      idx < currentIdx ? 'bg-emerald-500' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            );
          })}
          <div className="ml-2">
            <StatusBadge status={job.status} />
          </div>
        </div>

        {isFailed && job.errorPayload && (
          <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-3">
            <p className="text-sm font-medium text-red-500">
              Failed at {job.errorPayload.stage}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {job.errorPayload.reason}: {job.errorPayload.details}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
