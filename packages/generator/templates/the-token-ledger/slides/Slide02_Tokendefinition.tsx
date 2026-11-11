import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  const specimens = [
    {
      title: 'Words',
      lines: ['Words'],
      body: 'Typically, a Chinese word or an English word counts as a token.',
    },
    {
      title: 'Numbers and symbols',
      lines: ['Numbers', 'and symbols'],
      body: 'Typically, a number or a symbol counts as a token.',
    },
  ];

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={
        {
          '--ink': '#291D35',
          '--accent': '#6534BC',
          '--surface': '#DCE8DF',
          '--border': '#A4B5A9',
          backgroundColor: '#EAF2EC',
        } as React.CSSProperties
      }
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] uppercase tracking-[0.16em] text-[var(--accent)]">
          COUNTING UNITS
        </p>

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]">
          What Typically Counts
          <br />
          As A Token?
        </h1>

        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug">
          The article names words, numbers, and symbols as typical token
          units.
        </p>
      </header>

      <div className="mt-10 grid shrink-0 grid-cols-2 items-stretch gap-6">
        {specimens.map((specimen, index) => (
          <figure key={specimen.title} className="m-0 flex min-w-0 flex-col">
            <svg
              viewBox="0 0 464 420"
              className="block h-[420px] w-full text-[var(--ink)]"
              role="img"
              aria-label={specimen.title}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Four disconnected corners form one open specimen frame. */}
              <path
                d="
                  M 112 18 H 18 V 104
                  M 352 18 H 446 V 104
                  M 18 316 V 402 H 112
                  M 352 402 H 446 V 316
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />

              {/* Quiet specimen-sheet registration guides. */}
              <g
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              >
                <path d="M 64 132 H 400 M 64 288 H 400" />
                <path d="M 232 57 V 81 M 220 69 H 244" />
                <path d="M 232 339 V 363 M 220 351 H 244" />
                <path d="M 64 124 V 140 M 400 124 V 140" />
                <path d="M 64 280 V 296 M 400 280 V 296" />
              </g>

              {/* Suggestive boundaries, not a tokenizer segmentation example. */}
              <path
                d={
                  index === 0
                    ? 'M 140 164 H 118 V 256 H 140 M 324 164 H 346 V 256 H 324'
                    : 'M 100 154 H 78 V 266 H 100 M 364 154 H 386 V 266 H 364'
                }
                fill="none"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeLinecap="square"
              />

              <text
                x="232"
                y={index === 0 ? 223 : 198}
                textAnchor="middle"
                fill="currentColor"
                className="font-[var(--font-headline)] text-[38px] font-semibold"
                letterSpacing="-1"
              >
                {specimen.lines.map((line, lineIndex) => (
                  <tspan
                    key={line}
                    x="232"
                    dy={lineIndex === 0 ? 0 : 46}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </svg>

            <figcaption className="mt-5 min-h-[184px] border-t-2 border-[var(--border)] bg-[var(--surface)] px-7 py-6">
              <p className="font-[var(--font-body)] text-[26px] leading-snug">
                {specimen.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}