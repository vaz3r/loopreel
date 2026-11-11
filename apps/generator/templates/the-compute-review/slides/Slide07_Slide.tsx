import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type CaseStudyContent = {
  title: string;
  body: string;
  cards: { title: string; body: string }[];
};

const lockedCopy: CaseStudyContent = {
  title: 'DeepSeek-V3: sparsity, not smallness',
  body: 'The architecture separates total model capacity from parameters activated for each token.',
  cards: [
    {
      title: 'Capacity',
      body: '671B total parameters; 37B activated per token.',
    },
    {
      title: 'Training',
      body: '14.8T pre-training tokens; FP8 mixed precision.',
    },
    {
      title: 'Context extension',
      body: 'Two stages: first 32K, then 128K maximum context length.',
    },
  ],
};

function CapacityDiagram() {
  return (
    <svg
      viewBox="0 0 820 172"
      className="h-full w-full text-[var(--accent)]"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 29V12H38M782 12H805V29M15 143V160H38M782 160H805V143"
        stroke="var(--border)"
        strokeWidth="1.5"
      />

      {/* 671 positions, of which exactly 37 are highlighted. */}
      {Array.from({ length: 671 }, (_, index) => {
        const column = index % 61;
        const row = Math.floor(index / 61);
        const active = (index * 181) % 671 < 37;

        return (
          <rect
            key={index}
            x={33 + column * 12.5}
            y={23 + row * 12}
            width={5.5}
            height={5.5}
            rx={0.7}
            fill={active ? 'var(--accent)' : 'var(--border)'}
            opacity={active ? 1 : 0.65}
          />
        );
      })}
    </svg>
  );
}

function TrainingDiagram() {
  return (
    <svg
      viewBox="0 0 208 120"
      className="h-[120px] w-[208px] text-[var(--accent)]"
      fill="none"
      aria-hidden="true"
    >
      {[24, 48, 72, 96].map((y) => (
        <g key={y}>
          <path
            d={`M8 ${y}H52L80 60H102`}
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <rect
            x="8"
            y={y - 3}
            width="18"
            height="6"
            fill="var(--border)"
          />
        </g>
      ))}

      <rect
        x="102"
        y="28"
        width="64"
        height="64"
        rx="2"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {[0, 1, 2, 3].map((column) =>
        [0, 1].map((row) => (
          <rect
            key={`${column}-${row}`}
            x={114 + column * 11}
            y={44 + row * 20}
            width="7"
            height="12"
            fill="currentColor"
            opacity={row === 0 ? 1 : 0.35}
          />
        )),
      )}
      <path d="M166 60H198M191 53L198 60L191 67" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ContextDiagram() {
  return (
    <svg
      viewBox="0 0 208 120"
      className="h-[120px] w-[208px] text-[var(--accent)]"
      fill="none"
      aria-hidden="true"
    >
      <path d="M10 14V106M198 14V106" stroke="var(--border)" strokeDasharray="3 5" />
      <rect x="10" y="23" width="47" height="18" fill="var(--border)" />
      <path d="M57 49V62H198V70" stroke="currentColor" strokeWidth="1.5" />
      <path d="M193 65L198 70L203 65" stroke="currentColor" strokeWidth="1.5" />

      {[0, 1, 2, 3].map((segment) => (
        <rect
          key={segment}
          x={10 + segment * 47}
          y="79"
          width="43"
          height="18"
          fill="currentColor"
          opacity={segment === 0 ? 0.4 : 1}
        />
      ))}
    </svg>
  );
}

export default function Slide07({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  void brand;
  void totalSlides;

  const supplied = slide as unknown as Partial<CaseStudyContent>;
  const content = {
    title: supplied.title ?? lockedCopy.title,
    body: supplied.body ?? lockedCopy.body,
    cards: supplied.cards ?? lockedCopy.cards,
  };

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-center gap-9 text-[var(--ink)]">
      <div className="shrink-0">
        <div className="mb-6 h-[5px] w-16 bg-[var(--accent)]" />

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[76px] font-semibold leading-[0.99] tracking-[-0.055em]">
          {content.title === lockedCopy.title ? (
            <>
              <span className="block">DeepSeek-V3:</span>
              <span className="text-[var(--accent)]">sparsity,</span>
              {' not smallness'}
            </>
          ) : (
            content.title
          )}
        </h1>

        <p className="mt-6 max-w-[820px] font-[var(--font-body)] text-[27px] leading-[1.38] tracking-[-0.015em]">
          {content.body}
        </p>
      </div>

      <div className="grid shrink-0 grid-rows-[280px_166px_184px] gap-4">
        <article className="relative flex min-h-0 flex-col border border-[var(--border)] bg-[var(--surface)] px-8 py-7">
          <div className="absolute inset-y-0 left-0 w-[3px] bg-[var(--accent)]" />

          <h2 className="font-[var(--font-headline)] text-[29px] font-medium leading-none tracking-[-0.025em]">
            {(content.cards as any)?.title ?? (lockedCopy.cards as any)?.title}
          </h2>

          <p className="mt-4 font-[var(--font-mono)] text-[27px] leading-[1.3] tracking-[-0.055em]">
            {(content.cards as any)?.body === (lockedCopy.cards as any)?.body ||
            !(content.cards as any)?.body ? (
              <>
                671B total parameters;{' '}
                <span className="text-[var(--accent)]">
                  37B activated per token.
                </span>
              </>
            ) : (
              (content.cards as any).body
            )}
          </p>

          <div className="mt-4 min-h-0 flex-1">
            <CapacityDiagram />
          </div>
        </article>

        {content.cards.slice(1, 3).map((card, index) => (
          <article
            key={card.title}
            className="grid min-h-0 grid-cols-[minmax(0,1fr)_208px] items-center gap-8 border border-[var(--border)] px-8 py-5"
          >
            <div className="min-w-0">
              <h2 className="font-[var(--font-headline)] text-[29px] font-medium leading-[1.1] tracking-[-0.025em]">
                {card.title}
              </h2>
              <p className="mt-3 max-w-[590px] font-[var(--font-body)] text-[26px] leading-[1.35] tracking-[-0.015em]">
                {card.body}
              </p>
            </div>

            {index === 0 ? <TrainingDiagram /> : <ContextDiagram />}
          </article>
        ))}
      </div>
    </section>
  );
}