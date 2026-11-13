import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

type ReceiptSlideData = SlideComponentProps['slide'] & {
  footer?: string;
};

function EmphasizedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split('**').map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold">
            {part}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

// Valid Code 128-B geometry for FY2025; decorative, not a source identifier.
const barcodePatterns = [
  '211214',
  '132311',
  '312113',
  '223211',
  '123122',
  '223211',
  '213212',
  '241211',
  '2331112',
];

const barcodeBars: Array<{ x: number; width: number }> = [];
let barcodeCursor = 0;

barcodePatterns.forEach((pattern) => {
  [...pattern].forEach((digit, index) => {
    const width = Number(digit) * 1.45;
    if (index % 2 === 0) {
      barcodeBars.push({ x: barcodeCursor, width });
    }
    barcodeCursor += width;
  });
});

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  const receiptSlide = slide as ReceiptSlideData;
  const artworkTitleId = React.useId();
  const artworkDescriptionId = React.useId();

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between py-[24px] font-[var(--font-body)] text-[var(--ink)]">
      <header className="h-[220px] shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 text-[26px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 pt-4">
        <figure className="m-0 flex h-[420px] shrink-0 items-center justify-center">
          <svg
            viewBox="0 0 952 420"
            role="img"
            aria-labelledby={`${artworkTitleId} ${artworkDescriptionId}`}
            className="block max-h-[380px] min-h-0 w-full text-[var(--ink)]"
            fill="none"
          >
            <title id={artworkTitleId}>
              {`${telemetry?.[1]?.badge ?? ''} ${telemetry?.[0]?.label ?? ''}`}
            </title>
            <desc id={artworkDescriptionId}>
              Calculated revenue arithmetic, not an actual Starbucks receipt
              or a separately reported profit measure. Barcode is decorative.
            </desc>

            {/* Attached source-entry tabs align with the HTML captions. */}
            <g
              fill="var(--surface)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1"
            >
              <path d="M146 366H322V414H146Z" />
              <path d="M630 366H806V414H630Z" />
            </g>

            {/* Thermal-paper perimeter, curled shoulders, serrated cut. */}
            <path
              d="M94 24H858
                 Q882 24 882 48
                 V384
                 L868 396 854 384 840 396 826 384
                 812 396 798 384 784 396 770 384
                 756 396 742 384 728 396 714 384
                 700 396 686 384 672 396 658 384
                 644 396 630 384 616 396 602 384
                 588 396 574 384 560 396 546 384
                 532 396 518 384 504 396 490 384
                 476 396 462 384 448 396 434 384
                 420 396 406 384 392 396 378 384
                 364 396 350 384 336 396 322 384
                 308 396 294 384 280 396 266 384
                 252 396 238 384 224 396 210 384
                 196 396 182 384 168 396 154 384
                 140 396 126 384 112 396 98 384
                 84 396 70 384V48Q70 24 94 24Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1"
            />

            <g
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1"
            >
              <path d="M94 24Q110 38 94 56H70" />
              <path d="M858 24Q842 38 858 56H882" />

              {/* Subtotal rule and measurement bracket. */}
              <path d="M118 148H834M118 141V155M834 141V155" />
              <path d="M302 184H286V286H302" />
              <path d="M650 184H666V286H650" />

              {/* Registration marks, not placeholder text. */}
              <path d="M40 24H56M48 16V32M896 24H912M904 16V32" />
              <path d="M40 396H56M48 388V404M896 396H912M904 388V404" />
              <path d="M476 16V32M468 24H484" />
            </g>

            <g
              fill="currentColor"
              className="font-[var(--font-mono)] text-[48px] tabular-nums"
            >
              <text x="150" y="112">
                $200.4
              </text>
              <text x="407" y="112" fill="var(--accent)">
                +
              </text>
              <text x="498" y="112">
                $22.0
              </text>
            </g>

            <text
              x="686"
              y="112"
              fill="currentColor"
              className="font-[var(--font-body)] text-[26px]"
            >
              million
            </text>

            <text
              x="476"
              y="258"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-mono)] text-[106px] font-bold tracking-[-0.05em] tabular-nums"
            >
              {t0 ? (
                <>
                  {t0.qualifier && <tspan>{t0.qualifier}</tspan>}
                  <tspan>{t0.value}</tspan>
                  {t0.unit && <tspan> {t0.unit}</tspan>}
                </>
              ) : null}
            </text>

            <path
              d="M310 274H642"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            <text
              x="476"
              y="309"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-body)] text-[26px]"
            >
              million
            </text>

            <g aria-hidden="true" fill="currentColor" fillOpacity="0.65">
              {barcodeBars.map((bar, index) => (
                <rect
                  key={index}
                  x={118 + bar.x}
                  y="340"
                  width={bar.width}
                  height="28"
                />
              ))}
            </g>

            <rect
              x="700"
              y="334"
              width="134"
              height="38"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <text
              x="767"
              y="361"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-mono)] text-[24px]"
            >
              FY2025
            </text>

            <path
              d="M660 350L668 358L684 340"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </figure>

        <div className="flex min-h-[248px] flex-1 flex-col justify-between">
          <div className="grid grid-cols-2 gap-6">
            <article className="flex min-w-0 flex-col border-t border-[var(--border)] pt-5">
              <h2 className="font-[var(--font-mono)] text-[20px] font-semibold leading-snug tracking-[0.1em]">
                {item0?.title}
              </h2>
              <p className="mt-3 max-w-[420px] text-[26px] leading-snug text-[var(--ink)]/80">
                <EmphasizedCopy text={item0?.body} />
              </p>
            </article>

            <article className="flex min-w-0 flex-col border-t border-[var(--border)] pt-5">
              <h2 className="font-[var(--font-mono)] text-[20px] font-semibold leading-snug tracking-[0.1em]">
                {item1?.title}
              </h2>
              <p className="mt-3 max-w-[420px] text-[26px] leading-snug text-[var(--ink)]/80">
                <EmphasizedCopy text={item1?.body} />
              </p>
            </article>
          </div>

          <p className="border-t border-[var(--border)] pt-4 text-[24px] leading-snug">
            Calculated breakage revenue from expected nonredemption—
            <strong className="font-semibold">
              not a separately reported profit measure.
            </strong>
          </p>
        </div>
      </div>

      <p className="flex h-[60px] shrink-0 items-end text-[24px] leading-snug text-[var(--ink)]/80">
        {receiptSlide.footer ??
          'Disclosed components added—not separately reported profit.'}
      </p>
    </section>
  );
}