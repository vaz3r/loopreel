import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const [metric0, ...unitWords0] = (item0?.badge ?? '').split(/\s+/);
  const [metric1, ...unitWords1] = (item1?.badge ?? '').split(/\s+/);

  const theme = {
    '--ink': '#F1F3F9',
    '--accent': '#FF4D00',
    '--surface': '#161820',
    '--border': '#F1F3F925',
    backgroundColor: '#0D0E12',
  } as React.CSSProperties;

  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
    >
      <header className="shrink-0 pb-9">
        <div className="mb-7 flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.03] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]">
          {slide.subheadline}
        </p>

        <div
          aria-hidden="true"
          className="mt-8 h-px w-full bg-[var(--border)]"
        />
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-2 gap-8 pb-4">
        <article className="relative isolate mr-10 flex min-h-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 600 750"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            fill="none"
          >
            <path
              d="M40 204C87 188 92 106 154 97C221 87 219 185 287 178C354 171 364 71 434 66C488 62 515 104 560 116"
              stroke="var(--ink)"
              strokeOpacity="0.18"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M40 225C103 207 105 133 157 124C214 115 234 214 296 205C373 194 382 100 439 94C489 89 518 132 560 142"
              stroke="var(--ink)"
              strokeOpacity="0.08"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M287 178H365V116H458V40H560V252"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M353 116H377M365 104V128M446 40H470M458 28V52"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="281"
              y="172"
              width="12"
              height="12"
              fill="var(--accent)"
            />
            <path
              d="M560 308V710H520M40 670V710H80"
              stroke="var(--ink)"
              strokeOpacity="0.12"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div aria-hidden="true" className="h-[142px] shrink-0" />

          <div className="max-w-[740px]">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {item0?.title || item0?.label}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
              {item0?.body}
            </p>
          </div>

          <div className="mt-auto pt-7">
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.055em] text-[var(--accent)]">
                {metric0}
              </span>
              <span className="font-[var(--font-body)] text-[26px] leading-snug">
                {unitWords0.join(' ')}
              </span>
            </p>
            <p className="mt-4 font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.025em] text-[var(--ink)]">
              {item0?.badgeLabel}
            </p>
          </div>
        </article>

        <article className="relative isolate ml-10 flex min-h-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 600 750"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
            fill="none"
          >
            <path
              d="M40 40H118M40 40V119"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <g
              stroke="var(--ink)"
              strokeOpacity="0.27"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            >
              <path
                d="M327 196V129L373 104V82L423 48L473 82V104L519 129V196Z"
                fill="var(--ink)"
                fillOpacity="0.035"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M373 104V196M473 104V196M327 129H373M473 129H519M373 82H473"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M406 196V154C406 131 440 131 440 154V196M346 196V158M492 196V158"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M394 103V119M423 95V111M452 103V119M307 196H539"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <path
              d="M373 82L423 48L473 82"
              stroke="var(--accent)"
              strokeOpacity="0.8"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M40 710H560"
              stroke="var(--ink)"
              strokeOpacity="0.12"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div aria-hidden="true" className="h-[142px] shrink-0" />

          <div className="max-w-[740px]">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              {item1?.title || item1?.label}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
              {item1?.body}
            </p>
          </div>

          <div className="mt-auto pt-7">
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.055em] text-[var(--accent)]">
                {metric1}
              </span>
              <span className="font-[var(--font-body)] text-[26px] leading-snug">
                {unitWords1.join(' ')}
              </span>
            </p>
            <p className="mt-4 font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.025em] text-[var(--ink)]">
              {item1?.badgeLabel}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}