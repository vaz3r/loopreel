import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

interface EvidenceFields {
  metric?: {
    badge: string;
    label: string;
  };
  asOf?: string;
}

interface BarcodeBar {
  x: number;
  width: number;
}

// Code 128 B patterns and modulo-103 checksum. 
// Quiet zones are 10 modules on each side. 
const BARCODE_PATTERNS: Readonly<Record<number, string>> = {
  16: '123122',
  18: '223211',
  21: '213212',
  38: '132311',
  48: '313121',
  52: '213311',
  62: '431111',
  104: '211214',
  106: '2331112',
};

function createReceiptBarcode(): BarcodeBar[] {
  const data = Array.from('TFP2025', character => character.charCodeAt(0) - 32);
  const checksum =
    (104 + data.reduce((sum, value, index) => sum + value * (index + 1), 0)) %
    103;

  const symbols = [104, ...data, checksum, 106];
  const bars: BarcodeBar[] = [];
  let cursor = 20;

  for (const symbol of symbols) {
    const pattern = BARCODE_PATTERNS[symbol];

    if (!pattern) {
      throw new Error(`Missing Code 128 pattern: ${symbol}`);
    }

    Array.from(pattern).forEach((digit, index) => {
      const width = Number(digit) * 2;

      if (index % 2 === 0) {
        bars.push({ x: cursor, width });
      }

      cursor += width;
    });
  }

  return bars;
}

const RECEIPT_BARS = createReceiptBarcode();

function renderEmphasis(text?: string): React.ReactNode {
  return (text ?? '').split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={index} className="font-semibold text-[var(--ink)]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    ),
  );
}

function ReceiptRegister() {
  return (
    <svg
      viewBox="0 0 952 440"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className="block h-auto w-full"
    >
      <g
        fill="none"
        stroke="var(--border)"
        strokeWidth="1"
        strokeLinejoin="miter"
      >
        {/* 01–03: upper shell, lower shell, paper slot. */}
        <path
          d="M24 328 L70 284 H882 L928 328 V356 H24 Z"
          fill="var(--surface)"
        />
        <path d="M24 356 H928 V412 H24 Z" fill="var(--surface)" />
        <rect x="46" y="310" width="860" height="18" />

        {/* 04–08: feed rollers, axle, bearing rings. */}
        <rect x="108" y="369" width="318" height="28" rx="2" />
        <rect x="526" y="369" width="318" height="28" rx="2" />
        <path d="M74 383 H878" />
        <circle cx="94" cy="383" r="14" />
        <circle cx="858" cy="383" r="14" />

        {/* 09: receipt perimeter; its upper edge is serrated below. */}
        <path
          d="M52 26 V310 H900 V26"
          fill="var(--surface)"
        />

        {/* 10–17: eight individual serrated teeth. */}
        {Array.from({ length: 8 }, (_, index) => {
          const x = 52 + index * 106;

          return (
            <path
              key={index}
              d={`M${x} 26 L${x + 53} 14 L${x + 106} 26`}
            />
          );
        })}

        {/* 18–19: mounting screws. */}
        <g>
          <circle cx="48" cy="383" r="8" />
          <path d="M44 387 L52 379" />
        </g>
        <g>
          <circle cx="904" cy="383" r="8" />
          <path d="M900 387 L908 379" />
        </g>

        {/* 20–22: dimension endpoints and connecting rule. */}
        <path d="M24 422 V438" />
        <path d="M928 422 V438" />
        <path d="M24 430 H928" />

        {/* 23–24: calculation alignment marks. */}
        <path
          d="M72 52 H88 M80 44 V60"
          stroke="var(--accent)"
        />
        <path
          d="M572 282 H588 M580 274 V290"
          stroke="var(--accent)"
        />

        {/* 25: receipt return fold at the paper slot. */}
        <path d="M52 310 L64 322 H888 L900 310" />
      </g>

      {/* Genuine barcode: 112 encoded modules plus two 10-module quiet zones. */}
      <g transform="translate(616 166)">
        <rect width="264" height="92" fill="#FFFFFF" />
        <g fill="#000000" shapeRendering="crispEdges">
          {RECEIPT_BARS.map(bar => (
            <rect
              key={bar.x}
              x={bar.x}
              y="12"
              width={bar.width}
              height="68"
            />
          ))}
        </g>
      </g>

      <text
        x="748"
        y="287"
        textAnchor="middle"
        fill="var(--ink)"
        className="font-[var(--font-mono)] text-[22px] tracking-[0.12em]"
      >
        TFP2025
      </text>
    </svg>
  );
}

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  // SlideFrame owns publication branding and pagination.
  void brand;
  void totalSlides;

  const evidence = slide as SlideComponentProps['slide'] & EvidenceFields;
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const hero = evidence.metric ?? {
    badge: '$222.4',
    label: 'million · Fiscal 2025 breakage revenue',
  };

  const { qualifier, value: metric, unit } = parseMetricBadge(hero.badge);
  const asOf = evidence.asOf ?? 'Year ended September 28, 2025';

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between">
      <header className="shrink-0">
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
      </header>

      <div className="my-6 flex min-h-0 flex-1 flex-col justify-between gap-7">
        <div className="flex min-h-0 flex-1 flex-col justify-between rounded-none border border-[var(--border)] bg-[var(--surface)] p-9">
          <div className="shrink-0">
            <div
              aria-label={hero.badge}
              className="flex items-baseline gap-0 font-[var(--font-mono)] text-[110px] font-bold leading-none tracking-[-0.055em] text-[var(--accent)] tabular-nums"
            >
              {qualifier && (
                <span
                  className={
                    /^[\$£€¥]$/.test(qualifier)
                      ? 'text-[110px]'
                      : 'mr-3 font-[var(--font-body)] text-[22px] tracking-normal'
                  }
                >
                  {qualifier}
                </span>
              )}
              <span>{metric}</span>
              {unit && (
                <span className="ml-3 font-[var(--font-body)] text-[22px] font-normal tracking-normal">
                  {unit}
                </span>
              )}
            </div>

            <p className="mt-3 font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.07em]">
              {hero.label}
            </p>
          </div>

          <div className="relative mt-5 shrink-0">
            <ReceiptRegister />

            <div className="absolute left-[10%] top-[10%] flex w-[49%] flex-col">
              <div className="pb-5">
                <h2 className="font-[var(--font-mono)] text-[20px] font-semibold leading-snug tracking-[0.09em]">
                  {item0?.title}
                </h2>
                <p className="mt-2 font-[var(--font-body)] text-[26px] leading-snug">
                  {renderEmphasis(item0?.body)}
                </p>
              </div>

              <div className="relative border-t border-[var(--border)] pt-5">
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-4 font-[var(--font-mono)] text-[28px] leading-none text-[var(--accent)]"
                >
                  +
                </span>
                <h2 className="font-[var(--font-mono)] text-[20px] font-semibold leading-snug tracking-[0.09em]">
                  {item1?.title}
                </h2>
                <p className="mt-2 font-[var(--font-body)] text-[26px] leading-snug">
                  {renderEmphasis(item1?.body)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="shrink-0 rounded-none border border-[var(--border)] bg-[var(--surface)] p-7">
          <p className="font-[var(--font-body)] text-[28px] leading-snug">
            {slide.subheadline}
          </p>
          <p className="mt-3 font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.03em]">
            {asOf}
          </p>
        </aside>
      </div>
    </section>
  );
}