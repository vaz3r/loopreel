import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = [
    {
      index: 1,
      tag: 'MACBOOK AIR',
      title: 'An M6 refresh is anticipated',
      body: 'The reviewer expects an M6 MacBook Air; no confirmed configuration or release date is supplied.',
    },
    {
      index: 2,
      tag: 'OLED TOUCHSCREEN',
      title: 'The wait is speculative',
      body: 'The reviewer would not be surprised by at least two years before this tier receives an OLED touchscreen.',
    },
    {
      index: 3,
      tag: 'CHIP ROADMAP',
      title: 'Rumor is not a commitment',
      body: 'Suggestions that M6 will lack Pro, Max, or Ultra configurations are explicitly presented as rumor.',
    },
  ];

  function Illustration({ index }: { index: number }) {
    return (
      <svg
        viewBox="0 0 160 160"
        fill="none"
        aria-hidden="true"
        className="h-[160px] w-[160px] text-[var(--accent)]"
      >
        <path
          d="M8 28V8H28M132 8H152V28M8 132V152H28M132 152H152V132"
          stroke="var(--border)"
          strokeWidth="1"
        />

        {index === 1 && (
          <>
            <path
              d="M29 104V47C29 43.686 31.686 41 35 41H125C128.314 41 131 43.686 131 47V104"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5 5"
            />
            <path
              d="M20 111H140L131 120H29L20 111Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M65 111H95" stroke="var(--ink)" strokeWidth="2" />
            <path
              d="M61 78H99M88 67L99 78L88 89"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M39 32H121M48 24H112"
              stroke="var(--border)"
              strokeDasharray="3 5"
            />
            <circle cx="131" cy="41" r="4" fill="currentColor" />
          </>
        )}

        {index === 2 && (
          <>
            <path
              d="M35 50L97 31L133 51L71 71L35 50Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <path
              d="M35 68L71 89L133 69M35 86L71 107L133 87"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M35 104L71 125L133 105"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <path
              d="M23 50V104M19 50H27M19 104H27"
              stroke="var(--border)"
            />
            <path
              d="M102 49V78"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="3 4"
            />
            <circle cx="102" cy="49" r="8" stroke="currentColor" />
            <circle cx="102" cy="49" r="2.5" fill="currentColor" />
          </>
        )}

        {index === 3 && (
          <>
            <rect
              x="58"
              y="27"
              width="44"
              height="44"
              rx="2"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <rect
              x="70"
              y="39"
              width="20"
              height="20"
              stroke="currentColor"
              strokeDasharray="3 3"
            />
            <path
              d="M68 20V27M80 20V27M92 20V27M51 37H58M51 49H58M51 61H58M102 37H109M102 49H109M102 61H109"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M80 71V89M32 109V89H128V109M80 89V109"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
            <rect
              x="20"
              y="111"
              width="24"
              height="24"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <rect
              x="68"
              y="111"
              width="24"
              height="24"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <rect
              x="116"
              y="111"
              width="24"
              height="24"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <circle cx="80" cy="89" r="3" fill="currentColor" />
          </>
        )}
      </svg>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)]">
      <div className="shrink-0 pt-2">
        <div className="mb-6 h-[4px] w-16 bg-[var(--accent)]" />

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[66px] font-bold leading-[1.03] tracking-[-0.045em]">
          Do Not Mistake
          <br />
          <span className="text-[var(--accent)]">Expectations</span> for
          <br />
          Announcements
        </h1>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 border-t border-[var(--border)]">
        {items.map((item) => (
          <article
            key={item.index}
            className="grid min-h-0 grid-cols-[184px_minmax(0,1fr)] items-center gap-8 border-b border-[var(--border)] py-6"
          >
            <div className="relative flex h-[184px] items-center justify-center bg-[var(--surface)]">
              <span className="absolute left-3 top-2 font-[var(--font-mono)] text-[13px] leading-none text-[var(--accent)]">
                {item.index}
              </span>
              <Illustration index={item.index} />
            </div>

            <div className="min-w-0 pr-2">
              <p className="mb-3 font-[var(--font-mono)] text-[15px] font-medium leading-none tracking-[0.16em] text-[var(--accent)]">
                {item.tag}
              </p>

              <h2 className="mb-3 font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.025em]">
                {item.title}
              </h2>

              <p className="max-w-[680px] font-[var(--font-body)] text-[24px] leading-[1.36] tracking-[-0.01em]">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}