import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function InlineEmphasis({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide04({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const graphicId = React.useId();

  return (
    <section className="editorial-slide">
      <header className="editorial-header">
        <div className="editorial-kicker">
          <span className="editorial-kicker-dot" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="editorial-headline !text-[56px] max-w-[740px]">
          {slide.headline}
        </h1>

        {slide.subheadline && (
          <p className="editorial-subheadline">{slide.subheadline}</p>
        )}
      </header>

      <div className="editorial-visual-frame editorial-visual-compact">
        <svg
          viewBox="0 0 952 420"
          className="block h-full w-full"
          role="img"
          aria-labelledby={`${graphicId}-title ${graphicId}-description`}
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={`${graphicId}-title`}>
            Three compensation-exclusion stations
          </title>
          <desc id={`${graphicId}-description`}>
            Station 01 shows an operational or safety substitution with a
            smaller aircraft. Station 02 shows weight-and-balance restrictions
            for aircraft with 60 seats or fewer. Station 03 shows charter
            documents, a foreign-departure origin globe, and scheduled aircraft
            below 30 seats. These exclusions concern denied-boarding
            compensation, not rights under other laws. Illustrated seat modules
            represent aircraft anatomy, not literal seat counts.
          </desc>

          {/* Registration marks and station boundaries. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          >
            <path d="M24 44V24H44" />
            <path d="M908 24H928V44" />
            <path d="M24 376V396H44" />
            <path d="M908 396H928V376" />
            <line x1="352" y1="48" x2="352" y2="372" />
            <line x1="650" y1="48" x2="650" y2="372" />

            {Array.from({ length: 25 }, (_, index) => {
              const x = 44 + index * 36;
              return (
                <line
                  key={`rail-tick-${index}`}
                  x1={x}
                  y1="278"
                  x2={x}
                  y2={index % 3 === 0 ? 292 : 285}
                />
              );
            })}
          </g>

          {/* Double technical release rail. */}
          <g fill="none" stroke="var(--ink)" strokeWidth="2">
            <line x1="44" y1="240" x2="908" y2="240" />
            <line x1="44" y1="252" x2="908" y2="252" />
            <circle cx="44" cy="246" r="7" fill="var(--paper)" />
            <circle cx="908" cy="246" r="7" fill="var(--paper)" />
          </g>

          {/* 01 — Larger cabin exchanged for a smaller cabin. */}
          <g
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.6"
          >
            <path d="M100 68H282Q320 68 334 100Q320 132 282 132H100Z" />
            <line x1="116" y1="100" x2="292" y2="100" />
            <path d="M303 81L315 91V109L303 119" fill="none" />

            {Array.from({ length: 6 }, (_, index) => (
              <g key={`large-seat-${index}`}>
                <rect x={120 + index * 27} y="78" width="17" height="15" rx="2" />
                <rect x={120 + index * 27} y="107" width="17" height="15" rx="2" />
              </g>
            ))}

            <path d="M130 180H253Q278 180 292 202Q278 224 253 224H130Z" />
            <line x1="142" y1="202" x2="264" y2="202" />

            {Array.from({ length: 4 }, (_, index) => (
              <g key={`small-seat-${index}`}>
                <rect x={145 + index * 25} y="186" width="15" height="11" rx="2" />
                <rect x={145 + index * 25} y="207" width="15" height="11" rx="2" />
              </g>
            ))}
          </g>

          <g fill="none" stroke="var(--accent)" strokeWidth="2.5">
            <path d="M208 139V169M200 161L208 169L216 161" />
            <path d="M302 182H318V198" />
            <path d="M318 213V226H302" />
            <line x1="311" y1="201" x2="325" y2="209" />
          </g>

          {/* 02 — Fuselage, wing spar, and load-and-balance rig. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.6"
          >
            <path
              d="M498 61C481 72 477 94 477 116V182L488 207H508L519 182V116C519 94 515 72 498 61Z"
              fill="var(--surface)"
            />
            <path
              d="M477 124L387 163V178L477 153M519 124L609 163V178L519 153"
              fill="var(--surface)"
            />
            <path d="M486 183L460 204V211L493 202" />
            <path d="M510 183L536 204V211L503 202" />
            <line x1="498" y1="79" x2="498" y2="198" />
            <line x1="394" y1="165" x2="602" y2="165" />

            {Array.from({ length: 4 }, (_, index) => (
              <g key={`inspection-window-${index}`}>
                <rect x="481" y={92 + index * 18} width="5" height="8" />
                <rect x="510" y={92 + index * 18} width="5" height="8" />
              </g>
            ))}

            <path d="M424 176V220H572V176" />
            <path d="M414 232L424 220L434 232Z" fill="var(--surface)" />
            <path d="M562 232L572 220L582 232Z" fill="var(--surface)" />
            <circle cx="424" cy="172" r="6" fill="var(--paper)" />
            <circle cx="572" cy="172" r="6" fill="var(--paper)" />

            <path d="M386 303V315H610V303" />
            <line x1="386" y1="315" x2="386" y2="323" />
            <line x1="610" y1="315" x2="610" y2="323" />
          </g>

          <g fill="none" stroke="var(--accent)" strokeWidth="2">
            <circle cx="498" cy="148" r="17" />
            <circle cx="498" cy="148" r="4" fill="var(--accent)" />
            <line x1="472" y1="148" x2="524" y2="148" />
            <line x1="498" y1="122" x2="498" y2="174" />
          </g>

          <text
            x="498"
            y="352"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[family-name:var(--font-mono)] text-[24px]"
          >
            ≤60 seats
          </text>

          {/* 03 — Departure documents, origin globe, compact cabin. */}
          <g
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.6"
          >
            <path d="M674 130H721L738 147V213H674Z" />
            <path d="M681 123H728L745 140V206H681Z" />
            <path d="M688 116H735L752 133V199H688Z" />
            <path d="M735 116V133H752" fill="none" />
            <circle cx="719" cy="163" r="15" fill="none" />
            <path d="M710 163L716 169L729 155" fill="none" />

            <circle cx="793" cy="80" r="36" fill="none" />
            <ellipse cx="793" cy="80" rx="15" ry="36" fill="none" />
            <ellipse cx="793" cy="80" rx="36" ry="13" fill="none" />
            <line x1="757" y1="80" x2="829" y2="80" />
            <line x1="793" y1="44" x2="793" y2="116" />

            <path d="M803 145H864Q889 145 900 180Q889 215 864 215H803Z" />
            <line x1="813" y1="180" x2="877" y2="180" />

            {Array.from({ length: 3 }, (_, index) => (
              <g key={`compact-seat-${index}`}>
                <rect x={813 + index * 22} y="155" width="13" height="17" rx="2" />
                <rect x={813 + index * 22} y="188" width="13" height="17" rx="2" />
              </g>
            ))}

            <path d="M797 303V315H904V303" fill="none" />
          </g>

          <g fill="none" stroke="var(--accent)" strokeWidth="2">
            <circle cx="773" cy="69" r="7" fill="var(--paper)" />
            <path d="M766 76L747 96H731" />
          </g>

          <text
            x="849"
            y="352"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[family-name:var(--font-mono)] text-[22px]"
          >
            {'<30 seats'}
          </text>

          {/* Physical stops interrupt both rails. */}
          {[318, 618, 887].map((x, index) => (
            <g key={`stop-${index}`}>
              <path
                d={`M${x - 10} 226H${x + 10}V265L${x} 275L${x - 10} 265Z`}
                fill="var(--accent)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <circle cx={x} cy="236" r="3" fill="var(--paper)" />
              <line
                x1={x}
                y1="245"
                x2={x}
                y2="260"
                stroke="var(--paper)"
                strokeWidth="2"
              />
            </g>
          ))}

          {/* Station numerals; meanings are mapped in HTML below. */}
          <g
            fill="var(--accent)"
            className="font-[family-name:var(--font-mono)] text-[24px] tabular-nums"
          >
            <text x="100" y="352">01</text>
            <text x="374" y="352">02</text>
            <text x="674" y="352">03</text>
          </g>
        </svg>
      </div>

      <div className="layout-grid-2 !gap-6">
        <article className="editorial-card flex flex-col gap-3 !rounded-none !border-t-2 !border-t-[var(--accent)]">
          <div className="flex flex-wrap gap-x-4 gap-y-2 font-[family-name:var(--font-mono)] text-[20px]">
            <span>
              <span className="text-[var(--accent)]">01</span> Substitution
            </span>
            <span>
              <span className="text-[var(--accent)]">02</span> Weight/balance
            </span>
          </div>

          <h2 className="editorial-card-title">{item0?.title}</h2>

          <p className="editorial-card-body">
            <InlineEmphasis text={item0?.body} />
          </p>
        </article>

        <article className="editorial-card flex flex-col gap-3 !rounded-none !border-t-2 !border-t-[var(--accent)]">
          <div className="font-[family-name:var(--font-mono)] text-[20px]">
            <span className="text-[var(--accent)]">03</span> Flight exclusions
          </div>

          <h2 className="editorial-card-title">{item1?.title}</h2>

          <p className="editorial-card-body">
            <InlineEmphasis text={item1?.body} />
          </p>
        </article>
      </div>

      <p className="editorial-note !text-[20px]">
        <InlineEmphasis text={slide.footer} />
      </p>
    </section>
  );
}