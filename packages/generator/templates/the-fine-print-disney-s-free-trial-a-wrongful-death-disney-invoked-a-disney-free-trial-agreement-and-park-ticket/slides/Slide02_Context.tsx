import React from 'react';
import { Wine } from 'lucide-react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.18em]">
            {slide.kicker ?? 'THE HUMAN COST'}
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          {slide.headline ?? 'Dinner Ended in a Death'}
        </h1>

        <p className="mt-5 max-w-[790px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'Dr. Kanokporn Tangsuan died on October 5, 2023, after dining.'}
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          className="h-full max-h-[420px] w-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="An empty dinner plate between a fork, knife, and wine glass."
        >
          {/* Empty place setting: the absence is the focal point. */}
          <ellipse
            cx="476"
            cy="223"
            rx="170"
            ry="162"
            fill="var(--surface)"
          />
          <ellipse
            cx="476"
            cy="210"
            rx="168"
            ry="160"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            opacity="0.52"
          />
          <ellipse
            cx="476"
            cy="210"
            rx="146"
            ry="139"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <ellipse
            cx="476"
            cy="210"
            rx="114"
            ry="108"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1"
            opacity="0.22"
          />

          {/* Bespoke fork silhouette. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.72"
          >
            <path d="M242 103V160Q242 185 262 193V322Q262 330 268 330Q274 330 274 322V193Q294 185 294 160V103" />
            <path d="M259 103V158M277 103V158" />

            {/* Dinner knife, with a distinct blade and handle. */}
            <path d="M696 103Q674 138 674 195Q674 210 691 210V322Q691 330 697 330Q703 330 703 322V103Z" />
          </g>

          <Wine
            x={757}
            y={82}
            width={76}
            height={108}
            stroke="var(--ink)"
            strokeWidth={0.8}
            opacity={0.5}
            aria-hidden="true"
          />

          {/* A restrained redline on the plate rim. */}
          <path
            d="M379 341A168 160 0 0 0 531 361"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Print registration marks, not a second frame. */}
          <g
            stroke="var(--border)"
            strokeWidth="1"
            fill="none"
            aria-hidden="true"
          >
            <path d="M95 210H119M107 198V222" />
            <path d="M833 299H857M845 287V311" />
          </g>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
          <article className="pr-8">
            <h2 className="mb-4 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Jeffrey Piccolo'}
            </h2>
            <p className="flow-root font-[var(--font-body)] text-[24px] leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-headline)] first-letter:text-[76px] first-letter:font-bold first-letter:leading-none first-letter:text-[var(--accent)]">
              {items[0]?.body ??
                'Her husband alleged staff promised to exclude her allergens.'}
            </p>
          </article>

          <article className="pl-8">
            <h2 className="mb-4 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Disney Springs'}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'Raglan Road was independent; Disney was its landlord.'}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}