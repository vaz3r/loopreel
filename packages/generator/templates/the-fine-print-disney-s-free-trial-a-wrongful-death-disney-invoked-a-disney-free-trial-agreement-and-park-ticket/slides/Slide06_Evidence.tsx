import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  void brand;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between gap-6 text-[var(--ink)]">
      <header className="shrink-0 border-t-2 border-[var(--ink)] pt-5">
        <div className="flex items-center justify-between font-[var(--font-mono)] text-[20px] uppercase tracking-[0.16em]">
          <span className="text-[var(--accent)]">THE SAFEGUARDS</span>
          <span>The Fine Print</span>
        </div>

        <h1 className="mt-7 max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          Arbitration Is Not Immunity
        </h1>

        <p className="mt-5 max-w-[820px] font-[var(--font-body)] text-[26px] leading-snug">
          JAMS is a private provider, not a government regulator.
        </p>
      </header>

      <figure
        className="relative flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center"
        aria-label="Two connected safeguards: remedies preserved and information exchange."
      >
        <svg
          className="block h-full max-h-[460px] w-full"
          viewBox="0 0 952 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-labelledby="slide06-diagram-title"
        >
          <title id="slide06-diagram-title">
            Connected safeguards: remedies preserved and information exchange
          </title>

          <path
            d="M0 35H952M0 425H952"
            stroke="var(--border)"
            strokeWidth="1"
          />

          <path
            d="M40 230H912M238 70V390M714 70V390"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 9"
          />

          <path
            d="M92 230H158M318 230H418M534 230H634M794 230H860"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          <path
            d="M290 170C385 78 567 78 662 170"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <path
            d="M662 290C567 382 385 382 290 290"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          <path
            d="M644 166L663 171L660 151M308 294L289 289L292 309"
            stroke="var(--accent)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle
            cx="238"
            cy="230"
            r="80"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <circle
            cx="714"
            cy="230"
            r="80"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          <path
            d="M476 172L534 230L476 288L418 230Z"
            fill="var(--surface)"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          <path
            d="M455 220H497M455 240H497"
            stroke="var(--accent)"
            strokeWidth="5"
          />

          <text
            x="238"
            y="246"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[48px] font-bold"
          >
            01
          </text>
          <text
            x="714"
            y="246"
            textAnchor="middle"
            fill="var(--ink)"
            className="font-[var(--font-mono)] text-[48px] font-bold"
          >
            02
          </text>

          <path
            d="M238 150V94M714 150V94"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M238 94H276L265 108L276 122H238Z"
            fill="var(--accent)"
          />
          <path
            d="M714 94H752L741 108L752 122H714Z"
            fill="var(--accent)"
          />

          <circle cx="92" cy="230" r="5" fill="var(--accent)" />
          <circle cx="860" cy="230" r="5" fill="var(--accent)" />

          <path
            d="M238 310V365M714 310V365M222 365H254M698 365H730"
            stroke="var(--ink)"
            strokeWidth="2"
          />
        </svg>
      </figure>

      <div className="flex shrink-0 divide-x divide-[var(--border)] border-t border-[var(--border)] pt-6">
        <div className="w-1/2 pr-8">
          <div className="mb-3 flex items-baseline gap-4">
            <span className="font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              01
            </span>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item0?.label ?? 'Remedies Preserved'}
            </h2>
          </div>

          <p className="min-h-[112px] font-[var(--font-body)] text-[24px] leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-headline)] first-letter:text-[76px] first-letter:font-bold first-letter:leading-none first-letter:text-[var(--accent)]">
            {item0?.body ??
              'Preserve available remedies; court for unavailable remedies.'}
          </p>
        </div>

        <div className="w-1/2 pl-8">
          <div className="mb-3 flex items-baseline gap-4">
            <span className="font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              02
            </span>
            <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
              {item1?.label ?? 'Information Exchange'}
            </h2>
          </div>

          <p className="min-h-[112px] font-[var(--font-body)] text-[24px] leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-[var(--font-headline)] first-letter:text-[76px] first-letter:font-bold first-letter:leading-none first-letter:text-[var(--accent)]">
            {item1?.body ??
              'Relevant, non-privileged information must be exchanged.'}
          </p>
        </div>
      </div>

      <footer className="flex shrink-0 items-center justify-between border-t border-[var(--border)] pt-4 font-[var(--font-mono)] text-[20px]">
        <span>thefineprint.pub</span>
        <span className="tabular-nums">
          06 / {String(totalSlides).padStart(2, '0')}
        </span>
      </footer>
    </section>
  );
}