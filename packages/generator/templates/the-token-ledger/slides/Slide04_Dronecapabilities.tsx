import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  // A 235-unit sector, centered upward: −164° to −16° = 148°.
  const cx = 350;
  const cy = 330;
  const radius = 235;
  const radians = (degrees: number) => (degrees * Math.PI) / 180;
  const leftX = cx + radius * Math.cos(radians(-164));
  const rightX = cx + radius * Math.cos(radians(-16));
  const edgeY = cy + radius * Math.sin(radians(-164));
  const fieldOfView = [
    `M ${cx} ${cy}`,
    `L ${leftX} ${edgeY}`,
    `A ${radius} ${radius} 0 0 1 ${rightX} ${edgeY}`,
    'Z',
  ].join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-3 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-4 max-w-[900px] font-[var(--font-body)] text-[26px] leading-[34px]">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-6 shrink-0">
        <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-10">
          Camera
        </h2>
        <p className="mt-1 font-[var(--font-body)] text-[24px] leading-8">
          2K video, 148-degree field of view and 360-degree camera rotation.
        </p>
      </div>

      <div className="relative h-[450px] w-full shrink-0">
        <svg
          viewBox="0 0 952 450"
          className="block h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          {/* Open optical field, geometrically distinct from rotation. */}
          <path
            d={fieldOfView}
            fill="var(--accent)"
            fillOpacity="0.08"
          />
          <path
            d={`M ${leftX} ${edgeY} A ${radius} ${radius} 0 0 1 ${rightX} ${edgeY}`}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d={`M ${leftX} ${edgeY} L ${cx} ${cy} L ${rightX} ${edgeY}`}
            stroke="var(--accent)"
            strokeWidth="2"
            strokeOpacity="0.65"
          />
          <path
            d="M 350 95 V 133 M 350 198 V 242"
            stroke="var(--accent)"
            strokeOpacity="0.45"
            strokeWidth="1.5"
            strokeDasharray="5 7"
          />

          <text
            x="350"
            y="180"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[38px] font-semibold"
          >
            148°
          </text>

          {/* Sparse viewfinder corners keep the schematic open. */}
          <path
            d="M 112 122 V 94 H 140 M 560 94 H 588 V 122
               M 112 374 V 402 H 140 M 560 402 H 588 V 374"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Camera housing and optical axis. */}
          <path
            d="M 292 296 H 316 L 325 281 H 375 L 384 296 H 408
               V 366 H 292 Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle
            cx="350"
            cy="330"
            r="31"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle
            cx="350"
            cy="330"
            r="19"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <circle cx="350" cy="330" r="5" fill="var(--accent)" />
          <path
            d="M 350 291 V 299 M 350 361 V 369
               M 311 330 H 319 M 381 330 H 389"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <circle cx="397" cy="308" r="3" fill="var(--ink)" />

          {/* Independent circular arrow denotes movement, not capture. */}
          <path
            d="M 399.33 259.55 A 86 86 0 1 1 320.59 249.19"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 307 246 L 321 249 L 313 261"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="350"
            y="445"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            360°
          </text>

          {/* Exactly two illumination marks, with a perimeter leader. */}
          <path
            d="M 436 330 H 524"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {[552, 600].map((x) => (
            <g key={x}>
              <circle
                cx={x}
                cy="330"
                r="11"
                fill="var(--accent)"
                fillOpacity="0.16"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <circle cx={x} cy="330" r="4" fill="var(--accent)" />
              <path
                d={`M ${x} 307 V 301
                    M ${x - 17} 313 L ${x - 22} 308
                    M ${x + 17} 313 L ${x + 22} 308`}
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ))}
          <path
            d="M 620 330 H 642 V 278 H 658"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
        </svg>

        <aside className="absolute left-[674px] top-[244px] w-[278px]">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[36px]">
            Low-light illumination
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-8">
            Two LED lights activate in low-light conditions.
          </p>
        </aside>
      </div>

      <div className="mt-5 flex shrink-0 items-start gap-7 border-t border-[var(--border)] pt-5">
        {/* Empty, unscaled battery outline: no charge or endurance gauge. */}
        <svg
          viewBox="0 0 100 64"
          className="mt-2 h-[64px] w-[100px] shrink-0 text-[var(--accent)]"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M 5 10 H 83 V 54 H 5 Z
               M 83 24 H 94 V 40 H 83"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>

        <div className="min-w-0 flex-1">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-10">
            Flight time
          </h2>
          <p className="mt-2 font-[var(--font-body)] text-[26px] leading-[34px]">
            <span className="font-semibold text-[var(--accent)]">
              8 minutes
            </span>{' '}
            on a new, fully-charged battery under controlled conditions.
          </p>
        </div>
      </div>
    </section>
  );
}