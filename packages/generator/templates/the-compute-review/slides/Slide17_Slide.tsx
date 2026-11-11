import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide17({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const primaryMetrics = [
    { value: '36', label: 'layers' },
    { value: '117B', label: 'total parameters' },
    { value: '5.1B', label: 'active parameters/token', accent: true },
  ];

  const secondaryMetrics = [
    { value: '128', label: 'experts' },
    { value: '4', label: 'active experts/token', accent: true },
    { value: '128k', label: 'context length' },
  ];

  const activeExperts = new Set([19, 45, 82, 116]);

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-center gap-10 text-[var(--ink)]">
      <header className="shrink-0">
        <div
          aria-hidden="true"
          className="mb-7 h-2 w-16 bg-[var(--accent)]"
        />
        <h1 className="font-[var(--font-headline)] text-[74px] font-semibold leading-[1.03] tracking-[-0.055em]">
          {slide.headline}
        </h1>
      </header>

      <div className="grid h-[540px] shrink-0 grid-cols-[0.94fr_1.06fr] gap-10">
        <div className="relative min-w-0 overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
          <svg
            aria-hidden="true"
            viewBox="0 0 420 540"
            fill="none"
            className="h-full w-full"
          >
            {/* Quiet drafting marks frame the architecture. */}
            <g stroke="var(--border)" strokeWidth="1">
              <path d="M18 36H40M29 25V47M380 36H402M391 25V47" />
              <path d="M18 504H40M29 493V515M380 504H402M391 493V515" />
              <path d="M210 20V520" strokeDasharray="2 8" />
            </g>

            {/* Thirty-six individual layer planes. */}
            <g>
              {Array.from({ length: 36 }, (_, index) => {
                const y = 55 + index * 5.35;
                const highlighted = index === 0 || index === 35;

                return (
                  <path
                    key={`layer-${index}`}
                    d={`M72 ${y + 31} L210 ${y} L348 ${y + 31} L210 ${
                      y + 62
                    } Z`}
                    fill="var(--surface)"
                    stroke={
                      highlighted ? 'var(--accent)' : 'var(--border)'
                    }
                    strokeWidth={highlighted ? 1.8 : 1}
                  />
                );
              })}
            </g>

            {/* Registration rails make the depth legible. */}
            <g stroke="var(--ink)" strokeOpacity="0.3" strokeWidth="1">
              <path d="M54 86V273M49 86H59M49 273H59" />
              <path d="M366 86V273M361 86H371M361 273H371" />
            </g>

            {/* Four selected routes descend into the expert field. */}
            <g
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            >
              <path d="M210 305V325H131V383" />
              <path d="M210 305V333H311V399" />
              <path d="M210 305V341H113V447" />
              <path d="M210 305V349H149V479" />
            </g>

            <circle
              cx="210"
              cy="305"
              r="5"
              fill="var(--accent)"
            />

            {/* 128 experts, exactly four active. */}
            <rect
              x="53"
              y="369"
              width="314"
              height="132"
              fill="var(--surface)"
              stroke="var(--border)"
            />

            {Array.from({ length: 128 }, (_, index) => {
              const column = index % 16;
              const row = Math.floor(index / 16);
              const active = activeExperts.has(index);

              return (
                <rect
                  key={`expert-${index}`}
                  x={71 + column * 18}
                  y={379 + row * 16}
                  width="12"
                  height="10"
                  rx="1"
                  fill={active ? 'var(--accent)' : 'var(--surface)'}
                  stroke={active ? 'var(--accent)' : 'var(--border)'}
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        <div className="grid min-w-0 grid-rows-3">
          {primaryMetrics.map(({ value, label, accent }, index) => (
            <div
              key={label}
              className={`flex min-h-0 flex-col justify-center border-t border-[var(--border)] ${
                index === primaryMetrics.length - 1 ? 'border-b' : ''
              }`}
            >
              <div
                className={`font-[var(--font-headline)] text-[100px] font-medium leading-[0.95] tracking-[-0.065em] ${
                  accent ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
                }`}
              >
                {value}
              </div>
              <div className="mt-4 font-[var(--font-body)] text-[25px] leading-[1.2] tracking-[-0.02em]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid h-[184px] shrink-0 grid-cols-3 border-y border-[var(--border)] bg-[var(--surface)]">
        {secondaryMetrics.map(({ value, label, accent }, index) => (
          <div
            key={label}
            className={`flex min-w-0 flex-col justify-center px-7 ${
              index > 0 ? 'border-l border-[var(--border)]' : ''
            }`}
          >
            <div
              className={`font-[var(--font-mono)] text-[66px] font-medium leading-none tracking-[-0.06em] ${
                accent ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
              }`}
            >
              {value}
            </div>
            <div className="mt-5 whitespace-nowrap font-[var(--font-body)] text-[21px] leading-tight tracking-[-0.025em]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}