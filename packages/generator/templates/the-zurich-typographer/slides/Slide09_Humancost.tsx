import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const entries = [
  {
    entity: 'Civilian and military casualties',
    label: 'thousands',
    body: 'The supplied text gives no exact casualty total.',
  },
  {
    entity: 'Anti-government protesters massacred',
    label: 'thousands',
    body: 'The article presents this as an American rationale for initiating war.',
  },
] as const;

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const headingId = `${slide.id}-heading`;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-labelledby={headingId}
    >
      <header className="shrink-0 pt-8">
        <p className="font-[var(--font-mono)] text-[22px] font-medium uppercase leading-normal tracking-[0.16em]">
          THE HUMAN RECORD
        </p>

        <h1
          id={headingId}
          className="mt-10 max-w-[920px] font-[var(--font-headline)] text-[68px] font-bold leading-[1.06] tracking-[-0.045em]"
        >
          Thousands, Without
          <br />
          An Exact Count
        </h1>

        <p className="mt-9 max-w-[780px] font-[var(--font-body)] text-[28px] leading-normal">
          Separate descriptions must remain separate; neither supplies an exact
          total.
        </p>
      </header>

      <div className="mt-24 flex min-h-0 flex-1 flex-col">
        <dl className="m-0 w-full">
          {entries.map((entry, index) => (
            <React.Fragment key={entry.entity}>
              {index > 0 && (
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="block h-[2px] w-full"
                  viewBox="0 0 952 2"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 1H952"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              )}

              <div className="relative grid min-h-[390px] grid-cols-[300px_minmax(0,1fr)] items-start gap-x-10 py-16 pl-8">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="absolute left-0 top-[76px] h-8 w-3 text-[var(--accent)]"
                  viewBox="0 0 12 32"
                >
                  <path
                    d="M2 0V32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </svg>

                <dt className="pt-1 font-[var(--font-headline)] text-[34px] font-semibold leading-[1.2] tracking-[-0.025em]">
                  {entry.entity}
                </dt>

                <dd className="m-0 min-w-0">
                  <p className="whitespace-nowrap font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.055em]">
                    {entry.label}
                  </p>
                  <p className="mt-9 max-w-[530px] font-[var(--font-body)] text-[28px] leading-normal">
                    {entry.body}
                  </p>
                </dd>
              </div>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </section>
  );
}