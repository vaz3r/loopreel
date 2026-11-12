import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type ImpactMetric = {
  value?: string;
  label?: string;
};

type ImpactContent = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  heroMetric?: ImpactMetric & {
    note?: string;
  };
  cards?: Array<{ title?: string; body?: string }>;
  metrics?: ImpactMetric[];
};

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as ImpactContent;
  const cards = content.cards ?? [];
  const metrics: ImpactMetric[] = content.metrics ?? [];
  const [spending, cutoff] = metrics;

  const value = content.heroMetric?.value ?? spending?.value ?? '';
  const label = content.heroMetric?.label ?? spending?.label;
  const valueParts = value.trim().split(/\s+/);

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="relative isolate flex min-h-0 flex-1 flex-col justify-between gap-8 px-[68px] py-[64px]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 450 800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          fill="none"
        >
          <path
            d="M32 32H418M32 768H418"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M32 32H76M32 768H48"
            stroke="var(--accent)"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M418 32V43M418 757V768"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <header className="flex flex-col gap-6">
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
            {content.kicker}
          </p>

          <h1 className="max-w-[800px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
            {content.headline}
          </h1>

          <p className="max-w-[770px] font-[var(--font-body)] text-[28px] leading-snug">
            {content.subheadline}
          </p>
        </header>

        <div className="flex flex-col gap-7">
          <dl className="flex flex-col gap-6">
            <div className="flex flex-col">
              <dt className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.015em]">
                {label}
              </dt>

              <dd
                aria-label={value}
                className="mt-5 font-[var(--font-mono)] font-bold leading-[0.94] tracking-[-0.07em] text-[var(--accent)]"
              >
                <span aria-hidden="true" className="block text-[112px]">
                  {valueParts}
                </span>
                {valueParts.length > 1 && (
                  <span
                    aria-hidden="true"
                    className="mt-2 block text-[100px]"
                  >
                    {valueParts.slice(1).join(' ')}
                  </span>
                )}
              </dd>
            </div>

            {cutoff && (
              <div className="flex w-fit max-w-full flex-wrap items-center gap-x-6 gap-y-2 border border-[var(--border)] bg-[var(--surface)] px-6 py-4 font-[var(--font-mono)] text-[20px] leading-snug">
                <dt className="uppercase tracking-[0.08em]">
                  {cutoff.label}
                </dt>
                <dd className="text-[22px] font-semibold tracking-[-0.02em]">
                  {cutoff.value}
                </dd>
              </div>
            )}
          </dl>

          <p className="max-w-[770px] border-l-2 border-[var(--accent)] pl-6 font-[var(--font-body)] text-[24px] leading-normal">
            {content.heroMetric?.note}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {cards.map((card, index) => (
            <article
              key={index}
              className="border-t border-[var(--border)] bg-[var(--surface)] px-8 py-7"
            >
              <div className="mb-4 flex items-center gap-4">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 28 28"
                  className="h-7 w-7 shrink-0 text-[var(--accent)]"
                  fill="none"
                >
                  {index === 0 ? (
                    <path
                      d="M14 3V25M3 14H25"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  ) : (
                    <path
                      d="M3 8H25M3 20H25M19 2L25 8L19 14M9 14L3 20L9 26"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="miter"
                    />
                  )}
                </svg>

                <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
                  {card.title}
                </h2>
              </div>

              <p className="font-[var(--font-body)] text-[26px] leading-snug">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}