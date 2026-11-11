import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function HardwareIllustration({ pro }: { pro: boolean }) {
  return (
    <svg
      viewBox="0 0 400 380"
      className="w-full text-[var(--ink)]"
      fill="none"
      aria-hidden="true"
    >
      {/* Display enclosure */}
      <rect
        x="32"
        y="24"
        width="336"
        height="218"
        rx="13"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        x="43"
        y="35"
        width="314"
        height="195"
        rx="5"
        fill="var(--paper, #F5F5F7)"
        stroke="var(--border)"
      />

      {pro ? (
        <>
          {/* Discrete illuminated zones */}
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: 15 }, (_, column) => {
              const distance = Math.hypot(column - 7, row - 4);
              return (
                <rect
                  key={`${row}-${column}`}
                  x={54 + column * 20}
                  y={46 + row * 20}
                  width="13"
                  height="13"
                  rx="2"
                  fill="var(--accent)"
                  opacity={distance < 3 ? 0.9 : distance < 5 ? 0.4 : 0.12}
                />
              );
            })
          )}
        </>
      ) : (
        <>
          {/* Continuous display field */}
          <rect
            x="54"
            y="46"
            width="292"
            height="173"
            rx="2"
            fill="var(--border)"
            opacity="0.4"
          />
          {Array.from({ length: 8 }, (_, index) => (
            <path
              key={index}
              d={`M54 ${61 + index * 20} H346`}
              stroke="var(--paper, #F5F5F7)"
              strokeWidth="2"
            />
          ))}
          <path
            d="M75 183 L143 115 L196 159 L277 78 L326 113"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.45"
          />
        </>
      )}

      <path
        d="M174 35 H226 V43 Q226 49 220 49 H180 Q174 49 174 43 Z"
        fill="currentColor"
      />

      {/* Fold and tapered chassis */}
      <path
        d="M32 242 L12 260 H388 L368 242"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 260 Q18 270 34 270 H366 Q382 270 388 260"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M166 249 H234" stroke="var(--border)" strokeWidth="3" />

      {/* Cooling-system detail */}
      <path
        d="M84 280 V296 M316 280 V296"
        stroke="var(--border)"
        strokeWidth="2"
        strokeDasharray="3 5"
      />

      {pro ? (
        <>
          <rect
            x="51"
            y="306"
            width="298"
            height="64"
            rx="14"
            fill="var(--paper, #F5F5F7)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M122 331 H278 M122 345 H278"
            stroke="var(--accent)"
            strokeWidth="3"
            opacity="0.65"
          />
          {[93, 307].map((cx) => (
            <g key={cx} transform={`translate(${cx} 338)`}>
              <circle
                r="25"
                fill="var(--surface)"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {Array.from({ length: 8 }, (_, index) => (
                <path
                  key={index}
                  d="M4 -5 C8 -20 18 -20 19 -10 C15 -7 11 -4 6 -2 Z"
                  transform={`rotate(${index * 45})`}
                  fill="var(--accent)"
                  opacity="0.85"
                />
              ))}
              <circle r="6" fill="currentColor" />
            </g>
          ))}
        </>
      ) : (
        <>
          <rect
            x="51"
            y="327"
            width="298"
            height="18"
            rx="9"
            fill="var(--paper, #F5F5F7)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M72 336 H328"
            stroke="var(--border)"
            strokeWidth="2"
          />
          {[106, 200, 294].map((x) => (
            <path
              key={x}
              d={`M${x} 317 C${x - 11} 307 ${x + 11} 304 ${x} 294`}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.45"
            />
          ))}
        </>
      )}
    </svg>
  );
}

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 h-[5px] w-20 bg-[var(--accent)]" />

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          The Pro Still Has
          <br />
          Distinctions
        </h1>

        <p className="mt-6 max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          Display technology and cooling separate it from the MacBook Air.
        </p>
      </header>

      <div className="mt-10 grid min-h-0 flex-1 grid-cols-2 gap-6">
        <article className="flex min-w-0 flex-col border border-[var(--border)] border-t-[4px] border-t-[var(--accent)] bg-[var(--surface)] px-7 py-6">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.035em]">
            M6 MacBook Pro
          </h2>

          <div className="mt-6 shrink-0">
            <HardwareIllustration pro />
          </div>

          <div className="mt-auto border-t border-[var(--border)] pt-6">
            <p className="font-[var(--font-body)] text-[28px] leading-snug">
              14.2-inch mini LED;{' '}
              <span className="text-[var(--accent)]">
                120 Hz ProMotion;
              </span>{' '}
              active cooling fans.
            </p>
          </div>
        </article>

        <article className="flex min-w-0 flex-col border border-[var(--border)] border-t-[4px] border-t-[var(--ink)] px-7 py-6">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.035em]">
            MacBook Air
          </h2>

          <div className="mt-6 shrink-0">
            <HardwareIllustration pro={false} />
          </div>

          <div className="mt-auto border-t border-[var(--border)] pt-6">
            <p className="font-[var(--font-body)] text-[28px] leading-snug">
              13.6- and 15.3-inch IPS displays; 60 Hz; fanless cooling.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}