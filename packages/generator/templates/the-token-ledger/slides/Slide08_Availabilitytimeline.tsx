import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col items-start">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[28px] leading-[38px]">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-8 h-[620px] w-full shrink-0">
        <svg
          viewBox="0 0 952 620"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {/* A shared horizon, not a progress or completion bar. */}
          <path
            d="M24 302H920"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Future cadence remains dashed on both sides of the markers. */}
          <path
            d="M24 302H224M242 302H686M722 302H900"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="8 10"
            opacity="0.7"
          />

          {/* Rover flag: above the horizon, with a folded outer edge. */}
          <path
            d="M0 16H440L426 64L440 112H0Z"
            fill="var(--surface)"
          />
          <path
            d="M1 16V112M0 112H440"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M224 266V285"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="224"
            cy="302"
            r="24"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx="224" cy="302" r="11" fill="var(--accent)" />

          {/* Drone flag: below the horizon; an open conditional marker. */}
          <circle
            cx="704"
            cy="302"
            r="15"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M704 319V354"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 6"
          />
          <path
            d="M488 354H928L914 402L928 450H488Z"
            fill="var(--surface)"
          />
          <path
            d="M489 354V450M488 450H928"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 5"
          />

          {/* Regulatory gate terminates the conditional segment. */}
          <path
            d="M900 278V326M916 278V326M900 278H916M900 326H916"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M901 292L915 280M901 307L915 295M901 322L915 310"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0.7"
          />
        </svg>

        <ol className="relative m-0 h-full list-none p-0">
          <li className="absolute left-0 top-[16px] w-[440px]">
            <div className="flex h-[96px] flex-col justify-center gap-1 px-6">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[42px] tracking-[-0.025em]">
                Ring Rover Cam
              </h2>
              <p className="font-[var(--font-mono)] text-[26px] leading-[34px] text-[var(--accent)]">
                <time dateTime="2026-12-16">December 16, 2026</time>
              </p>
            </div>

            <p className="mt-5 px-6 font-[var(--font-body)] text-[26px] leading-[35px]">
              Scheduled to start shipping; already available for preorder
              according to the article.
            </p>
          </li>

          <li className="absolute left-[488px] top-[354px] w-[440px]">
            <div className="flex h-[96px] flex-col justify-center gap-1 px-6">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[42px] tracking-[-0.025em]">
                Ring Drone Cam
              </h2>
              <p className="font-[var(--font-mono)] text-[26px] leading-[34px] text-[var(--accent)]">
                <time dateTime="2027-01-27">January 27, 2027</time>
              </p>
            </div>

            <p className="mt-5 px-6 font-[var(--font-body)] text-[26px] leading-[35px]">
              Amazon’s target remains subject to Federal Communications Commission
              authorization.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}