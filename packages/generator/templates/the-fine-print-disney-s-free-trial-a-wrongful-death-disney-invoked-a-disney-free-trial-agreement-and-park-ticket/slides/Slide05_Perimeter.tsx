import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  FileText,
  MousePointer2,
  Landmark,
  Scale,
  ArrowRight,
} from 'lucide-react';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;

  return (
    <section
      aria-label={`The Fine Print — slide 5 of ${totalSlides}`}
      className="flex h-full min-h-0 w-full flex-col justify-between py-8 px-2 text-[var(--ink)]"
    >
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-px w-12 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
            THE PUBLIC STAKES
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          A Click Could
          <br />
          Change the Forum
        </h1>

        <p className="mt-5 max-w-[830px] font-[var(--font-body)] text-[26px] leading-snug">
          Disney’s attempted use here remained{' '}
          <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-[6px]">
            untested, not court-approved.
          </span>
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 952 420"
          className="block max-h-full w-full"
          role="img"
          aria-label="A click on an agreement beside a possible, untested change from court to arbitration."
          preserveAspectRatio="xMidYMid meet"
        >
          <title>A possible change of forum, not a grant of immunity</title>

          {/* The asymmetric dossier divider: 40% / 60%. */}
          <path
            d="M381 30 V390"
            stroke="var(--border)"
            strokeWidth="1"
            fill="none"
          />

          <text
            x="16"
            y="49"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.12em]"
          >
            01 / THE CLICK
          </text>

          {/* A physical agreement, not a UI container. */}
          <path
            d="M91 91 L239 91 L279 131 L279 319 L91 319 Z"
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth="2"
          />
          <path
            d="M239 91 V131 H279"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <FileText
            x={119}
            y={122}
            width={49}
            height={49}
            stroke="var(--ink)"
            strokeWidth={1.4}
          />

          <path
            d="M121 196 H245 M121 214 H231 M121 232 H245"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.3"
            strokeWidth="2"
          />

          <path
            d="M120 272 H237"
            stroke="var(--accent)"
            strokeWidth="13"
            strokeOpacity="0.18"
          />
          <path
            d="M121 278 H236"
            stroke="var(--accent)"
            strokeWidth="2"
          />

          <MousePointer2
            x={209}
            y={251}
            width={70}
            height={70}
            fill="var(--surface)"
            stroke="var(--accent)"
            strokeWidth={1.7}
          />
          <path
            d="M203 252 L192 242 M215 243 L213 229 M195 266 L181 265"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <text
            x="185"
            y="367"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            The agreement
          </text>

          <text
            x="421"
            y="49"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.12em]"
          >
            02 / THE FORUM
          </text>

          {/* An open perimeter denotes a proposed, untested route. */}
          <path
            d="M445 151 V126 Q445 101 470 101 H874 Q899 101 899 126 V151
               M445 286 V308 Q445 333 470 333 H874 Q899 333 899 308 V286"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <Landmark
            x={472}
            y={167}
            width={87}
            height={87}
            stroke="var(--ink)"
            strokeWidth={1.35}
          />

          <path
            d="M588 208 H732"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="7 8"
          />
          <ArrowRight
            x={721}
            y={191}
            width={34}
            height={34}
            stroke="var(--accent)"
            strokeWidth={1.5}
          />

          <text
            x="665"
            y="173"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.08em]"
          >
            UNTESTED
          </text>

          <Scale
            x={791}
            y={167}
            width={87}
            height={87}
            stroke="var(--ink)"
            strokeWidth={1.35}
          />

          <text
            x="516"
            y="289"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            Court
          </text>
          <text
            x="834"
            y="289"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            Arbitration
          </text>

          <text
            x="672"
            y="376"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            A possible change—not approval.
          </text>
        </svg>
      </div>

      <div className="shrink-0">
        <div className="border-t border-[var(--border)]">
          <div className="grid grid-cols-[40%_60%] border-b border-[var(--border)] py-5">
            <h2 className="border-r border-[var(--border)] pr-8 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Not Limitless'}
            </h2>
            <p className="pl-8 font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                'Coverage still required a Disney Services or agreement connection.'}
            </p>
          </div>

          <div className="grid grid-cols-[40%_60%] border-b border-[var(--border)] py-5">
            <h2 className="border-r border-[var(--border)] pr-8 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Not Immunity'}
            </h2>
            <p className="pl-8 font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                'Arbitration still allowed individual damages; it was not immunity.'}
            </p>
          </div>
        </div>

        <footer className="mt-5 flex items-center justify-between font-[var(--font-mono)] text-[20px]">
          <span className="tracking-[0.04em]">thefineprint.pub</span>
          <span>
            <span className="text-[var(--accent)]">05</span>
            <span className="mx-3 text-[var(--accent)]">/</span>
            {String(totalSlides).padStart(2, '0')}
          </span>
        </footer>
      </div>
    </section>
  );
}