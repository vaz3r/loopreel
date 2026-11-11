import React from 'react';

export interface SlideHeaderProps {
  kicker?: string;
  headline: string;
  subheadline?: string;
  badge?: string;
  className?: string;
}

export function SlideHeader({
  kicker,
  headline,
  subheadline,
  badge,
  className = '',
}: SlideHeaderProps) {
  return (
    <header className={`shrink-0 flex flex-col gap-4 max-w-[940px] ${className}`}>
      {(kicker || badge) && (
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] shrink-0" />
          {kicker && (
            <span className="font-[var(--font-mono)] text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
              {kicker}
            </span>
          )}
          {badge && (
            <span className="ml-auto text-[11px] font-[var(--font-mono)] uppercase px-2.5 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)]/70">
              {badge}
            </span>
          )}
        </div>
      )}

      <h1 className="font-[var(--font-headline)] text-5xl md:text-6xl font-bold leading-[1.04] tracking-[-0.045em] text-balance text-[var(--ink)]">
        {headline}
      </h1>

      {subheadline && (
        <p className="font-[var(--font-body)] text-xl leading-relaxed text-[var(--ink)]/80 text-pretty max-w-[840px] line-clamp-2">
          {subheadline}
        </p>
      )}
    </header>
  );
}
