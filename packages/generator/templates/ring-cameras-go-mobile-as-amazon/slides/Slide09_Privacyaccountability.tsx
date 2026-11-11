import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const evidence = [
  {
    title: 'Rover cloud retention',
    body: 'Doorbell-ring, motion-event and Live View videos: cloud storage up to 180 days.',
    glyph: 'cloud',
  },
  {
    title: '2023 FTC investigation',
    body: 'The FTC described hackers accessing 55,000 US customers’ accounts.',
    glyph: 'account',
  },
  {
    title: 'EFF’s encryption assessment',
    body: 'Throw Away the Key Encryption remains well short of end-to-end encryption.',
    glyph: 'encryption',
  },
] as const;

function EvidenceGlyph({
  kind,
}: {
  kind: (typeof evidence)[number]['glyph'];
}) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      className="h-[160px] w-[160px] shrink-0 text-[var(--ink)]"
    >
      <g
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeLinecap="square"
      >
        <path d="M8 32V8h24M128 8h24v24M152 128v24h-24M32 152H8v-24" />
        <path d="M8 80h12M140 80h12M80 8v12M80 140v12" />
      </g>

      {kind === 'cloud' && (
        <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M43 93a24 24 0 0 1-3-48 35 35 0 0 1 66-3 26 26 0 0 1 10 51H43Z"
            stroke="currentColor"
          />
          <path d="M48 111h38M48 124h26" stroke="var(--border)" />
          <circle cx="112" cy="116" r="22" stroke="var(--accent)" />
          <path d="M112 102v14l9 6" stroke="var(--accent)" />
          <path d="M55 68h50M55 80h33" stroke="var(--border)" />
        </g>
      )}

      {kind === 'account' && (
        <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M36 25h66l21 21v86H36V25Z"
            stroke="currentColor"
          />
          <path d="M102 25v21h21" stroke="currentColor" />
          <circle cx="78" cy="66" r="12" stroke="currentColor" />
          <path
            d="M57 103v-8a21 21 0 0 1 42 0v8"
            stroke="currentColor"
          />
          <path d="M53 117h46" stroke="var(--border)" />
          <path d="M23 42H15v92h8" stroke="var(--accent)" />
          <circle
            cx="120"
            cy="112"
            r="20"
            fill="var(--surface)"
            stroke="var(--accent)"
          />
          <path d="M120 100v12l8 5" stroke="var(--accent)" />
        </g>
      )}

      {kind === 'encryption' && (
        <g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 90V40h33M105 40h33v50" stroke="var(--border)" />
          <circle cx="66" cy="48" r="17" stroke="currentColor" />
          <path d="m78 60 25 25h13V72h-12V60H91" stroke="currentColor" />
          <path d="M39 113h23M98 113h23" stroke="currentColor" />
          <rect x="18" y="102" width="21" height="22" stroke="currentColor" />
          <rect x="121" y="102" width="21" height="22" stroke="currentColor" />
          <path d="m77 101-8 24M91 101l-8 24" stroke="var(--accent)" />
        </g>
      )}
    </svg>
  );
}

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-12">
        <div className="mb-8 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-8 max-w-[860px] border-l-[3px] border-[var(--accent)] pl-6 font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-3 border-t-2 border-[var(--ink)]">
        {evidence.map((item) => (
          <article
            key={item.glyph}
            className="relative grid min-h-0 grid-cols-[192px_minmax(0,1fr)] items-center gap-8 border-b border-[var(--border)] bg-[var(--surface)] px-8 py-6"
          >
            <div className="flex h-full items-center justify-start border-r border-[var(--border)] pr-8">
              <EvidenceGlyph kind={item.glyph} />
            </div>

            <div className="min-w-0 py-5">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {item.title}
              </h2>

              <div
                aria-hidden="true"
                className="my-6 h-[3px] w-10 bg-[var(--accent)]"
              />

              <p className="font-[var(--font-body)] text-[28px] leading-normal">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}