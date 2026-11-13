import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

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

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const telemetry = Array.isArray(slide.telemetry) ? slide.telemetry : [];
  const t0 = telemetry ? parseMetricBadge(telemetry?.[0]?.badge) : null;

  void brand;
  void totalSlides;

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

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-6 flex min-h-0 flex-1 flex-col justify-between gap-6">
        <figure className="relative m-0 h-[420px] w-full shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 952 420"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Prepayment reaches the receipt endpoint before fulfillment. A separate cash-refund track passes through an open conditional gate."
            className="block h-full w-full text-[var(--ink)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            {/* 01–02: timing rails; the refund rail breaks at its gate. */}
            <path
              d="M246 112H682 M666 104L682 112L666 120"
              stroke="var(--accent)"
            />
            

            {/* 03–04: solid source/receipt endpoints. */}
            <rect
              x={682}
              y={103}
              width={18}
              height={18}
              fill="var(--accent)"
              stroke="var(--accent)"
            />
            <rect
              x={702}
              y={298}
              width={16}
              height={16}
              fill="currentColor"
              stroke="none"
            />

            {/* 05–08: four dashed, deliberately open gate segments. */}
            <path
              d="M466 290V250H488"
              strokeDasharray="6 6"
              opacity={0.8}
            />
            <path
              d="M508 250H530V290"
              strokeDasharray="6 6"
              opacity={0.8}
            />
            <path
              d="M466 322V362H488"
              strokeDasharray="6 6"
              opacity={0.8}
            />
            <path
              d="M508 362H530V322"
              strokeDasharray="6 6"
              opacity={0.8}
            />

            {/* 09–11: stored-value card and its physical stripe. */}
            <rect
              x={48}
              y={56}
              width={198}
              height={124}
              rx={2}
              fill="var(--surface)"
            />
            <rect
              x={59}
              y={67}
              width={176}
              height={102}
              rx={1}
              stroke="var(--border)"
            />
            <rect
              x={59}
              y={87}
              width={176}
              height={23}
              fill="currentColor"
              stroke="none"
              opacity={0.75}
            />

            {/* 12–15: unfilled receipt vessel; no reserve-level claim. */}
            <path
              d="M718 66V185C718 198 746 208 780 208C814 208 842 198 842 185V66"
              fill="var(--surface)"
            />
            <ellipse
              cx={780}
              cy={66}
              rx={62}
              ry={22}
              fill="var(--surface)"
            />
            <ellipse
              cx={780}
              cy={185}
              rx={62}
              ry={22}
              stroke="var(--border)"
            />
            <rect
              x={769}
              y={105}
              width={15}
              height={57}
              stroke="var(--border)"
            />

            {/* 16–19: instrument graduation ticks, not text substitutes. */}
            <path d="M789 110H799" opacity={0.5} />
            <path d="M789 125H795" opacity={0.5} />
            <path d="M789 140H799" opacity={0.5} />
            <path d="M789 155H795" opacity={0.5} />

            {/* 20–21: fulfillment valve, with no elapsed-time claim. */}
            <path d="M780 208V249 M780 228H811" opacity={0.8} />
            <path
              d="M827 228A16 16 0 1 1 795 228A16 16 0 1 1 827 228 M801 218L821 238 M801 238L821 218"
              opacity={0.8}
            />

            {/* 22–23: empty cup downstream of the receipt vessel. */}
            <ellipse cx={780} cy={276} rx={44} ry={12} />
            <path d="M736 276L749 359Q780 373 811 359L824 276" />

            {/* 24–26: cash-note contour and engraved rosettes. */}
            <path
              d="M64 262H232V350H64Z"
              fill="var(--surface)"
            />
            <path
              d="M94 283L101 290L111 291L110 301L116 309L108 315L105 325L95 322L85 326L81 316L73 310L79 301L78 291L88 289Z"
              opacity={0.65}
            />
            <path
              d="M201 283L208 290L218 291L217 301L223 309L215 315L212 325L202 322L192 326L188 316L180 310L186 301L185 291L195 289Z"
              opacity={0.65}
            />

            {/* 27–28: registration/dimension endpoints. */}
            <path
              d="M16 112H36 M26 102V122"
              stroke="var(--border)"
            />
            <path
              d="M916 306H936 M926 296V316"
              stroke="var(--border)"
            />
          </svg>

          <figcaption className="absolute bottom-0 right-0 border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-[var(--font-mono)] text-[20px] leading-none">
            Terms effective July 24, 2023.
          </figcaption>
        </figure>

        <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-6">
          <article className="flex min-h-0 flex-col justify-between gap-3 rounded-none border border-[var(--border)] bg-[var(--surface)] px-7 py-5">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
              {item0?.title}
            </h2>

            <p className="font-[var(--font-body)] text-[26px] leading-snug">
              <EmphasizedCopy text={item0?.body} />
            </p>

            {t0 && (
              <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-3">
                <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
                  {t0.qualifier && (
                    <span className="font-[var(--font-body)] text-[22px]">
                      {t0.qualifier}
                    </span>
                  )}
                  <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none tabular-nums">
                    {t0.value}
                  </span>
                  {t0.unit && (
                    <span className="font-[var(--font-body)] text-[22px]">
                      {t0.unit}
                    </span>
                  )}
                </div>

                <p className="font-[var(--font-mono)] text-[20px] leading-snug text-[var(--ink)]/80">
                  {telemetry?.[0]?.label}
                </p>
              </div>
            )}
          </article>

          <article className="flex min-h-0 flex-col justify-between gap-6 rounded-none border border-[var(--border)] px-7 py-5">
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.025em]">
              {item1?.title}
            </h2>

            <p className="border-t border-dashed border-[var(--border)] pt-5 font-[var(--font-body)] text-[26px] leading-snug">
              <EmphasizedCopy text={item1?.body} />
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}