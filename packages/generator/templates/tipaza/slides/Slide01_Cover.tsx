import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CoverContent = {
  publication?: string;
  domain?: string;
  kicker?: string;
  headline?: string;
  subheadline?: string;
  issueBadge?: string;
  telemetry?: Array<{ badge?: string; label?: string }>;
};

export default function Slide01({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as CoverContent;
  const telemetry = content.telemetry ?? [
    { badge: '1857', label: 'Modern town founded' },
    { badge: '430 CE', label: 'Vandal destruction' },
  ];

  const headline =
    content.headline ?? 'Tipaza Returned. Its Continuity Was Broken.';
  const headlineLines =
    headline === 'Tipaza Returned. Its Continuity Was Broken.'
      ? ['Tipaza Returned.', 'Its Continuity', 'Was Broken.']
      : [headline];

  const theme = {
    '--paper': '#0D0E12',
    '--ink': '#F1F3F9',
    '--accent': '#FF4D00',
    '--surface': '#161820',
    '--border': '#F1F3F925',
  } as React.CSSProperties;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      style={theme}
    >
      <div className="flex h-full min-h-0 flex-col gap-8 bg-[var(--paper)]">
        <div className="shrink-0 border-t-2 border-[var(--ink)] pt-5">
          <div className="flex items-baseline justify-between gap-6">
            <p className="font-[var(--font-headline)] text-[38px] font-semibold leading-none tracking-[-0.035em]">
              {content.publication ?? 'Custom Brand'}
            </p>
            <p className="font-[var(--font-mono)] text-[20px] leading-none tracking-[0.08em]">
              {content.domain ?? 'tipaza.pub'}
            </p>
          </div>

          <p className="mt-5 font-[var(--font-mono)] text-[20px] leading-snug tracking-[0.12em] text-[var(--accent)]">
            {content.issueBadge ?? 'SPECIAL REPORT · 5 SLIDES'}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-7">
          <p className="border-l-[4px] border-[var(--accent)] py-1 pl-4 font-[var(--font-mono)] text-[20px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
            {content.kicker ?? 'ANCIENT CITIES / BROKEN CONTINUITY'}
          </p>

          <h1
            aria-label={headline}
            className="m-0 w-full font-[var(--font-headline)] text-[72px] font-bold leading-[1.02] tracking-[-0.04em]"
          >
            {headlineLines.map((line, index) => (
              <span
                key={index}
                aria-hidden="true"
                className={`block ${
                  index === 2 ? 'text-[var(--accent)]' : ''
                }`}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="max-w-[850px] font-[var(--font-body)] text-[30px] leading-snug tracking-[-0.015em]">
            {content.subheadline ??
              'Trace an imperial hub’s transformation—and why its modern foundation means resettlement.'}
          </p>
        </div>

        <div className="relative min-h-[580px] flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1080 1350"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="A monumental classical column fractured in orange, its lower section displaced from the original axis."
            className="absolute inset-0 h-full w-full"
          >
            <rect width="1080" height="1350" fill="var(--paper)" />

            <path
              d="M80 80V1270H1000"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M80 80H126M80 1270H126"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Broad capital, tapering shaft, and an irregular break. */}
            <g fill="var(--ink)">
              <path d="M234 120H806V164H234Z" />
              <path d="M258 178H782V222H258Z" />
              <path d="M282 236H758L716 304H324Z" />
              <path d="M324 318H716V362H324Z" />
              <path d="M346 376H694L714 853L622 832L548 866L454 842L326 879Z" />
            </g>

            {/* Fluting is cut directly into the silhouette. */}
            <g
              fill="none"
              stroke="var(--paper)"
              strokeWidth="15"
              strokeLinecap="square"
            >
              <path d="M393 399L384 840" />
              <path d="M456 399L452 811" />
              <path d="M520 399V834" />
              <path d="M584 399L588 814" />
              <path d="M647 399L657 820" />
            </g>

            {/* One continuous orange fracture—not a connector. */}
            <path
              d="M326 895L454 858L548 882L622 848L714 869
                 L714 885L622 864L548 898L454 874L326 911Z"
              fill="var(--accent)"
            />

            {/* Displaced lower shaft and plinth. */}
            <g fill="var(--ink)">
              <path d="M412 952L536 917L630 940L706 907L800 929L812 1128H400Z" />
              <path d="M376 1144H836V1184H376Z" />
              <path d="M344 1198H868V1240H344Z" />
              <path d="M320 1254H892V1270H320Z" />
            </g>

            <g
              fill="none"
              stroke="var(--paper)"
              strokeWidth="15"
              strokeLinecap="square"
            >
              <path d="M465 967L462 1104" />
              <path d="M528 953L526 1104" />
              <path d="M592 961V1104" />
              <path d="M656 952L658 1104" />
              <path d="M719 954L724 1104" />
            </g>

            <path
              d="M916 1254H1000"
              stroke="var(--accent)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-8 border-t border-[var(--border)] pt-6 pb-2">
          {telemetry.slice(0, 2).map((item, index) => (
            <div
              key={`${item.badge}-${index}`}
              className={
                index === 1
                  ? 'min-w-0 border-l border-[var(--border)] pl-8'
                  : 'min-w-0'
              }
            >
              <p className="font-[var(--font-mono)] text-[48px] font-bold leading-none tracking-[-0.045em]">
                {item.badge}
              </p>
              <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}