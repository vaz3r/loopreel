import React from 'react';
import { type SlideComponentProps } from '../../../src/skeleton/types';

function EmphasizedCopy({ text }: { text?: string }) {
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

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];

  const findings = [
    { item: item0, top: 'top-[16.25%]' },
    { item: item1, top: 'top-[50%]' },
    { item: item2, top: 'top-[83.75%]' },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full justify-between text-[var(--ink)]">
      <header className="shrink-0">
        {slide.kicker && (
          <div className="flex items-center gap-2.5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
            />
            <span>{slide.kicker}</span>
          </div>
        )}

        <h1 className="mt-5 max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em] [text-wrap:balance]">
          {slide.headline}
        </h1>
      </header>

      <div className="relative my-6 flex min-h-0 flex-1 flex-col justify-between border-y border-[var(--border)]">
        <div aria-hidden="true" className="min-h-6 flex-1" />

        <div className="relative aspect-[952/480] w-full shrink-0">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 952 480"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            {/* Continuous examination spine; markers are reading anchors. */}
            <path
              d="M70 34V442"
              stroke="var(--border)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />

            <g fill="var(--ink)">
              <rect x="64" y="72" width="12" height="12" />
              <rect x="64" y="234" width="12" height="12" />
              <rect x="64" y="396" width="12" height="12" />
            </g>

            {/* Intact stored-value card section. */}
            <g strokeWidth="1">
              <path
                d="M740 39L758 27H920V105L902 117"
                stroke="var(--border)"
                strokeLinejoin="miter"
              />
              <path d="M902 39L920 27" stroke="var(--border)" />
              <rect
                x="740"
                y="39"
                width="162"
                height="78"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity="0.65"
              />
            </g>

            {/* Detached accounting stratum; the only accented layer. */}
            <g strokeWidth="1">
              <path
                d="M740 199L758 187H920V211L902 223"
                stroke="var(--border)"
                strokeLinejoin="miter"
              />
              <path d="M902 199L920 187" stroke="var(--border)" />
              <rect
                x="740"
                y="199"
                width="162"
                height="24"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity="0.55"
              />

              <path
                d="M740 237L758 225H920V243L902 255H740Z"
                fill="var(--accent)"
                fillOpacity="0.18"
                stroke="var(--accent)"
              />
              <rect
                x="740"
                y="237"
                width="162"
                height="18"
                fill="var(--accent)"
              />
              <path d="M902 237L920 225" stroke="var(--accent)" />

              <path
                d="M740 273L758 261H920V285L902 297"
                stroke="var(--border)"
                strokeLinejoin="miter"
              />
              <path d="M902 273L920 261" stroke="var(--border)" />
              <rect
                x="740"
                y="273"
                width="162"
                height="24"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity="0.55"
              />
            </g>

            {/* Contractual perimeter stays closed and unbroken. */}
            <g strokeWidth="1">
              <path
                d="M740 363L758 351H920V429L902 441"
                stroke="var(--border)"
                strokeLinejoin="miter"
              />
              <path d="M902 363L920 351" stroke="var(--border)" />
              <rect
                x="740"
                y="363"
                width="162"
                height="78"
                fill="var(--surface)"
                stroke="var(--ink)"
              />
              <rect
                x="752"
                y="375"
                width="138"
                height="54"
                stroke="var(--border)"
              />
            </g>
          </svg>

          <ol className="absolute inset-0 m-0 list-none p-0">
            {findings.map(({ item, top }, index) => (
              <li
                key={`${slide.id}-${index}`}
                className={`absolute left-[11.764706%] w-[61%] -translate-y-1/2 pr-7 ${top}`}
              >
                <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[1.1] tracking-[-0.035em]">
                  {item?.title}
                </h2>
                <p className="mt-3 max-w-[540px] font-[var(--font-body)] text-[24px] leading-snug text-[var(--ink)]/80">
                  <EmphasizedCopy text={item?.body} />
                </p>
              </li>
            ))}
          </ol>
        </div>

        <div aria-hidden="true" className="min-h-6 flex-1" />
      </div>
    </section>
  );
}