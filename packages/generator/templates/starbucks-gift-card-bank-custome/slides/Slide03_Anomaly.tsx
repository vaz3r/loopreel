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

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const rows = [items[0], items[1], items[2]];
  const patternId = `loyalty-stars-${React.useId().replace(/:/g, '')}`;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase leading-7 tracking-[0.14em] text-[var(--accent)]">
          <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 font-[var(--font-headline)] text-[60px] font-bold leading-[1.06] tracking-[-0.045em]">
          {slide.headline}
        </h1>

        <p className="mt-3 max-w-[920px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <figure className="my-5 h-[180px] w-full shrink-0">
        <svg
          viewBox="0 0 952 180"
          className="block h-full w-full"
          role="img"
          aria-label="Separate card, loyalty and Nestlé contract folios. A bracket joins only cards and loyalty. An annual-flow arrow sits outside that closing-balance bracket. Folio sizes do not represent amounts."
        >
          <defs>
            <pattern
              id={patternId}
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M18 8 L20.7 14.5 L28 15 L22.5 19.6 L24.2 27 L18 23 L11.8 27 L13.5 19.6 L8 15 L15.3 14.5 Z"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
          </defs>

          {/* Annual movement remains outside the stock bracket. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M42 150 V29 H83" />
            <path d="M73 21 L83 29 L73 37" />
            <path d="M33 150 H51" />
          </g>

          {/* Card obligations: transparent, exploded folio. */}
          <g fill="none" strokeWidth="1.5">
            <path
              d="M116 32 V17 H306 V108 H291"
              stroke="var(--border)"
            />
            <rect
              x="101"
              y="32"
              width="190"
              height="91"
              stroke="var(--ink)"
            />
            <circle
              cx="145"
              cy="77"
              r="26"
              stroke="var(--accent)"
            />
            <path
              d="M191 62 H265 M191 77 H251 M191 92 H260"
              stroke="var(--border)"
            />
          </g>
          <text
            x="145"
            y="87"
            textAnchor="middle"
            fill="var(--accent)"
            fontFamily="var(--font-mono)"
            fontSize="30"
          >
            $
          </text>

          {/* Loyalty obligations: a separate star-hatched folio. */}
          <g strokeWidth="1.5">
            <path
              d="M378 47 V32 H568 V123 H553"
              fill="none"
              stroke="var(--border)"
            />
            <rect
              x="363"
              y="47"
              width="190"
              height="91"
              fill={`url(#${patternId})`}
              stroke="var(--ink)"
            />
          </g>

          {/* Closing-stock bracket: cards[0] + loyalty only. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="1.5"
          >
            <path d="M101 145 V158 H553 V145" />
            <path d="M327 158 V172" />
          </g>
          <rect
            x="323"
            y="168"
            width="8"
            height="8"
            fill="var(--accent)"
          />

          {/* Royalty contract remains outside the combined bracket. */}
          <path
            d="M628 17 V163"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 7"
          />
          <g fill="none" strokeWidth="1.5">
            <path
              d="M707 32 V17 H897 V108 H882"
              stroke="var(--border)"
            />
            <path
              d="M692 32 H854 L882 60 V123 H692 Z"
              stroke="var(--ink)"
            />
            <path
              d="M854 32 V60 H882"
              stroke="var(--ink)"
            />
            <path
              d="M713 86 H858 M713 98 H801"
              stroke="var(--border)"
            />
            <path
              d="M814 109 L824 99 L829 109 L842 101 L852 105"
              stroke="var(--accent)"
            />
          </g>
          <text
            x="713"
            y="66"
            fill="var(--ink)"
            fontFamily="var(--font-body)"
            fontSize="24"
          >
            Nestlé
          </text>
        </svg>
      </figure>

      <div className="flex min-h-0 flex-1 flex-col divide-y divide-[var(--border)] rounded-none border border-[var(--border)] bg-[var(--surface)]">
        {rows.map((item, index) => {
          const { qualifier, value: metric, unit } = parseMetricBadge(
            item?.metric?.badge ?? '',
          );

          return (
            <article
              key={`${slide.id}-${index}`}
              className="flex flex-1 items-center gap-6 px-7 py-6"
            >
              <span className="w-[46px] shrink-0 self-start pt-3 font-[var(--font-mono)] text-[20px] font-bold leading-7 text-[var(--accent)]">
                [{String(index + 1).padStart(2, '0')}]
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-5">
                  <h2 className="min-w-0 font-[var(--font-headline)] text-[28px] font-semibold leading-tight tracking-[-0.025em]">
                    {item?.title || item?.label}
                  </h2>

                  <div className="flex shrink-0 items-baseline gap-2 rounded-none border border-[var(--border)] px-3.5 py-1.5 text-[var(--accent)]">
                    {qualifier && (
                      <span className="font-[var(--font-body)] text-[22px] leading-none">
                        {qualifier}
                      </span>
                    )}
                    <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none tracking-[-0.04em] tabular-nums">
                      {metric}
                    </span>
                    {unit && (
                      <span className="font-[var(--font-body)] text-[22px] leading-none">
                        {unit}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-2 font-[var(--font-body)] text-[24px] leading-snug">
                  <EmphasizedCopy text={item?.body ?? ''} />
                </p>

                <p className="mt-2 font-[var(--font-mono)] text-[20px] leading-[1.35] opacity-75">
                  {item?.metric?.label}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}