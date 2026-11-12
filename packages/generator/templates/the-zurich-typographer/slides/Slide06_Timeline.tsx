import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Milestone = {
  title?: string;
  label?: string;
  body?: string;
};

type TimelineData = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  items?: Milestone[];
  cards?: Milestone[];
  telemetry?: {
    value?: string;
    label?: string;
  }[];
};

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const data = slide as unknown as TimelineData;
  const items = (data.items ?? data.cards ?? []).slice(0, 3);
  const telemetry = data.telemetry ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 border-t-2 border-[var(--border)] pt-7">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
            {data.kicker}
          </p>
        </div>

        <h1 className="mt-8 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
          {data.headline}
        </h1>

        <p className="mt-7 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          {data.subheadline}
        </p>
      </header>

      <ol className="m-0 mt-16 grid h-[1050px] shrink-0 list-none grid-rows-3 p-0">
        {items.map((item, index) => {
          const milestone = telemetry[index];
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${index}-${item.title ?? item.label ?? ''}`}
              className="grid min-h-0 grid-cols-[108px_minmax(0,1fr)]"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 108 350"
                className="block h-[350px] w-[108px] text-[var(--border)]"
                fill="none"
              >
                {!isFirst && (
                  <path
                    d="M54 0V34"
                    stroke="currentColor"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                )}

                <path
                  d={isLast ? 'M54 34V252' : 'M54 34V310'}
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />

                <circle
                  cx="54"
                  cy="34"
                  r="11"
                  className="fill-[var(--accent)]"
                />

                {!isLast && (
                  <>
                    <path
                      d="M48 311L60 303M48 330L60 322"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d="M54 330V350"
                      stroke="currentColor"
                      strokeWidth="2"
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                )}

                {isLast && (
                  <path
                    d="M46 252H62"
                    stroke="currentColor"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>

              <div className="min-w-0 pl-5 pr-8">
                <p className="font-[var(--font-mono)] text-[52px] font-bold leading-[68px] tracking-[-0.045em] text-[var(--accent)]">
                  {milestone?.value}
                </p>

                <h2 className="mt-5 font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
                  {item.title || item.label}
                </h2>

                <p className="mt-4 max-w-[690px] font-[var(--font-body)] text-[28px] leading-snug">
                  {item.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}