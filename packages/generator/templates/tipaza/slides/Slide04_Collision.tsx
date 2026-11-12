import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const destruction = items[0];
  const reconstruction = items[1];

  const [metric, ...unitWords] = (destruction?.badge ?? '').split(/\s+/);
  const unit = unitWords.join(' ');
  const laterWords = (reconstruction?.badge ?? '').split(/\s+/);

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-9">
        <p className="mb-6 font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.03] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_4px_minmax(0,1fr)]">
        <article className="grid min-w-0 grid-rows-[170px_minmax(380px,1fr)_340px] gap-8 bg-[var(--ink)] px-8 py-10 text-[var(--paper,#f5f5f7)]">
          <div>
            <p className="border-b border-current/25 pb-5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.12em]">
              DESTRUCTION
            </p>

            <p className="mt-7 flex items-baseline gap-3 font-[var(--font-mono)]">
              <span className="text-[52px] font-bold leading-none tracking-[-0.05em]">
                {metric}
              </span>
              <span className="text-[22px] leading-none tracking-[0.08em]">
                {unit}
              </span>
            </p>
          </div>

          <div className="flex min-h-0 items-center">
            <svg
              viewBox="0 0 410 500"
              className="h-full max-h-[500px] w-full"
              fill="none"
              role="img"
              aria-label="Abstract fallen masonry blocks"
            >
              <path
                d="M20 432H390"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.45"
              />
              <path
                d="M46 463H364"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.18"
              />

              <g stroke="currentColor" strokeWidth="3">
                <path
                  d="M35 369L134 340L155 410L56 439Z"
                  fill="currentColor"
                  fillOpacity="0.08"
                />
                <path d="M35 369L61 344L159 315L134 340" />
                <path d="M134 340L159 315L180 385L155 410" />
                <path d="M61 344L83 414" opacity="0.35" />

                <path
                  d="M176 335L262 349L250 427L164 413Z"
                  fill="currentColor"
                  fillOpacity="0.13"
                />
                <path d="M176 335L198 310L284 324L262 349" />
                <path d="M262 349L284 324L272 402L250 427" />

                <path
                  d="M272 373L346 342L377 413L303 444Z"
                  fill="currentColor"
                  fillOpacity="0.06"
                />
                <path d="M272 373L279 345L353 314L346 342" />
                <path d="M346 342L353 314L384 385L377 413" />

                <path
                  d="M137 250L209 221L237 290L165 319Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                />
                <path d="M137 250L157 230L229 201L209 221" />
                <path d="M209 221L229 201L257 270L237 290" />
              </g>

              <path
                d="M91 152L107 175M279 176L266 195M321 244L342 253"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="square"
              />
              <path
                d="M184 95V150"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 9"
                opacity="0.3"
              />
            </svg>
          </div>

          <div className="border-t border-current/25 pt-7">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {destruction?.label || destruction?.title}
            </h2>
            <p className="mt-6 font-[var(--font-body)] text-[28px] leading-snug">
              {destruction?.body}
            </p>
          </div>
        </article>

        <div className="bg-[var(--accent)]" aria-hidden="true" />

        <article className="grid min-w-0 grid-rows-[170px_minmax(380px,1fr)_340px] gap-8 bg-[var(--surface)] px-8 py-10">
          <div>
            <p className="border-b border-[var(--border)] pb-5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.12em]">
              RECONSTRUCTION
            </p>

            <p className="mt-7 font-[var(--font-mono)] text-[32px] leading-[1.12] tracking-[-0.035em]">
              <span className="block">
                {laterWords.slice(0, 2).join(' ')}
              </span>
              <span className="block">
                {laterWords.slice(2).join(' ')}
              </span>
            </p>
          </div>

          <div className="flex min-h-0 items-center">
            <svg
              viewBox="0 0 410 500"
              className="h-full max-h-[500px] w-full"
              fill="none"
              role="img"
              aria-label="Outlined standing masonry arch"
            >
              <path
                d="M20 432H390"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.45"
              />
              <path
                d="M46 463H364"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.18"
              />

              <path
                d="M75 432V219C75 147 133 89 205 89C277 89 335 147 335 219V432H277V219C277 179 245 147 205 147C165 147 133 179 133 219V432Z"
                stroke="currentColor"
                strokeWidth="4"
              />

              <g stroke="currentColor" strokeWidth="2">
                <path d="M75 376H133M75 320H133M75 264H133" />
                <path d="M277 376H335M277 320H335M277 264H335" />
                <path d="M75 219H133M277 219H335" />
                <path d="M92 154L142 183" />
                <path d="M140 106L169 157" />
                <path d="M270 106L241 157" />
                <path d="M318 154L268 183" />
                <path d="M104 264V320M104 376V432" opacity="0.4" />
                <path d="M306 264V320M306 376V432" opacity="0.4" />
              </g>

              <path
                d="M190 90H220L215 148H195Z"
                fill="var(--accent)"
                stroke="var(--accent)"
                strokeWidth="2"
              />

              <path
                d="M62 432V447H146V432M264 432V447H348V432"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M205 179V403"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="5 9"
                opacity="0.2"
              />
            </svg>
          </div>

          <div className="border-t border-[var(--border)] pt-7">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {reconstruction?.label || reconstruction?.title}
            </h2>
            <p className="mt-6 font-[var(--font-body)] text-[28px] leading-snug">
              {reconstruction?.body}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}