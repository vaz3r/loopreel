import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function ConfigurationGraphic({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 128 112"
      fill="none"
      aria-hidden="true"
      className="h-[112px] w-[128px] shrink-0 text-[var(--accent)]"
    >
      {index === 1 && (
        <>
          <rect
            x="19"
            y="9"
            width="90"
            height="94"
            rx="6"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M29 32H99M29 56H99M29 80H99"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          {[20, 44, 68].map((y) => (
            <React.Fragment key={y}>
              <path
                d={`M30 ${y}H69`}
                stroke="currentColor"
                strokeWidth="3"
              />
              <circle cx="95" cy={y} r="2" fill="currentColor" />
            </React.Fragment>
          ))}
          <rect
            x="73"
            y="76"
            width="42"
            height="31"
            rx="5"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M85 76V70C85 58 103 58 103 70V76"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="94" cy="89" r="3" fill="currentColor" />
          <path d="M94 91V97" stroke="currentColor" strokeWidth="2" />
        </>
      )}

      {index === 2 && (
        <>
          <rect
            x="9"
            y="17"
            width="110"
            height="72"
            rx="5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M64 18V88"
            stroke="currentColor"
            strokeDasharray="3 4"
            opacity=".6"
          />
          <path
            d="M21 57L48 30M26 73L52 47"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity=".5"
          />
          {[30, 42, 54, 66, 78].map((y, row) =>
            [75, 87, 99, 111].map((x, column) => (
              <circle
                key={`${row}-${column}`}
                cx={x}
                cy={y}
                r="1"
                fill="currentColor"
                opacity={column % 2 === 0 ? '.8' : '.35'}
              />
            )),
          )}
          <path
            d="M64 89V101M45 102H83"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </>
      )}

      {index === 3 && (
        <>
          <rect
            x="13"
            y="17"
            width="102"
            height="25"
            rx="3"
            stroke="currentColor"
            opacity=".3"
            strokeDasharray="4 4"
          />
          <rect
            x="13"
            y="48"
            width="102"
            height="25"
            rx="3"
            stroke="currentColor"
            opacity=".55"
            strokeDasharray="4 4"
          />
          <rect
            x="13"
            y="79"
            width="102"
            height="25"
            rx="3"
            fill="currentColor"
            fillOpacity=".1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {[23, 47, 71, 95].map((x) => (
            <React.Fragment key={x}>
              <rect
                x={x}
                y="85"
                width="12"
                height="12"
                rx="1"
                fill="currentColor"
                fillOpacity=".65"
              />
              <path
                d={`M${x + 3} 104V109M${x + 9} 104V109`}
                stroke="currentColor"
                strokeWidth="2"
              />
            </React.Fragment>
          ))}
          <path
            d="M23 30H105M23 61H105"
            stroke="currentColor"
            opacity=".2"
          />
        </>
      )}

      {index === 4 && (
        <>
          <rect
            x="9"
            y="19"
            width="24"
            height="74"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="95"
            y="19"
            width="24"
            height="74"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M33 35H88M33 48H88"
            stroke="var(--ink)"
            strokeWidth="2"
            opacity=".5"
          />
          <path
            d="M83 30L88 35L83 40M83 43L88 48L83 53"
            stroke="var(--ink)"
            strokeWidth="1.5"
            opacity=".5"
          />
          <path
            d="M33 66H88M33 77H88M33 88H88"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M83 61L88 66L83 71M83 72L88 77L83 82M83 83L88 88L83 93"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16 29H26M16 37H26M102 29H112M102 37H112"
            stroke="currentColor"
            opacity=".5"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = [
    {
      index: 1,
      tag: 'MANDATORY STORAGE',
      title: 'No smaller storage choice',
      body: 'The 1TB allotment is mandatory, even for buyers who do not need it.',
    },
    {
      index: 2,
      tag: 'DISPLAY EXTRA',
      title: 'Matte costs more',
      body: 'The optional nano-texture matte display upgrade adds $150 to the $1,999 starting price.',
    },
    {
      index: 3,
      tag: 'MEMORY',
      title: 'Base RAM remains 16GB',
      body: '24GB and 32GB upgrades are available; the reviewer identifies RAM as the biggest limitation for running models.',
    },
    {
      index: 4,
      tag: 'BANDWIDTH',
      title: 'Memory capacity changes bandwidth',
      body: '16GB receives 153 GB/s; 24GB and 32GB configurations receive 170 GB/s.',
    },
  ];

  return (
    <section className="flex h-full min-h-0 flex-col gap-7 text-[var(--ink)]">
      <div className="shrink-0 border-t border-[var(--border)] pt-6">
        <h2 className="max-w-[920px] text-balance font-[var(--font-headline)] text-[64px] font-semibold leading-[1.04] tracking-[-0.045em]">
          {slide.headline}
        </h2>
      </div>

      <ol className="m-0 grid min-h-0 flex-1 list-none grid-rows-4 gap-3 p-0">
        {items.map((item) => (
          <li
            key={item.index}
            className="relative grid min-h-0 grid-cols-[32px_minmax(0,1fr)_128px] items-center gap-x-5 border border-[var(--border)] bg-[var(--surface)] px-6 py-5"
          >
            <span
              aria-hidden="true"
              className="absolute -left-px top-6 h-8 w-[3px] bg-[var(--accent)]"
            />

            <span className="self-start pt-[2px] font-[var(--font-mono)] text-[17px] leading-5 text-[var(--accent)]">
              {String(item.index).padStart(2, '0')}
            </span>

            <div className="min-w-0">
              <p className="mb-[10px] font-[var(--font-mono)] text-[13px] font-medium leading-4 tracking-[0.16em] text-[var(--accent)]">
                {item.tag}
              </p>

              <h3 className="mb-[10px] font-[var(--font-headline)] text-[30px] font-semibold leading-[1.1] tracking-[-0.025em]">
                {item.title}
              </h3>

              <p className="max-w-[630px] font-[var(--font-body)] text-[23px] leading-[1.35] opacity-80">
                {item.body}
              </p>
            </div>

            <ConfigurationGraphic index={item.index} />
          </li>
        ))}
      </ol>
    </section>
  );
}