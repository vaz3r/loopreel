import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { Armchair, Check, Ticket, UserRound } from 'lucide-react';

export default function Slide02({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-1 py-5 text-[var(--ink)]">
      <header className="mb-3 shrink-0">
        <div className="mb-5 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[20px] uppercase tracking-[0.18em]">
            AT THE GATE
          </p>
        </div>

        <h1 className="max-w-[880px] font-[var(--font-headline)] text-[58px] font-bold leading-[1.04] tracking-tight">
          You arrive.
          <br />
          Your seat disappears.
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          When too many passengers show up, confirmed bookings outnumber seats.
        </p>
      </header>

      <div className="relative my-3 flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-7 left-[40%] border-r border-[var(--border)]"
        />

        <svg
          viewBox="0 0 952 420"
          role="img"
          aria-label="A confirmed booking beside passengers awaiting boarding. One passenger has no corresponding seat."
          className="block h-full max-h-[420px] w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left dossier: the booking is real. */}
          <text
            x="32"
            y="44"
            fill="currentColor"
            className="font-[var(--font-mono)] text-[20px] tracking-[3px]"
          >
            THE BOOKING
          </text>

          <g transform="translate(73 102) rotate(-9 100 70)">
            <Ticket
              x={0}
              y={0}
              width={214}
              height={148}
              stroke="currentColor"
              strokeWidth={1.15}
            />
            <path
              d="M87 45H139 M87 65H125 M87 85H139"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.45"
            />
          </g>

          <circle
            cx="274"
            cy="245"
            r="31"
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <Check
            x={257}
            y={228}
            width={34}
            height={34}
            strokeWidth={1.8}
          />

          <text
            x="32"
            y="342"
            fill="currentColor"
            className="font-[var(--font-mono)] text-[22px] tracking-[2px]"
          >
            CONFIRMED
          </text>
          <path
            d="M32 359H180"
            stroke="var(--accent)"
            strokeWidth="3"
          />

          {/* Right dossier: passengers and physical capacity diverge. */}
          <text
            x="424"
            y="44"
            fill="currentColor"
            className="font-[var(--font-mono)] text-[20px] tracking-[3px]"
          >
            THE GATE
          </text>

          {[456, 576, 696].map((x) => (
            <g key={x}>
              <UserRound
                x={x}
                y={100}
                width={58}
                height={58}
                strokeWidth={1.5}
              />
              <path
                d={`M${x + 29} 177V233`}
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.35"
              />
              <path
                d={`M${x + 23} 227L${x + 29} 233L${x + 35} 227`}
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.35"
              />
              <Armchair
                x={x - 8}
                y={255}
                width={74}
                height={74}
                strokeWidth={1.4}
              />
            </g>
          ))}

          <UserRound
            x={816}
            y={100}
            width={58}
            height={58}
            stroke="var(--accent)"
            strokeWidth={1.7}
          />

          <path
            d="M845 177V220"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 7"
          />

          {/* Registration corners mark the seat that is not there. */}
          <path
            d="M812 270V258H824 M866 258H878V270
               M812 313V325H824 M866 325H878V313"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <path
            d="M833 280L857 304 M857 280L833 304"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path
            d="M432 362H904"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text
            x="904"
            y="396"
            textAnchor="end"
            fill="var(--accent)"
            className="font-[var(--font-mono)] text-[20px] tracking-[2px]"
          >
            NO SEAT
          </text>
        </svg>
      </div>

      <div className="shrink-0 border-t border-[var(--border)] pt-4">
        <div className="grid grid-cols-[40%_60%] py-4">
          <div className="border-r border-[var(--border)] pr-8">
            <p className="mb-2 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              FIRST
            </p>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[0]?.label ?? 'Volunteers first'}
            </h2>
          </div>
          <p className="self-center pl-8 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[0]?.body ??
              'The airline must ask for volunteers before bumping anyone.'}
          </p>
        </div>

        <div className="grid grid-cols-[40%_60%] border-t border-[var(--border)] py-4">
          <div className="border-r border-[var(--border)] pr-8">
            <p className="mb-2 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              THEN
            </p>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {items[1]?.label ?? 'Not enough?'}
            </h2>
          </div>
          <p className="self-center pl-8 font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
            {items[1]?.body ??
              'The airline then applies its boarding priorities.'}
          </p>
        </div>
      </div>
    </section>
  );
}