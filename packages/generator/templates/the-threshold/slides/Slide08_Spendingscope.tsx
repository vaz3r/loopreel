import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({ slide }: SlideComponentProps) {
  const spending = slide.items?.[0];
  const caveat = slide.items?.[1];

  const spendingBody =
    spending?.body ??
    '$47.1 billion as of October 2026; attributed to US Department of Defense.';

  const amountMatch = spendingBody.match(/^(\$[\d,.]+\s+billion)\s+([\s\S]+)$/);
  const amount = amountMatch?.[1] ?? '$47.1 billion';
  const attribution =
    amountMatch?.[2] ??
    'as of October 2026; attributed to US Department of Defense.';

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker ?? 'THE COST BOUNDARY'}
        </p>

        <h1 className="max-w-[930px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline ?? 'Military Spending Is Not Total Damage'}
        </h1>

        <p className="max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline ??
            'The reported estimate covers US military spending, not worldwide economic losses.'}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center py-10">
        <div className="border-t border-[var(--border)] pt-7">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
            {spending?.label ?? 'Estimated US military spending'}
          </h2>

          <p className="mt-5 whitespace-nowrap font-[var(--font-mono)] text-[112px] font-bold leading-[1.08] tracking-[-0.065em] text-[var(--ink)]">
            {amount}
          </p>

          <p className="mt-4 max-w-[780px] font-[var(--font-body)] text-[28px] leading-snug">
            {attribution}
          </p>
        </div>
      </div>

      <aside className="relative w-full shrink-0 bg-[var(--surface)]">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[4px] w-full text-[var(--accent)]"
          viewBox="0 0 952 4"
          preserveAspectRatio="none"
          fill="none"
        >
          <path d="M0 2H952" stroke="currentColor" strokeWidth="4" />
        </svg>

        <div className="px-8 py-8">
          <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            {caveat?.label ?? 'Estimate caveat'}
          </h2>

          <p className="mt-4 max-w-[850px] font-[var(--font-body)] text-[28px] leading-normal">
            {caveat?.body ??
              'The spending sentence contains an [update] marker; worldwide losses are not quantified.'}
          </p>
        </div>
      </aside>
    </section>
  );
}