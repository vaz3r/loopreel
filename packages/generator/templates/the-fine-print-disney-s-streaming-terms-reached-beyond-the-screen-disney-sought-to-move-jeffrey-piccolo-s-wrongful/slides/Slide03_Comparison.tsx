import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between text-[var(--ink)]">
      <div className="flex h-full min-h-0 w-full flex-row gap-8">
        <div className="flex h-full w-[420px] shrink-0 flex-col justify-between gap-10">
          <header className="shrink-0">
            <div className="mb-8 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 bg-[var(--accent)]"
              />
              <p className="font-[var(--font-headline)] text-[22px] font-bold leading-tight tracking-[0.08em]">
                THE CRITICAL DISTINCTION
              </p>
            </div>

            <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
              Arbitration
              <br />
              Is Not
              <br />
              Automatic
              <br />
              <span className="text-[var(--accent)]">Immunity</span>
            </h1>

            <div
              aria-hidden="true"
              className="mb-6 mt-8 h-[3px] w-16 bg-[var(--accent)]"
            />

            <p className="line-clamp-2 font-[var(--font-body)] text-[24px] leading-snug">
              Disney sought arbitration and a stay, not automatic immunity.
            </p>
          </header>

          <aside
            aria-label="Court and arbitration compared"
            className="shrink-0 border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-7"
          >
            <div>
              <h2 className="mb-3 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item0?.label ?? 'Court'}
              </h2>
              <p className="line-clamp-3 font-[var(--font-body)] text-[23px] leading-snug">
                {item0?.body ?? 'Adjudication before a judge or jury.'}
              </p>
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-6">
              <div className="mb-3 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 bg-[var(--accent)]"
                />
                <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                  {item1?.label ?? 'Arbitration'}
                </h2>
              </div>
              <p className="line-clamp-3 font-[var(--font-body)] text-[23px] leading-snug">
                {item1?.body ??
                  'A neutral arbitrator could still award individual damages.'}
              </p>
            </div>
          </aside>
        </div>

        <div className="relative min-h-0 flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 952 460"
            preserveAspectRatio="none"
            className="block h-full w-full"
            role="img"
            aria-label="A case branches into court and arbitration: different forums, not automatic immunity."
          >
            <svg
              x="0"
              y="0"
              width="952"
              height="460"
              viewBox="0 0 500 1028"
              preserveAspectRatio="none"
            >
              {/* Architectural registration lines. */}
              <g
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              >
                <path d="M1 0V1028 M28 30H500 M28 998H500" />
                <path d="M40 46V982" strokeDasharray="3 13" />
                <path d="M72 284H478 M72 744H478" />
                <path d="M258 46V982" strokeDasharray="3 13" />
              </g>

              {/* Case-file node. */}
              <rect
                x="166"
                y="66"
                width="184"
                height="184"
                rx="2"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <g
                fill="none"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinejoin="round"
              >
                <path d="M217 103H273L300 130V213H217Z" />
                <path d="M273 103V130H300" />
                <path d="M233 151H283 M233 169H283 M233 187H265" />
              </g>
              <path
                d="M166 66H224V74H166Z"
                fill="var(--accent)"
              />

              {/* Shared origin, divergent procedural routes. */}
              <g fill="none" strokeWidth="3">
                <path
                  d="M258 250V330H151V431"
                  stroke="var(--ink)"
                />
                <path
                  d="M258 330H379V431"
                  stroke="var(--accent)"
                />
              </g>
              <rect
                x="251"
                y="323"
                width="14"
                height="14"
                fill="var(--ink)"
                transform="rotate(45 258 330)"
              />
              <path d="M143 419L151 431L159 419" fill="var(--ink)" />
              <path
                d="M371 419L379 431L387 419"
                fill="var(--accent)"
              />

              {/* Court node. */}
              <rect
                x="62"
                y="445"
                width="178"
                height="236"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d="M62 445H240"
                stroke="var(--ink)"
                strokeWidth="4"
              />
              <g
                fill="none"
                stroke="var(--ink)"
                strokeWidth="3"
                strokeLinejoin="miter"
              >
                <path d="M99 520L151 485L203 520Z" />
                <path d="M100 532H202 M100 596H202" />
                <path d="M112 540V586 M138 540V586 M164 540V586 M190 540V586" />
                <path d="M94 606H208" />
              </g>
              <text
                x="151"
                y="650"
                textAnchor="middle"
                fill="var(--ink)"
                className="font-[var(--font-headline)] text-[26px] font-semibold"
              >
                {item0?.label ?? 'Court'}
              </text>

              {/* Arbitration node: a neutral decision-maker. */}
              <rect
                x="290"
                y="445"
                width="178"
                height="236"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d="M290 445H468"
                stroke="var(--accent)"
                strokeWidth="4"
              />
              <g
                fill="none"
                stroke="var(--ink)"
                strokeWidth="3"
              >
                <circle cx="379" cy="516" r="23" />
                <path d="M344 573V566C344 550 359 541 379 541C399 541 414 550 414 566V573" />
                <path d="M325 584H433 M337 584V606 M421 584V606" />
              </g>
              <path
                d="M373 560H385V572H373Z"
                fill="var(--accent)"
              />
              <text
                x="379"
                y="650"
                textAnchor="middle"
                fill="var(--ink)"
                className="font-[var(--font-headline)] text-[25px] font-semibold"
              >
                {item1?.label ?? 'Arbitration'}
              </text>

              {/* Open-ended conduits: neither route erases the case. */}
              <g fill="none" strokeWidth="3">
                <path d="M151 681V772" stroke="var(--ink)" />
                <path d="M379 681V772" stroke="var(--accent)" />
              </g>
              <path d="M143 760L151 772L159 760" fill="var(--ink)" />
              <path
                d="M371 760L379 772L387 760"
                fill="var(--accent)"
              />

              {/* Monumental “not equal” seal. */}
              <circle
                cx="265"
                cy="885"
                r="86"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <g
                fill="none"
                stroke="var(--ink)"
                strokeWidth="11"
                strokeLinecap="square"
              >
                <path d="M226 868H304 M226 902H304" />
              </g>
              <path
                d="M291 836L239 934"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="11"
              />

              {/* Accent flags and terminal registration marks. */}
              <g fill="var(--accent)">
                <path d="M421 304H468V327H436L421 342Z" />
                <rect x="62" y="988" width="56" height="10" />
              </g>
              <g
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              >
                <path d="M62 816V798H80 M450 798H468V816" />
                <path d="M450 970H468V952 M62 952V970H80" />
              </g>
            </svg>
          </svg>
        </div>
      </div>
    </section>
  );
}