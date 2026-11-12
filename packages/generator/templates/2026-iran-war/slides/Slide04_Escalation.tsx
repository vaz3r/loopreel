import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CampaignCard = {
  title?: string;
  body?: string;
};

type CampaignMetric = {
  value?: string;
  label?: string;
};

type CampaignData = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  cards?: CampaignCard[];
  metrics?: CampaignMetric[];
};

function DirectionalStrokes({ reverse = false }: { reverse?: boolean }) {
  return (
    <svg
      viewBox="0 0 380 260"
      fill="none"
      aria-hidden="true"
      className="h-[260px] w-full shrink-0 text-[var(--accent)]"
    >
      <g transform={reverse ? 'translate(380 260) rotate(180)' : undefined}>
        <path
          d="M16 36H364M16 130H364M16 224H364"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <path
          d="M48 18V242M190 18V242M332 18V242"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <path
          d="M16 48H110L170 108H330"
          stroke="var(--ink)"
          strokeOpacity="0.28"
          strokeWidth="2"
        />
        <path
          d="M16 212H110L170 152H330"
          stroke="var(--ink)"
          strokeOpacity="0.28"
          strokeWidth="2"
        />
        <path
          d="M16 130H354"
          stroke="currentColor"
          strokeWidth="5"
        />
        <path
          d="M332 108L354 130L332 152"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <path
          d="M316 98L330 108L316 118M316 142L330 152L316 162"
          stroke="var(--ink)"
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        <circle cx="48" cy="130" r="9" fill="var(--paper, #0D0E12)" />
        <circle
          cx="48"
          cy="130"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as typeof slide & CampaignData;

  const cards = data.cards ?? [];
  const metrics = data.metrics ?? [];

  const opening = cards[0];
  const response = cards[1];
  const buildup = metrics[0];
  const attacks = metrics[1];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6 pb-8">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] leading-[1.3] tracking-[0.16em] text-[var(--accent)] uppercase">
            {data.kicker ?? 'OPENING CAMPAIGN / RETALIATION'}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] leading-[1.02] font-bold tracking-[-0.04em]">
          {data.headline ?? 'Negotiations Met A Decapitation Campaign'}
        </h1>

        <p className="max-w-[920px] font-[var(--font-body)] text-[36px] leading-[1.25] tracking-[-0.015em]">
          {data.subheadline ??
            'Joint attacks killed Iran’s supreme leader; retaliation immediately widened the battlefield.'}
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 border-y border-[var(--border)]">
        <article className="flex min-w-0 flex-col border-r border-[var(--accent)] bg-[var(--paper,#0D0E12)] px-8 py-9">
          <div
            aria-hidden="true"
            className="mb-8 h-[5px] w-16 bg-[var(--accent)]"
          />

          <h2 className="font-[var(--font-headline)] text-[36px] leading-[1.15] font-semibold tracking-[-0.025em]">
            {opening?.title ?? 'Joint opening'}
          </h2>

          <p className="mt-7 font-[var(--font-body)] text-[32px] leading-[1.35] tracking-[-0.015em] [text-wrap:pretty]">
            {opening?.body ??
              'Operation Epic Fury and Operation Roaring Lion launched hundreds of strikes, killing Ali Khamenei and other officials.'}
          </p>

          <div className="mt-auto pt-8">
            <DirectionalStrokes />
          </div>
        </article>

        <article className="flex min-w-0 flex-col bg-[var(--surface)] px-8 py-9">
          <div
            aria-hidden="true"
            className="mb-8 ml-auto h-[5px] w-16 bg-[var(--accent)]"
          />

          <h2 className="font-[var(--font-headline)] text-[36px] leading-[1.15] font-semibold tracking-[-0.025em]">
            {response?.title ?? 'Iran’s response'}
          </h2>

          <p className="mt-7 font-[var(--font-body)] text-[32px] leading-[1.35] tracking-[-0.015em] [text-wrap:pretty]">
            {response?.body ??
              'Operation True Promise IV sent missiles and drones against Israel, US bases and regional US allies.'}
          </p>

          <div className="mt-auto pt-8">
            <DirectionalStrokes reverse />
          </div>
        </article>
      </div>

      <div className="grid shrink-0 grid-cols-2 border-b border-[var(--border)]">
        <div className="flex min-w-0 flex-col items-start gap-5 border-r border-[var(--border)] px-8 py-8">
          <span className="inline-flex border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-[var(--font-mono)] text-[22px] leading-[1.35] tracking-[-0.025em]">
            {buildup?.value ?? 'January–February 2026'}
          </span>

          <p className="font-[var(--font-body)] text-[26px] leading-snug">
            {buildup?.label ?? 'Prewar US military buildup'}
          </p>
        </div>

        <div className="flex min-w-0 flex-col items-start gap-5 px-8 py-8">
          <span className="inline-flex border border-[var(--accent)] px-4 py-3 font-[var(--font-mono)] text-[22px] leading-[1.35] tracking-[-0.025em] text-[var(--accent)]">
            {attacks?.value ?? '28 February 2026'}
          </span>

          <p className="font-[var(--font-body)] text-[26px] leading-snug">
            {attacks?.label ?? 'Joint opening attacks'}
          </p>
        </div>
      </div>
    </section>
  );
}