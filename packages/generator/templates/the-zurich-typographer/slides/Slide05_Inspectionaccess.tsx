import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const titleId = React.useId();
  const diagramId = React.useId();

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex items-center gap-5">
        <span
          aria-hidden="true"
          className="h-[4px] w-[48px] shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-wider">
          {slide.kicker}
        </p>
      </div>

      <h2
        id={titleId}
        className="mt-9 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]"
      >
        {slide.headline}
      </h2>

      <p className="mt-7 max-w-[810px] font-[var(--font-body)] text-[28px] leading-snug">
        {slide.subheadline}
      </p>

      <figure
        aria-labelledby={titleId}
        className="m-0 mt-12 w-full shrink-0 border-y border-[var(--border)] bg-[var(--surface)] py-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 960"
          role="img"
          aria-labelledby={diagramId}
          className="block h-auto w-full"
        >
          <title id={diagramId}>
            IAEA access: denied at bombed nuclear facilities; allowed at
            unaffected facilities.
          </title>

          {/* A single inspector connects to exactly two inspection lanes. */}
          <g
            fill="none"
            stroke="#000000"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path d="M 137 526 H 194" />
            <path d="M 194 310 V 755" />
            <path d="M 194 310 H 680" />
            <path d="M 194 755 H 900" />
          </g>

          <circle cx="194" cy="526" r="7" fill="#000000" />

          <text
            x="28"
            y="537"
            fill="#000000"
            className="font-[var(--font-mono)] text-[32px] font-bold"
          >
            IAEA
          </text>

          {/* Upper lane: access stops at the closed gate. */}
          <text
            x="242"
            y="140"
            fill="currentColor"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            {slide.items?.[0]?.title}
          </text>

          <text
            x="242"
            y="190"
            fill="currentColor"
            className="font-[var(--font-body)] text-[28px]"
          >
            {slide.items?.[0]?.body}
          </text>

          <path
            d="M 680 214 V 247"
            fill="none"
            stroke="#E60000"
            strokeWidth="2"
          />

          <rect
            x="750"
            y="250"
            width="150"
            height="120"
            fill="#F5F5F5"
            stroke="#000000"
            strokeWidth="2"
          />

          <g fill="none" stroke="#E60000" strokeLinecap="square">
            <path d="M 680 260 V 360" strokeWidth="8" />
            <path d="M 663 260 H 697 M 663 360 H 697" strokeWidth="4" />
          </g>

          {/* Lower lane: the gate is open and the path continues through. */}
          <text
            x="242"
            y="568"
            fill="currentColor"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            {slide.items?.[1]?.title}
          </text>

          <text
            x="242"
            y="618"
            fill="currentColor"
            className="font-[var(--font-body)] text-[28px]"
          >
            <tspan x="242" dy="0">
              Iran allowed IAEA access to all
            </tspan>
            <tspan x="242" dy="38">
              unaffected facilities.
            </tspan>
          </text>

          <path
            d="M 750 695 H 900 V 815 H 750 V 777 M 750 733 V 695"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
          />

          <g fill="none" stroke="#000000" strokeLinecap="square">
            <path d="M 680 705 V 724 M 680 786 V 805" strokeWidth="6" />
            <path d="M 680 705 L 721 674" strokeWidth="6" />
            <path d="M 880 741 L 900 755 L 880 769" strokeWidth="3" />
          </g>
        </svg>
      </figure>
    </section>
  );
}