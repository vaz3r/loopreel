import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-8 flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-4 w-4 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
          <div
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[30px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-9 flex min-h-0 flex-1 flex-col justify-between gap-8">
        <article className="shrink-0 border-t border-[var(--border)] pt-6">
          <p className="font-[var(--font-mono)] text-[56px] font-bold leading-none tracking-[-0.06em] text-[var(--accent)] tabular-nums">
            {item0?.badge}
          </p>

          <h2 className="mt-5 font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            {item0?.title}
          </h2>

          <p className="mt-3 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
            {item0?.body}
          </p>
        </article>

        <figure className="m-0 h-[440px] w-full shrink-0">
          <svg
            viewBox="0 0 1080 1350"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            className="block h-full w-full"
          >
            {/* The accession frame preserves fragments without joining them. */}
            <rect
              x="80"
              y="80"
              width="920"
              height="1190"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <g
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.65"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            >
              {/* Detached entablature. */}
              <path
                d="M190 255 H472 V345 H435 L415 387 H216 L190 345 Z"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M214 291 H447 M230 345 H405"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />

              {/* Broken shaft: its upper edge deliberately remains irregular. */}
              <path
                d="M258 505 L292 480 L320 526 L349 492 L378 519
                   L397 944 H238 Z"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M280 553 L270 886 M316 567 V909 M352 557 L365 882"
                fill="none"
                strokeOpacity="0.28"
                vectorEffect="non-scaling-stroke"
              />

              {/* Separate arch voussoir. */}
              <path
                d="M604 308
                   C724 323 825 442 870 634
                   L773 720
                   C743 585 683 497 602 473 Z"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M680 339 L657 492 M761 410 L713 555 M830 521 L753 629"
                fill="none"
                strokeOpacity="0.28"
                vectorEffect="non-scaling-stroke"
              />

              {/* Unconnected footing and displaced masonry. */}
              <path
                d="M179 1057 H441 V1142 H179 Z"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M603 919 L725 884 L757 1019 L630 1061 Z"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M796 1090 L881 1070 L902 1152 L815 1174 Z"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            >
              <path
                d="M130 170 H165 M147.5 130 V210
                   M915 1180 H950 M932.5 1140 V1220"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>
        </figure>

        <article className="grid shrink-0 grid-cols-[164px_minmax(0,1fr)] gap-7 border-l-[3px] border-[var(--accent)] bg-[var(--surface)] px-8 py-7">
          <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.05em] text-[var(--accent)] tabular-nums">
            {item1?.badge}
          </p>

          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
              {item1?.title}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
              {item1?.body}
            </p>
          </div>
        </article>

        <div className="shrink-0 border-t border-[var(--border)] pt-7">
          <p className="max-w-[850px] font-[var(--font-headline)] text-[32px] font-semibold leading-snug tracking-[-0.02em]">
            {slide.closingQuestion}
          </p>
        </div>
      </div>
    </section>
  );
}