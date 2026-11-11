import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const palette = {
    '--paper': '#E7ECE5',
    '--surface': '#D6DFD5',
    '--ink': '#182923',
    '--accent': '#9B254D',
    '--border': '#A0AFA3',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={palette}
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[21px] leading-snug tracking-[0.14em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h2 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[62px] font-bold leading-[1.04] tracking-[-0.035em]">
          {slide.headline}
        </h2>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure className="m-0 mt-7 flex min-h-0 flex-1 flex-col border-t border-[var(--border)] pt-5">
        <svg
          viewBox="0 0 952 650"
          preserveAspectRatio="xMidYMid meet"
          className="block h-full min-h-0 w-full flex-1"
          role="img"
          aria-label="Room cutaway highlighting reflective flooring, featureless walls, and glass and mirrors. A dashed drone route becomes uncertain near these surfaces."
        >
          {/* One continuous architectural cutaway. */}
          <g strokeLinejoin="round">
            <path
              d="M190 415 L505 280 L820 405 L505 545 Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />

            <path
              d="M190 415 L190 220 L505 85 L505 280 Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />

            <path
              d="M505 85 L820 210 L820 405 L505 280 Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2.5"
            />
            <path
              d="M505 85 L820 210 L820 405 L505 280 Z"
              fill="var(--paper)"
              fillOpacity="0.42"
            />

            {/* Open section edges and recessed floor thickness. */}
            <path
              d="M190 415 L190 427 L505 557 L820 417 L820 405"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M505 545 L505 557"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            {/* Sparse floor joints; the wall remains deliberately blank. */}
            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            >
              <path d="M294 371 L610 498" />
              <path d="M400 325 L716 452" />
              <path d="M295 458 L610 322" />
              <path d="M400 502 L715 364" />
            </g>

            {/* Reflective flooring: elongated, quiet specular marks. */}
            <g
              fill="none"
              stroke="var(--paper)"
              strokeLinecap="round"
            >
              <path d="M316 428 L452 370" strokeWidth="9" />
              <path d="M344 445 L477 388" strokeWidth="4" />
              <path d="M478 478 L620 416" strokeWidth="8" />
              <path d="M516 484 L638 432" strokeWidth="3" />
            </g>

            {/* A single frameless glass-or-mirror plane. */}
            <path
              d="M660 164 L775 210 L775 385 L660 339 Z"
              fill="var(--paper)"
              fillOpacity="0.78"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M674 183 L674 329"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <g
              stroke="var(--border)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M693 233 L738 215" />
              <path d="M690 251 L752 226" />
              <path d="M706 330 L751 312" />
            </g>
          </g>

          {/* Navigation is tentative, not a collision or certain failure. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="9 10"
          >
            <path d="M500 502 C467 474 441 446 452 404 C460 376 488 363 487 337" />

            <path
              d="M481 318 C457 291 421 280 386 279 C359 278 339 269 329 252"
              strokeOpacity="0.72"
            />
            <path
              d="M392 279 C365 296 340 293 320 283"
              strokeOpacity="0.32"
            />

            <path
              d="M510 330 C555 316 580 337 621 328 C647 323 662 307 679 299"
              strokeOpacity="0.72"
            />
            <path
              d="M621 328 C641 342 663 344 681 337"
              strokeOpacity="0.32"
            />

            <path
              d="M452 404 C425 420 425 443 439 459"
              strokeOpacity="0.3"
            />
          </g>

          {/* Bespoke quadrotor silhouette, floating within the room. */}
          <g transform="translate(490 326)">
            <ellipse
              cx="0"
              cy="99"
              rx="39"
              ry="12"
              fill="var(--ink)"
              fillOpacity="0.07"
            />

            <g
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="2.5"
            >
              <path d="M-12 -5 L-39 -20 M12 -5 L39 -20 M-12 5 L-39 21 M12 5 L39 21" />
              <ellipse cx="-42" cy="-22" rx="22" ry="10" />
              <ellipse cx="42" cy="-22" rx="22" ry="10" />
              <ellipse cx="-42" cy="23" rx="22" ry="10" />
              <ellipse cx="42" cy="23" rx="22" ry="10" />
              <path d="M0 -16 L23 -4 L23 9 L0 21 L-23 9 L-23 -4 Z" />
              <path d="M-23 -4 L0 8 L23 -4 M0 8 L0 21" fill="none" />
            </g>

            <circle cx="0" cy="-3" r="4" fill="var(--accent)" />
          </g>

          {/* Exactly three material callouts, directly anchored to the room. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M190 101 L190 145 L303 239" />
            <path d="M804 124 L852 124 L852 287 L749 287" />
            <path d="M366 574 L397 574 L432 461" />
          </g>

          <g fill="var(--accent)">
            <circle cx="303" cy="239" r="5" />
            <circle cx="749" cy="287" r="5" />
            <circle cx="432" cy="461" r="5" />
          </g>

          <g fill="var(--ink)">
            <text
              x="24"
              y="43"
              className="font-[var(--font-headline)] text-[34px] font-semibold"
            >
              Featureless walls
            </text>
            <text
              x="24"
              y="80"
              className="font-[var(--font-body)] text-[25px]"
            >
              Blank matte walls.
            </text>

            <text
              x="618"
              y="43"
              className="font-[var(--font-headline)] text-[34px] font-semibold"
            >
              Glass and mirrors
            </text>
            <text
              x="618"
              y="80"
              className="font-[var(--font-body)] text-[25px]"
            >
              <tspan x="618">Frameless glass</tspan>
              <tspan x="618" dy="32">
                and mirrors.
              </tspan>
            </text>

            <text
              x="24"
              y="576"
              className="font-[var(--font-headline)] text-[34px] font-semibold"
            >
              Reflective flooring
            </text>
            <text
              x="24"
              y="615"
              className="font-[var(--font-body)] text-[25px]"
            >
              Polished marble or wet tile.
            </text>
          </g>
        </svg>
      </figure>
    </section>
  );
}