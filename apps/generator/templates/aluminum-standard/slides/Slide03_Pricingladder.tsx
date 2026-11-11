import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const tiers = [
  {
    label: 'M6 starting price',
    value: '$1,999',
    body: 'Includes 16GB RAM and mandatory 1TB storage.',
    inset: 'ml-0',
  },
  {
    label: 'Increase over M5’s original starting price',
    value: '+$400',
    body: 'Compared with the starting price from a year ago.',
    inset: 'ml-6',
  },
  {
    label: 'Increase over basic M1 MacBook Pro',
    value: '+$700',
    body: 'Compared with the basic model from 2020.',
    inset: 'ml-12',
  },
  {
    label: 'Optional nano-texture matte finish',
    value: '+$150',
    body: 'Not included in the $1,999 starting price.',
    inset: 'ml-[72px]',
  },
];

export default function Slide03({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  const headingId = React.useId();

  return (
    <section
      aria-labelledby={headingId}
      className="flex h-[1028px] w-full max-w-[952px] flex-col gap-7 text-[var(--ink)]"
    >
      <header className="grid shrink-0 grid-cols-[1fr_120px] items-start gap-8">
        <div>
          <h2
            id={headingId}
            className="max-w-[760px] font-[var(--font-headline)] text-[48px] font-semibold leading-[1.04] tracking-[-0.045em]"
          >
            The Entry Price
            <br />
            Keeps Climbing
          </h2>
          <p className="mt-5 max-w-[690px] font-[var(--font-body)] text-[20px] leading-[1.4]">
            Historical comparisons expose the creep. The optional matte
            display costs extra.
          </p>
        </div>

        <svg
          aria-hidden="true"
          viewBox="0 0 120 132"
          fill="none"
          className="mt-1 h-[132px] w-[120px]"
        >
          <path
            d="M9 113H112M9 85H112M9 57H112M9 29H112"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M12 113V85H40V57H68V29H96V9"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="miter"
          />
          <path
            d="M87 18L96 9L105 18"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="square"
          />
          <path
            d="M12 119V125M40 119V125M68 119V125M96 119V125"
            stroke="var(--border)"
            strokeWidth="1"
          />
        </svg>
      </header>

      <div className="relative min-h-0 flex-1">
        <svg
          aria-hidden="true"
          viewBox="0 0 952 800"
          preserveAspectRatio="none"
          fill="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <path
            d="M1 1V199H25V403H49V607H73V799"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <ol className="relative grid h-full grid-rows-[1.08fr_1fr_1fr_1fr] gap-4">
          {tiers.map((tier, index) => {
            const isStartingPrice = index === 0;
            const isOptional = index === 3;

            return (
              <li
                key={tier.label}
                className={[
                  'relative grid min-h-0 grid-cols-[minmax(0,1fr)_230px]',
                  'items-center gap-6 border px-6 py-5',
                  tier.inset,
                  isOptional
                    ? 'border-dashed border-[var(--border)]'
                    : 'border-[var(--border)] bg-[var(--surface)]',
                ].join(' ')}
              >
                {isStartingPrice && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[5px] bg-[var(--accent)]"
                  />
                )}

                <div className="min-w-0">
                  <h3
                    className={[
                      'max-w-[470px] font-[var(--font-headline)]',
                      'text-[23px] font-semibold leading-[1.18] tracking-[-0.025em]',
                    ].join(' ')}
                  >
                    {tier.label}
                  </h3>
                  <p className="mt-3 max-w-[445px] font-[var(--font-body)] text-lg leading-snug">
                    {tier.body}
                  </p>
                </div>

                <div className="relative flex h-full flex-col justify-center border-l border-[var(--border)] pl-6">
                  <span
                    className={[
                      'whitespace-nowrap text-right font-[var(--font-mono)]',
                      'font-medium leading-none tracking-[-0.065em] tabular-nums',
                      isStartingPrice
                        ? 'text-[58px] text-[var(--accent)]'
                        : 'text-[52px]',
                    ].join(' ')}
                  >
                    {tier.value}
                  </span>

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 180 18"
                    fill="none"
                    className="mt-5 h-[18px] w-full"
                  >
                    <path
                      d="M1 9H179M1 4V14M179 4V14"
                      stroke="var(--border)"
                      strokeWidth="1"
                      strokeDasharray={isOptional ? '3 3' : undefined}
                    />
                    <path
                      d="M145 9H179M173 3L179 9L173 15"
                      stroke="var(--accent)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}