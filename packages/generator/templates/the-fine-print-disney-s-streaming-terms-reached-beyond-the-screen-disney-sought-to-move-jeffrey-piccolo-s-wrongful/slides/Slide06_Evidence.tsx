import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const titleId = React.useId();
  const diagramId = React.useId();

  void brand;

  return (
    <section
      aria-labelledby={titleId}
      data-slide="6"
      data-total-slides={totalSlides}
      className="flex h-full min-h-0 w-full flex-col justify-between gap-6 text-[var(--ink)]"
    >
      {/* Zone 1 — Editorial header */}
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.16em]">
            THE CONTRACT AUDIT
          </p>
        </div>

        <h2
          id={titleId}
          className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight"
        >
          The Consent Chain
          <br />
          Was Contested
        </h2>

        <p className="mt-5 line-clamp-2 font-[var(--font-body)] text-[26px] leading-snug">
          These were litigant arguments, not judicial findings.
        </p>
      </header>

      {/* Zone 2 — Dedicated vector canvas */}
      <div className="relative flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center">
        <svg
          viewBox="0 0 952 460"
          role="img"
          aria-labelledby={diagramId}
          className="block h-full max-h-[500px] w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={diagramId}>
            Contract audit diagram: an agreement, nested linked terms, and
            a venue clause. The notice and venue issues were contested
            litigant arguments, not judicial findings.
          </title>

          {/* Audit rails */}
          <g fill="none" stroke="var(--border)" strokeWidth="2">
            <path d="M8 64H944M8 414H944" />
            <path d="M8 56V72M944 56V72M8 406V422M944 406V422" />
            <path d="M132 64V110M476 64V110M820 64V110" />
            <path d="M132 350V414M476 350V414M820 350V414" />
          </g>

          <text
            x="8"
            y="38"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
            letterSpacing="2"
          >
            CONSENT CHAIN / UNDER DISPUTE
          </text>

          <path
            d="M916 17H944V45"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Directional conduits — interrupted rather than confirmed */}
          <g fill="none" stroke="var(--accent)" strokeWidth="3">
            <path d="M256 232H282M294 232H334" strokeDasharray="7 6" />
            <path d="M322 223L334 232L322 241" />
            <path d="M600 232H626M638 232H678" strokeDasharray="7 6" />
            <path d="M666 223L678 232L666 241" />
          </g>

          {/* Accent flags mark the disputed transitions */}
          <g>
            <path
              d="M292 216V128H330L318 144L330 160H292"
              fill="var(--accent)"
              fillOpacity="0.12"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M636 216V128H674L662 144L674 160H636"
              fill="var(--accent)"
              fillOpacity="0.12"
              stroke="var(--accent)"
              strokeWidth="2"
            />
          </g>

          {/* Node 1 — Agreement */}
          <rect
            x="8"
            y="110"
            width="248"
            height="240"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="28"
            y="147"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            01
          </text>

          <g fill="none" stroke="var(--ink)" strokeWidth="2.5">
            <path d="M106 166H146L162 182V244H106Z" />
            <path d="M146 166V182H162M117 198H149M117 211H149M117 224H139" />
          </g>

          <text
            x="132"
            y="289"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            Agreement
          </text>
          <text
            x="132"
            y="323"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[22px]"
          >
            Contains a link
          </text>

          {/* Node 2 — Nested terms */}
          <rect
            x="352"
            y="110"
            width="248"
            height="240"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M352 110H600"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <text
            x="372"
            y="147"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            02
          </text>

          <g fill="none" strokeWidth="2.5">
            <rect
              x="442"
              y="167"
              width="57"
              height="63"
              stroke="var(--ink)"
            />
            <rect
              x="455"
              y="181"
              width="57"
              height="63"
              fill="var(--surface)"
              stroke="var(--accent)"
            />
            <path
              d="M466 199H500M466 212H500M466 225H487"
              stroke="var(--accent)"
            />
          </g>

          <text
            x="476"
            y="289"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            Linked terms
          </text>
          <text
            x="476"
            y="323"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[22px]"
          >
            Nested notice
          </text>

          {/* Node 3 — Venue clause */}
          <rect
            x="696"
            y="110"
            width="248"
            height="240"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <text
            x="716"
            y="147"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            03
          </text>

          <g fill="none" stroke="var(--ink)" strokeWidth="2.5">
            <path d="M784 190L820 169L856 190ZM790 237H850M784 245H856" />
            <path d="M797 198V230M812 198V230M828 198V230M843 198V230" />
          </g>

          <text
            x="820"
            y="289"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[28px] font-semibold"
          >
            Venue clause
          </text>
          <text
            x="820"
            y="323"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[22px]"
          >
            Florida courts
          </text>

          {/* Vector-native legend */}
          <path
            d="M352 384H390"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="7 6"
          />
          <text
            x="406"
            y="392"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            CONTESTED
          </text>
        </svg>
      </div>

      {/* Zone 3 — Separate, non-overlapping evidence cards */}
      <div className="grid shrink-0 grid-cols-2 gap-5">
        {[0, 1].map((index) => (
          <article
            key={index}
            className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6"
          >
            <h3 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[index]?.label ??
                (index === 0 ? 'Nested notice' : 'Conflicting venue')}
            </h3>
            <p className="mt-3 line-clamp-3 font-[var(--font-body)] text-[24px] leading-snug">
              {items[index]?.body ??
                (index === 0
                  ? 'Lawyers challenged terms linked inside another agreement.'
                  : 'Product terms named Orange County, Florida, courts.')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}