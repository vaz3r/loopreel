import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function EditorialCopy({ text }: { text?: string }) {
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

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  // Publication chrome belongs to SlideFrame.
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

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        {slide.subheadline && (
          <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
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
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Intact contractual perimeter behind the two ledger masses. */}
          <rect
            x="106"
            y="48"
            width="740"
            height="342"
            stroke="var(--ink)"
            strokeOpacity="0.38"
            strokeWidth="1"
          />

          {/* A single exposed accent stripe occupies the specimen gutter. */}
          <rect
            x="614"
            y="48"
            width="8"
            height="342"
            fill="var(--accent)"
          />

          <rect
            x="0.5"
            y="26.5"
            width="601"
            height="339"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <rect
            x="634.5"
            y="146.5"
            width="317"
            height="219"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Disconnected balance-sheet strata, never repayment arrows. */}
          <path
            d="M106 401H602V408H106"
            stroke="var(--ink)"
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          <path
            d="M634 401H846V408H634"
            stroke="var(--accent)"
            strokeWidth="1"
          />

          <path
            d="M92 48H102M106 34V44M850 390H860M846 394V404"
            stroke="var(--ink)"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        </svg>

        <article className="relative mr-10 flex min-h-0 flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <div>
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
              {item0?.title}
            </h2>

            <p className="mt-4 max-w-[790px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
              <EditorialCopy text={item0?.body} />
            </p>
          </div>

          {t0 && (
            <div className="mt-5 flex items-end justify-between gap-6 border-t border-[var(--border)] pt-5">
              <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
                {t0.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {t0.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                  {t0.value}
                </span>
                {t0.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {t0.unit}
                  </span>
                )}
              </div>

              <p className="max-w-[390px] font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.04em] text-[var(--ink)]/80">
                {telemetry?.[0]?.label}
              </p>
            </div>
          )}
        </article>

        <article className="relative ml-10 flex min-h-0 flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <div className="flex items-center justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
              {item1?.title}
            </h2>
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 border border-[var(--accent)]"
            />
          </div>

          <div
            aria-hidden="true"
            className="relative h-[120px] shrink-0"
          >
            <svg
              viewBox="0 0 952 120"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              <path
                d="M1 30H602V88H1Z"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <path
                d="M634 48H951V106H634Z"
                stroke="var(--ink)"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
              <rect
                x="614"
                y="30"
                width="8"
                height="76"
                fill="var(--accent)"
              />
            </svg>
          </div>

          <p className="max-w-[790px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
            <EditorialCopy text={item1?.body} />
          </p>
        </article>
      </div>

      <div
        aria-hidden="true"
        className="h-px w-full shrink-0 bg-[var(--border)]"
      />
    </section>
  );
}