import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby={`${slide.id}-headline`}
      data-total-slides={totalSlides}
    >
      <header className="shrink-0 pb-10">
        <div
          className="mb-7 h-[7px] w-24 bg-[var(--accent)]"
          aria-hidden="true"
        />
        <h2
          id={`${slide.id}-headline`}
          className="m-0 max-w-[930px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]"
        >
          Commitments Aren&apos;t Cash.
          <br />
          Eligibility Isn&apos;t Readiness.
        </h2>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-2 gap-6">
        <article className="grid grid-cols-[260px_1fr] items-center gap-8 border border-[var(--border)] bg-[var(--surface)] px-7 py-6">
          <svg
            viewBox="0 0 260 260"
            className="h-[260px] w-[260px] text-[var(--ink)]"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            {/* A financing instrument stops short of settled capital. */}
            <path
              d="M22 45H104L127 68V183H22V45Z"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M104 45V68H127"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M39 88H108M39 107H99M39 126H83"
              stroke="var(--border)"
              strokeWidth="3"
            />
            <path
              d="M39 158H68"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <circle
              cx="94"
              cy="157"
              r="12"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />

            <path
              d="M127 130H157M184 130H222"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="5 6"
            />
            <path
              d="M214 122L222 130L214 138"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            <path
              d="M166 72V188M177 72V188"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <path
              d="M157 72H186M157 188H186"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />

            <ellipse
              cx="224"
              cy="170"
              rx="23"
              ry="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M201 170V185C201 190 211 194 224 194C237 194 247 190 247 185V170"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M201 178C201 183 211 187 224 187C237 187 247 183 247 178"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M22 222H247"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
          </svg>

          <div className="min-w-0">
            <div
              className="mb-5 h-[3px] w-12 bg-[var(--accent)]"
              aria-hidden="true"
            />
            <h3 className="m-0 font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
              Conditional financing
            </h3>
            <p className="mb-0 mt-5 font-[var(--font-body)] text-[28px] leading-snug">
              Both loans retain financial, legal, technical, investment, due
              diligence, and other requirements.
            </p>
          </div>
        </article>

        <article className="grid grid-cols-[260px_1fr] items-center gap-8 border border-[var(--border)] px-7 py-6">
          <svg
            viewBox="0 0 260 260"
            className="h-[260px] w-[260px] text-[var(--ink)]"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            {/* Permission to enter is separate from a flight-ready vehicle. */}
            <path
              d="M24 195V66H104V195"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M35 195V78H93V195"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <circle
              cx="64"
              cy="121"
              r="23"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M53 121L61 129L76 112"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M80 165H145L159 151"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="5 6"
            />
            <path
              d="M148 151H159V162"
              stroke="currentColor"
              strokeWidth="2.5"
            />

            <path
              d="M186 161V105C186 87 194 69 204 57C214 69 222 87 222 105V161"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M186 139L173 156V178L186 169M222 139L235 156V178L222 169"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M186 161H222M193 161V173H215V161"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M188 99H220"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <circle
              cx="204"
              cy="120"
              r="7"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <path
              d="M167 195H242"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <path
              d="M178 195V207M230 195V207"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <path
              d="M24 222H247"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M204 27V40M179 35L186 45M229 35L222 45"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
          </svg>

          <div className="min-w-0">
            <div
              className="mb-5 h-[3px] w-12 bg-[var(--accent)]"
              aria-hidden="true"
            />
            <h3 className="m-0 font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
              Unproven readiness
            </h3>
            <p className="mb-0 mt-5 font-[var(--font-body)] text-[28px] leading-snug">
              Eligibility to compete for national security launches does not
              establish operational readiness.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}