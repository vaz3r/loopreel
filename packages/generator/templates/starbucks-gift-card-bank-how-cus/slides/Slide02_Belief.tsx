import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

interface BarcodeBar {
  x: number;
  width: number;
}

interface SpecimenArtworkProps {
  kind: 'card' | 'receipt';
}

function renderEmphasis(text?: string): React.ReactNode {
  return (text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className="font-semibold text-[var(--ink)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

// Code 128B patterns and weighted modulo-103 checksum: 
// Encodes only "TFP": an editorial specimen, not a payment credential.
function createSpecimenBarcode(): BarcodeBar[] {
  const data = [52, 38, 48];
  const checksum =
    (104 + data.reduce((sum, value, index) => sum + value * (index + 1), 0)) %
    103;

  const patterns: Record<number, string> = {
    104: '211214',
    52: '213311',
    38: '132311',
    48: '313121',
    67: '141122',
    106: '2331112',
  };

  const bars: BarcodeBar[] = [];
  let cursor = 10; // Ten-module leading quiet zone.

  for (const symbol of [104, ...data, checksum, 106]) {
    const pattern = patterns[symbol];

    if (!pattern) {
      throw new Error(`Missing specimen barcode symbol: ${symbol}`);
    }

    Array.from(pattern).forEach((digit, index) => {
      const width = Number(digit);

      if (index % 2 === 0) {
        bars.push({ x: cursor, width });
      }

      cursor += width;
    });
  }

  return bars;
}

const specimenBars = createSpecimenBarcode();

function SpecimenArtwork({ kind }: SpecimenArtworkProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 952 420"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      {kind === 'card' ? (
        <g
          stroke="var(--border)"
          strokeWidth={1}
          className="[&_*]:[vector-effect:non-scaling-stroke]"
        >
          {/* Nine structural elements: outline, inset, stripe,
              four registration corners, and two edge glints. */}
          <path
            d="M42 24H888L928 64V374L906 396H42L24 378V42Z"
            fill="var(--surface)"
          />
          <path d="M54 40H880L912 72V366L898 380H54L40 366V54Z" />

          <rect
            x={678}
            y={86}
            width={234}
            height={64}
            fill="var(--border)"
            stroke="none"
          />

          <path d="M12 56V12H56" />
          <path d="M896 12H940V56" />
          <path d="M12 364V408H56" />
          <path d="M896 408H940V364" />

          <path d="M928 186V264" stroke="var(--accent)" />
          <path d="M752 396H832" stroke="var(--accent)" />
        </g>
      ) : (
        <>
          <g
            stroke="var(--border)"
            strokeWidth={1}
            className="[&_*]:[vector-effect:non-scaling-stroke]"
          >
            {/* Seventeen structural elements: perimeter, eight teeth,
                two rollers, axle, curl, and four optical marks. */}
            <path
              d="M608 340V70H864V340"
              fill="var(--paper, #0D0E12)"
            />

            {Array.from({ length: 8 }, (_, index) => (
              <path
                key={`tooth-${index}`}
                d={`M${608 + index * 32} 340l16 14 16-14`}
                fill="var(--paper, #0D0E12)"
              />
            ))}

            <circle
              cx={608}
              cy={70}
              r={14}
              fill="var(--surface)"
            />
            <circle
              cx={864}
              cy={70}
              r={14}
              fill="var(--surface)"
            />
            <path d="M594 70H878" />

            <path
              d="M608 96C664 116 808 116 864 96V70H608Z"
              fill="var(--surface)"
            />

            <path d="M578 44H598M588 34V54" />
            <path d="M874 44H894M884 34V54" />
            <path d="M578 370H598M588 360V380" />
            <path
              d="M874 370H894M884 360V380"
              stroke="var(--accent)"
            />
          </g>

          {/* 68 encoded modules plus two 10-module quiet zones.
              At two SVG units per module, the specimen is 176 units wide. */}
          <g shapeRendering="crispEdges">
            <rect
              x={648}
              y={232}
              width={176}
              height={70}
              fill="var(--ink)"
            />
            {specimenBars.map((bar) => (
              <rect
                key={bar.x}
                x={648 + bar.x * 2}
                y={240}
                width={bar.width * 2}
                height={54}
                fill="var(--paper, #0D0E12)"
              />
            ))}
          </g>
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
  // SlideFrame owns brand chrome, pagination, and the supplied footer.
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const metric0 = item0?.metric?.badge
    ? parseMetricBadge(item0.metric.badge)
    : null;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between">
      <div className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        {slide.subheadline && (
          <p className="mt-5 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        )}
      </div>

      <div className="my-6 grid min-h-0 flex-1 grid-rows-2 gap-7">
        <article className="relative mr-10 flex min-h-0 flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] p-8">
          <SpecimenArtwork kind="card" />

          <div className="relative z-10 flex items-start justify-between gap-6">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
              {item0?.title}
            </h2>

            {metric0 && (
              <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
                {metric0.qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric0.qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[52px] font-bold leading-none tabular-nums">
                  {metric0.value}
                </span>
                {metric0.unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {metric0.unit}
                  </span>
                )}
              </div>
            )}
          </div>

          <div aria-hidden="true" className="h-[120px] shrink-0" />

          <p className="relative z-10 max-w-[620px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            {renderEmphasis(item0?.body)}
          </p>
        </article>

        <article className="relative ml-10 flex min-h-0 w-[792px] max-w-[calc(100%-40px)] flex-col justify-between justify-self-end rounded-none border border-[var(--border)] bg-[var(--paper,#0D0E12)] p-8">
          <SpecimenArtwork kind="receipt" />

          <div className="relative z-10 max-w-[420px]">
            <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.1] tracking-[-0.025em]">
              {item1?.title}
            </h2>
            <div
              aria-hidden="true"
              className="mt-5 w-16 border-t border-[var(--accent)]"
            />
          </div>

          <div aria-hidden="true" className="h-[120px] shrink-0" />

          <p className="relative z-10 max-w-[420px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            {renderEmphasis(item1?.body)}
          </p>
        </article>
      </div>
    </section>
  );
}