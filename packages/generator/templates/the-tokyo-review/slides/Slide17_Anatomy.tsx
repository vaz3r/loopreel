import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const anatomy = [
  {
    number: '01',
    label: 'EAVE — SHELTER',
    desc: 'The roof projects beyond the enclosure to shade openings and reduce rain exposure. Protection begins before the wall.',
  },
  {
    number: '02',
    label: 'ENGAWA — OCCUPIABLE EDGE',
    desc: 'A timber or bamboo floor strip provides a place to pass, sit, and face the garden. Common widths are 1–1.3 m; large temples may have over 3 metres.',
  },
  {
    number: '03',
    label: 'SHOJI — FILTER',
    desc: 'The sliding wood-and-paper screen softens daylight; closing it can obscure the view without extinguishing the changing light outside.',
  },
];

export default function Slide17({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section
      aria-labelledby="slide-17-title"
      className="flex h-full min-h-0 flex-col justify-between gap-6 text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.2em]">
            Anatomy of a threshold
          </span>
        </div>

        <h1
          id="slide-17-title"
          className="max-w-[850px] font-[var(--font-headline)] text-7xl font-bold leading-[0.98] tracking-tight"
        >
          The boundary
          <br />
          has depth.
        </h1>
      </div>

      <figure className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <figcaption className="flex items-center justify-between gap-4 font-[var(--font-mono)] text-xs uppercase tracking-[0.16em]">
          <span>Section through the edge</span>
          <span className="opacity-60">Schematic · Not to scale</span>
        </figcaption>

        <svg
          viewBox="0 0 900 310"
          role="img"
          aria-labelledby="slide-17-diagram-title slide-17-diagram-desc"
          className="mt-3 block w-full text-[var(--ink)]"
          fill="none"
        >
          <title id="slide-17-diagram-title">
            Eave, engawa, and shoji in section
          </title>
          <desc id="slide-17-diagram-desc">
            A roof extends beyond a sliding screen and over a raised timber
            platform facing the garden. Number 01 identifies the eave, 02 the
            engawa platform, and 03 the shoji screen.
          </desc>

          {/* The sheltered zone extends beyond the enclosed interior. */}
          <path
            d="M444 83H728L689 226H444Z"
            fill="var(--accent)"
            opacity="0.07"
          />

          {/* Interior floor and projecting engawa deck. */}
          <path
            d="M76 226H691V240H76"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M444 226H691V240H444Z"
            fill="var(--accent)"
            opacity="0.2"
          />
          <path
            d="M462 226V240M493 226V240M524 226V240M555 226V240M586 226V240M617 226V240M648 226V240M679 226V240"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
          <path
            d="M125 240V270M443 240V270M659 240V270"
            stroke="currentColor"
            strokeWidth="7"
          />

          {/* Roof and deep eave. */}
          <path
            d="M74 48L737 79L726 92L74 62Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M443 66L737 79"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M133 65V226"
            stroke="currentColor"
            strokeWidth="7"
          />
          <path
            d="M137 104H427"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.25"
          />

          {/* Paper screen, with a fine timber lattice. */}
          <rect
            x="427"
            y="80"
            width="34"
            height="146"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2.5"
          />
          <path
            d="M444 82V225M428 104H460M428 128H460M428 152H460M428 176H460M428 200H460"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />

          {/* Garden ground and restrained planting marks. */}
          <path
            d="M76 271H830M744 270L752 253M752 270L765 259M790 270L799 247M799 270L811 255"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.3"
          />

          {/* Numbered callouts correspond to the notes below. */}
          <g
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M669 44V74" />
            <path d="M571 187V224" />
            <path d="M380 154H425" />
          </g>

          {[
            { number: '01', x: 669, y: 28 },
            { number: '02', x: 571, y: 170 },
            { number: '03', x: 362, y: 154 },
          ].map(({ number, x, y }) => (
            <g key={number}>
              <circle cx={x} cy={y} r="17" fill="var(--accent)" />
              <text
                x={x}
                y={y + 4}
                textAnchor="middle"
                fill="var(--surface)"
                stroke="none"
                fontSize="12"
                fontWeight="700"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {number}
              </text>
            </g>
          ))}

          <g
            fill="currentColor"
            opacity="0.6"
            fontSize="11"
            letterSpacing="2"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <text x="190" y="300">INTERIOR</text>
            <text x="513" y="300">OCCUPIABLE EDGE</text>
            <text x="752" y="300">GARDEN</text>
          </g>
        </svg>
      </figure>

      <ol className="grid flex-1 grid-rows-[1fr_1.2fr_1fr] gap-3">
        {anatomy.map((item) => (
          <li
            key={item.number}
            className="flex items-center gap-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-7 py-5 shadow-sm"
          >
            <span className="self-start pt-1 font-[var(--font-mono)] text-3xl font-bold leading-none text-[var(--accent)]">
              {item.number}
            </span>
            <div className="min-w-0 space-y-2">
              <h2 className="font-[var(--font-headline)] text-xl font-bold tracking-[0.025em]">
                {item.label}
              </h2>
              <p className="max-w-[760px] text-[21px] leading-[1.42]">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}