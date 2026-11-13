import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function Emphasis({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const appeal = items[0];
  const tradeoff = items[1];
  const catchItem = items[2];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[1.2] tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug opacity-80">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-7 flex min-h-0 flex-1 flex-col gap-5">
        <article className="grid h-[208px] shrink-0 grid-cols-[minmax(0,1fr)_148px] items-center gap-7 rounded-lg border border-[var(--ink)] bg-[var(--ink)] px-8 py-6 text-[var(--paper,#0A0A0C)]">
          <div className="min-w-0">
            <h2 className="font-[var(--font-mono)] text-[22px] font-semibold uppercase leading-tight tracking-[0.12em]">
              {appeal?.title || appeal?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[44px] leading-[1.13] tracking-[-0.025em]">
              <Emphasis text={appeal?.body} />
            </p>
          </div>

          <svg
            viewBox="0 0 160 160"
            className="h-[148px] w-[148px]"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="25"
              y="65"
              width="110"
              height="75"
              rx="3"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M18 54H142V76H18V54Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M70 54V140M90 54V140"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M80 54C58 54 36 48 36 33C36 22 47 18 56 24C67 31 75 44 80 54Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M80 54C102 54 124 48 124 33C124 22 113 18 104 24C93 31 85 44 80 54Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M80 56L58 98L70 94L76 106L84 76"
              fill="var(--accent)"
            />
          </svg>
        </article>

        <article className="relative grid h-[292px] shrink-0 grid-cols-[minmax(0,1fr)_260px] items-center gap-6 rounded-lg border border-[var(--accent)] border-l-[6px] bg-[var(--paper,#0A0A0C)] px-8 py-7 shadow-lg">
          <div className="absolute -top-[21px] right-[145px] flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--paper,#0A0A0C)] text-[var(--accent)]">
            <svg
              viewBox="0 0 32 32"
              className="h-7 w-7"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M16 5V25M8 17L16 25L24 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <h2 className="font-[var(--font-mono)] text-[22px] font-bold uppercase leading-tight tracking-[0.12em] text-[var(--accent)]">
              {tradeoff?.title || tradeoff?.label}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[44px] leading-[1.13] tracking-[-0.025em]">
              <Emphasis text={tradeoff?.body} />
            </p>
          </div>

          <svg
            viewBox="0 0 280 224"
            className="h-[208px] w-[260px]"
            fill="none"
            aria-hidden="true"
          >
            {/* Cash arrives at the storefront first. */}
            <g stroke="var(--accent)" strokeWidth="3">
              <rect x="5" y="48" width="57" height="34" rx="3" />
              <circle cx="33.5" cy="65" r="8" />
              <path d="M13 57H18M49 73H54" />
              <path d="M9 104H103M89 90L103 104L89 118" />
            </g>

            {/* Storefront: roof, striped awning, door and window. */}
            <g
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            >
              <path d="M113 61L126 32H220L233 61" />
              <path d="M113 61H233V75C233 88 209 88 209 75C209 88 185 88 185 75C185 88 161 88 161 75C161 88 137 88 137 75C137 88 113 88 113 75V61Z" />
              <path d="M141 32L137 61M162 32L161 61M184 32L185 61M205 32L209 61" />
              <path d="M119 85V145H227V85" />
              <path d="M135 145V103H166V145" />
              <rect x="180" y="103" width="31" height="24" />
              <path d="M158 123V128" />
              <path d="M108 145H238" />
            </g>

            {/* A quieter, delayed goods path exits beneath the store. */}
            <path
              d="M174 151V183H219M209 173L219 183L209 193"
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.55"
            />

            <g
              stroke="var(--ink)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            >
              <path d="M232 174H270L265 211H237L232 174Z" />
              <path d="M229 174H273V168H229V174Z" />
              <path d="M236 168L239 160H263L266 168" />
              <path d="M235 185H268M237 199H266" />
            </g>
          </svg>
        </article>

        <aside className="flex min-h-[196px] flex-1 flex-col justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-8 py-6">
          <h2 className="flex items-center gap-3 font-[var(--font-mono)] text-[22px] font-semibold uppercase leading-tight tracking-[0.12em]">
            <span
              className="h-[10px] w-[10px] shrink-0 bg-[var(--accent)]"
              aria-hidden="true"
            />
            {catchItem?.title || catchItem?.label}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[44px] leading-[1.13] tracking-[-0.025em]">
            <Emphasis text={catchItem?.body} />
          </p>
        </aside>
      </div>
    </section>
  );
}