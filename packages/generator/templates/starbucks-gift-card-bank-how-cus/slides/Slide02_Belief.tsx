import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function LockedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const promiseMetric = item0?.metric
    ? parseMetricBadge(item0.metric.badge)
    : null;

  return (
    <section
      aria-label={slide.headline}
      aria-roledescription="slide"
      data-slide-count={totalSlides}
      className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]"
    >
      <header className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-5 max-w-[930px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="mt-7 w-full border-b border-[var(--border)]"
        />
      </header>

      <div className="my-6 grid min-h-0 flex-1 grid-rows-2 gap-7">
        <div className="relative row-span-2 h-[420px] w-full self-center">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 952 420"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            {/* A single stored-value specimen, revealed between panels. */}
            <rect
              x="147"
              y="1"
              width="696"
              height="416"
              rx="2"
              stroke="var(--border)"
              strokeWidth="1"
            />

            {/* One magnetic-stripe rule, interrupted by the paper panels. */}
            <path
              d="M147 96H843"
              stroke="var(--ink)"
              strokeOpacity="0.35"
              strokeWidth="1"
            />

            {/* Sparse registration and perimeter measurement ticks. */}
            <path
              d="M135 1H143 M147 5V13
                 M847 1H855 M843 5V13
                 M135 417H143 M147 405V413
                 M847 417H855 M843 405V413
                 M596 12V28 M588 20H604
                 M606 382V398 M598 390H614"
              stroke="var(--border)"
              strokeWidth="1"
            />

            {/* Exact specimen-panel geometry; all copy remains HTML. */}
            <rect
              x="0"
              y="20"
              width="580"
              height="310"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <rect
              x="622"
              y="170"
              width="330"
              height="220"
              fill="var(--paper, #0D0E12)"
              stroke="var(--border)"
              strokeWidth="1"
            />

            <rect
              x="552"
              y="20"
              width="28"
              height="8"
              fill="var(--accent)"
            />
          </svg>

          <article className="absolute left-0 top-[20px] mr-10 flex h-[310px] w-[580px] flex-col justify-between rounded-none p-7">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.02em]">
              {item0?.title}
            </h2>

            {promiseMetric ? (
              <div className="flex items-baseline gap-2 text-[var(--accent)]">
                {promiseMetric.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {promiseMetric.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none tabular-nums">
                  {promiseMetric.value}
                </span>
                {promiseMetric.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {promiseMetric.unit}
                  </span>
                )}
              </div>
            ) : (
              <div aria-hidden="true" className="h-[120px] shrink-0" />
            )}

            <p className="max-w-[510px] font-[var(--font-body)] text-[28px] leading-snug">
              <LockedCopy text={item0?.body} />
            </p>
          </article>

          <article className="absolute left-[582px] top-[170px] ml-10 flex h-[220px] w-[330px] flex-col justify-between rounded-none px-7 py-6">
            <h2 className="border-b border-[var(--border)] pb-3 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--accent)]">
              {item1?.title}
            </h2>

            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              <LockedCopy text={item1?.body} />
            </p>
          </article>
        </div>
      </div>

      {slide.subheadline && (
        <aside className="shrink-0 border-t border-[var(--border)] pb-5 pt-6">
          <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        </aside>
      )}
    </section>
  );
}