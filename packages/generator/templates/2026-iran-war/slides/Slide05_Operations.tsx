import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Operation = {
  title: string;
  body: string;
};

type Metric = {
  value: string;
  label: string;
};

function CornerBrackets() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full text-[var(--accent)]"
      viewBox="0 0 450 800"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M32 76V32H76 M374 32H418V76 M418 724V768H374 M76 768H32V724"
        stroke="currentColor"
        strokeWidth="3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function OpeningPanel({
  operation,
  staggered = false,
}: {
  operation?: Operation | undefined;
  staggered?: boolean;
}) {
  return (
    <article
      className={`relative flex min-w-0 flex-col justify-center bg-[var(--surface)] px-10 py-10 ${
        staggered ? 'mt-10' : ''
      }`}
    >
      <CornerBrackets />
      <div className="flex flex-col gap-6">
        <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
          {operation?.title}
        </h2>
        <p className="font-[var(--font-body)] text-[26px] leading-[1.38]">
          {operation?.body}
        </p>
      </div>
    </article>
  );
}

export default function Slide05({ slide }: SlideComponentProps) {
  const data = slide as typeof slide & {
    cards?: Operation[];
    metrics?: Metric[];
  };

  const cards = data.cards ?? [];
  const metrics = data.metrics ?? [];
  const openingUS = cards[0];
  const openingIsrael = cards[1];
  const retaliation = cards[2];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col justify-between gap-8">
        <header className="flex shrink-0 flex-col gap-6">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[3px] w-12 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[21px] uppercase leading-normal tracking-[0.14em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[66px] font-bold leading-[1.03] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="max-w-[870px] font-[var(--font-body)] text-[28px] leading-[1.4]">
            {slide.subheadline}
          </p>
        </header>

        <div className="grid shrink-0 grid-cols-[1.12fr_1fr] gap-6 border-y border-[var(--border)] py-6">
          {metrics.slice(0, 2).map((metric, index) => (
            <div
              key={`${metric.value}-${index}`}
              className={`flex min-w-0 flex-col gap-3 ${
                index === 1
                  ? 'border-l border-[var(--border)] pl-6'
                  : ''
              }`}
            >
              <p className="font-[var(--font-mono)] text-[22px] font-semibold leading-snug tracking-[-0.025em] text-[var(--accent)]">
                {metric.value}
              </p>
              <p className="font-[var(--font-body)] text-[24px] leading-snug">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid h-[940px] shrink-0 grid-cols-[1.12fr_1fr] grid-rows-[520px_80px_340px] gap-x-6">
          <OpeningPanel operation={openingUS} />
          <OpeningPanel operation={openingIsrael} staggered />

          <div
            aria-hidden="true"
            className="col-span-2 flex items-stretch justify-center"
          >
            <svg
              className="h-full w-12 text-[var(--accent)]"
              viewBox="0 0 48 80"
              fill="none"
            >
              <path
                d="M24 0V80"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M17 43L24 50L31 43"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <article className="relative col-span-2 flex min-w-0 flex-col justify-center bg-[var(--surface)] px-16 py-10">
            <CornerBrackets />
            <div className="flex flex-col gap-6">
              <h2 className="max-w-[780px] font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em] text-[var(--accent)]">
                {retaliation?.title}
              </h2>
              <p className="max-w-[800px] font-[var(--font-body)] text-[28px] leading-[1.4]">
                {retaliation?.body}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}