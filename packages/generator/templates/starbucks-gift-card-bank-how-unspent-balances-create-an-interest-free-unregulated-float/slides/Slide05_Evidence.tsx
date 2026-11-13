import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function HighlightedText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong
            key={index}
            className="box-decoration-clone bg-[var(--accent)]/20 px-1 font-bold"
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

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const findings = [items[0], items[1], items[2]];
  const receipt = slide as typeof slide & {
    documentLabel?: string;
    verdictStamp?: string;
  };

  const receiptTokens = {
    '--ink': '#0A0A0C',
    '--surface': '#F5F5F7',
    '--border': '#0A0A0C33',
    '--accent': '#FF2A2A',
  } as React.CSSProperties;

  const serrations = Array.from({ length: 49 }, (_, index) => {
    const x = 952 - (index * 952) / 48;
    return `${x},${index % 2 === 0 ? 746 : 760}`;
  }).join(' ');

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[3px] w-12 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-5 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <article
        aria-label={receipt.documentLabel}
        style={receiptTokens}
        className="relative isolate mt-8 flex min-h-0 flex-1 flex-col bg-[#0A0A0C] px-8 pb-11 pt-8 text-[var(--ink)]"
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox="0 0 952 760"
          preserveAspectRatio="none"
          fill="none"
        >
          <polygon
            points={`0,0 952,0 ${serrations}`}
            fill="var(--surface)"
          />
          <path
            d="M1 1H951"
            stroke="var(--accent)"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="shrink-0 border-b border-dashed border-[var(--border)] pb-5">
          <p className="font-[var(--font-mono)] text-[22px] font-medium leading-snug tracking-[-0.025em]">
            {receipt.documentLabel}
          </p>
          <p className="mt-3 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.12em] text-[var(--ink)]/65">
            Findings paraphrased · Not quotations
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-evenly gap-5 py-6">
          {findings.map((item, index) =>
            item ? (
              <div
                key={index}
                className="border-l-4 border-[var(--accent)] pl-6"
              >
                <h2 className="font-[var(--font-mono)] text-[20px] font-bold uppercase leading-tight tracking-[0.12em] text-[var(--ink)]/65">
                  {item.title || item.label}
                </h2>
                <p className="mt-2 font-[var(--font-body)] text-[44px] leading-[1.16] tracking-[-0.025em]">
                  <HighlightedText text={item.body ?? ''} />
                </p>
              </div>
            ) : null,
          )}
        </div>

        <div className="flex shrink-0 justify-end border-t border-dashed border-[var(--border)] pt-6">
          <div className="relative -rotate-2 border-[3px] border-[var(--accent)] bg-[var(--surface)] px-5 py-3 text-[var(--accent)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-[4px] border border-[var(--accent)]/40"
            />
            <p className="relative font-[var(--font-mono)] text-[22px] font-bold uppercase leading-snug tracking-[0.035em]">
              {(receipt.verdictStamp ?? '').replace(/\*\*/g, '')}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}