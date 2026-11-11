import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CaseStudyContent = {
  headline?: string;
  subject?: string;
  before?: string;
  after?: string;
  takeaway?: string;
  impact?: {
    value?: string;
    label?: string;
  };
};

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as CaseStudyContent;

  const headline =
    content.headline ?? 'The common room was not prescribed';
  const subject =
    content.subject ??
    'Ryue Nishizawa · Moriyama House, Tokyo · 2002–2005';
  const before =
    content.before ??
    'Design intent: none of the individual units was intended for communal use. Five self-contained mini-houses provided rental accommodation alongside the owner’s spaces.';
  const after =
    content.after ??
    'In occupation: the owner’s living room, Unit C, became an informal common room for lunches and drinks. The paths between buildings also became places to meet.';
  const takeaway =
    content.takeaway ??
    'Our reading: architecture can make encounters possible without scripting every encounter. Leave room for residents to assign a space its social meaning.';
  const impactValue = content.impact?.value ?? '5';
  const impactLabel =
    content.impact?.label ??
    'Rental mini-houses within the semi-communal arrangement—not a measured social-performance score.';

  return (
    <article className="flex h-full min-h-0 flex-col justify-between gap-8 text-[var(--ink)] font-[var(--font-body)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span className="rounded-full border border-[var(--border)] px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.18em]">
            Case study
          </span>
          <span
            aria-hidden="true"
            className="h-px flex-1 bg-[var(--border)]"
          />
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[var(--accent)]">
            Intent / Occupation
          </span>
        </div>

        <h1 className="max-w-[850px] text-balance font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-[-0.045em]">
          {headline}
        </h1>

        <p className="mt-5 max-w-[820px] text-lg leading-relaxed">
          {subject}
        </p>
      </header>

      <section
        aria-label="Design intent and life in occupation"
        className="grid flex-1 grid-cols-[0.72fr_1.28fr] gap-5"
      >
        <aside className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm">
          <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em]">
            The arrangement
          </p>

          <div className="py-5">
            <p className="font-[var(--font-mono)] text-[144px] font-bold leading-none tracking-[-0.08em] text-[var(--accent)]">
              {impactValue}
            </p>
            <p className="mt-4 font-[var(--font-headline)] text-3xl font-bold leading-tight tracking-tight">
              Rental
              <br />
              mini-houses
            </p>
          </div>

          <p className="border-t border-[var(--border)] pt-5 text-base leading-relaxed">
            {impactLabel}
          </p>
        </aside>

        <div className="grid grid-rows-2 gap-5">
          <section className="flex flex-col justify-between gap-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="font-[var(--font-mono)] text-xs text-[var(--accent)]">
                01
              </span>
              <h2 className="font-[var(--font-headline)] text-2xl font-bold tracking-tight">
                What was planned
              </h2>
            </div>

            <p className="text-[20px] leading-[1.5]">{before}</p>
          </section>

          <section className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]"
            />

            <div className="flex items-center gap-3">
              <span className="font-[var(--font-mono)] text-xs text-[var(--accent)]">
                02
              </span>
              <h2 className="font-[var(--font-headline)] text-2xl font-bold tracking-tight">
                What residents made
              </h2>
            </div>

            <p className="text-[20px] leading-[1.5]">{after}</p>
          </section>
        </div>
      </section>

      <section
        aria-label="Editorial takeaway"
        className="shrink-0 border-t border-[var(--border)] pt-7"
      >
        <div className="grid grid-cols-[0.72fr_1.28fr] gap-5">
          <div className="flex items-start gap-3 pt-1">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 shrink-0 text-[var(--accent)]"
            >
              <path
                d="M4 12h15m-6-6 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="font-[var(--font-mono)] text-xs uppercase leading-relaxed tracking-[0.16em] text-[var(--accent)]">
              Space for
              <br />
              interpretation
            </p>
          </div>

          <p className="text-[23px] leading-[1.45] tracking-[-0.015em]">
            {takeaway}
          </p>
        </div>
      </section>
    </article>
  );
}