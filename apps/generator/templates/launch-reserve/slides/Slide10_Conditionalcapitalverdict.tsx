import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide10({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[28px] tracking-[0.14em] text-[var(--accent)]">
          THE LAUNCH RESERVE VERDICT
        </p>

        <h1 className="mt-5 font-[var(--font-headline)] text-[64px] font-bold leading-[1.05] tracking-[-0.035em]">
          <span className="block">Capital Support Is</span>
          <span className="block">Not Launch Readiness</span>
        </h1>

        <p className="mt-6 max-w-[880px] font-[var(--font-body)] text-[26px] leading-[36px]">
          Both loans remain conditional; the article does not establish
          completed disbursement.
        </p>
      </header>

      <div className="relative mt-8 h-[620px] w-full shrink-0 border-t border-[var(--border)]">
        <svg
          viewBox="0 0 952 620"
          fill="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        >
          {/* An unresolved threshold, not a completed capital transfer. */}
          <rect
            x="504"
            y="188"
            width="16"
            height="418"
            fill="var(--surface)"
          />
          <path
            d="M504 188V606"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M520 188V606"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M490 188H534 M490 606H534"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <text
            x="512"
            y="166"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.08em]"
          >
            conditional
          </text>

          {/* The approach ends visibly short of the gate. */}
          <circle
            cx="26"
            cy="324"
            r="9"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M47 324H458"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="12 12"
          />
          <path
            d="M443 311L461 324L443 337"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />

          {/* Funding annotation connects to the near side of the gate. */}
          <path
            d="M354 205V240H486"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle cx="486" cy="240" r="4" fill="var(--accent)" />

          {/* An abstract horizon: no vehicle, launch, or operational claim. */}
          <path
            d="M654 370Q792 254 930 370"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M642 370H942"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M678 391H906"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 10"
          />
          <path
            d="M792 280V297 M792 357V383"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* Flight annotation remains separate from the capital approach. */}
          <path
            d="M792 407V429H570V448"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle cx="792" cy="407" r="4" fill="var(--border)" />
        </svg>

        <div className="absolute left-0 top-[28px] w-[438px]">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.02em]">
            Funding conditions
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[35px]">
            Financial, legal, technical, investment, due diligence, and other
            requirements apply.
          </p>
        </div>

        <div className="absolute right-0 top-[464px] w-[402px]">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px] tracking-[-0.02em]">
            Flight milestones
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[35px]">
            Pathfinder and Neutron debuts remain scheduled; Block 2 has no
            stated date.
          </p>
        </div>
      </div>
    </section>
  );
}