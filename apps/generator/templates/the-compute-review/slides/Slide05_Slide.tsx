import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide05({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const cards = [
    {
      speaker: 'Reader',
      body: 'I can download the weights. Is that enough?',
    },
    {
      speaker: 'Editor',
      body: 'Not under OSI’s Definition 1.0: data information and derivation code must accompany the parameters.',
    },
    {
      speaker: 'Reader',
      body: 'Which freedoms should I check?',
    },
    {
      speaker: 'Editor',
      body: 'Use, study, modify, and share—including use and modification for any purpose.',
    },
  ];

  return (
    <section className="flex h-full min-h-0 w-full flex-col text-[var(--ink)]">
      <header className="shrink-0 pb-8">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]" />
          <p className="font-[var(--font-mono)] text-[16px] font-medium uppercase leading-6 tracking-[0.2em]">
            ILLUSTRATIVE EXCHANGE
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[70px] font-semibold leading-[0.99] tracking-[-0.055em]">
          The download is
          <br />
          not the definition
        </h1>

        <svg
          aria-hidden="true"
          viewBox="0 0 952 40"
          fill="none"
          className="mt-7 h-10 w-full"
        >
          <path
            d="M0 20H952"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M0 20H112M112 20L130 6H184L202 20H284"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <path
            d="M143 15V25M153 15V25M163 15V25M173 15V25"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <circle
            cx="284"
            cy="20"
            r="5"
            fill="var(--accent)"
          />
          <path
            d="M920 12L928 20L920 28M934 12L942 20L934 28"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
        </svg>
      </header>

      <div className="grid min-h-0 flex-1 grid-rows-[1fr_1.45fr_1fr_1.3fr] gap-4 pb-3">
        {cards.map((card, index) => {
          const isEditor = card.speaker === 'Editor';

          return (
            <article
              key={index}
              className={[
                'relative grid min-h-0 grid-cols-[116px_minmax(0,1fr)] items-center gap-6 px-7 py-6',
                isEditor
                  ? 'ml-12 border border-[var(--border)] bg-[var(--surface)]'
                  : 'mr-12 border-b border-[var(--border)]',
              ].join(' ')}
            >
              {isEditor && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 left-0 top-6 w-[3px] bg-[var(--accent)]"
                />
              )}

              <div className="flex flex-col items-start gap-4 self-start pt-1">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 40 32"
                  fill="none"
                  className={[
                    'h-8 w-10',
                    isEditor
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]',
                  ].join(' ')}
                >
                  {isEditor ? (
                    <>
                      <path
                        d="M4 3H36V24H17L9 30V24H4V3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12 11H28M12 17H23"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M4 3H36V24H31V30L23 24H4V3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle cx="13" cy="13.5" r="1.5" fill="currentColor" />
                      <circle cx="20" cy="13.5" r="1.5" fill="currentColor" />
                      <circle cx="27" cy="13.5" r="1.5" fill="currentColor" />
                    </>
                  )}
                </svg>

                <h2
                  className={[
                    'font-[var(--font-mono)] text-[16px] leading-5 tracking-[0.04em]',
                    isEditor
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--ink)]',
                  ].join(' ')}
                >
                  {card.speaker}
                </h2>
              </div>

              <p
                className={[
                  'min-w-0 font-[var(--font-body)] tracking-[-0.025em]',
                  isEditor
                    ? 'text-[29px] font-medium leading-[1.3]'
                    : 'text-[32px] font-normal leading-[1.25]',
                ].join(' ')}
              >
                {card.body}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}