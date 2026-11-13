import React from 'react';
import {
  parseMetricBadge,
  type SlideComponentProps,
} from '../../../src/skeleton/types';

function Emphasis({ text }: { text?: string }) {
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

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];
  const telemetry = slide.telemetry?.[0];
  const { qualifier, value: metric, unit } = parseMetricBadge(
    telemetry?.[0]?.badge ?? '',
  );

  const id = React.useId().replace(/:/g, '');
  const hatchId = `engraving-${id}`;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 border-b border-[var(--border)] pb-5">
        <div className="flex items-center gap-3 font-[var(--font-mono)] text-[20px] uppercase leading-7 tracking-[0.14em] text-[var(--accent)]">
          <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="mt-3 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em] [text-wrap:balance]">
          {slide.headline}
        </h1>

        <p className="mt-4 font-[var(--font-body)] text-[26px] leading-snug opacity-80">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-6 flex min-h-[412px] flex-1 items-center">
        <svg
          viewBox="0 0 952 424"
          className="block h-full max-h-[448px] w-full"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <pattern
              id={hatchId}
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(35)"
            >
              <path
                d="M0 0V8"
                stroke="var(--ink)"
                strokeOpacity="0.16"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Physical card engraving: exploded planes, not an app screen. */}
          <rect
            x="0.5"
            y="0.5"
            width="557"
            height="423"
            fill="var(--surface)"
            stroke="var(--border)"
          />

          <g stroke="var(--ink)" strokeWidth="1" opacity="0.3">
            <path d="M20 37V20H37M521 20H538V37M20 387V404H37M521 404H538V387" />
            <path d="M40 105H56M48 97V113M494 283H510M502 275V291" />
          </g>

          {/* Lower prepayment layer. */}
          <path
            d="M74 244L354 202L492 268L212 311Z"
            fill={`url(#${hatchId})`}
            stroke="var(--ink)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <path
            d="M74 244V255L212 322L492 279V268M212 311V322"
            stroke="var(--ink)"
            strokeOpacity="0.35"
          />

          <g
            stroke="var(--ink)"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="4 6"
          >
            <path d="M74 143V244M354 101V202M492 167V268M212 210V311" />
          </g>

          {/* One-way liquidity movement, visibly below the gift card. */}
          <path
            d="M167 261L385 228"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <path
            d="M361 217L385 228L366 246"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinejoin="miter"
          />

          {/* Top card layer. */}
          <path
            d="M74 143L354 101L492 167L212 210Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="1.5"
          />
          <path
            d="M74 143V153L212 220L492 177V167M212 210V220"
            stroke="var(--ink)"
            strokeOpacity="0.65"
          />
          <path
            d="M96 145L350 107L469 165L215 203Z"
            stroke="var(--ink)"
            strokeOpacity="0.25"
          />

          {/* Engraved coffee glyph. */}
          <g
            transform="translate(244 121) skewX(19) scale(1 .72)"
            stroke="var(--ink)"
            strokeWidth="2"
          >
            <path d="M0 23H56V47C56 60 0 60 0 47Z" />
            <path d="M56 28H65C81 28 81 49 56 49" />
            <path d="M-8 65H68" />
            <path d="M12 14C2 6 23 1 13-8M30 14C20 6 41 1 31-8M48 14C38 6 59 1 49-8" />
          </g>

          {/* Dollar tokens remain separate from the Stars tray. */}
          <g stroke="var(--ink)" strokeWidth="1.5">
            <circle cx="100" cy="352" r="25" />
            <circle cx="162" cy="352" r="25" />
          </g>
          <g
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[28px]"
            textAnchor="middle"
          >
            <text x="100" y="362">$</text>
            <text x="162" y="362">$</text>
          </g>

          {/* Independent, perforated rewards tray. */}
          <path
            d="M265 338L436 312L509 347L338 374Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeOpacity="0.7"
            strokeWidth="1.5"
          />
          <path
            d="M265 338V353L338 389L509 362V347M338 374V389"
            stroke="var(--ink)"
            strokeOpacity="0.5"
          />
          <path
            d="M276 349L338 379L498 355"
            stroke="var(--ink)"
            strokeOpacity="0.45"
            strokeDasharray="2 6"
          />

          <g
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="var(--surface)"
          >
            <path d="M324 328L329 338L341 338L332 345L335 356L324 350L314 356L317 345L308 338L320 338Z" />
            <path d="M379 319L384 329L396 329L387 336L390 347L379 341L369 347L372 336L363 329L375 329Z" />
            <path d="M433 329L438 339L450 339L441 346L444 357L433 351L423 357L426 346L417 339L429 339Z" />
          </g>

          {/* Expiration engraving: an open-ended calendar. */}
          <rect
            x="578.5"
            y="0.5"
            width="373"
            height="239"
            stroke="var(--border)"
          />
          <g stroke="var(--ink)" strokeWidth="1.5">
            <path d="M653 63H867V190H653Z" />
            <path d="M653 91H867M687 48V75M833 48V75" />
          </g>
          <g stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1">
            <path d="M680 113H696M713 113H729M746 113H762M779 113H795M812 113H828" />
            <path d="M680 136H696M713 136H729M746 136H762" />
            <path d="M680 159H696M713 159H729" />
          </g>
          <rect x="780" y="139" width="90" height="53" fill="var(--paper, #0A0A0C)" />
          <path
            d="M790 166C806 141 821 141 837 166C853 191 869 191 885 166C869 141 853 141 837 166C821 191 806 191 790 166Z"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          {/* Exactly four empty fee cells, with dimension-line details. */}
          <rect
            x="578.5"
            y="259.5"
            width="373"
            height="164"
            stroke="var(--border)"
          />
          <g stroke="var(--ink)" strokeWidth="1">
            <rect x="610.5" y="309.5" width="59" height="59" />
            <rect x="693.5" y="309.5" width="59" height="59" />
            <rect x="776.5" y="309.5" width="59" height="59" />
            <rect x="859.5" y="309.5" width="59" height="59" />
          </g>
          <g stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1">
            <path d="M611 291H919M611 285V297M919 285V297" />
            <path d="M640 383V390M723 383V390M806 383V390M889 383V390" />
          </g>
        </svg>
      </div>

      <div className="mt-6 grid shrink-0 grid-cols-3 divide-x divide-[var(--border)] border-y border-[var(--border)]">
        {[item0, item1, item2].map((item, index) => (
          <article
            key={index}
            className={`min-w-0 py-5 ${
              index === 0 ? 'pr-6' : index === 2 ? 'pl-6' : 'px-6'
            }`}
          >
            <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.12] tracking-[-0.035em]">
              {item?.title || item?.label}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              <Emphasis text={item?.body} />
            </p>
          </article>
        ))}
      </div>

      {telemetry && (
        <div className="mt-5 flex shrink-0 items-center gap-7 border border-[var(--border)] bg-[var(--surface)] px-7 py-4">
          <div className="flex shrink-0 items-baseline gap-2 text-[var(--accent)]">
            {qualifier && (
              <span className="font-[var(--font-body)] text-[22px]">
                {qualifier}
              </span>
            )}
            <span className="font-[var(--font-mono)] text-[48px] font-bold leading-none tabular-nums">
              {metric}
            </span>
            {unit && (
              <span className="font-[var(--font-body)] text-[22px]">
                {unit}
              </span>
            )}
          </div>
          <div className="h-10 w-px shrink-0 bg-[var(--border)]" />
          <p className="min-w-0 font-[var(--font-body)] text-[24px] leading-snug">
            {telemetry?.[0]?.label}
          </p>
        </div>
      )}
    </section>
  );
}