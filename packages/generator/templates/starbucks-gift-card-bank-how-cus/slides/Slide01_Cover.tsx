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
  void totalSlides;

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  const theme = {
    '--paper': '#0D0E12',
    '--ink': '#F1F3F9',
    '--accent': '#FF4D00',
    '--surface': '#161820',
    '--border': '#262938',
  } as React.CSSProperties;

  return (
    <section
      style={theme}
      className="flex flex-col h-full min-h-0 w-full justify-between bg-[var(--paper)] text-[var(--ink)]"
    >
      <div className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.14em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="my-6 w-full border-b border-[var(--border)]"
        />

        <p className="max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </div>

      <div className="relative my-4 flex min-h-[460px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 650"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Stored-value payments enter a reservoir while a closed outlet leaves the coffee cup empty. A timing metaphor, not a depiction of segregated reserves."
          className="absolute inset-0 h-full w-full text-[var(--ink)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          {/* Stored-value card: tipped toward the reservoir inlet. */}
          <g transform="rotate(17 258 175)">
            <path
              data-part="01-card-perimeter"
              d="M97 68 H419 L438 87 V263 L419 282 H97 L78 263 V87 Z"
              fill="var(--surface)"
              strokeOpacity="0.8"
            />
            <path
              data-part="02-inset-perimeter"
              d="M105 80 H411 L426 95 V255 L411 270 H105 L90 255 V95 Z"
              strokeOpacity="0.25"
            />
            <path
              data-part="03-magnetic-stripe"
              d="M90 119 H426 V163 H90 Z"
              fill="var(--paper)"
              strokeOpacity="0.3"
            />
            <path
              data-part="04-stripe-highlight"
              d="M90 120 H426"
              strokeOpacity="0.75"
            />
            <path
              data-part="05-registration-notch"
              d="M64 93 H78 M71 86 V100"
              strokeOpacity="0.5"
            />
            <path
              data-part="06-registration-notch"
              d="M438 93 H452 M445 86 V100"
              strokeOpacity="0.5"
            />
            <path
              data-part="07-registration-notch"
              d="M64 257 H78 M71 250 V264"
              strokeOpacity="0.5"
            />
            <path
              data-part="08-registration-notch"
              d="M438 257 H452 M445 250 V264"
              strokeOpacity="0.5"
            />
          </g>

          {/* Reservoir section: deliberately unnumbered and uncalibrated. */}
          <path
            data-part="09-reservoir-shell"
            d="M536 208
               C536 178 844 178 844 208
               V458
               C844 516 536 516 536 458 Z"
            fill="var(--surface)"
            strokeOpacity="0.6"
          />
          <ellipse
            data-part="10-upper-ellipse"
            cx="690"
            cy="208"
            rx="154"
            ry="39"
            fill="var(--paper)"
            strokeOpacity="0.8"
          />

          <path
            data-part="13-orange-liquid-body"
            d="M548 339
               C548 385 832 385 832 339
               V453
               C832 501 548 501 548 453 Z"
            fill="var(--accent)"
            fillOpacity="0.2"
            stroke="var(--accent)"
            strokeOpacity="0.55"
          />
          <ellipse
            data-part="12-liquid-surface"
            cx="690"
            cy="339"
            rx="142"
            ry="35"
            fill="var(--accent)"
            fillOpacity="0.48"
            stroke="var(--accent)"
          />
          <ellipse
            data-part="11-lower-ellipse"
            cx="690"
            cy="458"
            rx="154"
            ry="39"
            strokeOpacity="0.5"
          />

          <path
            data-part="14-sight-glass"
            d="M787 262 H807 V435 H787 Z"
            fill="var(--paper)"
            strokeOpacity="0.75"
          />
          <path
            data-part="15-graduation-tick"
            d="M793 285 H801"
            strokeOpacity="0.65"
          />
          <path
            data-part="16-graduation-tick"
            d="M793 310 H801"
            strokeOpacity="0.65"
          />
          <path
            data-part="17-graduation-tick"
            d="M793 335 H801"
            strokeOpacity="0.65"
          />
          <path
            data-part="18-graduation-tick"
            d="M793 360 H801"
            strokeOpacity="0.65"
          />
          <path
            data-part="19-graduation-tick"
            d="M793 385 H801"
            strokeOpacity="0.65"
          />
          <path
            data-part="20-graduation-tick"
            d="M793 410 H801"
            strokeOpacity="0.65"
          />

          <path
            data-part="21-inlet-lip"
            d="M546 188 L566 226
               Q605 243 644 226
               L664 188
               Q605 169 546 188 Z"
            fill="var(--paper)"
            strokeOpacity="0.9"
          />

          {/* Three discrete incoming payments; no outgoing stream. */}
          <path
            data-part="22-payment-sliver"
            d="M456 151 L486 164 L481 177 L451 164 Z"
            fill="var(--accent)"
            stroke="var(--accent)"
          />
          <path
            data-part="23-payment-sliver"
            d="M502 164 L526 184 L518 195 L494 175 Z"
            fill="var(--accent)"
            stroke="var(--accent)"
          />
          <path
            data-part="24-payment-sliver"
            d="M551 178 L569 203 L558 211 L540 186 Z"
            fill="var(--accent)"
            stroke="var(--accent)"
          />

          {/* Closed outlet; the valve bar crosses the outlet axis. */}
          <path
            data-part="25-outlet-stem"
            d="M536 416 H469
               V465 H487
               V434 H536 Z"
            fill="var(--surface)"
            strokeOpacity="0.85"
          />
          <path
            data-part="26-valve-wheel"
            d="M528 387
               A18 18 0 1 1 492 387
               A18 18 0 1 1 528 387 Z
               M492 387 H528
               M510 369 V416"
            fill="var(--paper)"
            stroke="var(--accent)"
          />

          {/* Empty cup sits visibly below—not connected to—the outlet. */}
          <path
            data-part="28-tapered-cup-body"
            d="M416 537
               L433 610
               Q478 631 523 610
               L540 537
               Q478 565 416 537 Z"
            fill="var(--surface)"
            strokeOpacity="0.85"
          />
          <ellipse
            data-part="27-cup-rim"
            cx="478"
            cy="537"
            rx="62"
            ry="17"
            fill="var(--paper)"
            strokeOpacity="0.95"
          />
        </svg>
      </div>

      <div className="mt-auto flex shrink-0 items-end justify-between gap-6 border-t border-[var(--border)] pt-5">
        <p className="font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.1em] text-[var(--ink)]/70">
          {slide.issueBadge}
        </p>

        {t0 && (
          <div className="shrink-0 border-l border-[var(--border)] pl-6">
            <div className="flex items-baseline gap-2 text-[var(--accent)]">
              {t0.qualifier && (
                <span className="font-[var(--font-body)] text-[22px]">
                  {t0.qualifier}
                </span>
              )}
              <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none tabular-nums">
                {t0.value}
              </span>
              {t0.unit && (
                <span className="font-[var(--font-body)] text-[22px]">
                  {t0.unit}
                </span>
              )}
            </div>
            <p className="mt-2 font-[var(--font-mono)] text-[20px] leading-snug text-[var(--ink)]/70">
              {telemetry?.[0]?.label}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}