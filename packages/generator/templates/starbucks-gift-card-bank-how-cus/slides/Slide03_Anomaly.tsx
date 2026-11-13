import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function LockedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split('**').map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-semibold text-[var(--ink)]">
            {part}
          </strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;
  const t1 = telemetry ? parseMetricBadge(telemetry?.[1]?.badge) : null;

  const total0 = t0
    ? [t0.qualifier, t0.value, t0.unit].filter(Boolean).join(' ')
    : '';
  const total1 = t1
    ? [t1.qualifier, t1.value, t1.unit].filter(Boolean).join(' ')
    : '';

  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-[24px] font-[var(--font-body)] text-[var(--ink)]">
      <header className="flex h-[220px] shrink-0 flex-col justify-between border-b border-[var(--border)] pb-7">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-[var(--accent)]" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="max-w-[800px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>
      </header>

      <div className="relative mt-4 grid min-h-0 flex-1 grid-cols-2 gap-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--border)]"
        />

        <article className="grid min-h-0 min-w-0 grid-rows-[431.25px_minmax(0,1fr)] gap-4">
          <svg
            viewBox="0 0 448 420"
            role="img"
            aria-label="Cards and loyalty rewards converge into one combined liability ledger."
            className="block h-[431.25px] w-full text-[var(--ink)]"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.25"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M20 36H30M38 18V28M418 36H428M410 18V28" />
              <path d="M20 330H30M38 338V348M418 330H428M410 338V348" />
              <path d="M38 54V330H410V54" />
              <path d="M38 36H190L224 54L258 36H410V312H258L224 330L190 312H38Z" />
              <path d="M224 54V330M214 59V316M234 59V316" />
              <path d="M50 46V302H187L205 311M398 46V302H261L243 311" />
              <path d="M224 330V340" />
              <path d="M38 406H410M38 401V411M410 401V411" />
            </g>

            <path
              d="M38 36H190L214 49V303L190 292H38Z"
              fill="var(--surface)"
            />
            <path
              d="M234 49L258 36H410V292H258L234 303Z"
              fill="var(--surface)"
            />

            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.25"
            >
              <rect x="58" y="106" width="120" height="80" rx="2" />
              <path d="M58 127H178" />
              <rect x="73" y="143" width="22" height="24" rx="2" />
              <path d="M84 143V167M73 155H95" />
              <circle cx="334" cy="147" r="48" />
              <path d="M326 92H342M326 202H342M279 139V155M389 139V155" />
            </g>

            <path
              d="M334 113L343 134L366 137L349 153L353 177L334 165L314 177L318 153L301 137L325 134Z"
              fill="var(--accent)"
              fillOpacity="0.12"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            <g
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="miter"
            >
              <path d="M118 186V237H224V270" />
              <path d="M334 195V237H224" />
              <path d="M216 260L224 270L232 260" />
            </g>

            <rect
              x="218"
              y="272"
              width="12"
              height="12"
              fill="var(--accent)"
            />

            <g
              fill="currentColor"
              textAnchor="middle"
              className="font-[var(--font-mono)] text-[20px] tracking-[0.08em]"
            >
              <text x="118" y="82">CARDS</text>
              <text x="334" y="82">REWARDS</text>
            </g>

            <rect
              x="55"
              y="340"
              width="338"
              height="58"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M55 340H91M357 398H393"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <text
              x="224"
              y="370"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[46px] font-bold tracking-[-0.045em] tabular-nums"
            >
              {total0}
            </text>
          </svg>

          <div className="flex min-h-0 flex-col justify-between border-t border-[var(--border)] pb-5 pt-5">
            <div>
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
                {item0?.title}
              </h2>
              <p className="mt-3 text-[26px] leading-snug text-[var(--ink)]/80">
                <LockedCopy text={item0?.body} />
              </p>
            </div>

            <p className="max-w-[430px] font-[var(--font-mono)] text-[20px] leading-[1.45] text-[var(--ink)]/70">
              {telemetry?.[0]?.label}
            </p>
          </div>
        </article>

        <article className="grid min-h-0 min-w-0 grid-rows-[431.25px_minmax(0,1fr)] gap-4">
          <svg
            viewBox="0 0 448 420"
            role="img"
            aria-label="Card loads and Stars earned enter the same deferral register, not a cash reservoir."
            className="block h-[431.25px] w-full text-[var(--ink)]"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.25"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M17 46H27M35 28V38M421 46H431M413 28V38" />
              <path d="M17 328H27M35 336V346M421 328H431M413 336V346" />
              <rect x="35" y="46" width="378" height="282" rx="2" />
              <path d="M49 60H399V314H49Z" />
              <path d="M35 218H413" />
              <circle cx="49" cy="60" r="3" />
              <circle cx="399" cy="60" r="3" />
              <circle cx="49" cy="314" r="3" />
              <circle cx="399" cy="314" r="3" />
              <path d="M224 328V340" />
              <path d="M38 406H410M38 401V411M410 401V411" />
            </g>

            <rect
              x="62"
              y="108"
              width="122"
              height="90"
              fill="var(--surface)"
            />
            <rect
              x="264"
              y="108"
              width="122"
              height="90"
              fill="var(--surface)"
            />

            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.25"
            >
              <path d="M72 180H174M274 180H376" />
              <rect x="87" y="112" width="72" height="52" rx="2" />
              <path d="M87 126H159" />
              <circle cx="325" cy="140" r="31" />
              <path d="M294 180V191H356V180" />
              <rect x="114" y="252" width="220" height="58" rx="2" />
              <circle cx="137" cy="281" r="8" />
              <circle cx="311" cy="281" r="8" />
              <path d="M160 264V298M288 264V298" />
            </g>

            <path
              d="M325 119L331 132L346 134L335 145L338 160L325 153L312 160L315 145L304 134L319 132Z"
              fill="var(--accent)"
              fillOpacity="0.12"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            <g
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="miter"
            >
              <path d="M123 180V232H224V271" />
              <path d="M325 180V232H224" />
              <path d="M216 261L224 271L232 261" />
            </g>

            <rect
              x="218"
              y="275"
              width="12"
              height="12"
              fill="var(--accent)"
            />

            <g
              fill="currentColor"
              textAnchor="middle"
              className="font-[var(--font-mono)] text-[20px] tracking-[0.08em]"
            >
              <text x="123" y="92">LOADS</text>
              <text x="325" y="92">STARS</text>
            </g>

            <rect
              x="55"
              y="340"
              width="338"
              height="58"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M55 340H91M357 398H393"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <text
              x="224"
              y="370"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[46px] font-bold tracking-[-0.045em] tabular-nums"
            >
              {total1}
            </text>
          </svg>

          <div className="flex min-h-0 flex-col justify-between border-t border-[var(--border)] pb-5 pt-5">
            <div>
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
                {item1?.title}
              </h2>
              <p className="mt-3 text-[26px] leading-snug text-[var(--ink)]/80">
                <LockedCopy text={item1?.body} />
              </p>
            </div>

            <p className="max-w-[430px] font-[var(--font-mono)] text-[20px] leading-[1.45] text-[var(--ink)]/70">
              {telemetry?.[1]?.label}
            </p>
          </div>
        </article>
      </div>

      <div className="flex h-[60px] shrink-0 items-center gap-4 border-t border-[var(--border)]">
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
        />
        <p className="text-[24px] leading-snug">
          Neither figure is a standalone measure of{' '}
          <strong className="font-semibold">prepaid cash.</strong>
        </p>
      </div>
    </section>
  );
}