import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function MaterialIllustration({ variant }: { variant: number }) {
  return (
    <svg
      viewBox="0 0 330 204"
      className="h-[204px] w-[330px] shrink-0"
      fill="none"
      aria-hidden="true"
    >
      {/* Interrupted navigation trace: uncertainty, not impact. */}
      <path
        d="M18 112H60M74 112H92"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="18" cy="112" r="5" fill="var(--accent)" />

      {variant === 0 && (
        <>
          <path
            d="M100 151L230 151L300 181H170Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M100 151H230"
            stroke="var(--ink)"
            strokeOpacity=".65"
            strokeWidth="3"
          />
          <path
            d="M92 112L133 140M151 140L201 77M214 61L234 36"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M156 141L204 101M219 89L270 47"
            stroke="var(--accent)"
            strokeOpacity=".4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M142 162L176 178M191 174L207 181"
            stroke="var(--ink)"
            strokeOpacity=".18"
            strokeWidth="2"
          />
          <path
            d="M236 29V43M229 36H243"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="276"
            cy="42"
            r="5"
            stroke="var(--accent)"
            strokeOpacity=".4"
            strokeWidth="2"
          />
        </>
      )}

      {variant === 1 && (
        <>
          {/* Deliberately untextured wall. */}
          <rect
            x="137"
            y="29"
            width="153"
            height="146"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M92 112H108M119 112H124"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".5"
          />
          <path
            d="M122 47V18H151M276 18H305V47M305 157V186H276M151 186H122V157"
            stroke="var(--ink)"
            strokeOpacity=".25"
            strokeWidth="2"
          />
        </>
      )}

      {variant === 2 && (
        <>
          <path
            d="M143 44L254 24V158L143 179Z"
            stroke="var(--ink)"
            strokeOpacity=".55"
            strokeWidth="2"
          />
          <path
            d="M166 52L277 32V166L166 187Z"
            stroke="var(--accent)"
            strokeOpacity=".55"
            strokeWidth="2"
          />
          <path
            d="M92 112H116M131 112H146M173 112H183M205 112H222M249 112H265M288 112H312"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M188 73L209 53M200 86L229 58"
            stroke="var(--ink)"
            strokeOpacity=".2"
            strokeWidth="2"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const materials = [
    {
      title: 'Reflective Surfaces',
      body: 'Examples include polished marble or wet tile.',
    },
    {
      title: 'Featureless Walls',
      body: 'Blank matte walls without features may degrade navigation.',
    },
    {
      title: 'Transparent Surfaces',
      body: 'Amazon lists frameless glass and mirrors.',
    },
  ];

  return (
    <section
      data-slide-id={slide.id}
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
    >
      <header className="shrink-0 pb-8">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] font-medium leading-none tracking-[0.12em] text-[var(--accent)]">
            WHEN VISION STRUGGLES
          </p>
        </div>

        <h1 className="font-[var(--font-headline)] text-[62px] font-bold leading-[1.04] tracking-[-0.045em]">
          <span className="block">Ordinary Surfaces Can</span>
          <span className="block">Complicate Drone Navigation</span>
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-[1.35]">
          Amazon identifies three surface categories where navigation
          performance may degrade.
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-3 border-t border-[var(--border)]">
        {materials.map((material, index) => (
          <article
            key={material.title}
            className="relative grid min-h-0 grid-cols-[354px_minmax(0,1fr)] items-center gap-7 border-b border-[var(--border)] py-4"
          >
            <div className="flex items-center justify-center border-r border-[var(--border)] pr-6">
              <MaterialIllustration variant={index} />
            </div>

            <div className="min-w-0 pr-5">
              <div
                aria-hidden="true"
                className="mb-4 flex items-center gap-[6px]"
              >
                {[0, 1, 2].map((mark) => (
                  <span
                    key={mark}
                    className={`h-[3px] w-7 ${
                      mark === index
                        ? 'bg-[var(--accent)]'
                        : 'bg-[var(--border)]'
                    }`}
                  />
                ))}
              </div>

              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
                {material.title}
              </h2>

              <p className="mt-3 max-w-[510px] font-[var(--font-body)] text-[26px] leading-[1.35]">
                {material.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}