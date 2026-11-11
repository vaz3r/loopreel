import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Phase = {
  phase: string;
  label: string;
  detail: string;
};

type TimelineData = {
  headline?: string;
  phases?: Phase[];
};

const defaultPhases: Phase[] = [
  {
    phase: '01',
    label: 'MORNING — RELEASE',
    detail:
      'Bedding returns to storage; the sleeping area becomes available for daytime use. An adaptable room needs somewhere for its previous function to go.',
  },
  {
    phase: '02',
    label: 'AFTERNOON — CONNECT',
    detail:
      'Sliding partitions open adjoining spaces for gathering. The boundary moves instead of requiring another permanently dedicated room.',
  },
  {
    phase: '03',
    label: 'EVENING — ENCLOSE',
    detail:
      'Partitions close and bedding returns. The same floor supports another occupation: domestic capacity measured through time, not merely area.',
  },
];

function RoomPlan({ stage }: { stage: number }) {
  return (
    <svg
      viewBox="0 0 140 112"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full text-[var(--ink)]"
    >
      <rect
        x="12"
        y="12"
        width="116"
        height="88"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.55"
      />

      <path
        d="M24 88H116"
        stroke="var(--border)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />

      {stage === 0 && (
        <>
          <rect
            x="20"
            y="20"
            width="26"
            height="22"
            rx="2"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M25 27H41M25 34H41"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M85 73V37H58M64 31L58 37L64 43"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {stage === 1 && (
        <>
          <path
            d="M70 12V31M70 81V100"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M34 56H106M41 49L34 56L41 63M99 49L106 56L99 63"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}

      {stage === 2 && (
        <>
          <path
            d="M70 12V100"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <rect
            x="83"
            y="32"
            width="31"
            height="49"
            rx="3"
            fill="var(--accent)"
            fillOpacity="0.12"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M88 44H109"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const data = slide as unknown as TimelineData;
  const phases = data.phases?.length ? data.phases : defaultPhases;

  return (
    <section className="flex h-full min-h-0 flex-col gap-9 text-[var(--ink)] font-[var(--font-body)]">
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em]">
            A daily spatial cycle
          </p>
        </div>

        <h1 className="max-w-[760px] font-[var(--font-headline)] text-7xl font-bold leading-[1.02] tracking-tight">
          {data.headline ?? 'One room. A changing day.'}
        </h1>
      </div>

      <ol className="relative flex min-h-0 flex-1 flex-col gap-6">
        <div
          aria-hidden="true"
          className="absolute bottom-12 left-[27px] top-12 w-px bg-[var(--border)]"
        />

        {phases.map((phase, index) => {
          const [time, ...actionParts] = phase.label.split('—');
          const action = actionParts.join('—').trim();

          return (
            <li
              key={phase.phase}
              className="relative grid flex-1 grid-cols-[56px_minmax(0,1fr)] gap-6"
            >
              <div className="relative z-10 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] font-[var(--font-mono)] text-xl font-bold text-[var(--accent)]">
                  {phase.phase}
                </span>
              </div>

              <article className="flex h-full items-center gap-7 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_2px_8px_rgba(0,0,0,0.025)]">
                <div className="min-w-0 flex-1">
                  <p className="mb-3 font-[var(--font-mono)] text-sm uppercase tracking-[0.16em] text-[var(--accent)]">
                    {time.trim()}
                  </p>

                  <h2 className="mb-4 font-[var(--font-headline)] text-4xl font-bold leading-none tracking-tight">
                    {action || phase.label}
                  </h2>

                  <p className="max-w-[540px] text-[21px] leading-[1.5]">
                    {phase.detail}
                  </p>
                </div>

                <div className="w-32 shrink-0">
                  <RoomPlan stage={index % 3} />
                </div>
              </article>
            </li>
          );
        })}
      </ol>

      <div className="flex shrink-0 items-center gap-5 border-t border-[var(--border)] pt-5">
        <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
          Spatial principle
        </span>
        <p className="font-[var(--font-headline)] text-2xl italic">
          Capacity through time, not merely area.
        </p>
      </div>
    </section>
  );
}