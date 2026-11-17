import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Smartphone, ArrowRight, ReceiptText } from 'lucide-react';

export default function Slide02({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em]">
            THE TRIAL EXPERIENCE
          </p>
        </div>

        <h1 className="max-w-[850px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          The Trial Became A Bigger Bill
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug">
          Noom customers challenged trial messaging, automatic enrollment and
          difficult exits.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 420"
          role="img"
          aria-label="Conceptual illustration: an unused phone beside a long subscription receipt."
          className="h-full max-h-[460px] w-full"
        >
          <ellipse
            cx="751"
            cy="390"
            rx="183"
            ry="13"
            fill="var(--surface)"
          />

          {/* An idle handset, not a UI container. */}
          <Smartphone
            x={559}
            y={166}
            width={140}
            height={216}
            stroke="var(--ink)"
            strokeWidth={1}
            fill="var(--surface)"
          />
          <path
            d="M612 262h34"
            stroke="var(--border)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Dashed billing movement despite an idle device. */}
          <path
            d="M687 278h47"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="5 7"
          />
          <path
            d="m725 270 9 8-9 8"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Physical paper receipt with a torn lower edge. */}
          <path
            d="M748 38h168v341l-14-10-14 10-14-10-14 10-14-10-14 10-14-10-14 10-14-10-14 10-14-10-14 10Z"
            fill="var(--ink)"
          />
          <ReceiptText
            x={769}
            y={59}
            width={32}
            height={32}
            stroke="var(--surface)"
            strokeWidth={1.5}
          />
          <path
            d="M770 115h123M770 135h79"
            stroke="var(--surface)"
            strokeWidth="5"
          />
          <path
            d="M770 178h123"
            stroke="var(--surface)"
            strokeWidth="1"
            opacity="0.35"
          />
          <path
            d="M770 205h83m22 0h18M770 231h65m40 0h18M770 257h76m29 0h18"
            stroke="var(--surface)"
            strokeWidth="4"
          />
          <path
            d="M766 292h132v42H766Z"
            fill="var(--accent)"
          />
          <path
            d="M778 313h44m39 0h25"
            stroke="var(--ink)"
            strokeWidth="4"
          />

          {/* Receipt inspection marks. */}
          <path
            d="M737 38h-12v24M925 355h12v24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>

        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-[57%] flex-col justify-center pr-5">
          <p className="mb-3 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.12em] text-[var(--accent)]">
            Reported charge · up to
          </p>

          <p className="whitespace-nowrap font-[var(--font-mono)] text-[106px] font-bold leading-none tracking-[-0.075em]">
            <span className="mr-1 inline-block align-top pt-3 text-[54px] tracking-tight">
              $
            </span>
            199.99
          </p>

          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-12 bg-[var(--accent)]" />
            <p className="font-[var(--font-body)] text-[28px] leading-tight">
              For six months.
            </p>
          </div>

          <p className="mt-4 pl-16 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em] text-[var(--accent)]">
            Non-refundable
          </p>

          <p className="mt-8 max-w-[420px] border-t border-[var(--border)] pt-3 font-[var(--font-body)] text-[20px] leading-snug opacity-70">
            As described in complaint coverage.
          </p>
        </div>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <article className="grid grid-cols-[280px_minmax(0,1fr)] gap-8 pb-5">
          <div className="flex items-start gap-3">
            <ArrowRight
              aria-hidden="true"
              className="mt-1 h-6 w-6 shrink-0 text-[var(--accent)]"
              strokeWidth={1.5}
            />
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Upfront Charge'}
            </h2>
          </div>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[0]?.body ??
              'Complaint coverage described up to $199.99 for six months, non-refundable.'}
          </p>
        </article>

        <article className="grid grid-cols-[280px_minmax(0,1fr)] gap-8 border-t border-[var(--border)] pt-5">
          <div className="flex items-start gap-3">
            <ArrowRight
              aria-hidden="true"
              className="mt-1 h-6 w-6 shrink-0 text-[var(--accent)]"
              strokeWidth={1.5}
            />
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Unused Service'}
            </h2>
          </div>
          <p className="font-[var(--font-body)] text-[24px] leading-snug">
            {items[1]?.body ??
              'The complaint alleged conversion even without accessing or downloading.'}
          </p>
        </article>
      </div>
    </section>
  );
}