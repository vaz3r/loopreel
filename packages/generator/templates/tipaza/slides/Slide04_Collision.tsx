import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({ slide }: SlideComponentProps) {
  const items = slide.items ?? [];
  const telemetry = slide.telemetry ?? [];

  const milestones = [
    { item: items[0], metric: telemetry[0], fractured: true },
    { item: items[1], metric: telemetry[1], fractured: false },
    { item: items[2], metric: telemetry[2], fractured: true },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col justify-center gap-14">
        <header className="flex flex-col gap-7">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="h-[22px] w-[6px] shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[20px] leading-[1.4] tracking-[0.12em] text-[var(--accent)] uppercase">
              {slide.kicker}
            </p>
          </div>

          <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em]">
            {slide.headline}
          </h1>

          <p className="max-w-[900px] font-[var(--font-body)] text-[28px] leading-[1.4]">
            {slide.subheadline}
          </p>
        </header>

        <div className="grid shrink-0 grid-cols-[132px_minmax(0,1fr)] grid-rows-[300px_300px_300px] gap-x-9 gap-y-14">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 132 1012"
            fill="none"
            className="col-start-1 row-start-1 row-span-3 h-[1012px] w-[132px]"
          >
            {/* A faint reference axis makes the broken chronology legible. */}
            <path
              d="M66 0V982"
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="3 13"
            />

            {/* Destruction: an orange structural segment sheared apart. */}
            <g stroke="var(--accent)">
              <circle cx="66" cy="22" r="17" strokeWidth="3" />
              <circle cx="66" cy="22" r="5" fill="var(--accent)" stroke="none" />
              <path d="M66 40V137L51 152L75 169" strokeWidth="6" />
              <path d="M57 191L81 208L66 223V291" strokeWidth="6" />
              <path d="M34 182L43 176M90 184L101 178" strokeWidth="2" />
              <path d="M56 277H76" strokeWidth="2" />
            </g>

            {/* Reconstruction: an ink-colored, visibly joined section. */}
            <g stroke="var(--ink)">
              <path d="M66 316V359" strokeWidth="6" />
              <circle cx="66" cy="378" r="17" strokeWidth="3" />
              <circle cx="66" cy="378" r="5" fill="var(--ink)" stroke="none" />
              <path d="M66 397V651" strokeWidth="6" />
              <path d="M51 474V564M81 474V564" strokeWidth="2" />
              <path d="M45 488H87M45 550H87" strokeWidth="3" />
              <path d="M57 519H75" strokeWidth="3" />
              <path d="M56 637H76" strokeWidth="2" />
            </g>

            {/* Demolition: a terminal break without a restored spine. */}
            <g stroke="var(--accent)">
              <path d="M66 680V715" strokeWidth="6" />
              <circle cx="66" cy="734" r="17" strokeWidth="3" />
              <circle cx="66" cy="734" r="5" fill="var(--accent)" stroke="none" />
              <path d="M66 753V826L49 844L73 861" strokeWidth="6" />
              <path d="M59 887L78 901L69 916" strokeWidth="5" />
              <path d="M40 917L34 930M88 938L99 944M59 957L65 966" strokeWidth="3" />
            </g>

            <path
              d="M24 995H108"
              stroke="var(--border)"
              strokeWidth="2"
            />
          </svg>

          {milestones.map(({ item, metric, fractured }, index) => {
            const badge = metric?.badge ?? item?.badge ?? '';
            const words = badge.split(/\s+/);
            const finalDateLines =
              index === 2 && words.length > 2
                ? [words.slice(0, -2).join(' '), words.slice(-2).join(' ')]
                : [badge];

            return (
              <article
                key={index}
                className="col-start-2 flex min-w-0 flex-col"
                style={{ gridRowStart: index + 1 }}
              >
                <p
                  className={`font-[var(--font-mono)] text-[36px] leading-[44px] tracking-[-0.025em] ${
                    fractured
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]'
                  }`}
                >
                  {finalDateLines.map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {lineIndex > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </p>

                <div className="mt-6 border-t border-[var(--border)] pt-5">
                  <h2 className="font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.025em]">
                    {item?.title || item?.label}
                  </h2>
                  <p className="mt-4 max-w-[740px] font-[var(--font-body)] text-[28px] leading-[1.4]">
                    {item?.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}