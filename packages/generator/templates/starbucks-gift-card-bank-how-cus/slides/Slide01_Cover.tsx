import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;

  const headlineLines =
    slide.headline === 'Your Rewards. Their Interest-Free Financing.'
      ? ['Your Rewards.', 'Their Interest-Free', 'Financing.']
      : [slide.headline];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  const page = String(slide.index + 1).padStart(2, '0');
  const pages = String(totalSlides || 7).padStart(2, '0');

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-[24px] text-[var(--ink)]">
      <header className="flex h-[308px] shrink-0 flex-col gap-3">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] leading-[24px] tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>THE FINE PRINT</span>
        </div>

        <h1 className="font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.04em]">
          {headlineLines.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="max-w-[900px] font-[var(--font-body)] text-[26px] leading-[1.2] text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <figure className="my-3 flex min-h-0 flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 650"
          role="img"
          aria-label="Conceptual prepaid flow from a gift card into corporate cash, with a purchase outlet and a separate breakage accounting dial."
          className="block h-full max-h-[568px] w-full max-w-[832px] text-[var(--ink)]"
        >
          {/* Registration marks frame the specimen, not a measurement scale. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          >
            <path d="M24 48H44M34 38V58" />
            <path d="M898 48H918M908 38V58" />
            <path d="M24 594H44M34 584V604" />
            <path d="M898 594H918M908 584V604" />
          </g>

          {/* Closed-loop gift-card specimen: no chip or contactless marks. */}
          <g transform="rotate(-12 227 190)">
            <rect
              x="52"
              y="80"
              width="350"
              height="220"
              rx="2"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeOpacity="0.25"
              strokeWidth="2"
            />

            <path
              d="M76 112V104H100M354 104H378V128M76 252V276H100M354 276H378V252"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />

            <g
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="miter"
            >
              <path d="M176 178A54 54 0 0 1 275 163" />
              <path d="M260 158L278 165L280 146" />
              <path d="M278 202A54 54 0 0 1 179 217" />
              <path d="M194 222L176 215L174 234" />
            </g>

            <circle
              cx="227"
              cy="190"
              r="22"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />

            <rect
              x="250"
              y="289"
              width="28"
              height="11"
              fill="var(--accent)"
            />
          </g>

          {/* Tank shell: elliptical ends establish cylindrical volume. */}
          <path
            d="M447 150V498
               C447 520.1 532.1 538 637 538
               C741.9 538 827 520.1 827 498
               V150Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          {/* Uncalibrated conceptual liquid; no balance or reserve scale. */}
          <path
            d="M447 324
               C447 306.3 532.1 292 637 292
               C741.9 292 827 306.3 827 324
               V498
               C827 520.1 741.9 538 637 538
               C532.1 538 447 520.1 447 498Z"
            fill="var(--accent)"
            fillOpacity="0.12"
          />

          <ellipse
            cx="637"
            cy="324"
            rx="190"
            ry="32"
            fill="var(--accent)"
            fillOpacity="0.08"
            stroke="var(--accent)"
            strokeOpacity="0.65"
            strokeWidth="1.5"
          />

          <ellipse
            cx="637"
            cy="150"
            rx="190"
            ry="40"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          <ellipse
            cx="637"
            cy="150"
            rx="151"
            ry="24"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />

          <path
            d="M447 150V498
               C447 520.1 532.1 538 637 538
               C741.9 538 827 520.1 827 498V150
               M447 498
               C447 475.9 532.1 458 637 458
               C741.9 458 827 475.9 827 498"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          {/* Prepayment enters through a visibly flanged inlet. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinejoin="miter"
          >
            <path d="M284 291C284 335 335 342 380 342H447" />
            <path d="M407 329V355M420 329V355" />
            <path d="M431 335L440 342L431 349" />
          </g>

          <text
            x="323"
            y="390"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[24px] tracking-[0.08em]"
          >
            PREPAY
          </text>

          {/* Purchase is the solid lower flow outlet. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinejoin="miter"
          >
            <path d="M637 538V567Q637 585 619 585H386" />
            <path d="M624 549H650M624 560H650" />
            <path d="M400 577L386 585L400 593" />
          </g>

          <text
            x="386"
            y="627"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[24px] tracking-[0.08em]"
          >
            PURCHASE
          </text>

          {/* Dashed recognition branch terminates at a register dial. */}
          <path
            d="M827 360H858Q874 360 874 344V249"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="7 7"
          />

          <rect
            x="821"
            y="354"
            width="12"
            height="12"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <circle
            cx="874"
            cy="205"
            r="44"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="2"
          />

          <path
            d="M847 219A30 30 0 1 1 901 219"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.25"
            strokeWidth="1.5"
          />

          <g
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          >
            <path d="M874 171V179" />
            <path d="M850 181L856 187" />
            <path d="M898 181L892 187" />
            <path d="M840 205H848" />
            <path d="M900 205H908" />
          </g>

          <path
            d="M874 205L892 186"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="874" cy="205" r="4" fill="var(--accent)" />

          <text
            x="914"
            y="405"
            textAnchor="end"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[24px] tracking-[0.08em]"
          >
            BREAKAGE
          </text>
        </svg>
      </figure>

      <footer className="flex h-[80px] shrink-0 flex-col justify-between border-t border-[var(--border)] pt-3">
        <div className="flex items-baseline justify-between gap-6 font-[var(--font-mono)] text-[20px] leading-[24px]">
          <span>thefineprint.co</span>
          {slide.issueBadge && (
            <span className="tracking-[0.03em] text-[var(--ink)]/70">
              {slide.issueBadge}
            </span>
          )}
          <span className="shrink-0 tabular-nums text-[var(--accent)]">
            {page} / {pages}
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-6">
          <p className="font-[var(--font-body)] text-[22px] leading-[28px] text-[var(--ink)]/70">
            Conceptual flow—not a segregated reserve.
          </p>

          {t0 && (
            <div className="flex shrink-0 items-baseline gap-2 font-[var(--font-mono)] text-[22px] leading-[28px]">
              {t0.qualifier && <span>{t0.qualifier}</span>}
              <span className="font-bold tabular-nums">{t0.value}</span>
              {t0.unit && <span>{t0.unit}</span>}
            </div>
          )}
        </div>
      </footer>
    </section>
  );
}