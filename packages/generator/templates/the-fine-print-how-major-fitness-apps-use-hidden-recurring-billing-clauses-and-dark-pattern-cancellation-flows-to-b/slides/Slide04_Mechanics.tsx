import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  DoorClosed,
  DoorOpen,
  MessageSquareText,
  MousePointer2,
  UserRound,
} from 'lucide-react';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.16em]">
            THE OBSTRUCTED EXIT
          </p>
        </div>

        <h1 className="font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          Easy In. Hard Out.
        </h1>

        <p className="mt-5 max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug line-clamp-2">
          The FTC alleged Genesis Tech put obstacles between customers and
          cancellation.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 420"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="A direct signup route enters an open door. The cancellation route doubles back, encounters a missing control and an explanation requirement, and ends at a closed exit."
          className="absolute inset-0 h-full w-full"
        >
          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M18 40h16M26 32v16M918 40h16M926 32v16" />
            <path d="M18 390h16M26 382v16M918 390h16M926 382v16" />
          </g>

          <text
            x="146"
            y="58"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.14em]"
          >
            SIGNUP
          </text>

          <UserRound
            x={58}
            y={74}
            width={56}
            height={56}
            stroke="var(--ink)"
            strokeWidth={1.5}
          />

          <path
            d="M146 104H792"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="5"
          />
          <path
            d="m774 87 18 17-18 17"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <DoorOpen
            x={826}
            y={67}
            width={72}
            height={72}
            stroke="var(--ink)"
            strokeWidth={1.4}
          />

          <text
            x="650"
            y="183"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.14em]"
          >
            CANCELLATION
          </text>

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M862 155v70H687" />
            <path d="M593 225H481v107H367" />
            <path d="M265 332H194v37h-60" />
            <path d="m150 353-16 16 16 16" />
          </g>

          <path
            d="M687 225H593"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeDasharray="4 9"
            opacity="0.35"
          />

          <MousePointer2
            x={621}
            y={242}
            width={38}
            height={38}
            stroke="var(--ink)"
            strokeWidth={1.5}
          />

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="m620 205 40 40M660 205l-40 40" />
          </g>

          <MessageSquareText
            x={281}
            y={302}
            width={70}
            height={64}
            stroke="var(--ink)"
            strokeWidth={1.3}
          />

          <DoorClosed
            x={54}
            y={333}
            width={64}
            height={64}
            stroke="var(--accent)"
            strokeWidth={1.5}
          />

          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M640 287v92" />
            <path d="M316 378v16" />
          </g>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-2 divide-x divide-[var(--border)]">
          <article className="min-w-0 py-2 pr-8">
            <h2 className="mb-5 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Missing Controls'}
            </h2>
            <p className="flow-root font-[var(--font-body)] text-[24px] leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-headline)] first-letter:text-[76px] first-letter:font-bold first-letter:leading-none first-letter:text-[var(--accent)]">
              {items[0]?.body ??
                'Cancellation controls were missing, the FTC alleged.'}
            </p>
          </article>

          <article className="min-w-0 py-2 pl-8">
            <h2 className="mb-5 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Required Explanations'}
            </h2>
            <p className="font-[var(--font-body)] text-[24px] leading-snug">
              {items[1]?.body ??
                'Customers had to explain why they wanted to cancel.'}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}