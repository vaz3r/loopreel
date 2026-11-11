import React from 'react';

export interface QuoteBoxProps {
  quote: string;
  attribution: string;
  role?: string;
  context?: string;
  className?: string;
}

export function QuoteBox({
  quote,
  attribution,
  role,
  context,
  className = '',
}: QuoteBoxProps) {
  return (
    <figure
      className={`relative flex flex-col justify-between gap-6 p-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm border-l-4 border-l-[var(--accent)] ${className}`}
    >
      <div className="font-[var(--font-headline)] text-2xl md:text-3xl italic font-medium leading-relaxed text-[var(--ink)] line-clamp-4">
        &ldquo;{quote}&rdquo;
      </div>

      <figcaption className="flex items-center justify-between border-t border-[var(--border)] pt-4 mt-2">
        <div className="flex flex-col">
          <span className="font-[var(--font-headline)] text-lg font-bold text-[var(--ink)]">
            {attribution}
          </span>
          {role && (
            <span className="font-[var(--font-mono)] text-xs text-[var(--accent)] tracking-wider">
              {role}
            </span>
          )}
        </div>
        {context && (
          <span className="text-xs font-mono text-[var(--ink)]/60 uppercase tracking-widest">
            {context}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
