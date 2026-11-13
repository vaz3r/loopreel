import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function Emphasis({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*\*)/g).map((part, index) =>
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

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const diagramId = React.useId().replace(/:/g, '');
  const arrowId = `${diagramId}-arrow`;
  const items = slide.items ?? [];
  const milestones = [items[0], items[1], items[2]];
  const telemetry = slide.telemetry?.[0];
  const { qualifier, value: metric, unit } = parseMetricBadge(
    telemetry?.[0]?.badge ?? '',
  );

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[20px] uppercase leading-[26px] tracking-[0.12em] text-[var(--accent)]">
          <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 max-w-[900px] font-[var(--font-headline)] text-[28px] font-bold leading-[1.05] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="mt-4 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-6 grid h-[600px] shrink-0 grid-cols-[360px_minmax(0,1fr)] gap-8">
        <figure className="m-0 h-[600px] w-[360px]">
          <svg
            viewBox="0 0 360 600"
            width="360"
            height="600"
            role="img"
            aria-labelledby={`${diagramId}-title ${diagramId}-description`}
            className="block text-[var(--ink)]"
            fill="none"
          >
            <title id={`${diagramId}-title`}>
              Prepayment, redemption, and proportional revenue recognition
            </title>
            <desc id={`${diagramId}-description`}>
              Dollars enter a customer-prepayment reservoir. Redemption
              releases coffee and reduces the corresponding ledger obligation.
              A dashed accounting path passes through a square recognition
              valve, synchronized with redemption marks, into revenue. A
              branch accounts for applicable unclaimed-property remittances.
              Stars remain detached. The accounting valve does not cancel
              an individual customer’s balance.
            </desc>

            <defs>
              <marker
                id={arrowId}
                viewBox="0 0 8 8"
                refX="7"
                refY="4"
                markerWidth="8"
                markerHeight="8"
                orient="auto"
                markerUnits="userSpaceOnUse"
              >
                <path d="M1 1L7 4L1 7" stroke="var(--accent)" strokeWidth="1.5" />
              </marker>
            </defs>

            {/* Architectural datum lines. */}
            <g stroke="var(--border)" strokeWidth="1">
              <path d="M8 24H208M8 24V408M8 408H208" />
              <path d="M3 24H13M3 120H13M3 216H13M3 312H13M3 408H13" />
              <path d="M24 429H188M24 424V434M188 424V434" />
              <path d="M106 89V409" strokeDasharray="3 7" />
            </g>

            {/* Solid inflows: cash enters through the reservoir lid. */}
            <g
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[24px]"
              textAnchor="middle"
            >
              <text x="57" y="38">$</text>
              <text x="106" y="28">$</text>
              <text x="155" y="38">$</text>
            </g>

            <g
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd={`url(#${arrowId})`}
            >
              <path d="M57 49V96" />
              <path d="M106 39V96" />
              <path d="M155 49V96" />
            </g>

            {/* Reservoir remains intact; no disappearing balance metaphor. */}
            <path
              d="M24 113H188L162 400H50Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M18 102H194V113H18ZM33 91H179L187 102H25Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            <g stroke="var(--border)" strokeWidth="1">
              <path d="M39 252H175M43 298H171M47 344H167" />
              <path d="M51 366L68 383M65 366L82 383M79 366L96 383M93 366L110 383M107 366L124 383M121 366L138 383M135 366L152 383" />
            </g>

            <g
              fill="currentColor"
              className="font-[var(--font-body)] text-[20px]"
              textAnchor="middle"
            >
              <text x="106" y="174">customer</text>
              <text x="106" y="200">prepayments</text>
            </g>

            <path
              d="M72 224H140"
              stroke="var(--accent)"
              strokeWidth="2"
            />

            {/* Detached Stars compartment: deliberately no connecting path. */}
            <rect
              x="246"
              y="88"
              width="100"
              height="104"
              fill="var(--surface)"
              stroke="var(--border)"
            />
            <path
              d="M296 106L301 119L315 120L304 129L308 143L296 135L284 143L288 129L277 120L291 119Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <text
              x="296"
              y="174"
              textAnchor="middle"
              fill="currentColor"
              className="font-[var(--font-mono)] text-[20px]"
            >
              Stars
            </text>

            {/* Redemption outlet and coffee silhouette. */}
            <path
              d="M171 310H234V338"
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd={`url(#${arrowId})`}
            />
            <rect
              x="166"
              y="303"
              width="12"
              height="14"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M216 347H256L252 379H221Z"
              fill="currentColor"
            />
            <path
              d="M256 352H263C274 352 274 368 261 368H254"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path d="M211 385H266" stroke="currentColor" strokeWidth="1.5" />

            {/* Corresponding obligation reduction in the ledger. */}
            <path
              d="M272 362H302V321"
              stroke="var(--accent)"
              strokeWidth="1.5"
              markerEnd={`url(#${arrowId})`}
            />
            <rect
              x="272"
              y="250"
              width="76"
              height="64"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M272 271H348M295 271V314M272 292H348"
              stroke="var(--border)"
            />
            <path
              d="M280 282H288M280 303H288M306 282H337M306 303H329"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />

            {/* Accounting-only route, synchronized with redemption ticks. */}
            <path
              d="M302 385V416H195V463H220"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
            />
            <g stroke="currentColor" strokeWidth="1.5">
              <path d="M202 405V427M218 405V427M234 405V427" />
              <path d="M202 394H234" stroke="var(--border)" />
            </g>

            {/* Square accounting valve, not a cash drain. */}
            <rect
              x="220"
              y="449"
              width="28"
              height="28"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <path
              d="M226 471L242 455M234 449V438M227 438H241"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <path
              d="M248 463H322V497"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="5 6"
              markerEnd={`url(#${arrowId})`}
            />
            <text
              x="264"
              y="524"
              textAnchor="middle"
              fill="var(--accent)"
              className="font-[var(--font-mono)] text-[20px]"
            >
              revenue
            </text>

            {/* Applicable remittances branch from the accounting route. */}
            <path
              d="M280 463V548H151"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <rect
              x="277"
              y="460"
              width="6"
              height="6"
              fill="currentColor"
            />
            <g
              fill="currentColor"
              className="font-[var(--font-body)] text-[20px]"
            >
              <text x="20" y="553">Applicable</text>
              <text x="20" y="580">unclaimed-property remittances</text>
            </g>
          </svg>
        </figure>

        <div className="grid h-full min-w-0 grid-rows-3 border-l border-[var(--border)]">
          {milestones.map((item, index) => (
            <article
              key={item?.tag ?? index}
              className="relative flex min-w-0 flex-col justify-center pl-8 pr-1"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[6.5px] top-[42px] h-3 w-3 bg-[var(--accent)]"
              />

              <div className="font-[var(--font-mono)] text-[20px] leading-[26px] tracking-[0.16em] text-[var(--accent)]">
                {item?.tag}
              </div>

              <h2 className="mt-2 font-[var(--font-headline)] text-[28px] font-semibold leading-tight tracking-[-0.02em]">
                {item?.title || item?.label}
              </h2>

              <p className="mt-3 font-[var(--font-body)] text-[26px] leading-snug">
                <Emphasis text={item?.body} />
              </p>
            </article>
          ))}
        </div>
      </div>

      {telemetry && (
        <aside className="mt-auto flex min-h-[100px] shrink-0 items-center gap-6 border-y border-[var(--border)] py-5">
          <div className="flex shrink-0 items-baseline gap-2 border-r border-[var(--border)] pr-6">
            {qualifier && (
              <span className="font-[var(--font-body)] text-[22px]">
                {qualifier}
              </span>
            )}
            <span className="font-[var(--font-mono)] text-[28px] font-bold leading-none tabular-nums text-[var(--accent)]">
              {metric}
            </span>
            {unit && (
              <span className="font-[var(--font-body)] text-[22px]">
                {unit}
              </span>
            )}
          </div>

          <p className="min-w-0 font-[var(--font-body)] text-[24px] leading-snug">
            {telemetry?.[0]?.label}
          </p>
        </aside>
      )}
    </section>
  );
}