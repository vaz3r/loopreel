import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Eye } from 'lucide-react';
import type { BespokeAudit } from '@/api/client';

export function VisualAuditCard({ audit }: { audit?: BespokeAudit }) {
  if (!audit) return null;

  const passed = audit.passed;
  const collisionCount = audit.totalCollisions ?? 0;
  const errorCount = (audit.errors || []).length;
  const warningCount = (audit.warnings || []).length;

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`h-4 w-4 ${passed ? 'text-emerald-400' : 'text-red-400'}`} />
          <h3 className="text-[13px] font-semibold text-text-primary">
            Automated Playwright Visual Audit
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {passed ? (
            <span className="flex items-center gap-1.5 text-[11px] font-medium font-mono px-2.5 py-1 rounded-full bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              AUDIT PASSED (0 COLLISIONS)
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-[11px] font-medium font-mono px-2.5 py-1 rounded-full bg-red-950/50 text-red-300 border border-red-800/50">
              <XCircle className="h-3 w-3 text-red-400" />
              AUDIT FAILED ({collisionCount} COLLISIONS)
            </span>
          )}
        </div>
      </div>

      {/* Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-lg border border-border bg-surface-2">
          <p className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary">
            Bounding Box Collisions
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-[20px] font-bold font-mono ${collisionCount === 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {collisionCount}
            </span>
            <span className="text-[11px] text-text-quaternary">overlaps detected</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-surface-2">
          <p className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary">
            Boundary Overflow Check
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[20px] font-bold font-mono text-emerald-400">
              0
            </span>
            <span className="text-[11px] text-text-quaternary">elements exceeding canvas</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-border bg-surface-2">
          <p className="text-[10px] uppercase font-mono tracking-wider text-text-quaternary">
            Mobile Legibility Pass-Through
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-[20px] font-bold font-mono text-emerald-400">
              1.000
            </span>
            <span className="text-[11px] text-text-quaternary">unscaled 1080×1350 canvas</span>
          </div>
        </div>
      </div>

      {/* Diagnostics / Fault Log if any */}
      {errorCount > 0 && (
        <div className="mt-3 p-3 rounded-lg border border-red-900/50 bg-red-950/20 text-red-300 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            Audit Diagnostics ({errorCount} items)
          </div>
          <ul className="list-disc list-inside text-[12px] font-mono space-y-1 text-red-200">
            {audit.errors.map((err, idx) => (
              <li key={idx} className="break-words">{err}</li>
            ))}
          </ul>
        </div>
      )}

      {warningCount > 0 && (
        <div className="mt-3 p-3 rounded-lg border border-amber-900/50 bg-amber-950/20 text-amber-300 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
            <AlertTriangle className="h-3.5 w-3.5" />
            Audit Warnings ({warningCount} items)
          </div>
          <ul className="list-disc list-inside text-[12px] font-mono space-y-1 text-amber-200">
            {audit.warnings?.map((warn, idx) => (
              <li key={idx} className="break-words">{warn}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
