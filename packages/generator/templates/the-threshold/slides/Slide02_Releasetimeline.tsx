import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  // SlideFrame supplies the brand tokens and pagination.
  void slide;
  void brand;
  void totalSlides;

  return (
    <section
      className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]"
      aria-label="Two Dates, Different Certainty"
    >
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-7 tracking-[0.14em] text-[var(--accent)]">
          THE ARRIVAL WINDOW
        </p>

        <h2 className="mt-5 font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          Two Dates,
          <br />
          Different Certainty
        </h2>

        <p className="mt-5 max-w-[900px] font-[var(--font-body)] text-[28px] leading-[1.35]">
          Rover shipping is scheduled; the drone still needs regulatory
          authorization.
        </p>
      </header>

      <figure className="m-0 mt-6 h-[650px] w-full shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 650"
          className="block h-full w-full"
          role="img"
          aria-label="Release timeline, not to scale. Ring Rover Cam: December 16, 2026, scheduled shipping. Ring Drone Cam: January 27, 2027, conditional target requiring Federal Communications Commission authorization."
        >
          {/* Open annotation field above the scheduled milestone. */}
          <path
            d="M40 36H912"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <text
            x="40"
            y="89"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            Ring Rover Cam
          </text>

          <text
            x="40"
            y="135"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[32px] font-semibold tracking-[-0.025em]"
          >
            December 16, 2026
          </text>

          <text
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="40" y="183">
              Scheduled shipping; already available for
            </tspan>
            <tspan x="40" y="219">
              preorder when the article was published.
            </tspan>
          </text>

          {/* Offset leader connects the upper caption to the square. */}
          <path
            d="M40 245H170V296"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          {/* Solid schedule transitions into an unresolved, dashed target. */}
          <path
            d="M40 310H420"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
          />
          <path
            d="M420 310H912"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeDasharray="12 12"
            strokeLinecap="butt"
          />

          <rect
            x="156"
            y="296"
            width="28"
            height="28"
            fill="var(--ink)"
          />

          {/* Clear the rail behind the hollow conditional marker. */}
          <circle cx="680" cy="310" r="24" fill="var(--paper, #E8EFEB)" />
          <circle
            cx="680"
            cy="310"
            r="17"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
          />

          <text
            x="40"
            y="361"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.12em]"
          >
            NOT TO SCALE
          </text>

          {/* Lower caption is deliberately offset from the upper caption. */}
          <path
            d="M680 335V388H410"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <text
            x="410"
            y="436"
            fill="var(--ink)"
            className="font-[var(--font-headline)] text-[36px] font-semibold"
          >
            Ring Drone Cam
          </text>

          <text
            x="410"
            y="482"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[32px] font-semibold tracking-[-0.025em]"
          >
            January 27, 2027
          </text>

          <text
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[26px]"
          >
            <tspan x="410" y="530">
              Amazon&apos;s target depends on
            </tspan>
            <tspan x="410" y="566">
              Federal Communications Commission
            </tspan>
            <tspan x="410" y="602">
              authorization.
            </tspan>
          </text>

          <path
            d="M40 640H912"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
        </svg>
      </figure>
    </section>
  );
}