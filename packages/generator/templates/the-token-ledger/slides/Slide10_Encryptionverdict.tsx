import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex items-center gap-5">
        <span className="h-[2px] w-12 shrink-0 bg-[var(--accent)]" />
        <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-wider text-[var(--accent)]">
          THE ENCRYPTION CATCH
        </p>
      </div>

      <h1 className="mt-7 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]">
        Encryption Claims Need A Crucial Distinction
      </h1>

      <div className="mt-8 border-y border-[var(--border)] py-6">
        <p className="max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          The article does not specify encryption-key retention or deletion
          policies.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-[minmax(0,1.6fr)_48px_minmax(0,1fr)] items-stretch gap-x-5">
        <article className="min-w-0 pr-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 112 84"
            className="mb-7 h-[72px] w-[96px] text-[var(--accent)]"
            fill="currentColor"
          >
            <path d="M4 79V46C4 23 17 8 42 3l5 13C30 21 23 30 23 43h23v36H4Zm61 0V46C65 23 78 8 103 3l5 13C91 21 84 30 84 43h23v36H65Z" />
          </svg>

          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.02em]">
            Amazon
          </h2>

          <p className="mt-5 max-w-[480px] font-[var(--font-body)] text-[28px] leading-normal">
            Says both devices&apos; videos receive Ring&apos;s Throw Away the Key
            Encryption.
          </p>

          <div className="mt-9 h-px w-24 bg-[var(--border)]" />
        </article>

        <div className="relative min-h-[420px]" aria-hidden="true">
          <svg
            viewBox="0 0 48 420"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full text-[var(--border)]"
            fill="none"
          >
            <path
              d="M2 106H23V350H46"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <aside className="mt-16 min-w-0 border-l-2 border-[var(--accent)] pl-6">
          <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--accent)]">
            Electronic Frontier Foundation
          </h2>

          <p className="mt-6 font-[var(--font-body)] text-[26px] leading-normal">
            Says the encryption remains well short of end-to-end encryption.
          </p>
        </aside>
      </div>
    </section>
  );
}