import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-6 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold uppercase tracking-[0.14em]">
            CONSENT BOUNDARY AUDIT
          </p>
        </div>

        <h1 className="max-w-[940px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          A Free Trial,
          <br />
          a Wrongful-Death Defense
        </h1>

        <p className="mt-5 max-w-[880px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Disney sought arbitration—not automatic immunity from damages.
        </p>
      </header>

      <div className="relative flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          role="img"
          aria-label="A 2019 signup document connected toward a 2024 court action across a highlighted consent boundary."
          className="h-full max-h-[500px] w-full"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          <title>From signup terms to a court defense</title>
          <desc>
            Two geometric nodes represent the 2019 signup and the 2024
            lawsuit. A directional conduit crosses a red dashed boundary,
            illustrating Disney’s invocation of the earlier trial terms.
          </desc>

          {/* Architectural registration grid. */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M0 48H952M0 412H952" />
            <path d="M24 0V460M928 0V460" />
            <path d="M0 230H952" strokeDasharray="3 13" />
            <path d="M324 48V412M628 48V412" />
          </g>

          <g stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="2">
            <path d="M12 48H36M24 36V60" />
            <path d="M916 48H940M928 36V60" />
            <path d="M12 412H36M24 400V424" />
            <path d="M916 412H940M928 400V424" />
          </g>

          {/* Left node: the signup document. */}
          <rect
            x="48"
            y="90"
            width="250"
            height="280"
            rx="2"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M82 90H48V124"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M264 370H298V336"
            stroke="var(--ink)"
            strokeWidth="3"
          />

          <g stroke="var(--ink)" strokeWidth="3">
            <path d="M120 126H193L224 157V238H120Z" />
            <path d="M193 126V157H224" />
            <path d="M140 178H202M140 196H202M140 214H177" />
          </g>
          <rect
            x="194"
            y="210"
            width="34"
            height="34"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M202 226L209 233L221 219"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <text
            x="173"
            y="338"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[80px] font-bold"
            letterSpacing="-5"
          >
            2019
          </text>

          {/* The consent boundary remains visibly distinct from the nodes. */}
          <path
            d="M476 76V412"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="6 9"
            opacity="0.65"
          />
          <path
            d="M476 48H544L529 76H476Z"
            fill="var(--accent)"
          />

          {/* Directional conduit, deliberately contained within the art. */}
          <path
            d="M298 230H350L387 193H565L602 230H654"
            stroke="var(--border)"
            strokeWidth="16"
            strokeLinejoin="round"
          />
          <path
            d="M298 230H350L387 193H565L602 230H654"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <circle
            cx="298"
            cy="230"
            r="7"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <rect
            x="452"
            y="169"
            width="48"
            height="48"
            transform="rotate(45 476 193)"
            fill="var(--paper, #0A0A0C)"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M463 193H489M480 184L489 193L480 202"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <path
            d="M354 275H598"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M354 267V283M598 267V283"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="476"
            y="321"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
            letterSpacing="2"
          >
            INVOKED
          </text>

          {/* Right node: the court action, not an adjudicated outcome. */}
          <rect
            x="654"
            y="90"
            width="250"
            height="280"
            rx="2"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M870 90H904V124"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M688 370H654V336"
            stroke="var(--ink)"
            strokeWidth="3"
          />

          <g stroke="var(--ink)" strokeWidth="3">
            <path d="M711 164L779 126L847 164Z" />
            <path d="M720 177H838M710 242H848M720 229H838" />
            <path d="M733 178V228M763 178V228M795 178V228M825 178V228" />
          </g>
          <rect
            x="770"
            y="145"
            width="18"
            height="6"
            fill="var(--accent)"
          />

          <text
            x="779"
            y="338"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[80px] font-bold"
            letterSpacing="-5"
          >
            2024
          </text>

          <path
            d="M636 220L646 230L636 240"
            stroke="var(--accent)"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        <article className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 pb-6 pt-5">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {item0?.label ?? '2019 signup'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {item0?.body ??
              'Disney invoked Piccolo’s Disney+ trial in a 2024 lawsuit.'}
          </p>
        </article>

        <article className="border-t-2 border-[var(--accent)] bg-[var(--surface)] px-6 pb-6 pt-5">
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {item1?.label ?? 'Requested relief'}
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {item1?.body ??
              'Compel arbitration and stay the court action.'}
          </p>
        </article>
      </div>
    </section>
  );
}