import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const metrics = [
  {
    label: 'Single-core versus M5, around',
    value: '+7%',
    min: 7,
    max: 7,
  },
  {
    label: 'Multi-core versus M5, around',
    value: '+15%',
    min: 15,
    max: 15,
  },
  {
    label: 'GPU versus M5, depending on test',
    value: '+20–30%',
    min: 20,
    max: 30,
  },
  {
    label: 'Single-core versus M3, around',
    value: '+30%',
    min: 30,
    max: 30,
  },
  {
    label: 'Multi-core and graphics versus M3',
    value: '+40–60%',
    min: 40,
    max: 60,
  },
] as const;

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const instanceId = React.useId().replace(/:/g, '');
  void brand;
  void totalSlides;

  function renderMetric(
    metric: (typeof metrics)[number],
    index: number,
  ) {
    const highlighted = index === 2;
    const start = 12;
    const width = 408;
    const minimumX = start + (metric.min / 60) * width;
    const maximumX = start + (metric.max / 60) * width;
    const isRange = metric.min !== metric.max;
    const patternId = `${instanceId}-range-${index}`;

    return (
      <div
        key={metric.label}
        className={[
          'grid h-[142px] grid-cols-[390px_minmax(0,1fr)]',
          'items-center gap-8 border-b border-[var(--border)] px-6 py-4',
          highlighted ? 'bg-[var(--surface)]' : '',
        ].join(' ')}
      >
        <div className="min-w-0">
          <p className="font-[var(--font-body)] text-[18px] leading-snug text-[var(--ink)]">
            {metric.label}
          </p>
          <p
            className={[
              'mt-2 whitespace-nowrap font-[var(--font-mono)]',
              'text-[48px] font-medium leading-none tracking-[-0.06em] tabular-nums',
              highlighted ? 'text-[var(--accent)]' : 'text-[var(--ink)]',
            ].join(' ')}
          >
            {metric.value}
          </p>
        </div>

        <svg
          viewBox="0 0 440 92"
          className={[
            'block h-[92px] w-full',
            highlighted ? 'text-[var(--accent)]' : 'text-[var(--ink)]',
          ].join(' ')}
          role="img"
          aria-label={`${metric.label}: ${metric.value}`}
        >
          <defs>
            <pattern
              id={patternId}
              width="7"
              height="7"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M-2 2L2-2M0 7L7 0M5 9L9 5"
                stroke="currentColor"
                strokeWidth="1.4"
                opacity="0.7"
              />
            </pattern>
          </defs>

          {[0, 1, 2, 3, 4, 5, 6].map((tick) => {
            const x = start + (tick / 6) * width;
            return (
              <line
                key={tick}
                x1={x}
                x2={x}
                y1="12"
                y2="78"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray={tick === 0 ? undefined : '2 5'}
              />
            );
          })}

          <line
            x1={start}
            x2={start + width}
            y1="46"
            y2="46"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <rect
            x={start}
            y="31"
            width={minimumX - start}
            height="30"
            fill="currentColor"
          />

          {isRange && (
            <>
              <rect
                x={minimumX}
                y="31"
                width={maximumX - minimumX}
                height="30"
                fill={`url(#${patternId})`}
              />
              <path
                d={`M${minimumX} 31H${maximumX}V61H${minimumX}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </>
          )}

          <line
            x1={maximumX}
            x2={maximumX}
            y1="23"
            y2="69"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx={maximumX}
            cy="23"
            r="3"
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={`${instanceId}-headline`}
      data-slide-id={slide.id}
      className="flex h-full max-h-[1028px] w-full min-w-0 flex-col gap-7 text-[var(--ink)]"
    >
      <header className="shrink-0">
        <div
          aria-hidden="true"
          className="mb-5 h-[5px] w-14 bg-[var(--accent)]"
        />
        <h2
          id={`${instanceId}-headline`}
          className="max-w-[840px] font-[var(--font-headline)] text-[48px] font-semibold leading-[1.04] tracking-[-0.045em]"
        >
          Graphics Gains Outrun
          <br />
          The CPU Bump
        </h2>
        <p className="mt-4 max-w-[750px] font-[var(--font-body)] text-[20px] leading-[1.4]">
          The reviewed 16GB M6 model improves on M5, with larger gains over M3.
        </p>
      </header>

      <div className="shrink-0 border-t border-[var(--border)]">
        {metrics.slice(0, 3).map((metric, index) =>
          renderMetric(metric, index),
        )}
      </div>

      <div className="shrink-0 border-t border-[var(--border)]">
        {metrics.slice(3).map((metric, index) =>
          renderMetric(metric, index + 3),
        )}
      </div>
    </section>
  );
}