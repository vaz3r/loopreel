import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const cards = [
  {
    title: 'Access',
    fields: [
      'License version;',
      'weight availability;',
      'training-code availability;',
      'data documentation.',
    ],
  },
  {
    title: 'Architecture',
    fields: [
      'Total parameters;',
      'active parameters per token;',
      'context length in tokens.',
    ],
  },
  {
    title: 'Compute',
    fields: [
      'Accelerator model;',
      'accelerator count;',
      'GPU hours;',
      'numerical precision.',
    ],
  },
  {
    title: 'Economics',
    fields: [
      'Currency;',
      'hourly rate;',
      'included stages;',
      'excluded experiments;',
      'measurement date.',
    ],
  },
];

function AuditGlyph({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-16 w-16 shrink-0 text-[var(--accent)]"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.5">
        {index === 0 && (
          <>
            <path d="M10 14h29v38H10z" opacity=".35" />
            <path d="M20 8h29v38H20z" />
            <path d="M26 17h15M26 23h10" opacity=".5" />
            <path d="M35 38h20M49 32l6 6-6 6" />
            <circle cx="28" cy="38" r="3" />
            <path d="M14 57h40" strokeDasharray="2 4" opacity=".4" />
          </>
        )}
        {index === 1 && (
          <>
            <path d="m32 8 24 13-24 13L8 21 32 8Z" />
            <path d="m8 31 24 13 24-13" opacity=".65" />
            <path d="m8 41 24 13 24-13" opacity=".35" />
            <path d="M32 34v20M8 21v20M56 21v20" strokeDasharray="2 4" />
            <path d="m24 21 8-4 8 4-8 4-8-4Z" fill="currentColor" />
          </>
        )}
        {index === 2 && (
          <>
            <rect x="16" y="16" width="32" height="32" rx="2" />
            <rect x="24" y="24" width="16" height="16" opacity=".5" />
            <path d="M24 8v8M32 8v8M40 8v8M24 48v8M32 48v8M40 48v8" />
            <path d="M8 24h8M8 32h8M8 40h8M48 24h8M48 32h8M48 40h8" />
            <path d="M29 29h6v6h-6z" fill="currentColor" stroke="none" />
          </>
        )}
        {index === 3 && (
          <>
            <path d="M10 10v44h46" opacity=".45" />
            <path d="M19 43h7v11h-7zM32 32h7v22h-7z" opacity=".55" />
            <path d="M45 19h7v35h-7z" />
            <path d="m16 30 15-13 9 5L54 8" strokeDasharray="3 4" />
            <circle cx="31" cy="17" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="54" cy="8" r="2.5" fill="currentColor" stroke="none" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function Slide09({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex h-full min-h-0 w-full flex-col gap-9 text-[var(--ink)]">
      <header className="relative shrink-0 pl-7">
        <div className="absolute bottom-1 left-0 top-1 w-[3px] bg-[var(--accent)]" />

        <h1 className="max-w-[860px] font-[var(--font-headline)] text-[68px] font-semibold leading-[1.02] tracking-[-0.045em]">
          The Compute Review
          <br />
          audit grid
        </h1>

        <p className="mt-6 font-[var(--font-body)] text-[27px] leading-[1.35] opacity-75">
          Before publishing a comparison, require these fields.
        </p>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-5">
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="relative flex min-h-0 flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-7"
          >
            <div className="absolute left-0 top-0 h-[3px] w-16 bg-[var(--accent)]" />

            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
              <h2 className="font-[var(--font-headline)] text-[35px] font-medium leading-none tracking-[-0.035em]">
                {card.title}
              </h2>
              <AuditGlyph index={index} />
            </div>

            <ul className="flex min-h-0 flex-1 flex-col justify-center gap-3 pt-5">
              {card.fields.map((field) => (
                <li
                  key={field}
                  className="grid grid-cols-[12px_1fr] items-start gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-[9px] w-[9px] border border-[var(--accent)] opacity-70"
                  />
                  <span className="font-[var(--font-body)] text-[23px] leading-[1.3] tracking-[-0.015em]">
                    {field}
                  </span>
                </li>
              ))}
            </ul>

            <svg
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="absolute bottom-2 right-2 h-5 w-5 text-[var(--border)]"
            >
              <path d="M4 16h12V4" stroke="currentColor" />
            </svg>
          </article>
        ))}
      </div>
    </section>
  );
}