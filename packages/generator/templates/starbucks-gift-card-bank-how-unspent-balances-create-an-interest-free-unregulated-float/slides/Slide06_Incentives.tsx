import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text: string }) {
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

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const heroStat = slide.heroStat;
  const comparisonBar = slide.comparisonBar;
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const segments = comparisonBar?.segments ?? [];
  const segment0 = segments[0];
  const segment1 = segments[1];

  const { qualifier, value: metric, unit } = parseMetricBadge(
    heroStat?.value ?? '',
  );

  const firstAmount = Number(
    String(segment0?.value ?? '').replace(/[^\d.]/g, ''),
  );
  const secondAmount = Number(
    String(segment1?.value ?? '').replace(/[^\d.]/g, ''),
  );
  const total = firstAmount + secondAmount;
  const firstWidth = total > 0 ? (firstAmount / total) * 840 : 0;
  const secondWidth = 840 - firstWidth;
  const firstMidpoint = firstWidth / 2;
  const secondMidpoint = firstWidth + secondWidth / 2;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col justify-between gap-6">
        <header>
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-[10px] w-[10px] bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-[var(--border)]"
            />
          </div>

          <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="mt-4 max-w-[890px] font-[var(--font-body)] text-[26px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="border-t border-[var(--border)] pt-6">
          <div className="flex items-baseline gap-3 text-[var(--accent)]">
            {qualifier && (
              <span className="font-[var(--font-body)] text-[28px]">
                {qualifier}
              </span>
            )}
            <p className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.065em] tabular-nums">
              {metric}
            </p>
          </div>

          {unit && (
            <p className="mt-1 font-[var(--font-body)] text-[28px] leading-[34px] text-[var(--accent)]">
              {unit}
            </p>
          )}

          <p className="mt-4 font-[var(--font-mono)] text-[22px] leading-[30px] tracking-[0.025em] uppercase">
            {heroStat?.label}
          </p>
        </div>

        <figure className="m-0">
          <svg
            viewBox="0 0 840 164"
            width="840"
            height="164"
            role="img"
            aria-label={`${heroStat?.label ?? ''}: ${segment0?.value ?? ''} — ${segment0?.label ?? ''}; ${segment1?.value ?? ''} — ${segment1?.label ?? ''}`}
            className="mx-auto block h-[164px] w-[840px] max-w-full"
          >
            <text
              x="0"
              y="32"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[32px] font-semibold tabular-nums"
            >
              {segment0?.value}
            </text>
            <text
              x="0"
              y="66"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[24px]"
            >
              {segment0?.label}
            </text>

            <text
              x="840"
              y="32"
              textAnchor="end"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[32px] font-semibold tabular-nums"
            >
              {segment1?.value}
            </text>
            <text
              x="840"
              y="66"
              textAnchor="end"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[24px]"
            >
              {segment1?.label}
            </text>

            <path
              d={`M 150 82 V 98 H ${firstMidpoint} V 122`}
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <path
              d={`M 726 82 V 98 H ${secondMidpoint} V 122`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />

            <rect
              x="0"
              y="122"
              width={firstWidth}
              height="28"
              fill="var(--ink)"
            />
            <rect
              x={firstWidth}
              y="122"
              width={secondWidth}
              height="28"
              fill="var(--accent)"
            />
            <line
              x1={firstWidth}
              y1="122"
              x2={firstWidth}
              y2="150"
              stroke="var(--surface)"
              strokeWidth="2"
            />
          </svg>

          <figcaption className="mt-3 text-center font-[var(--font-body)] text-[24px] font-medium leading-[32px]">
            {comparisonBar?.label}
          </figcaption>
        </figure>

        <div className="grid grid-cols-2 gap-6">
          <article className="border-t-2 border-[var(--ink)] py-5 pr-7">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[38px] tracking-[-0.025em]">
              {item0?.title || item0?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
              <EmphasizedCopy text={item0?.body ?? ''} />
            </p>
          </article>

          <article className="border-t-2 border-[var(--accent)] bg-[var(--surface)] px-7 py-5">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[38px] tracking-[-0.025em] text-[var(--accent)]">
              {item1?.title || item1?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
              <EmphasizedCopy text={item1?.body ?? ''} />
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}