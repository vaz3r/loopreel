import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CoverCopy = {
  kicker: string;
  headline: string;
  subheadline: string;
  issueBadge: string;
  telemetry?: Array<{
    badge: string;
    label: string;
  }>;
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cover = slide as unknown as CoverCopy;
  const words = (cover.headline ?? '').split(/\s+/);
  const headlineLines = [
    words.slice(0, 2).join(' '),
    words.slice(2, 3).join(' '),
    words.slice(3, 5).join(' '),
    words.slice(5).join(' '),
  ];
  const telemetry = (cover.telemetry ?? []).slice(0, 2);

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 flex-col gap-7">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[14px] w-[14px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] leading-[1.4] tracking-[0.16em] text-[var(--accent)] uppercase">
            {cover.kicker}
          </p>
        </div>

        <div className="h-px w-full bg-[var(--border)]" />

        <h1 className="font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
          {headlineLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="max-w-[800px] font-[var(--font-body)] text-[28px] leading-snug">
          {cover.subheadline}
        </p>
      </div>

      <div className="my-8 flex min-h-0 flex-1 items-center justify-center">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 600 750"
          preserveAspectRatio="xMidYMid meet"
          className="h-full max-h-[750px] w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* A single fractured monument, not an explanatory diagram. */}
          <path
            d="M40 40H80M40 40V80M560 40H520M560 40V80"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Slight displacement makes the upper shaft feel unstable. */}
          <g transform="rotate(-5 300 405)">
            <path
              d="M183 85H417V116H400V139H200V116H183Z"
              fill="var(--ink)"
            />
            <path
              d="M216 139H384L375 392L347 419L315 397L285 433L251 409L225 430Z"
              fill="var(--ink)"
            />

            <path
              d="M243 160L248 394M272 160L275 408M301 160V389M330 160L326 390M359 160L351 396"
              fill="none"
              stroke="var(--paper)"
              strokeOpacity="0.2"
              strokeWidth="5"
            />

            <path
              d="M204 117H396"
              fill="none"
              stroke="var(--paper)"
              strokeOpacity="0.3"
              strokeWidth="3"
            />
          </g>

          {/* The orange rupture is the sole saturated pictorial gesture. */}
          <path
            d="M211 445L245 422L280 447L313 414L346 438L380 413L373 449L346 468L313 445L281 478L246 454L218 474Z"
            fill="var(--accent)"
          />
          <path
            d="M395 442L412 453L394 467Z"
            fill="var(--accent)"
          />
          <path
            d="M194 474L206 482L191 492Z"
            fill="var(--accent)"
          />

          {/* Lower remnant and broad, dark architectural plinth. */}
          <path
            d="M222 494L250 474L281 496L314 465L346 489L373 471L382 608H214Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinejoin="miter"
          />
          <path
            d="M247 505L242 594M275 516L272 594M303 496V594M331 513L334 594M358 500L365 594"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.15"
            strokeWidth="3"
          />

          <path
            d="M196 608H400V634H424V664H172V634H196Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M144 664H452V700H144Z"
            fill="var(--surface)"
          />
          <path
            d="M172 664H424M196 634H400"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <path
            d="M40 701H560"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M144 701H240"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-7">
        <div className="grid grid-cols-2 gap-6">
          {telemetry.map((item, index) => (
            <div
              key={`${item.badge}-${index}`}
              className={
                index === 0
                  ? 'min-w-0'
                  : 'min-w-0 border-l border-[var(--border)] pl-8'
              }
            >
              <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.05em]">
                {item.badge}
              </p>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-5">
          <p className="shrink-0 font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.12em] text-[var(--accent)]">
            {cover.issueBadge}
          </p>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
          <span
            aria-hidden="true"
            className="h-[10px] w-[10px] shrink-0 bg-[var(--accent)]"
          />
        </div>
      </div>
    </section>
  );
}