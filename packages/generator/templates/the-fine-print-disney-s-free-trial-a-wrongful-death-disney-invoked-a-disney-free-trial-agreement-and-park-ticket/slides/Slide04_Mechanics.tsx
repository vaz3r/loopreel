import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import {
  Ticket,
  FileText,
  UserRound,
  MousePointer2,
  Scale,
  Bookmark,
} from 'lucide-react';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-2 py-8 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-[2px] w-12 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-[20px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
            THE CONTRACTUAL LEAP
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          His Clicks.
          <br />
          Her Estate’s Rights.
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
          Disney wanted an arbitrator to decide whether arbitration applied.
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-[40%] top-8 border-r border-[var(--border)]"
        />

        <svg
          viewBox="0 0 952 420"
          className="relative block max-h-full w-full"
          role="img"
          aria-label="Tickets, account terms and guest registration on Piccolo’s side. A disputed connection extends toward his wife’s estate and arbitration."
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="32"
            y="57"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.12em]"
          >
            01 / HIS CLICKS
          </text>
          <text
            x="426"
            y="57"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[0.12em]"
          >
            02 / HER ESTATE’S RIGHTS
          </text>

          <path
            d="M45 105 H335 M45 211 H335"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <Ticket
            x={53}
            y={132}
            width={60}
            height={60}
            stroke="var(--ink)"
            strokeWidth={1.4}
          />
          <FileText
            x={160}
            y={130}
            width={60}
            height={64}
            stroke="var(--ink)"
            strokeWidth={1.4}
          />
          <UserRound
            x={267}
            y={133}
            width={58}
            height={58}
            stroke="var(--ink)"
            strokeWidth={1.4}
          />

          <path
            d="M190 212 V247"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <MousePointer2
            x={162}
            y={248}
            width={66}
            height={66}
            stroke="var(--accent)"
            strokeWidth={1.5}
          />

          <path
            d="M237 278 H461"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.65"
            strokeWidth="2"
          />
          <path
            d="M535 278 H690"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeDasharray="8 9"
          />
          <path
            d="M678 269 L691 278 L678 287"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M478 255 L465 301 M503 255 L490 301"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          <text
            x="483"
            y="238"
            textAnchor="middle"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[24px] font-bold"
          >
            ?
          </text>

          <path
            d="M711 116 H785 L820 151 V305 H711 Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M785 116 V151 H820 M733 174 H794 M733 192 H775"
            fill="none"
            stroke="var(--ink)"
            strokeOpacity="0.65"
            strokeWidth="2"
          />

          <Scale
            x={734}
            y={221}
            width={65}
            height={65}
            stroke="var(--accent)"
            strokeWidth={1.5}
          />

          <text
            x="190"
            y="365"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            Vacation Links
          </text>
          <text
            x="693"
            y="365"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-body)] text-[24px]"
          >
            Contested Reach
          </text>
        </svg>
      </div>

      <div className="shrink-0">
        <dl className="border-t border-[var(--border)]">
          <div className="grid grid-cols-[40%_60%] border-b border-[var(--border)] py-5">
            <dt className="border-r border-[var(--border)] pr-8 font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Vacation Links'}
            </dt>
            <dd className="pl-8 font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                'Disney also cited tickets, account terms and guest registration.'}
            </dd>
          </div>

          <div className="grid grid-cols-[40%_60%] border-b border-[var(--border)] py-5">
            <dt className="border-r border-[var(--border)] pr-8 font-[var(--font-headline)] text-[28px] font-semibold leading-tight text-[var(--accent)]">
              {items[0]?.label ?? 'Contested Reach'}
            </dt>
            <dd className="pl-8 font-[var(--font-body)] text-[24px] leading-snug">
              {items[0]?.body ??
                'Piccolo disputed that his clicks could bind his wife’s estate.'}
            </dd>
          </div>
        </dl>

        <footer className="flex items-center justify-between pt-6 font-[var(--font-mono)] text-[20px]">
          <div className="flex items-center gap-3">
            <Bookmark
              className="h-5 w-5 text-[var(--accent)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>thefineprint.pub</span>
          </div>
          <span className="tabular-nums">
            <span className="text-[var(--accent)]">04</span>
            <span className="mx-3 opacity-50">/</span>
            {String(totalSlides).padStart(2, '0')}
          </span>
        </footer>
      </div>
    </section>
  );
}