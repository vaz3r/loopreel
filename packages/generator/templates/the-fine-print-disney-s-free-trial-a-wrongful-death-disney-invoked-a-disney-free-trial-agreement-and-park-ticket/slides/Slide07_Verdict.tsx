import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  void brand;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-4 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-3 flex items-center justify-between border-b border-[var(--border)] pb-3">
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.16em]">
            THE FINE PRINT
          </p>
          <p className="font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
            VERDICT / 07
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Audit Consent Before
          <br />
          Claiming Control
        </h1>

        <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
          Neither outcome validates the theory; no confirmed payout.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <svg
          viewBox="0 0 952 460"
          className="h-full max-h-[460px] w-full"
          role="img"
          aria-label="An editorial diagram placing an audit of consent between terms and a claim."
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M0 58H952 M0 402H952"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="130" cy="230" r="59" />
            <path d="M189 230H310 M298 220L310 230L298 240" />

            <path d="M642 230H763 M751 220L763 230L751 240" />
            <path d="M822 164L888 230L822 296L756 230Z" />

            <path d="M106 214H154 M106 230H154 M106 246H138" />
            <path d="M803 230H841 M829 218L841 230L829 242" />
          </g>

          <circle
            cx="476"
            cy="230"
            r="142"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle
            cx="476"
            cy="230"
            r="130"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
          />

          <path
            d="M334 230H350 M602 230H618 M476 88V104 M476 356V372"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <g fill="var(--accent)">
            <circle cx="310" cy="230" r="5" />
            <circle cx="642" cy="230" r="5" />
            <path d="M130 122V153H133V143H166L158 133L166 122Z" />
            <path d="M822 122V153H825V143H858L850 133L858 122Z" />
          </g>

          <g
            fill="var(--ink)"
            textAnchor="middle"
            className="font-[var(--font-mono)]"
          >
            <text x="130" y="337" fontSize="24" letterSpacing="3">
              TERMS
            </text>
            <text x="822" y="337" fontSize="24" letterSpacing="3">
              CLAIM
            </text>
          </g>

          <g fill="var(--accent)" textAnchor="middle">
            <text
              x="476"
              y="182"
              fontSize="20"
              letterSpacing="4"
              className="font-[var(--font-mono)]"
            >
              THE GUARDRAIL
            </text>
            <text
              x="476"
              y="237"
              fontSize="48"
              fontWeight="700"
              className="font-[var(--font-headline)]"
            >
              Audit
            </text>
            <text
              x="476"
              y="285"
              fontSize="48"
              fontWeight="700"
              className="font-[var(--font-headline)]"
            >
              Consent
            </text>
          </g>
        </svg>
      </div>

      <div className="shrink-0">
        <div className="divide-y divide-[var(--border)] border-t border-[var(--border)] bg-[var(--surface)]">
          {[item0, item1].map((item, index) => (
            <article
              key={index}
              className="grid grid-cols-[300px_1fr] items-baseline gap-6 px-4 py-3"
            >
              <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
                {item?.label ??
                  (index === 0
                    ? 'Arbitration Waiver'
                    : 'Voluntary Dismissal')}
              </h2>
              <p className="font-[var(--font-body)] text-[22px] leading-snug">
                {item?.body ??
                  (index === 0
                    ? 'August 19, 2024: Disney announced its waiver.'
                    : 'February 27, 2026: Piccolo dismissed with prejudice.')}
              </p>
            </article>
          ))}
        </div>

        <aside
          aria-label="Consumer guardrail"
          className="mt-4 flex items-center justify-between gap-7 border-t border-[var(--border)] pt-4"
        >
          <p className="inline-block shrink-0 rotate-[-2deg] border-2 border-[var(--accent)] px-3 py-1 font-[var(--font-mono)] text-[24px] font-bold uppercase text-[var(--accent)]">
            [No confirmed payout]
          </p>
          <p className="max-w-[390px] font-[var(--font-body)] text-[24px] leading-snug">
            Neither outcome validates the theory.
          </p>
        </aside>

        <footer className="mt-5 flex items-center justify-between gap-5 border-t border-[var(--border)] pt-3 font-[var(--font-mono)] text-[20px]">
          <p className="flex items-center gap-3 text-[var(--accent)]">
            <svg
              viewBox="0 0 24 30"
              className="h-[28px] w-[22px] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4 2H20V27L12 21L4 27Z" />
            </svg>
            BOOKMARK THE GUARDRAIL
          </p>
          <p>thefineprint.pub</p>
          <p>07 / {String(totalSlides).padStart(2, '0')}</p>
        </footer>
      </div>
    </section>
  );
}