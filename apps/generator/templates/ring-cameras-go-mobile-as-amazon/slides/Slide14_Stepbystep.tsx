import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Step = {
  number: string;
  title: string;
  body: string;
};

const defaultSteps: Step[] = [
  {
    number: '1',
    title: 'Map the interior',
    body: 'The customer carries the drone through indoor spaces or lets the Rover explore autonomously. AI Pilot uses that tour to build a digital floor plan.',
  },
  {
    number: '2',
    title: 'Establish patrol points',
    body: 'Amazon says AI Pilot can identify rooms and suggest checkpoints near side doors, windows or sensitive business locations such as a cash register.',
  },
  {
    number: '3',
    title: 'Connect alerts to movement',
    body: 'Both devices can respond to connected Ring-device alerts by following configured routes or patrol points. The drone’s set-route and scheduling capability requires an Amazon Ring Protect subscription.',
  },
];

function ProcessGlyph({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 80 64"
      fill="none"
      aria-hidden="true"
      className="h-16 w-20 shrink-0 text-[var(--accent)]"
    >
      <path
        d="M8 8h64v48H8V8Zm28 0v18m0 12v18M8 32h16m28 0h20"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.35"
      />
      {index === 0 && (
        <>
          <path
            d="M19 44V19h35v25H43"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle cx="19" cy="44" r="4" fill="currentColor" />
          <path
            d="m47 39-5 5 5 5"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}
      {index === 1 && (
        <>
          <path
            d="m20 21 36 1-7 23"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
          <circle cx="20" cy="21" r="4" fill="currentColor" />
          <circle cx="56" cy="22" r="4" fill="currentColor" />
          <circle cx="49" cy="45" r="4" fill="currentColor" />
        </>
      )}
      {index === 2 && (
        <>
          <circle
            cx="20"
            cy="43"
            r="8"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="20" cy="43" r="3" fill="currentColor" />
          <path
            d="M29 43h23V20m-6 6 6-6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m64 14-5 8h6l-5 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide14({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline?: string;
    steps?: Step[];
  };

  const steps = content.steps?.length ? content.steps : defaultSteps;

  return (
    <section
      aria-label={
        content.headline || 'From floor plan to automated response'
      }
      className="flex h-full min-h-0 flex-col gap-9 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="text-sm font-[var(--font-mono)] uppercase tracking-[0.22em] text-[var(--accent)]">
            Inside the workflow
          </span>
        </div>

        <h1 className="max-w-[850px] text-6xl font-bold leading-[1.04] tracking-tight font-[var(--font-headline)]">
          {content.headline || 'From floor plan to automated response'}
        </h1>

        <div
          aria-hidden="true"
          className="mt-7 flex items-center gap-4 text-xs font-[var(--font-mono)] uppercase tracking-[0.16em] text-[var(--accent)]"
        >
          <span>Map</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span>Configure</span>
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span>Respond</span>
        </div>
      </div>

      <ol className="m-0 flex flex-1 list-none flex-col gap-5 p-0">
        {steps.map((step, index) => (
          <li
            key={`${step.number}-${step.title}`}
            className={`relative flex flex-col justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm ${
              index === steps.length - 1 ? 'flex-[1.2]' : 'flex-1'
            }`}
          >
            <div className="flex items-start gap-6">
              <div className="flex w-16 shrink-0 flex-col items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-xl border border-[var(--border)] text-4xl font-bold font-[var(--font-mono)] text-[var(--accent)]">
                  {step.number}
                </span>
                <span
                  aria-hidden="true"
                  className="h-12 w-px bg-[var(--border)]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <h2 className="text-[30px] font-bold leading-[1.15] tracking-tight font-[var(--font-headline)]">
                    {step.title}
                  </h2>
                  <ProcessGlyph index={index} />
                </div>

                <p className="m-0 max-w-[690px] text-[22px] leading-[1.48]">
                  {step.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}