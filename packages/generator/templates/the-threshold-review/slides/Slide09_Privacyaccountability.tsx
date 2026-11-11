import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  const theme = {
    '--ink': '#182923',
    '--paper': '#E7ECE5',
    '--surface': '#D6DFD5',
    '--accent': '#9B254D',
    '--border': '#A0AFA3',
    backgroundColor: 'var(--paper)',
  } as React.CSSProperties;

  function EvidenceBand({
    width,
    className,
    children,
  }: {
    width: number;
    className: string;
    children: React.ReactNode;
  }) {
    return (
      <article
        className={`relative isolate shrink-0 ${className}`}
        style={{ width }}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          viewBox={`0 0 ${width} 100`}
          preserveAspectRatio="none"
          fill="none"
        >
          <rect width={width} height="100" fill="var(--surface)" />
          <path
            d={`M0 1H${width}`}
            stroke="var(--ink)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M0 99H${width}`}
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1 1V99"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {children}
      </article>
    );
  }

  function AttributionMarker() {
    return (
      <svg
        aria-hidden="true"
        className="mt-[11px] h-[20px] w-[20px] shrink-0 text-[var(--accent)]"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M0 0H20V20H0Z" fill="currentColor" />
        <path d="M5 10H15" stroke="var(--paper)" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
      data-slide-id={slide.id}
      data-total-slides={totalSlides}
    >
      <header className="flex shrink-0 flex-col gap-3">
        <p className="font-[var(--font-mono)] text-[22px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          THE TRUST TEST
        </p>

        <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[64px] tracking-[-0.035em]">
          Encryption Meets A
          <br />
          Troubled Privacy Record
        </h1>

        <p className="max-w-[920px] font-[var(--font-body)] text-[26px] leading-[34px]">
          Amazon promises protection; EFF says the encryption remains well short
          of end-to-end.
        </p>
      </header>

      <div className="mt-6 flex shrink-0 flex-col gap-4">
        <EvidenceBand
          width={952}
          className="h-[300px] px-8 py-5"
        >
          <div className="flex items-start gap-4">
            <AttributionMarker />
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.02em]">
              2023 FTC charges
            </h2>
          </div>

          <p className="mt-3 max-w-[850px] font-[var(--font-body)] text-[26px] leading-[34px]">
            Alleged employee/contractor viewing of private recordings; weak
            safeguards enabled hackers’ access:
          </p>

          <p className="mt-3 flex items-baseline gap-5 border-t border-[var(--border)] pt-2">
            <span className="font-[var(--font-mono)] text-[84px] font-bold leading-[90px] tracking-[-0.06em] text-[var(--accent)]">
              55,000
            </span>
            <span className="font-[var(--font-body)] text-[28px] leading-[36px]">
              US accounts.
            </span>
          </p>
        </EvidenceBand>

        <EvidenceBand
          width={924}
          className="ml-7 h-[196px] px-8 py-5"
        >
          <div className="flex items-start gap-4">
            <AttributionMarker />
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.02em]">
              September 2026 introduction
            </h2>
          </div>

          <p className="mt-4 max-w-[810px] font-[var(--font-body)] text-[26px] leading-[34px]">
            <span className="font-semibold text-[var(--accent)]">
              Amazon says
            </span>{' '}
            Throw Away the Key Encryption will protect both robots’ videos.
          </p>
        </EvidenceBand>

        <EvidenceBand
          width={896}
          className="ml-14 h-[176px] px-8 py-5"
        >
          <div className="flex items-start gap-4">
            <AttributionMarker />
            <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.02em]">
              EFF’s assessment
            </h2>
          </div>

          <p className="mt-4 max-w-[800px] font-[var(--font-body)] text-[26px] leading-[34px]">
            Improves former default settings, but remains{' '}
            <span className="font-semibold text-[var(--accent)]">
              well short of end-to-end encryption.
            </span>
          </p>
        </EvidenceBand>
      </div>
    </section>
  );
}