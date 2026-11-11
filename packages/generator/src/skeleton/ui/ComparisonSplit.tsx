import React from 'react';

export interface ComparisonItem {
  tag: string;
  title: string;
  description: string;
  isPositive?: boolean;
}

export interface ComparisonSplitProps {
  left: ComparisonItem;
  right: ComparisonItem;
  className?: string;
}

export function ComparisonSplit({ left, right, className = '' }: ComparisonSplitProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch ${className}`}>
      {/* LEFT ITEM */}
      <div className="flex flex-col justify-between gap-4 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <span
            className={`font-[var(--font-mono)] text-xs font-bold uppercase tracking-wider ${
              left.isPositive ? 'text-[var(--accent)]' : 'text-[var(--ink)]/60'
            }`}
          >
            {left.tag}
          </span>
          <span className="text-xs font-mono opacity-50">01</span>
        </div>

        <h3 className="font-[var(--font-headline)] text-2xl font-bold leading-snug tracking-tight text-[var(--ink)] line-clamp-2">
          {left.title}
        </h3>

        <p className="font-[var(--font-body)] text-base leading-relaxed text-[var(--ink)]/80 line-clamp-4">
          {left.description}
        </p>
      </div>

      {/* RIGHT ITEM */}
      <div className="flex flex-col justify-between gap-4 p-6 rounded-xl border border-[var(--accent)] bg-[var(--surface)] shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--accent)]/30">
          <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {right.tag}
          </span>
          <span className="text-xs font-mono text-[var(--accent)] font-bold">02</span>
        </div>

        <h3 className="font-[var(--font-headline)] text-2xl font-bold leading-snug tracking-tight text-[var(--ink)] line-clamp-2">
          {right.title}
        </h3>

        <p className="font-[var(--font-body)] text-base leading-relaxed text-[var(--ink)]/80 line-clamp-4">
          {right.description}
        </p>
      </div>
    </div>
  );
}
