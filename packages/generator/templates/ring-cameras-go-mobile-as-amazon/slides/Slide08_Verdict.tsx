import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const verdict = {
  headline: 'Choose by Constraints, Not Autonomy Claims',
  avoid: {
    tag: 'WHO SHOULD SKIP',
    title: 'Requirements these robots cannot meet',
    points: [
      'Skip both if local-only processing is essential: AI Pilot uses cloud processing.',
      'Skip Rover if patrols must climb stairs: it operates indoors on a single floor.',
    ],
  },
  fit: {
    tag: 'POTENTIAL FIT',
    title: 'Conditional uses, not blanket endorsements',
    points: [
      'Consider Drone only if cloud processing and a Ring Protect subscription for set routes and schedules are acceptable.',
      'Consider Rover for compatible single-floor interiors; claimed coverage is up to 5,000 square feet (465 square meters).',
    ],
  },
};

function ConstraintDiagram({ conditional }: { conditional: boolean }) {
  return (
    <svg
      viewBox="0 0 152 130"
      fill="none"
      aria-hidden="true"
      className="h-[130px] w-[152px] text-[var(--accent)]"
    >
      <path
        d="M8 16H144M8 114H144M24 4V126M128 4V126"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <path
        d="M24 44V28H55M97 28H128V44M24 86V102H55M97 102H128V86"
        stroke="var(--ink)"
        strokeOpacity=".55"
        strokeWidth="2"
      />
      {conditional ? (
        <>
          <path
            d="M8 65H49L70 86L103 46H144"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M76 8V42M76 94V122"
            stroke="var(--border)"
            strokeWidth="2"
            strokeDasharray="4 5"
          />
          <circle cx="24" cy="65" r="5" fill="var(--surface)" stroke="currentColor" strokeWidth="2" />
          <circle cx="128" cy="46" r="5" fill="currentColor" />
          <path d="M137 39L144 46L137 53" stroke="currentColor" strokeWidth="2" />
        </>
      ) : (
        <>
          <path d="M8 65H65M87 65H144" stroke="var(--border)" strokeWidth="2" strokeDasharray="5 5" />
          <path d="M76 18V112" stroke="currentColor" strokeWidth="3" />
          <path d="M65 18H87M65 112H87" stroke="currentColor" strokeWidth="3" />
          <circle cx="45" cy="65" r="6" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          <path d="M101 59L113 71M113 59L101 71" stroke="var(--ink)" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}

export default function Slide08({ slide, brand, totalSlides }: SlideComponentProps) {
  void slide;
  void brand;
  void totalSlides;

  return (
    <section className="flex h-full min-h-0 flex-col justify-center gap-8 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-6 flex items-center gap-3" aria-hidden="true">
          <span className="h-[5px] w-16 bg-[var(--accent)]" />
          <span className="h-px flex-1 bg-[var(--border)]" />
          <span className="h-[7px] w-[7px] bg-[var(--accent)]" />
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.04] tracking-[-0.045em]">
          Choose by Constraints,
          <br />
          <span className="text-[var(--accent)]">Not Autonomy Claims</span>
        </h1>
      </header>

      <div className="grid shrink-0 gap-5">
        {[verdict.avoid, verdict.fit].map((group, index) => (
          <article
            key={group.tag}
            className={`grid grid-cols-[152px_minmax(0,1fr)] gap-7 border border-[var(--border)] p-8 ${
              index === 1 ? 'bg-[var(--surface)]' : ''
            }`}
          >
            <aside className="flex flex-col items-start gap-8 border-r border-[var(--border)] pr-5">
              <p className="font-[var(--font-mono)] text-[16px] font-medium leading-[1.45] tracking-[0.12em] text-[var(--accent)]">
                {group.tag}
              </p>

              <div className="-ml-2">
                <ConstraintDiagram conditional={index === 1} />
              </div>
            </aside>

            <div className="min-w-0">
              <h2 className="max-w-[650px] font-[var(--font-headline)] text-[31px] font-semibold leading-[1.13] tracking-[-0.025em]">
                {group.title}
              </h2>

              <ul className="mt-6 space-y-5">
                {group.points.map((point, pointIndex) => (
                  <li
                    key={point}
                    className={`grid grid-cols-[12px_minmax(0,1fr)] gap-3 ${
                      pointIndex > 0
                        ? 'border-t border-[var(--border)] pt-5'
                        : ''
                    }`}
                  >
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className="mt-[10px] h-3 w-3 text-[var(--accent)]"
                    >
                      {index === 0 ? (
                        <path d="M1 6H11" stroke="currentColor" strokeWidth="2" />
                      ) : (
                        <path
                          d="M2 2L6 6L2 10M6 6H11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      )}
                    </svg>
                    <p className="font-[var(--font-body)] text-[25px] leading-[1.36] tracking-[-0.012em]">
                      {point}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}