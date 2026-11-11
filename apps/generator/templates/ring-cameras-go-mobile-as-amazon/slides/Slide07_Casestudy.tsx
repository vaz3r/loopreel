import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const stages = [
    {
      label: 'Before',
      date: 'September 2021',
      title: 'Invitation only',
      body: 'The Ring Always Home Cam was temporarily available as a Day 1 Edition product. Its starting price was $250.',
      active: false,
    },
    {
      label: 'New target',
      date: 'January 27, 2027',
      title: 'Another launch attempt',
      body: 'Amazon aims to sell the $250 Ring Drone Cam with AI Pilot mapping and navigation.',
      detail:
        'Ring Protect subscribers can configure routes and schedules, including flights triggered by connected Ring alerts.',
      active: true,
    },
  ];

  return (
    <section className="flex h-full min-h-0 flex-col justify-between gap-8 text-[var(--ink)] font-[var(--font-body)]">
      <header className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            Case study
          </span>
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] opacity-60">
            Consumer robotics / Ring
          </span>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-6xl font-bold leading-[1.04] tracking-tight">
          Ring’s flying camera gets{' '}
          <span className="text-[var(--accent)]">another launch attempt</span>
        </h1>
      </header>

      <div className="grid flex-1 grid-rows-[auto_1fr] gap-5">
        <div className="flex items-center gap-5" aria-hidden="true">
          <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] opacity-55">
            Product timeline
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
          <svg
            width="34"
            height="18"
            viewBox="0 0 34 18"
            fill="none"
            className="shrink-0 text-[var(--accent)]"
          >
            <path
              d="M1 9H31M24 2L31 9L24 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="grid grid-cols-[0.86fr_1.14fr] gap-5">
          {stages.map((stage, index) => (
            <article
              key={stage.date}
              className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm"
            >
              {stage.active && (
                <div
                  className="absolute inset-x-0 top-0 h-1 bg-[var(--accent)]"
                  aria-hidden="true"
                />
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`font-[var(--font-mono)] text-xs uppercase tracking-[0.17em] ${
                      stage.active ? 'text-[var(--accent)]' : 'opacity-60'
                    }`}
                  >
                    {stage.label}
                  </span>
                  <span className="font-[var(--font-mono)] text-xs opacity-40">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="font-[var(--font-mono)] text-base text-[var(--accent)]">
                    {stage.date}
                  </p>
                  <h2 className="font-[var(--font-headline)] text-3xl font-bold leading-[1.12] tracking-tight">
                    {stage.title}
                  </h2>
                </div>

                <p className="text-xl leading-relaxed opacity-85">
                  {stage.body}
                </p>

                {stage.detail && (
                  <p className="border-t border-[var(--border)] pt-5 text-lg leading-relaxed opacity-75">
                    {stage.detail}
                  </p>
                )}
              </div>

              <div className="flex items-end justify-between gap-3 border-t border-[var(--border)] pt-6">
                <div>
                  <p className="mb-2 font-[var(--font-mono)] text-[11px] uppercase tracking-[0.15em] opacity-55">
                    {stage.active ? 'Target price' : 'Starting price'}
                  </p>
                  <p className="font-[var(--font-mono)] text-5xl font-bold leading-none tracking-tight">
                    $250
                  </p>
                </div>
                <span className="max-w-[110px] text-right font-[var(--font-mono)] text-[11px] uppercase leading-relaxed tracking-wider opacity-55">
                  {stage.active ? 'Ring Drone Cam' : 'Always Home Cam'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-sm">
        <div className="border-l-4 border-[var(--accent)] pl-6">
          <p className="mb-3 font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
            The takeaway
          </p>
          <p className="font-[var(--font-headline)] text-3xl font-bold leading-tight tracking-tight">
            A renewed commercialization attempt.
            <br />
            Not evidence of adoption.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-75">
            The launch date remains contingent on FCC authorization.
          </p>
        </div>
      </aside>
    </section>
  );
}