import React from 'react';

export interface EditorialQuoteProps {
  kicker?: string;
  quote: string;
  attribution: string;
  role?: string;
  context?: string;
  className?: string;
}

/**
 * Full-Frame Editorial Quote Archetype (Controversy, The Lead, Insight).
 * Optically centered in the frame with an oversized decorative quote mark,
 * dramatic italic typography, and crisp attribution.
 * Guaranteed zero empty voids and 100% space balance.
 */
export function EditorialQuote({
  kicker,
  quote,
  attribution,
  role,
  context,
  className = '',
}: EditorialQuoteProps) {
  return (
    <div className={`flex flex-col h-full min-h-0 select-none ${className}`}>
      {/* TOP KICKER BAR */}
      {kicker && (
        <div className="border-b-2 border-[var(--border)] pb-4 mb-4 shrink-0 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
          <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
            {kicker}
          </span>
        </div>
      )}

      {/* OPTICALLY CENTERED QUOTE BLOCK */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 min-h-0">
        <div className="font-[var(--font-headline)] text-[160px] md:text-[200px] leading-[0.3] text-[var(--accent)] opacity-25 select-none my-4">
          “
        </div>

        <blockquote className="font-[var(--font-headline)] text-[44px] md:text-[54px] font-bold italic leading-[1.18] text-balance text-[var(--ink)] mb-8 max-w-[860px]">
          {quote}
        </blockquote>

        <div className="flex flex-col items-center gap-2">
          <span className="font-[var(--font-mono)] text-[22px] font-black uppercase tracking-[0.16em] text-[var(--ink)]">
            {attribution}
          </span>
          {role && (
            <span className="font-[var(--font-mono)] text-[14px] uppercase tracking-widest text-[var(--accent)] font-semibold">
              {role}
            </span>
          )}
          {context && (
            <p className="font-[var(--font-body)] text-[18px] text-[var(--ink)]/80 max-w-[700px] mt-4 leading-relaxed">
              {context}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
