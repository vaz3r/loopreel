import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby="slide02-headline"
      data-slide-id={slide.id}
    >
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.18em] text-[var(--accent)]">
          THE HARDWARE
        </p>

        <h2
          id="slide02-headline"
          className="mt-4 font-[var(--font-headline)] text-[64px] font-bold leading-[1.08] tracking-[-0.045em]"
        >
          Two Ways To Patrol
        </h2>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[28px] leading-[1.35]">
          Ring pairs a flying camera with a business-oriented ground robot.
        </p>
      </div>

      <div className="relative mt-9 grid min-h-0 flex-1 grid-cols-[410px_minmax(0,1fr)] gap-[72px]">
        {/* Offset editorial divider; neither price encodes proportional area. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-[438px] top-0 w-px bg-[var(--border)]"
        >
          <span className="absolute -left-[4px] top-[318px] h-[9px] w-[9px] bg-[var(--accent)]" />
          <span className="absolute -left-[4px] top-[418px] h-[9px] w-[9px] bg-[var(--accent)]" />
        </div>

        <article className="relative flex min-w-0 flex-col items-start">
          <svg
            viewBox="0 0 398 168"
            className="h-[168px] w-[398px] shrink-0 text-[var(--ink)]"
            fill="none"
            aria-hidden="true"
          >
            <g stroke="var(--border)" strokeWidth="1.5">
              <path d="M18 25H380M18 143H380" strokeDasharray="5 7" />
              <path d="M199 9V159" strokeDasharray="5 7" />
              <path d="M18 17V33M380 17V33M18 135V151M380 135V151" />
              <ellipse cx="199" cy="140" rx="93" ry="12" />
            </g>

            <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
              <path d="M165 74L112 50M233 74L286 50M165 91L110 106M233 91L288 106" />
              <ellipse cx="104" cy="47" rx="49" ry="18" />
              <ellipse cx="294" cy="47" rx="49" ry="18" />
              <ellipse cx="104" cy="109" rx="49" ry="18" />
              <ellipse cx="294" cy="109" rx="49" ry="18" />

              <path d="M158 67L177 55H221L240 67V94L221 107H177L158 94Z" fill="var(--surface)" />
              <path d="M158 67L179 80H219L240 67M179 80V101M219 80V101" />
              <path d="M175 108L168 126H184M223 108L230 126H214" />
              <path d="M92 47H116M104 38V56M282 47H306M294 38V56" />
              <path d="M92 109H116M104 100V118M282 109H306M294 100V118" />
            </g>

            <g stroke="var(--accent)" strokeWidth="2.5">
              <circle cx="199" cy="91" r="10" fill="var(--surface)" />
              <circle cx="199" cy="91" r="3" fill="var(--accent)" />
              <path d="M76 26Q104 15 132 26M266 26Q294 15 322 26" />
            </g>
          </svg>

          <h3 className="mt-5 font-[var(--font-headline)] text-[34px] font-semibold leading-[44px] tracking-[-0.035em]">
            Ring Drone Cam
          </h3>

          <div className="relative mt-4 flex h-[148px] w-[398px] shrink-0 items-center border-y-2 border-[var(--accent)] bg-[var(--surface)] px-6">
            <span
              aria-hidden="true"
              className="absolute left-full top-1/2 h-px w-[40px] bg-[var(--border)]"
            />
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.07em] text-[var(--accent)]">
              $250
            </p>
          </div>

          <p className="mt-5 max-w-[350px] font-[var(--font-body)] text-[26px] leading-[1.35]">
            Starting price; includes a charging docking station.
          </p>
        </article>

        <article className="relative flex min-w-0 flex-col items-start pt-[100px]">
          <svg
            viewBox="0 0 398 168"
            className="h-[168px] w-[398px] shrink-0 text-[var(--ink)]"
            fill="none"
            aria-hidden="true"
          >
            <g stroke="var(--border)" strokeWidth="1.5">
              <path d="M18 145H380M199 9V158" strokeDasharray="5 7" />
              <path d="M18 137V153M380 137V153" />
              <ellipse cx="200" cy="145" rx="112" ry="13" />
              <path d="M155 31C164 7 234 7 243 31M140 25C156-8 242-8 258 25" />
            </g>

            <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
              <path d="M194 77V42H205V77" fill="var(--surface)" />
              <path d="M181 28H218V46H181Z" fill="var(--surface)" />
              <path d="M124 87L159 68H248L280 87V123L248 141H154L124 123Z" fill="var(--surface)" />
              <path d="M124 87L160 104H246L280 87M160 104V141M246 104V141" />
              <path d="M153 86H251M173 76H229" />
              <path d="M175 118H229" />

              <rect x="111" y="104" width="25" height="36" rx="9" fill="var(--surface)" />
              <rect x="268" y="104" width="25" height="36" rx="9" fill="var(--surface)" />
              <path d="M118 112V132M286 112V132" />
            </g>

            <g stroke="var(--accent)" strokeWidth="2.5">
              <circle cx="200" cy="37" r="5" />
              <path d="M172 94H232" />
              <circle cx="204" cy="122" r="4" fill="var(--accent)" />
              <path d="M185 17Q200 11 215 17" />
            </g>
          </svg>

          <h3 className="mt-5 font-[var(--font-headline)] text-[34px] font-semibold leading-[44px] tracking-[-0.035em]">
            Ring Rover Cam
          </h3>

          <div className="relative mt-4 flex h-[148px] w-[398px] shrink-0 items-center border-y-2 border-[var(--accent)] bg-[var(--surface)] px-6">
            <span
              aria-hidden="true"
              className="absolute right-full top-1/2 h-px w-[44px] bg-[var(--border)]"
            />
            <p className="whitespace-nowrap font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.07em] text-[var(--accent)]">
              $1,000
            </p>
          </div>

          <p className="mt-5 max-w-[366px] font-[var(--font-body)] text-[26px] leading-[1.35]">
            Amazon describes an autonomous security robot designed for business.
          </p>
        </article>
      </div>
    </section>
  );
}