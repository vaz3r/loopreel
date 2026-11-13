import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

function StepIcon({ index }: { index: number }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[var(--accent)]"
      aria-hidden="true"
    >
      {index === 0 ? (
        <>
          <path d="M5 10V7a3 3 0 0 1 3-3h16v6" />
          <rect x="4" y="10" width="24" height="18" rx="3" />
          <path d="M28 15h-8v8h8" />
          <circle cx="23" cy="19" r="1" fill="currentColor" stroke="none" />
          <path d="M9 7h10" />
        </>
      ) : index === 1 ? (
        <>
          <path d="M6 11h17v11a6 6 0 0 1-6 6h-5a6 6 0 0 1-6-6V11Z" />
          <path d="M23 13h2a4 4 0 0 1 0 8h-2M4 29h23" />
          <path d="M11 3v4M17 2v5" />
        </>
      ) : (
        <>
          <rect x="6" y="3" width="20" height="26" rx="3" />
          <path d="M10 7h12v6H10zM10 18h4M12 16v4M19 18h3M10 24h4M19 23h3M19 26h3" />
        </>
      )}
    </svg>
  );
}

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const stages = [
    { item: items[0], breakBefore: '**cash upfront**.' },
    { item: items[1], breakBefore: 'into **purchase revenue**.' },
    { item: items[2], breakBefore: 'proportionately with redemptions.' },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col justify-between gap-5">
        <header className="shrink-0">
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-6 tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>

          <h1 className="mt-3 max-w-[920px] font-[var(--font-headline)] text-[28px] font-bold leading-[1.03] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)] opacity-80">
            {slide.subheadline}
          </p>
        </header>

        <div className="grid h-[516px] shrink-0 grid-cols-[112px_minmax(0,1fr)] gap-x-6">
          {/* Rail geometry and step numerals share one coordinate system.
              Each node is centered 30px into its corresponding 172px row. */}
          <svg
            width="112"
            height="516"
            viewBox="0 0 112 516"
            fill="none"
            className="block text-[var(--accent)]"
            aria-hidden="true"
          >
            <path
              d="M28 54V178"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="m22 153 6 7 6-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Nonuse branches from redemption—not another cash payment. */}
            <path
              d="M28 226V250C28 279 76 279 76 310V350"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="2 10"
              strokeLinecap="round"
            />
            <circle
              cx="28"
              cy="250"
              r="4"
              fill="currentColor"
            />

            {[items[0], items[1], items[2]].map((item, index) => {
              const cx = index === 2 ? 76 : 28;
              const cy = 30 + index * 172;

              return (
                <g key={index}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r="24"
                    fill="var(--surface)"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="currentColor"
                    className="font-[var(--font-mono)] text-[22px] font-bold"
                  >
                    {item?.step}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="grid min-w-0 grid-rows-3">
            {stages.map(({ item, breakBefore }, index) => {
              const body = item?.body ?? '';
              const breakAt = body.indexOf(breakBefore);
              const firstLine =
                breakAt > 0 ? body.slice(0, breakAt).trimEnd() : body;
              const secondLine =
                breakAt > 0 ? body.slice(breakAt) : '';

              return (
                <article
                  key={index}
                  className="flex min-w-0 flex-col pt-3"
                >
                  <div className="flex min-h-[36px] items-center gap-4">
                    <StepIcon index={index} />
                    <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-9 tracking-[-0.015em]">
                      {item?.title || item?.label}
                    </h2>
                  </div>

                  <p className="mt-3 font-[var(--font-body)] text-[28px] leading-[1.12] tracking-[-0.035em]">
                    <span className="block">
                      <Emphasis text={firstLine} />
                    </span>
                    {secondLine && (
                      <span className="block">
                        <Emphasis text={secondLine} />
                      </span>
                    )}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="shrink-0 border border-[var(--accent)] px-7 py-5">
          <h2 className="font-[var(--font-mono)] text-[22px] font-bold uppercase leading-7 tracking-[0.12em] text-[var(--accent)]">
            {slide.callout?.title}
          </h2>
          <p className="mt-2 font-[var(--font-body)] text-[26px] leading-snug">
            <Emphasis text={slide.callout?.body ?? ''} />
          </p>
        </aside>

        {slide.sourceNotes?.length ? (
          <div className="shrink-0 border-t border-[var(--border)] pt-3">
            {slide.sourceNotes.map((note, index) => (
              <p
                key={index}
                className="font-[var(--font-body)] text-[20px] leading-[1.3] text-[var(--ink)] opacity-70"
              >
                {note}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}