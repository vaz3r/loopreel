import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = [
    {
      title: 'Shared AI Pilot',
      body: 'Cloud processing works alongside device cameras, specialized vision models and on-device sensors.',
    },
    {
      title: 'Drone routes and schedules',
      body: 'Described for Amazon Ring Protect subscribers; subscription pricing is not stated.',
    },
    {
      title: 'Drone alert response',
      body: 'Ring camera, sensor or alarm notifications can trigger automatic set-route flights.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col items-start">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[10px] w-[10px] bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] leading-[30px] tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.06] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-7 max-w-[850px] font-[var(--font-body)] text-[28px] leading-[1.4]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-12 h-[1050px] w-full shrink-0">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 1050"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {/* A shared dependency spine, not a data-transfer timeline. */}
          <path
            d="M42 64V986"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M30 64H54M30 986H54"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {[175, 525, 875].map((y) => (
            <g key={y}>
              <path
                d={`M42 ${y}H108M224 ${y}H260`}
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <circle
                cx="42"
                cy={y}
                r="11"
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              <circle
                cx="42"
                cy={y}
                r="4"
                fill="var(--accent)"
              />
              <circle
                cx="166"
                cy={y}
                r="72"
                stroke="var(--border)"
                strokeWidth="2"
                strokeDasharray="3 9"
              />
              <circle
                cx="166"
                cy={y}
                r="58"
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <path
                d={`M254 ${y - 6}L260 ${y}L254 ${y + 6}`}
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}

          {/* Shared processing: cloud and camera coexist without upload arrows. */}
          <g
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M148 160H187C195 160 199 155 199 149C199 142 194 138 187 138C185 128 177 123 168 125C161 126 156 131 155 138C147 137 141 142 141 149C141 155 144 160 148 160Z" />
            <path d="M140 181H150L155 175H170L175 181H185V208H140Z" />
            <circle cx="163" cy="194" r="8" />
          </g>
          <path
            d="M127 170H133M198 177H204M194 192H200"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Subscription access paired with a schematic route. */}
          <g
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M138 545H166C177 545 177 528 166 528H152C140 528 140 510 152 510H177"
              stroke="var(--accent)"
            />
            <circle
              cx="138"
              cy="545"
              r="5"
              fill="var(--surface)"
              stroke="var(--accent)"
            />
            <rect
              x="176"
              y="505"
              width="24"
              height="22"
              rx="3"
              stroke="var(--ink)"
            />
            <path
              d="M182 505V499C182 491 194 491 194 499V505"
              stroke="var(--ink)"
            />
            <path d="M188 514V518" stroke="var(--ink)" />
          </g>

          {/* A notification cue connects to a predefined patrol route. */}
          <g
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="134"
              y="847"
              width="33"
              height="24"
              rx="4"
              stroke="var(--ink)"
            />
            <circle
              cx="150.5"
              cy="859"
              r="6"
              stroke="var(--ink)"
            />
            <path
              d="M174 847C180 850 183 855 183 861M179 840C189 845 194 852 194 862"
              stroke="var(--accent)"
            />
            <path
              d="M140 889H188V913H156V901"
              stroke="var(--accent)"
            />
            <circle
              cx="140"
              cy="889"
              r="5"
              fill="var(--surface)"
              stroke="var(--accent)"
            />
            <path
              d="M150 907L156 901L162 907"
              stroke="var(--accent)"
            />
          </g>

          <path
            d="M284 350H952M284 700H952"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </svg>

        <div className="relative grid h-full grid-rows-3 pl-[284px]">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex min-h-0 flex-col justify-center pr-3"
            >
              <h2 className="max-w-[640px] font-[var(--font-headline)] text-[36px] font-semibold leading-[1.16] tracking-[-0.025em]">
                {item.title}
              </h2>
              <p className="mt-5 max-w-[610px] font-[var(--font-body)] text-[28px] leading-[1.45]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}