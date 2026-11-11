import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide12({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 flex-col justify-center text-[var(--ink)]">
      <div className="flex min-h-0 flex-col gap-9">
        <div className="flex items-center gap-4" aria-hidden="true">
          <span className="h-3 w-3 bg-[var(--accent)]" />
          <span className="h-px w-24 bg-[var(--border)]" />
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[96px] font-semibold leading-[0.98] tracking-[-0.065em]">
          {slide.headline}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[32px] leading-[1.4] tracking-[-0.02em]">
          {slide.body}
        </p>

        <div className="relative h-[300px] shrink-0 overflow-hidden border-y border-[var(--border)] bg-[var(--surface)]">
          <svg
            viewBox="0 0 952 300"
            fill="none"
            className="h-full w-full"
            aria-hidden="true"
          >
            {/* Quiet engineering grid. */}
            <g stroke="var(--border)" strokeWidth="1" opacity="0.45">
              {[76, 156, 236, 316, 396, 476, 556, 636, 716, 796, 876].map(
                (x) => (
                  <path key={`vertical-${x}`} d={`M${x} 0V300`} />
                ),
              )}
              {[30, 90, 150, 210, 270].map((y) => (
                <path key={`horizontal-${y}`} d={`M0 ${y}H952`} />
              ))}
            </g>

            {/* Routed connections converge on a single compute package. */}
            <g
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M0 66H174L222 114H354" />
              <path d="M0 150H354" />
              <path d="M0 234H174L222 186H354" />
              <path d="M598 114H730L778 66H952" />
              <path d="M598 150H952" />
              <path d="M598 186H730L778 234H952" />
              <path d="M412 0V28L440 56" />
              <path d="M540 0V28L512 56" />
              <path d="M440 244L412 272V300" />
              <path d="M512 244L540 272V300" />
            </g>

            <g stroke="var(--accent)" strokeWidth="2">
              <path d="M76 150H268L298 120H354" />
              <path d="M598 180H654L684 150H876" />
              <circle cx="76" cy="150" r="5" fill="var(--surface)" />
              <circle cx="876" cy="150" r="5" fill="var(--surface)" />
            </g>

            {/* Package perimeter and contact pins. */}
            <rect
              x="354"
              y="56"
              width="244"
              height="188"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <g stroke="var(--ink)" strokeWidth="3" opacity="0.4">
              {[386, 416, 446, 476, 506, 536, 566].map((x) => (
                <React.Fragment key={`pin-x-${x}`}>
                  <path d={`M${x} 44V56`} />
                  <path d={`M${x} 244V256`} />
                </React.Fragment>
              ))}
              {[84, 114, 144, 174, 204, 234].map((y) => (
                <React.Fragment key={`pin-y-${y}`}>
                  <path d={`M342 ${y}H354`} />
                  <path d={`M598 ${y}H610`} />
                </React.Fragment>
              ))}
            </g>

            {/* Silicon die: deliberate asymmetry, no decorative labels. */}
            <rect
              x="380"
              y="82"
              width="192"
              height="136"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <g stroke="var(--accent)" strokeWidth="1" opacity="0.5">
              <path d="M392 94H480V154H392Z" />
              <path d="M392 166H480V206H392Z" />
              <path d="M492 94H560V126H492Z" />
              <path d="M492 138H560V206H492Z" />
              <path d="M414 94V154M436 94V154M458 94V154" />
              <path d="M392 114H480M392 134H480" />
              <path d="M508 138V206M524 138V206M540 138V206" />
              <path d="M392 186H480" />
            </g>
            <rect
              x="492"
              y="94"
              width="68"
              height="32"
              fill="var(--accent)"
            />

            {/* Measurement brackets keep the visual in benchmark territory. */}
            <g stroke="var(--ink)" strokeWidth="1.5" opacity="0.7">
              <path d="M326 96V28H394" />
              <path d="M558 28H626V96" />
              <path d="M326 204V272H394" />
              <path d="M558 272H626V204" />
            </g>
          </svg>
        </div>

        <div className="flex items-center gap-7 pt-2">
          <div className="flex h-[78px] w-[78px] shrink-0 items-center justify-center bg-[var(--accent)] text-[var(--surface)]">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              className="h-11 w-11"
              aria-hidden="true"
            >
              <path
                d="M10 24H37M25 12L37 24L25 36"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
          </div>

          <p className="font-[var(--font-headline)] text-[46px] font-medium leading-[1.1] tracking-[-0.04em]">
            {slide.cta}
          </p>
        </div>
      </div>
    </section>
  );
}