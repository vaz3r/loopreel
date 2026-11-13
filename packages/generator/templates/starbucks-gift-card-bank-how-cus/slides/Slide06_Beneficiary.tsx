import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

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

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

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

        <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        {slide.subheadline && (
          <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        )}
      </header>

      <div className="my-6 flex min-h-0 flex-1 flex-col justify-between gap-7">
        <div className="relative flex min-h-[440px] flex-1 flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] p-9">
          <div className="relative z-10">
            {t0 && (
              <div className="flex shrink-0 items-baseline gap-3 text-[var(--accent)]">
                {t0.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {t0.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[110px] font-bold leading-none tracking-[-0.06em] tabular-nums">
                  {t0.value}
                </span>
                {t0.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {t0.unit}
                  </span>
                )}
              </div>
            )}

            <p className="mt-3 max-w-[820px] font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-wider text-[var(--ink)]/70">
              {telemetry?.[0]?.label}
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 952 440"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[440px] w-full"
            fill="none"
          >
            {/* Total-width dimension bracket: 800 units. */}
            <g
              stroke="var(--ink)"
              strokeWidth="1"
              opacity="0.55"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M76 234V218H876V234" />
              <path d="M76 212V224M876 212V224" />
            </g>

            {/* Adjacent accounting components, not a progress track. */}
            <rect
              x="76"
              y="264"
              width="720.86"
              height="64"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <rect
              x="796.86"
              y="264"
              width="79.14"
              height="64"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="1"
            />
            <rect
              x="797.36"
              y="264.5"
              width="78.14"
              height="63"
              fill="var(--accent)"
              fillOpacity="0.14"
            />

            {/* Component figure leaders. */}
            <path
              d="M76 328V349"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <path
              d="M836.43 328V349"
              stroke="var(--accent)"
              strokeWidth="1"
            />

            <text
              x="76"
              y="386"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[32px] font-semibold tabular-nums"
            >
              $200.4
            </text>
            <text
              x="836.43"
              y="386"
              textAnchor="middle"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[28px] font-semibold tabular-nums"
            >
              $22.0
            </text>

            {/* Registration marks frame the accounting section. */}
            <g stroke="var(--border)" strokeWidth="1">
              <path d="M32 264H48M40 256V272" />
              <path d="M904 328H920M912 320V336" />
            </g>
          </svg>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-7 rounded-none border border-[var(--border)] bg-[var(--surface)] p-7">
          <article className="flex min-w-0 flex-col justify-between gap-4">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.08] tracking-[-0.02em]">
              {item0?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
              <EmphasizedCopy text={item0?.body} />
            </p>
          </article>

          <article className="flex min-w-0 flex-col justify-between gap-4 border-l border-[var(--border)] pl-7">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--accent)]">
              {item1?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
              <EmphasizedCopy text={item1?.body} />
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}