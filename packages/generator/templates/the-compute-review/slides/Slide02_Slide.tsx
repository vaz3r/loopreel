import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const cards = [
  {
    title: '01 · Data information',
    body: 'Training-data descriptions, provenance, processing methods, and locations of public and third-party datasets.',
  },
  {
    title: '02 · Code',
    body: 'Complete training and inference source, including processing, filtering, settings, validation, testing, supporting libraries, and architecture.',
  },
  {
    title: '03 · Parameters',
    body: 'Model weights and other configuration settings—not merely access to an endpoint.',
  },
];

function ComponentDiagram({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 180 160"
      fill="none"
      aria-hidden="true"
      className="h-[160px] w-[180px] shrink-0 text-[var(--accent)]"
    >
      <path
        d="M8 24V8h16M156 8h16v16M172 136v16h-16M24 152H8v-16"
        stroke="var(--border)"
        strokeWidth="1.5"
      />

      {index === 0 && (
        <>
          <path
            d="M43 45h38M43 80h38M43 115h38M81 45v70M81 80h37"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
          {[45, 80, 115].map((y) => (
            <g key={y}>
              <rect
                x="22"
                y={y - 11}
                width="23"
                height="22"
                rx="2"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d={`M28 ${y - 3}h11M28 ${y + 3}h7`}
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </g>
          ))}
          <path
            d="M119 48h24l15 15v49h-39V48Z"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M143 48v15h15M128 78h21M128 87h21M128 96h13"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="81" cy="80" r="5" fill="currentColor" />
        </>
      )}

      {index === 1 && (
        <>
          <rect
            x="21"
            y="30"
            width="138"
            height="93"
            rx="4"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path d="M21 51h138" stroke="var(--border)" strokeWidth="2" />
          <circle cx="32" cy="41" r="2" fill="currentColor" />
          <circle cx="41" cy="41" r="2" fill="var(--border)" />
          <circle cx="50" cy="41" r="2" fill="var(--border)" />
          <path
            d="m65 70-18 17 18 17M115 70l18 17-18 17M98 65l-16 44"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M49 123v15h82v-15M90 123v15"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <rect x="85" y="133" width="10" height="10" fill="currentColor" />
        </>
      )}

      {index === 2 && (
        <>
          <rect
            x="22"
            y="23"
            width="136"
            height="114"
            rx="4"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {[49, 80, 111].map((y, row) => (
            <g key={y}>
              <path
                d={`M38 ${y}h104`}
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d={`M38 ${y}h${[35, 75, 51][row]}`}
                stroke="currentColor"
                strokeWidth="2"
              />
              <rect
                x={[68, 108, 84][row]}
                y={y - 7}
                width="10"
                height="14"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="2"
              />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-8 text-[var(--ink)]">
      <div className="shrink-0 pt-2">
        <div
          aria-hidden="true"
          className="mb-6 h-[5px] w-20 bg-[var(--accent)]"
        />

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[66px] font-semibold leading-[1.04] tracking-[-0.045em]">
          Open means more than downloadable
        </h1>

        <p className="mt-6 max-w-[860px] font-[var(--font-body)] text-[25px] leading-[1.4]">
          OSI’s Open Source AI Definition 1.0 requires these components under
          OSI-approved terms or licenses.
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 gap-3 pb-2">
        {cards.map((card, index) => {
          const [number, title] = card.title.split(' · ');

          return (
            <article
              key={card.title}
              className="grid min-h-0 grid-cols-[180px_minmax(0,1fr)] items-center gap-7 border border-[var(--border)] bg-[var(--surface)] px-6 py-5"
            >
              <ComponentDiagram index={index} />

              <div className="min-w-0 border-l border-[var(--border)] pl-7">
                <h2 className="flex items-baseline gap-3">
                  <span className="shrink-0 font-[var(--font-mono)] text-[23px] font-normal tracking-[-0.03em] text-[var(--accent)]">
                    {number} ·
                  </span>
                  <span className="font-[var(--font-headline)] text-[33px] font-semibold leading-[1.15] tracking-[-0.025em]">
                    {title}
                  </span>
                </h2>

                <p className="mt-3 font-[var(--font-body)] text-[23px] leading-[1.4]">
                  {card.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}