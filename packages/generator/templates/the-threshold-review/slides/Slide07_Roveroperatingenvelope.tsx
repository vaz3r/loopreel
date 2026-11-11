import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const diagramId = React.useId();

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.16em] text-[var(--accent)]">
          THE GROUND RULES
        </p>

        <h1 className="mt-3 max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.06] tracking-[-0.035em]">
          Rover’s Coverage Comes With Floor Rules
        </h1>

        <p className="mt-4 max-w-[920px] font-[var(--font-body)] text-[26px] leading-[34px]">
          Amazon’s coverage claim does not remove its single-floor and terrain
          restrictions.
        </p>
      </header>

      <figure className="relative mt-6 h-[332px] w-full shrink-0">
        <svg
          viewBox="0 0 952 332"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-labelledby={`${diagramId}-footprint`}
        >
          <title id={`${diagramId}-footprint`}>
            Schematic coverage footprint, not a measured floor plan.
          </title>

          <path
            d="M18 32H582V14H798V62H934V252H850V314H558V294H18Z"
            fill="#D6DFD5"
          />
          <path
            d="M34 48H598V30H782V78H918V236H834V298H574V278H34Z"
            fill="none"
            stroke="#A0AFA3"
            strokeWidth="2"
            strokeDasharray="8 9"
          />

          <path
            d="M18 112V226M850 314H706"
            fill="none"
            stroke="#9B254D"
            strokeWidth="8"
          />

          <g
            fill="none"
            stroke="#A0AFA3"
            strokeWidth="2"
            strokeDasharray="6 10"
          >
            <ellipse cx="744" cy="164" rx="142" ry="108" />
            <ellipse cx="744" cy="164" rx="104" ry="77" />
          </g>

          <path
            d="M614 214C641 214 652 201 652 181V133C652 112 669 100 691 100H779C805 100 822 117 822 140V188C822 209 807 222 784 222H744"
            fill="none"
            stroke="#182923"
            strokeWidth="2"
            opacity="0.5"
          />

          <g transform="translate(744 164)">
            <circle r="39" fill="#E7ECE5" stroke="#182923" strokeWidth="3" />
            <path
              d="M-26-29Q0-46 26-29"
              fill="none"
              stroke="#182923"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <rect
              x="-16"
              y="-13"
              width="32"
              height="22"
              rx="6"
              fill="#182923"
            />
            <circle cy="-2" r="5" fill="#D6DFD5" />
            <path
              d="M-12 23H12"
              stroke="#9B254D"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>

          <g stroke="#182923" strokeWidth="2">
            <path d="M744 43V58M744 270V285" />
            <path d="M590 164H605M883 164H898" />
          </g>
        </svg>

        <figcaption className="absolute left-[48px] top-[66px] w-[486px]">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[40px]">
            Claimed coverage
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[28px] leading-[38px]">
            Up to{' '}
            <strong className="font-[var(--font-mono)] font-bold text-[var(--accent)]">
              5,000
            </strong>{' '}
            square feet
            <br />
            (465 square meters);
            <br />
            not independently verified.
          </p>
        </figcaption>
      </figure>

      <div className="mt-6 grid min-h-0 grid-cols-[350px_minmax(0,1fr)] gap-8">
        <section className="border-t-2 border-[var(--border)] pt-4">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px]">
            Indoor boundary
          </h2>

          <svg
            viewBox="0 0 350 122"
            className="mt-3 h-[122px] w-full"
            role="img"
            aria-labelledby={`${diagramId}-stairs`}
          >
            <title id={`${diagramId}-stairs`}>
              A boundary bar stops the rover before a staircase.
            </title>

            <path
              d="M0 100H191V73H244V46H297V19H350V122H0Z"
              fill="#182923"
            />

            <g transform="translate(83 74)">
              <path
                d="M-35 14V-6Q-35-22-18-22H18Q35-22 35-6V14Z"
                fill="#D6DFD5"
                stroke="#182923"
                strokeWidth="3"
              />
              <rect x="-13" y="-30" width="26" height="8" rx="3" fill="#182923" />
              <circle cx="-21" cy="17" r="8" fill="#182923" />
              <circle cx="21" cy="17" r="8" fill="#182923" />
            </g>

            <path
              d="M129 75H157"
              stroke="#A0AFA3"
              strokeWidth="3"
              strokeDasharray="5 5"
            />
            <path d="M173 34V105" stroke="#9B254D" strokeWidth="8" />
          </svg>

          <p className="mt-4 font-[var(--font-body)] text-[26px] leading-[35px]">
            Single-floor operation; cannot climb stairs.
          </p>
        </section>

        <section className="border-t-2 border-[var(--border)] pt-4">
          <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[42px]">
            Incompatible terrain
          </h2>

          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[35px]">
            Curved edges, sunken areas, black glossy floors;
          </p>

          <div className="mt-5 grid grid-cols-[150px_minmax(0,1fr)] items-center gap-5 border-t border-[var(--border)] pt-5">
            <svg
              viewBox="0 0 150 126"
              className="h-[126px] w-[150px]"
              role="img"
              aria-labelledby={`${diagramId}-transition`}
            >
              <title id={`${diagramId}-transition`}>
                Schematic floor-transition restriction.
              </title>

              <path
                d="M0 96H82V48H150V126H0Z"
                fill="#182923"
              />
              <path
                d="M82 48V96"
                stroke="#9B254D"
                strokeWidth="8"
              />

              <g fill="none" stroke="#9B254D" strokeWidth="2.5">
                <path d="M49 48V96" />
                <path d="M42 56L49 48L56 56" />
                <path d="M42 88L49 96L56 88" />
                <path d="M61 48H72M61 96H72" />
              </g>

              <path
                d="M99 32H143"
                stroke="#A0AFA3"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </svg>

            <p className="font-[var(--font-body)] text-[24px] leading-[33px]">
              transitions
              <br />
              <strong className="font-semibold text-[var(--accent)]">
                greater than 1.375 inches (3.5 centimeters).
              </strong>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}