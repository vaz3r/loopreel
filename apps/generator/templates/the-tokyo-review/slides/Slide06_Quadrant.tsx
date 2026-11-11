import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Quadrant = {
  quadrant: string;
  title: string;
  body: string;
};

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline: string;
    quadrants: Quadrant[];
  };

  return (
    <section
      aria-label={content.headline}
      className="flex h-full min-h-0 flex-col gap-10 text-[var(--ink)]"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em]">
            Threshold typologies
          </span>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-tight">
          {content.headline}
        </h1>

        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-[var(--border)]" />
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] opacity-65">
            Weather protection × Social exposure
          </p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[40px_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)] gap-5">
        <div aria-hidden="true" />

        {['Private', 'Shared'].map((label) => (
          <div
            key={label}
            className="flex items-center justify-between border-b border-[var(--border)] px-1 pb-3"
          >
            <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.18em]">
              {label}
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
            />
          </div>
        ))}

        {['Sheltered', 'Exposed'].map((rowLabel, rowIndex) => (
          <React.Fragment key={rowLabel}>
            <div className="flex items-center justify-center border-r border-[var(--border)]">
              <span className="rotate-180 font-[var(--font-mono)] text-sm uppercase tracking-[0.2em] [writing-mode:vertical-rl]">
                {rowLabel}
              </span>
            </div>

            {content.quadrants
              .slice(rowIndex * 2, rowIndex * 2 + 2)
              .map((quadrant, columnIndex) => (
                <article
                  key={quadrant.quadrant}
                  className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm"
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-[var(--border)] px-3 py-1 font-[var(--font-mono)] text-sm font-bold tracking-wider text-[var(--accent)]">
                        {quadrant.quadrant}
                      </span>

                      <svg
                        aria-hidden="true"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M18 2V34M2 18H34"
                          stroke="var(--border)"
                          strokeWidth="1"
                        />
                        <rect
                          x={columnIndex === 0 ? 4 : 22}
                          y={rowIndex === 0 ? 4 : 22}
                          width="10"
                          height="10"
                          rx="2"
                          fill="var(--accent)"
                        />
                      </svg>
                    </div>

                    <h2 className="font-[var(--font-headline)] text-[30px] font-bold leading-[1.12] tracking-tight">
                      {quadrant.title}
                    </h2>
                  </div>

                  <div className="border-t border-[var(--border)] pt-5">
                    <p className="font-[var(--font-body)] text-[21px] leading-[1.5]">
                      <span className="mb-2 block font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
                        Design brief
                      </span>
                      {quadrant.body.replace(/^Design brief:\s*/i, '')}
                    </p>
                  </div>
                </article>
              ))}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}