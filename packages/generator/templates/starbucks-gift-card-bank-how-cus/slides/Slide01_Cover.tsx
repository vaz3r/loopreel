import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function BoldAnchors({ text }: { text: string }) {
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

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]">
      <div className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="my-6 w-full border-b border-[var(--border)]"
        />

        {slide.subheadline && (
          <p className="max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            <BoldAnchors text={slide.subheadline} />
          </p>
        )}
      </div>

      <div className="relative my-4 flex min-h-[460px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 650"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
          className="absolute inset-0 h-full w-full"
        >
          {/* Registration squares anchor the specimen, not invented coordinates. */}
          <g fill="var(--accent)">
            <rect x="94" y="68" width="8" height="8" />
            <rect x="850" y="68" width="8" height="8" />
            <rect x="94" y="580" width="8" height="8" />
            <rect x="882" y="580" width="8" height="8" />
          </g>

          {/* Sparse physical measurement rules. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M88 100V520 M80 100H96 M80 310H92 M80 520H96" />
            <path d="M126 608H868 M126 600V616 M476 604V612 M868 600V616" />
          </g>

          {/* Three separated, offset sections of stored value. */}
          <g
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
            strokeLinejoin="miter"
          >
            <path d="M168 560H868V576H168Z" />
            <path d="M154 540H854V556H154Z" />
            <path d="M140 520H840V536H140Z" />
          </g>

          {/* Monumental sharp-edged stored-value-card specimen. */}
          <rect
            x="126"
            y="100"
            width="700"
            height="420"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* A single vermilion magnetic-stripe hairline. */}
          <path
            d="M126 240H826"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="mt-auto grid shrink-0 grid-cols-[minmax(0,1fr)_320px] border-t border-[var(--border)] pt-5">
        <div className="flex min-w-0 flex-col justify-between gap-3 pr-7">
          <p className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
            The Fine Print
          </p>
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.08em] text-[var(--ink)]/80">
            {slide.issueBadge}
          </p>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-2 border-l border-[var(--border)] pl-7">
          {t0 && (
            <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
              {t0.qualifier && (
                <span className="font-[var(--font-body)] text-[22px]">
                  {t0.qualifier}
                </span>
              )}
              <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tabular-nums">
                {t0.value}
              </span>
              {t0.unit && (
                <span className="font-[var(--font-body)] text-[22px]">
                  {t0.unit}
                </span>
              )}
            </div>
          )}
          <p className="font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
            {telemetry?.[0]?.label}
          </p>
        </div>
      </div>
    </section>
  );
}