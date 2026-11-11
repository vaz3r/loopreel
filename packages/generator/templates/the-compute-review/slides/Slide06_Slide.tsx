import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const cards = [
  {
    position: 'top-left',
    title: 'Unavailable · Provider-hosted',
    body: 'Ask about retention, portability, pricing, and service limits.',
    available: false,
    selfHosted: false,
  },
  {
    position: 'top-right',
    title: 'Available · Provider-hosted',
    body: 'Check license rights separately from hosting terms.',
    available: true,
    selfHosted: false,
  },
  {
    position: 'bottom-left',
    title: 'Unavailable · Self-hosted',
    body: 'Inspect appliance restrictions, update control, and audit access.',
    available: false,
    selfHosted: true,
  },
  {
    position: 'bottom-right',
    title: 'Available · Self-hosted',
    body: 'Budget infrastructure; verify modification and redistribution rights.',
    available: true,
    selfHosted: true,
  },
] as const;

function AccessDiagram({
  available,
  selfHosted,
}: {
  available: boolean;
  selfHosted: boolean;
}) {
  return (
    <svg
      viewBox="0 0 152 56"
      fill="none"
      aria-hidden="true"
      className="h-14 w-[152px] shrink-0 text-[var(--accent)]"
    >
      <g stroke="currentColor" strokeWidth="1.5">
        {available ? (
          <>
            <path d="M7 16 25 7l18 9-18 9L7 16Z" />
            <path d="m7 26 18 9 18-9M7 36l18 9 18-9" />
            <path d="M25 25v20" opacity=".45" />
          </>
        ) : (
          <>
            <rect
              x="7"
              y="7"
              width="36"
              height="38"
              rx="2"
              strokeDasharray="3 4"
            />
            <rect x="18" y="24" width="14" height="12" rx="1" />
            <path d="M21 24v-5a4 4 0 0 1 8 0v5" />
            <path d="M25 29v3" />
          </>
        )}

        <path d="M57 26h28" strokeDasharray="2 5" opacity=".5" />

        {selfHosted ? (
          <>
            <rect x="102" y="8" width="36" height="36" rx="2" />
            <path d="M102 20h36M102 32h36" />
            <path d="M119 14h12M119 26h12M119 38h12" opacity=".5" />
            <path d="M108 48h24M113 44v4M127 44v4" />
            <circle cx="109" cy="14" r="1" fill="currentColor" />
            <circle cx="109" cy="26" r="1" fill="currentColor" />
            <circle cx="109" cy="38" r="1" fill="currentColor" />
          </>
        ) : (
          <>
            <path d="M109 36h24a10 10 0 0 0 1-20 14 14 0 0 0-27-1 10.5 10.5 0 0 0 2 21Z" />
            <path d="M121 36v12M113 48h16" opacity=".5" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-9 py-5 text-[var(--ink)]">
      <header className="shrink-0">
        <div
          aria-hidden="true"
          className="mb-6 h-1 w-16 bg-[var(--accent)]"
        />
        <h2 className="max-w-[850px] font-[var(--font-headline)] text-[64px] font-semibold leading-[1.04] tracking-[-0.045em]">
          Separate access
          <br />
          from operation
        </h2>
        <p className="mt-5 max-w-[800px] font-[var(--font-body)] text-[26px] leading-[1.4] opacity-75">
          Editorial framework: evaluate weight access and deployment location
          independently.
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[60px_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[50px_minmax(0,1fr)_minmax(0,1fr)] gap-x-3 gap-y-3">
        <div aria-hidden="true" />

        {['Weights unavailable', 'Weights available'].map((label) => (
          <div
            key={label}
            className="flex items-center gap-3 border-b border-[var(--border)] px-5 pb-3"
          >
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 bg-[var(--accent)]"
            />
            <span className="font-[var(--font-mono)] text-[19px] leading-6 tracking-[-0.025em]">
              {label}
            </span>
          </div>
        ))}

        {['Provider-hosted', 'Self-hosted'].map((label, row) => (
          <React.Fragment key={label}>
            <div className="flex min-h-0 items-center justify-center border-r border-[var(--border)]">
              <span className="rotate-180 whitespace-nowrap font-[var(--font-mono)] text-[18px] tracking-[0.02em] [writing-mode:vertical-rl]">
                {label}
              </span>
            </div>

            {cards.slice(row * 2, row * 2 + 2).map((card) => (
              <article
                key={card.position}
                className="relative flex min-h-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-7 py-6"
              >
                <AccessDiagram
                  available={card.available}
                  selfHosted={card.selfHosted}
                />

                <h3 className="mt-5 font-[var(--font-headline)] text-[29px] font-medium leading-[1.16] tracking-[-0.025em]">
                  {card.title}
                </h3>

                <p className="mt-4 font-[var(--font-body)] text-[24px] leading-[1.35] opacity-75">
                  {card.body}
                </p>

                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="absolute right-3 top-3 h-4 w-4 text-[var(--border)]"
                >
                  <path
                    d="M1 1h14v14"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </article>
            ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}