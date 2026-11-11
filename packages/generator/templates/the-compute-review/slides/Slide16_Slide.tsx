import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide16({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = [
    'Task accuracy (%)',
    'p95 latency (ms)',
    'Throughput (tokens/s)',
    'Peak memory (GB)',
    'Cost per successful task ($)',
  ];

  const diagrams = [
    <>
      <circle cx="64" cy="40" r="27" />
      <circle cx="64" cy="40" r="15" />
      <path d="M64 6v13M64 61v13M30 40h13M85 40h13" />
      <circle cx="64" cy="40" r="4" fill="currentColor" stroke="none" />
    </>,
    <>
      <path d="M57 8h14M64 8v8M83 21l7-7" />
      <circle cx="64" cy="44" r="26" />
      <path d="M64 25v19l13 8" />
      <circle cx="64" cy="44" r="3" fill="currentColor" stroke="none" />
    </>,
    <>
      <path d="M20 22h77l-9-9M97 22l-9 9" />
      <path d="M32 40h77l-9-9M109 40l-9 9" />
      <path d="M20 58h77l-9-9M97 58l-9 9" />
      <path d="M12 16v12M24 34v12M12 52v12" opacity=".4" />
    </>,
    <>
      <rect x="30" y="17" width="68" height="46" rx="3" />
      <path d="M42 29h44v22H42zM53 29v22M64 29v22M75 29v22" />
      <path d="M42 9v8M56 9v8M72 9v8M86 9v8M42 63v8M56 63v8M72 63v8M86 63v8M22 29h8M22 41h8M22 53h8M98 29h8M98 41h8M98 53h8" />
    </>,
    <>
      <circle cx="64" cy="40" r="28" />
      <circle cx="64" cy="40" r="21" opacity=".4" />
      <path d="M74 29H59a6 6 0 0 0 0 12h10a6 6 0 0 1 0 12H54M64 22v38" />
    </>,
  ];

  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-center gap-10 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[18px] leading-6 tracking-[0.08em] text-[var(--accent)]">
            Editorial measurement checklist
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[78px] font-semibold leading-[0.98] tracking-[-0.055em]">
          Demand deployment
          <br />
          telemetry
        </h1>
      </header>

      <ul
        aria-label="Editorial measurement checklist"
        className="grid shrink-0 grid-rows-5 border-t border-[var(--border)]"
      >
        {items.map((item, index) => (
          <li
            key={item}
            className="grid h-[122px] grid-cols-[30px_minmax(0,1fr)_128px] items-center gap-6 border-b border-[var(--border)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 30 30"
              fill="none"
              className="h-[30px] w-[30px] text-[var(--accent)]"
            >
              <rect
                x="2"
                y="2"
                width="26"
                height="26"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>

            <span className="min-w-0 font-[var(--font-body)] text-[32px] font-medium leading-[1.2] tracking-[-0.025em]">
              {item}
            </span>

            <div className="flex h-[88px] w-[128px] items-center justify-center border-l border-[var(--border)] bg-[var(--surface)]">
              <svg
                aria-hidden="true"
                viewBox="0 0 128 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
                className="h-[72px] w-[116px] text-[var(--accent)]"
              >
                {diagrams[index]}
              </svg>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}