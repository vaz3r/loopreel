import React from 'react';

export interface EditorialCTAProps {
  kicker?: string;
  headline: string;
  verdict: string;
  question: string;
  actionText?: string;
  className?: string;
}

/**
 * Full-Frame Editorial CTA Archetype.
 * Optically centered conclusion with final verdict statement,
 * a compelling community discussion prompt pill, and zero empty voids.
 */
export function EditorialCTA({
  kicker = 'FINAL VERDICT',
  headline,
  verdict,
  question,
  actionText = 'Where do you draw the line?',
  className = '',
}: EditorialCTAProps) {
  return (
    <div className={`flex flex-col h-full min-h-0 justify-center select-none ${className}`}>
      {/* KICKER */}
      {kicker && (
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shrink-0 animate-pulse" />
          <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.25em] text-[var(--accent)]">
            {kicker}
          </span>
        </div>
      )}

      {/* HEADLINE */}
      <h2 className="font-[var(--font-headline)] text-[52px] md:text-[64px] font-black leading-[1.02] tracking-tight text-balance text-[var(--ink)] mb-8">
        {headline}
      </h2>

      {/* VERDICT TAKEAWAY BOX */}
      <div className="border-l-4 border-[var(--accent)] pl-8 py-3 mb-10 bg-[var(--surface)]/40 rounded-r-xl">
        <p className="font-[var(--font-headline)] text-[24px] md:text-[28px] italic leading-relaxed text-[var(--ink)]/90 text-pretty">
          “{verdict}”
        </p>
      </div>

      {/* DISCUSSION QUESTION & ACTION PILL */}
      <div className="flex flex-col gap-4">
        <p className="font-[var(--font-body)] text-[20px] font-semibold text-[var(--ink)]/80">
          {question}
        </p>
        <div className="inline-flex items-center gap-3 w-fit rounded-full border-2 border-[var(--accent)] bg-[var(--accent)]/10 px-8 py-4 text-xl font-bold text-[var(--accent)] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-ping" />
          <span>{actionText}</span>
        </div>
      </div>
    </div>
  );
}
