import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const headlineWords = (slide.headline ?? '').split(/\s+/);
  const headlineLines = [
    headlineWords.slice(0, 2).join(' '),
    headlineWords.slice(2, 4).join(' '),
    headlineWords.slice(4).join(' '),
  ];

  const [kickerLead, ...kickerRest] = (slide.kicker ?? '').split('/');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 items-baseline justify-between gap-7 border-b border-[var(--ink)] pb-5">
        <p className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.035em]">
          {slide.publication}
        </p>
        <p className="shrink-0 font-[var(--font-mono)] text-[20px] leading-normal tracking-wide">
          {slide.domain}
        </p>
      </div>

      <div className="mt-8 self-start border border-[var(--accent)] px-6 py-4 text-[var(--accent)]">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-[1.5] tracking-[0.16em]">
          <span className="block">
            {kickerLead.trim()}
            {kickerRest.length > 0 ? ' /' : ''}
          </span>
          {kickerRest.length > 0 && (
            <span className="block">{kickerRest.join('/').trim()}</span>
          )}
        </p>
      </div>

      <h1 className="mt-9 shrink-0 font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
        {headlineLines.map((line, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </h1>

      <div className="flex min-h-[440px] flex-1 items-center justify-center py-7">
        <svg
          viewBox="0 0 1080 1350"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
          className="h-[500px] w-[400px] shrink-0 text-[var(--ink)]"
        >
          {/* A single fractured typographic column, not a reconstruction. */}
          <path
            d="M250 120H850V210H790V270H745V585L355 715V270H310V210H250Z"
            fill="currentColor"
          />

          <path
            d="M320 815L710 685V1110H770V1175H830V1270H230V1175H290V1110H320Z"
            fill="currentColor"
          />

          {/* The exposed diagonal fracture is the only chromatic gesture. */}
          <path
            d="M307 759L768 605L790 654L329 808Z"
            fill="var(--accent)"
          />

          {/* Incised vertical rhythm remains interrupted by the fracture. */}
          <g
            fill="none"
            stroke="var(--paper, #f5f5f7)"
            strokeWidth="12"
          >
            <path d="M450 285V648" />
            <path d="M550 285V615" />
            <path d="M650 285V582" />
            <path d="M415 818V1090" />
            <path d="M515 785V1090" />
            <path d="M615 752V1090" />
          </g>

          <path
            d="M310 210H790M290 1175H770"
            fill="none"
            stroke="var(--paper, #f5f5f7)"
            strokeWidth="8"
          />
        </svg>
      </div>

      <p className="max-w-[860px] shrink-0 font-[var(--font-body)] text-[30px] leading-snug tracking-[-0.015em]">
        {slide.subheadline}
      </p>

      <div className="mt-9 grid shrink-0 grid-cols-2 gap-8 border-t border-[var(--border)] pt-7">
        {[item0, item1].map((item, index) => (
          <div
            key={index}
            className="flex min-w-0 flex-col items-start gap-3"
          >
            <p className="border-l-[4px] border-[var(--accent)] pl-4 font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.045em]">
              {item?.badge}
            </p>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {item?.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex shrink-0 items-center gap-4 border-t border-[var(--ink)] pt-5">
        <span
          aria-hidden="true"
          className="h-3 w-3 shrink-0 bg-[var(--accent)]"
        />
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.12em]">
          {slide.issueBadge}
        </p>
      </div>
    </section>
  );
}