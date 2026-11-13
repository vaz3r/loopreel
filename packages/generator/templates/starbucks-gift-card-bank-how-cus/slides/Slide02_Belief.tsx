import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
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

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];

  const metric0 = item0?.metric
    ? parseMetricBadge(item0.metric.badge)
    : null;
  const metric1 = item1?.metric
    ? parseMetricBadge(item1.metric.badge)
    : null;

  const svgId = React.useId().replace(/:/g, '');
  const outboundArrow = `${svgId}-outbound`;
  const returnArrow = `${svgId}-return`;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)] justify-between py-6 font-[var(--font-body)]">
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

        <p className="mt-4 max-w-[900px] text-[26px] leading-snug text-[var(--ink)] opacity-80">
          {slide.subheadline}
        </p>
      </header>

      <div className="my-4 flex min-h-0 flex-1 flex-col justify-between">
        <figure className="relative m-0 flex min-h-0 flex-1 items-center justify-center">
          <svg
            viewBox="0 0 952 420"
            role="img"
            aria-labelledby={`${svgId}-title`}
            className="block h-full max-h-[380px] min-h-0 w-full text-[var(--ink)]"
            fill="none"
          >
            <title id={`${svgId}-title`}>
              A gift card enters a checkout reader connected to a café by
              a payment arrow and three return-visit arrows.
            </title>

            <defs>
              <marker
                id={outboundArrow}
                viewBox="0 0 12 12"
                refX="10"
                refY="6"
                markerWidth="10"
                markerHeight="10"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M2 2L10 6L2 10"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </marker>

              <marker
                id={returnArrow}
                viewBox="0 0 12 12"
                refX="10"
                refY="6"
                markerWidth="10"
                markerHeight="10"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path
                  d="M2 2L10 6L2 10"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />
              </marker>
            </defs>

            {/* Registration marks, not typographic placeholders. */}
            <g
              stroke="var(--ink)"
              strokeWidth="1"
              strokeOpacity="0.4"
            >
              <path d="M39 62H57M48 53V71" />
              <path d="M889 62H907M898 53V71" />
              <path d="M39 355H57M48 346V364" />
              <path d="M889 355H907M898 346V364" />
            </g>

            {/* One continuous checkout-and-return circuit. */}
            <path
              d="M307 216C369 216 370 43 488 43H802C869 43 909 93 909 163V277C909 341 858 373 785 373H370C312 373 287 351 269 322"
              stroke="var(--ink)"
              strokeOpacity="0.25"
              strokeWidth="1"
            />

            {/* The single outbound payment interaction. */}
            <path
              d="M307 216C369 216 370 43 488 43H565"
              stroke="var(--accent)"
              strokeWidth="3"
              markerEnd={`url(#${outboundArrow})`}
            />

            {/* Three return arrows indicate recurrence, not a rate. */}
            <g
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeOpacity="0.75"
              markerEnd={`url(#${returnArrow})`}
            >
              <path d="M909 172V247" />
              <path d="M843 366C825 371 806 373 785 373H753" />
              <path d="M563 373H475" />
            </g>

            {/* Physical gift card entering the reader's slot. */}
            <g
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeLinejoin="miter"
            >
              <path d="M83 89L229 74L252 190L108 207Z" />
              <path
                d="M88 113L234 98L238 119L92 134Z"
                fill="var(--ink)"
                fillOpacity="0.08"
              />
              <path
                d="M105 155L129 152L133 174L109 177Z"
                fill="var(--accent)"
                fillOpacity="0.18"
                stroke="var(--accent)"
                strokeOpacity="1"
              />
              <path d="M113 154L117 176M105 163L131 160" />
            </g>

            {/* Countertop reader: angled face, bezel, keys and base. */}
            <g
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeLinejoin="miter"
            >
              <path d="M98 188L267 168L333 296L150 325Z" />
              <path d="M150 325L333 296V316L150 345Z" />
              <path d="M98 188L150 325V345L98 209Z" />

              <path
                d="M110 192L254 175L257 183L113 200Z"
                fill="var(--paper)"
              />

              <path d="M141 212L253 198L276 241L160 257Z" />
              <path
                d="M151 218L247 206L264 236L166 249Z"
                fill="var(--paper)"
              />

              <path d="M171 272L192 269L199 281L177 284Z" />
              <path d="M203 267L224 264L231 276L209 279Z" />
              <path d="M235 262L256 259L263 271L241 274Z" />

              <path d="M182 292L203 289L210 301L188 304Z" />
              <path d="M214 287L235 284L242 296L220 299Z" />
              <path
                d="M246 282L267 279L274 291L252 294Z"
                fill="var(--accent)"
                fillOpacity="0.8"
                stroke="var(--accent)"
                strokeOpacity="1"
              />
            </g>

            <path
              d="M72 345H343"
              stroke="var(--ink)"
              strokeOpacity="0.25"
              strokeWidth="1"
            />

            {/* Café façade, transom, glazed door and threshold. */}
            <g
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1"
              strokeOpacity="0.25"
              strokeLinejoin="miter"
            >
              <path d="M601 111H848V337H601Z" />
              <path d="M591 80H858V111H591Z" />
              <path d="M608 151H840V184H608Z" />
              <path d="M687 151V184M766 151V184" />

              <path d="M614 197H679V310H614Z" />
              <path d="M778 197H835V310H778Z" />
              <path d="M614 273H679M778 273H835" />

              <path d="M696 195H763V337H696Z" />
              <path
                d="M704 204H755V320H704Z"
                fill="var(--paper)"
              />
              <path d="M747 255V278" strokeOpacity="0.8" strokeWidth="3" />

              <path d="M590 337H859L867 345H582Z" />
            </g>

            {/* Striped awning with an actual projecting edge. */}
            <g
              stroke="var(--ink)"
              strokeOpacity="0.25"
              strokeWidth="1"
            >
              <path
                d="M601 111H848L865 145H585Z"
                fill="var(--surface)"
              />
              <g fill="var(--ink)" fillOpacity="0.12">
                <path d="M601 111H628L622 145H585Z" />
                <path d="M656 111H683L681 145H650Z" />
                <path d="M711 111H738L741 145H711Z" />
                <path d="M766 111H793L801 145H770Z" />
                <path d="M821 111H848L865 145H832Z" />
              </g>
              <path
                d="M585 145H865V156H585Z"
                fill="var(--surface)"
              />
              <path d="M622 145V156M650 145V156M681 145V156M711 145V156M741 145V156M770 145V156M801 145V156M832 145V156" />
            </g>

            {/* Compact labels anchored directly to the circuit. */}
            <g
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[22px] tracking-[0.12em]"
            >
              <text x="420" y="94" fill="var(--accent)">
                PAYMENT
              </text>
              <text x="370" y="330">
                RETURN VISIT
              </text>
            </g>

            <g strokeWidth="1">
              <path
                d="M438 74V44"
                stroke="var(--accent)"
                strokeOpacity="0.6"
              />
              <path
                d="M451 341V373"
                stroke="var(--ink)"
                strokeOpacity="0.25"
              />
            </g>

            {/* Leaders terminate toward the two editorial sections. */}
            <g stroke="var(--ink)" strokeOpacity="0.25" strokeWidth="1">
              <path d="M180 340V405" />
              <path d="M706 373V405" />
            </g>

            <circle cx="180" cy="340" r="4" fill="var(--ink)" />
            <circle cx="180" cy="405" r="4" fill="var(--ink)" />

            <path
              d="M706 373V405"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <rect
              x="701"
              y="368"
              width="10"
              height="10"
              fill="var(--accent)"
            />
            <circle cx="706" cy="405" r="5" fill="var(--accent)" />
          </svg>
        </figure>
      </div>

      <div className="grid h-[248px] shrink-0 grid-cols-[360px_568px] gap-6">
        <article className="flex min-w-0 flex-col justify-between border-t border-[var(--border)] py-6 pr-5">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-[var(--font-mono)] text-[20px] tabular-nums text-[var(--accent)]">
                
              </span>
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
                {item0?.title}
              </h2>
            </div>

            <p className="mt-5 text-[26px] leading-snug text-[var(--ink)]">
              <EmphasizedCopy text={item0?.body} />
            </p>
          </div>

          {metric0 && (
            <div className="mt-3 flex items-baseline gap-2">
              {metric0.qualifier && (
                <span className="text-[22px]">{metric0.qualifier}</span>
              )}
              <span className="font-[var(--font-mono)] text-[40px] font-bold tabular-nums">
                {metric0.value}
              </span>
              {metric0.unit && (
                <span className="text-[22px]">{metric0.unit}</span>
              )}
            </div>
          )}
        </article>

        <article className="flex min-w-0 flex-col justify-between border-t border-[var(--accent)] bg-[var(--surface)] px-8 py-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-[var(--font-mono)] text-[20px] tabular-nums text-[var(--accent)]">
                
              </span>
              <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.025em]">
                {item1?.title}
              </h2>
            </div>

            <p className="mt-5 max-w-[470px] text-[28px] leading-snug text-[var(--ink)]">
              <EmphasizedCopy text={item1?.body} />
            </p>
          </div>

          {metric1 && (
            <div className="mt-3 flex items-baseline gap-2 text-[var(--accent)]">
              {metric1.qualifier && (
                <span className="text-[22px]">{metric1.qualifier}</span>
              )}
              <span className="font-[var(--font-mono)] text-[40px] font-bold tabular-nums">
                {metric1.value}
              </span>
              {metric1.unit && (
                <span className="text-[22px]">{metric1.unit}</span>
              )}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}