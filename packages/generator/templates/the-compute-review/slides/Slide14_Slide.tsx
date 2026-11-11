import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide14({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const settings = ['Low', 'Medium', 'High'];

  return (
    <section className="flex h-full min-h-0 flex-col justify-center gap-12 text-[var(--ink)]">
      <h1 className="max-w-[900px] font-[var(--font-headline)] text-[80px] font-semibold leading-[0.98] tracking-[-0.055em]">
        {slide.headline}
      </h1>

      <div className="relative grid grid-cols-3 gap-7">
        {settings.map((setting, index) => (
          <div
            key={setting}
            className={`relative flex h-[380px] min-w-0 flex-col border bg-[var(--surface)] px-6 py-7 ${
              index === 2
                ? 'border-[var(--accent)]'
                : 'border-[var(--border)]'
            }`}
          >
            <div className="flex items-baseline gap-3">
              <span className="font-[var(--font-mono)] text-[22px] text-[var(--accent)]">
                {index + 1}.
              </span>
              <h2 className="font-[var(--font-headline)] text-[37px] font-medium leading-none tracking-[-0.045em]">
                {setting}
                {index === 2 ? ':' : ''}
              </h2>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 240 240"
              fill="none"
              className="mt-auto w-full text-[var(--accent)]"
            >
              <path
                d="M16 16H36M16 16V36M224 16H204M224 16V36M16 224H36M16 224V204M224 224H204M224 224V204"
                stroke="var(--border)"
                strokeWidth="1.5"
              />

              <path
                d="M120 28V212M28 120H212"
                stroke="var(--border)"
                strokeDasharray="2 7"
              />

              {[0, 1, 2].map((layer) => {
                const active = layer <= index;
                const y = 156 - layer * 45;

                return (
                  <g key={layer}>
                    <path
                      d={`M42 ${y}L120 ${y - 38}L198 ${y}L120 ${y + 38}Z`}
                      fill={
                        active ? 'var(--accent)' : 'var(--surface)'
                      }
                      fillOpacity={active ? 0.09 : 1}
                      stroke={
                        active ? 'var(--accent)' : 'var(--border)'
                      }
                      strokeWidth={active ? 1.8 : 1}
                    />
                    <path
                      d={`M68 ${y}L120 ${y - 25}L172 ${y}`}
                      stroke={
                        active ? 'var(--accent)' : 'var(--border)'
                      }
                      strokeOpacity={active ? 0.6 : 0.4}
                    />
                    <circle
                      cx="120"
                      cy={y}
                      r={active ? 4 : 2.5}
                      fill={
                        active ? 'var(--accent)' : 'var(--border)'
                      }
                    />
                  </g>
                );
              })}
            </svg>

            {index < 2 && (
              <span className="absolute -right-[24px] top-[29px] z-10 flex h-7 w-5 items-center justify-center font-[var(--font-mono)] text-[24px] leading-none text-[var(--accent)]">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[0.85fr_1.15fr] gap-10 border-t border-[var(--border)] pt-8">
        <p className="font-[var(--font-body)] text-[30px] leading-[1.25] tracking-[-0.025em]">
          <span className="font-[var(--font-mono)] text-[var(--accent)]">
            gpt-oss
          </span>{' '}
          reasoning settings.
        </p>

        <p className="font-[var(--font-body)] text-[36px] leading-[1.22] tracking-[-0.035em]">
          Measure{' '}
          <span className="underline decoration-[var(--accent)] decoration-[2px] underline-offset-[7px]">
            accuracy
          </span>
          ,{' '}
          <span className="underline decoration-[var(--accent)] decoration-[2px] underline-offset-[7px]">
            latency
          </span>
          , and{' '}
          <span className="underline decoration-[var(--accent)] decoration-[2px] underline-offset-[7px]">
            cost
          </span>{' '}
          at each.
        </p>
      </div>
    </section>
  );
}