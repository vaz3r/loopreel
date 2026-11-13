import React from 'react';
import { type SlideComponentProps } from '../../../src/skeleton/types';

function EditorialCopy({ text }: { text?: string }) {
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
  void brand;
  void totalSlides;

  const items = slide.items ?? [];
  const item0 = items[0];
  const item1 = items[1];
  const item2 = items[2];

  const stages = [
    { item: item0, position: 'top-[56px]', final: false },
    { item: item1, position: 'top-[220px]', final: false },
    { item: item2, position: 'top-[384px]', final: true },
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

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <div
          aria-hidden="true"
          className="my-6 w-full border-b border-[var(--border)]"
        />

        {slide.subheadline && (
          <p className="max-w-[820px] font-[var(--font-body)] text-[28px] leading-snug text-[var(--ink)]/80">
            {slide.subheadline}
          </p>
        )}
      </header>

      <div className="my-6 flex min-h-0 flex-1 flex-col justify-center">
        <div className="relative h-[512px] w-full shrink-0">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 952 480"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute left-0 top-0 h-[480px] w-full"
            fill="none"
          >
            {/* Narrative spine: sequence, not a time axis. */}
            <path
              d="M52 32V448"
              stroke="var(--ink)"
              strokeWidth="1"
              opacity="0.65"
            />

            <rect x="47" y="71" width="10" height="10" fill="var(--ink)" />
            <rect x="47" y="235" width="10" height="10" fill="var(--ink)" />
            <rect x="47" y="399" width="10" height="10" fill="#FF4D00" />

            {/* Closed stored-value card edge. */}
            <g stroke="var(--ink)" strokeWidth="1">
              <path
                d="M780 65L902 55L920 68L798 78Z"
                fill="var(--surface)"
              />
              <path
                d="M798 78L920 68V88L798 98Z"
                fill="var(--surface)"
              />
              <path d="M780 65V85L798 98V78" />
              <path d="M902 55V65" opacity="0.35" />
            </g>

            {/* Exposed liability strata: two distinct material layers. */}
            <g stroke="var(--ink)" strokeWidth="1">
              <path
                d="M780 219L902 209L920 222L798 232Z"
                fill="var(--surface)"
              />
              <path d="M798 232L920 222V235L798 245Z" />
              <path d="M780 219V232L798 245" />

              <path
                d="M780 250L902 240L920 253L798 263Z"
                fill="var(--surface)"
              />
              <path d="M798 263L920 253V266L798 276Z" />
              <path d="M780 250V263L798 276" />
            </g>

            {/* A narrow recognized accounting slice, isolated in space. */}
            <g strokeWidth="1">
              <path
                d="M780 393L902 383L920 396L798 406Z"
                stroke="var(--ink)"
                fill="var(--surface)"
              />
              <path
                d="M798 406L920 396V404L798 414Z"
                stroke="#FF4D00"
                fill="#FF4D00"
              />
              <path
                d="M780 393V401L798 414"
                stroke="var(--ink)"
              />
              <path
                d="M798 414V430M920 404V420"
                stroke="var(--border)"
              />
            </g>
          </svg>

          <ol className="relative m-0 h-full w-full list-none p-0">
            {stages.map(({ item, position, final }, index) => (
              <li
                key={item?.tag ?? index}
                className={`absolute left-[90px] right-[188px] grid grid-cols-[44px_minmax(0,1fr)] items-start gap-x-6 ${position}`}
              >
                <span
                  className={`font-[var(--font-mono)] text-[20px] leading-[40px] tracking-wider ${
                    final ? 'text-[var(--accent)]' : 'text-[var(--ink)]/65'
                  }`}
                >
                  {item?.tag}
                </span>

                <div className="min-w-0">
                  <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-[40px] tracking-[-0.025em]">
                    {item?.title}
                  </h2>

                  <p className="mt-3 max-w-[590px] font-[var(--font-body)] text-[26px] leading-snug text-[var(--ink)]/80">
                    <EditorialCopy text={item?.body} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-px w-full shrink-0 bg-[var(--border)]"
      />
    </section>
  );
}