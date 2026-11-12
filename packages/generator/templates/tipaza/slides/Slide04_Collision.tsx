import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const milestones = [
    { item: items[0], destructive: true },
    { item: items[1], destructive: false },
    { item: items[2], destructive: true },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col gap-7">
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="h-[12px] w-[12px] shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.16em] text-[var(--accent)]">
            {slide.kicker}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="mt-9 border-t border-[var(--border)]" />

      <div className="mt-7 grid h-[1050px] shrink-0 grid-cols-1 grid-rows-1">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1080 1350"
          preserveAspectRatio="none"
          className="pointer-events-none col-start-1 row-start-1 h-full w-full"
          fill="none"
        >
          {/* A single chronological axis, interrupted at each destruction. */}
          <g stroke="var(--border)" strokeWidth="2">
            <path d="M80 0V160 M80 290V450" />
            <path d="M80 450V550 M80 800V900" />
            <path d="M80 900V1060 M80 1190V1350" />
          </g>

          {/* First rupture: two severed, displaced orange ends. */}
          <g
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M80 110V192L66 207" />
            <path d="M94 243L80 258V340" />
            <path d="M59 230L101 214" strokeWidth="3" />
          </g>

          {/* Reconstruction: an intact ink bridge rejoins the spine. */}
          <g
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M80 510V605L112 637V713L80 745V840" />
            <path d="M80 605L48 637V713L80 745" />
            <path d="M48 675H112" />
          </g>
          <rect
            x="72"
            y="667"
            width="16"
            height="16"
            fill="currentColor"
          />

          {/* Final rupture: a wider gap and a detached fragment. */}
          <g
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          >
            <path d="M80 1010V1087L64 1102" />
            <path d="M98 1153L80 1171V1260" />
            <path d="M61 1130L100 1114" strokeWidth="3" />
            <path d="M95 1134L104 1141" strokeWidth="3" />
          </g>

          {/* Quiet architectural ticks; these are not callout pointers. */}
          <g stroke="var(--border)" strokeWidth="2">
            <path d="M66 0H94 M66 450H94 M66 900H94 M66 1350H94" />
            <path d="M1000 80V1270" />
            <path d="M987 80H1000 M987 675H1000 M987 1270H1000" />
          </g>
        </svg>

        <ol className="z-10 col-start-1 row-start-1 m-0 grid h-full list-none grid-rows-3 p-0 pl-[148px] pr-[94px]">
          {milestones.map(({ item, destructive }, index) => {
            const badgeWords = (item?.badge ?? '').split(/\s+/);

            return (
              <li
                key={index}
                className={`flex min-h-0 flex-col justify-center gap-5 py-7 ${
                  index < 2 ? 'border-b border-[var(--border)]' : ''
                }`}
              >
                <p
                  className={`font-[var(--font-mono)] font-semibold tracking-[-0.035em] ${
                    index === 0
                      ? 'text-[48px] leading-[1.1]'
                      : 'text-[32px] leading-[1.15]'
                  } ${
                    destructive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {index === 0 ? (
                    item?.badge
                  ) : index === 1 ? (
                    <>
                      {badgeWords.slice(0, 2).join(' ')}
                      <br />
                      {badgeWords.slice(2).join(' ')}
                    </>
                  ) : (
                    <>
                      {badgeWords.slice(0, 4).join(' ')}
                      <br />
                      {badgeWords.slice(4).join(' ')}
                    </>
                  )}
                </p>

                <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.12] tracking-[-0.025em]">
                  {item?.label || item?.title}
                </h2>

                <p className="max-w-[640px] font-[var(--font-body)] text-[28px] leading-snug">
                  {item?.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        aria-hidden="true"
        className="mt-7 flex items-center gap-5"
      >
        <span className="h-px flex-1 bg-[var(--border)]" />
        <span className="h-[5px] w-[48px] bg-[var(--accent)]" />
      </div>
    </section>
  );
}