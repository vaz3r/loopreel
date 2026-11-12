import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type MilestoneCard = {
  title: string;
  body: string;
};

type MilestoneMetric = {
  value: string;
  label: string;
};

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const content = slide as typeof slide & {
    cards?: MilestoneCard[];
    metrics?: MilestoneMetric[];
  };

  const cards = content.cards ?? [];
  const metrics = content.metrics ?? [];

  const milestones = [
    { card: cards[0], metric: metrics[0] },
    { card: cards[1], metric: metrics[1] },
    { card: cards[2], metric: metrics[2] },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7 border-t border-[var(--border)] pt-8">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center pt-10">
        <div className="relative isolate h-[1080px] w-full shrink-0">
          {/* The SVG and the editorial grid share the same coordinate system:
              x=54/450 is the center of the grid's 24%-wide first column.
              Each node sits 65px below its corresponding 360px row start. */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 450 800"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full text-[var(--accent)]"
            fill="none"
          >
            <line
              x1="54"
              y1="48.148148"
              x2="54"
              y2="581.481481"
              stroke="currentColor"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />

            {[48.148148, 314.814815, 581.481481].map((y, index) => (
              <g key={index}>
                {/* Short vertical masks keep every announcement node open. */}
                <line
                  x1="54"
                  y1={y - 11}
                  x2="54"
                  y2={y + 11}
                  stroke="#0D0E12"
                  strokeWidth="9"
                  vectorEffect="non-scaling-stroke"
                />
                <ellipse
                  cx="54"
                  cy={y}
                  rx="8.5"
                  ry="13.333333"
                  stroke="currentColor"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}

            <line
              x1="32"
              y1="768"
              x2="418"
              y2="768"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative z-10 m-0 grid h-full list-none grid-rows-3 p-0">
            {milestones.map(({ card, metric }, index) => (
              <li
                key={index}
                className="grid min-h-0 grid-cols-[24%_1fr]"
              >
                <div aria-hidden="true" />

                <article className="min-w-0 pr-[68px] pt-[38px]">
                  <div className="flex flex-col items-start gap-4">
                    <p className="inline-flex min-h-[54px] items-center border border-[var(--accent)] bg-[var(--surface)] px-5 font-[var(--font-mono)] text-[36px] font-semibold leading-none tracking-[-0.04em] text-[var(--accent)]">
                      {metric?.value}
                    </p>

                    <p className="font-[var(--font-mono)] text-[22px] leading-snug tracking-[0.025em] text-[var(--accent)]">
                      {metric?.label}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[var(--border)] pt-5">
                    <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
                      {card?.title}
                    </h2>
                    <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
                      {card?.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}