import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type RegisterCard = {
  title?: string;
  label?: string;
  body?: string;
};

type RegisterData = {
  kicker?: string;
  headline?: string;
  subheadline?: string;
  cards?: RegisterCard[];
  items?: RegisterCard[];
  telemetry?: Array<{
    value: string;
    label: string;
  }>;
};

export default function Slide03({ slide }: SlideComponentProps) {
  const content = slide as unknown as RegisterData;
  const items = content.cards ?? content.items ?? [];
  const [item0, item1, item2] = items;

  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="flex h-full min-h-0 flex-col gap-8">
        <header className="flex shrink-0 flex-col gap-6">
          <div className="flex items-center gap-5 border-t-2 border-[var(--border)] pt-6">
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 bg-[var(--accent)]"
            />
            <p className="font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.12em] text-[var(--accent)]">
              {content.kicker}
            </p>
          </div>

          <h1 className="max-w-[900px] text-balance font-[var(--font-headline)] text-[68px] font-bold leading-[1.02] tracking-[-0.04em]">
            {content.headline}
          </h1>

          <p className="max-w-[860px] font-[var(--font-body)] text-[28px] leading-snug">
            {content.subheadline}
          </p>
        </header>

        <div className="grid min-h-0 flex-1 grid-rows-[1.1fr_1fr_1fr] gap-7">
          <article className="flex w-[93%] flex-col justify-center gap-6 bg-black p-10 text-[var(--ink)] [--ink:#FFFFFF]">
            <h2 className="max-w-[760px] font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
              {item0?.title || item0?.label}
            </h2>
            <p className="max-w-[740px] font-[var(--font-body)] text-[28px] leading-snug">
              {item0?.body}
            </p>
          </article>

          <article className="flex w-[82%] justify-self-end flex-col justify-center gap-6 border-t-2 border-[var(--border)] bg-[var(--surface)] p-10">
            <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
              {item1?.title || item1?.label}
            </h2>
            <p className="font-[var(--font-body)] text-[28px] leading-snug">
              {item1?.body}
            </p>
          </article>

          <article className="relative flex w-full flex-col justify-center gap-6 border border-[var(--border)] py-10 pl-12 pr-10">
            <span
              aria-hidden="true"
              className="absolute -left-px -top-px -bottom-px w-[8px] bg-[var(--accent)]"
            />
            <h2 className="font-[var(--font-headline)] text-[38px] font-semibold leading-tight tracking-[-0.025em]">
              {item2?.title || item2?.label}
            </h2>
            <p className="max-w-[790px] font-[var(--font-body)] text-[28px] leading-snug">
              {item2?.body}
            </p>
          </article>
        </div>

        <aside className="grid shrink-0 grid-cols-[1.15fr_1fr] gap-8 border-t-2 border-[var(--border)] pt-7">
          {(content.telemetry ?? []).map((entry, index) => (
            <div
              key={`${entry.value}-${index}`}
              className={
                index === 0
                  ? 'flex flex-col items-start gap-4'
                  : 'flex flex-col items-start gap-4 border-l border-[var(--border)] pl-8'
              }
            >
              <p className="border border-[var(--border)] px-4 py-2 font-[var(--font-mono)] text-[22px] leading-normal tracking-[0.02em]">
                {entry.value}
              </p>
              <p className="max-w-[400px] font-[var(--font-body)] text-[24px] leading-snug">
                {entry.label}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}