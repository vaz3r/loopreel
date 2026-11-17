import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Check, CreditCard, FileCheck2 } from 'lucide-react';

export default function Slide01({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            THE CANCELLATION TRAP
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          You Canceled.
          <br />
          The Fitness App
          <br />
          Kept Charging.
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug">
          A cancellation confirmation is evidence—not the end of checking.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div className="relative aspect-[952/420] max-h-full w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 952 420"
            role="img"
            aria-label="Conceptual illustration: a cancellation receipt inside a phone, with a continuing payment loop around it."
            className="absolute inset-0 h-full w-full"
          >
            {/* A physical phone silhouette, not a UI card. */}
            <path
              d="M339 14H613Q640 14 640 41V379Q640 406 613 406H339Q312 406 312 379V41Q312 14 339 14Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeOpacity="0.55"
            />
            <path
              d="M435 30H517M448 390H504"
              stroke="var(--ink)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.35"
            />

            {/* Red payment arrows continue outside the canceled account. */}
            <path
              d="M673 70C818 102 846 294 687 352"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M698 321L686 353L721 356"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M279 352C134 320 106 128 265 70"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M254 101L266 69L231 66"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Receipt marginalia and editorial registration ticks. */}
            <path
              d="M327 112H342M327 112V127M610 355H625M625 340V355"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M92 42H112M102 32V52M840 378H860M850 368V388"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>

          <div className="absolute left-1/2 top-[12%] flex -translate-x-1/2 items-center gap-3">
            <Check
              aria-hidden="true"
              className="h-9 w-9 text-[var(--ink)]"
              strokeWidth={2.5}
            />
            <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em]">
              Canceled
            </span>
          </div>

          <div className="absolute left-[36%] right-[36%] top-[29%]">
            <div className="mb-3 flex items-center justify-between font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              <span>[§ 01]</span>
              <FileCheck2 aria-hidden="true" className="h-6 w-6" />
            </div>

            <p className="font-[var(--font-body)] text-[23px] leading-[1.35]">
              Confirmation shall be retained as{' '}
              <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-4">
                evidence.
              </span>
            </p>

            <p className="mt-3 font-[var(--font-body)] text-[23px] leading-[1.45]">
              Billing:{' '}
              <span className="line-through decoration-[var(--accent)] decoration-2">
                presumed closed
              </span>
              <br />
              <mark className="bg-[#FEF08A] px-1.5 py-0.5 font-mono font-medium text-[#121212]">
                check separately
              </mark>
            </p>
          </div>

          <div className="absolute left-[8%] top-[43%] flex flex-col items-center gap-2 bg-[var(--paper,#0A0A0C)] px-3 py-2 text-[var(--accent)]">
            <CreditCard aria-hidden="true" className="h-12 w-12" strokeWidth={1.5} />
            <span className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em]">
              Billing
            </span>
          </div>

          <div className="absolute right-[3%] top-[43%] max-w-[155px] bg-[var(--paper,#0A0A0C)] px-3 py-2">
            <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug text-[var(--accent)]">
              Still
              <br />
              checking?
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <p className="mb-4 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.06em] text-[var(--ink)]/60">
          Conceptual redline · Not actual app terms
        </p>

        <div className="grid grid-cols-[225px_1fr] gap-7 pb-4">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Genesis Tech'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Charges or attempted charges continued after cancellation, FTC alleged.'}
          </p>
        </div>

        <div className="grid grid-cols-[225px_1fr] gap-7 border-t border-[var(--border)] pt-4">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'Its Apps'}
          </h2>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[1]?.body ??
              'Offerings included MadMuscles, Harna and Unimeal.'}
          </p>
        </div>
      </div>
    </section>
  );
}