import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = [
    {
      title: 'M6 MacBook Air',
      body: 'Discussed conditionally, not as a confirmed release.',
    },
    {
      title: 'M6 chip family',
      body: 'The absence of Pro, Max, or Ultra configurations is presented as rumor.',
    },
    {
      title: 'OLED touchscreen timing',
      body: 'The reviewer speculates a wait of at least two years; Apple has not committed.',
    },
    {
      title: 'Component constraints',
      body: 'The reviewer cites ongoing RAM and storage shortages as reasons normal progression is uncertain.',
    },
  ];

  return (
    <section
      aria-labelledby="slide09-headline"
      className="flex h-[1028px] w-[952px] flex-col text-[var(--ink)]"
    >
      <header className="relative h-[260px] shrink-0">
        <div className="mb-6 h-[5px] w-16 bg-[var(--accent)]" />

        <h1
          id="slide09-headline"
          className="max-w-[760px] font-[var(--font-headline)] text-[48px] font-semibold leading-[1.05] tracking-[-0.045em]"
        >
          Don’t Buy On An
          <br />
          Unconfirmed Roadmap
        </h1>

        <p className="mt-5 max-w-[730px] font-[var(--font-body)] text-[21px] leading-[1.4] tracking-[-0.015em]">
          The review’s future-facing claims are conditional, rumored, or
          explicitly speculative—not Apple commitments.
        </p>

        <svg
          aria-hidden="true"
          viewBox="0 0 132 132"
          fill="none"
          className="absolute right-0 top-4 h-[132px] w-[132px]"
        >
          <path
            d="M15 110V22H112"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M16 96H46V70H77"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M77 70H94V42H118"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="5 7"
          />
          <circle cx="46" cy="96" r="5" fill="var(--ink)" />
          <circle
            cx="118"
            cy="42"
            r="9"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M86 100L103 117M103 100L86 117"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
        </svg>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-4 gap-4">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="grid min-h-0 grid-cols-[64px_minmax(0,1fr)_154px] items-center gap-6 border border-[var(--border)] bg-[var(--surface)] px-6 py-5"
          >
            <div className="flex h-16 w-16 items-center justify-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                fill="none"
                className="h-16 w-16 text-[var(--ink)]"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                {index === 0 && (
                  <>
                    <path d="M12 16H52V43H12Z" />
                    <path d="M7 49H57L52 43H12L7 49Z" />
                    <path d="M25 46H39" stroke="var(--accent)" />
                    <path
                      d="M19 23H44"
                      stroke="var(--border)"
                      strokeDasharray="3 4"
                    />
                  </>
                )}

                {index === 1 && (
                  <>
                    <rect x="19" y="19" width="26" height="26" />
                    <rect
                      x="26"
                      y="26"
                      width="12"
                      height="12"
                      stroke="var(--accent)"
                    />
                    <path d="M25 11V19M32 11V19M39 11V19M25 45V53M32 45V53M39 45V53M11 25H19M11 32H19M11 39H19M45 25H53M45 32H53M45 39H53" />
                  </>
                )}

                {index === 2 && (
                  <>
                    <path d="M9 14H55V44H9Z" />
                    <path d="M24 51H40M32 44V51" />
                    <circle
                      cx="39"
                      cy="28"
                      r="8"
                      stroke="var(--accent)"
                      strokeDasharray="3 3"
                    />
                    <path d="M39 24V28L43 31" stroke="var(--accent)" />
                  </>
                )}

                {index === 3 && (
                  <>
                    <path d="M10 17H54V31H10Z" />
                    <path d="M15 31V36M23 31V36M31 31V36M39 31V36M47 31V36" />
                    <path d="M17 23H25M31 23H39" />
                    <path
                      d="M10 44H29M37 44H54"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                    />
                    <path d="M30 39L27 49M38 39L35 49" stroke="var(--accent)" />
                  </>
                )}
              </svg>
            </div>

            <div className="min-w-0">
              <h2 className="font-[var(--font-headline)] text-[27px] font-semibold leading-[1.15] tracking-[-0.035em]">
                {card.title}
              </h2>
              <p className="mt-3 max-w-[545px] font-[var(--font-body)] text-lg leading-snug">
                {card.body}
              </p>
            </div>

            <div className="flex h-[108px] items-center border-l border-[var(--border)] pl-5">
              <svg
                aria-hidden="true"
                viewBox="0 0 132 108"
                fill="none"
                className="h-[108px] w-[132px]"
              >
                <path
                  d="M4 90H128M4 18H128"
                  stroke="var(--border)"
                  strokeWidth="1"
                />

                {index === 0 && (
                  <>
                    <path
                      d="M8 66H47"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M47 66H78V42H112"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="4 5"
                    />
                    <circle cx="8" cy="66" r="4" fill="var(--ink)" />
                    <circle
                      cx="118"
                      cy="42"
                      r="6"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  </>
                )}

                {index === 1 && (
                  <>
                    <path
                      d="M8 54H44"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M44 54H116M44 54V30H116M44 54V78H116"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="4 5"
                    />
                    <circle cx="8" cy="54" r="4" fill="var(--ink)" />
                    {[30, 54, 78].map((y) => (
                      <circle
                        key={y}
                        cx="120"
                        cy={y}
                        r="4"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                      />
                    ))}
                  </>
                )}

                {index === 2 && (
                  <>
                    <path
                      d="M8 58H39"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M39 58H122"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="4 6"
                    />
                    <path
                      d="M64 43V73M91 43V73"
                      stroke="var(--border)"
                      strokeWidth="1.5"
                    />
                    <circle cx="8" cy="58" r="4" fill="var(--ink)" />
                    <path
                      d="M112 48L122 58L112 68"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  </>
                )}

                {index === 3 && (
                  <>
                    <path
                      d="M8 54H46M87 54H122"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M46 54H87"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeDasharray="3 5"
                    />
                    <path
                      d="M63 35L53 73M79 35L69 73"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                    />
                    <circle cx="8" cy="54" r="4" fill="var(--ink)" />
                    <circle
                      cx="122"
                      cy="54"
                      r="4"
                      stroke="var(--ink)"
                      strokeWidth="1.5"
                    />
                  </>
                )}
              </svg>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}