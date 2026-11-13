import React from 'react';
import { parseMetricBadge, type SlideComponentProps } from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const headline = slide.headline ?? '';
  const headlineBreak = headline.indexOf('. ');
  const headlineFirst =
    headlineBreak >= 0 ? headline.substring(0, headlineBreak + 1) : headline;
  const headlineSecond =
    headlineBreak >= 0 ? headline.substring(headlineBreak + 2) : '';

  const page = parseMetricBadge(
    String(slide.index + 1).padStart(2, '0'),
  );
  const pageTotal = String(totalSlides).padStart(2, '0');

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between py-[24px] font-[var(--font-body)] text-[var(--ink)]">
      <header className="flex h-[220px] shrink-0 flex-col justify-between">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase leading-6 tracking-[0.2em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="font-[var(--font-headline)] text-[58px] font-bold leading-[1.02] tracking-[-0.04em]">
          <span className="block">{headlineFirst}</span>
          {headlineSecond && (
            <span className="block">{headlineSecond}</span>
          )}
        </h1>

        <p className="max-w-[920px] text-[26px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-x-8">
        <article className="flex min-h-0 flex-col">
          <svg
            viewBox="0 0 448 420"
            role="img"
            aria-label="A gift-card account provides corporate financing for future purchases, without interest or FDIC insurance on the account."
            className="block h-[431.25px] w-full shrink-0 text-[var(--ink)]"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeOpacity="0.25"
              strokeLinejoin="miter"
            >
              {/* Open corporate operating reservoir, not a secured vault. */}
              <path d="M157 105 190 82H384V317L351 340H157Z" />
              <path d="M157 105H351V340M351 105 384 82" />
              <path d="M351 340 384 317M157 105V340" />
              <path d="M157 238H351L384 215" />

              {/* Financing-time dial. */}
              <circle cx="341" cy="43" r="25" />
              <path d="M341 18V24M366 43H360M341 68V62M316 43H322" />
              <path d="M341 43V29M341 43 352 49" />

              {/* Purchase outlet and retained-use dimension bracket. */}
              <path d="M384 278H414V321" />
              <path d="m406 313 8 8 8-8" />
              <path d="M165 350V359H343V350" />
              <path d="M254 359V371" />

              {/* Registration marks. */}
              <path d="M18 24H34M26 16V32M404 112H420M412 104V120" />
            </g>

            <path
              d="M159 239H351L382 217V316L350 338H159Z"
              fill="var(--accent)"
              fillOpacity="0.1"
            />
            <path
              d="M159 238H351L383 215"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeOpacity="0.65"
            />

            {/* Account card. */}
            <rect
              x="28"
              y="40"
              width="162"
              height="100"
              rx="2"
              fill="var(--surface)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.75"
            />
            <rect
              x="47"
              y="60"
              width="31"
              height="25"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.75"
            />
            <path
              d="M57 60V85M68 60V85M47 72H78"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <circle
              cx="165"
              cy="115"
              r="8"
              fill="var(--accent)"
              fillOpacity="0.85"
            />

            {/* Financing inlet. */}
            <path
              d="M190 91C228 91 242 117 242 168"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="m234 158 8 10 8-10"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            {/* Both account qualifications connect directly to the card. */}
            <g
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            >
              <path d="M39 140V359H56" />
              <path d="M39 359V393H56" />
              <circle cx="39" cy="140" r="3" fill="var(--paper)" />
            </g>
            <g
              fill="currentColor"
              className="font-[var(--font-mono)] text-[20px]"
            >
              <text x="68" y="366">NO INTEREST</text>
              <text x="68" y="400">NO FDIC INSURANCE</text>
            </g>
          </svg>

          <div className="mt-4 flex min-h-0 flex-1 flex-col justify-between border-t border-[var(--border)] py-6 pr-5">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {item0?.title}
            </h2>
            <p className="max-w-[420px] text-[26px] leading-snug text-[var(--ink)]/80">
              <EmphasizedCopy text={item0?.body} />
            </p>
            <div
              aria-hidden="true"
              className="h-2 w-2 bg-[var(--accent)]"
            />
          </div>
        </article>

        <article className="flex min-h-0 flex-col">
          <svg
            viewBox="0 0 448 420"
            role="img"
            aria-label="A consumer-rights docket brings an unused eGift and original receipt to an open review gate. A return path indicates possible exceptions, not automatic approval."
            className="block h-[431.25px] w-full shrink-0 text-[var(--ink)]"
          >
            {/* Layered consumer-rights docket. */}
            <g
              fill="var(--paper)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.75"
              strokeLinejoin="miter"
            >
              <path d="M60 54H300V350H60Z" />
              <path d="M51 45H291V341H51Z" />
              <path d="M42 36H260L282 58V332H42Z" />
              <path d="M260 36V58H282" fill="none" />
            </g>

            {/* Unused eGift specimen. */}
            <rect
              x="65"
              y="90"
              width="150"
              height="91"
              rx="2"
              fill="var(--surface)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.75"
            />
            <rect
              x="80"
              y="104"
              width="108"
              height="31"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <text
              x="134"
              y="126"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-mono)] text-[20px]"
            >
              UNUSED
            </text>
            <g
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            >
              <rect x="81" y="147" width="25" height="19" rx="2" />
              <path d="M89 147V166M98 147V166M81 156H106" />
            </g>

            {/* Original-receipt specimen with a true serrated edge. */}
            <path
              d="M115 207H265V326L255 318 245 326 235 318 225 326 215 318 205 326 195 318 185 326 175 318 165 326 155 318 145 326 135 318 125 326 115 318Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.75"
            />
            <text
              x="132"
              y="239"
              fill="currentColor"
              className="font-[var(--font-mono)] text-[20px]"
            >
              RECEIPT
            </text>

            {/* Variable-width barcode: specimen geometry, not fake copy. */}
            <g fill="currentColor" fillOpacity="0.45">
              <rect x="132" y="260" width="2" height="36" />
              <rect x="138" y="260" width="5" height="36" />
              <rect x="147" y="260" width="2" height="36" />
              <rect x="153" y="260" width="3" height="36" />
              <rect x="161" y="260" width="6" height="36" />
              <rect x="172" y="260" width="2" height="36" />
              <rect x="179" y="260" width="4" height="36" />
              <rect x="187" y="260" width="2" height="36" />
              <rect x="193" y="260" width="7" height="36" />
              <rect x="205" y="260" width="3" height="36" />
              <rect x="213" y="260" width="2" height="36" />
              <rect x="219" y="260" width="5" height="36" />
              <rect x="229" y="260" width="2" height="36" />
              <rect x="236" y="260" width="6" height="36" />
            </g>

            {/* Both specimens meet at a hinged, visibly open review gate. */}
            <g
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinejoin="miter"
            >
              <path d="M215 151H242C278 151 305 187 305 235" />
              <path d="M265 282C290 282 305 262 305 235" />
              <path d="M305 235 339 201" />
              <circle
                cx="305"
                cy="235"
                r="5"
                fill="var(--paper)"
              />
              <path d="M318 235C374 215 415 245 415 290C415 328 384 350 337 350" />
              <path d="m347 342-10 8 10 8" />
            </g>

            <g
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            >
              <path d="M305 242V280" />
              <path d="M300 280H311" />
              <path d="M305 235H350" strokeDasharray="4 6" />
              <path d="M339 201A48 48 0 0 1 353 235" />
              <path d="M26 370H42M34 362V378M391 54H407M399 46V62" />
            </g>
          </svg>

          <div className="mt-4 flex min-h-0 flex-1 flex-col justify-between border-t border-[var(--border)] py-6 pr-5">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
              {item1?.title}
            </h2>
            <p className="max-w-[420px] text-[26px] leading-snug text-[var(--ink)]/80">
              <EmphasizedCopy text={item1?.body} />
            </p>
            <div
              aria-hidden="true"
              className="h-2 w-2 border border-[var(--accent)]"
            />
          </div>
        </article>
      </div>

      <footer className="flex h-[60px] shrink-0 flex-col justify-between border-t border-[var(--border)]">
        <p className="pt-1 text-[24px] leading-[1.2] tracking-[-0.015em]">
          Prepayment buys future purchases—not an interest-bearing deposit.
        </p>
        <div className="flex items-baseline justify-between gap-4 font-[var(--font-mono)] text-[20px] leading-6 text-[var(--ink)]/70">
          <span>Card terms effective July 24, 2023</span>
          <span>thefineprint.co</span>
          <span className="shrink-0 tabular-nums text-[var(--accent)]">
            {page.value} / {pageTotal}
          </span>
        </div>
      </footer>
    </section>
  );
}