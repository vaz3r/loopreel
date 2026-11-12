import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const [memoryMetric, ...memoryUnitWords] = (item0?.badge ?? '').split(/\s+/);
  const [ledgerMetric, ...ledgerUnitWords] = (item1?.badge ?? '').split(/\s+/);
  const memoryUnit = memoryUnitWords.join(' ');
  const ledgerUnit = ledgerUnitWords.join(' ');

  const patternId = `archive-halftone-${React.useId().replace(/:/g, '')}`;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-7">
        <p className="font-[var(--font-mono)] text-[20px] leading-[1.3] tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[910px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 border-y border-[var(--border)]">
        <article className="flex min-w-0 flex-col bg-[var(--accent)]/[0.08] px-8 py-8">
          <svg
            viewBox="0 0 400 218"
            className="h-[218px] w-full shrink-0 text-[var(--accent)]"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id={patternId}
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="2"
                  cy="2"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.55"
                />
              </pattern>
            </defs>

            <rect
              x="1"
              y="1"
              width="398"
              height="216"
              fill={`url(#${patternId})`}
            />

            <path
              d="M22 48V22H48M352 22H378V48M378 170V196H352M48 196H22V170"
              stroke="currentColor"
              strokeWidth="2"
            />

            <rect
              x="66"
              y="24"
              width="268"
              height="170"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="78"
              y="36"
              width="244"
              height="146"
              stroke="currentColor"
              strokeOpacity="0.4"
            />

            <circle
              cx="245"
              cy="82"
              r="25"
              fill="currentColor"
              fillOpacity="0.22"
            />
            <circle
              cx="245"
              cy="82"
              r="17"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <path
              d="M79 145L133 95L187 148L223 119L267 151L321 111"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M79 162H321M176 181L198 151H214L237 181"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.65"
            />

            <path
              d="M59 63H73M59 155H73M327 63H341M327 155H341"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>

          <div className="mt-6 flex min-h-[90px] shrink-0 flex-col">
            <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.05em] text-[var(--accent)]">
              {memoryMetric}
            </p>
            {memoryUnit && (
              <p className="mt-2 font-[var(--font-mono)] text-[22px] leading-[1.2]">
                {memoryUnit}
              </p>
            )}
          </div>

          <h2 className="mt-5 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.2] tracking-[-0.025em]">
            {item0?.title || item0?.label}
          </h2>

          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            {item0?.body}
          </p>

          <div className="mt-auto pt-6" aria-hidden="true">
            <div className="h-px w-16 bg-[var(--accent)]" />
          </div>
        </article>

        <article className="flex min-w-0 flex-col border-l border-[var(--border)] bg-[var(--surface)] px-8 py-8">
          <svg
            viewBox="0 0 400 218"
            className="h-[218px] w-full shrink-0 text-[var(--ink)]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 24H399M1 64H399M1 104H399M1 144H399M1 184H399"
              stroke="currentColor"
              strokeOpacity="0.3"
            />
            <path
              d="M1 1V217M249 1V217M319 1V217M399 1V217"
              stroke="currentColor"
              strokeOpacity="0.22"
            />
            <path
              d="M1 1H399M1 213H399M1 217H399"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />

            <g stroke="currentColor" strokeWidth="2">
              <path d="M20 44H112M20 84H152M20 124H95M20 164H133" />
              <path d="M275 44H302M265 84H302M282 124H302M270 164H302" />
              <path d="M350 44H382M344 84H382M359 124H382M348 164H382" />
            </g>

            <rect
              x="250"
              y="185"
              width="148"
              height="27"
              fill="var(--accent)"
              fillOpacity="0.15"
            />
            <path
              d="M270 198H382"
              stroke="var(--accent)"
              strokeWidth="3"
            />
          </svg>

          <div className="mt-6 flex min-h-[90px] shrink-0 flex-col">
            <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.05em]">
              {ledgerMetric}
            </p>
            {ledgerUnit && (
              <p className="mt-2 font-[var(--font-mono)] text-[22px] leading-[1.2] tracking-[0.04em]">
                {ledgerUnit}
              </p>
            )}
          </div>

          <h2 className="mt-5 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.2] tracking-[-0.025em]">
            {item1?.title || item1?.label}
          </h2>

          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            {item1?.body}
          </p>

          <div className="mt-auto pt-6" aria-hidden="true">
            <div className="h-[5px] w-full border-y border-[var(--border)]" />
          </div>
        </article>
      </div>
    </section>
  );
}