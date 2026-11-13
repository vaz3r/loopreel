import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

type ReceiptItem = {
  role?: string;
  title?: string;
  metric?: {
    badge?: string;
    unit?: string;
    label?: string;
  };
  body?: string;
};

function RevenueMetric({
  item,
  hero = false,
}: {
  item: ReceiptItem | undefined;
  hero?: boolean;
}) {
  const { qualifier, value: metric, unit } = parseMetricBadge(
    item?.metric?.badge ?? '',
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-baseline justify-center gap-2">
        {qualifier && (
          <span className="font-[var(--font-body)] text-[22px]">
            {qualifier}
          </span>
        )}
        <span
          className={`font-[var(--font-mono)] font-bold leading-none tracking-[-0.05em] tabular-nums ${
            hero ? 'text-[56px]' : 'text-[40px]'
          }`}
        >
          {metric}
        </span>
      </div>
      {(item?.metric?.unit || unit) && (
        <span
          className={`mt-1 font-[var(--font-body)] leading-tight ${
            hero ? 'text-[28px]' : 'text-[24px]'
          }`}
        >
          {item?.metric?.unit || unit}
        </span>
      )}
    </div>
  );
}

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = (slide.items ?? []) as unknown as readonly ReceiptItem[];
  const hero = items[0];
  const company = items[1];
  const licensed = items[2];
  const period = (slide as typeof slide & { period?: string }).period;

  // Publication furniture is supplied by SlideFrame.
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-6 flex min-h-0 flex-1 flex-col justify-center">
        {/* Receipt-edge registration marks: decorative, not callout lines. */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 540 800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full text-[var(--border)]"
          fill="none"
        >
          <path
            d="M0 24V0H22 M518 0H540V24 M0 776V800H22 M518 800H540V776"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M0 112H7 M0 128H7 M0 144H7 M533 112H540 M533 128H540 M533 144H540"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative px-7 pt-5 text-center">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            {hero?.title}
          </h2>

          <p className="mt-1 font-[var(--font-mono)] text-[20px] leading-[26px] tracking-wide">
            {hero?.metric?.label}
          </p>

          <div className="mt-3 text-[var(--accent)]">
            <RevenueMetric item={hero} hero />
          </div>

          <p className="mx-auto mt-4 max-w-[820px] font-[var(--font-body)] text-[24px] leading-snug">
            {hero?.body}
          </p>
        </div>

        <div className="relative mt-5">
          <div
            aria-hidden="true"
            className="h-[2px] w-full bg-[var(--accent)]"
          />

          {/* The bracket is part of the same grid as its component cards. */}
          <div aria-hidden="true" className="grid h-10 grid-cols-2 gap-6">
            <div className="relative ml-[50%] border-b border-[var(--border)]">
              <span className="absolute bottom-0 left-0 h-3 border-l border-[var(--border)]" />
            </div>
            <div className="relative mr-[50%] border-b border-[var(--border)]">
              <span className="absolute bottom-0 right-0 h-3 border-r border-[var(--border)]" />
            </div>

            <div className="absolute left-1/2 top-[2px] flex h-10 -translate-x-1/2 flex-col items-center">
              <span className="h-3 border-l border-[var(--border)]" />
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-[var(--accent)]"
                fill="none"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[company, licensed].map((item, index) => (
              <article
                key={index}
                className="flex min-w-0 flex-col border-t border-[var(--border)] bg-[var(--surface)] px-7 py-5"
              >
                <h3 className="min-h-[76px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.16] tracking-[-0.025em]">
                  {item?.title}
                </h3>

                <div className="mt-3 self-start">
                  <RevenueMetric item={item} />
                </div>

                <p className="mt-2 font-[var(--font-mono)] text-[20px] leading-[26px]">
                  {item?.metric?.label}
                </p>

                <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                  {item?.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="relative mt-5 pb-5 text-center font-[var(--font-mono)] text-[20px] leading-[28px] tracking-wide">
          {period}
        </p>
      </div>
    </section>
  );
}