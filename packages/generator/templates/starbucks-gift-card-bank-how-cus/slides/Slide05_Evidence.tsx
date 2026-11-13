import React from 'react';
import { parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
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

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const date = slide.kicker?.split('/')?.[0]?.trim();
  const metric0 = item0?.metric
    ? parseMetricBadge(item0.metric.badge)
    : null;
  const metric1 = item1?.metric
    ? parseMetricBadge(item1.metric.badge)
    : null;

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="my-6 w-full border-b border-[var(--border)]"
        />

        <p className="max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-6 flex min-h-0 flex-1 flex-col justify-between gap-6">
        <article className="shrink-0 pt-2">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
              {item0?.title}
            </h2>

            {metric0 && (
              <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
                {metric0.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric0.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[40px] font-bold tabular-nums">
                  {metric0.value}
                </span>
                {metric0.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric0.unit}
                  </span>
                )}
              </div>
            )}
          </div>

          <p className="mt-3 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
            <EmphasizedCopy text={item0?.body} />
          </p>
        </article>

        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="block h-[420px] w-full shrink-0"
          fill="none"
        >
          {/* Date plate: editorial annotation, not an access control. */}
          {date && (
            <g>
              <rect
                x="32.5"
                y="12.5"
                width="226"
                height="44"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x="145.5"
                y="40.5"
                textAnchor="middle"
                fill="var(--ink)"
                className="font-[var(--font-mono)] text-[20px] tracking-[0.06em]"
              >
                {date}
              </text>
            </g>
          )}

          {/* Upper evidence rail: a disputed, visibly incomplete boundary. */}
          <g stroke="var(--ink)" strokeWidth="1">
            <path d="M32 96V116" />

            {/* Open authorization threshold; no lock or arrowhead. */}
            <path d="M544 86V96 M544 116V126 M558 86V96 M558 116V126" />

            <path d="M900 58H716V154H900" />
            <path
              d="M916 58V91 M916 121V154"
              strokeDasharray="5 6"
            />
          </g>

          <rect
            x="740.5"
            y="81.5"
            width="32"
            height="25"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M751 82V106 M740 94H772"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Shared registration geometry gives both accounts equal weight. */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M20 202H44 M32 190V214" />
            <path d="M908 202H932 M920 190V214" />
          </g>

          {/* Lower evidence rail: spending endpoint, not a cash-out arrow. */}
          <g stroke="var(--ink)" strokeWidth="1">
            <path d="M32 294V314" />
            <path d="M544 284V294 M544 314V324 M558 284V294 M558 314V324" />

            {/* Card perimeter deliberately leaves its lower-right corner open. */}
            <path d="M916 324V256H716V352H888" />
          </g>

          <rect
            x="670"
            y="298"
            width="12"
            height="12"
            fill="var(--accent)"
          />

          <rect
            x="740.5"
            y="279.5"
            width="32"
            height="25"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M751 280V304 M740 292H772"
            stroke="var(--border)"
            strokeWidth="1"
          />
        </svg>

        <article className="shrink-0 pb-2">
          <div className="flex items-baseline justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
              {item1?.title}
            </h2>

            {metric1 && (
              <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
                {metric1.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric1.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[40px] font-bold tabular-nums">
                  {metric1.value}
                </span>
                {metric1.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric1.unit}
                  </span>
                )}
              </div>
            )}
          </div>

          <p className="mt-3 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
            <EmphasizedCopy text={item1?.body} />
          </p>
        </article>
      </div>
    </section>
  );
}