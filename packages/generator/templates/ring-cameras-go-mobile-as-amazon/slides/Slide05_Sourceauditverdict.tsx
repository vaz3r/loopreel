import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const rows = [
    { item: items[0], icon: 'document' },
    { item: items[1], icon: 'magnifier' },
    { item: items[2], icon: 'bracket' },
  ] as const;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex shrink-0 flex-col gap-8 pb-10">
        <p className="font-[var(--font-mono)] text-[22px] uppercase leading-normal tracking-[0.12em]">
          {slide.kicker}
        </p>

        <div
          aria-hidden="true"
          className="h-px w-full bg-[var(--border)]"
        />

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.04] tracking-[-0.04em]">
          {slide.headline}
        </h1>

        <p className="max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
          {slide.subheadline}
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 border-b border-[var(--border)]">
        {rows.map(({ item, icon }, index) => {
          const isVerdict = index === 2;

          return (
            <article
              key={icon}
              className={`relative grid grid-cols-[88px_minmax(0,1fr)] items-center gap-8 border-t border-[var(--border)] px-8 py-9 ${
                isVerdict ? 'bg-[var(--surface)]' : ''
              }`}
            >
              {isVerdict && (
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-[5px] bg-[var(--accent)]"
                />
              )}

              <div
                aria-hidden="true"
                className="flex h-full items-start justify-center border-r border-[var(--border)] pr-6 pt-1"
              >
                <svg
                  viewBox="0 0 64 80"
                  fill="none"
                  className="h-[80px] w-[64px] shrink-0 text-[var(--ink)]"
                >
                  {icon === 'document' && (
                    <g
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    >
                      <path d="M12 7H38L52 21V71H12Z" />
                      <path d="M38 7V21H52" />
                      <path d="M21 34H43M21 44H43M21 54H36" />
                      <path d="M7 16V76H43" opacity=".35" />
                    </g>
                  )}

                  {icon === 'magnifier' && (
                    <g
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                    >
                      <circle cx="27" cy="29" r="19" />
                      <path d="M41 43L57 63M37 47L53 67" />
                      <path d="M18 25H36M18 33H31" />
                      <path d="M7 73H57" opacity=".35" />
                    </g>
                  )}

                  {icon === 'bracket' && (
                    <g
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="square"
                    >
                      <path d="M34 9H13V69H34" />
                      <path d="M25 39H45" opacity=".55" />
                      <path
                        d="M51 9H57M51 69H57"
                        opacity=".35"
                      />
                    </g>
                  )}
                </svg>
              </div>

              <div className="flex min-w-0 flex-col gap-6">
                <h2 className="font-[var(--font-headline)] text-[32px] font-semibold leading-tight tracking-[-0.02em]">
                  {item?.title || item?.label}
                </h2>

                <p className="max-w-[720px] font-[var(--font-body)] text-[28px] leading-[1.5]">
                  {item?.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-7 pt-9">
        <span className="font-[var(--font-mono)] text-[20px] uppercase leading-normal tracking-[0.16em]">
          Custom Brand
        </span>
        <div
          aria-hidden="true"
          className="h-px flex-1 bg-[var(--border)]"
        />
      </div>
    </section>
  );
}