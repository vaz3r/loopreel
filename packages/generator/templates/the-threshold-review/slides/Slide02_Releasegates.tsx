import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const releases = [
    {
      title: 'Ring Rover Cam',
      body: 'Already available for preorder; shipping scheduled to start December 16, 2026.',
      date: 'December 16, 2026',
      conditional: false,
    },
    {
      title: 'Ring Drone Cam',
      body: 'Amazon targets January 27, 2027, contingent on FCC authorization; email updates available.',
      date: 'January 27, 2027',
      conditional: true,
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-9 grid min-h-0 flex-1 grid-rows-2 gap-8">
        {releases.map((release) => (
          <article
            key={release.title}
            className="flex min-h-0 flex-col border-t border-[var(--border)] pt-5"
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className={
                  release.conditional
                    ? 'h-4 w-4 shrink-0 border-[3px] border-[var(--accent)]'
                    : 'h-4 w-4 shrink-0 bg-[var(--ink)]'
                }
              />

              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[44px] tracking-[-0.025em]">
                {release.title}
              </h2>
            </div>

            <p className="mt-3 max-w-[860px] font-[var(--font-body)] text-[26px] leading-snug">
              {release.body}
            </p>

            <div className="mt-auto pt-4">
              <svg
                viewBox="0 0 952 140"
                width="952"
                height="140"
                role="img"
                aria-label={`${release.title}: ${release.date}${
                  release.conditional
                    ? ', contingent on FCC authorization'
                    : ', scheduled shipping'
                }`}
                className="block h-[140px] w-full shrink-0"
              >
                <rect width="952" height="140" fill="#E7ECE5" />

                {/* Endpoint annotation sits entirely above its status rail. */}
                <rect
                  x="578"
                  y="0"
                  width="374"
                  height="68"
                  fill="var(--surface, #D6DFD5)"
                />
                <text
                  x="765"
                  y="43"
                  textAnchor="middle"
                  fill={
                    release.conditional
                      ? 'var(--accent, #9B254D)'
                      : 'var(--ink, #182923)'
                  }
                  className="font-[var(--font-mono)] text-[28px] font-semibold"
                >
                  {release.date}
                </text>

                <path
                  d="M765 68 V90"
                  fill="none"
                  stroke="var(--border, #A0AFA3)"
                  strokeWidth="2"
                />

                {/* Equal rail lengths encode status, not elapsed time. */}
                <path
                  d="M16 96 V128"
                  fill="none"
                  stroke="var(--ink, #182923)"
                  strokeWidth="3"
                />

                {release.conditional ? (
                  <>
                    <path
                      d="M16 112 H741"
                      fill="none"
                      stroke="var(--ink, #182923)"
                      strokeWidth="4"
                      strokeDasharray="15 12"
                    />

                    {/* Open brackets form the unresolved authorization gate. */}
                    <path
                      d="M755 92 H741 V132 H755 M775 92 H789 V132 H775"
                      fill="none"
                      stroke="var(--accent, #9B254D)"
                      strokeWidth="4"
                      strokeLinejoin="miter"
                    />
                  </>
                ) : (
                  <>
                    <path
                      d="M16 112 H765"
                      fill="none"
                      stroke="var(--ink, #182923)"
                      strokeWidth="5"
                    />
                    <rect
                      x="750"
                      y="97"
                      width="30"
                      height="30"
                      fill="var(--ink, #182923)"
                    />
                  </>
                )}
              </svg>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}