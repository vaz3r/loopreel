import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
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

const barcodeWidths = [
  2, 4, 2, 3, 1, 4, 2, 2, 3, 1, 4, 2, 3, 2, 1, 4, 2, 3, 2, 4, 1, 3,
];

const clockTicks = Array.from({ length: 12 }, (_, index) => index);

export default function Slide03({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const uid = React.useId();
  const passengerTitleId = `${uid}-passenger`;
  const flightTitleId = `${uid}-flight`;

  return (
    <section className="editorial-slide">
      <header className="editorial-header">
        <div className="editorial-kicker">
          <span className="editorial-kicker-dot" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="editorial-headline">{slide.headline}</h1>

        {slide.subheadline && (
          <p className="editorial-subheadline">{slide.subheadline}</p>
        )}
      </header>

      <div className="layout-split-diptych relative grid !h-[650px] !flex-none !grid-cols-2 !gap-[56px]">
        {/* One inspection seam connects the two independent conditions. */}
        <div
          className="pointer-events-none absolute left-[448px] top-[210px] z-10 flex h-0 w-[56px] items-center justify-center border-t border-[var(--accent)]"
        >
          <span className="bg-[var(--paper)] px-1 font-[family-name:var(--font-mono)] text-[20px] leading-none text-[var(--accent)]">
            AND
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="editorial-visual-frame editorial-visual-split !h-[420px] !max-h-[420px] w-full !flex-none">
            <svg
              viewBox="0 0 448 420"
              className="block h-full w-full text-[var(--ink)]"
              role="img"
              aria-labelledby={passengerTitleId}
            >
              <title id={passengerTitleId}>
                Boarding pass with three inspection anchors and a timeliness
                clock; no universal check-in deadline is specified.
              </title>

              {/* Gate-validation cradle. */}
              <g
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeLinecap="square"
              >
                <path d="M44 112V72H102" />
                <path d="M342 72H400V132" />
                <path d="M44 266V320H102" />
                <path d="M342 320H400V266" />
                <rect x="54" y="86" width="336" height="220" rx="2" />
                <path d="M66 98H98V106H66Z" fill="var(--surface)" />
                <path d="M350 286H382V294H350Z" fill="var(--surface)" />
                <line x1="28" y1="196" x2="60" y2="196" />
                <line x1="388" y1="196" x2="420" y2="196" />
                <line x1="224" y1="56" x2="224" y2="88" />
                <line x1="224" y1="304" x2="224" y2="336" />
                <circle cx="44" cy="72" r="3" />
                <circle cx="400" cy="320" r="3" />
              </g>

              {/* Notched boarding-pass stock. */}
              <path
                d="M78 112H362V180
                   C340 180 340 212 362 212
                   V280H78V212
                   C100 212 100 180 78 180Z"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />

              <path
                d="M116 112V280"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="3 6"
              />

              {/* Three distinct inspection anchors, not approval marks. */}
              <g fill="none" stroke="var(--accent)" strokeWidth="1.5">
                <path d="M146 163V136H166" />
                <path d="M220 163V136H240" />
                <path d="M294 163V136H314" />

                {[146, 220, 294].map((x) => (
                  <g key={x}>
                    <circle cx={x} cy="174" r="11" />
                    <circle cx={x} cy="174" r="3" />
                    <line x1={x} y1="185" x2={x} y2="202" />
                    <line x1={x - 6} y1="202" x2={x + 6} y2="202" />
                  </g>
                ))}
              </g>

              {/* Machine-readable visual texture, never placeholder copy. */}
              <g fill="var(--ink)">
                {barcodeWidths.map((width, index) => (
                  <rect
                    key={index}
                    x={137 + index * 8}
                    y="226"
                    width={width}
                    height={index % 4 === 0 ? 34 : 28}
                  />
                ))}
              </g>

              <g fill="none" stroke="var(--border)" strokeWidth="1">
                <path d="M130 220H124V266H130" />
                <path d="M318 220H324V266H318" />
                <circle cx="96" cy="136" r="4" />
                <circle cx="96" cy="256" r="4" />
              </g>

              {/* Clock overlaps the cradle without asserting a deadline. */}
              <circle
                cx="338"
                cy="94"
                r="54"
                fill="var(--paper)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              <circle
                cx="338"
                cy="94"
                r="45"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />

              <g stroke="var(--ink)" strokeWidth="1.5">
                {clockTicks.map((tick) => (
                  <line
                    key={tick}
                    x1="338"
                    y1="48"
                    x2="338"
                    y2={tick % 3 === 0 ? 57 : 53}
                    transform={`rotate(${tick * 30} 338 94)`}
                  />
                ))}
              </g>

              <path
                d="M338 64V94L357 105"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="338" cy="94" r="4" fill="var(--accent)" />

              {/* Lower mechanical mounting details. */}
              <g fill="none" stroke="var(--border)" strokeWidth="1">
                <path d="M164 320V344H284V320" />
                <rect x="190" y="344" width="68" height="12" rx="2" />
                <line x1="224" y1="356" x2="224" y2="378" />
                <circle cx="224" cy="384" r="6" />
              </g>
            </svg>
          </div>

          <article className="flex h-[214px] min-w-0 flex-col gap-4 px-2 pt-3">
            <h2 className="editorial-card-title !text-[var(--accent)]">
              {item0?.title}
            </h2>
            <p className="editorial-card-body">
              <EmphasizedCopy text={item0?.body} />
            </p>
          </article>
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <div className="editorial-visual-frame editorial-visual-split !h-[420px] !max-h-[420px] w-full !flex-none">
            <svg
              viewBox="0 0 448 420"
              className="block h-full w-full text-[var(--ink)]"
              role="img"
              aria-labelledby={flightTitleId}
            >
              <title id={flightTitleId}>
                Flight inspection plate showing a departure origin, an arrival
                delay greater than one hour, and an open eligibility latch.
                Exclusions still apply.
              </title>

              {/* Aircraft-window-shaped inspection plate. */}
              <path
                d="M144 28H304
                   C370 28 410 82 410 150
                   V268C410 340 366 390 300 390
                   H148C82 390 38 340 38 268
                   V150C38 82 78 28 144 28Z"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              <path
                d="M148 42H300
                   C358 42 396 90 396 152
                   V266C396 330 358 376 296 376
                   H152C90 376 52 330 52 266
                   V152C52 90 90 42 148 42Z"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />

              {/* Plate fasteners and calibration ticks. */}
              <g fill="none" stroke="var(--border)" strokeWidth="1">
                {[122, 224, 326].map((x) => (
                  <g key={x}>
                    <circle cx={x} cy="50" r="3" />
                    <line x1={x - 2} y1="50" x2={x + 2} y2="50" />
                    <circle cx={x} cy="368" r="3" />
                    <line x1={x - 2} y1="368" x2={x + 2} y2="368" />
                  </g>
                ))}
                {[126, 158, 190, 222, 254, 286].map((y) => (
                  <g key={y}>
                    <line x1="38" y1={y} x2="48" y2={y} />
                    <line x1="400" y1={y} x2="410" y2={y} />
                  </g>
                ))}
              </g>

              {/* Technical aircraft profile, travelling from the origin. */}
              <g
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              >
                <path
                  d="M76 151L99 154L91 116H105L132 151
                     H266Q291 151 313 165L330 176
                     Q332 183 317 186H130L99 178H76Z"
                  fill="var(--paper)"
                />
                <path d="M173 165L145 122H161L221 165" />
                <path d="M183 177L150 211H169L232 177" />
                <path d="M281 158L292 168H310" />
                <path d="M236 185V194H258V185" />
                <ellipse cx="248" cy="194" rx="11" ry="4" />
                <line x1="115" y1="165" x2="134" y2="165" />
                {[149, 166, 183, 200, 217, 234, 251].map((x) => (
                  <circle key={x} cx={x} cy="160" r="2" />
                ))}
              </g>

              {/* Departure origin: a locator, not an approval symbol. */}
              <g fill="none" stroke="var(--accent)" strokeWidth="1.5">
                <line x1="102" y1="184" x2="102" y2="255" />
                <circle cx="102" cy="255" r="17" />
                <circle cx="102" cy="255" r="6" />
                <line x1="77" y1="255" x2="89" y2="255" />
                <line x1="115" y1="255" x2="127" y2="255" />
                <line x1="102" y1="230" x2="102" y2="242" />
                <line x1="102" y1="268" x2="102" y2="280" />
                <path d="M127 255H202" strokeDasharray="3 6" />
              </g>

              {/* Arrival-delay instrument. */}
              <circle
                cx="300"
                cy="255"
                r="86"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              <circle
                cx="300"
                cy="255"
                r="75"
                fill="none"
                stroke="var(--border)"
                strokeWidth="1"
              />

              <g stroke="var(--ink)" strokeWidth="1.5">
                {clockTicks.map((tick) => (
                  <line
                    key={tick}
                    x1="300"
                    y1="178"
                    x2="300"
                    y2={tick % 3 === 0 ? 191 : 185}
                    transform={`rotate(${tick * 30} 300 255)`}
                  />
                ))}
              </g>

              <path
                d="M300 211V255L326 239"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="300" cy="255" r="4" fill="var(--accent)" />
              <text
                x="300"
                y="302"
                textAnchor="middle"
                fill="var(--accent)"
                className="font-[family-name:var(--font-mono)] text-[32px] font-bold tabular-nums"
              >
                {'>1 h'}
              </text>

              {/* Separate open latch: these conditions are not final approval. */}
              <g
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="square"
              >
                <rect
                  x="82"
                  y="314"
                  width="63"
                  height="35"
                  rx="2"
                  fill="var(--paper)"
                />
                <circle cx="96" cy="331" r="4" />
                <path d="M100 327L137 298" strokeWidth="3" />
                <circle cx="139" cy="296" r="4" />
                <path d="M157 314H173V349H157" />
                <line x1="157" y1="324" x2="166" y2="324" />
                <line x1="157" y1="339" x2="166" y2="339" />
              </g>
            </svg>
          </div>

          <article className="flex h-[214px] min-w-0 flex-col gap-4 px-2 pt-3">
            <h2 className="editorial-card-title !text-[var(--accent)]">
              {item1?.title}
            </h2>
            <p className="editorial-card-body">
              <EmphasizedCopy text={item1?.body} />
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}