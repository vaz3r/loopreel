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

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = (slide.items ?? []).slice(0, 3);
  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-6">
        <header className="shrink-0">
          <div className="flex items-center gap-3 font-[var(--font-mono)] text-[20px] uppercase leading-[26px] tracking-[0.12em] text-[var(--accent)]">
            <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
            <span>{slide.kicker}</span>
          </div>

          <h1 className="mt-3 max-w-[850px] font-[var(--font-headline)] text-[28px] font-bold leading-[1.04] tracking-[-0.045em]">
            {slide.headline}
          </h1>

          <p className="mt-3 font-[var(--font-body)] text-[26px] leading-[32px]">
            {slide.subheadline}
          </p>
        </header>

        <figure className="m-0 h-[216px] w-full shrink-0">
          <svg
            viewBox="0 0 952 216"
            className="block h-full w-full"
            role="img"
            aria-label="Retail prepayments chamber with a coffee outlet, a dashed breakage-recognition valve, a separate lawful cash-redemption exit marked by jurisdiction, and an external Stars compartment."
          >
            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            >
              <path d="M204 8H576M204 172H576" />
              <path d="M210 2V178M570 2V178" />
              <path d="M204 20H216M204 160H216M564 20H576M564 160H576" />
              <path d="M232 164l-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8m24-8-8 8" />
            </g>

            <rect
              x="220"
              y="20"
              width="340"
              height="140"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />

            <g fill="none" stroke="var(--border)" strokeWidth="1.5">
              <path d="M236 88H544M236 112H544M236 136H544" />
              <path d="M268 88V160M332 88V160M396 88V160M460 88V160M524 88V160" />
            </g>

            <path
              d="M236 77H544"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            <g className="font-[var(--font-mono)] text-[20px]" fill="var(--ink)">
              <text x="242" y="53">retail prepayments</text>
              <text x="20" y="91">coffee outlet</text>
              <text x="679" y="136">breakage-recognition</text>
              <text x="512" y="209">lawful cash-redemption</text>
            </g>

            <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
              <path d="M220 112H98V136" />
              <path d="M64 136H132V159L124 174H72L64 159Z" />
              <path d="M132 142H144V158H132" />
              <path d="M58 181H138" />
              <path d="M91 121L98 128L105 121" />
            </g>

            <g
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            >
              <path d="M560 72H650V104H930" />
            </g>

            <g fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5">
              <path d="M641 104L650 95L659 104L650 113Z" />
              <path d="M650 95V84M643 84H657" fill="none" />
            </g>

            <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
              <path d="M480 160V182H866" />
              <path d="M827 176L833 182L827 188" />
            </g>

            <rect
              x="866"
              y="172"
              width="20"
              height="20"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M872 182H880M876 178V186"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x="916"
              y="163"
              textAnchor="end"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[20px]"
            >
              jurisdiction
            </text>

            <rect
              x="746"
              y="10"
              width="184"
              height="52"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M771 23L775 32L785 33L777 40L779 50L771 45L762 50L764 40L757 33L767 32Z"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <text
              x="806"
              y="43"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[20px]"
            >
              Stars
            </text>
          </svg>
        </figure>

        <div className="grid min-h-0 flex-1 grid-rows-3 divide-y divide-[var(--border)] rounded-none border border-[var(--border)] bg-[var(--surface)]">
          {items.map((item, index) => {
            const { qualifier, value: metric, unit } = parseMetricBadge(
              item.metric?.badge ?? '',
            );

            return (
              <article
                key={`${slide.id}-${index}`}
                className="grid min-h-0 grid-cols-[32px_minmax(0,1fr)_300px] items-center gap-5 px-6 py-5"
              >
                <svg
                  viewBox="0 0 32 32"
                  className="h-8 w-8 self-start text-[var(--accent)]"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="1"
                    width="30"
                    height="30"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 16L14 22L24 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>

                <div className="min-w-0">
                  <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-[30px] tracking-[-0.025em]">
                    {item.title || item.label}
                  </h2>
                  <p className="mt-3 font-[var(--font-body)] text-[25px] leading-[32px]">
                    <EmphasizedCopy text={item.body ?? ''} />
                  </p>
                </div>

                <div className="flex min-w-0 flex-col items-start gap-2 border-l border-[var(--border)] pl-5">
                  <div className="inline-flex shrink-0 items-baseline gap-2 rounded-none border border-[var(--accent)] px-3 py-1 text-[var(--accent)]">
                    {qualifier && (
                      <span className="font-[var(--font-body)] text-[22px] leading-none">
                        {qualifier}
                      </span>
                    )}
                    <span className="font-[var(--font-mono)] text-[28px] font-bold leading-none tabular-nums tracking-[-0.04em]">
                      {metric}
                    </span>
                    {unit && (
                      <span className="font-[var(--font-body)] text-[22px] leading-none">
                        {unit}
                      </span>
                    )}
                  </div>

                  <p className="font-[var(--font-body)] text-[24px] leading-[28px]">
                    {item.metric?.label}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}