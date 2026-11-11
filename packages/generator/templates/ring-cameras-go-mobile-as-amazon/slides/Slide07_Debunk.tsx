import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section
      aria-label="Don’t Confuse Navigation With Facial Recognition"
      className="flex h-full min-h-0 flex-col justify-center gap-10 text-[var(--ink)]"
    >
      <h1 className="m-0 font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.045em]">
        Don’t Confuse
        <br />
        Navigation With
        <br />
        <span className="text-[var(--accent)]">Facial Recognition</span>
      </h1>

      <div className="grid grid-cols-2 items-stretch gap-7">
        <article className="relative flex min-w-0 flex-col border border-[var(--border)] p-7">
          <div className="flex items-center gap-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 text-[var(--ink)] opacity-60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m5 19 14-14" />
            </svg>
            <p className="font-[var(--font-mono)] text-[18px] leading-6 tracking-[0.15em]">
              THE MYTH
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 384 208"
            className="my-7 h-[208px] w-full shrink-0"
            fill="none"
          >
            <g
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="m22 120 130-75 210 80-130 76Z" />
              <path d="M22 120V71l74-43 56 17M362 125V76L229 25" />
              <path d="m96 28 63 24M229 25l-45 26" />
              <path d="m47 135 130-75M79 147l130-75M111 159l130-75M143 171l130-75M175 183l130-75" />
              <path d="m55 101 210 80M88 82l210 80M120 63l210 80" />
              <path d="m271 82 35-20 31 12v30l-35 20-31-12Z" fill="var(--surface)" />
              <path d="m271 82 31 12 35-20M302 94v30" />
            </g>

            <path
              d="m58 121 63 24c15 6 24 5 36-2l30-18c13-8 27-8 42-2l31 12 57-33"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeDasharray="5 7"
              strokeLinecap="round"
            />
            <circle cx="58" cy="121" r="4" fill="var(--accent)" />
            <path
              d="m306 101 11 1-3 10"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <ellipse
              cx="191"
              cy="118"
              rx="43"
              ry="21"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity=".65"
              strokeWidth="2"
            />
            <path
              d="M148 103v15c0 12 19 22 43 22s43-10 43-22v-15"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity=".65"
              strokeWidth="2"
            />
            <ellipse
              cx="191"
              cy="103"
              rx="43"
              ry="21"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity=".8"
              strokeWidth="2"
            />
            <ellipse
              cx="191"
              cy="99"
              rx="13"
              ry="6"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M178 99v-8c0-4 6-7 13-7s13 3 13 7v8"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <ellipse
              cx="191"
              cy="91"
              rx="13"
              ry="6"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M178 68c8-5 18-5 26 0M168 57c14-9 32-9 46 0"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity=".6"
            />
          </svg>

          <div className="mb-6 h-px w-full bg-[var(--border)]" />

          <h2 className="min-h-[144px] font-[var(--font-headline)] text-[42px] font-semibold leading-[1.08] tracking-[-0.035em]">
            These robots
            <br />
            identify faces
          </h2>

          <p className="mt-5 font-[var(--font-body)] text-[27px] leading-[1.35] tracking-[-0.015em] opacity-75">
            That capability is not established by the supplied article.
          </p>
        </article>

        <article className="relative flex min-w-0 flex-col border border-[var(--border)] bg-[var(--surface)] p-7">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--accent)]" />

          <div className="flex items-center gap-3 text-[var(--accent)]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m7 12 3 3 7-7" />
            </svg>
            <p className="font-[var(--font-mono)] text-[18px] leading-6 tracking-[0.15em]">
              THE REALITY
            </p>
          </div>

          <svg
            aria-hidden="true"
            viewBox="0 0 384 208"
            className="my-7 h-[208px] w-full shrink-0"
            fill="none"
          >
            <g stroke="var(--border)" strokeWidth="1.5">
              <path d="M26 190V18h150v172M38 190V30h126v160" />
              <path d="M52 44h98v99H52ZM52 155h98v35M17 190h350" />
              <path d="M176 48h191M176 89h191M176 130h191M176 171h191" />
              <path d="M277 18v30M323 48v41M278 89v41M323 130v41" />
            </g>

            <path
              d="M139 111v21"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity=".6"
            />

            <rect
              x="195"
              y="58"
              width="49"
              height="110"
              rx="14"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle
              cx="219.5"
              cy="83"
              r="13"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <circle cx="219.5" cy="83" r="5" fill="var(--accent)" />
            <circle
              cx="219.5"
              cy="139"
              r="11"
              stroke="var(--ink)"
              strokeOpacity=".6"
              strokeWidth="1.5"
            />
            <path
              d="M209 112h21"
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M245 83h23c11 0 17-7 17-18V48"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />

            <rect
              x="274"
              y="17"
              width="78"
              height="83"
              rx="5"
              fill="var(--surface)"
            />
            <g stroke="var(--accent)" strokeWidth="1.5">
              <path d="M287 38V27h11M328 27h11v11M339 79v11h-11M298 90h-11V79" />
              <ellipse cx="313" cy="51" rx="11" ry="14" />
              <path
                d="M295 79c2-10 8-15 18-15s16 5 18 15"
                strokeLinecap="round"
              />
            </g>
          </svg>

          <div className="mb-6 h-px w-full bg-[var(--border)]" />

          <h2 className="min-h-[144px] font-[var(--font-headline)] text-[42px] font-semibold leading-[1.08] tracking-[-0.035em]">
            Familiar Faces
            <br />
            concerns
            <br />
            fixed cameras
          </h2>

          <p className="mt-5 font-[var(--font-body)] text-[27px] leading-[1.35] tracking-[-0.015em]">
            Available since December 2025 on fixed Ring doorbell cameras,
            Familiar Faces already faces a class action lawsuit.
          </p>
        </article>
      </div>
    </section>
  );
}