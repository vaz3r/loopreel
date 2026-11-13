import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  const comparisonCells =
    item0?.body?.match(/[^;]+(?:;|$)/g)?.map((cell) => cell.trim()) ?? [];

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

      <article className="editorial-card flex flex-1 flex-col justify-between gap-4">
        <div className="editorial-visual-frame w-full shrink-0">
          <svg
            viewBox="0 0 952 420"
            className="block h-auto max-h-[420px] w-full"
            role="img"
            aria-label="Airport gate tally instrument. Shared numerical scale from 0.00 to 0.30: Q4 2023, 0.20; Q4 2024, 0.25; Q3 2024, 0.28. Not a chronological line chart."
          >
            {/* Chamfered housing and recessed faceplate. */}
            <path
              d="M74 28H878L902 52V364L878 388H74L50 364V52Z"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <path
              d="M84 40H868L890 62V354L868 376H84L62 354V62Z"
              fill="none"
              stroke="var(--border)"
            />
            <path
              d="M50 88V52L74 28H110"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />

            {/* Recessed optical counter window. */}
            <rect
              x="90"
              y="58"
              width="414"
              height="198"
              rx="2"
              fill="var(--surface)"
              stroke="var(--ink)"
            />
            <rect
              x="98"
              y="66"
              width="398"
              height="182"
              rx="2"
              fill="var(--paper)"
              stroke="var(--border)"
            />
            <path
              d="M98 248V66H496"
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.3"
            />
            <path
              d="M108 78H124M108 78V94M486 232H470M486 232V216"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            <text
              x="112"
              y="225"
              fill="var(--ink)"
              fontSize="174"
              fontWeight="700"
              className="font-[family-name:var(--font-mono)] tabular-nums"
            >
              {t0?.value}
            </text>
            <text
              x="126"
              y="278"
              fill="var(--ink)"
              fontSize="24"
              className="font-[family-name:var(--font-mono)] tabular-nums"
            >
              /10,000
            </text>

            {/* Curved seat-profile mounting bracket. */}
            <path
              d="M616 64H654L669 128Q672 142 690 142H820
                 Q842 142 842 164V188H812V174H688
                 Q648 174 638 138Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M630 76H644L659 133Q665 158 690 158H821"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <path
              d="M688 174V194H718V174"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <rect
              x="676"
              y="194"
              width="54"
              height="8"
              fill="var(--ink)"
            />
            <circle
              cx="826"
              cy="159"
              r="6"
              fill="var(--paper)"
              stroke="var(--ink)"
            />
            <circle
              cx="639"
              cy="91"
              r="5"
              fill="var(--paper)"
              stroke="var(--ink)"
            />

            {/* Housing fasteners: structural details, not text substitutes. */}
            {[
              [74, 68],
              [878, 68],
              [74, 348],
              [878, 348],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="7"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="3"
                  fill="none"
                  stroke="var(--border)"
                />
                <path
                  d={`M${x - 3} ${y + 3}L${x + 3} ${y - 3}`}
                  stroke="var(--ink)"
                />
              </g>
            ))}

            {/* Common quantitative axis: 0.00–0.30, 31 calibration ticks. */}
            <line
              x1="156"
              y1="324"
              x2="816"
              y2="324"
              stroke="var(--ink)"
              strokeWidth="2"
            />
            <line
              x1="156"
              y1="327"
              x2="816"
              y2="327"
              stroke="var(--border)"
            />

            {Array.from({ length: 31 }, (_, index) => {
              const x = 156 + index * 22;
              const major = index % 5 === 0;

              return (
                <line
                  key={index}
                  x1={x}
                  x2={x}
                  y1={major ? 310 : 317}
                  y2={major ? 338 : 331}
                  stroke={major ? 'var(--ink)' : 'var(--border)'}
                  strokeWidth={major ? 1.5 : 1}
                />
              );
            })}

            {/* Independent leaders; no chronological connecting line. */}
            <path
              d="M596 313V260H548"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <path
              d="M706 311V298"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M772 313V226H805"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />

            {/* Q4 2023: hollow circle. */}
            <circle
              cx="596"
              cy="324"
              r="9"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            {/* Q4 2024: orange accent ring. */}
            <circle
              cx="706"
              cy="324"
              r="12"
              fill="var(--paper)"
              stroke="var(--accent)"
              strokeWidth="4"
            />
            <circle
              cx="706"
              cy="324"
              r="3"
              fill="var(--accent)"
            />

            {/* Q3 2024: diamond. */}
            <path
              d="M772 313L783 324L772 335L761 324Z"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            {/* Compact date plates and scale values. */}
            <g
              fill="var(--ink)"
              fontSize="22"
              className="font-[family-name:var(--font-mono)] tabular-nums"
            >
              <text x="548" y="246">
                Q4 2023
              </text>
              <text
                x="706"
                y="286"
                textAnchor="middle"
                fill="var(--accent)"
              >
                Q4 2024
              </text>
              <text x="860" y="214" textAnchor="end">
                Q3 2024
              </text>

              <text x="156" y="366" textAnchor="middle">
                0.00
              </text>
              <text x="596" y="356" textAnchor="middle">
                0.20
              </text>
              <text
                x="706"
                y="372"
                textAnchor="middle"
                fill="var(--accent)"
              >
                0.25
              </text>
              <text x="772" y="356" textAnchor="middle">
                0.28
              </text>
              <text x="854" y="366" textAnchor="middle">
                0.30
              </text>
            </g>
          </svg>
        </div>

        {/* Complete metric definition stays in HTML. */}
        <div className="flex items-center gap-6 border-t border-[var(--border)] pt-4">
          <div className="editorial-metric-huge shrink-0 text-[var(--accent)]">
            {t0?.value}
          </div>
          <p className="editorial-card-title min-w-0">
            {telemetry?.[0]?.label}
          </p>
        </div>
      </article>

      <article className="editorial-card shrink-0">
        <h2 className="editorial-kicker mb-3">{item0?.title}</h2>

        <div className="layout-grid-2">
          {comparisonCells.map((cell, index) => (
            <div
              key={index}
              className={
                index === 0
                  ? 'min-w-0'
                  : 'min-w-0 border-l border-[var(--border)] pl-5'
              }
            >
              <p className="editorial-card-body">
                <EmphasizedCopy text={cell} />
              </p>
            </div>
          ))}
        </div>
      </article>

      {slide.footer && (
        <p className="editorial-note shrink-0">{slide.footer}</p>
      )}
    </section>
  );
}