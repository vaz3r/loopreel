import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, RotateCcw } from 'lucide-react';

interface JobHeaderProps {
  jobId: string;
  status: string;
  onRetry: () => void;
  isRetrying: boolean;
}

export function JobHeader({ jobId, status, onRetry, isRetrying }: JobHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Link to="/jobs" className="text-text-quaternary hover:text-text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" />
      </Link>
      <div className="flex-1">
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">Job Details</h1>
        <p className="text-[11px] text-text-quaternary font-mono mt-0.5">{jobId}</p>
      </div>
      {status === 'complete' && (
        <Button asChild className="h-8 rounded-md bg-text-primary text-background hover:bg-text-secondary px-3 text-[13px] font-medium">
          <a href={`/api/jobs/${jobId}/download?format=all`}>
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download
          </a>
        </Button>
      )}
      {(status === 'failed' || status === 'needs_review') && (
        <Button
          onClick={onRetry}
          disabled={isRetrying}
          className="h-8 rounded-md bg-text-primary text-background hover:bg-text-secondary px-3 text-[13px] font-medium"
        >
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
          {isRetrying ? 'Retrying...' : 'Retry'}
        </Button>
      )}
    </div>
  );
}
