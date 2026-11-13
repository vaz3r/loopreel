import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type VerdictSlide = SlideComponentProps['slide'] & {
  cashOut?: {
    title: string;
    body: string;
    effectiveDate: string;
    qualification: string;
  };
  verdictStamp?: string;
};

function RichText({
  text,
  highlight = false,
}: {
  text?: string;
  highlight?: boolean;
}) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong
            key={index}
            className={
              highlight
                ? 'font-bold text-[var(--accent)]'
                : 'font-bold'
            }
          >
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  const data = slide as VerdictSlide;
  const items = slide.items ?? [];
  const financing = items[0];
  const protection = items[1];
  const move = items[2];

  const cashOut = data.cashOut ?? {
    title: 'CALIFORNIA CASH-OUT',
    body: 'Qualifying balances **below $15** are cash-redeemable.',
    effectiveDate: 'April 1, 2026',
    qualification: 'Physical and electronic cards; exactly $15 excluded.',
  };

  const verdictStamp =
    data.verdictStamp ?? '**FINANCING ≠ BREAKAGE ≠ BANK DEPOSITS**';

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-label={`Slide ${slide.index + 1} of ${totalSlides}`}
    >
      <div className="flex h-full min-h-0 flex-col justify-between gap-6 font-[var(--font-body)]">
        <div className="shrink-0">
          <div className="flex items-center gap-4">
            <svg
              aria-hidden="true"
              viewBox="0 0 36 28"
              className="h-7 w-9 shrink-0 text-[var(--accent)]"
              fill="none"
            >
              <path
                d="M2 9H34M2 19H34M24 2L12 26"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <p className="font-[var(--font-mono)] text-[20px] uppercase leading-7 tracking-[0.16em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="mt-5 max-w-[820px] text-[28px] leading-snug opacity-80">
            {slide.subheadline}
          </p>
        </div>

        <div className="grid shrink-0 grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <article className="flex min-w-0 flex-col justify-between gap-5 rounded-l-lg border border-r-0 border-[var(--border)] bg-[var(--surface)]/50 p-7">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {financing?.title || financing?.label}
            </h2>
            <p className="text-[26px] leading-snug opacity-80">
              <RichText text={financing?.body} />
            </p>
          </article>

          <article className="flex min-w-0 flex-col justify-between gap-5 rounded-r-lg border border-l-[6px] border-[var(--accent)] bg-[var(--surface)] p-7 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em] text-[var(--accent)]">
                {protection?.title || protection?.label}
              </h2>
              <svg
                aria-hidden="true"
                viewBox="0 0 40 44"
                className="h-11 w-10 shrink-0 text-[var(--accent)]"
                fill="none"
              >
                <path
                  d="M20 3L36 9V22C36 31 29 37 20 41C11 37 4 31 4 22V9L20 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 18H28M12 26H28M25 13L15 31"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            <p className="max-w-[440px] text-[28px] leading-snug">
              <RichText text={protection?.body} />
            </p>
          </article>
        </div>

        <div className="flex shrink-0 items-start gap-6 py-1">
          <svg
            aria-hidden="true"
            viewBox="0 0 52 52"
            className="mt-1 h-[52px] w-[52px] shrink-0 text-[var(--accent)]"
            fill="none"
          >
            <path
              d="M7 8V28H43M30 15L43 28L30 41"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinejoin="miter"
            />
          </svg>
          <div className="min-w-0">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight">
              {move?.title || move?.label}
            </h2>
            <p className="mt-3 text-[28px] leading-snug">
              <RichText text={move?.body} />
            </p>
          </div>
        </div>

        <aside className="shrink-0 border-y border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <h2 className="font-[var(--font-mono)] text-[20px] font-semibold uppercase leading-7 tracking-[0.12em]">
            {cashOut.title}
          </h2>
          <p className="mt-3 text-[28px] leading-snug">
            <RichText text={cashOut.body} highlight />
          </p>
          <p className="mt-2 font-[var(--font-mono)] text-[20px] leading-7 text-[var(--accent)]">
            {cashOut.effectiveDate}
          </p>
          <p className="mt-3 text-[24px] leading-snug">
            {cashOut.qualification}
          </p>
        </aside>

        <div className="flex shrink-0 flex-col items-start gap-3">
          <div className="inline-flex max-w-full items-center border border-[var(--accent)] px-5 py-3 font-[var(--font-mono)] text-[24px] uppercase leading-8 tracking-[0.025em] text-[var(--accent)]">
            <RichText text={verdictStamp} />
          </div>
          <p className="self-end font-[var(--font-mono)] text-[20px] leading-7 tracking-[0.06em]">
            thefineprint.co
          </p>
        </div>
      </div>
    </section>
  );
}