import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const cards = [
  {
    title: 'Recovery fleet',
    body: 'Expand maritime vessels and equipment for Neutron recovery and transport.',
  },
  {
    title: 'Manufacturing',
    body: 'Increase production of composite structures and engines.',
  },
  {
    title: 'Launch turnaround',
    body: 'Accelerate vehicle delivery, processing, and turnaround after operational debut.',
  },
];

function CapacityIllustration({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      aria-hidden="true"
      className="h-[180px] w-[220px] text-[var(--ink)]"
    >
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {index === 0 && (
          <>
            <path
              d="M20 148H200M32 160H76M96 160H144M164 160H188"
              className="text-[var(--border)]"
            />
            <path
              d="M26 112H194L174 140H53Z"
              className="fill-[var(--surface)]"
            />
            <path d="M39 112V88H84V112M47 88V69H72V88M58 69V52" />
            <path d="M46 98H56M66 98H76M49 79H64" />
            <path d="M102 112V101H176V112" />
            <path
              d="M124 98V49L135 27L146 49V98Z"
              className="fill-[var(--accent)] stroke-[var(--accent)]"
            />
            <path d="M129 98V107M141 98V107" />
            <path
              d="M164 40H188V83M181 76L188 83L195 76"
              strokeDasharray="4 6"
              className="text-[var(--accent)]"
            />
            <path d="M61 125H88M150 125H164" />
            <circle cx="101" cy="125" r="2" fill="currentColor" stroke="none" />
          </>
        )}

        {index === 1 && (
          <>
            <path
              d="M22 151H198M34 151V37H186V151M34 49H186"
              className="text-[var(--border)]"
            />
            <path d="M50 49V62M170 49V62M50 62H170" />
            <path d="M111 62V78M102 78H120" />
            <path
              d="M73 94L138 77L158 108L93 125Z"
              className="fill-[var(--surface)]"
            />
            <ellipse
              cx="83"
              cy="109"
              rx="12"
              ry="19"
              transform="rotate(-31 83 109)"
            />
            <path
              d="M99 87L119 118M113 83L133 114M127 80L147 111"
              className="text-[var(--border)]"
            />
            <path d="M65 130H164M73 130V143M155 130V143" />
            <path
              d="M43 119V106H55V119L62 137H36Z"
              className="fill-[var(--accent)] stroke-[var(--accent)]"
            />
            <path d="M39 143H59" className="text-[var(--accent)]" />
            <path d="M177 78V116M171 110L177 116L183 110" />
          </>
        )}

        {index === 2 && (
          <>
            <path
              d="M26 150H194M49 150V65H75M49 87H75M49 109H75M49 130H75"
              className="text-[var(--border)]"
            />
            <path
              d="M86 132V66L98 39L110 66V132Z"
              className="fill-[var(--surface)]"
            />
            <path d="M86 112L76 131H86M110 112L120 131H110M90 139H106" />
            <path d="M86 78H110M86 103H110" />
            <path
              d="M139 49C166 56 183 80 180 107C178 127 166 142 148 150"
              className="text-[var(--accent)]"
              strokeWidth="3"
            />
            <path
              d="M150 137L147 151L162 153"
              className="text-[var(--accent)]"
              strokeWidth="3"
            />
            <path
              d="M133 32C165 35 190 58 197 87"
              strokeDasharray="4 7"
              className="text-[var(--border)]"
            />
            <circle
              cx="139"
              cy="49"
              r="5"
              className="fill-[var(--accent)] stroke-[var(--accent)]"
            />
            <path
              d="M94 145L98 157L102 145"
              className="text-[var(--accent)]"
            />
          </>
        )}
      </g>
    </svg>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0 pb-9">
        <div
          aria-hidden="true"
          className="mb-6 h-[6px] w-[76px] bg-[var(--accent)]"
        />
        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Neutron&apos;s Loan Targets
          <br />
          Repeat Launches
        </h1>
        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          The proposed financing reaches beyond the rocket itself.
        </p>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col gap-5">
        <div
          aria-hidden="true"
          className="absolute bottom-12 left-[25px] top-12 w-px bg-[var(--border)]"
        />

        {cards.map((card, index) => (
          <article
            key={card.title}
            className="relative grid min-h-0 flex-1 grid-cols-[52px_minmax(0,1fr)] gap-5"
          >
            <div
              aria-hidden="true"
              className="relative z-10 flex items-center justify-center"
            >
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--surface)]">
                <span className="h-[10px] w-[10px] rounded-full bg-[var(--accent)]" />
              </span>
            </div>

            <div className="grid min-h-0 grid-cols-[220px_minmax(0,1fr)] items-center gap-7 border border-[var(--border)] bg-[var(--surface)] px-7 py-5">
              <div className="flex items-center justify-center">
                <CapacityIllustration index={index} />
              </div>

              <div className="min-w-0">
                <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
                  {card.title}
                </h2>
                <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
                  {card.body}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}