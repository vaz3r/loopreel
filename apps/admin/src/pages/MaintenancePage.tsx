import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';
import { api } from '@/api/client';

export function MaintenancePage() {
  const [purging, setPurging] = useState(false);
  const [result, setResult] = useState<{ jobsDeleted: number; outboxDeleted: number; queuesCleared: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function handlePurge() {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    setPurging(true);
    setError(null);
    setResult(null);
    try {
      const res = await api.purgeAll();
      setResult(res);
      setConfirmed(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Purge failed');
    } finally {
      setPurging(false);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary">Maintenance</h1>
        <p className="text-[13px] text-text-tertiary mt-1">System maintenance and data management.</p>
      </div>

      <div className="max-w-lg space-y-6">
        <div className="rounded-md border border-border bg-surface-1 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-text-quaternary" />
            <div>
              <h2 className="text-[14px] font-medium text-text-primary">Purge All Data</h2>
              <p className="text-[12px] text-text-tertiary mt-0.5">
                Delete all jobs, outbox entries, and clear all queues. This cannot be undone.
              </p>
            </div>
          </div>

          {result && (
            <div className="rounded-md bg-surface-2 p-3 text-[12px] text-text-secondary space-y-1">
              <p>Purge complete:</p>
              <p>{result.jobsDeleted} jobs deleted</p>
              <p>{result.outboxDeleted} outbox entries deleted</p>
              <p>{result.queuesCleared} queues cleared</p>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-surface-2 p-3 text-[12px] text-text-secondary">
              {error}
            </div>
          )}

          <Button
            onClick={handlePurge}
            disabled={purging}
            className={`h-9 rounded-md px-4 text-[13px] font-medium ${
              confirmed
                ? 'bg-text-primary text-background hover:bg-text-secondary'
                : 'bg-surface-2 text-text-secondary border border-border hover:bg-surface-hover'
            }`}
          >
            {purging && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
            {confirmed ? 'Confirm Purge' : 'Purge All Data'}
          </Button>

          {confirmed && !purging && (
            <button
              onClick={() => setConfirmed(false)}
              className="text-[12px] text-text-quaternary hover:text-text-tertiary transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
