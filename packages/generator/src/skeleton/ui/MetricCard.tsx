import React from 'react';

export interface MetricCardProps {
  value: string;
  label: string;
  context?: string;
  changeBadge?: string;
  tag?: string;
  className?: string;
}

export function MetricCard({
  value,
  label,
  context,
  changeBadge,
  tag,
  className = '',
}: MetricCardProps) {
  return (
    <div
      className={`flex flex-col justify-between gap-3 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        {tag && (
          <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--accent)] font-semibold">
            {tag}
          </span>
        )}
        {changeBadge && (
          <span className="ml-auto font-[var(--font-mono)] text-xs px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-bold">
            {changeBadge}
          </span>
        )}
      </div>

      <div className="font-[var(--font-mono)] text-5xl md:text-6xl font-black tracking-tight text-[var(--accent)] leading-none my-1">
        {value}
      </div>

      <div>
        <h4 className="font-[var(--font-headline)] text-lg font-bold text-[var(--ink)] leading-snug line-clamp-1">
          {label}
        </h4>
        {context && (
          <p className="font-[var(--font-body)] text-sm text-[var(--ink)]/75 mt-1 leading-relaxed line-clamp-2">
            {context}
          </p>
        )}
      </div>
    </div>
  );
}
