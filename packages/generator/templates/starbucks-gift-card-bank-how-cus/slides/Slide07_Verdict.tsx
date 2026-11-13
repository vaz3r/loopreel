import React from 'react';
import { parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';

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

function MetricBadge({ badge }: { badge: string }) {
  const { qualifier, value: metric, unit } = parseMetricBadge(badge);

  return (
    <div className="flex flex-wrap items-baseline gap-2 text-[var(--accent)]">
      {qualifier && (
        <span className="font-[var(--font-body)] text-[22px]">
          {qualifier}
        </span>
      )}
      <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tabular-nums">
        {metric}
      </span>
      {unit && (
        <span className="font-[var(--font-body)] text-[22px]">{unit}</span>
      )}
    </div>
  );
}

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]">
      <div className="my-6 grid min-h-0 flex-1 grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-7 border-y border-[var(--border)] py-6">
        <div className="flex min-h-0 min-w-0 flex-col justify-center">
          <svg
            viewBox="0 0 448 370"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            focusable="false"
            className="block h-auto w-full shrink-0"
          >
            {/* Reassembled card body; its contractual perimeter stays intact. */}
            <rect
              x="24"
              y="48"
              width="400"
              height="258"
              rx="2"
              fill="var(--surface)"
            />

            {/* A narrow sectional opening exposes physical accounting layers. */}
            <rect
              x="76"
              y="149"
              width="296"
              height="56"
              fill="var(--border)"
            />
            <path
              d="M76 149H372V162H76Z"
              fill="var(--ink)"
              fillOpacity="0.12"
            />
            <path
              d="M76 163H372V176H76Z"
              fill="var(--ink)"
              fillOpacity="0.22"
            />
            <path
              d="M76 177H372V190H76Z"
              fill="var(--accent)"
              fillOpacity="0.38"
            />
            <path
              d="M76 191H372V205H76Z"
              fill="var(--ink)"
              fillOpacity="0.1"
            />
            <rect
              x="76"
              y="149"
              width="296"
              height="56"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.45"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            {/* Examination rule terminates exactly at the card edges. */}
            <path
              d="M224 48V306"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="butt"
              vectorEffect="non-scaling-stroke"
            />

            <rect
              x="24"
              y="48"
              width="400"
              height="258"
              rx="2"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.7"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col justify-between gap-8">
          <header>
            {slide.kicker && (
              <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em] text-[var(--accent)]">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
                />
                <span>{slide.kicker}</span>
              </div>
            )}

            <h1 className="mt-5 font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
              {slide.headline}
            </h1>

            {slide.subheadline && (
              <p className="mt-6 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                {slide.subheadline}
              </p>
            )}
          </header>

          <div className="flex flex-col">
            <article className="pb-6">
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
                {item0?.title}
              </h2>
              <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                <EmphasizedCopy text={item0?.body} />
              </p>
              {item0?.metric && (
                <div className="mt-4">
                  <MetricBadge badge={item0.metric.badge} />
                  <p className="mt-2 font-[var(--font-body)] text-[24px] leading-snug">
                    {item0.metric.label}
                  </p>
                </div>
              )}
            </article>

            <article className="border-t border-[var(--border)] pt-6">
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
                {item1?.title}
              </h2>
              <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                <EmphasizedCopy text={item1?.body} />
              </p>
              {item1?.metric && (
                <div className="mt-4">
                  <MetricBadge badge={item1.metric.badge} />
                  <p className="mt-2 font-[var(--font-body)] text-[24px] leading-snug">
                    {item1.metric.label}
                  </p>
                </div>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}