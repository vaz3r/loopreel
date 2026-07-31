import { formatCost, formatTokens } from '@/lib/formatters';

interface LlmUsage {
  phase: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  estimatedCostUsd: number;
}

interface CostBreakdownProps {
  totalCostUsd: number;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  llmUsage: LlmUsage[];
}

export function CostBreakdown({ totalCostUsd, totalPromptTokens, totalCompletionTokens, llmUsage }: CostBreakdownProps) {
  if (totalCostUsd <= 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-[13px] font-medium text-text-secondary mb-4">Cost Breakdown</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">Total Cost</p>
          <p className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary mt-1">{formatCost(totalCostUsd)}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">Input Tokens</p>
          <p className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary mt-1">{formatTokens(totalPromptTokens)}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary">Output Tokens</p>
          <p className="text-[20px] font-semibold tracking-[-0.02em] text-text-primary mt-1">{formatTokens(totalCompletionTokens)}</p>
        </div>
      </div>

      {llmUsage.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.05em] text-text-quaternary mb-2">Per-Phase Breakdown</p>
          <div className="overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-text-quaternary font-medium">Phase</th>
                  <th className="text-right py-2 text-text-quaternary font-medium">Input</th>
                  <th className="text-right py-2 text-text-quaternary font-medium">Output</th>
                  <th className="text-right py-2 text-text-quaternary font-medium">Latency</th>
                  <th className="text-right py-2 text-text-quaternary font-medium">Cost</th>
                </tr>
              </thead>
              <tbody>
                {llmUsage.map((u, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-1.5 text-text-tertiary">{u.phase}</td>
                    <td className="py-1.5 text-text-tertiary text-right font-mono">{formatTokens(u.promptTokens)}</td>
                    <td className="py-1.5 text-text-tertiary text-right font-mono">{formatTokens(u.completionTokens)}</td>
                    <td className="py-1.5 text-text-tertiary text-right font-mono">{u.latencyMs}ms</td>
                    <td className="py-1.5 text-text-tertiary text-right font-mono">{formatCost(u.estimatedCostUsd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
