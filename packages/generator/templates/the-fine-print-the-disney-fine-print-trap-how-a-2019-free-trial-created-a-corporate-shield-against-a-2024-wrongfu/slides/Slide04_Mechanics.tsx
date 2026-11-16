import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

export default function Slide04({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  const items = slide.items ?? [];
  const item0 = items[0]!;
  const item1 = items[0]!;
  const arrowId = `pipeline-arrow-${React.useId().replace(/:/g, '')}`;

  void brand;

  const nodes = [
    { x: 24, y: 12, lines: ['Signup'] },
    { x: 344, y: 64, lines: ['Linked terms'] },
    { x: 664, y: 116, lines: ['September 2023', 'ticket purchase'] },
    { x: 24, y: 256, lines: ['Website claims'] },
    { x: 344, y: 300, lines: ['Delegation'] },
    { x: 664, y: 344, lines: ['Arbitration', 'and stay'] },
  ];

  return (
    <section
      className="flex h-full min-h-0 w-full flex-col justify-between gap-7 text-[var(--ink)]"
      aria-label={`Slide 4 of ${totalSlides}`}
    >
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold uppercase leading-tight tracking-[0.12em] text-[var(--accent)]">
            {slide.kicker ?? 'THE PROPOSED PIPELINE'}
          </p>
        </div>

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          {slide.headline ?? 'From Signup to Forum Control'}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'Disney proposed these links; enforceability remained contested.'}
        </p>
      </header>

      <div className="relative flex max-h-[500px] min-h-0 flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          preserveAspectRatio="xMidYMid meet"
          className="block h-full max-h-[500px] w-full"
          role="img"
          aria-label="Proposed pipeline: signup, linked terms, September 2023 ticket purchase, website claims, delegation, arbitration and stay. Enforceability remained contested."
        >
          <defs>
            <marker
              id={arrowId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="9"
              markerHeight="9"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M1 1 L9 5 L1 9" fill="none" stroke="var(--accent)" strokeWidth="2" />
            </marker>
          </defs>

          <g
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            aria-hidden="true"
          >
            <path d="M24 0 V460 M344 0 V460 M664 0 V460" />
            <path d="M24 236 H928" />
          </g>

          <g
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinejoin="miter"
            markerEnd={`url(#${arrowId})`}
            aria-hidden="true"
          >
            <path d="M288 68 H316 V120 H338" />
            <path d="M608 120 H636 V172 H658" />

            <path
              d="M928 172 H940 V242 H12 V312 H22"
              strokeDasharray="7 6"
            />

            <path d="M288 312 H316 V356 H338" />
            <path d="M608 356 H636 V400 H658" />
          </g>

          {nodes.map((node, index) => (
            <g key={index} transform={`translate(${node.x} ${node.y})`}>
              <rect
                x="0"
                y="0"
                width="264"
                height="112"
                fill="var(--surface)"
                stroke={index === 5 ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={index === 5 ? '2' : '1.5'}
              />

              <path
                d="M0 24 V0 H24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                aria-hidden="true"
              />

              <path
                d="M240 0 H264 V24 Z"
                fill="var(--accent)"
                opacity={index === 5 ? 1 : 0.55}
                aria-hidden="true"
              />

              <text
                x="18"
                y="32"
                fill="var(--accent)"
                className="font-[var(--font-mono)] text-[22px] font-bold"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </text>

              <text
                x="18"
                y={node.lines.length === 1 ? 80 : 68}
                fill="var(--ink)"
                className="font-[var(--font-body)] text-[24px] font-medium"
              >
                {node.lines.map((line, lineIndex) => (
                  <tspan
                    key={line}
                    x="18"
                    dy={lineIndex === 0 ? 0 : 29}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        {[item0, item1].map((item, index) => (
          <article
            key={index}
            className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-6"
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 bg-[var(--accent)]"
              />
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item?.label ??
                  (index === 0 ? 'Build assent' : 'Redirect dispute')}
              </h2>
            </div>

            <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item?.body ??
                (index === 0
                  ? 'Signup → linked terms → September 2023 ticket purchase.'
                  : 'Website claims → delegation → arbitration and stay.')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}