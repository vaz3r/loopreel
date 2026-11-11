import React from 'react';

export interface ContentCardProps {
  index?: number | string;
  tag?: string;
  title: string;
  body: string;
  badge?: string;
  icon?: React.ReactNode;
  accentBorder?: boolean;
  className?: string;
}

export function ContentCard({
  index,
  tag,
  title,
  body,
  badge,
  icon,
  accentBorder = false,
  className = '',
}: ContentCardProps) {
  return (
    <article
      className={`relative flex flex-col justify-between gap-3 p-5 rounded-xl border bg-[var(--surface)] shadow-sm transition-all ${
        accentBorder ? 'border-[var(--accent)]' : 'border-[var(--border)]'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-[var(--accent)] shrink-0">{icon}</span>}
          {index !== undefined && (
            <span className="font-[var(--font-mono)] text-xs font-bold text-[var(--accent)] tracking-wider">
              {typeof index === 'number' ? String(index).padStart(2, '0') : index}
            </span>
          )}
          {tag && (
            <span className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]/60">
              {tag}
            </span>
          )}
        </div>
        {badge && (
          <span className="text-[10px] font-[var(--font-mono)] uppercase px-2 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-semibold">
            {badge}
          </span>
        )}
      </div>

      <h3 className="font-[var(--font-headline)] text-xl font-bold leading-snug tracking-tight text-[var(--ink)] line-clamp-1">
        {title}
      </h3>

      <p className="font-[var(--font-body)] text-base leading-relaxed text-[var(--ink)]/80 line-clamp-3">
        {body}
      </p>
    </article>
  );
}
