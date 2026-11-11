import React from 'react';

export interface DebunkCard {
  tag: string;
  badge?: string;
  title: string;
  description: string;
  isAccent?: boolean;
}

export interface EditorialDebunkProps {
  kicker?: string;
  headline: string;
  left: DebunkCard;
  right: DebunkCard;
  className?: string;
}

/**
 * Full-Frame Editorial Debunk Archetype (Myth vs Reality, Drone vs Rover, Versus).
 * Displays exactly ONE high-impact comparison pair filling the entire remaining height.
 * Eliminates stacked card overflows and guarantees deep contrast.
 */
export function EditorialDebunk({
  kicker,
  headline,
  left,
  right,
  className = '',
}: EditorialDebunkProps) {
  return (
    <div className={`flex flex-col h-full min-h-0 ${className}`}>
      {/* EDITORIAL HEADER WITH THICK RULE */}
      <div className="border-b-4 border-[var(--border)] pb-5 mb-6 shrink-0 flex flex-col gap-2">
        {kicker && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shrink-0" />
            <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
              {kicker}
            </span>
          </div>
        )}
        <h2 className="font-[var(--font-headline)] text-[44px] md:text-[52px] font-black leading-[1.05] tracking-tight text-balance text-[var(--ink)]">
          {headline}
        </h2>
      </div>

      {/* 2-COLUMN FULL-HEIGHT CONTRAST PAIR */}
      <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
        {/* LEFT CARD */}
        <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm min-h-0">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)] mb-6">
              <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-[var(--ink)]/60">
                {left.tag}
              </span>
              <span className="font-[var(--font-mono)] text-xs text-[var(--ink)]/40 font-semibold">01</span>
            </div>
            <h3 className="font-[var(--font-headline)] text-[26px] md:text-[30px] font-bold leading-snug tracking-tight text-[var(--ink)] mb-4">
              {left.title}
            </h3>
            <p className="font-[var(--font-body)] text-[18px] md:text-[20px] leading-relaxed text-[var(--ink)]/80">
              {left.description}
            </p>
          </div>
          {left.badge && (
            <div className="pt-4 mt-6 border-t border-[var(--border)] font-[var(--font-mono)] text-xs uppercase tracking-wider text-[var(--ink)]/50">
              {left.badge}
            </div>
          )}
        </div>

        {/* RIGHT CARD (ACCENT) */}
        <div className="flex flex-col justify-between p-8 md:p-10 rounded-xl border-2 border-[var(--accent)] bg-[var(--surface)] shadow-md min-h-0 relative">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--accent)]/30 mb-6">
              <span className="font-[var(--font-mono)] text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                {right.tag}
              </span>
              <span className="font-[var(--font-mono)] text-xs text-[var(--accent)] font-bold">02</span>
            </div>
            <h3 className="font-[var(--font-headline)] text-[26px] md:text-[30px] font-bold leading-snug tracking-tight text-[var(--accent)] mb-4">
              {right.title}
            </h3>
            <p className="font-[var(--font-body)] text-[18px] md:text-[20px] leading-relaxed text-[var(--ink)]/85">
              {right.description}
            </p>
          </div>
          {right.badge && (
            <div className="pt-4 mt-6 border-t border-[var(--accent)]/30 font-[var(--font-mono)] text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
              {right.badge}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
