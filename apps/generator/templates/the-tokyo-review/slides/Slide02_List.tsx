import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const items = [
  {
    tag: 'THRESHOLD',
    title: 'Make the boundary inhabitable',
    takeaway:
      'The engawa accommodates sitting, passing and watching the garden. A common width is 1–1.3 m: an edge with enough depth to become a place.',
  },
  {
    tag: 'COURTYARD',
    title: 'Bring weather into the plan',
    takeaway:
      'At Tadao Ando’s Azuma House, moving between interiors means crossing an open courtyard. Nature is not merely framed; it interrupts the domestic route.',
  },
  {
    tag: 'SEPARATION',
    title: 'Let gaps connect',
    takeaway:
      'Moriyama House distributes domestic life across ten separate volumes. Garden paths become places for encounters rather than leftover space around a building.',
  },
];

function SpatialMark({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 72 48"
      fill="none"
      aria-hidden="true"
      className="h-12 w-[72px] shrink-0 text-[var(--accent)]"
    >
      {index === 0 && (
        <>
          <path
            d="M6 8H66M6 40H66M18 8V40M54 8V40"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M18 22H54V40H18Z" fill="currentColor" opacity=".16" />
          <path d="M18 22H54" stroke="currentColor" strokeWidth="2" />
        </>
      )}
      {index === 1 && (
        <>
          <path
            d="M8 8H64V40H8Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path d="M28 8H44V40H28Z" fill="currentColor" opacity=".16" />
          <path
            d="M28 8V40M44 8V40"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M4 24H68"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
        </>
      )}
      {index === 2 && (
        <>
          <path
            d="M7 7H24V20H7ZM43 5H63V18H43ZM12 32H29V44H12ZM48 29H65V43H48Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M34 3V24H39V46"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 4"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      aria-labelledby="slide-02-title"
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0 pb-1">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
            Three spatial strategies
          </p>
        </div>

        <h2
          id="slide-02-title"
          className="max-w-[800px] font-[var(--font-headline)] text-6xl font-bold leading-[1.02] tracking-tight"
        >
          {slide.title || 'Give the interval a job'}
        </h2>
      </div>

      <ol className="m-0 grid min-h-0 flex-1 list-none grid-rows-3 gap-5 p-0">
        {items.map((item, index) => (
          <li
            key={item.tag}
            className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-0 top-8 w-[3px] rounded-r-full bg-[var(--accent)]"
            />

            <div className="mb-4 flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-[var(--font-mono)] text-sm tabular-nums opacity-50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="rounded-full border border-[var(--border)] px-3 py-1.5 font-[var(--font-mono)] text-xs font-semibold tracking-[0.16em] text-[var(--accent)]">
                  {item.tag}
                </span>
              </div>
              <SpatialMark index={index} />
            </div>

            <div>
              <h3 className="mb-3 font-[var(--font-headline)] text-[32px] font-bold leading-[1.12] tracking-tight">
                {item.title}
              </h3>
              <p className="max-w-[790px] text-[22px] leading-[1.48]">
                {item.takeaway}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}