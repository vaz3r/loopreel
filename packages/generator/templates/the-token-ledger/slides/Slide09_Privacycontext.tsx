import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = [
    {
      label: 'FTC investigation year',
      value: '2023',
      body: "Ring faced charges over employees and contractors watching customers' private-space recordings.",
    },
    {
      label: "US customers' accounts accessed by hackers",
      value: '55,000',
      body: 'The FTC attributed that access to inadequate Ring safeguards.',
    },
    {
      label: 'Rover cloud video storage: up to this many days',
      value: '180',
      body: 'Applies to doorbell rings, motion events, and Live View events.',
    },
  ];

  function MetricBadge({
    value,
    current = false,
  }: {
    value: string;
    current?: boolean;
  }) {
    return (
      <svg
        viewBox="0 0 344 208"
        width="344"
        height="208"
        role="img"
        aria-label={value}
        className={`block shrink-0 ${
          current ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
        }`}
      >
        <rect
          x="1"
          y="40"
          width="330"
          height="128"
          fill="var(--surface)"
          stroke="var(--border)"
        />

        <path
          d="M17 40H1V56 M315 40H331V56 M1 152V168H17 M315 168H331V152"
          fill="none"
          stroke="currentColor"
          strokeWidth={current ? 3 : 2}
        />

        <path
          d="M25 27H72 M25 181H72 M260 27H307 M260 181H307"
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />

        <text
          x="166"
          y="108"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="currentColor"
          className={`font-[var(--font-mono)] font-bold ${
            value === '55,000' ? 'text-[84px]' : 'text-[100px]'
          }`}
        >
          {value}
        </text>
      </svg>
    );
  }

  function LedgerRow({
    item,
    current = false,
  }: {
    item: (typeof items)[number];
    current?: boolean;
  }) {
    return (
      <div className="grid min-h-[208px] grid-cols-[344px_minmax(0,1fr)] items-center gap-8">
        <MetricBadge value={item.value} current={current} />

        <div className="min-w-0 py-4">
          <h3
            className={`font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] ${
              current ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
            }`}
          >
            {item.label}
          </h3>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[1.3] text-[var(--ink)]">
            {item.body}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={`${slide.id}-headline`}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-10 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.12em] text-[var(--accent)]">
            THE TRUST BACKDROP
          </p>
        </div>

        <h2
          id={`${slide.id}-headline`}
          className="mt-5 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]"
        >
          Cloud Storage Meets Ring&apos;s Security History
        </h2>

        <p className="mt-4 max-w-[880px] font-[var(--font-body)] text-[26px] leading-[1.3]">
          Current retention terms sit alongside earlier FTC findings about Ring
          safeguards.
        </p>
      </header>

      <div className="mt-7 shrink-0">
        <div
          role="group"
          aria-label="Historical Ring context"
          className="relative border-y border-[var(--border)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 952 416"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              d="M0 208H952"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M354 20H362V396H354"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M930 12V24 M918 18H942 M930 392V404 M918 398H942"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </svg>

          <div className="relative">
            <LedgerRow item={items[0]!} />
            <LedgerRow item={items[1]!} />
          </div>
        </div>

        <div
          role="group"
          aria-label="Current Rover cloud video storage"
          className="mt-9 border-t-[4px] border-[var(--accent)] pt-5"
        >
          <LedgerRow item={items[2]!} current />
        </div>
      </div>
    </section>
  );
}