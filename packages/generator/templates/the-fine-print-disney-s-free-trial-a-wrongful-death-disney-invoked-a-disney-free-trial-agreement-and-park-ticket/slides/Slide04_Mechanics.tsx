import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({ slide, brand, totalSlides }: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;

  const connection = {
    label: item0?.label ?? 'Build Connection',
    body:
      item0?.body ??
      'Capture assent → incorporate terms → reinforce through parks.',
  };

  const forum = {
    label: item1?.label ?? 'Shift Forum',
    body:
      item1?.body ??
      'Link website allegations → invoke delegation → seek a stay.',
  };

  const connectionSteps = connection.body.replace(/\.$/, '').split('→');
  const forumSteps = forum.body.replace(/\.$/, '').split('→').reverse();

  const nodes = [
    { x: 110, y: 100, number: '01' },
    { x: 476, y: 100, number: '02' },
    { x: 842, y: 100, number: '03' },
    { x: 842, y: 360, number: '04' },
    { x: 476, y: 360, number: '05' },
    { x: 110, y: 360, number: '06' },
  ];

  void brand;

  return (
    <section
      aria-label={`Slide 4 of ${totalSlides}: The contractual pipeline`}
      className="flex h-full min-h-0 w-full flex-col justify-between text-[var(--ink)]"
    >
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker ?? 'THE CONTRACTUAL PIPELINE'}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          {slide.headline ?? 'Build The Chain. Request Arbitration.'}
        </h1>

        <p className="mt-5 line-clamp-2 max-w-[900px] font-[var(--font-body)] text-[26px] leading-snug">
          {slide.subheadline ??
            'Disney sought arbitration and a stay of the court action.'}
        </p>
      </header>

      <figure
        aria-label="Six-step contractual pipeline, read clockwise from the upper left."
        className="my-5 flex min-h-0 flex-1 flex-col justify-center"
      >
        <ol className="grid shrink-0 grid-cols-3 gap-8">
          {connectionSteps.map((step, index) => (
            <li
              key={`connection-${index}`}
              className={`font-[var(--font-body)] text-[22px] leading-snug ${
                index === 0
                  ? 'text-left'
                  : index === 1
                    ? 'text-center'
                    : 'text-right'
              }`}
            >
              {step.trim()}
            </li>
          ))}
        </ol>

        <div className="relative flex max-h-[460px] min-h-[440px] flex-1 items-center justify-center">
          <svg
            viewBox="0 0 952 460"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="block h-full max-h-[460px] w-full"
            fill="none"
          >
            {/* One continuous rail: left to right, then right to left. */}
            <path
              d="M110 100H842C898 100 918 130 918 184V276C918 330 898 360 842 360H110"
              stroke="var(--border)"
              strokeWidth="3"
            />

            <path
              d="M842 100C898 100 918 130 918 184V276C918 330 898 360 842 360H110"
              stroke="var(--accent)"
              strokeWidth="3"
            />

            {/* Directional conduits, never container boxes. */}
            <g
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M281 91L293 100L281 109" />
              <path d="M647 91L659 100L647 109" />
            </g>

            <g
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M909 224L918 236L927 224" />
              <path d="M671 351L659 360L671 369" />
              <path d="M305 351L293 360L305 369" />
            </g>

            {/* Fine registration ticks connect the rail to its HTML labels. */}
            <g stroke="var(--border)" strokeWidth="1">
              <path d="M110 8V55M476 8V55M842 8V55" />
              <path d="M110 405V452M476 405V452M842 405V452" />
            </g>

            {nodes.map((node, index) => (
              <g key={node.number}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="39"
                  fill="var(--surface)"
                  stroke={index >= 3 ? 'var(--accent)' : 'var(--ink)'}
                  strokeWidth={index === 5 ? '3' : '2'}
                />

                {index === 5 && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="47"
                    stroke="var(--accent)"
                    strokeWidth="1"
                  />
                )}

                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={index >= 3 ? 'var(--accent)' : 'var(--ink)'}
                  className="font-[var(--font-mono)] text-[26px] font-bold"
                >
                  {node.number}
                </text>
              </g>
            ))}

            {/* Editorial accent flags mark entry and requested exit. */}
            <path
              d="M110 61V24H142L132 35L142 46H110"
              stroke="var(--accent)"
              strokeWidth="2"
              fill="var(--accent)"
            />
            <path
              d="M110 313V276H142L132 287L142 298H110"
              stroke="var(--accent)"
              strokeWidth="2"
              fill="var(--accent)"
            />
          </svg>
        </div>

        <ol
          reversed
          start={6}
          className="grid shrink-0 grid-cols-3 gap-8"
        >
          {forumSteps.map((step, index) => (
            <li
              key={`forum-${index}`}
              className={`font-[var(--font-body)] text-[22px] leading-snug text-[var(--accent)] ${
                index === 0
                  ? 'text-left'
                  : index === 1
                    ? 'text-center'
                    : 'text-right'
              }`}
            >
              {step.trim()}
            </li>
          ))}
        </ol>
      </figure>

      <footer className="shrink-0 bg-[var(--surface)]">
        {[connection, forum].map((item, index) => (
          <article
            key={item.label}
            className="flex items-start gap-6 border-t border-[var(--border)] py-4"
          >
            <span className="w-[76px] shrink-0 pt-1 font-[var(--font-mono)] text-[20px] text-[var(--accent)]">
              {index === 0 ? '01—03' : '04—06'}
            </span>

            <div className="min-w-0">
              <h2 className="font-[var(--font-headline)] text-[26px] font-semibold leading-tight">
                {item.label}
              </h2>
              <p className="mt-1 line-clamp-2 font-[var(--font-body)] text-[22px] leading-snug">
                {item.body}
              </p>
            </div>
          </article>
        ))}
      </footer>
    </section>
  );
}