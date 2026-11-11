import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const items = [
  {
    index: 1,
    tag: 'CPU',
    title: 'Measured gains over M5',
    body: 'CPU improvements: around 7 percent and 15 percent for single- and multi-core performance, respectively.',
  },
  {
    index: 2,
    tag: 'GRAPHICS',
    title: 'A bigger performance jump',
    body: 'GPU performance improves between 20 and 30 percent over M5, depending on the test.',
  },
  {
    index: 3,
    tag: 'CONNECTIVITY',
    title: 'Ports remain a selling point',
    body: 'Three Thunderbolt 4 ports across both sides; dedicated HDMI, SD card reader, MagSafe, headphone jack.',
  },
];

function HardwareGraphic({ index }: { index: number }) {
  if (index === 1) {
    return (
      <svg
        viewBox="0 0 240 200"
        fill="none"
        aria-hidden="true"
        className="h-full w-full text-[var(--accent)]"
      >
        <g stroke="var(--border)" strokeWidth="1.5">
          {[64, 88, 112, 136, 160].map((position) => (
            <React.Fragment key={position}>
              <path d={`M${position} 22v22M${position} 156v22`} />
              <path d={`M34 ${position - 12}h22M168 ${position - 12}h22`} />
            </React.Fragment>
          ))}
          <rect x="56" y="44" width="112" height="112" rx="8" />
          <rect x="68" y="56" width="88" height="88" rx="3" />
          <path d="M80 100h64M112 68v64" />
        </g>

        <g fill="currentColor">
          <rect x="80" y="68" width="24" height="24" rx="2" opacity=".25" />
          <rect x="120" y="68" width="24" height="24" rx="2" opacity=".45" />
          <rect x="80" y="108" width="24" height="24" rx="2" opacity=".65" />
          <rect x="120" y="108" width="24" height="24" rx="2" />
        </g>

        <path
          d="M168 82h30V56h24M168 118h44v26h10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="222" cy="56" r="4" fill="currentColor" />
        <circle cx="222" cy="144" r="4" fill="currentColor" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 240 200"
        fill="none"
        aria-hidden="true"
        className="h-full w-full text-[var(--accent)]"
      >
        <g stroke="var(--border)" strokeWidth="1">
          <path d="M20 160h200M20 120h200M20 80h200M20 40h200" />
          <path d="M40 24v152M80 24v152M120 24v152M160 24v152M200 24v152" />
        </g>

        {[0, 1, 2, 3].map((layer) => (
          <g key={layer} transform={`translate(0 ${-layer * 24})`}>
            <path
              d="m36 130 84-38 84 38-84 38-84-38Z"
              fill="var(--surface)"
              stroke={layer === 3 ? 'currentColor' : 'var(--border)'}
              strokeWidth="1.5"
            />
            <path
              d="m36 130 84 38 84-38"
              stroke="currentColor"
              strokeWidth="2"
              opacity={0.2 + layer * 0.25}
            />
          </g>
        ))}

        <path
          d="m86 58 34-15 34 15-34 15-34-15Z"
          fill="currentColor"
          fillOpacity=".2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M120 74v94" stroke="currentColor" strokeDasharray="3 5" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 240 200"
      fill="none"
      aria-hidden="true"
      className="h-full w-full text-[var(--accent)]"
    >
      <g stroke="var(--border)" strokeWidth="1.5">
        <rect x="35" y="34" width="170" height="108" rx="7" />
        <rect x="43" y="42" width="154" height="92" rx="2" />
        <path d="m35 142-17 20h204l-17-20M18 162v5h204v-5" />
        <path d="M99 143h42l5 7H94l5-7Z" />
      </g>

      <path
        d="M56 110V87h36V65h56v22h36v23M120 65v45"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        opacity=".65"
      />

      <g fill="var(--surface)" stroke="currentColor" strokeWidth="2">
        <rect x="46" y="108" width="20" height="7" rx="3.5" />
        <rect x="110" y="108" width="20" height="7" rx="3.5" />
        <rect x="174" y="108" width="20" height="7" rx="3.5" />
      </g>

      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M43 155h19M72 155h10M92 155h23" />
        <path d="m143 152 4 6h17l4-6h-25Z" />
        <circle cx="187" cy="155" r="3" />
      </g>
    </svg>
  );
}

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-8 text-[var(--ink)]">
      <h2 className="max-w-[900px] shrink-0 font-[var(--font-headline)] text-[64px] font-semibold leading-[1.04] tracking-[-0.045em]">
        What the M6 Upgrade
        <br />
        Actually Delivers
        <span className="ml-3 inline-block h-3 w-3 bg-[var(--accent)]" />
      </h2>

      <div className="grid min-h-0 flex-1 grid-rows-3 gap-4">
        {items.map((item) => (
          <section
            key={item.index}
            className="relative grid min-h-0 grid-cols-[minmax(0,1fr)_240px] items-center gap-6 border border-[var(--border)] bg-[var(--surface)] px-7 py-6"
          >
            <span className="absolute -left-px top-7 h-10 w-[3px] bg-[var(--accent)]" />

            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-3 font-[var(--font-mono)] text-[14px] font-medium leading-none tracking-[0.15em]">
                <span className="text-[var(--accent)]">
                  {String(item.index).padStart(2, '0')}
                </span>
                <span className="h-3 w-px bg-[var(--border)]" />
                <span>{item.tag}</span>
              </div>

              <h3 className="mb-3 font-[var(--font-headline)] text-[30px] font-semibold leading-[1.12] tracking-[-0.025em]">
                {item.title}
              </h3>

              <p className="max-w-[570px] font-[var(--font-body)] text-[23px] leading-[1.38] tracking-[-0.012em]">
                {item.body}
              </p>
            </div>

            <div className="flex h-[202px] items-center border-l border-[var(--border)] pl-4">
              <HardwareGraphic index={item.index} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}