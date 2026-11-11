import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = [
    {
      title: '12 CPU cores',
      body: 'Two top-performance super cores, four performance cores, and six high-efficiency cores.',
    },
    {
      title: 'Graphics and neural processing',
      body: '12 GPU cores and 32 NPU cores.',
    },
    {
      title: 'Ports, both sides',
      body: 'Three Thunderbolt 4 ports, MagSafe, HDMI, headphone jack, and SD card reader.',
    },
    {
      title: 'Sustained workloads',
      body: 'Active cooling fans; USB-C charging from either side.',
    },
  ];

  const fan = (cx: number, cy: number) => (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r="68" fill="var(--surface)" stroke="var(--border)" />
      <circle r="57" fill="none" stroke="var(--ink)" strokeOpacity=".16" />
      {Array.from({ length: 18 }, (_, i) => (
        <path
          key={i}
          d="M 17 -8 C 29 -29 46 -34 53 -20 C 37 -23 29 -8 23 6 Z"
          transform={`rotate(${i * 20})`}
          fill="var(--ink)"
          fillOpacity=".65"
        />
      ))}
      <circle r="21" fill="var(--surface)" stroke="var(--border)" />
      <circle r="5" fill="var(--accent)" />
    </g>
  );

  return (
    <section className="flex h-[1028px] w-full min-w-0 flex-col justify-between text-[var(--ink)]">
      <header className="border-t-2 border-[var(--ink)] pt-6">
        <h2 className="max-w-[850px] font-[var(--font-headline)] text-[48px] font-semibold leading-[1.04] tracking-[-0.045em]">
          New Silicon Inside
          <br />
          A Familiar Shell
        </h2>
        <p className="mt-5 max-w-[760px] font-[var(--font-body)] text-[22px] leading-[1.4]">
          The design dates to 2021. The M6 brings more cores and active
          cooling.
        </p>
      </header>

      <div className="relative h-[340px] shrink-0">
        <svg
          viewBox="0 0 952 340"
          className="block h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {/* Exterior silhouette and exposed internal architecture. */}
          <rect
            x="64"
            y="18"
            width="824"
            height="298"
            rx="33"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <rect
            x="80"
            y="34"
            width="792"
            height="266"
            rx="22"
            stroke="var(--border)"
          />

          {/* Rear ventilation slots. */}
          {Array.from({ length: 48 }, (_, i) => (
            <path
              key={i}
              d={`M ${150 + i * 14} 45 v 13`}
              stroke="var(--ink)"
              strokeOpacity=".3"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}

          {/* Thermal paths run behind the processor. */}
          <path
            d="M 253 142 H 358 V 94 H 594 V 142 H 699"
            stroke="var(--ink)"
            strokeOpacity=".13"
            strokeWidth="24"
            strokeLinejoin="round"
          />
          <path
            d="M 253 142 H 358 V 94 H 594 V 142 H 699"
            stroke="var(--ink)"
            strokeOpacity=".45"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {fan(252, 155)}
          {fan(700, 155)}

          {/* Logic board and processor package. */}
          <rect
            x="365"
            y="74"
            width="222"
            height="182"
            rx="12"
            fill="var(--surface)"
            stroke="var(--border)"
          />
          {Array.from({ length: 10 }, (_, i) => (
            <g key={i} stroke="var(--ink)" strokeOpacity=".35">
              <path d={`M ${413 + i * 14} 86 v 15`} />
              <path d={`M ${413 + i * 14} 229 v 15`} />
            </g>
          ))}
          <rect
            x="398"
            y="101"
            width="156"
            height="128"
            rx="5"
            fill="var(--accent)"
            fillOpacity=".06"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Twelve CPU cores: two, four, and six. */}
          {[0, 1].map((i) => (
            <rect
              key={`super-${i}`}
              x={410 + i * 68}
              y="113"
              width="64"
              height="32"
              rx="2"
              fill="var(--accent)"
            />
          ))}
          {Array.from({ length: 4 }, (_, i) => (
            <rect
              key={`performance-${i}`}
              x={410 + i * 34}
              y="151"
              width="30"
              height="30"
              rx="2"
              fill="var(--accent)"
              fillOpacity=".55"
            />
          ))}
          {Array.from({ length: 6 }, (_, i) => (
            <rect
              key={`efficiency-${i}`}
              x={410 + i * 22.67}
              y="187"
              width="18.67"
              height="30"
              rx="2"
              fill="var(--accent)"
              fillOpacity=".2"
              stroke="var(--accent)"
              strokeOpacity=".4"
            />
          ))}

          {/* Power and I/O connections. */}
          <g
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          >
            <path d="M 80 248 H 341 V 209 H 389" />
            <path d="M 872 248 H 611 V 209 H 563" />
          </g>
          <g fill="var(--accent)">
            <circle cx="80" cy="248" r="3" />
            <circle cx="872" cy="248" r="3" />
          </g>

          {/* Port apertures on both edges. */}
          <g fill="var(--ink)">
            <rect x="60" y="94" width="8" height="32" rx="3" />
            <rect x="60" y="144" width="8" height="22" rx="3" />
            <rect x="60" y="182" width="8" height="22" rx="3" />
            <rect x="60" y="221" width="8" height="10" rx="4" />
            <rect x="884" y="94" width="8" height="37" rx="2" />
            <rect x="884" y="150" width="8" height="22" rx="3" />
            <rect x="884" y="193" width="8" height="47" rx="1" />
          </g>

          <path
            d="M 112 277 H 840"
            stroke="var(--border)"
            strokeWidth="1"
          />
          {[112, 840].map((x) => (
            <g key={x} stroke="var(--border)">
              <circle cx={x} cy="81" r="4" />
              <path d={`M ${x - 2} 81 h 4`} />
              <circle cx={x} cy="270" r="4" />
              <path d={`M ${x - 2} 270 h 4`} />
            </g>
          ))}
        </svg>
      </div>

      <div className="grid h-[384px] shrink-0 grid-cols-2 grid-rows-2 gap-4">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="relative min-w-0 border border-[var(--border)] bg-[var(--surface)] px-6 py-5"
          >
            <div
              className="mb-4 flex h-3 items-center gap-1.5"
              aria-hidden="true"
            >
              {Array.from({ length: 4 }, (_, marker) => (
                <span
                  key={marker}
                  className={`h-1.5 ${
                    marker === index
                      ? 'w-7 bg-[var(--accent)]'
                      : 'w-1.5 bg-[var(--border)]'
                  }`}
                />
              ))}
            </div>
            <h3 className="max-w-[380px] font-[var(--font-headline)] text-[25px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {card.title}
            </h3>
            <p className="mt-3 font-[var(--font-body)] text-[18px] leading-snug">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}