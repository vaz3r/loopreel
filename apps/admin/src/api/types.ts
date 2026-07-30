export type JobStatus =
  | 'queued'
  | 'ingesting'
  | 'transcribing'
  | 'structuring'
  | 'rendering'
  | 'complete'
  | 'failed'
  | 'needs_review';
