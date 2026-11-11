import React from 'react';

export interface VerdictOption {
  tag: string;
  title: string;
  points: string[];
}

export interface EditorialVerdictProps {
  kicker?: string;
  headline: string;
  avoid: VerdictOption;
  fit: VerdictOption;
  className?: string;
}

/**
 * Full-Frame Editorial Verdict Archetype.
 * Compares "Who Should Avoid" vs "Potential Fit" side-by-side with clear badges
 * and bulleted advice, filling 100% of the frame without empty voids.
 */
export function EditorialVerdict({
  kicker = 'EDITORIAL VERDICT',
  headline,
  avoid,
  fit,
  className = '',
}: EditorialVerdictProps) {
  return (
    <div className={`flex flex-col h-full min-h-0 ${className}`}>
      {/* EDITORIAL HEADER WITH THICK RULE */}
      <div className="border-b-4 border-[var(--border)] pb-5 mb-6 shrink-0 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
          <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
            {kicker}
          </span>
        </div>
        <h2 className="font-[var(--font-headline)] text-[44px] md:text-[52px] font-black leading-[1.05] tracking-tight text-balance text-[var(--ink)]">
          {headline}
        </h2>
      </div>

      {/* 2-COLUMN FULL-HEIGHT VERDICT PAIR */}
      <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
        {/* AVOID / SKIP */}
        <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border border-red-500/40 bg-red-500/5 shadow-sm min-h-0">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-red-500/20 mb-6">
              <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                {avoid.tag || 'WHO SHOULD SKIP'}
              </span>
              <span className="font-[var(--font-mono)] text-xs text-red-400 font-bold">AVOID</span>
            </div>
            <h3 className="font-[var(--font-headline)] text-[24px] md:text-[28px] font-bold leading-snug tracking-tight text-[var(--ink)] mb-6">
              {avoid.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {avoid.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span className="font-[var(--font-body)] text-[17px] md:text-[19px] leading-relaxed text-[var(--ink)]/85">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* POTENTIAL FIT / BUY */}
        <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border-2 border-[var(--accent)] bg-[var(--surface)] shadow-md min-h-0">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--accent)]/30 mb-6">
              <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                {fit.tag || 'POTENTIAL FIT'}
              </span>
              <span className="font-[var(--font-mono)] text-xs text-[var(--accent)] font-bold">CONSIDER</span>
            </div>
            <h3 className="font-[var(--font-headline)] text-[24px] md:text-[28px] font-bold leading-snug tracking-tight text-[var(--accent)] mb-6">
              {fit.title}
            </h3>
            <ul className="flex flex-col gap-3">
              {fit.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] font-bold shrink-0 mt-0.5">✓</span>
                  <span className="font-[var(--font-body)] text-[17px] md:text-[19px] leading-relaxed text-[var(--ink)]/85">
                    {pt}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
