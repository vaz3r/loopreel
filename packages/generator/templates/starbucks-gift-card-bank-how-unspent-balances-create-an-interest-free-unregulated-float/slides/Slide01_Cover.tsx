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
  void brand;
  void totalSlides;

  const telemetry = (slide.telemetry ?? []).slice(0, 2);
  const headline = slide.headline ?? '';
  const headlineLines = headline
    .split(/(Interest-Free|Financing For)/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-6">
        <header className="shrink-0">
          <div className="inline-flex max-w-full rounded-full border border-[var(--accent)] bg-[var(--surface)] px-5 py-2.5 font-[var(--font-mono)] text-[20px] uppercase leading-[1.4] tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </div>

          <h1 className="mt-5 font-[var(--font-headline)] text-[68px] font-bold leading-[1.04] tracking-[-0.04em]">
            {headlineLines.map((line, index) => (
              <span
                key={`${index}-${line}`}
                className={`block ${
                  line === 'Interest-Free'
                    ? 'text-[var(--accent)]'
                    : 'text-[var(--ink)]'
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-[920px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)] opacity-80">
            {slide.subheadline}
          </p>
        </header>

        <div className="relative min-h-[270px] flex-1">
          <svg
            viewBox="0 0 1080 1350"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
            focusable="false"
          >
            <rect width="1080" height="1350" fill="#0A0A0C" />

            <g
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            >
              <path d="M72 550V526H96 M984 526H1008V550" />
              <path d="M72 800V824H96 M984 824H1008V800" />
              <path d="M72 675H1008" strokeDasharray="3 13" />
              <ellipse cx="828" cy="807" rx="145" ry="15" />
            </g>

            <g transform="rotate(-9 305 666)">
              <rect
                x="101"
                y="553"
                width="408"
                height="238"
                rx="19"
                fill="#0A0A0C"
                stroke="var(--border)"
                strokeWidth="2"
              />

              <rect
                x="89"
                y="540"
                width="408"
                height="238"
                rx="19"
                fill="var(--surface)"
                stroke="var(--ink)"
                strokeOpacity="0.38"
                strokeWidth="2"
              />

              <rect
                x="106"
                y="557"
                width="374"
                height="204"
                rx="10"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              />

              <path
                d="M219 541V777"
                stroke="var(--accent)"
                strokeWidth="25"
              />
              <path
                d="M90 648H497"
                stroke="var(--accent)"
                strokeWidth="25"
              />

              <g
                fill="none"
                stroke="var(--accent)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M219 634C176 637 153 603 172 588C193 573 220 603 219 634Z" />
                <path d="M219 634C221 597 249 575 266 592C283 611 251 637 219 634Z" />
              </g>

              <g
                fill="none"
                stroke="var(--ink)"
                strokeOpacity="0.42"
                strokeWidth="2"
              >
                <rect x="365" y="579" width="62" height="43" rx="8" />
                <path d="M386 579V622M407 579V622M365 600H427" />
                <path d="M323 721H427M368 735H427" />
              </g>
            </g>

            <path
              d="M493 620C557 608 568 590 616 590C665 590 671 660 715 660H751"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="25"
              strokeLinecap="butt"
              strokeLinejoin="round"
            />
            <path
              d="M732 631L774 660L732 689Z"
              fill="var(--accent)"
            />

            <g
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="round"
            >
              <path
                d="M765 580H936L915 782Q914 795 899 795H803Q788 795 787 782Z"
                fill="var(--surface)"
              />
              <path
                d="M759 571H942L948 589H753Z"
                fill="var(--surface)"
              />
              <path
                d="M776 553H924L936 571H765Z"
                fill="var(--surface)"
              />
              <path
                d="M781 677H926L919 745H788Z"
                fill="var(--border)"
                stroke="var(--border)"
              />
            </g>

            <circle
              cx="853"
              cy="710"
              r="23"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <path
              d="M843 710H863M853 700V720"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <g
              fill="none"
              stroke="var(--ink)"
              strokeOpacity="0.45"
              strokeWidth="3"
              strokeLinecap="round"
            >
              <path d="M822 538C807 526 835 515 823 503" />
              <path d="M863 537C848 525 876 514 864 502" />
            </g>
          </svg>
        </div>

        <div className="shrink-0">
          <div className="grid grid-cols-2 gap-6">
            {telemetry.map((item, index) => {
              const { qualifier, value: metric, unit } =
                parseMetricBadge(item.badge);

              return (
                <div
                  key={`${index}-${item.badge}`}
                  className="min-w-0 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-7 py-5"
                >
                  <div className="flex shrink-0 items-baseline gap-2">
                    {qualifier && (
                      <span className="font-[var(--font-body)] text-[22px]">
                        {qualifier}
                      </span>
                    )}

                    <span className="font-[var(--font-mono)] text-[56px] font-bold leading-none tabular-nums tracking-[-0.04em] text-[var(--accent)]">
                      {metric}
                    </span>

                    {unit && (
                      <span className="font-[var(--font-body)] text-[22px] text-[var(--accent)]">
                        {unit}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex items-center gap-5">
            <span className="inline-flex shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-2 font-[var(--font-mono)] text-[20px] uppercase leading-[1.4] tracking-[0.12em]">
              {slide.issueBadge}
            </span>
            <span
              className="h-px flex-1 bg-[var(--border)]"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}