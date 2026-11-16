import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-7 flex items-center justify-between border-b border-[var(--border)] pb-4">
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.12em] text-[var(--accent)]">
            THE DISPUTED LEAP
          </p>
          <span className="font-[var(--font-mono)] text-[20px]">
            05 / {totalSlides}
          </span>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Whose Consent
          <br />
          Binds Whose Claim?
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
          Piccolo challenged extending his acceptance to his wife’s estate.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
        <svg
          viewBox="0 0 952 460"
          className="block max-h-[460px] w-full"
          fill="none"
          role="img"
          aria-label="A personal-account node points toward a separate estate perimeter. An interrupted red conduit marks the disputed extension of consent."
          preserveAspectRatio="xMidYMid meet"
        >
          {/* The dossier seam continues into the text columns below. */}
          <path
            d="M381 24V436"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Personal assent: a discrete, individual node. */}
          <circle
            cx="175"
            cy="228"
            r="69"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="175" cy="228" r="12" fill="var(--ink)" />
          <path
            d="M175 143V124M175 313V332M90 228H71"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />

          <text
            x="175"
            y="88"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            PERSONAL ACCOUNT
          </text>
          <path
            d="M175 352V373H270"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="175"
            y="407"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px]"
          >
            01
          </text>

          {/* Direction of the disputed leap—not a completed connection. */}
          <path
            d="M245 228H440"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M440 228H526"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="7 9"
          />
          <path
            d="M514 218L528 228L514 238"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* An editorial flag, tethered to the contested conduit. */}
          <path
            d="M440 212V139M440 139H494L480 154H440"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <text
            x="457"
            y="111"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px]"
          >
            DISPUTED
          </text>

          {/* Estate perimeter: open space, not a UI container. */}
          <path
            d="M578 119C607 91 649 78 696 82C782 89 840 148 842 227C844 312 780 376 696 381C644 384 599 365 568 329"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M578 119C547 149 533 185 534 228C535 270 546 302 568 329"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <path
            d="M696 196L728 228L696 260L664 228Z"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="696" cy="228" r="6" fill="var(--ink)" />

          <text
            x="696"
            y="151"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            ESTATE
          </text>
          <text
            x="696"
            y="317"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[24px]"
          >
            ?
          </text>
          <path
            d="M696 382V393"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="696"
            y="427"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px]"
          >
            02
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="flex py-6">
          <article className="w-[40%] border-r border-[var(--border)] pr-8">
            <p className="mb-3 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              01 / ASSENT
            </p>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item0?.label ?? 'Individual Assent'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              {item0?.body ??
                'Disney relied on Piccolo’s personal account transactions.'}
            </p>
          </article>

          <article className="w-[60%] pl-8">
            <p className="mb-3 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              02 / PERIMETER
            </p>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item1?.label ?? 'Estate Boundary'}
            </h2>
            <p className="mt-3 max-w-[470px] font-[var(--font-body)] text-[24px] leading-snug">
              {item1?.body ??
                'Piccolo argued his acceptance could not bind the estate.'}
            </p>
          </article>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-[var(--border)] pt-4">
        <span className="font-[var(--font-headline)] text-[20px] font-bold">
          The Fine Print
        </span>
        <span className="font-[var(--font-mono)] text-[20px]">
          thefineprint.pub
        </span>
      </footer>
    </section>
  );
}