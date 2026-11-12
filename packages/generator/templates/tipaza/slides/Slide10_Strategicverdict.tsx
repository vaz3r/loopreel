import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col justify-between gap-9 bg-white font-[var(--font-body)]">
        <div className="shrink-0">
          <div className="mb-7 flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[2px] w-12 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em] text-[var(--accent)]">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <div
            aria-hidden="true"
            className="mt-8 h-px w-full bg-[var(--border)]"
          />
        </div>

        <div className="relative grid shrink-0 grid-cols-[176px_minmax(0,1fr)] gap-x-8 gap-y-10">
          {/* The column occupies its own gutter across both editorial panels. */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 176 800"
            className="pointer-events-none absolute left-0 top-[56px] h-[800px] w-[176px]"
            fill="none"
          >
            <path
              d="M22 20V778M10 64H168M10 752H168"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path
              d="M14 128H30M14 256H30M14 384H30M14 512H30M14 640H30"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <path
              d="M43 151L57 130L83 138L102 110L130 121L145 144L137 163H48Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M51 163H135L130 188H57Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            <path
              d="M60 188H127L122 350L105 368L119 389L116 481L93 493L112 512L107 683H54L59 520L49 496L59 474L55 375L67 354Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <path
              d="M75 204L73 343M94 204L91 351M112 204L108 339
                 M71 394L73 466M91 395L89 478M106 407L103 467
                 M72 529L68 664M90 531L86 664"
              stroke="var(--border)"
              strokeWidth="3"
            />

            <path
              d="M55 375L80 367L92 382L105 368M59 474L76 489L93 493
                 M67 354L81 330L77 307M93 493L84 516L90 542"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            <path
              d="M48 683H116L124 704H40Z
                 M34 704H131V726H34Z
                 M24 726H142V749H24Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            <path
              d="M126 527L147 539L134 559L121 548Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <path
              d="M144 680L157 690L146 702L136 694Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="2"
            />

            <path
              d="M9 424H40M24 409V439"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M31 773H151"
              stroke="var(--ink)"
              strokeWidth="1"
            />
          </svg>

          <article className="col-start-2 flex min-h-[380px] w-[600px] max-w-full flex-col justify-center justify-self-end border-t border-[var(--border)] bg-[var(--surface)] px-9 py-9">
            <p className="mb-6 font-[var(--font-mono)] text-[42px] font-bold leading-none tracking-[-0.04em]">
              {item0?.badge}
            </p>

            <h2 className="mb-5 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em]">
              {item0?.label || item0?.title}
            </h2>

            <p className="text-[28px] leading-snug">
              {item0?.body}
            </p>
          </article>

          <article className="col-start-2 flex min-h-[476px] flex-col justify-center border-l-[5px] border-[var(--accent)] bg-white px-10 py-10">
            <p className="mb-8 font-[var(--font-mono)] text-[42px] font-bold leading-none tracking-[-0.04em] text-[var(--accent)]">
              {item1?.badge}
            </p>

            <h2 className="mb-7 max-w-[590px] font-[var(--font-headline)] text-[38px] font-semibold leading-[1.12] tracking-[-0.025em]">
              {item1?.label || item1?.title}
            </h2>

            <p className="max-w-[590px] text-[28px] leading-snug">
              {item1?.body}
            </p>
          </article>
        </div>

        <div className="shrink-0 border-t border-[var(--border)] pt-8">
          <p className="max-w-[820px] font-[var(--font-headline)] text-[30px] leading-snug tracking-[-0.015em]">
            {slide.subheadline}
          </p>

          <div className="mt-9 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[20px] leading-normal tracking-[0.01em]">
              The Zurich Typographer · zurichtypo.ch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}