import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const id = React.useId().replace(/:/g, '');
  void brand;
  void totalSlides;

  const cards = [
    {
      title: 'GPU memory',
      body: '13.4 TB HBM3E; 576 TB/s memory bandwidth.',
    },
    {
      title: 'NVLink',
      body: '130 TB/s bandwidth across the rack-scale interconnect.',
    },
  ];

  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-10 text-[var(--ink)]">
      <div className="shrink-0 border-t border-[var(--border)] pt-7">
        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[76px] font-semibold leading-[0.98] tracking-[-0.055em]">
          {slide.title}
        </h1>
        <p className="mt-7 max-w-[850px] font-[var(--font-body)] text-[29px] leading-[1.38] tracking-[-0.015em]">
          {slide.body}
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.18fr_0.82fr] gap-9">
        <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-[3px] border border-[var(--border)] bg-[var(--surface)]">
          <svg
            viewBox="0 0 500 720"
            preserveAspectRatio="xMidYMid meet"
            className="h-full max-h-[750px] w-full"
            role="img"
            aria-labelledby={`${id}-title`}
          >
            <title id={`${id}-title`}>
              Original rack schematic; highlight GPU interconnects and cooling
              paths.
            </title>

            <defs>
              <pattern
                id={`${id}-grid`}
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M24 0H0V24"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="0.6"
                  opacity="0.35"
                />
              </pattern>
              <linearGradient
                id={`${id}-metal`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="var(--border)" stopOpacity="0.5" />
                <stop offset="45%" stopColor="var(--surface)" />
                <stop offset="100%" stopColor="var(--border)" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            <rect width="500" height="720" fill={`url(#${id}-grid)`} />

            {/* Fine registration marks frame the original vector drawing. */}
            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1"
              opacity="0.35"
            >
              <path d="M24 40h16M32 32v16M460 40h16M468 32v16" />
              <path d="M24 680h16M32 672v16M460 680h16M468 672v16" />
            </g>

            {/* Cabinet depth and front elevation. */}
            <path
              d="M116 59L139 40H395V638L372 660V59Z"
              fill={`url(#${id}-metal)`}
              stroke="var(--border)"
              strokeWidth="2"
            />
            <rect
              x="105"
              y="59"
              width="267"
              height="601"
              rx="5"
              fill="var(--paper, #090D10)"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <rect
              x="121"
              y="79"
              width="235"
              height="562"
              rx="2"
              fill="var(--surface)"
              stroke="var(--border)"
            />

            {/* Mounting rails and fasteners. */}
            <g stroke="var(--border)" fill="none">
              <path d="M131 88v542M346 88v542" strokeWidth="3" />
              {Array.from({ length: 25 }, (_, row) => (
                <g key={`mount-${row}`}>
                  <circle cx="113" cy={93 + row * 22} r="1.5" />
                  <circle cx="364" cy={93 + row * 22} r="1.5" />
                </g>
              ))}
            </g>

            {/* Paired liquid paths run outside the compute chassis. */}
            <g
              fill="none"
              stroke="var(--accent)"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M149 98H76V610Q76 630 96 630H149"
                strokeWidth="6"
              />
              <path
                d="M330 98H422V610Q422 630 402 630H330"
                strokeWidth="6"
                opacity="0.38"
              />
              <path
                d="M330 98H422V610Q422 630 402 630H330"
                strokeWidth="1.5"
                strokeDasharray="5 8"
              />
            </g>

            {/* Compute trays: four highlighted GPU packages per tray. */}
            {Array.from({ length: 18 }, (_, row) => {
              const y = 108 + row * 23;
              return (
                <g key={`tray-${row}`}>
                  <rect
                    x="141"
                    y={y}
                    width="195"
                    height="18"
                    rx="2"
                    fill="var(--paper, #090D10)"
                    stroke="var(--border)"
                  />
                  <path
                    d={`M76 ${y + 9}H141M336 ${y + 9}H422`}
                    stroke="var(--accent)"
                    strokeWidth="1.25"
                    opacity={row % 3 === 0 ? 0.75 : 0.22}
                  />
                  {[155, 194, 233, 272].map((x, gpu) => (
                    <g key={`gpu-${gpu}`}>
                      <rect
                        x={x}
                        y={y + 4}
                        width="24"
                        height="10"
                        rx="1"
                        fill="var(--accent)"
                        fillOpacity={row % 3 === 0 ? 0.8 : 0.3}
                        stroke="var(--accent)"
                        strokeOpacity="0.7"
                        strokeWidth="0.7"
                      />
                      {gpu < 3 && (
                        <path
                          d={`M${x + 24} ${y + 9}h15`}
                          stroke="var(--accent)"
                          strokeWidth="1.5"
                        />
                      )}
                    </g>
                  ))}
                  <rect
                    x="311"
                    y={y + 4}
                    width="6"
                    height="4"
                    fill="var(--ink)"
                    opacity="0.45"
                  />
                  <rect
                    x="311"
                    y={y + 10}
                    width="6"
                    height="4"
                    fill="var(--ink)"
                    opacity="0.45"
                  />
                </g>
              );
            })}

            {/* Interconnect fabric converges below the compute trays. */}
            <g fill="none" stroke="var(--accent)" strokeWidth="1.2">
              {[167, 206, 245, 284].map((x, index) => (
                <path
                  key={`fabric-${x}`}
                  d={`M${x} 522V${536 + index * 5}H${195 + index * 27}V568`}
                  opacity={0.85 - index * 0.12}
                />
              ))}
            </g>

            <rect
              x="149"
              y="568"
              width="179"
              height="36"
              rx="3"
              fill="var(--accent)"
              fillOpacity="0.08"
              stroke="var(--accent)"
              strokeOpacity="0.65"
            />
            {Array.from({ length: 12 }, (_, port) => (
              <rect
                key={`port-${port}`}
                x={159 + port * 13}
                y="580"
                width="7"
                height="12"
                rx="1"
                fill="var(--accent)"
                opacity={port % 3 === 0 ? 0.95 : 0.4}
              />
            ))}

            <g fill="var(--accent)">
              <path d="M71 276l5 9 5-9Z" />
              <path d="M71 460l5 9 5-9Z" />
              <path d="M417 285l5-9 5 9Z" />
              <path d="M417 469l5-9 5 9Z" />
            </g>

            <g fill="var(--surface)" stroke="var(--border)" strokeWidth="2">
              <rect x="119" y="660" width="38" height="12" rx="2" />
              <rect x="320" y="660" width="38" height="12" rx="2" />
            </g>

            <path
              d="M105 692H395"
              stroke="var(--border)"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div className="flex min-h-0 flex-col justify-center gap-12 py-8">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className="border-t border-[var(--border)] pt-7"
            >
              <svg
                viewBox="0 0 72 48"
                className="mb-7 h-12 w-[72px] text-[var(--accent)]"
                fill="none"
                aria-hidden="true"
              >
                {index === 0 ? (
                  <g stroke="currentColor" strokeWidth="1.5">
                    <path d="M10 12L36 2L62 12L36 22Z" />
                    <path d="M10 20L36 30L62 20" />
                    <path d="M10 28L36 38L62 28" />
                    <path d="M10 36L36 46L62 36" />
                    <path d="M10 12v24M62 12v24M36 22v24" opacity="0.4" />
                  </g>
                ) : (
                  <g stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 12H59M13 36H59M13 12L59 36M13 36L59 12" />
                    <path d="M13 12V36M59 12V36" opacity="0.45" />
                    {[
                      [13, 12],
                      [59, 12],
                      [13, 36],
                      [59, 36],
                    ].map(([cx, cy]) => (
                      <rect
                        key={`${cx}-${cy}`}
                        x={cx - 5}
                        y={cy - 5}
                        width="10"
                        height="10"
                        fill="var(--surface)"
                      />
                    ))}
                  </g>
                )}
              </svg>

              <h2 className="font-[var(--font-headline)] text-[37px] font-medium leading-[1.08] tracking-[-0.035em]">
                {card.title}
              </h2>
              <p className="mt-5 font-[var(--font-mono)] text-[27px] leading-[1.48] tracking-[-0.045em]">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}