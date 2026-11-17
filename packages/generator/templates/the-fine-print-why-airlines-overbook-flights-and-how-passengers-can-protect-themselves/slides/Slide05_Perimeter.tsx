import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Plane, X, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function Slide05({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-5 px-1 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.16em]">
            THE COVERAGE BOUNDARY
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Same disruption.
          <br />
          Different rights.
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
          Losing your seat doesn't always trigger denied-boarding compensation.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          className="block h-full max-h-[420px] w-full"
          role="img"
          aria-label="A crossed-out aircraft beside a large aircraft outline replaced by a smaller aircraft. A divided perimeter distinguishes the two disruptions."
        >
          {/* The dossier's asymmetric 40/60 dividing rule. */}
          <path
            d="M381 24V396"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />

          {/* Canceled service: the route ends before reaching its aircraft. */}
          <path
            d="M38 326C82 326 112 311 135 284"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeDasharray="3 10"
            strokeLinecap="round"
          />
          <path
            d="M126 279L145 290"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <Plane
            x={92}
            y={105}
            width={194}
            height={194}
            stroke="var(--ink)"
            strokeWidth={1.15}
          />

          <circle
            cx="263"
            cy="122"
            r="38"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <X
            x={241}
            y={100}
            width={44}
            height={44}
            stroke="var(--accent)"
            strokeWidth={1.8}
          />

          {/* A broken coverage perimeter, not a UI container. */}
          <path
            d="M48 176C48 97 111 40 190 40C258 40 314 82 330 143
               M331 205C320 286 264 346 190 346C140 346 96 323 70 288"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="7 9"
            strokeLinecap="round"
          />

          {/* Aircraft substitution: former capacity becomes a ghost outline. */}
          <Plane
            x={534}
            y={44}
            width={288}
            height={288}
            stroke="var(--ink)"
            strokeOpacity={0.18}
            strokeWidth={0.85}
            strokeDasharray="2 2"
          />

          <path
            d="M513 197C513 109 582 40 670 40C758 40 827 109 827 197
               M827 238C810 305 749 350 670 350C591 350 530 305 513 238"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="7 9"
            strokeLinecap="round"
          />

          {/* The solid, smaller replacement remains the semantic focal point. */}
          <Plane
            x={600}
            y={153}
            width={142}
            height={142}
            stroke="var(--ink)"
            strokeWidth={1.3}
          />

          <ArrowDownLeft
            x={758}
            y={101}
            width={56}
            height={56}
            stroke="var(--accent)"
            strokeWidth={1.25}
          />
          <ArrowUpRight
            x={535}
            y={279}
            width={56}
            height={56}
            stroke="var(--accent)"
            strokeWidth={1.25}
          />

          {/* Small red perimeter breaks emphasize the coverage boundary. */}
          <path
            d="M40 205H56M505 218H521M819 218H835"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="square"
          />
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[2fr_3fr]">
          <article className="border-r border-[var(--border)] pr-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
                01
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--accent)]"
              />
            </div>

            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Canceled flight'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                "Cancellation doesn't trigger this same compensation entitlement."}
            </p>
          </article>

          <article className="pl-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
                02
              </span>
              <span
                aria-hidden="true"
                className="h-px w-10 bg-[var(--accent)]"
              />
            </div>

            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Smaller aircraft'}
            </h2>
            <p className="mt-3 max-w-[475px] font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                "Safety or operational swaps don't trigger this entitlement."}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}