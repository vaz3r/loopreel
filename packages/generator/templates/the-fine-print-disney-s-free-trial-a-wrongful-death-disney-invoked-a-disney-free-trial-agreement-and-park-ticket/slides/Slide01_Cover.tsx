import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { MousePointer2, FileText, Scale, Gavel } from 'lucide-react';

export default function Slide01({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-2 py-8 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center justify-between border-b border-[var(--border)] pb-4">
          <p className="font-[var(--font-mono)] text-[20px] font-medium tracking-[0.16em] text-[var(--accent)]">
            FINE PRINT AUTOPSY
          </p>
          <span className="font-[var(--font-mono)] text-[20px]">
            FILE / 01
          </span>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Disney Used Clicks
          <br />
          Against a Widower
        </h1>

        <p className="mt-5 max-w-[790px] font-[var(--font-body)] text-[26px] leading-snug">
          How everyday clicks became arguments against courtroom access.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          className="h-full max-h-[420px] w-full"
          role="img"
          aria-labelledby="slide01-visual-title slide01-visual-description"
        >
          <title id="slide01-visual-title">
            Everyday clicks and the argument for arbitration
          </title>
          <desc id="slide01-visual-description">
            An illustrated document highlights arbitration and crosses out court.
            Marginal annotations contrast courtroom access with an arbitrator.
            This illustration is not a verbatim contract excerpt.
          </desc>

          <path
            d="M20 49V23H46 M602 23H628V49 M20 367V393H46"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <foreignObject x="40" y="36" width="578" height="352">
            <div className="h-full bg-[var(--surface)] px-7 py-6">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-3">
                  <FileText
                    className="h-7 w-7 text-[var(--accent)]"
                    strokeWidth={1.5}
                  />
                  <span className="font-[var(--font-mono)] text-[22px]">
                    [§ CONCEPT]
                  </span>
                </div>
                <MousePointer2
                  className="h-8 w-8 text-[var(--ink)]"
                  strokeWidth={1.5}
                />
              </div>

              <p className="mt-5 font-[var(--font-mono)] text-[20px] uppercase tracking-[0.08em] text-[var(--accent)]">
                Disney’s Bid
              </p>

              <p className="mt-3 font-[var(--font-body)] text-[34px] leading-[1.45]">
                Move the{' '}
                <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-[7px]">
                  death claim
                </span>
                <br />
                from{' '}
                <span className="line-through decoration-[var(--accent)] decoration-[3px]">
                  court
                </span>{' '}
                to
                <br />
                <mark className="bg-[#FEF08A] px-1.5 py-0.5 font-mono font-medium text-[#121212]">
                  arbitration.
                </mark>
              </p>

              <p className="mt-5 font-[var(--font-mono)] text-[20px] leading-snug opacity-70">
                Illustration · not verbatim contract text
              </p>
            </div>
          </foreignObject>

          <Scale
            x={696}
            y={45}
            width={54}
            height={54}
            stroke="var(--ink)"
            strokeWidth={1.5}
          />
          <text
            x="696"
            y="133"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            COURTROOM
          </text>
          <path
            d="M688 142L871 120"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M586 300C644 300 632 225 692 225H725"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M715 217L727 225L715 233"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <Gavel
            x={748}
            y={196}
            width={62}
            height={62}
            stroke="var(--accent)"
            strokeWidth={1.5}
          />
          <text
            x="696"
            y="299"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[22px]"
          >
            ARBITRATOR
          </text>
          <text
            x="696"
            y="334"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            Different
          </text>
          <text
            x="696"
            y="365"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            decision-maker.
          </text>
        </svg>
      </div>

      <div className="shrink-0">
        <div className="border-t border-[var(--border)]">
          {[
            {
              label: items[0]?.label ?? 'Disney’s Bid',
              body:
                items[0]?.body ??
                'Move the death claim from court to arbitration.',
            },
            {
              label: items[0]?.label ?? 'Different Decision-Maker',
              body:
                items[0]?.body ??
                'An arbitrator instead of a judge or jury.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[44px_310px_1fr] items-start gap-x-5 border-b border-[var(--border)] py-5"
            >
              <span className="pt-1 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
                {item.label}
              </h2>
              <p className="font-[var(--font-body)] text-[24px] leading-snug">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <footer className="flex items-center justify-between pt-5">
          <p className="font-[var(--font-headline)] text-[22px] font-semibold">
            The Fine Print
          </p>
          <p className="font-[var(--font-mono)] text-[20px] opacity-70">
            thefineprint.pub
          </p>
          <p className="font-[var(--font-mono)] text-[20px]">
            01 / {String(totalSlides).padStart(2, '0')}
          </p>
        </footer>
      </div>
    </section>
  );
}