import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

function Emphasis({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split(/(\*\*.*?\*\*)/g).map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index}>{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

export default function Slide07({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const visualId = React.useId();

  return (
    <section className="editorial-slide">
      <header className="editorial-header">
        <div className="editorial-kicker">
          <span className="editorial-kicker-dot" />
          <span>{slide.kicker}</span>
        </div>

        <h1 className="editorial-headline">{slide.headline}</h1>

        {slide.subheadline && (
          <p className="editorial-subheadline">{slide.subheadline}</p>
        )}
      </header>

      <div className="editorial-visual-frame editorial-visual-compact h-[320px] shrink-0">
        <svg
          viewBox="0 0 952 420"
          className="h-full w-full"
          role="img"
          aria-labelledby={`${visualId}-title ${visualId}-description`}
        >
          <title id={`${visualId}-title`}>
            Two boarding passes enter a mechanical deal selector
          </title>
          <desc id={`${visualId}-description`}>
            Route 01 leads to a negotiated voucher. Route 02 leads to an
            immediately negotiable check. Both routes receive equal visual
            emphasis. An orange clock marks the conditional 24-hour payment
            exception explained below.
          </desc>

          {/* Mechanical registration marks, not placeholder writing. */}
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M18 84V66H36" />
            <path d="M18 326V344H36" />
            <path d="M898 32H916V50" />
            <path d="M898 372H916V354" />
            <circle cx="310" cy="210" r="33" />
            <path d="M267 210H277M343 210H353M310 167V177M310 243V253" />
          </g>

          {/* Stacked seat specimens: identical weight, identical seat. */}
          {[104, 216].map((y) => (
            <g key={y}>
              <path
                d={`
                  M44 ${y}
                  H228 V${y + 34}
                  A11 11 0 0 0 228 ${y + 56}
                  V${y + 90} H44 V${y + 56}
                  A11 11 0 0 0 44 ${y + 34}
                  Z
                `}
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeWidth="2"
              />

              {Array.from({ length: 8 }, (_, index) => (
                <circle
                  key={index}
                  cx="174"
                  cy={y + 12 + index * 9.5}
                  r="1.6"
                  fill="var(--ink)"
                />
              ))}

              <text
                x="108"
                y={y + 59}
                fill="var(--ink)"
                textAnchor="middle"
                fontSize="40"
                fontWeight="700"
                className="[font-family:var(--font-mono)]"
              >
                12A
              </text>

              <circle
                cx="201"
                cy={y + 45}
                r="8"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
            </g>
          ))}

          {/* A shared selector feeds physically separate, equally weighted rails. */}
          <g
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          >
            <path d="M230 149H258L294 197" />
            <path d="M230 261H258L294 223" />

            <path d="M326 202H350V105H456" />
            <path d="M326 218H350V242H456" />

            <circle cx="350" cy="105" r="5" fill="var(--paper)" />
            <circle cx="350" cy="242" r="5" fill="var(--paper)" />
          </g>

          <g stroke="var(--accent)" strokeWidth="3">
            <circle cx="310" cy="210" r="19" fill="var(--paper)" />
            <path d="M299 220L321 200" fill="none" />
            <circle cx="310" cy="210" r="4" fill="var(--accent)" />
          </g>

          {/* Route 01: perforated negotiated-voucher specimen. */}
          <g>
            <path
              d="
                M458 32H876V93
                A12 12 0 0 0 876 117
                V178H458V117
                A12 12 0 0 0 458 93
                Z
              "
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            {Array.from({ length: 14 }, (_, index) => (
              <circle
                key={index}
                cx="750"
                cy={43 + index * 9.5}
                r="1.6"
                fill="var(--ink)"
              />
            ))}

            <g fill="none" stroke="var(--ink)" strokeWidth="1.5">
              <path d="M480 58H494M480 58V72" />
              <path d="M724 58H710M724 58V72" />
              <path d="M480 152H494M480 152V138" />
              <path d="M724 152H710M724 152V138" />
              <circle cx="604" cy="105" r="35" />
              <circle cx="604" cy="105" r="25" />
              <path d="M604 86L623 105L604 124L585 105Z" />
              <circle cx="604" cy="105" r="5" />
            </g>

            <text
              x="812"
              y="119"
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="38"
              fontWeight="700"
              className="[font-family:var(--font-mono)]"
            >
              01
            </text>
          </g>

          {/* Route 02: check geometry without invented bank details or amount. */}
          <g>
            <rect
              x="456"
              y="224"
              width="422"
              height="148"
              rx="2"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="2"
            />

            <rect
              x="468"
              y="236"
              width="398"
              height="124"
              rx="1"
              fill="none"
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            {/* Security rosette: sixteen interlocking elliptical petals. */}
            <g fill="none" stroke="var(--ink)" strokeWidth="1">
              {Array.from({ length: 16 }, (_, index) => (
                <ellipse
                  key={index}
                  cx="530"
                  cy="283"
                  rx="10"
                  ry="27"
                  transform={`rotate(${index * 22.5} 530 298)`}
                />
              ))}
              <circle cx="530" cy="298" r="33" />
              <circle cx="530" cy="298" r="12" />
            </g>

            {/* Abstract bank seal: pediment, columns, and stepped foundation. */}
            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeLinejoin="miter"
            >
              <circle cx="637" cy="280" r="31" />
              <circle cx="637" cy="280" r="26" />
              <path d="M619 272L637 260L655 272Z" />
              <path d="M623 276V291" />
              <path d="M632 276V291" />
              <path d="M642 276V291" />
              <path d="M651 276V291" />
              <path d="M619 295H655" />
              <path d="M616 299H658" />
            </g>

            {/* One real signature baseline; deliberately no simulated writing. */}
            <path
              d="M698 338H845"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />

            <text
              x="812"
              y="285"
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="38"
              fontWeight="700"
              className="[font-family:var(--font-mono)]"
            >
              02
            </text>
          </g>

          {/* Timing exception: orange is reserved for condition and selection. */}
          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          >
            <path
              d="M431 316H443V260H456"
              strokeDasharray="5 6"
            />
            <circle
              cx="378"
              cy="316"
              r="53"
              fill="var(--paper)"
            />

            {Array.from({ length: 12 }, (_, index) => (
              <line
                key={index}
                x1="378"
                y1="272"
                x2="378"
                y2={index % 3 === 0 ? 281 : 277}
                transform={`rotate(${index * 30} 378 316)`}
              />
            ))}

            <path d="M378 286V316L399 328" strokeWidth="3" />
            <circle cx="378" cy="316" r="3" fill="var(--accent)" />
            <path d="M378 369V378" />

            <rect
              x="330"
              y="378"
              width="96"
              height="36"
              rx="2"
              fill="var(--paper)"
            />
          </g>

          <text
            x="378"
            y="404"
            textAnchor="middle"
            fill="var(--accent)"
            fontSize="28"
            fontWeight="700"
            className="[font-family:var(--font-mono)]"
          >
            24 h
          </text>
        </svg>
      </div>

      {/* Numbered HTML keys connect the outcomes without crossing leaders. */}
      <div className="layout-grid-2">
        <article className="editorial-card flex flex-col gap-3">
          <div>
            <span className="editorial-metric-badge">01</span>
          </div>
          <h2 className="editorial-card-title">{item0?.title}</h2>
          <p className="editorial-card-body">
            <Emphasis text={item0?.body} />
          </p>
        </article>

        <article className="editorial-card flex flex-col gap-3">
          <div>
            <span className="editorial-metric-badge">02</span>
          </div>
          <h2 className="editorial-card-title">{item1?.title}</h2>
          <p className="editorial-card-body">
            <Emphasis text={item1?.body} />
          </p>
        </article>
      </div>

      {/* Content-level timing notice, not a second publication footer. */}
      <aside
        aria-label="Payment timing exception"
        className="shrink-0"
      >
        <div
          aria-hidden="true"
          className="mb-3 h-px w-full bg-[var(--accent)]"
        />
        <p className="editorial-note !text-[22px] leading-snug">
          <Emphasis text={slide.footer} />
          <span className="mt-2 block">
            This is an <strong className="text-[var(--accent)]">exception</strong>,
            not the normal payment deadline.
          </span>
        </p>
      </aside>
    </section>
  );
}