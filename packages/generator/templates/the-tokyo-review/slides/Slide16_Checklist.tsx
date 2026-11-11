import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type ChecklistItem = {
  check: boolean;
  title: string;
  note: string;
};

const defaultItems: ChecklistItem[] = [
  {
    check: true,
    title: 'Arrival tested',
    note: 'Rehearse entering with shoes, a wet umbrella, and a bag. Give each a destination without occupying the onward route.',
  },
  {
    check: true,
    title: 'Storage tested',
    note: 'Put away the actual bedding and movable furniture. Confirm that the proposed daytime arrangement can genuinely be achieved.',
  },
  {
    check: true,
    title: 'Light tested',
    note: 'Review the screen sample from the intended seat in morning and afternoon light, then check privacy with the interior illuminated.',
  },
  {
    check: true,
    title: 'Movement tested',
    note: 'Mock up partitions and furniture at full scale. Walk the route with doors open and closed; include the mobility aids occupants use.',
  },
];

export default function Slide16({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline?: string;
    items?: ChecklistItem[];
  };

  const items = content.items ?? defaultItems;
  void brand;
  void totalSlides;

  return (
    <section
      aria-label="Room rehearsal checklist"
      className="flex h-full min-h-0 flex-col gap-9 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-2.5 w-2.5 bg-[var(--accent)]" aria-hidden="true" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
            Rehearsal / Approval checklist
          </span>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-[-0.045em]">
          {content.headline ?? 'Approve the room after rehearsal.'}
        </h1>
      </div>

      <ul className="m-0 flex min-h-0 flex-1 list-none flex-col gap-4 p-0">
        {items.map((item, index) => (
          <li
            key={`${index}-${item.title}`}
            className="relative flex flex-1 items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_2px_8px_rgba(0,0,0,0.025)]"
          >
            <div className="flex w-14 shrink-0 flex-col items-center gap-3">
              <span className="font-[var(--font-mono)] text-xs tracking-[0.16em] opacity-50">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span
                className={`flex h-12 w-12 items-center justify-center rounded-lg border ${
                  item.check
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--ink)]'
                }`}
              >
                <span className="sr-only">
                  {item.check ? 'Checked' : 'Not checked'}
                </span>
                {item.check && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-7 w-7"
                  >
                    <path
                      d="m5 12 4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>

            <div className="min-w-0 flex-1 border-l border-[var(--border)] pl-6">
              <h2 className="mb-2 font-[var(--font-headline)] text-[30px] font-bold leading-tight tracking-[-0.025em]">
                {item.title}
              </h2>
              <p className="max-w-[720px] text-[22px] leading-[1.45]">
                {item.note}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}