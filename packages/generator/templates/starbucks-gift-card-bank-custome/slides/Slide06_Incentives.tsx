import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function LockedCopy({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-[var(--ink)]">
            {part.substring(2, part.length - 2)}
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
  const diagramId = React.useId();
  const items = (slide.items ?? []).slice(0, 4);

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="shrink-0">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[20px] uppercase leading-[26px] tracking-[0.12em] text-[var(--accent)]">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
          />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-3 max-w-[940px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.05] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <div className="my-4 border-b border-[var(--border)]" />

        <p className="font-[var(--font-body)] text-[24px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <figure className="m-0 mt-5 h-[420px] w-full shrink-0">
        <svg
          viewBox="0 0 952 420"
          className="block h-full w-full"
          role="img"
          aria-labelledby={`${diagramId}-title ${diagramId}-description`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={`${diagramId}-title`}>
            Prepayment reservoir and alleged reload cycle
          </title>
          <desc id={`${diagramId}-description`}>
            Solid outlines identify the established prepayment reservoir.
            Dashed outlines identify the alleged mechanism: a residual-value
            pocket, an open coffee outlet, and a return pipe labeled reload.
            Four numbered callouts correspond to the allegation ledger below.
            This is a conceptual diagram, not a present-day app interface.
          </desc>

          {/* Established reservoir: the only solid-line mechanism. */}
          <g stroke="var(--ink)" strokeWidth="1.5">
            <rect
              x="96"
              y="122"
              width="438"
              height="226"
              fill="var(--surface)"
            />
            <rect x="110" y="136" width="410" height="198" opacity="0.3" />

            <path
              d="M130 160H362 M130 184H362 M130 208H362
                 M130 232H362 M130 256H362 M130 280H362
                 M130 304H362"
              opacity="0.16"
            />

            <path
              d="M96 122H122 M96 122V148
                 M508 122H534V148
                 M96 322V348H122
                 M508 348H534V322"
              strokeWidth="2"
            />
          </g>

          {/* Alleged residual pocket and open coffee outlet. */}
          <g
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="7 6"
            strokeLinecap="butt"
            strokeLinejoin="miter"
          >
            <rect
              x="390"
              y="204"
              width="118"
              height="118"
              fill="var(--accent)"
              fillOpacity="0.045"
            />
            <path d="M406 222H490 M406 241H490 M406 260H490 M406 279H490" />

            <path d="M508 244H718 M508 268H718" />

            {/* The cup has an intentionally open upper edge. */}
            <path d="M738 224L752 312H824L838 224" />
            <path d="M835 242H855C880 242 880 282 849 282H830" />
            <path d="M730 328H846" />
            <path d="M764 208C748 191 779 183 763 166" />
            <path d="M803 208C787 191 818 183 802 166" />

            {/* Return pipe: schematic, not a claim of proven intent. */}
            <path d="M864 220V76H280V122" />
            <path d="M888 220V52H256V122" />
          </g>

          {/* Directional route remains dashed throughout. */}
          <g
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="5 5"
          >
            <path d="M340 256H382 M522 256H700" />
            <path d="M686 247L700 256L686 265" />
            <path d="M876 198V64H268V110" />
            <path d="M259 96L268 110L277 96" />
          </g>

          <rect x="530" y="39" width="130" height="49" fill="var(--surface)" />
          <text
            x="595"
            y="71"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[24px]"
          >
            reload
          </text>

          {/* Callouts and their leaders share this SVG coordinate system. */}
          <g
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          >
            <path d="M198 100V112H256" />
            <rect x="176" y="56" width="44" height="44" />

            <path d="M744 54V28H710" />
            <rect x="666" y="6" width="44" height="44" />

            <path d="M810 350V370H866" />
            <rect x="866" y="348" width="44" height="44" />

            <path d="M596 268V370H552" />
            <rect x="508" y="348" width="44" height="44" />
          </g>

          <g
            fill="var(--accent)"
            textAnchor="middle"
            dominantBaseline="middle"
            className="font-[var(--font-mono)] text-[20px] font-bold"
          >
            <text x="198" y="79">01</text>
            <text x="688" y="29">02</text>
            <text x="888" y="371">03</text>
            <text x="530" y="371">04</text>
          </g>
        </svg>
      </figure>

      <div className="mt-5 grid shrink-0 grid-cols-2 border-y border-[var(--border)]">
        {items.map((item, index) => (
          <article
            key={`${slide.id}-${index}`}
            className={[
              'min-w-0 py-4',
              index % 2 === 0
                ? 'border-r border-[var(--border)] pr-6'
                : 'pl-6',
              index < 2 ? 'border-b border-[var(--border)]' : '',
            ].join(' ')}
          >
            <div className="flex items-baseline gap-3">
              <span className="shrink-0 font-[var(--font-mono)] text-[20px] font-bold leading-[32px] text-[var(--accent)]">
                [{String(index + 1).padStart(2, '0')}]
              </span>
              <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-[32px] tracking-[-0.025em]">
                {item.title || item.label}
              </h2>
            </div>

            <p className="mt-2 font-[var(--font-body)] text-[24px] leading-[31px]">
              <LockedCopy text={item.body} />
            </p>
          </article>
        ))}
      </div>

      <div className="mt-auto flex shrink-0 items-center gap-3 pt-4 font-[var(--font-mono)] text-[20px] uppercase leading-[26px] tracking-[0.08em]">
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 bg-[var(--accent)]"
        />
        <span>{slide.evidenceStatus}</span>
      </div>
    </section>
  );
}