import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const metrics = [
  {
    value: '$250',
    label: 'DRONE STARTING PRICE',
    context:
      'January 27, 2027 target depends on Federal Communications Commission authorization.',
    tag: 'PENDING FCC',
  },
  {
    value: '$1,000',
    label: 'ROVER PRICE',
    context:
      'Available for preorder; scheduled to start shipping December 16, 2026.',
    tag: 'PREORDER',
  },
  {
    value: '180 DAYS',
    label: 'ROVER CLOUD RETENTION',
    context:
      'Up to this duration for doorbell-ring, motion-event and Live View videos.',
    tag: 'UP TO',
  },
] as const;

function TelemetryGraphic({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full text-[var(--accent)]"
    >
      <g stroke="var(--border)" strokeWidth="1">
        <path d="M8 20H28M8 20V40M152 20H132M152 20V40M8 160H28M8 160V140M152 160H132M152 160V140" />
        <path d="M80 26V154M14 90H146" strokeDasharray="2 7" />
      </g>

      {index === 0 && (
        <>
          <circle
            cx="80"
            cy="90"
            r="57"
            stroke="currentColor"
            strokeOpacity=".25"
            strokeDasharray="3 6"
          />
          <g stroke="currentColor" strokeWidth="2">
            <path d="M68 78L45 55M92 78L115 55M68 102L45 125M92 102L115 125" />
            <rect
              x="64"
              y="73"
              width="32"
              height="34"
              rx="9"
              fill="var(--surface)"
            />
            <ellipse cx="42" cy="52" rx="23" ry="11" />
            <ellipse cx="118" cy="52" rx="23" ry="11" />
            <ellipse cx="42" cy="128" rx="23" ry="11" />
            <ellipse cx="118" cy="128" rx="23" ry="11" />
            <path d="M28 52H56M104 52H132M28 128H56M104 128H132" />
          </g>
          <circle cx="80" cy="90" r="5" fill="currentColor" />
          <path
            d="M63 36L80 28L97 36"
            stroke="currentColor"
            strokeWidth="2"
          />
        </>
      )}

      {index === 1 && (
        <>
          <path
            d="M24 143H136M32 151H128"
            stroke="currentColor"
            strokeOpacity=".3"
          />
          <g stroke="currentColor" strokeWidth="2">
            <path
              d="M43 105V94C43 75 57 64 80 64C103 64 117 75 117 94V105"
              fill="var(--surface)"
            />
            <rect
              x="34"
              y="103"
              width="92"
              height="26"
              rx="10"
              fill="var(--surface)"
            />
            <rect
              x="45"
              y="119"
              width="20"
              height="17"
              rx="6"
              fill="var(--surface)"
            />
            <rect
              x="95"
              y="119"
              width="20"
              height="17"
              rx="6"
              fill="var(--surface)"
            />
            <circle cx="80" cy="86" r="11" />
            <path d="M80 64V48M69 48H91" />
            <path d="M54 39Q80 22 106 39" strokeOpacity=".4" />
            <path d="M63 47Q80 35 97 47" strokeOpacity=".7" />
          </g>
          <circle cx="80" cy="86" r="4" fill="currentColor" />
          <path d="M68 113H92" stroke="currentColor" strokeWidth="2" />
        </>
      )}

      {index === 2 && (
        <>
          <circle
            cx="80"
            cy="90"
            r="59"
            stroke="currentColor"
            strokeOpacity=".2"
            strokeWidth="6"
          />
          <path
            d="M80 31A59 59 0 1 1 21 90"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="butt"
          />
          <g stroke="currentColor" strokeWidth="2">
            <path
              d="M52 99C41 99 37 90 41 82C44 76 49 73 56 74C58 60 69 54 80 57C88 59 94 65 96 73C110 70 121 79 119 89C118 96 113 99 105 99H52Z"
              fill="var(--surface)"
            />
            <path d="M62 109V123M80 109V133M98 109V123" />
          </g>
          <g fill="currentColor">
            <rect x="59" y="123" width="6" height="6" />
            <rect x="77" y="133" width="6" height="6" />
            <rect x="95" y="123" width="6" height="6" />
          </g>
        </>
      )}
    </svg>
  );
}

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      data-slide-id={slide.id}
      className="flex h-full min-h-0 w-full flex-col gap-7 text-[var(--ink)]"
    >
      <div className="shrink-0">
        <div className="mb-5 h-1.5 w-20 bg-[var(--accent)]" />
        <h2 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.045em]">
          The Prices—and
          <br />
          the Cloud Footprint
        </h2>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 gap-4">
        {metrics.map((metric, index) => (
          <article
            key={metric.label}
            className="relative grid min-h-0 grid-cols-[minmax(0,1fr)_140px] items-center gap-6 border border-[var(--border)] bg-[var(--surface)] px-7 py-5"
          >
            <span
              aria-hidden="true"
              className="absolute -left-px top-6 h-10 w-[3px] bg-[var(--accent)]"
            />

            <div className="min-w-0">
              <div className="mb-3 flex items-center gap-4">
                <h3 className="font-[var(--font-mono)] text-[15px] font-medium leading-5 tracking-[0.1em]">
                  {metric.label}
                </h3>
                <span className="shrink-0 border border-[var(--accent)] px-2 py-1 font-[var(--font-mono)] text-[11px] font-medium leading-3 tracking-[0.08em] text-[var(--accent)]">
                  {metric.tag}
                </span>
              </div>

              <div
                className={`font-[var(--font-headline)] font-bold leading-none tracking-[-0.055em] ${
                  index === 2
                    ? 'text-[72px] text-[var(--accent)]'
                    : 'text-[84px]'
                }`}
              >
                {metric.value}
              </div>

              <p className="mt-3 max-w-[660px] font-[var(--font-body)] text-[21px] leading-[1.35]">
                {metric.context}
              </p>
            </div>

            <div className="w-[140px] self-center">
              <TelemetryGraphic index={index} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}