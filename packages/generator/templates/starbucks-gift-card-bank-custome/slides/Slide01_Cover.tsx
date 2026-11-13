import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const uid = React.useId().replace(/:/g, '');
  const hatchId = `${uid}-hatch`;
  const diagramTitleId = `${uid}-diagram`;
  const promise = slide.items?.[0];
  const telemetry = slide.telemetry?.[1];
  const { qualifier, value: metric, unit } = parseMetricBadge(
    telemetry?.[0]?.badge ?? '',
  );

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] leading-7 tracking-[0.09em] text-[var(--accent)]">
          <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-4 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <div className="my-5 w-full border-b border-[var(--border)]" />

        <p className="max-w-[870px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]">
          {slide.subheadline}
        </p>
      </header>

      <figure className="m-0 mt-6 h-[480px] w-full shrink-0">
        <svg
          viewBox="0 0 952 480"
          width="952"
          height="480"
          role="img"
          aria-labelledby={diagramTitleId}
          className="block h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title id={diagramTitleId}>
            Coffee-cup engineering cutaway: customer prepayments enter
            immediately; coffee follows later. A separate dashed accounting
            conduit carries estimated nonredemption to a revenue ledger.
            Loyalty Stars occupy a detached compartment. The reservoir is a
            timing metaphor, not a segregated bank account.
          </title>

          <defs>
            <pattern
              id={hatchId}
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <path
                d="M0 0V10"
                stroke="var(--border)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Drawing registration and dimension marks. */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M8 20H30M19 9V31M922 452H944M933 441V463" />
            <path d="M148 135V376M139 135H157M139 376H157" />
            <path d="M142 141L154 129M142 382L154 370" />
            <path d="M164 135H190M164 376H247" strokeDasharray="3 6" />
            <path d="M216 454H448M216 447V461M448 447V461" />
            <path d="M210 460L222 448M442 460L454 448" />
            <path d="M80 422H170M125 402V442" strokeDasharray="3 7" />
          </g>

          {/* Detached loyalty compartment: intentionally no conduit. */}
          <g>
            <path
              d="M684 23H924V130H684Z"
              fill="var(--surface)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <path d="M685 24H923V78H685Z" fill={`url(#${hatchId})`} />
            <g
              stroke="var(--ink)"
              strokeWidth="1.5"
              fill="var(--surface)"
            >
              <path d="M731 35L736 46L748 47L739 55L741 67L731 61L721 67L723 55L714 47L726 46Z" />
              <path d="M802 35L807 46L819 47L810 55L812 67L802 61L792 67L794 55L785 47L797 46Z" />
              <path d="M873 35L878 46L890 47L881 55L883 67L873 61L863 67L865 55L856 47L868 46Z" />
            </g>
            <path d="M684 79H924" stroke="var(--border)" strokeWidth="1" />
            <text
              x="804"
              y="112"
              textAnchor="middle"
              fill="var(--ink)"
              className="font-[var(--font-mono)] text-[22px]"
            >
              loyalty Stars
            </text>
          </g>

          {/* Axonometric lid and tapered outer shell. */}
          <g strokeWidth="1.5" strokeLinejoin="miter">
            <path
              d="M201 137L292 91L549 116L590 145L505 191L235 166Z"
              fill="var(--surface)"
              stroke="var(--ink)"
            />
            <path
              d="M201 137L235 166L505 191L590 145V158L507 205L235 180L201 151Z"
              fill="var(--surface)"
              stroke="var(--ink)"
            />
            <path
              d="M218 169L270 368L459 397L507 205"
              stroke="var(--ink)"
            />
            <path
              d="M507 205L576 168L526 350L459 397"
              fill={`url(#${hatchId})`}
              stroke="var(--ink)"
            />
            <path d="M270 368L336 329L526 350" stroke="var(--border)" />
            <path
              d="M270 368L459 397L526 350L336 329Z"
              fill="var(--surface)"
              stroke="var(--ink)"
            />
            <path d="M241 193L281 351M490 217L451 376" stroke="var(--border)" />
          </g>

          {/* The lid slot receives prepaid-dollar tokens immediately. */}
          <path
            d="M326 129L350 117L439 126L415 139Z"
            fill="var(--paper, #0A0A0C)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />

          <g
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="var(--surface)"
          >
            <path d="M343 11L413 19L402 57L332 49Z" />
            <path d="M354 57L424 65L413 103L343 95Z" />
            <path d="M366 103L436 111L425 149L355 141Z" />
          </g>

          <g
            fill="var(--accent)"
            textAnchor="middle"
            className="font-[var(--font-mono)] text-[26px]"
          >
            <text x="373" y="43" transform="rotate(7 373 43)">$</text>
            <text x="384" y="89" transform="rotate(7 384 89)">$</text>
            <text x="396" y="135" transform="rotate(7 396 135)">$</text>
          </g>

          <path
            d="M393 155V185M387 179L393 185L399 179"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />

          {/* Open cutaway chamber, with section lines instead of a bank motif. */}
          <g stroke="var(--border)" strokeWidth="1">
            <path d="M255 267L472 289M260 285L467 307M265 303L462 325" />
            <path d="M271 322L457 343M277 340L452 360" />
          </g>

          <text
            x="366"
            y="222"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px] font-semibold"
          >
            <tspan x="366">customer</tspan>
            <tspan x="366" dy="31">prepayments</tspan>
          </text>

          {/* Separate accounting path, square valve, and revenue ledger. */}
          <path
            d="M485 283H649M679 283H796"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="7 7"
          />
          <rect
            x="649"
            y="268"
            width="30"
            height="30"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <path
            d="M655 291L673 275M790 277L796 283L790 289"
            stroke="var(--accent)"
            strokeWidth="1.5"
          />
          <path
            d="M664 242V262"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="664"
            y="198"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            <tspan x="664">estimated</tspan>
            <tspan x="664" dy="29">nonredemption</tspan>
          </text>

          <g strokeWidth="1">
            <rect
              x="802"
              y="248"
              width="120"
              height="92"
              fill="var(--surface)"
              stroke="var(--ink)"
            />
            <path
              d="M802 271H922M802 294H922M802 317H922M841 248V340"
              stroke="var(--border)"
            />
            <path
              d="M853 283H908M853 306H908M853 329H890"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
          </g>
          <text
            x="862"
            y="370"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            <tspan x="862">revenue</tspan>
            <tspan x="862" dy="29">ledger</tspan>
          </text>

          {/* Narrow later-service outlet terminates at the coffee silhouette. */}
          <path
            d="M353 382V416H558M361 384V408H558"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <path
            d="M549 404L558 412L549 420"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <g stroke="var(--ink)" strokeWidth="1.5">
            <path
              d="M569 391H625L618 438H577Z"
              fill="var(--surface)"
            />
            <path d="M625 400H635C651 400 649 422 622 422" />
            <path d="M562 445H635M568 391Q597 382 626 391" />
          </g>
          <text
            x="446"
            y="449"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            coffee later
          </text>
        </svg>
      </figure>

      <div className="mt-auto pt-6">
        <div className="border border-[var(--border)] bg-[var(--surface)] rounded-none">
          <div className="grid grid-cols-[220px_1fr] items-center gap-6 border-b border-[var(--border)] px-7 py-5">
            <h2 className="font-[var(--font-mono)] text-[20px] leading-7 tracking-[0.08em] text-[var(--accent)]">
              {promise?.title}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {(promise?.body ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
                part.startsWith('**') && part.endsWith('**') ? (
                  <strong key={index} className="font-semibold">
                    {part.slice(2, -2)}
                  </strong>
                ) : (
                  <React.Fragment key={index}>{part}</React.Fragment>
                ),
              )}
            </p>
          </div>

          <div className="grid grid-cols-[1fr_1.2fr]">
            <div className="flex items-center gap-3 border-r border-[var(--border)] px-7 py-5">
              <span className="h-2 w-2 shrink-0 bg-[var(--accent)]" />
              <span className="font-[var(--font-mono)] text-[20px] leading-7 tracking-[0.04em]">
                {slide.issueBadge}
              </span>
            </div>

            <div className="flex items-center gap-5 px-7 py-5">
              <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
                {qualifier && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {qualifier}
                  </span>
                )}
                <span className="font-[var(--font-mono)] text-[40px] font-bold leading-none tabular-nums">
                  {metric}
                </span>
                {unit && (
                  <span className="font-[var(--font-body)] text-[22px]">
                    {unit}
                  </span>
                )}
              </div>
              <p className="font-[var(--font-mono)] text-[20px] leading-snug">
                {telemetry?.[0]?.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}