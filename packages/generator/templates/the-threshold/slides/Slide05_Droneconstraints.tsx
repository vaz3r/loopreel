import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const gateLabelId = React.useId();

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0 pb-8">
        <p className="font-[var(--font-mono)] text-[21px] leading-none tracking-[0.16em] text-[var(--accent)]">
          THE FLIGHT CONDITIONS
        </p>

        <h1 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Eight Minutes, With
          <br />
          Conditions Attached
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-[1.35]">
          Flight duration, navigation surfaces and subscriber access constrain
          the drone&apos;s promise.
        </p>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[1fr_1fr_1fr] border-t border-[var(--ink)]">
        <article className="grid grid-cols-[minmax(0,1fr)_180px] items-center gap-8 border-b border-[var(--ink)] py-6">
          <div className="min-w-0">
            <h2 className="font-[var(--font-mono)] text-[88px] font-bold leading-none tracking-[-0.065em] text-[var(--accent)]">
              8 minutes
            </h2>
            <p className="mt-5 max-w-[650px] font-[var(--font-body)] text-[26px] leading-[1.35]">
              On a new, fully-charged battery under controlled conditions.
            </p>
          </div>

          <svg
            width="180"
            height="156"
            viewBox="0 0 180 156"
            fill="none"
            aria-hidden="true"
            className="block text-[var(--ink)]"
          >
            <path
              d="M16 44H150V112H16V44Z"
              stroke="currentColor"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M150 65H163V91H150"
              stroke="currentColor"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M32 59V97M53 59V97M74 59V97M95 59V97M116 59V97M137 59V97"
              stroke="var(--accent)"
              strokeWidth="7"
            />
            <path
              d="M16 22V30M150 22V30M16 26H150M16 126V134M150 126V134M16 130H150"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
          </svg>
        </article>

        <article className="grid grid-cols-[minmax(0,1fr)_180px] items-center gap-8 border-b border-[var(--ink)] py-6">
          <div className="min-w-0">
            <h2 className="max-w-[680px] font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.025em]">
              Navigation may degrade near
            </h2>
            <p className="mt-4 max-w-[690px] font-[var(--font-body)] text-[26px] leading-[1.4]">
              Polished marble, wet tile, featureless blank matte walls,
              frameless glass and mirrors.
            </p>
          </div>

          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            aria-hidden="true"
            className="block text-[var(--ink)]"
          >
            <path
              d="M105 21L158 39V137L105 159V21Z"
              fill="var(--surface)"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M118 48L145 58M118 61L145 71M118 112L145 122"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M105 21V159"
              stroke="var(--accent)"
              strokeWidth="3"
            />
            <circle cx="26" cy="103" r="7" fill="currentColor" />
            <path
              d="M36 99L105 70L57 30"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <path
              d="M36 108L105 125L67 159"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeDasharray="5 7"
            />
            <path
              d="M57 30L60 42M57 30L70 31"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <path
              d="M84 70H128M84 125H128"
              stroke="var(--border)"
              strokeWidth="1.5"
              strokeDasharray="3 5"
            />
          </svg>
        </article>

        <article className="grid grid-cols-[minmax(0,1fr)_180px] items-center gap-8 border-b border-[var(--ink)] py-6">
          <div className="min-w-0">
            <h2
              id={gateLabelId}
              className="max-w-[680px] font-[var(--font-headline)] text-[36px] font-semibold leading-[1.15] tracking-[-0.025em]"
            >
              Amazon Ring Protect subscribers
            </h2>
            <p className="mt-4 max-w-[660px] font-[var(--font-body)] text-[26px] leading-[1.4]">
              Set-route and scheduled operation described; subscription price
              not stated.
            </p>
          </div>

          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
            role="img"
            aria-labelledby={gateLabelId}
            className="block text-[var(--ink)]"
          >
            {/* The editorial heading labels the gate via this leader. */}
            <path
              d="M0 35H88V50"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <circle cx="88" cy="50" r="3" fill="var(--accent)" />

            <path
              d="M63 140V62H113V140"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M72 140V72H104V140"
              stroke="var(--border)"
              strokeWidth="1.5"
            />
            <path
              d="M56 140H79M98 140H121"
              stroke="currentColor"
              strokeWidth="3"
            />

            <path
              d="M15 139V110H88H151V78H168"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle
              cx="15"
              cy="139"
              r="6"
              fill="var(--surface)"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
            <circle cx="88" cy="110" r="6" fill="var(--accent)" />
            <path
              d="M159 70L168 78L159 86"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </svg>
        </article>
      </div>
    </section>
  );
}