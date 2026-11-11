import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="mb-7 h-2 w-24 shrink-0 bg-[var(--accent)]" />

      <h1 className="font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
        Your Current Mac
        <br />
        Changes The Verdict
      </h1>

      <p className="mt-6 max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
        The review draws a sharper distinction between generations than between
        annual updates.
      </p>

      <div className="mt-10 grid min-h-0 flex-1 grid-rows-2 gap-6">
        <article className="grid grid-cols-[184px_1fr] items-center gap-8 border border-[var(--border)] border-l-[6px] border-l-[var(--accent)] bg-[var(--surface)] px-8 py-6">
          <svg
            viewBox="0 0 184 220"
            className="h-[220px] w-[184px] text-[var(--accent)]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 194H172M12 146H172M12 98H172M12 50H172"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M34 194V167M82 194V119M130 194V71"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="4 6"
            />

            <rect
              x="12"
              y="123"
              width="44"
              height="44"
              rx="5"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <rect
              x="24"
              y="135"
              width="20"
              height="20"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M23 116V123M34 116V123M45 116V123M23 167V174M34 167V174M45 167V174M5 134H12M5 145H12M5 156H12M56 134H63M56 145H63M56 156H63"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            <rect
              x="60"
              y="75"
              width="44"
              height="44"
              rx="5"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <rect
              x="72"
              y="87"
              width="20"
              height="20"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M71 68V75M82 68V75M93 68V75M71 119V126M82 119V126M93 119V126M53 86H60M53 97H60M53 108H60M104 86H111M104 97H111M104 108H111"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            <rect
              x="108"
              y="27"
              width="44"
              height="44"
              rx="5"
              fill="currentColor"
            />
            <path
              d="M119 20V27M130 20V27M141 20V27M119 71V78M130 71V78M141 71V78M101 38H108M101 49H108M101 60H108M152 38H159M152 49H159M152 60H159"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M120 53L130 43L140 53M130 43V59"
              stroke="var(--surface)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M82 164L157 89M137 89H157V109"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.025em]">
              Consider upgrading:
              <br />
              <span className="text-[var(--accent)]">M1 or M2</span>
            </h2>
            <p className="mt-5 max-w-[590px] font-[var(--font-body)] text-[28px] leading-snug">
              Air and Pro owners should notice sizable day-to-day improvements.
            </p>
          </div>
        </article>

        <article className="grid grid-cols-[184px_1fr] items-center gap-8 border border-[var(--border)] border-l-[6px] border-l-[var(--ink)] px-8 py-6">
          <svg
            viewBox="0 0 184 220"
            className="h-[220px] w-[184px] text-[var(--ink)]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 194H172M12 146H172M12 98H172M12 50H172"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M44 194V120M140 194V120"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="4 6"
            />

            <rect
              x="20"
              y="72"
              width="48"
              height="48"
              rx="5"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="32"
              y="84"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M32 65V72M44 65V72M56 65V72M32 120V127M44 120V127M56 120V127M13 84H20M13 96H20M13 108H20M68 84H75M68 96H75M68 108H75"
              stroke="currentColor"
              strokeWidth="2"
            />

            <rect
              x="116"
              y="72"
              width="48"
              height="48"
              rx="5"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="128"
              y="84"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M128 65V72M140 65V72M152 65V72M128 120V127M140 120V127M152 120V127M109 84H116M109 96H116M109 108H116M164 84H171M164 96H171M164 108H171"
              stroke="currentColor)"
              strokeWidth="2"
            />

            <path
              d="M84 91H100M84 101H100"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M32 160H152"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="32" cy="160" r="5" fill="currentColor" />
            <circle cx="152" cy="160" r="5" fill="currentColor" />
          </svg>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.025em]">
              Consider holding:
              <br />
              M4 or M5
            </h2>
            <p className="mt-5 max-w-[590px] font-[var(--font-body)] text-[28px] leading-snug">
              The reviewer expects faster performance, but likely nothing
              staggering.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}