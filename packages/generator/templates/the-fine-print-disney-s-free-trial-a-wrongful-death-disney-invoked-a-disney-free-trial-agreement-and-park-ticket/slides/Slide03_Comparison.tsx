import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';
import { FileText, Link2, MousePointer2, Scale, ArrowDownRight } from 'lucide-react';

export default function Slide03({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  void brand;

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between px-2 py-8 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-3 text-[20px] uppercase tracking-[0.16em] text-[var(--accent)] font-[var(--font-mono)]">
          <Link2 className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
          <span>{slide.kicker ?? 'THE LINKED TERMS'}</span>
        </div>

        <h1 className="max-w-[880px] text-[58px] font-bold leading-[1.04] tracking-tight font-[var(--font-headline)]">
          {slide.headline ?? 'One Click, More Than Streaming'}
        </h1>

        <p className="mt-5 max-w-[850px] text-[26px] leading-snug font-[var(--font-body)]">
          {slide.subheadline ??
            'Disney said linked terms required arbitration and barred group claims.'}
        </p>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div className="relative isolate w-full">
          <svg
            viewBox="0 0 952 420"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-[var(--accent)]"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M24 20H64M24 20V48M928 372V400H888"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              d="M590 240C640 240 635 155 687 155"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="5 6"
            />
            <path
              d="M677 147L688 155L677 163"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="grid grid-cols-[minmax(0,1fr)_250px] items-center gap-12 px-6 py-5">
            <article
              aria-label="Illustrative agreement excerpt; paraphrase, not original contract wording"
              className="relative bg-[var(--surface)] px-8 py-7"
            >
              <div className="mb-6 flex items-center justify-between gap-3 border-b border-[var(--border)] pb-4 text-[20px] font-[var(--font-mono)]">
                <FileText
                  className="h-7 w-7 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="uppercase tracking-[0.08em]">Linked agreement</span>
                <span className="text-[var(--accent)]"></span>
              </div>

              <p className="mb-5 text-[20px] leading-snug text-[var(--accent)] font-[var(--font-mono)]">
                Disney’s position · paraphrase
              </p>

              <p className="text-[28px] leading-[1.65] font-[var(--font-body)]">
                Linked terms{' '}
                <mark className="bg-[#FEF08A] px-1.5 py-0.5 font-mono font-medium text-[#121212]">
                  required arbitration
                </mark>{' '}
                and{' '}
                <span className="underline decoration-[var(--accent)] decoration-2 underline-offset-[7px]">
                  barred group claims.
                </span>
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[var(--border)] pt-4 text-[20px] font-[var(--font-mono)]">
                <MousePointer2
                  className="h-6 w-6 shrink-0 text-[var(--accent)]"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>“Agree &amp; Continue”</span>
              </div>
            </article>

            <aside className="border-l border-[var(--border)] pl-6">
              <Scale
                className="mb-5 h-12 w-12 text-[var(--accent)]"
                strokeWidth={1.3}
                aria-hidden="true"
              />
              <p className="mb-4 text-[20px] uppercase tracking-[0.08em] text-[var(--accent)] font-[var(--font-mono)]">
                 Disputed
              </p>
              <h2 className="text-[29px] font-semibold leading-tight font-[var(--font-headline)]">
                Behind another link.
              </h2>
              <p className="mt-4 text-[22px] leading-snug font-[var(--font-body)]">
                Piccolo’s lawyers disputed the visibility of broader terms.
              </p>
              <ArrowDownRight
                className="mt-5 h-8 w-8 text-[var(--accent)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </aside>
          </div>
        </div>
      </div>

      <footer className="shrink-0">
        <div className="border-t border-[var(--border)]">
          {items.map((item, index) => (
            <div
              key={`${index}-${item.label}`}
              className="grid grid-cols-[48px_245px_minmax(0,1fr)] items-start gap-4 border-b border-[var(--border)] py-5"
            >
              <span className="pt-1 text-[20px] text-[var(--accent)] font-[var(--font-mono)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-[26px] font-semibold leading-tight font-[var(--font-headline)]">
                {item.label}
              </h3>
              <p className="text-[23px] leading-snug font-[var(--font-body)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-[20px] font-[var(--font-mono)]">
          <span>thefineprint.pub</span>
          <span className="text-[var(--accent)]">
            03 / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>
      </footer>
    </section>
  );
}