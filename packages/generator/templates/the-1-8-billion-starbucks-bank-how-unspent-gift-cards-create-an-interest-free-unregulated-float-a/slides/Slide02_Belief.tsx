import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const metrics = slide.metrics ?? [];

  const panels = [
    { item: items[0], evidence: metrics[0], kind: 'promise' },
    { item: items[1], evidence: metrics[1], kind: 'contract' },
  ] as const;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-8 grid min-h-0 flex-1 grid-cols-2 border-y border-[var(--border)]">
        {panels.map(({ item, evidence, kind }) => {
          const { qualifier, value: metric, unit } = parseMetricBadge(
            evidence?.badge ?? '',
          );
          const isPromise = kind === 'promise';

          return (
            <article
              key={kind}
              className={`flex min-h-0 min-w-0 flex-col px-8 py-7 ${
                isPromise
                  ? 'bg-[var(--surface)]'
                  : 'border-l border-[var(--accent)]'
              }`}
            >
              <div className="flex h-[120px] shrink-0 items-center">
                {isPromise ? (
                  <svg
                    viewBox="0 0 240 140"
                    className="h-[112px] w-[192px]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="14"
                      y="20"
                      width="212"
                      height="108"
                      rx="5"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M78 20V128M14 61H226"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                    <path
                      d="M78 61C61 60 45 50 48 39C51 28 74 34 78 61ZM78 61C81 39 96 30 105 38C116 49 96 61 78 61Z"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M158 96H200M180 108H200"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 240 140"
                    className="h-[112px] w-[192px]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M66 15H28V127H66M174 15H212V127H174"
                      stroke="var(--accent)"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                    <path
                      d="M64 43H176M64 64H157M64 85H176"
                      stroke="var(--ink)"
                      strokeWidth="2"
                    />
                    <path
                      d="M64 107H116"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>

              <h2 className="mt-6 font-[var(--font-headline)] text-[34px] font-semibold leading-tight tracking-[-0.025em]">
                {item?.title || item?.label}
              </h2>

              <p className="mt-5 font-[var(--font-body)] text-[28px] leading-[1.35]">
                {item?.body}
              </p>

              {evidence && (
                <div className="mt-auto pt-7">
                  <div className="border-t border-[var(--border)] pt-5">
                    <div className="flex items-baseline gap-2">
                      {qualifier && (
                        <span className="font-[var(--font-body)] text-[22px]">
                          {qualifier}
                        </span>
                      )}

                      <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] text-[var(--accent)] tabular-nums">
                        {metric}
                      </span>

                      {unit && (
                        <span className="font-[var(--font-body)] text-[22px]">
                          {unit}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.015em]">
                      {evidence.label}
                    </p>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}