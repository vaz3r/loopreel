import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  void brand;

  return (
    <section
      aria-label={`Slide 2 of ${totalSlides}: One Account. Two Service Worlds.`}
      className="flex h-full min-h-0 w-full flex-col justify-between gap-7 py-10 text-[var(--ink)]"
    >
      <header className="shrink-0">
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
          <p className="font-[var(--font-headline)] text-[20px] font-bold tracking-[0.12em] text-[var(--accent)]">
            THE CROSS-SERVICE BRIDGE
          </p>
          <span className="font-[var(--font-mono)] text-[20px]">02</span>
        </div>

        <h1 className="mt-7 max-w-[860px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          One Account.
          <br />
          Two Service Worlds.
        </h1>

        <p className="mt-5 max-w-[800px] font-[var(--font-body)] text-[26px] leading-snug">
          Disney relied on streaming consent and later parks acceptance.
        </p>
      </header>

      <figure
        aria-label="One account connects streaming entry with parks reinforcement."
        className="relative flex min-h-0 flex-1 items-center justify-center"
      >
        <svg
          viewBox="0 0 952 460"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="block h-full max-h-[460px] w-full"
          fill="none"
        >
          {/* Open registration marks give the diagram a printed-document finish. */}
          <path
            d="M0 32H28M14 18V46M924 32H952M938 18V46"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <text
            x="381"
            y="38"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
            letterSpacing="3"
          >
            ONE ACCOUNT
          </text>

          <circle
            cx="381"
            cy="112"
            r="43"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle
            cx="381"
            cy="112"
            r="33"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx="381" cy="112" r="8" fill="var(--accent)" />

          {/* A common consent conduit branches into two service contexts. */}
          <path
            d="M381 155V213M381 213H166V300M381 213H690V300"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle cx="381" cy="213" r="5" fill="var(--accent)" />

          <path
            d="M159 287L166 300L173 287M683 287L690 300L697 287"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <circle
            cx="166"
            cy="345"
            r="42"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M154 327L181 345L154 363Z"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <circle
            cx="690"
            cy="345"
            r="42"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M672 362V329M690 362V329M708 362V329M672 329Q690 308 708 329"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Small annotation flags, not boxed flowchart containers. */}
          <path
            d="M218 307V339M218 307H248L240 317H218M742 307V339M742 307H772L764 317H742"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <path
            d="M166 387V437M690 387V437"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx="166" cy="437" r="3" fill="var(--accent)" />
          <circle cx="690" cy="437" r="3" fill="var(--accent)" />
        </svg>
      </figure>

      <div className="grid shrink-0 grid-cols-[2fr_3fr] border-t border-[var(--border)]">
        <article className="border-r border-[var(--border)] pr-8 pt-6">
          <p className="mb-3 font-[var(--font-mono)] text-[20px] tracking-[0.12em] text-[var(--accent)]">
            01 / STREAMING
          </p>
          <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
            {item0?.label ?? 'Streaming Entry'}
          </h2>
          <p className="mt-4 font-[var(--font-body)] text-[24px] leading-snug">
            {item0?.body ??
              'The subscriber agreement incorporated broader Disney terms.'}
          </p>
        </article>

        <article className="pl-8 pt-6">
          <p className="mb-3 font-[var(--font-mono)] text-[20px] tracking-[0.12em] text-[var(--accent)]">
            02 / PARKS
          </p>
          <div className="border-t border-[var(--accent)] bg-[var(--surface)] px-6 pb-5 pt-4">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item1?.label ?? 'Parks Reinforcement'}
            </h2>
            <p className="mt-4 font-[var(--font-body)] text-[24px] leading-snug">
              {item1?.body ??
                'Disney also cited account acceptance and ticket purchases.'}
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}