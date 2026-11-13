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

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  const datedSlide = slide as typeof slide & { period?: string };
  const period = datedSlide.period ?? 'Year ended September 28, 2025';

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]">
      <div className="relative my-6 grid min-h-0 flex-1 grid-cols-2 gap-[40px] border-y border-[var(--border)] py-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-[var(--border)]"
        />

        <div className="flex min-h-0 min-w-0 flex-col justify-between">
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <svg
              viewBox="0 0 448 370"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              focusable="false"
              className="block h-auto w-full text-[var(--ink)]"
              fill="none"
            >
              {/* Four corner registration ticks. */}
              <path
                d="M18 30V14H34 M414 14H430V30 M18 340V356H34 M414 356H430V340"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.55"
              />

              {/* Architectural specimen; geometry is not quantitative. */}
              <rect
                x="54"
                y="30"
                width="340"
                height="300"
                fill="#161820"
                stroke="currentColor"
                strokeWidth="1"
              />

              {/* Incised reveal. */}
              <rect
                x="296"
                y="31"
                width="8"
                height="298"
                fill="#FF4D00"
              />

              {/* Detached section and its open separation channel. */}
              <rect
                x="305"
                y="90"
                width="90"
                height="160"
                fill="#0D0E12"
              />
              <rect
                x="318"
                y="98"
                width="76"
                height="144"
                fill="#161820"
                stroke="currentColor"
                strokeWidth="1"
              />

              {/* Capped architectural dimensions. */}
              <path
                d="M35 30V330 M29 30H41 M29 330H41 M54 346H394 M54 340V352 M394 340V352"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.5"
              />
            </svg>
          </div>

          <p className="mt-6 shrink-0 border-t border-[var(--border)] pt-5 font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.02em] text-[var(--ink)]/80">
            {period}
          </p>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col justify-between">
          <div className="shrink-0">
            {slide.kicker && (
              <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.14em] text-[var(--accent)]">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
                />
                <span>{slide.kicker}</span>
              </div>
            )}

            <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
              {slide.headline}
            </h1>

            {slide.subheadline && (
              <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                {slide.subheadline}
              </p>
            )}
          </div>

          <div className="mt-6 flex min-h-0 flex-1 flex-col justify-between gap-5">
            {item0 && (
              <article className="flex flex-col justify-between gap-3 rounded-none border border-[var(--border)] bg-[var(--surface)] px-7 py-5">
                <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.08] tracking-[-0.035em]">
                  {item0.title}
                </h2>
                <p className="font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
                  <EmphasizedCopy text={item0.body} />
                </p>
              </article>
            )}

            {item1 && (
              <article className="flex flex-col justify-between gap-3 rounded-none border border-[var(--border)] px-7 py-5">
                <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.08] tracking-[-0.035em]">
                  {item1.title}
                </h2>
                <p className="font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
                  <EmphasizedCopy text={item1.body} />
                </p>
              </article>
            )}

            {t0 && (
              <div className="shrink-0 border-t border-[var(--accent)] pt-4">
                <div className="flex items-baseline gap-2 text-[var(--accent)]">
                  {t0.qualifier && (
                    <span className="font-[var(--font-body)] text-[22px] leading-snug">
                      {t0.qualifier}
                    </span>
                  )}
                  <span className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                    {t0.value}
                  </span>
                  {t0.unit && (
                    <span className="font-[var(--font-body)] text-[22px] leading-snug">
                      {t0.unit}
                    </span>
                  )}
                </div>
                <p className="mt-2 font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.035em] text-[var(--ink)]/80">
                  {telemetry?.[0]?.label}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}