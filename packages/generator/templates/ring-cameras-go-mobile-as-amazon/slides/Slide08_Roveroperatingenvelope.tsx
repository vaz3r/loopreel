import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide08({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const routeId = React.useId().replace(/:/g, '');
  const patternId = `${routeId}-floor-grid`;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] tracking-wider text-[var(--accent)]">
          ROVER’S PHYSICAL LIMITS
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.035em]">
          Business Coverage,
          <br />
          Bounded By The Floor
        </h1>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          Rover’s coverage claim comes with single-floor and terrain restrictions.
        </p>
      </header>

      <figure className="relative mt-8 h-[660px] w-full shrink-0">
        <svg
          viewBox="0 0 952 660"
          className="absolute inset-0 h-full w-full"
          fill="none"
          role="img"
          aria-label="An unmeasured indoor floorplate with a bounded Rover patrol route."
        >
          <defs>
            <pattern
              id={patternId}
              width="44"
              height="44"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M44 0H0V44"
                stroke="var(--border)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <path
            d="M24 28H928V438H794V632H24V28Z"
            fill="var(--surface)"
          />
          <path
            d="M24 28H928V438H794V632H24V28Z"
            fill={`url(#${patternId})`}
          />
          <path
            d="M24 28H928V438H794V632H24V28Z"
            stroke="var(--ink)"
            strokeOpacity="0.6"
            strokeWidth="3"
          />

          {/* Interior partitions: deliberately unmeasured. */}
          <g stroke="var(--ink)" strokeOpacity="0.35" strokeWidth="7">
            <path d="M620 28V162M620 242V306H928" />
            <path d="M24 360H190M280 360H374V480" />
            <path d="M554 632V504H664" />
          </g>

          <g stroke="var(--border)" strokeWidth="2">
            <path d="M620 162H700" />
            <path d="M700 162A80 80 0 0 1 620 242" />
            <path d="M190 360V450" />
            <path d="M190 450A90 90 0 0 0 280 360" />
          </g>

          {/* The route stays inside the floorplate. */}
          <path
            d="M132 286H468Q510 286 510 328V394Q510 430 472 430H458Q424 430 424 466V520Q424 564 380 564H138Q94 564 94 520V450Q94 412 132 412H156M510 362H706Q748 362 748 404V538Q748 570 714 570H636M706 362H822Q862 362 862 322V128Q862 88 822 88H734Q690 88 690 132V250"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeDasharray="11 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <g fill="var(--surface)" stroke="var(--accent)" strokeWidth="3">
            <circle cx="132" cy="286" r="9" />
            <circle cx="156" cy="412" r="9" />
            <circle cx="636" cy="570" r="9" />
            <circle cx="690" cy="250" r="9" />
          </g>

          {/* Rover marker and localized sensing rings. */}
          <circle
            cx="510"
            cy="362"
            r="63"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
          <circle
            cx="510"
            cy="362"
            r="44"
            stroke="var(--accent)"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
          <g transform="translate(510 362)">
            <rect
              x="-24"
              y="-29"
              width="48"
              height="58"
              rx="15"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <path
              d="M-30-12V12M30-12V12"
              stroke="var(--ink)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cy="-11" r="7" fill="var(--accent)" />
            <path
              d="M-10 14H10"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>

          <g stroke="var(--accent)" strokeWidth="4">
            <path d="M24 66V28H62" />
            <path d="M890 28H928V66" />
            <path d="M24 594V632H62" />
            <path d="M756 632H794V594" />
          </g>
        </svg>

        <figcaption className="absolute left-[62px] top-[62px] w-[522px] bg-[var(--surface)] px-5 py-4">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
            Claimed coverage
          </h2>
          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-none">
            Up to
          </p>
          <p className="mt-1 font-[var(--font-mono)] text-[104px] font-bold leading-none tracking-[-0.065em] text-[var(--accent)]">
            5,000
          </p>
          <p className="mt-3 whitespace-nowrap font-[var(--font-body)] text-[26px] leading-snug">
            square feet (465 square meters).
          </p>
        </figcaption>
      </figure>

      <div className="mt-8 grid shrink-0 grid-cols-[340px_minmax(0,1fr)] border-t-2 border-[var(--accent)] pt-7">
        <article className="pr-7">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
            Operating
            <br />
            environment
          </h2>

          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Single-floor, indoor environment; cannot climb stairs.
          </p>

          <svg
            viewBox="0 0 180 140"
            className="mt-6 h-[140px] w-[180px]"
            fill="none"
            role="img"
            aria-label="Crossed-out stairs"
          >
            <path
              d="M20 116H57V85H94V54H131V23H164"
              stroke="var(--ink)"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path
              d="M22 20L160 122"
              stroke="var(--surface)"
              strokeWidth="17"
            />
            <path
              d="M22 20L160 122"
              stroke="var(--accent)"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </svg>
        </article>

        <article className="border-l border-[var(--border)] pl-8">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-tight">
            Incompatible terrain
          </h2>

          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug">
            Curved edges, sunken areas, black glossy floors;
          </p>

          <div className="mt-6 border-t border-[var(--border)] pt-5">
            <p className="font-[var(--font-body)] text-[26px] leading-snug">
              transitions greater than
            </p>

            <div className="mt-4 flex items-center gap-6">
              <svg
                viewBox="0 0 190 160"
                className="h-[160px] w-[190px] shrink-0"
                fill="none"
                role="img"
                aria-label="Enlarged floor transition with a vertical threshold measurement"
              >
                <path
                  d="M8 129H84V49H140V151H8Z"
                  fill="var(--surface)"
                />
                <path
                  d="M8 129H84V49H140"
                  stroke="var(--ink)"
                  strokeWidth="5"
                  strokeLinejoin="miter"
                />
                <path
                  d="M84 49V129"
                  stroke="var(--accent)"
                  strokeWidth="6"
                />
                <g
                  stroke="var(--accent)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M155 49H183M106 129H183" />
                  <path d="M171 53V125" />
                  <path d="M165 62L171 53L177 62" />
                  <path d="M165 116L171 125L177 116" />
                </g>
              </svg>

              <p className="font-[var(--font-mono)] text-[26px] leading-normal text-[var(--accent)]">
                <span className="block whitespace-nowrap font-bold">
                  1.375 inches
                </span>
                <span className="mt-2 block whitespace-nowrap text-[24px] text-[var(--ink)]">
                  (3.5 centimeters).
                </span>
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}