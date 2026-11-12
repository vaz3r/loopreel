import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CoverContent = {
  publication: string;
  kicker: string;
  headline: string;
  subheadline: string;
  issueBadge: string;
  telemetry?: Array<{ badge: string; label: string }>;
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cover = slide as typeof slide & CoverContent;
  const telemetry = cover.telemetry ?? [];
  const publication =
    cover.publication || (brand as { name?: string })?.name;

  const headlineLines = cover.headline
    .replace(' Colony', '\nColony')
    .replace(' a Ruin', '\na Ruin')
    .split('\n');

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      data-total-slides={totalSlides}
    >
      <div className="flex shrink-0 flex-col gap-8">
        <div className="flex items-center justify-between gap-6 border-b border-[var(--border)] pb-6">
          <p className="font-[var(--font-headline)] text-[36px] font-bold leading-none tracking-[-0.04em]">
            {publication}
          </p>

          <p className="shrink-0 border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-[var(--font-mono)] text-[20px] leading-none tracking-[0.08em]">
            {cover.issueBadge}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-5 w-5 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
            {cover.kicker}
          </p>
        </div>

        <h1
          aria-label={cover.headline}
          className="font-[var(--font-headline)] text-[72px] font-bold leading-[1.02] tracking-[-0.04em]"
          style={{
            fontFamily:
              'var(--font-headline, Georgia), "Times New Roman", serif',
          }}
        >
          {headlineLines.map((line, index) => (
            <span key={index} aria-hidden="true" className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="max-w-[850px] font-[var(--font-body)] text-[30px] leading-snug">
          {cover.subheadline}
        </p>
      </div>

      <div className="my-8 flex min-h-[650px] flex-1 items-center justify-center">
        <svg
          viewBox="0 0 1080 1350"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="block h-full max-h-[850px] w-full"
          role="img"
          aria-label="A monumental ancient column, broken across an orange fracture."
        >
          <rect
            width="1080"
            height="1350"
            fill="var(--paper, #0D0E12)"
          />

          {/* Quiet architectural registration marks. */}
          <g
            fill="none"
            stroke="var(--border, #F1F3F925)"
            strokeWidth="2"
          >
            <path d="M80 170V80H170 M910 80H1000V170" />
            <path d="M80 1180V1270H170 M910 1270H1000V1180" />
            <path d="M80 1218H1000" />
          </g>

          {/* Detached capital and upper shaft: one displaced fragment. */}
          <g transform="rotate(-11 540 390)">
            <path
              d="M242 145H838V205H242Z"
              fill="var(--ink)"
            />
            <path
              d="M270 215H810L778 269H302Z"
              fill="var(--ink)"
            />
            <path
              d="M313 278H767V326H313Z"
              fill="var(--ink)"
            />
            <path
              d="M344 337H736L721 539L660 570L591 538L524 591L450 555L365 588Z"
              fill="var(--ink)"
            />

            <g
              fill="none"
              stroke="var(--paper, #0D0E12)"
              strokeWidth="17"
            >
              <path d="M401 340L415 552" />
              <path d="M470 340L477 550" />
              <path d="M540 340V568" />
              <path d="M610 340L604 542" />
              <path d="M679 340L666 548" />
            </g>

            <path
              d="M242 145H838V159H242Z"
              fill="var(--surface)"
              opacity="0.45"
            />
          </g>

          {/* The fracture is a material interruption, not a connector. */}
          <path
            d="M311 633L405 599L476 636L550 587L622 622L694 589L765 625L748 671L679 645L610 678L548 645L475 692L403 655L327 684Z"
            fill="var(--accent)"
          />

          {/* Standing lower shaft. */}
          <path
            d="M348 709L407 683L478 719L548 671L610 705L680 672L735 697L774 1100H306Z"
            fill="var(--ink)"
          />

          <g fill="var(--paper, #0D0E12)">
            <path d="M393 720L411 728L396 1080H372Z" />
            <path d="M465 746L484 754L482 1080H459Z" />
            <path d="M536 705L554 699L558 1080H535Z" />
            <path d="M606 731L624 725L639 1080H616Z" />
            <path d="M678 707L696 714L718 1080H695Z" />
          </g>

          {/* A small missing chip keeps the ruin deliberately imperfect. */}
          <path
            d="M753 880L718 910L759 942Z"
            fill="var(--paper, #0D0E12)"
          />

          {/* Heavy stepped plinth. */}
          <path
            d="M288 1112H792V1150H288Z"
            fill="var(--ink)"
          />
          <path
            d="M251 1162H829V1205H251Z"
            fill="var(--ink)"
          />
          <path
            d="M215 1218H865V1260H215Z"
            fill="var(--ink)"
          />
          <path
            d="M215 1260H865"
            stroke="var(--accent)"
            strokeWidth="5"
          />
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-8 border-t border-[var(--border)] pt-7 pb-2">
        {telemetry.slice(0, 2).map((item, index) => (
          <div
            key={`${item.badge}-${index}`}
            className={
              index === 0
                ? 'flex min-w-0 flex-col gap-3'
                : 'flex min-w-0 flex-col gap-3 border-l border-[var(--border)] pl-8'
            }
          >
            <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.04em]">
              {item.badge}
            </p>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 bg-[var(--accent)]"
              />
              <p className="font-[var(--font-body)] text-[24px] leading-snug">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}