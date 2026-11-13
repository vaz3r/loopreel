import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function Emphasis({ text }: { text?: string }) {
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

function Metric({ badge, label }: { badge: string; label: string }) {
  const { qualifier, value: metric, unit } = parseMetricBadge(badge);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-baseline justify-end gap-2 whitespace-nowrap text-[var(--accent)]">
        {qualifier && (
          <span className="font-[var(--font-body)] text-[22px]">
            {qualifier}
          </span>
        )}
        <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.035em] tabular-nums">
          {metric}
        </span>
        {unit && (
          <span className="font-[var(--font-body)] text-[22px]">
            {unit}
          </span>
        )}
      </div>
      <span className="font-[var(--font-mono)] text-[20px] leading-snug tracking-wider text-[var(--ink)]/70">
        {label}
      </span>
    </div>
  );
}

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const asOf = (
    slide as SlideComponentProps['slide'] & { asOf?: string }
  ).asOf;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between"
      data-archetype="full-height-editorial-split"
    >
      <div className="my-6 grid min-h-0 flex-1 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-7 border-y border-[var(--border)] py-6">
        <div className="relative flex min-h-0 min-w-0 flex-col justify-between">
          <div
            aria-hidden="true"
            className="h-8 w-8 shrink-0 border-l border-t border-[var(--border)]"
          />

          <div className="flex min-h-0 flex-1 items-center justify-center">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 448 370"
              preserveAspectRatio="xMidYMid meet"
              className="block h-auto w-full text-[var(--ink)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              {/* Chamfered stored-value card, inset edge, magnetic stripe. */}
              <path
                d="M34 42H180L198 60V146H34Z"
                fill="var(--surface)"
                strokeOpacity="0.75"
              />
              <path
                d="M44 52H176L188 64V136H44Z"
                strokeOpacity="0.3"
              />
              <rect
                x="44"
                y="72"
                width="144"
                height="17"
                fill="currentColor"
                fillOpacity="0.16"
                stroke="none"
              />

              {/* Loyalty obligation: star and registration ring. */}
              <path
                d="M145 96L149.9 106.3L161.3 107.8L153 115.7L155 127L145 121.6L135 127L137 115.7L128.7 107.8L140.1 106.3Z"
                fill="var(--accent)"
                stroke="var(--accent)"
              />
              <circle
                cx="145"
                cy="113"
                r="25"
                stroke="var(--accent)"
                strokeOpacity="0.55"
              />

              {/* Separate royalty document, folded corner, embossed seal. */}
              <path
                d="M264 62H335L366 93V193H264Z"
                fill="var(--surface)"
                strokeOpacity="0.75"
              />
              <path
                d="M335 62V93H366"
                strokeOpacity="0.65"
              />
              <circle
                cx="315"
                cy="147"
                r="24"
                fill="var(--accent)"
                fillOpacity="0.14"
                stroke="var(--accent)"
                strokeWidth="2"
              />

              {/* Three mechanical alignment pins. */}
              <path
                d="M76 157V211M71 157H81M71 211H81"
                strokeOpacity="0.35"
              />
              <path
                d="M166 158V202M161 158H171M161 202H171"
                strokeOpacity="0.35"
              />
              <path
                d="M315 204V221M310 204H320M310 221H320"
                strokeOpacity="0.35"
              />

              {/* Balance arm and central fulcrum; no quantitative scaling. */}
              <path
                d="M61 238H387"
                strokeOpacity="0.85"
              />
              <path
                d="M224 242L207 321H241Z"
                fill="var(--surface)"
                strokeOpacity="0.6"
              />

              {/* Paired suspension rods. */}
              <path
                d="M94 238V287M354 238V287"
                strokeOpacity="0.6"
              />

              {/* Equal shallow mechanical weighing pans. */}
              <path
                d="M50 287H138L125 303H63Z"
                fill="var(--surface)"
                strokeOpacity="0.65"
              />
              <path
                d="M310 287H398L385 303H323Z"
                fill="var(--surface)"
                strokeOpacity="0.65"
              />

              {/* Four fasteners. */}
              <circle cx="61" cy="238" r="4" fill="var(--surface)" />
              <circle cx="94" cy="238" r="4" fill="var(--surface)" />
              <circle cx="354" cy="238" r="4" fill="var(--surface)" />
              <circle cx="387" cy="238" r="4" fill="var(--surface)" />

              {/* Baseline and four measurement ticks. */}
              <path d="M34 341H414" strokeOpacity="0.35" />
              <path d="M34 335V347" strokeOpacity="0.5" />
              <path d="M160 337V345" strokeOpacity="0.5" />
              <path d="M288 337V345" strokeOpacity="0.5" />
              <path d="M414 335V347" strokeOpacity="0.5" />
            </svg>
          </div>

          <div className="flex shrink-0 items-end justify-between gap-4 pt-6">
            {asOf && (
              <p className="max-w-[280px] font-[var(--font-mono)] text-[20px] leading-snug tracking-wide text-[var(--ink)]/65">
                {asOf}
              </p>
            )}
            <div
              aria-hidden="true"
              className="ml-auto h-8 w-8 shrink-0 border-b border-r border-[var(--border)]"
            />
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col justify-between gap-6">
          <header className="shrink-0">
            <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.2em] text-[var(--accent)]">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
              />
              <span>{slide.kicker}</span>
            </div>

            <h1 className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.08] tracking-[-0.035em]">
              {slide.headline}
            </h1>

            {slide.subheadline && (
              <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                {slide.subheadline}
              </p>
            )}
          </header>

          <div className="grid min-h-0 flex-1 grid-rows-2 gap-5">
            <article className="flex min-h-0 flex-col justify-between gap-4 rounded-none border border-[var(--border)] bg-[var(--surface)] px-7 py-5">
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.08] tracking-[-0.025em]">
                {item0?.title}
              </h2>

              {item0?.metric && (
                <Metric
                  badge={item0.metric.badge}
                  label={item0.metric.label}
                />
              )}

              <p className="border-t border-[var(--border)] pt-4 font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
                <Emphasis text={item0?.body} />
              </p>
            </article>

            <article className="flex min-h-0 flex-col justify-between gap-4 rounded-none border border-[var(--border)] px-7 py-5">
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.08] tracking-[-0.025em]">
                {item1?.title}
              </h2>

              {item1?.metric && (
                <Metric
                  badge={item1.metric.badge}
                  label={item1.metric.label}
                />
              )}

              <p className="border-t border-[var(--border)] pt-4 font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
                <Emphasis text={item1?.body} />
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}