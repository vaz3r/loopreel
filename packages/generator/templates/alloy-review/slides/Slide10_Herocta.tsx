import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const uid = React.useId().replace(/:/g, '');
  const textureId = `${uid}-texture`;
  const glowId = `${uid}-glow`;

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex items-center gap-4" aria-hidden="true">
        <span className="h-[6px] w-20 bg-[var(--accent)]" />
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <header className="mt-8">
        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          {slide.headline}
        </h1>
        <p className="mt-6 max-w-[760px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-7 h-[300px] shrink-0">
        <svg
          viewBox="0 0 952 300"
          className="block h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={textureId}
              width="9"
              height="9"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="0.9"
                fill="var(--ink)"
                opacity="0.24"
              />
              <path
                d="M5 6L7 4"
                stroke="var(--ink)"
                strokeWidth="0.7"
                opacity="0.2"
              />
            </pattern>
            <linearGradient
              id={glowId}
              x1="230"
              y1="204"
              x2="674"
              y2="50"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--accent)" stopOpacity="0.04" />
              <stop offset="1" stopColor="var(--accent)" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <path
            d="M0 262H952M82 16V283M870 16V283"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M72 34H92M82 24V44M860 34H880M870 24V44"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />

          <rect
            x="172"
            y="18"
            width="608"
            height="224"
            rx="14"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <rect
            x="184"
            y="30"
            width="584"
            height="200"
            rx="5"
            fill={`url(#${glowId})`}
            stroke="var(--border)"
          />

          <path
            d="M184 179H768M184 130H768M184 81H768"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />

          <path
            d="M210 192C268 192 268 68 326 68S384 192 442 192 500 68 558 68 616 192 674 192 717 119 744 100"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M210 204C268 204 268 80 326 80S384 204 442 204 500 80 558 80 616 204 674 204 717 131 744 112"
            stroke="var(--accent)"
            strokeOpacity="0.22"
            strokeWidth="2"
          />

          <path
            d="M586 30H763Q768 30 768 35V225Q768 230 763 230H586Z"
            fill="var(--surface)"
            fillOpacity="0.5"
          />
          <path
            d="M586 30H763Q768 30 768 35V225Q768 230 763 230H586Z"
            fill={`url(#${textureId})`}
          />
          <path
            d="M586 30V230"
            stroke="var(--ink)"
            strokeOpacity="0.4"
            strokeDasharray="5 5"
          />

          <path
            d="M450 30H502V37Q502 43 496 43H456Q450 43 450 37Z"
            fill="var(--ink)"
          />

          <path
            d="M172 242H780L830 258V264Q830 272 818 272H134Q122 272 122 264V258L172 242Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M122 258H830M422 242L416 250H536L530 242"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          <circle cx="326" cy="68" r="8" fill="var(--accent)" />
          <circle
            cx="326"
            cy="68"
            r="16"
            stroke="var(--accent)"
            strokeOpacity="0.3"
          />
          <path
            d="M326 52V8H118M706 174H843V217"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <circle cx="118" cy="8" r="4" fill="var(--accent)" />
          <circle cx="843" cy="217" r="4" fill="var(--accent)" />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <article className="border-t-[4px] border-[var(--accent)] bg-[var(--surface)] px-7 py-6">
          <div className="mb-5 text-[var(--accent)]" aria-hidden="true">
            <svg
              viewBox="0 0 48 40"
              className="h-10 w-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M2 29H10L18 10L27 32L35 15H46" />
              <path d="M2 38H46" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
            The strongest reason
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            It remains Apple’s cheapest laptop route to{' '}
            <span className="font-semibold text-[var(--accent)]">
              120 Hz ProMotion.
            </span>
          </p>
        </article>

        <article className="border-t-[4px] border-[var(--border)] px-7 py-6">
          <div className="mb-5" aria-hidden="true">
            <svg
              viewBox="0 0 48 40"
              className="h-10 w-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="44" height="36" rx="2" />
              <path
                d="M8 11H10M18 11H20M28 11H30M38 11H40M12 20H14M22 20H24M32 20H34M8 29H10M18 29H20M28 29H30M38 29H40"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
            The optional extra
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            The nano-texture matte display finish adds{' '}
            <span className="font-[var(--font-mono)] font-bold">$150.</span>
          </p>
        </article>
      </div>
    </section>
  );
}