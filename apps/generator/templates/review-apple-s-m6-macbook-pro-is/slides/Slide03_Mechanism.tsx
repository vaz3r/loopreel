import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Comparison = {
  tag: string;
  title: string;
  description: string;
};

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const content = slide as unknown as {
    headline: string;
    left: Comparison;
    right: Comparison;
  };

  const id = React.useId().replace(/:/g, '');

  return (
    <section className="flex h-full min-h-0 flex-col gap-10 text-[var(--ink)]">
      <h1 className="max-w-[870px] shrink-0 font-[var(--font-headline)] text-[68px] font-semibold leading-[1.02] tracking-[-0.045em]">
        {content.headline}
      </h1>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-6">
        {/* Pro: illuminated display and an exposed active-cooling mechanism. */}
        <article className="flex min-h-0 flex-col overflow-hidden border border-[var(--border)] border-t-[3px] border-t-[var(--accent)] bg-[var(--surface)]">
          <div className="px-7 pt-7">
            <p className="font-[var(--font-mono)] text-[17px] font-medium tracking-[0.17em] text-[var(--accent)]">
              {content.left.tag}
            </p>
          </div>

          <div className="flex min-h-0 flex-1 items-center px-3 py-5">
            <svg
              viewBox="0 0 420 330"
              fill="none"
              aria-hidden="true"
              className="max-h-[340px] w-full"
            >
              <defs>
                <linearGradient
                  id={`${id}-pro-screen`}
                  x1="75"
                  y1="35"
                  x2="345"
                  y2="205"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--accent)" stopOpacity=".95" />
                  <stop offset=".52" stopColor="var(--accent)" stopOpacity=".3" />
                  <stop offset="1" stopColor="var(--accent)" stopOpacity=".06" />
                </linearGradient>
                <pattern
                  id={`${id}-led-grid`}
                  width="13"
                  height="13"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="1.15"
                    fill="var(--ink)"
                    opacity=".42"
                  />
                </pattern>
                <clipPath id={`${id}-pro-clip`}>
                  <rect x="55" y="32" width="310" height="179" rx="4" />
                </clipPath>
              </defs>

              <path
                d="M21 246H399M210 12V321"
                stroke="var(--border)"
                strokeDasharray="3 7"
                opacity=".55"
              />

              <rect
                x="44"
                y="21"
                width="332"
                height="203"
                rx="13"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity=".65"
                strokeWidth="1.5"
              />
              <g clipPath={`url(#${id}-pro-clip)`}>
                <rect
                  x="55"
                  y="32"
                  width="310"
                  height="179"
                  fill={`url(#${id}-pro-screen)`}
                />
                <rect
                  x="55"
                  y="32"
                  width="310"
                  height="179"
                  fill={`url(#${id}-led-grid)`}
                />
                <path
                  d="M45 194C109 186 124 61 197 63S281 179 378 53"
                  stroke="var(--ink)"
                  strokeOpacity=".7"
                  strokeWidth="2"
                />
                <path
                  d="M45 209C116 200 135 87 204 87S290 201 378 80"
                  stroke="var(--ink)"
                  strokeOpacity=".25"
                />
              </g>
              <path
                d="M187 32H233V39C233 43 230 46 226 46H194C190 46 187 43 187 39V32Z"
                fill="var(--surface)"
              />

              <path
                d="M44 225H376L400 248V254C400 259 396 263 391 263H29C24 263 20 259 20 254V248L44 225Z"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity=".65"
                strokeWidth="1.5"
              />
              <path d="M21 248H399" stroke="var(--border)" />
              <path
                d="M177 248H243L238 253H182L177 248Z"
                fill="var(--border)"
              />

              <path
                d="M121 263V287H155M299 263V287H265"
                stroke="var(--accent)"
                strokeOpacity=".65"
                strokeDasharray="3 5"
              />

              <g transform="translate(210 287)">
                <circle r="31" fill="var(--surface)" stroke="var(--accent)" />
                <circle r="24" stroke="var(--accent)" strokeOpacity=".25" />
                {Array.from({ length: 8 }, (_, i) => (
                  <path
                    key={i}
                    d="M4-7C8-20 19-22 22-14C24-7 15-2 8-1Z"
                    transform={`rotate(${i * 45})`}
                    fill="var(--accent)"
                    fillOpacity=".7"
                  />
                ))}
                <circle
                  r="6"
                  fill="var(--surface)"
                  stroke="var(--accent)"
                />
              </g>

              <g
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M163 280H131C117 280 115 298 101 298H72" />
                <path d="M163 292H143C128 292 130 310 113 310H85" opacity=".5" />
                <path d="M257 280H289C303 280 305 298 319 298H348" />
                <path d="M257 292H277C292 292 290 310 307 310H335" opacity=".5" />
                <path d="M78 294L72 298L78 302M342 294L348 298L342 302" />
              </g>
            </svg>
          </div>

          <div className="mx-7 border-t border-[var(--border)] pb-8 pt-6">
            <h2 className="min-h-[132px] font-[var(--font-headline)] text-[40px] font-semibold leading-[1.08] tracking-[-0.035em]">
              {content.left.title}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[26px] leading-[1.4] tracking-[-0.015em]">
              {content.left.description}
            </p>
          </div>
        </article>

        {/* Air: a restrained screen and a thin, uninterrupted chassis profile. */}
        <article className="flex min-h-0 flex-col overflow-hidden border border-[var(--border)] border-t-[3px] bg-[var(--surface)]">
          <div className="px-7 pt-7">
            <p className="font-[var(--font-mono)] text-[17px] font-medium tracking-[0.17em]">
              {content.right.tag}
            </p>
          </div>

          <div className="flex min-h-0 flex-1 items-center px-3 py-5">
            <svg
              viewBox="0 0 420 330"
              fill="none"
              aria-hidden="true"
              className="max-h-[340px] w-full"
            >
              <defs>
                <linearGradient
                  id={`${id}-air-screen`}
                  x1="76"
                  y1="49"
                  x2="344"
                  y2="205"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="var(--ink)" stopOpacity=".18" />
                  <stop offset="1" stopColor="var(--ink)" stopOpacity=".025" />
                </linearGradient>
                <clipPath id={`${id}-air-clip`}>
                  <rect x="63" y="43" width="294" height="168" rx="4" />
                </clipPath>
              </defs>

              <path
                d="M21 246H399M210 12V321"
                stroke="var(--border)"
                strokeDasharray="3 7"
                opacity=".55"
              />

              <rect
                x="53"
                y="33"
                width="314"
                height="190"
                rx="11"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity=".55"
                strokeWidth="1.5"
              />
              <g clipPath={`url(#${id}-air-clip)`}>
                <rect
                  x="63"
                  y="43"
                  width="294"
                  height="168"
                  fill={`url(#${id}-air-screen)`}
                />
                <path
                  d="M52 185C122 185 138 83 205 83S289 172 367 74"
                  stroke="var(--ink)"
                  strokeOpacity=".38"
                  strokeWidth="1.5"
                />
                <path
                  d="M52 201C128 201 146 106 212 106S295 194 367 99"
                  stroke="var(--ink)"
                  strokeOpacity=".15"
                />
              </g>
              <path
                d="M189 43H231V49C231 53 228 56 224 56H196C192 56 189 53 189 49V43Z"
                fill="var(--surface)"
              />

              <path
                d="M53 224H367L396 247H24L53 224Z"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity=".55"
                strokeWidth="1.5"
              />
              <path
                d="M24 247C25 251 29 253 34 253H386C391 253 395 251 396 247"
                stroke="var(--ink)"
                strokeOpacity=".55"
                strokeWidth="1.5"
              />
              <path d="M179 247H241" stroke="var(--ink)" strokeOpacity=".5" />

              <path
                d="M112 254V287M308 254V287"
                stroke="var(--border)"
                strokeDasharray="3 5"
              />
              <path
                d="M57 291H363L357 298H63L57 291Z"
                fill="var(--ink)"
                fillOpacity=".07"
                stroke="var(--ink)"
                strokeOpacity=".55"
                strokeWidth="1.5"
              />
              <path
                d="M78 302V310M342 302V310M78 306H342"
                stroke="var(--border)"
              />
              <circle cx="78" cy="306" r="2" fill="var(--border)" />
              <circle cx="342" cy="306" r="2" fill="var(--border)" />
            </svg>
          </div>

          <div className="mx-7 border-t border-[var(--border)] pb-8 pt-6">
            <h2 className="min-h-[132px] font-[var(--font-headline)] text-[40px] font-semibold leading-[1.08] tracking-[-0.035em]">
              {content.right.title}
            </h2>
            <p className="mt-5 font-[var(--font-body)] text-[26px] leading-[1.4] tracking-[-0.015em]">
              {content.right.description}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}