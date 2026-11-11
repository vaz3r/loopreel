import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const items = [
  {
    index: 1,
    tag: 'AI',
    title: 'Navigation needs the cloud',
    body: 'AI Pilot combines cameras, specialized vision models, on-device sensors and cloud processing.',
  },
  {
    index: 2,
    tag: 'MAPPING',
    title: 'Your space becomes a map',
    body: 'Both devices digitally map customers’ home or business floor plans.',
  },
  {
    index: 3,
    tag: 'RESPONSE',
    title: 'Alerts can trigger patrols',
    body: 'Connected Ring-device alerts can send the cameras along predefined routes or patrol points.',
  },
] as const;

function Diagram({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 224 208"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full text-[var(--accent)]"
    >
      {/* Architectural registration grid */}
      <g stroke="var(--border)" strokeWidth="0.75" opacity="0.45">
        {[32, 72, 112, 152, 192].map((position) => (
          <React.Fragment key={position}>
            <path d={`M${position} 16V192`} />
            <path d={`M16 ${position}H208`} />
          </React.Fragment>
        ))}
      </g>

      <g stroke="var(--border)" strokeWidth="1.5">
        <path d="M16 28V16H28M196 16H208V28M16 180V192H28M196 192H208V180" />
      </g>

      {index === 1 && (
        <>
          <path
            d="M67 77C55 77 47 69 47 58C47 47 55 39 66 38C70 24 81 17 94 19C105 20 114 27 118 38C130 34 142 39 147 50C159 49 168 55 168 65C168 73 162 78 153 78H67Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M86 92V118M138 92V118"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 5"
          />
          <path
            d="M81 99L86 94L91 99M133 111L138 116L143 111"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M72 144L35 125V177L72 160M152 144L189 125V177L152 160"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />
          <rect
            x="72"
            y="132"
            width="80"
            height="42"
            rx="12"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="112" cy="153" r="12" stroke="currentColor" strokeWidth="2" />
          <circle cx="112" cy="153" r="4" fill="currentColor" />
          <path d="M90 181H134" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="83" cy="144" r="2" fill="currentColor" />
        </>
      )}

      {index === 2 && (
        <>
          <path
            d="M38 39H186V169H38V39Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <path
            d="M108 39V88M108 111V169M38 103H78M141 103H186"
            stroke="var(--ink)"
            strokeWidth="2.5"
          />
          <path
            d="M108 88H131C131 101 121 111 108 111M78 103V126C91 126 101 116 101 103"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          <path
            d="M63 142L63 66H151V142H63Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            opacity="0.65"
          />
          <path
            d="M63 142L100 125M63 142L91 158M63 142L45 119"
            stroke="currentColor"
            strokeOpacity="0.4"
          />
          <circle cx="63" cy="142" r="19" fill="currentColor" fillOpacity="0.1" />
          <circle cx="63" cy="142" r="6" fill="currentColor" />

          {[
            [63, 66],
            [151, 66],
            [151, 142],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              fill="currentColor"
            />
          ))}
          <path
            d="M38 183H186M38 179V187M186 179V187"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.65"
          />
        </>
      )}

      {index === 3 && (
        <>
          <path
            d="M37 50H187V169H37V50ZM111 50V91M111 123V169M37 108H80M144 108H187"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M66 143H151V78H111"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="5 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M105 138L111 143L105 148M146 116L151 110L156 116"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="66" cy="143" r="17" fill="currentColor" fillOpacity="0.1" />
          <circle cx="66" cy="143" r="7" fill="currentColor" />
          <circle
            cx="151"
            cy="143"
            r="5"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle
            cx="151"
            cy="78"
            r="5"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />

          <rect
            x="75"
            y="60"
            width="36"
            height="36"
            rx="8"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M96 66L86 80H94L90 90L101 75H93L96 66Z"
            fill="currentColor"
          />
          <path
            d="M79 49C87 42 99 42 107 49M72 40C84 29 102 29 114 40"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.55"
          />
        </>
      )}
    </svg>
  );
}

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  // The supplied copy is intentionally locked; framing belongs to SlideFrame.
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col text-[var(--ink)]">
      <div className="shrink-0 pb-10 pt-3">
        <div className="mb-6 h-1.5 w-16 bg-[var(--accent)]" />
        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[64px] font-semibold leading-[1.04] tracking-[-0.045em]">
          What Changes When
          <br />
          Cameras Can Move?
        </h1>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3">
        {items.map((item) => (
          <article
            key={item.index}
            className="grid min-h-0 grid-cols-[224px_minmax(0,1fr)] items-center gap-10 border-t border-[var(--border)] py-6 last:border-b"
          >
            <div className="relative flex items-center justify-center self-stretch bg-[var(--surface)]">
              <Diagram index={item.index} />
            </div>

            <div className="min-w-0">
              <div className="mb-4 flex items-center gap-3 font-[var(--font-mono)] text-[15px] font-medium leading-none tracking-[0.14em]">
                <span className="text-[var(--accent)]">
                  {String(item.index).padStart(2, '0')}
                </span>
                <span className="h-3 w-px bg-[var(--border)]" aria-hidden="true" />
                <span className="text-[var(--accent)]">{item.tag}</span>
              </div>

              <h2 className="font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.035em]">
                {item.title}
              </h2>

              <p className="mt-3 max-w-[640px] font-[var(--font-body)] text-[25px] font-normal leading-[1.38] tracking-[-0.015em]">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}