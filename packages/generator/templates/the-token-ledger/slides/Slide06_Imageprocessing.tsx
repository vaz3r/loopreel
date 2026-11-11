import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <svg
        viewBox="0 0 952 440"
        className="mt-7 block h-[440px] w-full shrink-0"
        role="img"
        aria-label="Conceptual illustration of an image with dimension brackets being resized before inference."
      >
        <rect width="952" height="440" fill="#EAF2EC" />

        <text
          x="0"
          y="32"
          fill="var(--ink, #291D35)"
          className="font-[var(--font-mono)] text-[20px] tracking-[0.08em]"
        >
          Conceptual
        </text>

        {/* Unnumbered dimension brackets. */}
        <g
          fill="none"
          stroke="var(--ink, #291D35)"
          strokeWidth="2"
          strokeLinecap="square"
        >
          <path d="M80 98 V82 H400 V98" />
          <path d="M62 124 H46 V364 H62" />
        </g>

        {/* Input image: generous landscape geometry. */}
        <rect
          x="80"
          y="124"
          width="320"
          height="240"
          fill="var(--surface, #DCE8DF)"
          stroke="var(--ink, #291D35)"
          strokeWidth="3"
        />
        <circle
          cx="326"
          cy="183"
          r="22"
          fill="none"
          stroke="var(--ink, #291D35)"
          strokeWidth="3"
        />
        <path
          d="M80 327 L174 220 L249 296 L294 252 L400 345"
          fill="none"
          stroke="var(--ink, #291D35)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M80 327 L174 220 L249 296 L294 252 L400 345 V364 H80 Z"
          fill="var(--ink, #291D35)"
          fillOpacity="0.055"
        />

        {/* Resizing transformation. */}
        <g
          fill="none"
          stroke="var(--accent, #6534BC)"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M456 244 H588" />
          <path d="M566 222 L588 244 L566 266" />
        </g>

        {/* Output image: the same composition at a different size. */}
        <rect
          x="650"
          y="158.5"
          width="228"
          height="171"
          fill="var(--surface, #DCE8DF)"
          stroke="var(--ink, #291D35)"
          strokeWidth="3"
        />
        <circle
          cx="825.275"
          cy="200.5375"
          r="15.675"
          fill="none"
          stroke="var(--ink, #291D35)"
          strokeWidth="3"
        />
        <path
          d="M650 303.1375 L716.975 226.9 L770.4125 281.05 L802.475 249.7 L878 315.9625"
          fill="none"
          stroke="var(--ink, #291D35)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M650 303.1375 L716.975 226.9 L770.4125 281.05 L802.475 249.7 L878 315.9625 V329.5 H650 Z"
          fill="var(--ink, #291D35)"
          fillOpacity="0.055"
        />

        {/* Fine pointers connect each image to its caption. */}
        <g
          fill="none"
          stroke="var(--border, #A4B5A9)"
          strokeWidth="2"
        >
          <path d="M240 382 V420 H0" />
          <path d="M764 348 V420 H504" />
        </g>
        <g fill="var(--accent, #6534BC)">
          <circle cx="240" cy="382" r="4" />
          <circle cx="764" cy="348" r="4" />
        </g>
      </svg>

      <div className="mt-5 grid shrink-0 grid-cols-2 gap-14">
        <div>
          <h2 className="border-b-2 border-[var(--accent)] pb-4 font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
            Dimension-based estimate
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Image token usage can be estimated from image dimensions.
          </p>
        </div>

        <div>
          <h2 className="border-b-2 border-[var(--accent)] pb-4 font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
            Automatic resizing
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Images are automatically resized before inference.
          </p>
        </div>
      </div>
    </section>
  );
}