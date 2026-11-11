import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function HardwareIllustration({ pro }: { pro: boolean }) {
  return (
    <svg
      viewBox="0 0 416 244"
      className="h-[244px] w-full"
      fill="none"
      aria-hidden="true"
    >
      {/* Display enclosure */}
      <rect
        x={pro ? 47 : 39}
        y="16"
        width={pro ? 322 : 338}
        height="174"
        rx={pro ? 12 : 9}
        fill="var(--ink)"
      />
      <rect
        x={pro ? 54 : 45}
        y="23"
        width={pro ? 308 : 326}
        height="159"
        rx="6"
        fill="var(--surface)"
      />

      {pro ? (
        <>
          {/* Individually articulated illumination zones */}
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 12 }, (_, col) => (
              <rect
                key={`${row}-${col}`}
                x={59 + col * 25}
                y={28 + row * 25}
                width="23"
                height="23"
                rx="1"
                fill={
                  col >= 7 - Math.floor(row / 2)
                    ? 'var(--accent)'
                    : 'var(--ink)'
                }
                opacity={
                  col >= 7 - Math.floor(row / 2)
                    ? 0.45 + col * 0.045
                    : 0.08 + row * 0.025
                }
              />
            )),
          )}
          <path
            d="M183 23H233V30Q233 36 227 36H189Q183 36 183 30Z"
            fill="var(--ink)"
          />
        </>
      ) : (
        <>
          <path
            d="M45 145L188 23H270L83 182H45Z"
            fill="var(--border)"
            opacity=".65"
          />
          <path
            d="M125 182L312 23H371V65L233 182Z"
            fill="var(--ink)"
            opacity=".13"
          />
          <path
            d="M253 182L371 81V125L304 182Z"
            fill="var(--accent)"
            opacity=".7"
          />
          <path
            d="M185 23H231V29Q231 35 225 35H191Q185 35 185 29Z"
            fill="var(--ink)"
          />
        </>
      )}

      {/* Keyboard deck and front lip */}
      <path
        d={
          pro
            ? 'M47 190H369L397 204H19L47 190Z'
            : 'M39 190H377L401 202H15L39 190Z'
        }
        fill="var(--border)"
        stroke="var(--ink)"
        strokeWidth="1.2"
      />
      <path
        d={pro ? 'M19 204H397L388 211H28Z' : 'M15 202H401L390 206H26Z'}
        fill="var(--ink)"
      />
      <path
        d={pro ? 'M175 194H241L250 201H166Z' : 'M173 193H243L251 199H165Z'}
        stroke="var(--ink)"
        strokeOpacity=".35"
      />

      {/* Side elevation: thickness, ventilation, and ports */}
      {pro ? (
        <g>
          <path
            d="M48 225H368V237H59Q48 237 48 225Z"
            fill="var(--border)"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />
          <rect x="74" y="229" width="26" height="4" rx="1" fill="var(--ink)" />
          <rect x="111" y="229" width="16" height="4" rx="2" fill="var(--ink)" />
          <rect x="138" y="229" width="16" height="4" rx="2" fill="var(--ink)" />
          <circle cx="169" cy="231" r="2.5" fill="var(--ink)" />
          {Array.from({ length: 16 }, (_, i) => (
            <path
              key={i}
              d={`M${246 + i * 6} 228V234`}
              stroke="var(--ink)"
              strokeWidth="2"
            />
          ))}
        </g>
      ) : (
        <g>
          <path
            d="M39 228H377V234H64Q47 234 39 228Z"
            fill="var(--border)"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />
          <rect x="75" y="229.5" width="18" height="3" rx="1.5" fill="var(--ink)" />
          <rect x="106" y="229.5" width="14" height="3" rx="1.5" fill="var(--ink)" />
          <rect x="131" y="229.5" width="14" height="3" rx="1.5" fill="var(--ink)" />
        </g>
      )}
    </svg>
  );
}

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const sides = [
    {
      title: 'M6 MacBook Pro',
      pro: true,
      points: [
        '14.2 inches; Mini LED with local dimming; 120 Hz ProMotion.',
        'Maximum SDR brightness: 1,000 nits. HDR brightness: up to 1,600 nits.',
        'Active cooling, more ports, and a thicker, heavier chassis.',
      ],
    },
    {
      title: '13- and 15-inch MacBook Air',
      pro: false,
      points: [
        '13.6- and 15.3-inch displays; 60 Hz IPS screens.',
        'Fanless, thinner, and lighter, with fewer ports.',
        'Historically throttles sooner; keyboard and trackpad are broadly comparable.',
      ],
    },
  ];

  return (
    <section
      data-slide-id={slide.id}
      className="flex h-[1028px] w-full max-w-[952px] flex-col gap-8 text-[var(--ink)]"
    >
      <div className="shrink-0">
        <h1 className="max-w-[920px] font-[var(--font-headline)] text-5xl font-semibold leading-[1.08] tracking-[-0.045em]">
          The Pro’s Case Against The Air
        </h1>
        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[22px] leading-[1.45] tracking-[-0.015em]">
          Display, connectivity, and cooling distinguish the Pro—not a
          dramatically different keyboard or trackpad.
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-5">
        {sides.map((side) => (
          <article
            key={side.title}
            className={`relative flex min-w-0 flex-col border border-[var(--border)] px-6 py-5 ${
              side.pro ? 'bg-[var(--surface)]' : ''
            }`}
          >
            <div
              className={`absolute -top-px left-[-1px] right-[-1px] h-[4px] ${
                side.pro ? 'bg-[var(--accent)]' : 'bg-[var(--ink)]'
              }`}
            />

            <h2
              className={`flex h-[100px] shrink-0 items-start pt-2 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.035em] ${
                side.pro ? 'text-[var(--accent)]' : ''
              }`}
            >
              {side.title}
            </h2>

            <div className="-mx-2 shrink-0">
              <HardwareIllustration pro={side.pro} />
            </div>

            <ul className="mt-7 grid min-h-0 flex-1 grid-rows-3">
              {side.points.map((point, index) => (
                <li
                  key={point}
                  className="grid grid-cols-[20px_1fr] content-center items-start gap-3 border-t border-[var(--border)] py-4"
                >
                  <svg
                    viewBox="0 0 20 20"
                    className={`mt-[3px] h-5 w-5 ${
                      side.pro
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--ink)]'
                    }`}
                    fill="none"
                    aria-hidden="true"
                  >
                    {index === 0 ? (
                      <>
                        <rect
                          x="2"
                          y="3"
                          width="16"
                          height="11"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path d="M6 17H14M10 14V17" stroke="currentColor" />
                      </>
                    ) : index === 1 ? (
                      <>
                        <circle
                          cx="10"
                          cy="10"
                          r="5"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M10 1V3M10 17V19M1 10H3M17 10H19"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          d="M2 6L10 2L18 6L10 10Z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                        <path
                          d="M2 10L10 14L18 10M2 14L10 18L18 14"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                      </>
                    )}
                  </svg>

                  <p className="font-[var(--font-body)] text-lg leading-snug tracking-[-0.01em]">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}