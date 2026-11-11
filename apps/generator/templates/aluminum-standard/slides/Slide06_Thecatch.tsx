import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide06({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section
      aria-label="Mandatory Storage, Conditional Memory Bandwidth"
      className="flex h-[1028px] w-full max-w-[952px] flex-col gap-5 overflow-hidden text-[var(--ink)] font-[var(--font-body)]"
    >
      <header className="shrink-0 pb-2">
        <div className="mb-5 h-[5px] w-16 bg-[var(--accent)]" />
        <h1 className="max-w-[900px] text-5xl font-[var(--font-headline)] font-semibold leading-[1.04] tracking-[-0.045em]">
          Mandatory Storage,
          <br />
          Conditional Memory Bandwidth
        </h1>
        <p className="mt-5 max-w-[790px] text-xl leading-snug tracking-[-0.015em]">
          Storage is fixed at entry. Memory capacity determines bandwidth,
          while flagship display features remain absent.
        </p>
      </header>

      <article className="grid h-[212px] shrink-0 grid-cols-[1fr_300px] items-center gap-8 border border-[var(--border)] bg-[var(--surface)] px-6 py-5">
        <div>
          <h2 className="text-[28px] font-[var(--font-headline)] font-semibold leading-tight tracking-[-0.03em]">
            Storage you cannot decline
          </h2>
          <p className="mt-4 max-w-[470px] text-lg leading-snug">
            The mandatory{' '}
            <span className="font-[var(--font-mono)] font-semibold text-[var(--accent)]">
              1TB
            </span>{' '}
            allotment applies even when you do not need it.
          </p>
        </div>

        <svg
          viewBox="0 0 300 160"
          fill="none"
          aria-hidden="true"
          className="h-[160px] w-[300px] text-[var(--ink)]"
        >
          <path
            d="M16 18H284M16 142H284"
            stroke="var(--border)"
            strokeDasharray="3 5"
          />
          <rect x="48" y="34" width="204" height="92" rx="5" stroke="currentColor" strokeWidth="2" />
          <rect x="63" y="48" width="127" height="64" rx="2" stroke="var(--border)" />
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={72 + i * 29}
              y="58"
              width="20"
              height="44"
              fill="var(--accent)"
              opacity={0.3 + i * 0.2}
            />
          ))}
          <path d="M205 52H235M205 61H226M205 103H235" stroke="var(--border)" strokeWidth="2" />
          <circle cx="238" cy="113" r="3" stroke="currentColor" />
          <path d="M48 80H21M252 80H279" stroke="currentColor" />
          <path d="M21 68V92M279 68V92" stroke="var(--accent)" strokeWidth="3" />
          <rect x="199" y="72" width="32" height="23" rx="3" fill="var(--accent)" />
          <path
            d="M207 72V65C207 54 223 54 223 65V72"
            stroke="var(--accent)"
            strokeWidth="3"
          />
          <circle cx="215" cy="82" r="2" fill="var(--surface)" />
          <path d="M215 82V87" stroke="var(--surface)" strokeWidth="2" />
        </svg>
      </article>

      <div className="grid h-[292px] shrink-0 grid-cols-2 gap-4">
        <article className="flex min-w-0 flex-col border border-[var(--border)] px-6 py-5">
          <h2 className="text-[28px] font-[var(--font-headline)] font-semibold leading-tight tracking-[-0.03em]">
            Base memory
          </h2>

          <svg
            viewBox="0 0 400 94"
            fill="none"
            aria-hidden="true"
            className="my-5 h-[94px] w-full shrink-0"
          >
            <rect x="1" y="10" width="76" height="74" stroke="var(--border)" />
            <rect x="17" y="27" width="44" height="40" stroke="var(--ink)" strokeWidth="2" />
            {[0, 1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <path
                  d={`M${24 + i * 10} 19V27M${24 + i * 10} 67V75`}
                  stroke="var(--ink)"
                />
                <path
                  d={`M77 ${26 + i * 14}H350`}
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <path
                  d={`M344 ${21 + i * 14}L350 ${26 + i * 14}L344 ${31 + i * 14}`}
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
              </React.Fragment>
            ))}
            <path d="M390 10V84" stroke="var(--border)" />
          </svg>

          <p className="mt-auto text-lg leading-snug">
            <span className="font-[var(--font-mono)] font-semibold">16GB</span>{' '}
            RAM receives{' '}
            <span className="whitespace-nowrap font-[var(--font-mono)] font-semibold">
              153 GB/s
            </span>{' '}
            memory bandwidth.
          </p>
        </article>

        <article className="flex min-w-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-6 py-5">
          <h2 className="text-[28px] font-[var(--font-headline)] font-semibold leading-tight tracking-[-0.03em]">
            Memory upgrades
          </h2>

          <svg
            viewBox="0 0 400 94"
            fill="none"
            aria-hidden="true"
            className="my-5 h-[94px] w-full shrink-0 text-[var(--accent)]"
          >
            <rect x="9" y="2" width="76" height="74" stroke="var(--border)" />
            <rect x="1" y="10" width="76" height="74" fill="var(--surface)" stroke="var(--border)" />
            <rect x="17" y="27" width="44" height="40" stroke="currentColor" strokeWidth="2" />
            {[0, 1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <path
                  d={`M${24 + i * 10} 19V27M${24 + i * 10} 67V75`}
                  stroke="currentColor"
                />
                <path
                  d={`M77 ${26 + i * 14}H380`}
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d={`M374 ${21 + i * 14}L380 ${26 + i * 14}L374 ${31 + i * 14}`}
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </React.Fragment>
            ))}
            <path d="M390 10V84" stroke="var(--border)" />
          </svg>

          <p className="mt-auto text-lg leading-snug">
            <span className="font-[var(--font-mono)] font-semibold">24GB</span>{' '}
            and{' '}
            <span className="font-[var(--font-mono)] font-semibold">32GB</span>{' '}
            configurations receive{' '}
            <span className="whitespace-nowrap font-[var(--font-mono)] font-semibold text-[var(--accent)]">
              170 GB/s
            </span>{' '}
            memory bandwidth.
          </p>
        </article>
      </div>

      <article className="grid min-h-0 flex-1 grid-cols-[1fr_300px] items-center gap-8 border-t border-[var(--border)] px-6 py-5">
        <div>
          <h2 className="text-[28px] font-[var(--font-headline)] font-semibold leading-tight tracking-[-0.03em]">
            Missing flagship features
          </h2>
          <p className="mt-4 max-w-[490px] text-lg leading-snug">
            The retained 2021 design offers neither an OLED panel nor a
            touchscreen.
          </p>
        </div>

        <svg
          viewBox="0 0 300 160"
          fill="none"
          aria-hidden="true"
          className="h-[160px] w-[300px]"
        >
          <rect x="44" y="17" width="212" height="119" rx="7" stroke="var(--ink)" strokeWidth="2" />
          <rect x="53" y="26" width="194" height="100" rx="2" stroke="var(--border)" />
          <path d="M133 26V32H167V26" fill="var(--ink)" />
          <path d="M44 136L18 147V151H282V147L256 136" stroke="var(--ink)" strokeWidth="2" />
          <path d="M119 137L123 142H177L181 137" stroke="var(--border)" />
          <path d="M69 106L109 66M69 85L88 66M90 106L130 66" stroke="var(--border)" />
          <circle cx="204" cy="76" r="25" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
          <path d="M186 94L222 58" stroke="var(--accent)" strokeWidth="2" />
        </svg>
      </article>
    </section>
  );
}