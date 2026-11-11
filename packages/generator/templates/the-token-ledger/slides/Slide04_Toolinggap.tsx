import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] tracking-wider text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure
        className="my-7 h-[440px] w-full shrink-0"
        aria-label="Demo tokenizer connected to an outlined zip package by a solid leader; Missing link connected by a broken leader."
      >
        <svg
          viewBox="0 0 952 440"
          width="952"
          height="440"
          className="block h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect width="952" height="440" fill="#EAF2EC" />

          {/* Technical registration marks around the central artifact. */}
          <g
            fill="none"
            stroke="var(--border, #A4B5A9)"
            strokeWidth="1.5"
          >
            <path d="M329 94V44H379 M573 44H623V94" />
            <path d="M329 346V396H379 M573 396H623V346" />
            <path d="M476 18V38 M476 402V422" />
            <path d="M309 220H329 M623 220H643" />
          </g>

          {/* Offset backing sheet exposes the archive's layered construction. */}
          <path
            d="M386 89H540L603 152V374H386Z"
            fill="var(--surface, #DCE8DF)"
            stroke="var(--border, #A4B5A9)"
            strokeWidth="2"
          />

          {/* Central zip-package silhouette and folded corner. */}
          <path
            d="M366 68H520L583 131V354H366Z"
            fill="#EAF2EC"
            stroke="var(--ink, #291D35)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M520 68V131H583"
            fill="var(--surface, #DCE8DF)"
            stroke="var(--ink, #291D35)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Zipper channel. */}
          <path
            d="M463 69V247 M483 69V247"
            fill="none"
            stroke="var(--border, #A4B5A9)"
            strokeWidth="1.5"
          />
          <g fill="var(--ink, #291D35)">
            {[88, 116, 144, 172, 200, 228].map((y) => (
              <React.Fragment key={y}>
                <rect x="463" y={y} width="12" height="10" />
                <rect x="473" y={y + 14} width="10" height="10" />
              </React.Fragment>
            ))}
          </g>

          {/* Archive zipper pull; accent identifies the access point. */}
          <rect
            x="456"
            y="253"
            width="34"
            height="57"
            rx="7"
            fill="var(--surface, #DCE8DF)"
            stroke="var(--accent, #6534BC)"
            strokeWidth="3"
          />
          <rect
            x="466"
            y="268"
            width="14"
            height="22"
            rx="4"
            fill="#EAF2EC"
            stroke="var(--accent, #6534BC)"
            strokeWidth="2"
          />

          {/* Exactly two opposed callouts, with distinct leader treatments. */}
          <path
            d="M284 165H323L366 202"
            fill="none"
            stroke="var(--ink, #291D35)"
            strokeWidth="3"
          />
          <circle
            cx="366"
            cy="202"
            r="5"
            fill="var(--ink, #291D35)"
          />

          <path
            d="M583 282H624L662 317H700"
            fill="none"
            stroke="var(--accent, #6534BC)"
            strokeWidth="3"
            strokeDasharray="10 9"
          />
          <circle
            cx="583"
            cy="282"
            r="6"
            fill="#EAF2EC"
            stroke="var(--accent, #6534BC)"
            strokeWidth="3"
          />

          <rect
            x="0"
            y="122"
            width="284"
            height="86"
            fill="var(--surface, #DCE8DF)"
          />
          <path
            d="M0 122V208"
            stroke="var(--ink, #291D35)"
            strokeWidth="4"
          />
          <text
            x="142"
            y="165"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--ink, #291D35)"
            className="font-[var(--font-headline)] text-[32px] font-semibold"
          >
            Demo tokenizer
          </text>

          <rect
            x="700"
            y="274"
            width="252"
            height="86"
            fill="var(--surface, #DCE8DF)"
          />
          <path
            d="M950 274V360"
            stroke="var(--accent, #6534BC)"
            strokeWidth="4"
          />
          <text
            x="826"
            y="317"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--accent, #6534BC)"
            className="font-[var(--font-headline)] text-[32px] font-semibold"
          >
            Missing link
          </text>
        </svg>
      </figure>

      <div className="grid shrink-0 grid-cols-2 gap-6 border-t border-[var(--border)] pt-6">
        <div className="pr-6">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
            Referenced tool
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            Demo tokenizer code calculates input/output token usage.
          </p>
        </div>

        <div className="border-l border-[var(--border)] pl-7">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight text-[var(--accent)]">
            Missing access
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
            The supplied text includes no package link.
          </p>
        </div>
      </div>
    </section>
  );
}