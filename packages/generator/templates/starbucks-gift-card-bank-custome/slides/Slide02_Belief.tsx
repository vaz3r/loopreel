import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
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

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const metric0 = item0?.metric
    ? parseMetricBadge(item0.metric.badge)
    : null;

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between">
      <header className="shrink-0">
        {slide.kicker && (
          <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
            />
            <span>{slide.kicker}</span>
          </div>
        )}

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        {slide.subheadline && (
          <p className="mt-5 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        )}
      </header>

      <div className="relative my-6 grid min-h-0 flex-1 grid-rows-2 gap-7">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] w-full"
          fill="none"
        >
          <rect width="952" height="420" fill="#0D0E12" />

          <g stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1">
            <rect x="40" y="32" width="648" height="300" />
            <path d="M40 104H688" />
          </g>

          <g stroke="#FF4D00" strokeWidth="1">
            <rect x="112" y="82" width="648" height="300" />
            <path d="M112 154H760" />
          </g>

          <g fill="#161820" stroke="var(--border)" strokeWidth="1">
            <rect x="0.5" y="54.5" width="599" height="297" />
            <rect x="628.5" y="164.5" width="323" height="187" />
          </g>
        </svg>

        <article className="relative z-10 mr-10 mt-[54px] flex min-h-0 flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <div className="flex items-start justify-between gap-6">
            <h2 className="max-w-[700px] font-[var(--font-headline)] text-[34px] font-semibold leading-[1.08] tracking-[-0.025em]">
              {item0?.title}
            </h2>

            <span
              aria-hidden="true"
              className="mt-2 h-3 w-3 shrink-0 bg-[var(--accent)]"
            />
          </div>

          <div
            aria-hidden="true"
            className="h-[120px] shrink-0"
          />

          <div className="border-t border-[var(--border)] pt-5">
            {metric0 && (
              <div className="mb-3 flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
                {metric0.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric0.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none tabular-nums">
                  {metric0.value}
                </span>
                {metric0.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric0.unit}
                  </span>
                )}
              </div>
            )}

            <p className="max-w-[760px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
              <EmphasizedCopy text={item0?.body} />
            </p>
          </div>
        </article>

        <div className="relative ml-10 flex min-h-0 justify-end">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 952 420"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute bottom-0 right-0 h-full w-full"
            fill="none"
          >
            <path
              d="M112 32V382H760"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <path
              d="M40 32V332H688"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </svg>

          <article className="relative z-10 flex h-full min-h-0 w-[772px] flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] p-8">
            <div>
              {item1?.tag && (
                <p className="mb-3 font-[var(--font-mono)] text-[20px] uppercase tracking-wider text-[var(--accent)]">
                  {item1.tag}
                </p>
              )}

              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.08] tracking-[-0.025em]">
                {item1?.title}
              </h2>
            </div>

            <div aria-hidden="true" className="h-[120px] shrink-0" />

            <div className="border-t border-[var(--border)] pt-5">
              <p className="max-w-[680px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                <EmphasizedCopy text={item1?.body} />
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}