import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const steps = [
    {
      label: '2023',
      body: 'The Gaza war triggered the wider Middle Eastern crisis, the article says.',
      position: 'left-0 top-[256px]',
    },
    {
      label: 'June 2025',
      body: 'Israel attacked military and nuclear facilities; US strikes also targeted nuclear facilities.',
      position: 'left-[326px] top-[138px]',
    },
    {
      label: 'January–February 2026',
      body: 'US regional military buildup described as largest since the 2003 invasion of Iraq.',
      position: 'left-[652px] top-[20px]',
    },
  ];

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <header className="shrink-0">
        <div className="flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-[2px] w-12 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-mono)] text-[22px] font-medium tracking-[0.16em] text-[var(--accent)]">
            THE ROAD TO WAR
          </p>
        </div>

        <h2 className="mt-5 max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.035em]">
          Escalation Preceded
          <br />
          the Opening Strikes
        </h2>

        <p className="mt-6 max-w-[840px] font-[var(--font-body)] text-[28px] leading-snug">
          The article connects the Gaza war, earlier attacks, and a US
          military buildup.
        </p>
      </header>

      <div className="relative mt-9 h-[640px] w-full shrink-0">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 952 640"
          className="pointer-events-none absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Identical platforms; vertical placement conveys sequence only. */}
          <path
            d="M300 366H313V248H326 M626 248H639V130H652"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="miter"
          />

          <g fill="var(--surface)" stroke="var(--border)" strokeWidth="1">
            <rect x="1" y="354" width="298" height="24" />
            <rect x="327" y="236" width="298" height="24" />
            <rect x="653" y="118" width="298" height="24" />
          </g>

          <g stroke="var(--accent)" strokeWidth="2">
            <path d="M0 354H300" />
            <path d="M326 236H626" />
            <path d="M652 118H952" />
          </g>

          <g fill="var(--accent)">
            <circle cx="313" cy="307" r="4" />
            <circle cx="639" cy="189" r="4" />
          </g>

          <g stroke="var(--border)" strokeWidth="1">
            <path d="M0 406V608" />
            <path d="M326 288V490" />
            <path d="M652 170V372" />
          </g>
        </svg>

        <ol className="absolute inset-0 m-0 list-none p-0">
          {steps.map((step) => (
            <li
              key={step.label}
              className={`absolute w-[300px] ${step.position}`}
            >
              <h3 className="flex h-[80px] items-end font-[var(--font-mono)] text-[32px] font-semibold leading-[1.15] tracking-[-0.035em] text-[var(--accent)]">
                {step.label}
              </h3>

              <div aria-hidden="true" className="mt-[18px] h-[24px]" />

              <p className="mt-6 pl-5 pr-1 font-[var(--font-body)] text-[26px] leading-[1.3]">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}