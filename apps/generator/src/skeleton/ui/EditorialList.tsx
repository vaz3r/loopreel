import React from 'react';

export interface EditorialListItem {
  index?: number | string;
  tag?: string;
  title: string;
  body: string;
}

export interface EditorialListProps {
  kicker?: string;
  headline: string;
  items: EditorialListItem[];
  className?: string;
}

/**
 * Full-Frame Editorial List Archetype (Briefing, Catch, Future, Checklist).
 * Distributes items with flex: 1 1 0% across the safe frame with elegant
 * hairline dividers, large numerals, and clear hierarchy.
 * Guaranteed zero empty voids.
 */
export function EditorialList({
  kicker,
  headline,
  items,
  className = '',
}: EditorialListProps) {
  return (
    <div className={`flex flex-col h-full min-h-0 ${className}`}>
      {/* EDITORIAL HEADER WITH THICK RULE */}
      <div className="border-b-4 border-[var(--border)] pb-5 mb-4 shrink-0 flex flex-col gap-2">
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

      {/* ITEMS FILL 100% OF AVAILABLE VERTICAL HEIGHT */}
      <div className="flex-1 flex flex-col min-h-0">
        {items.map((item, idx) => {
          const num = item.index !== undefined ? item.index : idx + 1;
          const numStr = typeof num === 'number' ? String(num).padStart(2, '0') : String(num);

          return (
            <div
              key={idx}
              className="flex-1 flex items-center gap-8 py-5 border-b border-[var(--border)] last:border-b-0 min-h-0"
            >
              {/* NUMERAL BADGE */}
              <div className="font-[var(--font-headline)] text-[44px] md:text-[52px] font-black italic text-[var(--accent)] w-16 shrink-0 leading-none text-left">
                {numStr}.
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="font-[var(--font-headline)] text-[22px] md:text-[26px] font-bold leading-snug tracking-tight text-[var(--ink)] line-clamp-1">
                    {item.title}
                  </h3>
                  {item.tag && (
                    <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-semibold shrink-0">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="font-[var(--font-body)] text-[17px] md:text-[19px] leading-relaxed text-[var(--ink)]/80 line-clamp-3">
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
