import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide13({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 flex-col justify-center text-[var(--ink)]">
      <div className="my-auto flex w-full flex-col gap-12">
        <div
          aria-hidden="true"
          className="relative h-[280px] shrink-0 overflow-hidden border border-[var(--border)] bg-[var(--surface)]"
        >
          <svg
            viewBox="0 0 952 280"
            fill="none"
            className="h-full w-full"
          >
            <path
              d="M0 70H952M0 140H952M0 210H952"
              stroke="var(--border)"
              strokeOpacity="0.45"
            />

            {Array.from({ length: 17 }, (_, index) => (
              <path
                key={`grid-${index}`}
                d={`M${index * 60} 0V280`}
                stroke="var(--border)"
                strokeOpacity="0.3"
              />
            ))}

            <path
              d="M0 140H66M886 140H952M136 140H816"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            {[66, 226, 386, 546, 706].map((x, index) => (
              <g key={`processor-${index}`}>
                <path
                  d={`M${x + 60} 52V80M${x + 60} 200V228`}
                  stroke="var(--border)"
                  strokeWidth="2"
                />

                {[0, 1, 2, 3, 4].map((pin) => (
                  <g key={`pin-${pin}`}>
                    <path
                      d={`M${x + 28 + pin * 16} 70V80M${x + 28 + pin * 16} 200V210`}
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    <path
                      d={`M${x - 10} ${108 + pin * 16}H${x}M${x + 120} ${108 + pin * 16}H${x + 130}`}
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                  </g>
                ))}

                <rect
                  x={x}
                  y="80"
                  width="120"
                  height="120"
                  fill="var(--surface)"
                  stroke="var(--border)"
                />
                <rect
                  x={x + 20}
                  y="100"
                  width="80"
                  height="80"
                  fill="var(--accent)"
                  fillOpacity={index === 4 ? 0.18 : 0.04}
                  stroke={index === 4 ? 'var(--accent)' : 'var(--border)'}
                />
                <path
                  d={`M${x + 36} 124H${x + 84}M${x + 36} 140H${x + 84}M${x + 36} 156H${x + 68}`}
                  stroke="var(--accent)"
                  strokeOpacity={index === 4 ? 1 : 0.4}
                />
              </g>
            ))}

            <circle cx="886" cy="140" r="5" fill="var(--accent)" />
            <path
              d="M20 32V20H32M920 20H932V32M20 248V260H32M920 260H932V248"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <h1 className="whitespace-nowrap font-[var(--font-headline)] text-[160px] font-semibold leading-[0.95] tracking-[-0.065em] text-[var(--accent)]">
          {slide.headline}
        </h1>

        <div className="grid grid-cols-[64px_minmax(0,1fr)] gap-8 border-t border-[var(--border)] pt-9">
          <div aria-hidden="true" className="pt-3">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              className="h-16 w-16 text-[var(--accent)]"
            >
              <path
                d="M8 8V40H52M39 27L52 40L39 53"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </div>

          <p className="max-w-[800px] font-[var(--font-body)] text-[36px] font-normal leading-[1.38] tracking-[-0.02em]">
            {slide.body}
          </p>
        </div>
      </div>
    </section>
  );
}