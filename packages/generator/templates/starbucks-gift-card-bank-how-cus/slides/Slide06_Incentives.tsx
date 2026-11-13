import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function ContractCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-[var(--ink)]">
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
  const deadline = parseMetricBadge('24 h');
  const artworkId = React.useId();

  return (
    <section
      aria-label={slide.headline}
      className="flex h-full min-h-0 w-full flex-col justify-between py-6 font-[var(--font-body)] text-[var(--ink)]"
    >
      <header className="flex h-[220px] shrink-0 flex-col justify-between">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-[var(--accent)]" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[62px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[870px] text-[27px] leading-snug text-[var(--ink)]/80">
          {slide.subheadline}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 pt-4">
        <figure className="m-0 flex h-[420px] shrink-0 items-center justify-center">
          <svg
            viewBox="0 0 952 420"
            role="img"
            aria-labelledby={`${artworkId}-title`}
            aria-describedby={`${artworkId}-description`}
            className="block max-h-[380px] min-h-0 w-full text-[var(--ink)]"
          >
            <title id={`${artworkId}-title`}>
              Scheduled reload cancellation deadline and completed loads
            </title>
            <desc id={`${artworkId}-description`}>
              An open cancellation gate precedes the scheduled reload by
              twenty-four hours. After completion, a forward rail feeds a cash
              tank. The blocked return marks only this cancellation provision;
              legal and contractual refund exceptions remain.
            </desc>

            {/* Registration marks and instrument structure. */}
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.25"
            >
              <path d="M40 36H64M52 24V48M888 36H912M900 24V48" />
              <path d="M40 388H64M52 376V400M888 388H912M900 376V400" />
              <path d="M400 88V153M638 88V179" strokeDasharray="4 7" />
              <path d="M400 83H638M400 73V93M638 73V93" />
              <path d="M174 200V228M186 200V228" />
              <circle cx="180" cy="145" r="60" />
              <circle cx="180" cy="145" r="48" />
              <path d="M180 100V108M180 182V190M135 145H143M217 145H225" />
              <path d="M148 113L154 119M206 171L212 177M148 177L154 171M206 119L212 113" />
            </g>

            {/* Clock hand and scheduled-reload assembly. */}
            <g
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="square"
            >
              <path d="M180 115V145L204 160" />
              <circle
                cx="180"
                cy="145"
                r="4"
                fill="var(--surface)"
              />
            </g>

            {/* Anchored deadline and scheduled-time plates. */}
            <g
              fill="currentColor"
              className="font-[var(--font-mono)] text-[24px]"
            >
              <text x="400" y="57" textAnchor="middle" fill="var(--accent)">
                T − {deadline.value} {deadline.unit}
              </text>
              <text x="638" y="57" textAnchor="middle">
                T
              </text>
            </g>

            {/* Open gate: the diagonal arm leaves the rail unobstructed. */}
            <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25">
              <path d="M384 170V290H416V258" />
              <path d="M400 167V292" strokeDasharray="5 7" />
              <path d="M400 208A50 50 0 0 1 450 228" strokeDasharray="4 6" />
            </g>

            <g fill="none" stroke="var(--accent)" strokeWidth="3">
              <path d="M400 105V153" />
              <path d="M393 144L400 153L407 144" />
              <path d="M400 208L446 174" />
              <circle cx="400" cy="208" r="5" fill="var(--surface)" />

              {/* Return branch exists only before the deadline. */}
              <path d="M350 228V270Q350 308 312 308H114" />
              <path d="M126 300L114 308L126 316" />
            </g>

            {/* Schematic cash tank: no monetary scale or inferred capacity. */}
            <path
              d="M790 167C790 137 910 137 910 167V323C910 353 790 353 790 323Z"
              fill="var(--surface)"
            />
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.25"
            >
              <ellipse cx="850" cy="167" rx="60" ry="22" />
              <path d="M790 167V323C790 353 910 353 910 323V167" />
              <path d="M790 301C790 331 910 331 910 301" />
              <path d="M809 345V363M891 345V363M801 363H817M883 363H899" />
            </g>

            {/* Authorization rail and solid forward shipping endpoint. */}
            <g fill="none" stroke="var(--accent)" strokeWidth="3">
              <path d="M58 228H603M673 228H895" />
              <path d="M296 220L308 228L296 236" />
              <path d="M752 220L764 228L752 236" />
              <path d="M883 220L895 228L883 236" />
            </g>

            {/* Completed-load ratchet and pawl. */}
            <path
              d="M638 190L650 199L665 197L669 212L680 222L673 236L674 251L659 255L648 267L635 260L619 262L615 247L603 236L610 223L608 207L623 203Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
              strokeOpacity="0.25"
            />
            <circle
              cx="638"
              cy="228"
              r="21"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
            <g fill="none" stroke="var(--accent)" strokeWidth="3">
              <path d="M615 228H660M650 220L660 228L650 236" />
              <path d="M675 180L660 197L670 207" />
            </g>
            <circle cx="675" cy="180" r="4" fill="var(--accent)" />

            {/* Local blocked reverse branch—not a general refund prohibition. */}
            <g fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25">
              <path d="M766 228V279H706" />
              <path d="M716 272L706 279L716 286" />
              <path d="M703 294V320H638V343" />
            </g>
            <path
              d="M696 267V291"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <text
              x="638"
              y="376"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-mono)] text-[22px] tracking-[0.12em]"
            >
              COMPLETED
            </text>
          </svg>
        </figure>

        <div className="grid h-[248px] shrink-0 grid-cols-2 gap-6">
          <article className="relative flex min-h-0 flex-col justify-between border-t border-[var(--border)] pb-6 pt-7 pr-7">
            <span
              aria-hidden="true"
              className="absolute -top-[10px] left-0 h-[19px] w-[25px] border-x border-t border-[var(--accent)] bg-[var(--paper)]"
            />
            <h2 className="max-w-[420px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em]">
              {item0?.title}
            </h2>
            <p className="text-[26px] leading-snug text-[var(--ink)]/80">
              <ContractCopy text={item0?.body} />
            </p>
          </article>

          <article className="relative flex min-h-0 flex-col justify-between border-t border-[var(--border)] pb-6 pt-7 pr-5">
            <span
              aria-hidden="true"
              className="absolute -top-[10px] left-0 h-[19px] w-[25px] border border-[var(--accent)] bg-[var(--surface)]"
            />
            <h2 className="max-w-[420px] font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.02em]">
              {item1?.title}
            </h2>
            <p className="text-[26px] leading-snug text-[var(--ink)]/80">
              <ContractCopy text={item1?.body} />
            </p>
          </article>
        </div>
      </div>

      <aside className="flex h-[60px] shrink-0 flex-col justify-end border-t border-[var(--border)] text-[22px] leading-[28px] text-[var(--ink)]/80">
        <p>Cancellation timing is distinct from applicable refund rights.</p>
        <p>Legal and contractual refund exceptions remain.</p>
      </aside>
    </section>
  );
}