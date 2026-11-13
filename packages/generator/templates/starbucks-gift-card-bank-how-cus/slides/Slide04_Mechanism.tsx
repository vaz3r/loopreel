import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-[var(--ink)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];

  const stages = [
    { item: item0, index: 0 },
    { item: item1, index: 1 },
    { item: item2, index: 2 },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between font-[var(--font-body)]">
      <header className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 bg-[var(--ink)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-6 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="my-7 border-t border-[var(--border)]"
        />

        {slide.subheadline && (
          <p className="max-w-[780px] text-[28px] leading-snug text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        )}
      </header>

      <div className="relative my-6 flex min-h-0 flex-1 flex-col justify-center">
        <div className="relative h-[480px] w-full shrink-0">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 952 480"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 h-full w-full text-[var(--ink)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {/* 01 — Continuous milestone spine. */}
            <path
              d="M12 8V472"
              stroke="var(--border)"
              vectorEffect="non-scaling-stroke"
            />

            {/* 02–04 — The only accent fills. */}
            <rect
              x="6"
              y="18"
              width="12"
              height="12"
              fill="var(--accent)"
              stroke="none"
            />
            <rect
              x="6"
              y="178"
              width="12"
              height="12"
              fill="var(--accent)"
              stroke="none"
            />
            <rect
              x="6"
              y="338"
              width="12"
              height="12"
              fill="var(--accent)"
              stroke="none"
            />

            {/* 05 — Receipt housing, open at its serrated edge. */}
            <path
              d="M732 144V20H900V144"
              fill="var(--surface)"
              strokeOpacity="0.75"
            />

            {/* 06–11 — Six physical receipt teeth, not text marks. */}
            <path d="M732 144L746 157L760 144" strokeOpacity="0.75" />
            <path d="M760 144L774 157L788 144" strokeOpacity="0.75" />
            <path d="M788 144L802 157L816 144" strokeOpacity="0.75" />
            <path d="M816 144L830 157L844 144" strokeOpacity="0.75" />
            <path d="M844 144L858 157L872 144" strokeOpacity="0.75" />
            <path d="M872 144L886 157L900 144" strokeOpacity="0.75" />

            {/* 12–13 — Feed rollers. */}
            <rect
              x="714"
              y="48"
              width="204"
              height="21"
              rx="2"
              fill="var(--surface)"
              strokeOpacity="0.65"
            />
            <rect
              x="714"
              y="102"
              width="204"
              height="21"
              rx="2"
              fill="var(--surface)"
              strokeOpacity="0.65"
            />

            {/* 14 — One axle connects all three instrument views. */}
            <path
              d="M816 10V464"
              stroke="var(--border)"
              vectorEffect="non-scaling-stroke"
            />

            {/* 15–16 — Bearing rings. */}
            <circle
              cx="816"
              cy="58.5"
              r="7"
              fill="var(--surface)"
              strokeOpacity="0.8"
            />
            <circle
              cx="816"
              cy="112.5"
              r="7"
              fill="var(--surface)"
              strokeOpacity="0.8"
            />

            {/* 17 — Stored-value perimeter remains completely intact. */}
            <rect
              x="690"
              y="183"
              width="236"
              height="133"
              rx="2"
              fill="var(--surface)"
              strokeOpacity="0.85"
            />

            {/* 18 — Magnetic stripe: a physical component. */}
            <rect
              x="691"
              y="204"
              width="234"
              height="20"
              fill="var(--border)"
              stroke="none"
            />

            {/* 19 — Recognition dial; deliberately unnumbered. */}
            <circle
              cx="816"
              cy="254"
              r="47"
              fill="var(--surface)"
              strokeOpacity="0.85"
            />

            {/* 20–23 — Four radial calibration ticks. */}
            <path d="M816 207V215" strokeOpacity="0.75" />
            <path d="M863 254H855" strokeOpacity="0.75" />
            <path d="M816 301V293" strokeOpacity="0.75" />
            <path d="M769 254H777" strokeOpacity="0.75" />

            {/* 24 — Recognition changes; the card boundary does not. */}
            <path
              d="M806 265L843 228"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="square"
            />

            {/* 25 — Remittance document, connected by the same axle. */}
            <path
              d="M746 345H859L894 380V458H746Z"
              fill="var(--surface)"
              strokeOpacity="0.85"
            />

            {/* 26 — Folded document corner. */}
            <path
              d="M859 345V380H894"
              strokeOpacity="0.85"
            />

            {/* 27 — Circular remittance seal. */}
            <circle
              cx="816"
              cy="417"
              r="23"
              strokeOpacity="0.75"
            />
          </svg>

          <div className="relative grid h-full grid-rows-3">
            {stages.map(({ item, index }) => (
              <article
                key={index}
                className="min-h-0 pl-[44px] pr-[316px] pt-[8px]"
              >
                <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.035em]">
                  {item?.title}
                </h2>
                <p className="mt-4 max-w-[560px] text-[26px] leading-snug text-[var(--ink)]/80">
                  <EmphasizedCopy text={item?.body} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}