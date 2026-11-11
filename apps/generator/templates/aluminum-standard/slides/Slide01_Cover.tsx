import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-[1028px] w-full flex-col gap-6 overflow-hidden text-[var(--ink)]">
      <div className="flex items-center gap-4">
        <span className="h-3 w-3 shrink-0 bg-[var(--accent)]" />
        <p className="font-[var(--font-mono)] text-base font-medium tracking-[0.2em]">
          {slide.kicker}
        </p>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <h1 className="max-w-[920px] text-balance font-[var(--font-headline)] text-[88px] font-bold leading-[0.98] tracking-[-0.065em]">
        {slide.headline}
      </h1>

      <div className="relative min-h-0 flex-1">
        <svg
          viewBox="0 0 952 470"
          fill="none"
          aria-hidden="true"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Registration marks and drafting field */}
          <g
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M24 48V24H48M904 24H928V48M24 422V446H48M904 446H928V422" />
            <path d="M24 235H928" strokeDasharray="2 10" />
            <path d="M476 24V446" strokeDasharray="2 10" />
            <path d="M88 395H864" />
            {Array.from({ length: 25 }, (_, index) => (
              <path
                key={index}
                d={`M${88 + index * 32} 395v${index % 4 === 0 ? 12 : 6}`}
              />
            ))}
          </g>

          <ellipse
            cx="482"
            cy="376"
            rx="359"
            ry="29"
            fill="var(--surface)"
          />

          {/* Precision-machined display enclosure */}
          <path
            d="M204 53Q202 40 216 40H754Q766 40 767 53L790 296H226L204 53Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M218 54H752L773 281H239L218 54Z"
            fill="var(--ink)"
          />

          {/* Screen: a restrained aluminum-colored architectural field */}
          <path
            d="M229 65H742L761 269H250L229 65Z"
            fill="var(--surface)"
          />
          <path d="M229 65H742L753 183L245 211L229 65Z" fill="var(--paper, #F5F5F7)" />
          <path
            d="M245 211L753 183M247 233L755 205M249 255L758 227"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M448 54H523L524 68Q524 73 518 73H454Q449 73 449 68L448 54Z"
            fill="var(--ink)"
          />

          {/* Accent plane, interrupted rather than celebratory */}
          <path
            d="M584 88H712L723 208H595L584 88Z"
            fill="var(--accent)"
          />
          <path
            d="M596 101H700M599 117H703M605 181H709M607 197H711"
            stroke="var(--paper, #F5F5F7)"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
          <path
            d="M630 139H678L681 170H633L630 139Z"
            fill="var(--paper, #F5F5F7)"
          />

          {/* Hinge and keyboard deck */}
          <path
            d="M226 290H790L861 353H110L226 290Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M242 297H775" stroke="var(--ink)" strokeWidth="4" />

          <g stroke="var(--border)" strokeWidth="1">
            <path d="M251 306H737L764 329H212L251 306Z" />
            <path d="M238 314H746M225 322H755" />
            {Array.from({ length: 15 }, (_, index) => (
              <path
                key={index}
                d={`M${258 + index * 32} 306l${-11 + index * 1.4} 23`}
              />
            ))}
          </g>

          <path
            d="M389 335H561L577 348H367L389 335Z"
            stroke="var(--border)"
            strokeWidth="1"
          />

          {/* Thin front edge and recessed opening */}
          <path
            d="M110 353H861L842 367Q839 369 832 369H134Q126 369 122 365L110 353Z"
            fill="var(--paper, #F5F5F7)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M425 353H545L538 358H433L425 353Z"
            fill="var(--border)"
          />
          <path
            d="M145 361H224"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Inspection callout, intentionally without extra copy */}
          <circle
            cx="655"
            cy="155"
            r="43"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          <path
            d="M698 155H825L886 94"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <circle cx="886" cy="94" r="5" fill="var(--accent)" />
          <path
            d="M873 94H899M886 81V107"
            stroke="var(--accent)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-[8px_1fr] gap-6 border-t border-[var(--border)] pt-6">
        <div className="bg-[var(--accent)]" />
        <p className="max-w-[830px] font-[var(--font-body)] text-[28px] leading-[1.35] tracking-[-0.02em]">
          {slide.subheadline}
        </p>
      </div>
    </section>
  );
}