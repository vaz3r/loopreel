import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <p className="font-[var(--font-mono)] text-[22px] leading-none tracking-[0.16em] text-[var(--accent)]">
          THE RELEASE GAP
        </p>

        <h2 className="mt-6 font-[var(--font-headline)] text-[64px] font-bold leading-[1.06] tracking-[-0.045em]">
          <span className="block">One Shipping Schedule,</span>
          <span className="block">One Regulatory Gate</span>
        </h2>

        <p className="mt-6 max-w-[850px] font-[var(--font-body)] text-[28px] leading-snug">
          Rover preorders are open; the drone&apos;s target still requires
          authorization.
        </p>
      </header>

      <figure
        className="mt-10 flex min-h-0 flex-1 flex-col"
        aria-label="Schematic release timeline, not to scale. The drone target sits beyond a regulatory gate; authorization is not indicated as granted."
      >
        <svg
          viewBox="0 0 952 360"
          className="block h-[360px] w-full shrink-0"
          fill="none"
          role="img"
          aria-label="A solid Rover shipping node precedes a closed gate. An outlined Drone target node sits beyond the gate."
        >
          {/* Calendar-like construction grid: intentionally without axis dates. */}
          <path
            d="M0 56H952M0 272H952"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <rect
            x="0"
            y="88"
            width="952"
            height="152"
            fill="var(--surface)"
          />

          {[44, 152, 260, 368, 476, 584, 692, 800, 908].map((x) => (
            <path
              key={x}
              d={`M${x} 56V272`}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="3 9"
            />
          ))}

          {/* Solid scheduled segment; contingent segment is interrupted. */}
          <path
            d="M44 164H618"
            stroke="var(--accent)"
            strokeWidth="4"
          />
          <path
            d="M674 164H908"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeDasharray="10 12"
            opacity="0.6"
          />

          {/* Rover: filled release node. */}
          <circle
            cx="220"
            cy="164"
            r="34"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle cx="220" cy="164" r="21" fill="var(--accent)" />

          {/* Terminal gate: capped posts and a closed cross-braced barrier. */}
          <rect
            x="618"
            y="92"
            width="56"
            height="144"
            fill="var(--surface)"
          />
          <path
            d="M618 92V236M674 92V236"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="M608 92H628M664 92H684M608 236H628M664 236H684"
            stroke="var(--ink)"
            strokeWidth="3"
          />
          <path
            d="M621 112H671M621 216H671M621 112L671 216M671 112L621 216"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          {/* Drone: outlined target, explicitly beyond the gate. */}
          <circle
            cx="732"
            cy="164"
            r="23"
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth="4"
          />

          {/* Leaders connect each node to its own copy zone. */}
          <path
            d="M220 200V338M732 190V338"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M208 338H232M720 338H744"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>

        <figcaption className="grid grid-cols-2 gap-[72px]">
          <div className="border-t-2 border-[var(--accent)] pt-6">
            <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              Ring Rover Cam
            </h3>
            <p className="mt-4 font-[var(--font-body)] text-[26px] leading-[1.4]">
              Preorders open; shipping scheduled for{' '}
              <span className="font-semibold text-[var(--accent)]">
                December 16, 2026.
              </span>
            </p>
          </div>

          <div className="border-t-2 border-dashed border-[var(--border)] pt-6">
            <h3 className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.025em]">
              Ring Drone Cam
            </h3>
            <p className="mt-4 font-[var(--font-body)] text-[26px] leading-[1.4]">
              Target:{' '}
              <span className="font-semibold text-[var(--accent)]">
                January 27, 2027,
              </span>{' '}
              contingent on Federal Communications Commission authorization.
            </p>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}