import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const milestones = [items[0], items[1]];
  const engravingId = React.useId().replace(/:/g, '');

  void brand;
  void totalSlides;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="flex flex-col gap-5 border-t border-[var(--border)] pt-7">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-snug tracking-[0.16em] text-[var(--accent)]">
          {slide.kicker}
        </p>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[900px] font-[var(--font-body)] text-[30px] leading-snug">
          {slide.subheadline}
        </p>
      </header>

      <div className="relative mt-8 aspect-[1080/1350] w-[92%] shrink-0 self-center">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1080 1350"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={`${engravingId}-hatch`}
              width="12"
              height="12"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(32)"
            >
              <path
                d="M0 0V12"
                stroke="var(--ink)"
                strokeWidth="1"
                opacity="0.12"
              />
            </pattern>
          </defs>

          {/* Quiet registration marks retain the eighty-unit margin. */}
          <g stroke="var(--border)" strokeWidth="1.5">
            <path d="M80 105V80H105 M975 80H1000V105" />
            <path d="M80 1245V1270H105 M975 1270H1000V1245" />
            <path d="M300 80H1000 M300 1270H1000" />
          </g>

          {/* A visibly fractured sequence, not a proportional time scale. */}
          <g stroke="var(--ink)" strokeWidth="2">
            <path d="M180 110V567" />
            <path d="M180 782V1240" />
          </g>

          <g
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="square"
          >
            <path d="M168 567L192 577L171 590" />
            <path d="M174 762L192 772L180 782" />
            <path d="M186 629L178 650" opacity="0.45" />
            <path d="M168 696L181 711" opacity="0.25" />
          </g>

          {/* Engraved fragments surrounding the first milestone. */}
          <g stroke="var(--ink)" strokeWidth="1.5" opacity="0.17">
            <path d="M96 260H132 M104 272H132 M112 284H132" />
            <path d="M96 386H132 M104 398H132 M112 410H132" />
            <path d="M320 147H936 M320 155H870" />
            <path d="M344 164H790" />
          </g>

          {/* Architecture behind the later panel progressively disappears. */}
          <g stroke="var(--ink)" strokeWidth="2" opacity="0.18">
            <path d="M286 852L466 713L646 852H286Z" />
            <path d="M312 844L466 730L620 844" />
            <path d="M328 822H604 M350 805H582 M374 788H558" />
            <path d="M306 858H638V878H306Z" />

            <path d="M328 878V1215H374V878" />
            <path d="M338 892V1200 M349 892V1200 M360 892V1200" />
            <path d="M316 1215H386V1230H316Z" />

            <path d="M442 878V1170 M488 878V1137" />
            <path d="M452 893V1150 M464 893V1118 M477 893V1094" />

            <path d="M556 878V1008 M602 878V965" />
            <path d="M568 891V974 M580 891V950" />

            <path d="M650 854L754 773L817 823" />
            <path d="M673 850L754 790L789 818" />
            <path d="M668 878H740 M765 878H798" />
            <path d="M685 891V948 M729 891V920" />

            <path d="M844 846L872 824 M886 817L913 838" />
            <path d="M851 878H874 M903 879H917" />

            <path d="M286 1244H608 M630 1244H741 M771 1244H817" />
            <path d="M306 1256H555 M583 1256H659" />
          </g>

          <path
            d="M328 878H374V1215H328Z"
            fill={`url(#${engravingId}-hatch)`}
          />
          <path
            d="M286 1244H608V1256H306Z"
            fill={`url(#${engravingId}-hatch)`}
          />

          {/* Both nodes share the coordinate system of the spine. */}
          {[337.5, 1012.5].map((cy) => (
            <g key={cy}>
              <circle
                cx="180"
                cy={cy}
                r="31"
                fill="var(--paper, #0D0E12)"
                stroke="var(--accent)"
                strokeWidth="1.5"
              />
              <circle
                cx="180"
                cy={cy}
                r="13"
                fill="var(--accent)"
              />
              <path
                d={`M137 ${cy}H145 M215 ${cy}H223`}
                stroke="var(--accent)"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>

        {/* Each row shares its vertical center with its SVG milestone. */}
        <ol className="absolute inset-0 m-0 grid list-none grid-rows-2 p-0">
          {milestones.map((item, index) => (
            <li
              key={index}
              className="grid min-h-0 grid-cols-[27.7778%_64.8148%_7.4074%] items-center"
            >
              <article className="col-start-2 relative min-w-0 border-y border-[var(--border)] bg-[var(--surface)] px-8 py-9">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-9 h-16 w-[3px] bg-[var(--accent)]"
                />

                <p className="font-[var(--font-mono)] text-[52px] font-bold leading-none tracking-[-0.05em] text-[var(--accent)]">
                  {item?.badge}
                </p>

                <h2 className="mt-6 font-[var(--font-headline)] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em]">
                  {item?.title || item?.label}
                </h2>

                <div
                  aria-hidden="true"
                  className="my-6 h-px w-16 bg-[var(--accent)]"
                />

                <p className="font-[var(--font-body)] text-[28px] leading-snug">
                  {item?.body}
                </p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}