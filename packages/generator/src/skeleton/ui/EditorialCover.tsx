import React from 'react';

export interface EditorialCoverProps {
  kicker?: string;
  headline: string;
  subheadline?: string;
  authorName?: string;
  authorRole?: string;
  readTime?: string;
  className?: string;
}

/**
 * Full-Frame Editorial Cover Archetype.
 * Centers headline block optically in the frame with monumental typography
 * and pins an authoritative byline bar to the bottom with hairline rules.
 * Guaranteed zero empty voids and 100% space balance.
 */
export function EditorialCover({
  kicker,
  headline,
  subheadline,
  authorName,
  authorRole,
  readTime = '4 min read',
  className = '',
}: EditorialCoverProps) {
  return (
    <div className={`flex flex-col h-full min-h-0 justify-between select-none ${className}`}>
      {/* OPTICALLY CENTERED HEADLINE BLOCK */}
      <div className="flex-1 flex flex-col justify-center min-h-0 py-6">
        {kicker && (
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shrink-0 animate-pulse" />
            <span className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
              {kicker}
            </span>
          </div>
        )}

        <h1 className="font-[var(--font-headline)] text-[72px] md:text-[86px] font-black leading-[0.98] tracking-[-0.035em] text-balance text-[var(--ink)] mb-8">
          {headline}
        </h1>

        {subheadline && (
          <p className="font-[var(--font-body)] text-[28px] md:text-[32px] leading-[1.35] italic text-[var(--ink)]/85 text-pretty max-w-[880px] border-l-4 border-[var(--accent)] pl-6">
            {subheadline}
          </p>
        )}
      </div>

      {/* PINNED EDITORIAL BYLINE BAR */}
      <div className="border-t-2 border-[var(--border)] pt-6 pb-2 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {authorName && (
            <span className="font-[var(--font-mono)] text-sm font-bold uppercase tracking-wider text-[var(--ink)]">
              By <span className="text-[var(--accent)]">{authorName}</span>
            </span>
          )}
          {authorRole && (
            <>
              <span className="text-[var(--border)]">|</span>
              <span className="font-[var(--font-mono)] text-xs uppercase tracking-widest text-[var(--ink)]/60">
                {authorRole}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 font-[var(--font-mono)] text-xs tracking-widest uppercase text-[var(--ink)]/60">
          <span>{readTime}</span>
          <span className="text-[var(--accent)]">●</span>
          <span>SPECIAL REPORT</span>
        </div>
      </div>
    </div>
  );
}
