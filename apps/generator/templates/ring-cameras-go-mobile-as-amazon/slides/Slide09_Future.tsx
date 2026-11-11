import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const items = [
  {
    index: 1,
    tag: 'DRONE AUTHORIZATION',
    title: 'The launch remains conditional',
    body: 'Amazon targets January 27, 2027, subject to Federal Communications Commission authorization.',
  },
  {
    index: 2,
    tag: 'ROVER SHIPPING',
    title: 'Preorders precede deliveries',
    body: 'Rover is scheduled to start shipping December 16, 2026.',
  },
  {
    index: 3,
    tag: 'MISSING SPECIFICATIONS',
    title: 'Practical questions remain unanswered',
    body: 'The supplied article gives neither device’s physical dimensions, nor Rover’s mast height or battery life.',
  },
];

function WatchGraphic({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 160 180"
      fill="none"
      aria-hidden="true"
      className="h-[180px] w-[160px] text-[var(--accent)]"
    >
      <g stroke="var(--border)" strokeWidth="1">
        <path d="M0 30H160M0 90H160M0 150H160" />
        <path d="M20 10V170M80 10V170M140 10V170" />
      </g>

      {index === 1 && (
        <>
          <path
            d="M80 157V113"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 6"
          />
          <path
            d="M34 113H126"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 5"
          />
          <circle
            cx="80"
            cy="113"
            r="7"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="65" y="60" width="30" height="24" rx="6" />
            <path d="M65 66L43 54M95 66L117 54M65 78L43 90M95 78L117 90" />
            <ellipse cx="37" cy="51" rx="20" ry="7" />
            <ellipse cx="123" cy="51" rx="20" ry="7" />
            <ellipse cx="37" cy="93" rx="20" ry="7" />
            <ellipse cx="123" cy="93" rx="20" ry="7" />
          </g>
          <path
            d="M65 30Q80 15 95 30M72 36Q80 28 88 36"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}

      {index === 2 && (
        <>
          <g
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            <path
              d="M34 65L80 42L126 65V116L80 141L34 116Z"
              fill="var(--surface)"
            />
            <path d="M34 65L80 90L126 65M80 90V141" />
            <path d="M57 54L103 78V95L91 102V85L45 60" />
          </g>
          <path
            d="M14 157H126"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
          <path
            d="M119 149L128 157L119 165"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 89H24M5 101H24M12 113H24"
            stroke="var(--border)"
            strokeWidth="2"
          />
        </>
      )}

      {index === 3 && (
        <>
          <g
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect
              x="44"
              y="105"
              width="72"
              height="32"
              rx="10"
              fill="var(--surface)"
            />
            <circle cx="58" cy="139" r="7" fill="var(--surface)" />
            <circle cx="102" cy="139" r="7" fill="var(--surface)" />
            <path d="M80 105V62" strokeDasharray="4 5" />
            <rect
              x="65"
              y="39"
              width="30"
              height="23"
              rx="5"
              strokeDasharray="4 5"
            />
            <circle cx="80" cy="50" r="4" />
          </g>
          <g stroke="var(--border)" strokeWidth="1.5">
            <path d="M133 39V146M127 39H139M127 146H139" />
            <path d="M44 161H116M44 155V167M116 155V167" />
            <path d="M103 39H122M121 146H125" strokeDasharray="3 4" />
          </g>
          <g stroke="currentColor" strokeWidth="1.5">
            <rect x="18" y="49" width="16" height="28" rx="2" />
            <path d="M22 45H30M22 70L30 56" />
          </g>
        </>
      )}
    </svg>
  );
}

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  return (
    <section
      data-slide-id={slide.id}
      aria-labelledby="slide-9-headline"
      className="flex h-full min-h-0 flex-col text-[var(--ink)] font-[var(--font-body)]"
    >
      <div className="shrink-0 pb-9 pt-5">
        <div
          aria-hidden="true"
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-[5px] w-16 bg-[var(--accent)]" />
          <span className="h-[5px] w-3 bg-[var(--accent)] opacity-50" />
          <span className="h-[5px] w-3 bg-[var(--accent)] opacity-25" />
        </div>

        <h2
          id="slide-9-headline"
          className="max-w-[850px] text-[76px] font-semibold leading-[0.99] tracking-[-0.055em] font-[var(--font-headline)]"
        >
          What to Watch
          <br />
          Before Buying
        </h2>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[1fr_1fr_1.12fr] border-t border-[var(--border)]">
        {items.map((item) => (
          <article
            key={item.index}
            className="grid min-h-0 grid-cols-[44px_minmax(0,1fr)_176px] items-center gap-x-6 border-b border-[var(--border)] py-7"
          >
            <div className="self-start pt-1">
              <span className="text-[19px] leading-none tracking-[-0.04em] text-[var(--accent)] font-[var(--font-mono)]">
                {String(item.index).padStart(2, '0')}
              </span>
            </div>

            <div className="min-w-0">
              <p className="mb-3 text-[14px] font-medium leading-[1.2] tracking-[0.16em] text-[var(--accent)] font-[var(--font-mono)]">
                {item.tag}
              </p>

              <h3 className="mb-3 max-w-[590px] text-[35px] font-semibold leading-[1.06] tracking-[-0.035em] font-[var(--font-headline)]">
                {item.title}
              </h3>

              <p className="max-w-[590px] text-[23px] leading-[1.38] tracking-[-0.015em]">
                {item.body}
              </p>
            </div>

            <div className="flex h-[196px] items-center justify-center rounded-sm bg-[var(--surface)]">
              <WatchGraphic index={item.index} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}