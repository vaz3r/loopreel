interface ErrorPayload {
  stage: string;
  reason: string;
  details?: string;
}

interface ErrorDetailsProps {
  status: string;
  errorPayload: ErrorPayload | null;
}

export function ErrorDetails({ status, errorPayload }: ErrorDetailsProps) {
  if (!errorPayload) return null;

  if (status === 'failed') {
    return (
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="text-[13px] font-medium text-text-secondary mb-3">Error Details</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="text-[12px] text-text-quaternary font-medium w-16">Stage</span>
            <span className="text-[12px] text-text-tertiary">{errorPayload.stage}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[12px] text-text-quaternary font-medium w-16">Reason</span>
            <span className="text-[12px] text-text-tertiary">{errorPayload.reason}</span>
          </div>
          {errorPayload.details && (
            <div className="flex gap-2">
              <span className="text-[12px] text-text-quaternary font-medium w-16">Details</span>
              <span className="text-[12px] text-text-tertiary break-all">{errorPayload.details}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (status === 'needs_review') {
    return (
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="text-[13px] font-medium text-text-secondary mb-3">Review Details</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="text-[12px] text-text-quaternary font-medium w-16">Stage</span>
            <span className="text-[12px] text-text-tertiary">{errorPayload.stage}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[12px] text-text-quaternary font-medium w-16">Reason</span>
            <span className="text-[12px] text-text-tertiary">{errorPayload.reason}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
