import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cpuMetrics = [
    {
      value: '+7%',
      label: 'Single-core CPU',
      context: 'Around 7 percent over M5.',
      endpoint: 105,
    },
    {
      value: '+15%',
      label: 'Multi-core CPU',
      context: '15 percent over M5.',
      endpoint: 201,
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <h2 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Graphics Make
          <br />
          The Strongest Case
        </h2>

        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          The 16GB M6 review unit improves on M5, especially in GPU tests.
        </p>
      </div>

      <div className="mt-8 grid shrink-0 grid-cols-2 gap-6">
        {cpuMetrics.map((metric) => (
          <article
            key={metric.label}
            className="border border-[var(--border)] bg-[var(--surface)] px-7 py-6"
          >
            <h3 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {metric.label}
            </h3>

            <p className="mt-3 font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.06em] tabular-nums">
              {metric.value}
            </p>

            <svg
              viewBox="0 0 400 34"
              className="mt-5 h-[34px] w-full"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M21 17H381"
                stroke="var(--border)"
                strokeWidth="2"
              />
              {[21, 81, 141, 201, 261, 321, 381].map((x) => (
                <path
                  key={x}
                  d={`M${x} 9V25`}
                  stroke="var(--border)"
                  strokeWidth="2"
                />
              ))}
              <path
                d={`M21 17H${metric.endpoint}`}
                stroke="var(--ink)"
                strokeWidth="8"
              />
              <circle
                cx={metric.endpoint}
                cy="17"
                r="7"
                fill="var(--ink)"
              />
            </svg>

            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              {metric.context}
            </p>
          </article>
        ))}
      </div>

      <article className="relative mt-6 shrink-0 border border-[var(--border)] border-t-[5px] border-t-[var(--accent)] bg-[var(--surface)] px-8 py-6">
        <div className="grid grid-cols-[1.6fr_1fr] items-center gap-6">
          <div>
            <h3 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight text-[var(--accent)]">
              GPU
            </h3>

            <p className="mt-4 whitespace-nowrap font-[var(--font-mono)] text-[104px] font-bold leading-none tracking-[-0.065em] text-[var(--accent)] tabular-nums">
              +20–30%
            </p>
          </div>

          <svg
            viewBox="0 0 280 180"
            className="h-[180px] w-full text-[var(--accent)]"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M20 20H260M20 55H260M20 90H260M20 125H260M20 160H260"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M20 20V160M80 20V160M140 20V160M200 20V160M260 20V160"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M48 142L218 32H160M218 32V90"
              stroke="currentColor"
              strokeWidth="12"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M104 150L240 62"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 7"
              opacity="0.5"
            />
            <circle cx="48" cy="142" r="10" fill="currentColor" />
          </svg>
        </div>

        <svg
          viewBox="0 0 880 42"
          className="mt-5 h-[42px] w-full"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M20 21H860"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {[20, 160, 300, 440, 580, 720, 860].map((x) => (
            <path
              key={x}
              d={`M${x} 10V32`}
              stroke="var(--border)"
              strokeWidth="2"
            />
          ))}
          <path
            d="M20 21H580"
            stroke="var(--accent)"
            strokeWidth="10"
          />
          <path
            d="M580 21H860"
            stroke="var(--accent)"
            strokeWidth="10"
            strokeDasharray="12 8"
            opacity="0.55"
          />
          <path
            d="M580 5V37M860 5V37"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="580" cy="21" r="7" fill="var(--accent)" />
        </svg>

        <p className="mt-4 max-w-[760px] font-[var(--font-body)] text-[26px] leading-snug">
          Between 20 and 30 percent over M5, depending on the test.
        </p>
      </article>
    </section>
  );
}