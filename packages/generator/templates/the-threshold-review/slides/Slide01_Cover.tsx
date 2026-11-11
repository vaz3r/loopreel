import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={
        {
          '--paper': '#E7ECE5',
          '--ink': '#182923',
          '--accent': '#9B254D',
          '--surface': '#D6DFD5',
          '--border': '#A0AFA3',
          backgroundColor: 'var(--paper)',
        } as React.CSSProperties
      }
    >
      <div className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.16em] text-[var(--accent)]">
          THE THRESHOLD REVIEW
        </p>

        <h1 className="mt-3 font-[var(--font-headline)] text-[64px] font-bold leading-[1.02] tracking-[-0.045em]">
          <span className="block">Ring Gives Surveillance</span>
          <span className="block">Room To Roam</span>
        </h1>

        <p className="mt-4 max-w-[920px] font-[var(--font-body)] text-[26px] leading-[1.3]">
          Flying and wheeled cameras bring indoor patrols—and new operational
          and privacy questions.
        </p>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 items-center">
        <svg
          viewBox="0 0 952 700"
          className="block h-full max-h-[700px] w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="An abstract airborne camera and wheeled camera occupy opposite ends of a diagonal composition, with separate flight and floor routes and their prices."
        >
          {/* Open architectural strokes establish space without a scale. */}
          <g stroke="var(--border)" strokeWidth="1.5">
            <path d="M32 304H106" />
            <path d="M32 304V242" />
            <path d="M920 352V650H846" />
            <path d="M518 346L874 610" opacity="0.55" />
          </g>

          {/* Elevated route: a broad, rising curve rather than a data plot. */}
          <path
            d="M282 196C414 196 341 38 488 38C576 38 604 70 668 70"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M655 59L669 70L655 81"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Abstract drone: intentionally schematic and non-dimensional. */}
          <g
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M172 163L121 123M248 163L299 123" />
            <path d="M172 203L121 243M248 203L299 243" />

            <ellipse
              cx="112"
              cy="118"
              rx="58"
              ry="25"
              fill="var(--paper)"
            />
            <ellipse
              cx="308"
              cy="118"
              rx="58"
              ry="25"
              fill="var(--paper)"
            />
            <ellipse
              cx="112"
              cy="248"
              rx="58"
              ry="25"
              fill="var(--paper)"
            />
            <ellipse
              cx="308"
              cy="248"
              rx="58"
              ry="25"
              fill="var(--paper)"
            />

            <path d="M84 118H140M280 118H336M84 248H140M280 248H336" />

            <path
              d="M177 147H243L266 181L243 218H177L154 181Z"
              fill="var(--surface)"
            />
            <path d="M188 218V239H232V218" fill="var(--paper)" />
            <circle cx="210" cy="181" r="18" />
            <circle
              cx="210"
              cy="181"
              r="7"
              fill="var(--accent)"
              stroke="none"
            />
          </g>

          {/* Price badge 1, connected to the airborne device. */}
          <path
            d="M337 176H424L470 150H488"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx="337" cy="176" r="4" fill="var(--accent)" />

          <g transform="translate(488 106)">
            <rect width="420" height="190" fill="var(--surface)" />
            <path d="M0 0H420" stroke="var(--accent)" strokeWidth="4" />
            <text
              x="24"
              y="40"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[24px]"
            >
              <tspan x="24">Ring Drone Cam</tspan>
              <tspan x="24" dy="30">
                starting price
              </tspan>
            </text>
            <text
              x="20"
              y="164"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[84px] font-bold tracking-[-0.06em]"
            >
              $250
            </text>
          </g>

          {/* Ground route stays beneath the wheeled camera. */}
          <path
            d="M116 632H477C536 632 553 659 614 659H728C764 659 787 636 787 601"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M776 614L787 600L798 614"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Abstract rover: lens mast, body, and unmistakable wheels. */}
          <g
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M738 470V430H770V470" fill="var(--surface)" />
            <path
              d="M710 353H798L816 373V416L798 436H710L692 416V373Z"
              fill="var(--surface)"
            />
            <circle cx="754" cy="394" r="25" fill="var(--paper)" />
            <circle cx="754" cy="394" r="12" />
            <circle
              cx="754"
              cy="394"
              r="5"
              fill="var(--accent)"
              stroke="none"
            />

            <path
              d="M682 470H820L857 510V550H645V510Z"
              fill="var(--surface)"
            />
            <path d="M682 470L704 510H857M704 510V550" />
            <path d="M671 529H686" />

            <rect
              x="661"
              y="528"
              width="46"
              height="62"
              rx="19"
              fill="var(--ink)"
            />
            <rect
              x="793"
              y="528"
              width="46"
              height="62"
              rx="19"
              fill="var(--ink)"
            />
            <path
              d="M684 546V572M816 546V572"
              stroke="var(--surface)"
              strokeWidth="3"
            />
          </g>

          {/* Price badge 2, anchored beside the grounded device. */}
          <path
            d="M466 509H555L596 529H645"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <circle cx="645" cy="529" r="4" fill="var(--accent)" />

          <g transform="translate(46 418)">
            <rect width="420" height="182" fill="var(--surface)" />
            <path d="M0 0H420" stroke="var(--accent)" strokeWidth="4" />
            <text
              x="24"
              y="43"
              fill="var(--ink)"
              className="font-[var(--font-body)] text-[24px]"
            >
              Ring Rover Cam price
            </text>
            <text
              x="20"
              y="146"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[84px] font-bold tracking-[-0.06em]"
            >
              $1,000
            </text>
          </g>
        </svg>
      </div>
    </section>
  );
}