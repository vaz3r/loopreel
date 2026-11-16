import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const artId = React.useId();

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-7 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.14em] text-[var(--accent)]">
            THE CONTRACTUAL BASELINE
          </p>
        </div>

        <h1 className="font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Three Documents.
          <br />
          Two Assent Episodes.
        </h1>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          Disney built its argument across products and transactions.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          className="block h-full max-h-[500px] w-full"
          role="img"
          aria-labelledby={`${artId}-title ${artId}-description`}
          preserveAspectRatio="xMidYMid meet"
        >
          <title id={`${artId}-title`}>
            Three linked documents and two alleged assent episodes
          </title>
          <desc id={`${artId}-description`}>
            A horizontal ledger connects three document nodes in its first
            channel. Its second channel connects two alleged assent episodes:
            a 2019 trial and September 2023 tickets.
          </desc>

          <defs>
            <marker
              id={`${artId}-arrow`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
            >
              <path d="M 1 1 L 8 5 L 1 9" fill="var(--accent)" />
            </marker>
          </defs>

          <path
            d="M0 1H952 M0 230H952 M0 459H952"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <g
            fill="var(--ink)"
            className="font-[var(--font-mono)]"
            fontSize="24"
          >
            <text x="24" y="45" letterSpacing="2">
              LINKED DOCUMENTS
            </text>
            <text x="24" y="275" letterSpacing="2">
              ALLEGED ASSENTS
            </text>
          </g>

          <g
            fill="var(--ink)"
            className="font-[var(--font-mono)]"
            fontSize="88"
            fontWeight="700"
            letterSpacing="-5"
          >
            <text x="20" y="159">
              03
            </text>
            <text x="20" y="389">
              02
            </text>
          </g>

          {/* Channel lengths encode the counts: 660 units and 440 units. */}
          <path
            d="M190 126H850"
            stroke="var(--surface)"
            strokeWidth="56"
            fill="none"
          />
          <path
            d="M190 356H630"
            stroke="var(--surface)"
            strokeWidth="56"
            fill="none"
          />

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            markerEnd={`url(#${artId}-arrow)`}
          >
            <path d="M190 126H268" />
            <path d="M332 126H488" />
            <path d="M552 126H708" />
            <path d="M772 126H846" />
            <path d="M190 356H268" />
            <path d="M332 356H488" />
            <path d="M552 356H626" />
          </g>

          {/* Three geometric document nodes. */}
          {[300, 520, 740].map((x, index) => (
            <g key={`document-${index}`}>
              <path
                d={`M${x - 32} 82H${x + 13}L${x + 32} 101V170H${x - 32}Z`}
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="2"
              />
              <path
                d={`M${x + 13} 82V101H${x + 32}`}
                fill="none"
                stroke="var(--ink)"
                strokeWidth="2"
              />
              <path
                d={`M${x - 18} 119H${x + 15} M${x - 18} 134H${x + 15} M${x - 18} 149H${x + 4}`}
                fill="none"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <rect
                x={x - 32}
                y="82"
                width="6"
                height="88"
                fill="var(--accent)"
              />
            </g>
          ))}

          {/* Two distinct assent nodes, with dates kept inside the SVG. */}
          {[300, 520].map((x, index) => (
            <g key={`assent-${index}`}>
              <path
                d={`M${x} 316L${x + 40} 356L${x} 396L${x - 40} 356Z`}
                fill="var(--surface)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <circle cx={x} cy="356" r="9" fill="var(--accent)" />
            </g>
          ))}

          <g
            fill="var(--ink)"
            className="font-[var(--font-body)]"
            fontSize="22"
            textAnchor="middle"
          >
            <text x="300" y="433">
              2019 trial
            </text>
            <text x="555" y="433">
              September 2023 tickets
            </text>
          </g>

          {/* Endpoint flags distinguish the channels without implying a delta. */}
          <g fill="var(--accent)">
            <path d="M850 76H918L906 92L918 108H850Z" />
            <path d="M630 306H698L686 322L698 338H630Z" />
          </g>
          <g stroke="var(--accent)" strokeWidth="2">
            <path d="M850 76V158" />
            <path d="M630 306V388" />
          </g>
        </svg>
      </div>

      <footer className="shrink-0 border-t-2 border-[var(--border)] bg-[var(--surface)] px-7 py-7">
        <div className="grid grid-cols-2 gap-7">
          <article>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item0?.label ?? '3 linked documents'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item0?.body ??
                'Disney relied on linked agreements, not one isolated click.'}
            </p>
          </article>

          <article className="border-l border-[var(--border)] pl-7">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item1?.label ?? '2 alleged assents'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item1?.body ??
                'Disney cited a 2019 trial and September 2023 tickets.'}
            </p>
          </article>
        </div>
      </footer>
    </section>
  );
}