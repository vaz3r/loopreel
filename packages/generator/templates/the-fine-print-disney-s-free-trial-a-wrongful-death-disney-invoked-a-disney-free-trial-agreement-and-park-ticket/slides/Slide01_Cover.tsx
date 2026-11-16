import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide01({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <span className="font-[var(--font-headline)] text-[26px] font-bold">
            The Fine Print
          </span>
          <span className="font-[var(--font-mono)] text-[20px]">
            thefineprint.pub
          </span>
        </div>

        <p className="mt-7 font-[var(--font-headline)] text-[22px] font-bold tracking-[0.12em] text-[var(--accent)]">
          CONSENT WITHOUT BORDERS
        </p>

        <h1 className="mt-4 font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Disney’s Free-Trial
          <br />
          Courtroom Weapon
        </h1>

        <p className="mt-5 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          A streaming signup became an argument for arbitration.
        </p>
      </header>

      <div className="relative my-5 flex min-h-0 flex-1 items-center justify-center">
        <svg
          viewBox="0 0 952 460"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Streaming signup and park-ticket terms converge into Disney’s argument seeking arbitration."
          className="block h-full max-h-[460px] w-full text-[var(--ink)]"
        >
          <title>Two points of assent. One requested forum.</title>

          {/* Continuous editorial conduits, not boxed flowchart containers. */}
          <g fill="none" stroke="var(--border)" strokeWidth="1">
            <path d="M28 34H924M28 426H924" />
            <path d="M494 62V398" strokeDasharray="3 9" />
          </g>

          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="109" cy="138" r="48" />
            <circle cx="109" cy="322" r="48" />
            <path d="M157 138H365L494 230" />
            <path d="M157 322H365L494 230" />
          </g>

          {/* A streaming play glyph and a ticket perforation glyph. */}
          <path
            d="M99 120L126 138L99 156Z"
            fill="var(--accent)"
          />
          <g fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M82 305H136M82 339H136M88 305V339M130 305V339" />
            <path d="M109 307V337" strokeDasharray="4 5" />
          </g>

          <g
            fill="currentColor"
            fontFamily="var(--font-mono)"
            fontSize="22"
          >
            <text x="181" y="110">STREAMING SIGNUP</text>
            <text x="181" y="370">PARK-TICKET TERMS</text>
          </g>

          <circle cx="494" cy="230" r="7" fill="var(--accent)" />

          <g fill="none" stroke="var(--accent)" strokeWidth="3">
            <path d="M501 230H683" />
            <path d="M670 217L683 230L670 243" />
          </g>

          {/* An accent pennant marks the requested, not decided, outcome. */}
          <path
            d="M548 151H655L642 169L655 187H548Z"
            fill="var(--accent)"
          />
          <text
            x="561"
            y="176"
            fill="var(--surface)"
            fontFamily="var(--font-mono)"
            fontSize="22"
          >
            SOUGHT
          </text>

          <g fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="789" cy="230" r="72" />
            <path d="M789 187V266M758 266H820M751 207H827" />
            <path d="M762 207L748 237H776ZM816 207L802 237H830Z" />
          </g>

          <text
            x="789"
            y="345"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="var(--font-mono)"
            fontSize="24"
          >
            ARBITRATION
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] bg-[var(--surface)] pt-5">
        <div className="grid grid-cols-[1.05fr_1fr] divide-x divide-[var(--border)]">
          <article className="pr-8">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item0?.label ?? 'Digital Assent'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-headline)] first-letter:text-[76px] first-letter:font-bold first-letter:leading-none first-letter:text-[var(--accent)]">
              {item0?.body ??
                'Disney cited streaming signup and later park-ticket terms.'}
            </p>
          </article>

          <article className="pl-8">
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item1?.label ?? 'Forum Control'}
            </h2>
            <p className="mt-3 font-[var(--font-body)] text-[24px] leading-snug">
              {item1?.body ??
                'Disney sought arbitration, not immunity from liability.'}
            </p>
          </article>
        </div>
      </div>

      <footer className="mt-6 flex shrink-0 items-center justify-between border-t border-[var(--border)] pt-4 font-[var(--font-mono)] text-[20px]">
        <span className="uppercase tracking-[0.08em]">
          The consent question
        </span>
        <span>
          01 / {String(totalSlides).padStart(2, '0')}
        </span>
      </footer>
    </section>
  );
}