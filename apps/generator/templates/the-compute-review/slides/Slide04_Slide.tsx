import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const ledger = [
  {
    title: 'Pre-training',
    hours: '2664K H800 GPU hours ·',
    cost: '$5.328M.',
    share: 2664 / 2788,
  },
  {
    title: 'Context extension',
    hours: '119K H800 GPU hours ·',
    cost: '$0.238M.',
    share: 119 / 2788,
  },
  {
    title: 'Post-training',
    hours: '5K H800 GPU hours ·',
    cost: '$0.01M.',
    share: 5 / 2788,
  },
  {
    title: 'Total',
    hours: '2788K H800 GPU hours ·',
    cost: '$5.576M.',
    share: 1,
  },
];

function TrainingTrace({
  share,
  total,
}: {
  share: number;
  total: boolean;
}) {
  return (
    <svg
      viewBox="0 0 864 38"
      fill="none"
      preserveAspectRatio="none"
      className="h-[38px] w-full"
      aria-hidden="true"
    >
      {Array.from({ length: 25 }, (_, index) => {
        const x = 2 + index * (860 / 24);

        return (
          <line
            key={index}
            x1={x}
            y1={index % 4 === 0 ? 4 : 9}
            x2={x}
            y2={34}
            stroke="var(--border)"
            strokeWidth="1"
          />
        );
      })}

      <rect
        x="2"
        y="13"
        width="860"
        height="12"
        fill="var(--border)"
        opacity="0.4"
      />

      {total ? (
        <>
          <rect
            x="2"
            y="13"
            width={860 * (2664 / 2788)}
            height="12"
            fill="var(--accent)"
          />
          <rect
            x={2 + 860 * (2664 / 2788)}
            y="13"
            width={860 * (119 / 2788)}
            height="12"
            fill="var(--accent)"
            opacity="0.6"
          />
          <rect
            x={2 + 860 * (2783 / 2788)}
            y="13"
            width={860 * (5 / 2788)}
            height="12"
            fill="var(--ink)"
          />
          <line
            x1={2 + 860 * (2664 / 2788)}
            y1="11"
            x2={2 + 860 * (2664 / 2788)}
            y2="27"
            stroke="var(--surface)"
            strokeWidth="2"
          />
        </>
      ) : (
        <rect
          x="2"
          y="13"
          width={860 * share}
          height="12"
          fill="var(--accent)"
        />
      )}

      <path
        d="M2 5V33M862 5V33"
        stroke="var(--ink)"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
    </svg>
  );
}

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-8 py-3 text-[var(--ink)]">
      <div className="shrink-0">
        <div
          aria-hidden="true"
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-2 w-14 bg-[var(--accent)]" />
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span className="h-2 w-2 border border-[var(--accent)]" />
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[68px] font-semibold leading-[1.02] tracking-[-0.045em]">
          DeepSeek-V3:
          <br />
          the training ledger
        </h1>

        <p className="mt-6 max-w-[870px] font-[var(--font-body)] text-[26px] leading-[1.42]">
          Reported official training costs assume H800 rental at $2 per GPU
          hour; prior research and ablations are excluded.
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-4">
        {ledger.map((entry, index) => {
          const isTotal = index === ledger.length - 1;

          return (
            <article
              key={entry.title}
              className={[
                'flex min-h-0 flex-col justify-center border-t px-6 py-4',
                isTotal
                  ? 'border-[var(--accent)] bg-[var(--surface)]'
                  : 'border-[var(--border)]',
              ].join(' ')}
            >
              <h2
                className={[
                  'font-[var(--font-headline)] text-[30px] font-medium leading-tight tracking-[-0.025em]',
                  isTotal ? 'text-[var(--accent)]' : '',
                ].join(' ')}
              >
                {entry.title}
              </h2>

              <p className="mt-2 flex items-baseline justify-between gap-5 font-[var(--font-mono)] tabular-nums">
                <span className="whitespace-nowrap text-[23px] leading-[1.3]">
                  {entry.hours}
                </span>{' '}
                <span
                  className={[
                    'whitespace-nowrap text-[44px] font-medium leading-none tracking-[-0.055em]',
                    isTotal ? 'text-[var(--accent)]' : '',
                  ].join(' ')}
                >
                  {entry.cost}
                </span>
              </p>

              <div className="mt-3">
                <TrainingTrace share={entry.share} total={isTotal} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}