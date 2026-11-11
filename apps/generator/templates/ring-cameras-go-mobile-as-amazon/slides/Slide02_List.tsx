import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const defaultItems = [
  {
    title: 'The business robot arrives first',
    body: 'Amazon’s $1,000 Ring Rover Cam is available for preorder, with shipping scheduled for December 16, 2026. It is designed to patrol single-floor indoor businesses.',
  },
  {
    title: 'The drone still needs clearance',
    body: 'The $250 Ring Drone Cam is targeted for January 27, 2027, but requires Federal Communications Commission authorization before going on sale.',
  },
  {
    title: 'Both turn floor plans into patrol routes',
    body: 'Amazon’s AI Pilot combines cameras, specialized vision models, on-device sensors and cloud processing to map interiors, suggest patrol points and navigate obstacles.',
  },
];

const labels = ['GROUND / PREORDER', 'AIR / PENDING AUTHORIZATION', 'SHARED / AI PILOT'];

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline?: string;
    items?: Array<{ title: string; body: string }>;
  };

  const items = content.items?.length === 3 ? content.items : defaultItems;
  void brand;

  return (
    <section
      aria-label={`Slide 2 of ${totalSlides}: Two machines, one surveillance system`}
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Two devices / one system
          </span>
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.045em]">
          {content.headline ||
            'Two machines. One expanding surveillance system.'}
        </h1>
      </div>

      <ol className="m-0 grid min-h-0 flex-1 list-none grid-rows-3 gap-5 p-0">
        {items.map((item, index) => (
          <li
            key={`${index}-${item.title}`}
            className="relative grid grid-cols-[68px_minmax(0,1fr)] items-center gap-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-8 left-0 top-8 w-[3px] rounded-r-full bg-[var(--accent)]"
            />

            <div
              aria-hidden="true"
              className="flex h-full flex-col items-center justify-between gap-4"
            >
              <span className="font-[var(--font-mono)] text-[42px] font-bold leading-none tracking-[-0.07em] text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="w-px flex-1 bg-[var(--border)]" />

              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                className="shrink-0 text-[var(--accent)]"
              >
                {index === 0 ? (
                  <g stroke="currentColor" strokeWidth="1.5">
                    <rect x="7" y="11" width="22" height="15" rx="4" />
                    <circle cx="18" cy="18" r="3" />
                    <path d="M11 27v3M25 27v3M18 11V6M14 6h8" />
                  </g>
                ) : index === 1 ? (
                  <g
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <rect x="13" y="13" width="10" height="10" rx="3" />
                    <path d="m13 13-4-4m14 4 4-4M13 23l-4 4m14-4 4 4" />
                    <circle cx="7" cy="7" r="4" />
                    <circle cx="29" cy="7" r="4" />
                    <circle cx="7" cy="29" r="4" />
                    <circle cx="29" cy="29" r="4" />
                  </g>
                ) : (
                  <g stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 5h26v26H5V5Z" />
                    <path d="M5 17h9V5m8 26V19h9" />
                    <path
                      d="m10 25 8-12 8-3"
                      strokeDasharray="2 3"
                      strokeLinecap="round"
                    />
                    <circle cx="10" cy="25" r="2" fill="currentColor" />
                    <circle cx="26" cy="10" r="2" fill="currentColor" />
                  </g>
                )}
              </svg>
            </div>

            <div className="flex min-w-0 flex-col gap-3">
              <span className="self-start rounded-md border border-[var(--border)] px-3 py-1.5 font-[var(--font-mono)] text-xs font-semibold leading-none tracking-[0.12em] text-[var(--accent)]">
                {labels[index]}
              </span>

              <h2 className="font-[var(--font-headline)] text-[30px] font-bold leading-[1.12] tracking-[-0.025em]">
                {item.title}
              </h2>

              <p className="text-[22px] leading-[1.45] opacity-85">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}