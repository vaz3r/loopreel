import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function LedgerEmblem({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 144 144"
      fill="none"
      aria-hidden="true"
      className="h-[144px] w-[144px] text-[var(--accent)]"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {index === 0 && (
        <>
          <path d="M20 28v72h25M124 28v72H99" />
          <path d="M14 28h18M112 28h18" />
          <path d="M44 81h57L88 98H57Z" />
          <path d="M71 35v46M77 40l23 31H77Z" />
          <path d="M64 49 47 71h17" opacity=".55" />
          <path d="M18 111h30m12 0h25m12 0h29M30 122h28m15 0h39" />
          <path d="M9 18h33M103 18h32" opacity=".3" />
        </>
      )}

      {index === 1 && (
        <>
          <path d="M35 28h74v12H35ZM43 40l8 12h42l8-12" />
          <path d="M53 52 49 108M91 52l4 56M65 55v49M79 55v49" />
          <path d="M42 108h60v10H42ZM31 118h82v10H31" />
          <path d="M29 17h86M23 134h98" opacity=".35" />
          <path d="M43 28v12M101 28v12" />
        </>
      )}

      {index === 2 && (
        <>
          <path d="M24 118V67l25-15v66M95 118V52l25 15v51" />
          <path d="M49 118V42l23-19 23 19v76M18 118h108" />
          <path d="M63 118V92a9 9 0 0 1 18 0v26" />
          <path d="M66 61V51a6 6 0 0 1 12 0v10Z" />
          <path d="M34 77v16M110 77v16" />
          <path d="M72 11v12M65 17h14" />
          <path d="M12 129h120M29 136h95" opacity=".3" />
        </>
      )}
    </svg>
  );
}

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const rows = [items[0], items[1], items[2]];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 flex-col gap-7 pb-10">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <p className="max-w-[900px] font-[var(--font-body)] text-[30px] leading-snug text-[var(--ink)]">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative isolate flex min-h-0 flex-1 flex-col">
        {/* Offset foundation fragments are strata, not chronological connectors. */}
        <svg
          viewBox="0 0 1080 1350"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--ink)]"
          stroke="currentColor"
          strokeWidth="2"
        >
          <g opacity=".055">
            <path d="M24 294v112h342v-41H249v-71Z" />
            <path d="M42 315v73h305M77 294v112M163 294v112" />
            <path d="M730 348h308v58H877v-29H730Z" />

            <path d="M57 758v99h380v-34H278v-65Z" />
            <path d="M77 778v60h340M111 758v99M209 758v99" />
            <path d="M768 790h250v67H894v-36H768Z" />

            <path d="M31 1200v109h425v-38H302v-71Z" />
            <path d="M51 1220v69h385M91 1200v109M191 1200v109" />
            <path d="M711 1248h318v61H856v-31H711Z" />
          </g>
        </svg>

        {rows.map((item, index) => (
          <article
            key={`${slide.id}-ledger-${index}`}
            className={`relative grid min-h-0 flex-1 grid-cols-[144px_minmax(0,1fr)] items-center gap-10 border-t border-[var(--accent)] py-9 ${
              index === 2 ? 'border-b' : ''
            }`}
          >
            <div className="flex h-full items-center justify-center border-r border-[var(--border)] pr-5">
              <LedgerEmblem index={index} />
            </div>

            <div className="flex min-w-0 flex-col gap-5 pr-5">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
                {item?.title || item?.label}
              </h2>

              {index > 0 && item?.badge && (
                <p className="font-[var(--font-mono)] text-[44px] font-semibold leading-[1.15] tracking-[-0.035em] text-[var(--accent)]">
                  {item.badge}
                </p>
              )}

              <p className="max-w-[710px] font-[var(--font-body)] text-[28px] leading-snug">
                {item?.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}