import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type VerdictContent = {
  headline: string;
  avoid: {
    tag: string;
    title: string;
    points: string[];
  };
  fit: {
    tag: string;
    title: string;
    points: string[];
  };
};

function VerdictGraphic({ positive }: { positive: boolean }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      className="h-[120px] w-[200px]"
      aria-hidden="true"
    >
      <path
        d="M0 20H200M0 60H200M0 100H200M20 0V120M60 0V120M100 0V120M140 0V120M180 0V120"
        stroke="var(--border)"
        strokeOpacity=".4"
      />

      {positive ? (
        <>
          <path
            d="M28 36H86L114 60H170M28 84H86L114 60"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <rect
            x="15"
            y="23"
            width="26"
            height="26"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="28"
            cy="84"
            r="13"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="153"
            cy="60"
            r="29"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="m140 60 9 9 18-19"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="square"
          />
          <path
            d="M121 20H187V100H121"
            stroke="var(--border)"
            strokeDasharray="3 5"
          />
        </>
      ) : (
        <>
          <path
            d="m100 12 36 14 15 35-15 35-36 14-36-14-15-35 15-35Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity=".65"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="61"
            r="25"
            stroke="var(--ink)"
            strokeOpacity=".35"
            strokeWidth="2"
          />
          <path
            d="m60 102 80-82"
            stroke="var(--surface)"
            strokeWidth="13"
          />
          <path
            d="m60 102 80-82"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M16 61H37M163 61H184"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as VerdictContent;
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col text-[var(--ink)]">
      <div className="mb-8 shrink-0">
        <div className="mb-5 flex items-center gap-3" aria-hidden="true">
          <span className="h-[5px] w-16 bg-[var(--accent)]" />
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span className="h-[7px] w-[7px] bg-[var(--accent)]" />
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.045em]">
          {content.headline}
        </h1>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[0.87fr_1.13fr] gap-5">
        {[
          { ...content.avoid, positive: false },
          { ...content.fit, positive: true },
        ].map((group) => (
          <article
            key={group.tag}
            className={`relative grid min-h-0 grid-cols-[220px_minmax(0,1fr)] gap-7 border bg-[var(--surface)] px-7 py-6 ${
              group.positive
                ? 'border-[var(--accent)]'
                : 'border-[var(--border)]'
            }`}
          >
            {group.positive && (
              <span
                className="absolute bottom-0 left-0 top-0 w-[4px] bg-[var(--accent)]"
                aria-hidden="true"
              />
            )}

            <div className="flex min-w-0 flex-col items-start border-r border-[var(--border)] pr-5">
              <p
                className={`font-[var(--font-mono)] text-[13px] font-medium leading-5 tracking-[0.13em] ${
                  group.positive
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--ink)] opacity-65'
                }`}
              >
                {group.tag}
              </p>

              <h2 className="mt-4 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.08] tracking-[-0.035em]">
                {group.title}
              </h2>

              <div className="my-auto pt-5">
                <VerdictGraphic positive={group.positive} />
              </div>
            </div>

            <ul
              className="grid min-h-0 min-w-0"
              style={{
                gridTemplateRows: `repeat(${group.points.length}, minmax(0, 1fr))`,
              }}
            >
              {group.points.map((point, index) => (
                <li
                  key={point}
                  className={`flex min-w-0 items-center gap-4 py-3 ${
                    index > 0 ? 'border-t border-[var(--border)]' : ''
                  }`}
                >
                  <span className="flex w-4 shrink-0 items-center justify-center">
                    {group.positive ? (
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        className="h-4 w-4 text-[var(--accent)]"
                        aria-hidden="true"
                      >
                        <path
                          d="m2 8 4 4 8-8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="square"
                        />
                      </svg>
                    ) : (
                      <span
                        className="h-[2px] w-3 bg-[var(--ink)] opacity-50"
                        aria-hidden="true"
                      />
                    )}
                  </span>

                  <p className="min-w-0 font-[var(--font-body)] text-[23px] font-normal leading-[1.32] tracking-[-0.015em]">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}