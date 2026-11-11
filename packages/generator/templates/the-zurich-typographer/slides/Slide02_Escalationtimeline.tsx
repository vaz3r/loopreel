import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 flex-col items-start">
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-7 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-8 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="mt-12 flex min-h-0 flex-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 1000"
          className="block h-auto w-full shrink-0"
          role="group"
          aria-label={slide.headline}
        >
          {/* Identical connector geometry makes each interval schematic. */}
          <g
            fill="none"
            stroke="#E60000"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
            aria-hidden="true"
          >
            <path d="M 44 704 V 669 H 212 V 634" />
            <path d="M 212 384 V 349 H 380 V 314" />
          </g>

          {items.slice(0, 3).map((item: any, index: number) => {
            const x = index * 168;
            const y = 704 - index * 320;

            return (
              <g key={`${item.label}-${index}`}>
                <rect
                  x={x}
                  y={y}
                  width="600"
                  height="250"
                  fill="#F5F5F5"
                />

                <path
                  d={`M ${x} ${y} H ${x + 600}`}
                  fill="none"
                  stroke="#000000"
                  strokeWidth="2"
                  aria-hidden="true"
                />

                <path
                  d={`M ${x} ${y} H ${x + 76}`}
                  fill="none"
                  stroke="#E60000"
                  strokeWidth="6"
                  aria-hidden="true"
                />

                <foreignObject
                  x={x + 32}
                  y={y + 30}
                  width="536"
                  height="196"
                >
                  <div className="flex h-full flex-col">
                    <h2 className="font-[var(--font-mono)] text-[22px] font-semibold leading-normal tracking-[0.045em] text-[#000000]">
                      {item.label}
                    </h2>

                    <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]">
                      {item.body}
                    </p>
                  </div>
                </foreignObject>
              </g>
            );
          })}

          <g fill="#E60000" aria-hidden="true">
            <path d="M 212 634 L 203 648 L 221 648 Z" />
            <path d="M 380 314 L 371 328 L 389 328 Z" />
            <rect x="39" y="699" width="10" height="10" />
            <rect x="207" y="379" width="10" height="10" />
          </g>
        </svg>
      </div>
    </section>
  );
}