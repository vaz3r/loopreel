import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CoverCopy = {
  publication?: string;
  kicker?: string;
  headline?: string;
  subheadline?: string;
  issueBadge?: string;
  items?: {
    badge?: string;
    label?: string;
    title?: string;
    body?: string;
  }[];
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const copy = slide as CoverCopy;
  const items = copy.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const headline =
    copy.headline ?? 'Tipasa Served Rome. Conquest Unmade It.';
  const headlineLines =
    headline === 'Tipasa Served Rome. Conquest Unmade It.'
      ? ['Tipasa Served Rome.', 'Conquest', 'Unmade It.']
      : [headline];

  const theme = {
    '--ink': '#000000',
    '--accent': '#E60000',
    '--surface': '#F5F5F5',
    '--border': '#E5E5E5',
    backgroundColor: '#FFFFFF',
  } as React.CSSProperties;

  // Brand typography is inherited from SlideFrame.
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
      aria-label={headline}
    >
      <div className="flex shrink-0 items-end justify-between gap-8 border-b-2 border-[var(--ink)] pb-6">
        <p className="font-[var(--font-headline)] text-[38px] font-bold leading-none tracking-[-0.045em]">
          {copy.publication ?? 'The Zurich Typographer'}
        </p>

        <svg
          aria-hidden="true"
          viewBox="0 0 40 40"
          className="h-10 w-10 shrink-0 text-[var(--accent)]"
          fill="currentColor"
        >
          <path d="M0 0h17v17H0zM23 0h17v17H23zM0 23h17v17H0z" />
        </svg>
      </div>

      <div className="mt-9 shrink-0">
        <p className="inline-block max-w-full bg-[var(--accent)] px-5 py-3 font-[var(--font-mono)] text-[20px] font-semibold uppercase leading-snug tracking-[0.16em] text-white">
          {copy.kicker ?? 'EMPIRE / DESTRUCTION AND REINVENTION'}
        </p>

        <h1 className="mt-9 font-[var(--font-headline)] text-[72px] font-bold leading-[1.02] tracking-[-0.04em]">
          {headlineLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-8 max-w-[850px] font-[var(--font-body)] text-[30px] leading-snug tracking-[-0.015em]">
          {copy.subheadline ??
            'Trace a trading post’s transformation into Rome’s foothold, then ruins sustaining modern tourism.'}
        </p>
      </div>

      <div className="relative my-8 flex min-h-[360px] flex-1 items-center justify-center">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1080 1350"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
        >
          {/* One broken architectural silhouette; no diagram or callouts. */}
          <g fill="var(--surface)">
            <path d="M250 1140H830V1230H250Z" />
            <path d="M305 1060H775V1140H305Z" />
            <path d="M350 1060V650L437 604L518 669L604 601L730 647V1060Z" />
            <path d="M350 517V269H730V499L613 453L521 521L434 462Z" />
            <path d="M300 189H780V269H300Z" />
            <path d="M260 109H820V189H260Z" />
          </g>

          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="4"
            strokeLinecap="square"
          >
            <path d="M426 305V438M502 305V466M578 305V444M654 305V437" />
            <path d="M426 694V1016M502 725V1016M578 696V1016M654 709V1016" />
            <path d="M305 1140H775" />
          </g>

          <path
            d="M350 566L434 515L521 577L610 509L730 554"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="14"
            strokeLinejoin="miter"
          />
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-10 border-t border-[var(--ink)] pt-7">
        {[item0, item1].map((item, index) => (
          <div key={index} className="min-w-0">
            <p className="font-[var(--font-mono)] text-[64px] font-bold leading-none tracking-[-0.055em] text-[var(--accent)]">
              {item?.badge ?? (index === 0 ? '430 CE' : '1857')}
            </p>

            <h2 className="mt-5 font-[var(--font-mono)] text-[22px] font-semibold uppercase leading-snug tracking-[0.12em]">
              {item?.label ??
                item?.title ??
                (index === 0 ? 'DESTRUCTION' : 'REFOUNDATION')}
            </h2>

            <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
              {item?.body ??
                (index === 0
                  ? 'Vandal conquest destroyed ancient Tipasa.'
                  : 'Modern Tipaza began anew; its ancient ruins now underpin tourism.')}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-9 flex shrink-0 items-center gap-5 border-t border-[var(--border)] pt-6">
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[20px] font-semibold uppercase leading-snug tracking-[0.16em]">
          {copy.issueBadge ?? 'SPECIAL REPORT · 10 SLIDES'}
        </p>
      </div>
    </section>
  );
}