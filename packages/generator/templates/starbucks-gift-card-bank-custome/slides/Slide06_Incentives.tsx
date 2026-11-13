import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

type CanonicalItem = NonNullable<
  SlideComponentProps['slide']['items']
>[number];

interface LedgerItem extends CanonicalItem {
  index?: string;
  badge?: string;
  metricLabel?: string;
}

interface LedgerRowProps {
  item?: LedgerItem;
  index: number;
}

function BoldCopy({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\*\*.*?\*\*)/g).map((part, index) =>
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

function LedgerRow({ item, index }: LedgerRowProps) {
  const badge = item?.badge ?? item?.metric?.badge;
  const parsed = badge ? parseMetricBadge(badge) : null;
  const label = item?.metricLabel ?? item?.metric?.label;

  return (
    <article className="relative grid min-h-0 flex-1 grid-cols-[70px_minmax(0,1fr)_232px] items-center gap-x-6 py-7 pr-4">
      <div className="flex h-full flex-col justify-center gap-4 pl-2">
        <span
          aria-hidden="true"
          className="h-[6px] w-[6px] shrink-0 bg-[var(--accent)]"
        />
        <span className="font-[var(--font-mono)] text-[20px] font-bold tabular-nums tracking-[-0.04em] text-[var(--ink)]">
          [{String(index).padStart(2, '0')}]
        </span>
      </div>

      <div className="min-w-0 py-2">
        <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-[1.12] tracking-[-0.025em]">
          {item?.title}
        </h2>

        {item?.body && (
          <p className="mt-5 max-w-[530px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
            <BoldCopy>{item.body}</BoldCopy>
          </p>
        )}
      </div>

      <div className="flex min-w-0 flex-col items-end justify-center text-right">
        {parsed && (
          <>
            <div className="flex items-baseline justify-end gap-2 whitespace-nowrap text-[var(--accent)]">
              {parsed.qualifier && (
                <span className="font-[var(--font-body)] text-[22px] leading-none">
                  {parsed.qualifier}
                </span>
              )}
              <span className="font-[var(--font-mono)] text-[42px] font-bold leading-none tracking-[-0.045em] tabular-nums">
                {parsed.value}
              </span>
            </div>

            {parsed.unit && (
              <span className="mt-2 font-[var(--font-body)] text-[22px] leading-snug text-[var(--ink)]">
                {parsed.unit}
              </span>
            )}
          </>
        )}

        {label && (
          <p className="mt-3 max-w-[232px] font-[var(--font-mono)] text-[20px] leading-snug text-[var(--ink)]/70">
            {label}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items: LedgerItem[] = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];

  // Publication metadata belongs to SlideFrame.
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between">
      <header className="shrink-0">
        {slide.kicker && (
          <div className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.2em] text-[var(--ink)]/70">
            {slide.kicker}
          </div>
        )}

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        {slide.subheadline && (
          <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        )}
      </header>

      <div className="relative my-6 flex min-h-0 flex-1 flex-col justify-between rounded-none border-y border-[var(--border)]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 h-full w-full text-[var(--ink)] opacity-[0.045]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <rect
            x="128"
            y="38"
            width="498"
            height="344"
            vectorEffect="non-scaling-stroke"
          />
          <rect
            x="152"
            y="62"
            width="450"
            height="296"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M188 332V96H650V354"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* HTML hairlines keep the three ledger divisions aligned at
            every available height without stretching the SVG geometry. */}
        <div className="relative flex min-h-0 flex-1 flex-col divide-y divide-[var(--border)]">
          <LedgerRow item={item0} index={1} />
          <LedgerRow item={item1} index={2} />
          <LedgerRow item={item2} index={3} />
        </div>
      </div>
    </section>
  );
}