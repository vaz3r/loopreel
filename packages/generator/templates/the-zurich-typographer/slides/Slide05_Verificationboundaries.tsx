import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [
    {
      label: 'Inspection access',
      body: 'Iran denied access to bombed facilities but admitted inspectors to unaffected facilities.',
    },
    {
      label: 'Verification limits',
      body: 'The IAEA could not verify suspended enrichment or confirm the stockpile’s status.',
    },
    {
      label: 'Weaponization evidence',
      body: 'The article separately reports that the IAEA found no evidence of weaponization.',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker ?? 'NUCLEAR UNCERTAINTY'}
        </p>

        <h1 className="mt-8 max-w-[900px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.06] tracking-[-0.045em]">
          {slide.headline ?? 'Unverified Does Not Mean Weaponizing'}
        </h1>

        <p className="mt-9 max-w-[810px] font-[var(--font-body)] text-[28px] leading-normal">
          {slide.subheadline ??
            'The article separates inspection access, unresolved verification, and evidence of weaponization.'}
        </p>
      </div>

      <div className="mt-16 grid min-h-0 flex-1 grid-rows-3">
        {items.slice(0, 3).map((item: any, index: number) => (
          <article
            key={`${index}-${item.label}`}
            className="grid grid-cols-[112px_minmax(0,1fr)] items-center gap-8 border-t border-[#000000] py-12 last:border-b"
          >
            <div className="flex justify-start self-start pt-1">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 96 112"
                fill="none"
                className="h-[112px] w-[96px] text-[var(--ink)]"
              >
                {index === 0 && (
                  <g
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  >
                    <path d="M12 92V20H38" />
                    <path d="M58 20H84V92" />
                    <path d="M12 92H30" />
                    <path d="M66 92H84" />
                    <path d="M38 20V84L24 92" />
                    <path d="M58 20V84L72 92" />
                  </g>
                )}

                {index === 1 && (
                  <path
                    d="M76 18H20V94H76"
                    stroke="#E60000"
                    strokeWidth="3"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                  />
                )}

                {index === 2 && (
                  <circle
                    cx="48"
                    cy="56"
                    r="33"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
              </svg>
            </div>

            <div className="min-w-0">
              <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
                {item.label}
              </h2>
              <p className="mt-6 max-w-[720px] font-[var(--font-body)] text-[28px] leading-normal">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}