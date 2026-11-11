import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-[26px] tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-[14px] font-[var(--font-headline)] text-[64px] font-bold leading-[66px] tracking-[-0.035em]">
          Autonomous Does Not
          <br />
          Mean Local Only
        </h1>

        <p className="mt-4 max-w-[880px] font-[var(--font-body)] text-[26px] leading-[34px]">
          {slide.subheadline}
        </p>
      </header>

      <svg
        viewBox="0 0 952 720"
        width="952"
        height="720"
        role="img"
        aria-label="AI Pilot connects cameras and sensors, vision models, and cloud processing. Connections indicate neither processing order nor model location."
        className="mt-5 h-[720px] w-full shrink-0"
      >
        {/* Open, undirected connections: no arrows or transfer payloads. */}
        <g
          fill="none"
          stroke="var(--ink)"
          strokeOpacity="0.28"
          strokeWidth="2"
        >
          <path d="M438 234 L258 416" />
          <path d="M514 234 L694 416" />
          <path d="M278 460 H674" />
        </g>

        <g
          fill="var(--surface)"
          stroke="var(--border)"
          strokeWidth="2"
        >
          <circle cx="476" cy="190" r="58" />
          <circle cx="220" cy="460" r="58" />
          <circle cx="732" cy="460" r="58" />
        </g>

        {/* Camera aperture. */}
        <g
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        >
          <circle cx="476" cy="190" r="35" />
          <path d="M463 168 L489 168 L502 190 L489 212 L463 212 L450 190 Z" />
          <path d="M463 168 L484 156" />
          <path d="M489 168 L509 179" />
          <path d="M502 190 L502 213" />
          <path d="M489 212 L468 224" />
          <path d="M463 212 L443 201" />
          <path d="M450 190 L450 167" />
        </g>
        <circle cx="476" cy="190" r="5" fill="var(--accent)" />

        <text
          x="476"
          y="38"
          textAnchor="middle"
          fill="var(--ink)"
          className="font-[var(--font-headline)] text-[34px] font-semibold"
        >
          Cameras And Sensors
        </text>
        <text
          textAnchor="middle"
          fill="var(--ink)"
          className="font-[var(--font-body)] text-[24px]"
        >
          <tspan x="476" y="80">AI Pilot uses cameras and</tspan>
          <tspan x="476" y="112">on-device sensors.</tspan>
        </text>

        {/* Central system label, deliberately separate from the links. */}
        <g
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
        >
          <path d="M385 330 H371 V376 H385" />
          <path d="M567 330 H581 V376 H567" />
        </g>
        <text
          x="476"
          y="365"
          textAnchor="middle"
          fill="var(--accent)"
          className="font-[var(--font-headline)] text-[36px] font-semibold"
        >
          AI Pilot
        </text>

        {/* Layered vision mesh: no implied physical location. */}
        <g
          fill="none"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <path d="M184 445 L220 424 L256 445 L220 466 Z" />
          <path d="M184 458 L220 479 L256 458" />
          <path d="M184 471 L220 492 L256 471" />
          <path d="M196 438 L232 459 M208 431 L244 452" />
          <path d="M196 452 L232 431 M208 459 L244 438" />
          <path d="M184 445 V471 M220 466 V492 M256 445 V471" />
        </g>
        <g fill="var(--accent)">
          <circle cx="220" cy="424" r="3.5" />
          <circle cx="184" cy="445" r="3.5" />
          <circle cx="256" cy="445" r="3.5" />
        </g>

        {/* Cloud outline: no upload symbols or content depiction. */}
        <path
          d="M710 481
             H756
             C769 481 778 472 778 460
             C778 449 770 441 759 440
             C755 426 743 420 731 424
             C721 426 715 434 713 443
             C702 440 691 448 691 460
             C691 472 699 481 710 481 Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          x="220"
          y="555"
          textAnchor="middle"
          fill="var(--ink)"
          className="font-[var(--font-headline)] text-[34px] font-semibold"
        >
          Vision Models
        </text>
        <text
          textAnchor="middle"
          fill="var(--ink)"
          className="font-[var(--font-body)] text-[24px]"
        >
          <tspan x="220" y="602">Specialized vision models support</tspan>
          <tspan x="220" y="636">autonomous route planning</tspan>
          <tspan x="220" y="670">and obstacle avoidance.</tspan>
        </text>

        <text
          x="732"
          y="555"
          textAnchor="middle"
          fill="var(--ink)"
          className="font-[var(--font-headline)] text-[34px] font-semibold"
        >
          Cloud Processing
        </text>
        <text
          textAnchor="middle"
          fill="var(--ink)"
          className="font-[var(--font-body)] text-[24px]"
        >
          <tspan x="732" y="602">Amazon explicitly includes cloud</tspan>
          <tspan x="732" y="636">processing; operation is</tspan>
          <tspan x="732" y="670">not local-only.</tspan>
        </text>
      </svg>
    </section>
  );
}