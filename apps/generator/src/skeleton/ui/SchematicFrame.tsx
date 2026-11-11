import React from 'react';

export interface SchematicFrameProps {
  label: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export function SchematicFrame({
  label,
  badge,
  children,
  className = '',
}: SchematicFrameProps) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm max-h-[280px] shrink-0 ${className}`}
    >
      <div className="flex items-center justify-between font-[var(--font-mono)] text-[11px] uppercase tracking-[0.18em] pb-2 border-b border-[var(--border)]">
        <span className="text-[var(--ink)]/70">{label}</span>
        {badge && <span className="text-[var(--accent)] font-bold">{badge}</span>}
      </div>

      <div className="flex items-center justify-center py-2 h-[200px] w-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
