import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

type VerdictItem = {
  title?: string;
  metric?: {
    badge?: string;
    unit?: string;
    qualifier?: string;
    label?: string;
  };
  body?: string;
};

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = (slide.items ?? []) as unknown as VerdictItem[];
  const cards = [items[0], items[1], items[2]];
  const headline = slide.headline ?? '';
  const highlightedPhrase = 'Real Breakage';
  const highlightIndex = headline.indexOf(highlightedPhrase);
  const effectiveDate = 'April 1, 2026';

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[1.3] tracking-[0.10em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-5 max-w-[940px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.045em]">
          {highlightIndex >= 0 ? (
            <>
              {headline.slice(0, highlightIndex)}
              <span className="text-[var(--accent)]">
                {highlightedPhrase}
              </span>
              {headline.slice(
                highlightIndex + highlightedPhrase.length,
              )}
            </>
          ) : (
            headline
          )}
        </h1>

        <p className="mt-5 max-w-[920px] font-[var(--font-body)] text-[26px] leading-[1.35]">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-7 flex min-h-0 flex-1 flex-col gap-5">
        {cards.map((item, index) => {
          const {
            qualifier: parsedQualifier,
            value: metric,
            unit: parsedUnit,
          } = parseMetricBadge(item?.metric?.badge ?? '');

          const qualifier = item?.metric?.qualifier || parsedQualifier;
          const unit = item?.metric?.unit || parsedUnit;
          const isCalifornia = index === 2;
          const body = item?.body ?? '';
          const dateIndex = body.indexOf(effectiveDate);

          return (
            <article
              key={`${slide.id}-right-${index}`}
              className={`relative grid min-h-[204px] flex-1 grid-cols-[190px_minmax(0,1fr)] items-center gap-7 bg-[var(--surface)] px-7 py-5 ${
                isCalifornia
                  ? 'border border-transparent'
                  : 'border border-[var(--border)]'
              }`}
            >
              {isCalifornia && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 540 800"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full text-[var(--accent)]"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="1"
                    width="538"
                    height="798"
                    stroke="currentColor"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d="M1 90V1H52 M488 799H539V710"
                    stroke="currentColor"
                    strokeWidth="4"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              )}

              <div className="flex min-w-0 flex-col items-start justify-center self-stretch border-r border-[var(--border)] pr-6">
                {qualifier && (
                  <span className="font-[var(--font-body)] text-[22px] leading-snug">
                    {qualifier}
                  </span>
                )}

                <div className="mt-1 flex shrink-0 items-baseline gap-2">
                  <span
                    className={`font-[var(--font-mono)] text-[42px] font-bold leading-[1.15] tracking-[-0.05em] tabular-nums ${
                      isCalifornia ? 'text-[var(--accent)]' : ''
                    }`}
                  >
                    {metric}
                  </span>
                  {unit && (
                    <span className="font-[var(--font-body)] text-[22px] leading-snug">
                      {unit}
                    </span>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className={`mt-5 h-[3px] ${
                    index === 0
                      ? 'w-8 bg-[var(--border)]'
                      : index === 1
                        ? 'w-14 bg-[var(--border)]'
                        : 'w-20 bg-[var(--accent)]'
                  }`}
                />
              </div>

              <div className="min-w-0">
                <h2
                  className={`font-[var(--font-headline)] text-[26px] font-semibold leading-[1.15] tracking-[-0.025em] ${
                    isCalifornia ? 'text-[var(--accent)]' : ''
                  }`}
                >
                  {item?.title}
                </h2>

                {item?.metric?.label && (
                  <p className="mt-2 font-[var(--font-body)] text-[24px] font-medium leading-[1.25]">
                    {item.metric.label}
                  </p>
                )}

                <p className="mt-2 font-[var(--font-body)] text-[24px] leading-[1.3]">
                  {isCalifornia && dateIndex >= 0 ? (
                    <>
                      {body.slice(0, dateIndex)}
                      <strong className="font-semibold text-[var(--accent)]">
                        {effectiveDate}
                      </strong>
                      {body.slice(dateIndex + effectiveDate.length)}
                    </>
                  ) : (
                    body
                  )}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 flex shrink-0 items-center gap-5">
        <div
          aria-hidden="true"
          className="h-px flex-1 bg-[var(--border)]"
        />
        <p className="font-[var(--font-headline)] text-[32px] font-bold leading-none tracking-[-0.045em]">
          The Fine Print<span className="text-[var(--accent)]">.</span>
        </p>
      </div>
    </section>
  );
}