import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const tiers = [
    {
      title: 'Amazon’s promise',
      body: (
        <>
          Both devices:{' '}
          <span className="font-semibold text-[var(--accent)]">
            Throw Away the Key Encryption
          </span>
          , introduced September 2026.
        </>
      ),
    },
    {
      title: 'EFF’s assessment',
      body: (
        <>
          The protection remains{' '}
          <span className="font-semibold text-[var(--ink)]">
            well short of end-to-end encryption.
          </span>
        </>
      ),
    },
    {
      title: 'Rover cloud retention',
      body: (
        <>
          Doorbell rings, motion, Live View: videos stored for{' '}
          <span className="font-semibold text-[var(--accent)]">
            up to 180 days.
          </span>
        </>
      ),
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-8">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col border-t-2 border-[var(--accent)]">
        {tiers.map((tier, index) => (
          <article
            key={tier.title}
            className="grid min-h-[208px] flex-1 grid-cols-[204px_minmax(0,1fr)] items-center gap-8 border-b border-[var(--border)] py-6"
          >
            <div className="relative flex h-[160px] items-center justify-center">
              <svg
                viewBox="0 0 204 160"
                className="h-[160px] w-[204px] text-[var(--accent)]"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                {/* Editorial cutaway planes; intentionally not a data-flow diagram. */}
                <path
                  d="M10 112 83 144 193 117"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <path
                  d="M10 122 83 154 193 127"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <path
                  d="M10 103 83 135 193 108"
                  stroke="currentColor"
                  strokeWidth="2"
                  opacity="0.45"
                />
                <path
                  d="M12 19V9H29M175 9H192V19"
                  stroke="var(--border)"
                  strokeWidth="2"
                />

                {index === 0 && (
                  <>
                    <path
                      d="M102 17 148 34V70C148 97 129 115 102 128 75 115 56 97 56 70V34L102 17Z"
                      fill="var(--surface)"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M102 30 135 43V70C135 88 123 102 102 114"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.45"
                    />
                    <path
                      d="M84 69V59C84 49 92 42 102 42S120 49 120 59V69"
                      stroke="var(--ink)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <rect
                      x="78"
                      y="69"
                      width="48"
                      height="34"
                      rx="3"
                      stroke="var(--ink)"
                      strokeWidth="3"
                    />
                    <circle cx="102" cy="83" r="4" fill="currentColor" />
                    <path
                      d="M102 87V94"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </>
                )}

                {index === 1 && (
                  <>
                    <path
                      d="M75 30H49V116H75M129 30H155V116H129"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="square"
                    />
                    <path
                      d="M72 53H132M72 73H116M72 93H125"
                      stroke="var(--ink)"
                      strokeWidth="3"
                    />
                    <path
                      d="M136 73H145"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <path
                      d="M88 18H116M88 128H116"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                  </>
                )}

                {index === 2 && (
                  <>
                    <path
                      d="M65 88H145C161 88 172 77 172 63 172 48 160 37 145 38 138 22 121 15 105 21 93 25 85 35 82 47 68 42 53 50 50 63 47 76 54 88 65 88Z"
                      fill="var(--surface)"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="69"
                      y="73"
                      width="70"
                      height="48"
                      rx="2"
                      fill="var(--surface)"
                      stroke="var(--ink)"
                      strokeWidth="3"
                    />
                    <path
                      d="M66 73H142V86H66Z"
                      fill="var(--surface)"
                      stroke="var(--ink)"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M94 99H114"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </>
                )}
              </svg>
            </div>

            <div className="min-w-0 pr-6">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {tier.title}
              </h2>
              <p className="mt-4 max-w-[650px] font-[var(--font-body)] text-[28px] leading-snug">
                {tier.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}