import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({ slide }: SlideComponentProps) {
  const cards = slide.cards ?? [];
  const metrics = slide.metrics ?? [];

  const milestones = [
    { card: cards[0], metric: metrics[0], fractured: false },
    { card: cards[1], metric: metrics[1], fractured: false },
    { card: cards[2], metric: metrics[2], fractured: true },
  ];

  const bandHeight = 736 / 3;
  const nodeY = [52, 52 + bandHeight, 52 + bandHeight * 2] as const;
  const [firstNodeY, secondNodeY, finalNodeY] = nodeY;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-7">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[2px] w-12 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-10 h-[1120px] shrink-0 border-y border-[var(--border)]">
        {/* Shared milestone coordinates: 32-unit margins, three equal bands.
            The SVG is a shipping-lane spine, not a set of callout leaders. */}
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 450 800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <g stroke="var(--border)" strokeWidth="1">
            <path
              d="M24 32V768 M40 32V768"
              vectorEffect="non-scaling-stroke"
            />
            {[32 + bandHeight, 32 + bandHeight * 2].map((y) => (
              <path
                key={y}
                d={`M76 ${y}H418`}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>

          <g
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="square"
          >
            <path
              d={`M32 32V${firstNodeY} M32 ${firstNodeY}V${secondNodeY}`}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={`M32 ${secondNodeY}V${finalNodeY - 72}`}
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <g
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path
              d={`M32 ${finalNodeY - 72}
                  V${finalNodeY - 52}
                  L26 ${finalNodeY - 42}
                  L36 ${finalNodeY - 31}`}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={`M29 ${finalNodeY - 20}
                  L35 ${finalNodeY - 12}
                  L32 ${finalNodeY}
                  V768`}
              vectorEffect="non-scaling-stroke"
              strokeDasharray="9 10"
            />
          </g>

          {nodeY.map((y, index) => (
            <g key={index}>
              <rect
                x="26"
                y={y - 7}
                width="12"
                height="14"
                fill="var(--surface)"
                stroke={index === 2 ? 'var(--accent)' : 'var(--ink)'}
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x="30"
                y={y - 3}
                width="4"
                height="6"
                fill={index === 2 ? 'var(--accent)' : 'var(--ink)'}
              />
            </g>
          ))}

          {/* A single vessel accompanies only the final milestone. */}
          <g
            transform={`translate(48 ${finalNodeY + 34})`}
            fill="var(--accent)"
          >
            <path d="M-8 0H9L6 8H-5Z" />
            <path d="M-5-5H4V0H-5Z M-2-10H2V-5H-2Z" />
            <path
              d="M-9 14H9 M-6 20H6"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        <div className="relative grid h-full grid-rows-3 py-[44.8px] pl-[160px] pr-[68px]">
          {milestones.map(({ card, metric, fractured }, index) => (
            <article
              key={index}
              className="flex min-h-0 flex-col items-start gap-5"
            >
              <div
                className={`inline-flex h-[56px] shrink-0 items-center border px-5 font-[var(--font-mono)] text-[32px] font-semibold leading-none tracking-[-0.035em] ${
                  fractured
                    ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--surface)]'
                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--ink)]'
                }`}
              >
                {metric?.value}
              </div>

              <p
                className={`font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.035em] ${
                  fractured ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                }`}
              >
                {metric?.label}
              </p>

              <div className="flex flex-col gap-3">
                <h2
                  className={`font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em] ${
                    fractured ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                  }`}
                >
                  {card?.title}
                </h2>

                <p className="max-w-[700px] font-[var(--font-body)] text-[26px] leading-snug">
                  {card?.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}