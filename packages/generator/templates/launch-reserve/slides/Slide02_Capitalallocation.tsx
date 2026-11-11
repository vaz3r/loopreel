import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const commitments = [
    {
      entity: 'Stoke Space',
      body: 'Second launch pad at Cape Canaveral Space Force Station, Florida.',
      diagram: 'pad',
    },
    {
      entity: 'Rocket Lab',
      body: 'Increase Neutron’s flight rate through production, recovery, and processing upgrades.',
      diagram: 'processing',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          TWO CONDITIONAL COMMITMENTS
        </p>

        <h2 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.05] tracking-[-0.035em]">
          Equal Loans, Different Capacity Targets
        </h2>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-[1.35]">
          OSC backs a second launch pad and efforts to increase Neutron’s
          flight rate.
        </p>
      </header>

      <div className="relative mt-9 grid min-h-0 flex-1 grid-cols-2 gap-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--border)]"
        />

        {commitments.map((commitment) => (
          <article
            key={commitment.entity}
            className="relative flex min-h-0 min-w-0 flex-col border border-dashed border-[var(--border)] px-7 py-6"
          >
            <div className="flex shrink-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 border border-[var(--accent)]"
              />
              <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.12em] text-[var(--accent)]">
                conditional
              </p>
            </div>

            <h3 className="mt-4 font-[var(--font-headline)] text-[36px] font-semibold leading-[44px] tracking-[-0.025em]">
              {commitment.entity}
            </h3>

            <p className="mt-5 shrink-0 text-[var(--accent)]">
              <span className="block font-[var(--font-mono)] text-[96px] font-bold leading-none tracking-[-0.065em]">
                $150
              </span>
              {' '}
              <span className="mt-1 block font-[var(--font-headline)] text-[34px] font-semibold leading-[40px] tracking-[-0.02em]">
                million
              </span>
            </p>

            <div className="mt-5 border-t border-[var(--border)] pt-5">
              <p className="font-[var(--font-body)] text-[26px] leading-[1.3]">
                {commitment.body}
              </p>
            </div>

            <div className="mt-auto shrink-0 pt-5">
              {commitment.diagram === 'pad' ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 210"
                  className="h-[210px] w-full"
                  fill="none"
                >
                  <g stroke="var(--border)" strokeWidth="1">
                    <path d="M16 178H384M16 194H384" />
                    <path d="M40 16V202M360 16V202" strokeDasharray="4 7" />
                    <path d="M200 12V198" strokeDasharray="4 7" />
                    <path d="M16 52H384" strokeDasharray="2 8" />
                    <path d="M20 18H48M34 4V32M352 18H380M366 4V32" />
                  </g>

                  <path
                    d="M68 145H332V162H68Z"
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                  />

                  <g
                    stroke="var(--ink)"
                    strokeWidth="2"
                    strokeLinejoin="miter"
                  >
                    <path d="M84 162V193H113V162M287 162V193H316V162" />
                    <path d="M113 193L145 162M287 193L255 162" />
                    <path d="M112 144V39H141V144" />
                    <path d="M112 40L141 66L112 92L141 118L112 144" />
                    <path d="M141 65H180M141 91H174" />
                  </g>

                  <g stroke="var(--accent)" strokeWidth="2.5">
                    <path
                      d="M189 127V65L200 39L211 65V127Z"
                      fill="var(--surface)"
                    />
                    <path d="M189 107L177 127H189M211 107L223 127H211" />
                    <path d="M193 133V140M200 133V143M207 133V140" />
                    <path d="M187 24H213M200 11V24" />
                  </g>

                  <path
                    d="M242 118H304V87H338"
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                  <circle cx="242" cy="118" r="4" fill="var(--accent)" />
                  <circle
                    cx="338"
                    cy="87"
                    r="4"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 400 210"
                  className="h-[210px] w-full"
                  fill="none"
                >
                  <g stroke="var(--border)" strokeWidth="1">
                    <path d="M16 105H384M200 8V202" strokeDasharray="4 7" />
                    <path d="M16 194H384" />
                    <circle cx="200" cy="105" r="92" strokeDasharray="3 7" />
                    <circle cx="200" cy="105" r="52" />
                    <path d="M20 18H48M34 4V32M352 18H380M366 4V32" />
                  </g>

                  <g stroke="var(--accent)" strokeWidth="3">
                    <path d="M147 52A75 75 0 0 1 274 95" />
                    <path d="M274 115A75 75 0 0 1 157 166" />
                    <path d="M142 153A75 75 0 0 1 133 71" />
                  </g>

                  <g fill="var(--accent)">
                    <path d="M265 84L275 101L282 82Z" />
                    <path d="M170 160L151 162L163 177Z" />
                    <path d="M126 85L137 66L118 72Z" />
                  </g>

                  <path
                    d="M181 88L200 77L219 88V121L200 132L181 121Z"
                    fill="var(--surface)"
                    stroke="var(--ink)"
                    strokeWidth="2"
                  />
                  <path
                    d="M181 88L200 100L219 88M200 100V132"
                    stroke="var(--ink)"
                    strokeWidth="2"
                  />

                  <g stroke="var(--border)" strokeWidth="1.5">
                    <path d="M112 105H66V58H34" />
                    <path d="M288 105H334V152H366" />
                  </g>

                  <g
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  >
                    <rect x="27" y="51" width="14" height="14" />
                    <rect x="359" y="145" width="14" height="14" />
                  </g>
                </svg>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}