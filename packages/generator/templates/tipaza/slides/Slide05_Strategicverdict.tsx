import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const [qualifier, population, ...populationUnits] = (
    item1?.badge ?? ''
  ).split(/\s+/);
  const populationUnit = populationUnits.join(' ');

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex shrink-0 flex-col gap-6">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.12em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[890px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-9 grid min-h-[880px] flex-1 grid-cols-2 border-y border-[var(--border)]">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 600 750"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          <path d="M0 0H300V750H0Z" fill="var(--surface, #161820)" />
          <path d="M300 0H600V750H300Z" fill="#0D0E12" />

          {/* A broken seam, rather than a continuous historical axis. */}
          <g
            stroke="var(--accent, #FF4D00)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M300 0V188L292 207L307 228L298 247V315" />
            <path d="M303 339L295 361L307 381V493" />
            <path d="M298 517V596L308 617L296 638L300 661V750" />
          </g>

          {/* Fragmented foundations: separated masonry, absent superstructure. */}
          <g
            stroke="#F1F3F9"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          >
            <path
              d="M40 469H260M40 481H260"
              strokeOpacity="0.16"
              strokeDasharray="3 7"
            />
            <path
              d="M48 449V422H93V399H122V413H142V450Z"
              fill="#F1F3F9"
              fillOpacity="0.06"
              strokeOpacity="0.55"
            />
            <path
              d="M161 449V426H181V376H202V393H217V448Z"
              fill="#F1F3F9"
              fillOpacity="0.08"
              strokeOpacity="0.7"
            />
            <path
              d="M232 449V431H253V449Z"
              fill="#F1F3F9"
              fillOpacity="0.06"
              strokeOpacity="0.45"
            />
            <path
              d="M48 435H93M76 422V435M93 413V449M105 413V399M161 437H181M181 406H217M193 406V425M202 425H217"
              strokeOpacity="0.25"
            />
            <path
              d="M55 491H102V511H55ZM120 491H142V509H120ZM162 490H211V512H162ZM232 492H251V508H232Z"
              strokeOpacity="0.32"
            />
          </g>

          <path
            d="M145 457L151 445L156 456L151 468"
            stroke="var(--accent, #FF4D00)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Quiet coastal contours; no implied historical connection. */}
          <g
            stroke="#F1F3F9"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          >
            <path
              d="M340 496C383 491 389 451 419 433C458 409 515 423 560 366"
              strokeOpacity="0.72"
            />
            <path
              d="M340 518C390 511 402 474 430 455C469 429 520 446 560 394"
              strokeOpacity="0.25"
            />
            <path
              d="M354 537C404 528 415 495 445 477C482 455 523 465 560 425"
              strokeOpacity="0.12"
            />
            <path d="M351 358H412M351 368H386" strokeOpacity="0.16" />
          </g>

          <path
            d="M418 434C434 424 450 421 466 418"
            stroke="var(--accent, #FF4D00)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <article className="relative z-10 flex min-w-0 flex-col px-10 py-10">
          <h2 className="min-h-[90px] max-w-[300px] font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            {item0?.title}
          </h2>

          <div className="mt-7 flex min-h-[150px] flex-col items-start gap-3">
            <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em] text-[var(--accent)]">
              {item0?.badge}
            </p>
            <p className="max-w-[310px] font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.025em]">
              {item0?.badgeLabel}
            </p>
          </div>

          <div aria-hidden="true" className="min-h-[300px] flex-1" />

          <div className="min-h-[236px] border-t border-[var(--border)] pt-6">
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {item0?.body}
            </p>
          </div>
        </article>

        <article className="relative z-10 flex min-w-0 flex-col px-10 py-10">
          <h2 className="min-h-[90px] max-w-[310px] font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
            {item1?.title}
          </h2>

          <div className="mt-7 flex min-h-[150px] flex-col items-start gap-3">
            <p className="font-[var(--font-mono)] text-[var(--accent)]">
              <span className="flex items-baseline gap-3 whitespace-nowrap">
                <span className="text-[24px] leading-none">{qualifier}</span>
                <span className="text-[48px] font-bold leading-none tracking-[-0.04em]">
                  {population}
                </span>
              </span>
              <span className="mt-2 block text-[24px] leading-snug">
                {populationUnit}
              </span>
            </p>

            <p className="max-w-[330px] font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.025em]">
              {item1?.badgeLabel}
            </p>
          </div>

          <div aria-hidden="true" className="min-h-[300px] flex-1" />

          <div className="min-h-[236px] border-t border-[var(--border)] pt-6">
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {item1?.body}
            </p>
          </div>
        </article>
      </div>

      <div className="mt-8 flex shrink-0 flex-col gap-5 border-t border-[var(--accent)] pt-7">
        <p className="max-w-[900px] font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
          {slide.closingQuestion}
        </p>
        <p className="self-end font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.1em] text-[var(--accent)]">
          tipaza.pub
        </p>
      </div>
    </section>
  );
}