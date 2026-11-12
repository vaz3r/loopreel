import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex min-h-[680px] shrink-0 flex-col">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <div className="mt-8 h-px w-full bg-[var(--border)]" />

        <h1 className="mt-10 max-w-[820px] font-[var(--font-headline)] text-[56px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="mt-10 h-[7px] w-[72px] bg-[var(--accent)]"
        />

        <p className="mb-12 mt-auto max-w-[780px] font-[var(--font-body)] text-[32px] leading-[1.35] tracking-[-0.015em] [text-wrap:balance]">
          {slide.subheadline}
        </p>
      </div>

      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 952 168"
        className="block h-[168px] w-full shrink-0"
        fill="none"
      >
        {/* An open coastal horizon: fractured masonry, no enclosing frame. */}
        <path
          d="M0 133H952"
          stroke="var(--border)"
          strokeWidth="1"
        />

        <g fill="var(--ink)">
          <path d="M80 126V68L92 62L105 70V126Z" />
          <path d="M74 52H111V62H74Z" />
          <path d="M70 126H116V134H70Z" />

          <path d="M231 127V24L243 18L250 27L261 22V127Z" />
          <path d="M224 7H270V17H224Z" />
          <path d="M220 127H273V135H220Z" />

          <path d="M329 129V80L340 72L354 79V129Z" />
          <path d="M322 64H361V73H322Z" />
          <path d="M318 129H367V136H318Z" />

          <path d="M477 132V48L488 41L500 49V132Z" />
          <path d="M469 31H508V41H469Z" />
          <path d="M465 131H514V138H465Z" />

          <path d="M582 135L589 113L615 116L620 136Z" />
          <path d="M645 136L653 125L674 129L679 137Z" />
        </g>

        <g stroke="#f5f5f7" strokeWidth="2">
          <path d="M240 35V115M250 34V115" />
          <path d="M88 79V116M97 80V116" />
          <path d="M337 88V118M346 87V118" />
          <path d="M485 59V120M493 60V120" />
        </g>

        <path
          d="M0 145L164 143L294 146L427 142L553 145L685 139L813 141L952 136"
          stroke="var(--accent)"
          strokeWidth="3"
        />
        <path
          d="M722 157H846M870 155H930"
          stroke="var(--border)"
          strokeWidth="1"
        />
      </svg>

      <div className="mt-7 flex shrink-0 flex-col gap-7">
        <article className="w-full border-t-[3px] border-[var(--ink)] bg-[#f5f5f7] px-8 py-7">
          <div className="grid grid-cols-[164px_minmax(0,1fr)] gap-7">
            <p className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.055em] tabular-nums">
              {item0?.badge}
            </p>

            <div className="min-w-0">
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.025em]">
                {item0?.label || item0?.title}
              </h2>
              <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
                {item0?.body}
              </p>
            </div>
          </div>
        </article>

        <article className="relative w-full border-l-[5px] border-[var(--accent)] bg-[var(--surface)] px-8 py-8">
          <div className="grid grid-cols-[192px_minmax(0,1fr)] gap-7">
            <div>
              <span
                aria-hidden="true"
                className="mb-5 block h-[7px] w-[44px] bg-[var(--accent)]"
              />
              <p className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.055em] text-[var(--accent)] tabular-nums">
                {item1?.badge}
              </p>
            </div>

            <div className="min-w-0 pt-1">
              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.15] tracking-[-0.025em]">
                {item1?.label || item1?.title}
              </h2>
              <p className="mt-5 font-[var(--font-body)] text-[28px] leading-snug">
                {item1?.body}
              </p>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-auto pb-6 pt-10">
        <div className="mb-6 h-px w-[96px] bg-[var(--border)]" />
        <p className="font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.025em]">
          The Zurich Typographer · tipaza.pub
        </p>
      </div>
    </section>
  );
}