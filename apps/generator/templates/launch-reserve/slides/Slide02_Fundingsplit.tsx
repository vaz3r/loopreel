import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = [
    {
      title: 'Stoke Space',
      value: '$150 million',
      body: 'October 26 commitment supports its second launch pad at Cape Canaveral.',
    },
    {
      title: 'Rocket Lab',
      value: '$150 million',
      body: 'Tuesday announcement targets a higher flight rate for Neutron.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <h1 className="max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Two Competitors,
          <br />
          Two Conditional Loans
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          The Office of Strategic Capital targets launch infrastructure and
          flight rates.
        </p>
      </header>

      <div className="mt-9 grid min-h-0 flex-1 grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="flex min-w-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-8 py-6"
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 bg-[var(--accent)]"
              />
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {card.title}
              </h2>
            </div>

            <p
              aria-label={card.value}
              className="mt-7 text-[var(--accent)]"
            >
              <span
                aria-hidden="true"
                className="block font-[var(--font-mono)] text-[88px] font-bold leading-none tracking-[-0.065em]"
              >
                $150
              </span>
              <span
                aria-hidden="true"
                className="mt-2 block font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.02em]"
              >
                million
              </span>
            </p>

            <div className="my-7 flex h-[204px] shrink-0 items-center border-y border-[var(--border)]">
              {index === 0 ? (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 396 190"
                  className="h-[190px] w-full text-[var(--ink)]"
                  fill="none"
                >
                  {/* Launch complex: existing and highlighted second pad. */}
                  <g
                    stroke="var(--border)"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  >
                    <path d="M12 36H384M12 154H384" />
                    <path d="M44 18V172M352 18V172" />
                    <path d="M20 95H376" strokeDasharray="3 9" />
                    <path d="M198 18V172" strokeDasharray="3 9" />
                  </g>

                  <g stroke="currentColor" strokeWidth="2">
                    <path d="M58 60H144V130H58Z" />
                    <path d="M70 72H132V118H70Z" />
                    <circle cx="101" cy="95" r="17" />
                    <path d="M101 78V112M84 95H118" />
                    <path d="M87 130V153H284V135" />
                    <path d="M99 130V141H272V135" />
                    <path d="M144 86H178V104H144" />
                  </g>

                  <path
                    d="M222 46H334V144H222Z"
                    fill="var(--accent)"
                    fillOpacity="0.07"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />

                  <g stroke="var(--accent)" strokeWidth="2.5">
                    <path d="M238 62H318V128H238Z" />
                    <circle cx="278" cy="95" r="23" />
                    <circle cx="278" cy="95" r="8" />
                    <path d="M278 62V79M278 111V128" />
                    <path d="M238 95H262M294 95H318" />
                  </g>

                  <g stroke="currentColor" strokeWidth="1.5">
                    <path d="M238 25H318M238 20V30M318 20V30" />
                    <path d="M367 62V128M362 62H372M362 128H372" />
                  </g>
                  <circle cx="278" cy="95" r="4" fill="var(--accent)" />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 396 190"
                  className="h-[190px] w-full text-[var(--ink)]"
                  fill="none"
                >
                  {/* Repeated ascent paths communicate flight cadence. */}
                  <g stroke="var(--border)" strokeWidth="1.5">
                    <path d="M20 154H376M20 116H376M20 78H376M20 40H376" />
                    <path d="M56 20V170M150 20V170M244 20V170M338 20V170" />
                  </g>

                  <g
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="5 7"
                    opacity="0.45"
                  >
                    <path d="M56 154C56 104 83 59 126 29" />
                    <path d="M150 154C150 104 177 59 220 29" />
                  </g>

                  <path
                    d="M244 154C244 112 263 76 291 47"
                    stroke="var(--accent)"
                    strokeWidth="3"
                  />

                  <g
                    transform="translate(301 36) rotate(43)"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M0-24C-8-15-10-5-10 10V17H10V10C10-5 8-15 0-24Z"
                      fill="var(--surface)"
                    />
                    <path d="M-10 3L-17 16V23L-10 17M10 3L17 16V23L10 17" />
                    <path d="M-4 22L0 32L4 22" />
                    <path d="M-8-7H8" />
                  </g>

                  <g stroke="currentColor" strokeWidth="2">
                    <path d="M40 161H72M134 161H166M228 161H260" />
                    <path d="M56 154V168M150 154V168M244 154V168" />
                  </g>

                  <circle cx="56" cy="154" r="4" fill="currentColor" />
                  <circle cx="150" cy="154" r="4" fill="currentColor" />
                  <circle cx="244" cy="154" r="5" fill="var(--accent)" />

                  <path
                    d="M320 111H365M356 102L365 111L356 120"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                  />
                </svg>
              )}
            </div>

            <p className="font-[var(--font-body)] text-[28px] leading-snug tracking-[-0.015em]">
              {card.body}
            </p>

            <div aria-hidden="true" className="mt-auto pt-6">
              <div className="h-[3px] w-14 bg-[var(--accent)]" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}