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

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="relative isolate flex h-full min-h-0 flex-col gap-10">
        {/* Fractured column: decorative, never a text container. */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1080 1350"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--ink)]"
          fill="none"
        >
          <g fill="currentColor" opacity="0.045">
            <path d="M673 150H977V190H951V225H704V190H673Z" />
            <path d="M721 241H934L923 460L869 492L829 466L781 508L712 479Z" />
            <path d="M712 510L777 538L832 497L872 523L920 493L910 741L856 774L809 746L742 789L704 765Z" />
            <path d="M705 806L748 827L811 786L859 813L909 779L926 1105H693Z" />
            <path d="M672 1121H948V1157H974V1194H647V1157H672Z" />
            <path d="M631 1210H991V1250H631Z" />
            <path d="M627 526L659 506L679 544L650 562Z" />
            <path d="M944 775L974 761L989 797L961 813Z" />
          </g>
          <g
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.07"
          >
            <path d="M753 258L747 466M793 258L787 483M834 258L830 448M875 258L870 475M914 258L906 453" />
            <path d="M746 555L736 753M786 551L780 747M827 537L823 727M868 545L866 752" />
            <path d="M735 842L725 1084M777 828L770 1084M819 822V1084M862 840L870 1084M901 819L912 1084" />
            <path d="M80 1274H1000" />
          </g>
        </svg>

        <header className="flex shrink-0 flex-col gap-7 pt-3">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[2px] w-12 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[860px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
        </header>

        <div className="flex min-h-0 flex-1 flex-col justify-center gap-9 py-2">
          <article className="relative w-[86%] shrink-0 border border-[var(--border)] bg-[var(--surface)] px-10 py-9">
            <span
              aria-hidden="true"
              className="absolute -left-px top-9 h-16 w-[3px] bg-[var(--accent)]"
            />

            <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] tabular-nums">
              {item0?.badge}
            </p>

            <div className="mt-6 border-t border-[var(--border)] pt-6">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {item0?.label || item0?.title}
              </h2>
              <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
                {item0?.body}
              </p>
            </div>
          </article>

          <article className="relative ml-auto w-[74%] shrink-0 border-2 border-[var(--accent)] bg-[var(--surface)] px-10 py-9">
            <div className="flex items-center justify-between gap-6">
              <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] text-[var(--accent)] tabular-nums">
                {item1?.badge}
              </p>

              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 56 56"
                className="h-14 w-14 shrink-0 text-[var(--accent)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 46H47M13 40H43M16 17H40M12 11H44" />
                <path d="M19 18V27L25 31L20 35V39M28 18V26L34 30L29 34V39M37 18V27L41 30L37 35V39" />
              </svg>
            </div>

            <div className="mt-6 border-t border-[var(--border)] pt-6">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {item1?.label || item1?.title}
              </h2>
              <p className="mt-4 font-[var(--font-body)] text-[28px] leading-snug">
                {item1?.body}
              </p>
            </div>
          </article>
        </div>

        <div className="flex shrink-0 flex-col gap-7 pb-3">
          <p className="max-w-[800px] font-[var(--font-headline)] text-[32px] font-semibold leading-snug tracking-[-0.02em]">
            {slide.closingQuestion}
          </p>

          <div
            aria-hidden="true"
            className="h-px w-full bg-[var(--accent)]"
          />

          <p className="self-end font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.08em] text-[var(--accent)]">
            tipaza.pub
          </p>
        </div>
      </div>
    </section>
  );
}