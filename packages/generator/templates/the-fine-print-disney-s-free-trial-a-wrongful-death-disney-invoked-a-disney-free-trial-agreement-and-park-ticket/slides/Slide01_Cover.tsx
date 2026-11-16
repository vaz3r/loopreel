import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Tv, FileText, Gavel, Landmark } from 'lucide-react';

export default function Slide01({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const sceneId = React.useId().replace(/:/g, '');

  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em]">
            FINE PRINT AUTOPSY
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Disney’s Free Trial
          <br />
          Became a Court Fight
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Disney wanted a private decision-maker, not a courtroom hearing.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-6 left-0 w-[40%] border-r border-[var(--border)] pr-8"
        />

        <svg
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-labelledby={`${sceneId}-title ${sceneId}-description`}
          className="relative h-full max-h-[420px] w-full"
          fill="none"
        >
          <title id={`${sceneId}-title`}>
            From streaming terms to a disputed legal forum
          </title>
          <desc id={`${sceneId}-description`}>
            A television and account document on the left. A crimson route
            leads toward a private decision-maker on the right, while a muted
            branch leads toward a courthouse.
          </desc>

          <defs>
            <marker
              id={`${sceneId}-arrow`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M1 1L8 5L1 9" stroke="var(--accent)" strokeWidth="1.5" />
            </marker>
          </defs>

          {/* Left dossier: the screen and the terms beneath it. */}
          <path
            d="M60 64V46H78 M310 46H328V64 M60 332V350H78"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <Tv
            x={103}
            y={54}
            width={154}
            height={126}
            stroke="var(--ink)"
            strokeWidth={1.1}
          />

          <path
            d="M180 185V211"
            stroke="var(--ink)"
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeDasharray="3 7"
          />

          <g transform="rotate(-7 186 276)">
            <path
              d="M129 219H217L245 247V330H129Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <path
              d="M217 219V247H245"
              stroke="var(--ink)"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <FileText
              x={144}
              y={237}
              width={42}
              height={42}
              stroke="var(--ink)"
              strokeWidth={1.2}
            />
            <path
              d="M148 292H224 M148 307H203"
              stroke="var(--ink)"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <path
              d="M145 296L226 293"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          <text
            x="180"
            y="386"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.16em]"
          >
            TERMS
          </text>

          {/* Right dossier: a redirection, not an adjudicated outcome. */}
          <path
            d="M264 282C358 282 421 278 466 226S571 112 680 112"
            stroke="var(--accent)"
            strokeOpacity="0.08"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            d="M264 282C358 282 421 278 466 226S571 112 680 112"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            markerEnd={`url(#${sceneId}-arrow)`}
          />

          <path
            d="M464 230C519 288 579 314 681 314"
            stroke="var(--ink)"
            strokeOpacity="0.22"
            strokeWidth="2"
            strokeDasharray="6 9"
          />

          <path
            d="M699 67A78 78 0 0 1 834 121"
            stroke="var(--accent)"
            strokeOpacity="0.3"
            strokeWidth="1.5"
          />

          <Gavel
            x={714}
            y={66}
            width={100}
            height={100}
            stroke="var(--accent)"
            strokeWidth={1.3}
          />
          <path
            d="M717 175H815"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="765"
            y="208"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px] tracking-[0.12em]"
          >
            PRIVATE
          </text>

          <Landmark
            x={724}
            y={268}
            width={82}
            height={82}
            stroke="var(--ink)"
            strokeOpacity="0.4"
            strokeWidth={1.2}
          />
          <text
            x="765"
            y="386"
            textAnchor="middle"
            fill="var(--ink)"
            fillOpacity="0.65"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.16em]"
          >
            COURT
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <article className="grid grid-cols-[2fr_3fr] items-start pb-5">
          <h2 className="border-r border-[var(--border)] pr-8 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[0]?.label ?? 'Streaming signup'}
          </h2>
          <p className="pl-8 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'Disney said account terms reached beyond watching TV.'}
          </p>
        </article>

        <article className="grid grid-cols-[2fr_3fr] items-start border-t border-[var(--border)] pt-5">
          <h2 className="border-r border-[var(--border)] pr-8 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {items[1]?.label ?? 'Wrongful-death claim'}
          </h2>
          <p className="pl-8 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[1]?.body ??
              'Her husband sued; Disney sought a different decision-maker.'}
          </p>
        </article>
      </div>
    </section>
  );
}