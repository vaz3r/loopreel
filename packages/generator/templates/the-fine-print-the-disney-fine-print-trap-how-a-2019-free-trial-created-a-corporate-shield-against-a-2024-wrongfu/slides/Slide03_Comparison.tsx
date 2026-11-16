import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const artId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-10 text-[var(--ink)]">
      <div className="flex h-full min-h-0 w-full flex-row gap-8">
        <div className="flex w-[420px] shrink-0 flex-col justify-between gap-10">
          <header className="shrink-0">
            <div className="mb-8 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 bg-[var(--accent)]"
              />
              <p className="font-[var(--font-headline)] text-[22px] font-bold leading-tight tracking-[0.08em]">
                THE COINBASE BOUNDARY
              </p>
            </div>

            <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
              Delegation Has a Judicial Boundary
            </h1>

            <p className="mt-7 font-[var(--font-body)] text-[24px] leading-snug">
              Coinbase, May 23, 2024: a unanimous Court addressed 2 agreements.
            </p>
          </header>

          <aside className="shrink-0 border-t-2 border-[var(--accent)] bg-[var(--surface)] px-6 py-7">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 shrink-0 bg-[var(--accent)]"
                />
                <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                  {item0?.label ?? 'Coinbase ruling'}
                </h2>
              </div>
              <p className="font-[var(--font-body)] text-[24px] leading-snug">
                {item0?.body ??
                  'A court decides which conflicting agreement governs.'}
              </p>
            </div>

            <div className="mt-7 border-t border-[var(--border)] pt-7">
              <h2 className="mb-4 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item1?.label ?? 'Disney distinction'}
              </h2>
              <p className="font-[var(--font-body)] text-[24px] leading-snug">
                {item1?.body ??
                  'It did not resolve estate-binding or restaurant injuries.'}
              </p>
            </div>
          </aside>
        </div>

        <div className="relative min-h-0 flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 952 460"
            preserveAspectRatio="none"
            role="img"
            aria-labelledby={`${artId}-title ${artId}-description`}
            className="block h-full w-full"
          >
            <title id={`${artId}-title`}>
              Two agreements meet a judicial boundary
            </title>
            <desc id={`${artId}-description`}>
              Two separate agreement nodes feed directional conduits into a
              monumental red judicial gate. A single pathway emerges below.
              This diagram illustrates the conflicting-agreement question, not
              estate-binding or restaurant injuries.
            </desc>

            {/* Geometry is proportioned for this tall split-column canvas. */}
            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="1"
            >
              <path
                d="M52 12V448M476 12V448M900 12V448"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M24 28H928M24 166H928M24 294H928M24 432H928"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Separate, conflicting agreement nodes. */}
            <g
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="miter"
            >
              <path
                d="M108 48H302L350 72V138H108Z"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M602 48H796L844 72V138H602Z"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            >
              <path
                d="M302 48V72H350M602 48H796V72H844"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M152 88H304M152 100H276M152 112H250"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M646 88H798M646 100H770M646 112H744"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* Accent flags mark the distinct inputs without extra copy. */}
            <path d="M108 35H184V43H108Z" fill="var(--accent)" />
            <path d="M602 35H678V43H602Z" fill="var(--accent)" />

            {/* Independent conduits converge only at the gate. */}
            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="miter"
            >
              <path
                d="M229 138V172L397 194V217"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M723 138V172L555 194V217"
                vectorEffect="non-scaling-stroke"
              />
            </g>
            <path
              d="M381 209L397 218L413 209ZM539 209L555 218L571 209Z"
              fill="var(--ink)"
            />

            {/* Architectural threshold: broad lintel, two substantial piers. */}
            <path
              d="M136 230H816V250H746V329H640V250H312V329H206V250H136Z"
              fill="var(--accent)"
            />
            <path
              d="M96 329H856"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />

            {/* A restrained architectural crown evokes a court. */}
            <path
              d="M136 225L476 195L816 225"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="miter"
              vectorEffect="non-scaling-stroke"
            />

            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            >
              <path
                d="M397 260H555M397 270H555M397 280H555"
                vectorEffect="non-scaling-stroke"
              />
            </g>

            {/* One pathway emerges from the judicial threshold. */}
            <path
              d="M476 292V383"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M451 374L476 389L501 374Z"
              fill="var(--accent)"
            />
            <ellipse
              cx="476"
              cy="409"
              rx="38"
              ry="10"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            >
              <path
                d="M52 12H100M52 12V24M852 12H900M900 12V24"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M52 436V448H100M852 448H900V436"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}