import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const markerId = `mission-arrow-${React.useId().replace(/:/g, '')}`;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span className="h-[3px] w-12 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="mt-5 max-w-[930px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-5 max-w-[890px] font-[var(--font-body)] text-[28px] leading-[1.35]">
          {slide.subheadline}
        </p>
      </header>

      <figure
        className="relative mt-7 h-[660px] w-full shrink-0"
        aria-label="Policy schematic showing a national-security payload above two abstract launch routes, with an interrupted Vulcan mission redirected toward SpaceX."
      >
        <svg
          viewBox="0 0 952 660"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 12 12"
              refX="10"
              refY="6"
              markerWidth="10"
              markerHeight="10"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path
                d="M2 2L10 6L2 10"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </marker>
          </defs>

          {/* Open engineering grid, not a card container. */}
          <path
            d="M0 1H952M0 659H952"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M476 72V614M292 540H660"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 9"
            opacity="0.6"
          />
          <path
            d="M304 86H324M314 76V96M628 86H648M638 76V96
               M304 590H324M314 580V600M628 590H648M638 580V600"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          <text
            x="0"
            y="39"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.14em]"
          >
            POLICY SCHEMATIC
          </text>

          <text
            x="476"
            y="88"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            National-security payload
          </text>

          {/* Payload node. */}
          <path
            d="M476 111L520 136V186L476 211L432 186V136Z"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M476 139L494 149V172L476 183L458 172V149Z
               M458 149L476 160L494 149M476 160V183"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M443 161H458M494 161H509M476 125V139"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Two abstract policy routes — not an inventory. */}
          <path
            d="M476 211V257"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M476 257C476 298 350 296 350 365V430"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M476 257C476 298 602 296 602 365V430"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle
            cx="476"
            cy="257"
            r="6"
            fill="var(--accent)"
          />

          {/* Schematic launch vehicle on the first route. */}
          <circle
            cx="350"
            cy="470"
            r="43"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <path
            d="M350 441C343 448 341 455 341 463V482H359V463
               C359 455 357 448 350 441Z
               M341 471L332 483V490L341 485
               M359 471L368 483V490L359 485
               M346 488L350 499L354 488"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M343 460H357M324 520H376"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* SpaceX destination on the second route. */}
          <circle
            cx="602"
            cy="470"
            r="43"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M602 441C595 448 593 455 593 463V482H611V463
               C611 455 609 448 602 441Z
               M593 471L584 483V490L593 485
               M611 471L620 483V490L611 485
               M598 488L602 499L606 488"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M595 460H609M576 520H628"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="602"
            y="558"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[24px]"
          >
            SpaceX
          </text>

          {/* Separate interruption annotation, outside the policy fork. */}
          <text
            x="758"
            y="193"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[24px]"
          >
            Vulcan
          </text>
          <path
            d="M744 215H772L786 229V257L772 271H744L730 257V229Z"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M751 233V253M765 233V253"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M758 271V304
               C758 330 674 330 674 365
               V408
               C674 431 653 443 638 449"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeDasharray="8 8"
            markerEnd={`url(#${markerId})`}
          />

          {/* Fine leaders anchor opposing factual callouts. */}
          <path
            d="M259 330H292L338 368"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <circle cx="338" cy="368" r="4" fill="var(--ink)" />

          <path
            d="M700 413H684L674 399"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <circle cx="674" cy="399" r="4" fill="var(--accent)" />
        </svg>

        <figcaption className="absolute left-0 top-[220px] w-[255px]">
          <div className="mb-4 h-[3px] w-10 bg-[var(--accent)]" />
          <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-[1.1] tracking-[-0.035em]">
            at least two
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[24px] leading-[1.35]">
            US rocket programs supported under assured-access policy since the
            1990s.
          </p>
        </figcaption>

        <aside className="absolute right-0 top-[405px] w-[252px]">
          <div className="mb-4 h-[3px] w-10 bg-[var(--accent)]" />
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.1] tracking-[-0.035em] text-[var(--accent)]">
            twice in the last two years
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[24px] leading-[1.35]">
            Solid rocket booster problems grounded Vulcan.
          </p>
        </aside>
      </figure>
    </section>
  );
}