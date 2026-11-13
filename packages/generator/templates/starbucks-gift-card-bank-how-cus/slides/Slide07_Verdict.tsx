import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

interface LockedCopyProps {
  text?: string;
}

function LockedCopy({ text = '' }: LockedCopyProps) {
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

type FindingItem = NonNullable<SlideComponentProps['slide']['items']>[number];

interface FindingProps {
  item?: FindingItem;
}

function Finding({ item }: FindingProps) {
  if (!item) return null;

  const metric = item.metric ? parseMetricBadge(item.metric.badge) : null;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
        {item.title}
      </h2>

      <p className="max-w-[490px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
        <LockedCopy text={item.body} />
      </p>

      {metric && (
        <div>
          <div className="flex items-baseline gap-2 text-[var(--accent)]">
            {metric.qualifier && (
              <span className="font-[var(--font-body)] text-[22px]">
                {metric.qualifier}
              </span>
            )}
            <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none tabular-nums">
              {metric.value}
            </span>
            {metric.unit && (
              <span className="font-[var(--font-body)] text-[22px]">
                {metric.unit}
              </span>
            )}
          </div>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
            {item.metric?.label}
          </p>
        </div>
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

  // Brand tokens and footer copy are supplied by SlideFrame.
  void brand;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between"
      data-slide-index={slide.index}
      data-total-slides={totalSlides}
    >
      <div className="my-6 grid min-h-0 flex-1 grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-7 border-y border-[var(--border)] py-6">
        <div className="flex min-h-0 min-w-0 flex-col justify-between gap-8 py-4">
          <header>
            <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
              />
              <span>{slide.kicker}</span>
            </div>

            <h1 className="mt-7 font-[var(--font-headline)] text-[64px] font-bold leading-[1.08] tracking-[-0.035em] [text-wrap:balance]">
              {slide.headline}
            </h1>

            <p className="mt-7 max-w-[510px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
              {slide.subheadline}
            </p>
          </header>

          <div className="flex min-h-0 flex-1 flex-col justify-evenly gap-8 pt-4">
            <Finding item={item0} />
            <Finding item={item1} />
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 370"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="An intact stored-value card separated from a neutral bank vault by an orange architectural cut."
            className="block h-auto w-full text-[var(--ink)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinejoin="miter"
          >
            {/* Intact foreground card: perimeter, inset, magnetic stripe. */}
            <rect
              x="20"
              y="198"
              width="252"
              height="148"
              rx="2"
              fill="var(--surface)"
              strokeOpacity="0.8"
            />
            <rect
              x="30"
              y="208"
              width="232"
              height="128"
              rx="1"
              strokeOpacity="0.25"
            />
            <rect
              x="30"
              y="230"
              width="232"
              height="26"
              fill="var(--border)"
              stroke="none"
            />

            {/* Four external registration notches. */}
            <path d="M10 216V188H38" strokeOpacity="0.45" />
            <path d="M254 188H282V216" strokeOpacity="0.45" />
            <path d="M10 328V356H38" strokeOpacity="0.45" />
            <path d="M254 356H282V328" strokeOpacity="0.45" />

            {/* Distant vault: rings, combination dial, pointer. */}
            <circle cx="354" cy="108" r="70" strokeOpacity="0.5" />
            <circle cx="354" cy="108" r="58" strokeOpacity="0.3" />
            <circle
              cx="354"
              cy="108"
              r="21"
              fill="var(--surface)"
              strokeOpacity="0.65"
            />
            <path d="M354 108L365 95" strokeOpacity="0.8" />

            {/* Eight radial calibration ticks. */}
            <path d="M354 58V65" strokeOpacity="0.45" />
            <path d="M389.36 72.64L384.41 77.59" strokeOpacity="0.45" />
            <path d="M404 108H397" strokeOpacity="0.45" />
            <path d="M389.36 143.36L384.41 138.41" strokeOpacity="0.45" />
            <path d="M354 158V151" strokeOpacity="0.45" />
            <path d="M318.64 143.36L323.59 138.41" strokeOpacity="0.45" />
            <path d="M304 108H311" strokeOpacity="0.45" />
            <path d="M318.64 72.64L323.59 77.59" strokeOpacity="0.45" />

            {/* Four locking lugs. */}
            <rect x="349" y="30" width="10" height="18" strokeOpacity="0.5" />
            <rect x="414" y="103" width="18" height="10" strokeOpacity="0.5" />
            <rect x="349" y="168" width="10" height="18" strokeOpacity="0.5" />
            <rect x="276" y="103" width="18" height="10" strokeOpacity="0.5" />

            {/* Two hinges. */}
            <rect
              x="430"
              y="67"
              width="10"
              height="24"
              fill="var(--surface)"
              strokeOpacity="0.4"
            />
            <rect
              x="430"
              y="125"
              width="10"
              height="24"
              fill="var(--surface)"
              strokeOpacity="0.4"
            />

            {/* Architectural separation cut; neither object is breached. */}
            <path
              d="M204 22L376 352H381L209 22Z"
              fill="var(--accent)"
              stroke="none"
            />

            {/* Two dimension endpoints. */}
            <path d="M194 28L218 16" stroke="var(--accent)" />
            <path d="M366 358L390 346" stroke="var(--accent)" />
          </svg>
        </div>
      </div>
    </section>
  );
}