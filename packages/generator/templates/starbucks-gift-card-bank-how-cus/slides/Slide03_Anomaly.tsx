import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

interface LiabilityEntry {
  title?: string;
  body?: string;
  badge?: string;
  label?: string;
  metric?: {
    badge: string;
    label: string;
  };
}

function EmphasizedCopy({ text }: { text: string }) {
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

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  // Preserve the supplied flat badge/label fields without changing shared types.
  const items: readonly LiabilityEntry[] = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const rows = [
    { key: 'balance', item: item0 },
    { key: 'deferrals', item: item1 },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]">
      <div className="my-6 grid min-h-0 flex-1 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-7 border-y border-[var(--border)] py-6">
        <div className="flex min-h-0 min-w-0 flex-col justify-center">
          <svg
            viewBox="0 0 448 370"
            preserveAspectRatio="xMidYMid meet"
            className="block h-auto w-full shrink-0"
            role="img"
            aria-label="Conceptual overlapping liability sections, not proportional amounts or an additive comparison."
          >
            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M22 54H10M38 38V26M330 38V26M346 54H358" />
              <path d="M94 316H82M110 332V344M402 332V344M418 316H430" />
              <path d="M22 132H10M22 238H10M418 132H430M418 238H430" />
            </g>

            <rect
              x="38"
              y="54"
              width="292"
              height="184"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.55"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            <rect
              x="110"
              y="132"
              width="292"
              height="184"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.75"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            <rect
              x="110"
              y="132"
              width="220"
              height="106"
              fill="var(--accent)"
              fillOpacity="0.06"
            />

            <path
              d="M330 132V238H110"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            <g fill="var(--accent)">
              <rect x="327" y="129" width="6" height="6" />
              <rect x="107" y="235" width="6" height="6" />
            </g>
          </svg>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col justify-between gap-7 border-l border-[var(--border)] pl-7">
          <header className="shrink-0">
            {slide.kicker && (
              <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.14em] text-[var(--accent)]">
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
                />
                <span>{slide.kicker}</span>
              </div>
            )}

            <h1 className="mt-5 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
              {slide.headline}
            </h1>

            {slide.subheadline && (
              <p className="mt-6 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                {slide.subheadline}
              </p>
            )}
          </header>

          <div className="flex min-h-0 flex-1 flex-col divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {rows.map(({ key, item }) => {
              const badge = item?.badge ?? item?.metric?.badge;
              const label = item?.label ?? item?.metric?.label;
              const parsed = badge ? parseMetricBadge(badge) : null;

              return (
                <article
                  key={key}
                  className="flex min-h-0 flex-1 flex-col justify-between gap-4 py-6"
                >
                  <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
                    {item?.title}
                  </h2>

                  <div>
                    {parsed && (
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[var(--accent)]">
                        {parsed.qualifier && (
                          <span className="font-[var(--font-body)] text-[22px] leading-snug">
                            {parsed.qualifier}
                          </span>
                        )}
                        <span className="whitespace-nowrap font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                          {parsed.value}
                        </span>
                        {parsed.unit && (
                          <span className="font-[var(--font-body)] text-[22px] leading-snug">
                            {parsed.unit}
                          </span>
                        )}
                      </div>
                    )}

                    {label && (
                      <p className="mt-2 font-[var(--font-mono)] text-[20px] leading-snug text-[var(--ink)]/70">
                        {label}
                      </p>
                    )}
                  </div>

                  {item?.body && (
                    <p className="font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                      <EmphasizedCopy text={item.body} />
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}