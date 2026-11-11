import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

type Step = {
  step: string;
  title: string;
  body: string;
};

const defaultSteps: Step[] = [
  {
    step: '1',
    title: 'Draw the changeover',
    body: 'Sketch sleeping, working, and hosting arrangements. For every object that moves, assign a storage location. Traditional room flexibility depends partly on putting bedding and furniture away.',
  },
  {
    step: '2',
    title: 'Separate light from view',
    body: 'Shoji can obscure an exterior view while admitting light. Test a translucent sample at the intended opening before specifying the entire screen.',
  },
  {
    step: '3',
    title: 'Give the edge a purpose',
    body: 'An engawa accommodates movement and sitting between room and garden. In your plan, test the seated view and the passing route together—not as separate drawings.',
  },
];

export default function Slide14({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const content = slide as unknown as {
    headline?: string;
    steps?: Step[];
  };

  const steps = content.steps?.length ? content.steps : defaultSteps;

  return (
    <section
      aria-label={content.headline || 'Design the room in use.'}
      className="flex h-full min-h-0 flex-col gap-8 text-[var(--ink)]"
    >
      <div className="shrink-0 pb-2">
        <div className="mb-6 flex items-center gap-4">
          <span className="h-2.5 w-2.5 bg-[var(--accent)]" />
          <span className="font-[var(--font-mono)] text-sm uppercase tracking-[0.22em]">
            A practice in three steps
          </span>
        </div>

        <h1 className="max-w-[780px] text-balance font-[var(--font-headline)] text-7xl font-bold leading-[1.02] tracking-[-0.045em]">
          {content.headline || 'Design the room in use.'}
        </h1>
      </div>

      <ol className="m-0 flex min-h-0 flex-1 list-none flex-col gap-5 p-0">
        {steps.map((step, index) => (
          <li
            key={`${step.step}-${index}`}
            className="relative flex flex-1 items-center overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.025)]"
          >
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-0 top-8 w-1 rounded-r-full bg-[var(--accent)]"
            />

            <div className="grid w-full grid-cols-[88px_minmax(0,1fr)] items-start gap-7">
              <div className="flex flex-col items-start gap-4 pt-1">
                <span className="font-[var(--font-mono)] text-xs uppercase tracking-[0.18em] text-[var(--accent)]">
                  Step
                </span>
                <span className="font-[var(--font-mono)] text-6xl font-bold leading-none tracking-[-0.08em] text-[var(--accent)]">
                  {step.step.padStart(2, '0')}
                </span>
                <span className="mt-1 h-px w-12 bg-[var(--border)]" />
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-balance font-[var(--font-headline)] text-[32px] font-bold leading-[1.12] tracking-[-0.025em]">
                  {step.title}
                </h2>

                <p className="max-w-[650px] font-[var(--font-body)] text-[23px] leading-[1.5]">
                  {step.body}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}