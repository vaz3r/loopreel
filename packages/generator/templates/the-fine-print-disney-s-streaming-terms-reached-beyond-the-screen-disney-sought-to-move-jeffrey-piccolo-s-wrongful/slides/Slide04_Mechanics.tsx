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
  const diagramId = React.useId();

  const nodes = [
    { x: 4, y: 22, number: '01', lines: ['Streaming', 'signup'] },
    { x: 196, y: 92, number: '02', lines: ['Affiliate', 'terms'] },
    { x: 388, y: 162, number: '03', lines: ['Ticket-account', 'reuse'] },
    { x: 580, y: 232, number: '04', lines: ['Website', 'allegations'] },
    { x: 772, y: 302, number: '05', lines: ['Arbitration', 'request + stay'] },
  ];

  return (
    <section className="flex h-full min-h-0 w-full flex-col justify-between py-8 text-[var(--ink)]">
      <header className="shrink-0">
        <div className="mb-5 flex items-center gap-4">
          <span
            aria-hidden="true"
            className="h-3 w-3 shrink-0 bg-[var(--accent)]"
          />
          <p className="font-[var(--font-headline)] text-[22px] font-bold tracking-[0.14em] text-[var(--accent)]">
            {slide.kicker ?? 'THE ASSERTED PIPELINE'}
          </p>
        </div>

        <h1 className="max-w-[920px] font-[var(--font-headline)] text-[60px] font-bold leading-[1.02] tracking-tight">
          {slide.headline ?? 'How Disney Tried To Connect Products'}
        </h1>

        <p className="mt-5 max-w-[850px] font-[var(--font-body)] text-[26px] leading-snug line-clamp-2">
          {slide.subheadline ??
            'Its asserted pathway connected account assent to injury claims.'}
        </p>
      </header>

      <div className="relative my-6 flex min-h-[440px] max-h-[500px] flex-1 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 952 460"
          className="block h-full max-h-[500px] w-full"
          role="img"
          aria-labelledby={`${diagramId}-title ${diagramId}-description`}
        >
          <title id={`${diagramId}-title`}>
            The asserted connection from account assent to injury claims
          </title>
          <desc id={`${diagramId}-description`}>
            Five descending steps connect streaming signup, affiliate terms,
            ticket-account reuse, website allegations, and an arbitration
            request and stay. The diagram depicts Disney’s asserted pathway.
          </desc>

          <defs>
            <marker
              id={`${diagramId}-arrow`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="8"
              markerHeight="8"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M1 1L7 4L1 7" fill="none" stroke="var(--accent)" strokeWidth="2" />
            </marker>
          </defs>

          {/* Offset drafting rails reinforce the stepped architecture. */}
          <path
            d="M4 8H190V78H382V148H574V218H766V288H948"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <path
            d="M4 170H176V240H368V310H560V380H752V450H948"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />

          {/* Conduits remain behind the nodes, never behind HTML copy. */}
          {nodes.slice(0, -1).map((node, index) => {
            const next = nodes[index + 1];
            if (!next) return null;

            const startX = node.x + 176;
            const startY = node.y + 78;
            const endY = next.y + 78;
            const elbowX = startX + 8;

            return (
              <path
                key={`conduit-${node.number}`}
                d={`M${startX} ${startY}H${elbowX}V${endY}H${next.x - 3}`}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                markerEnd={`url(#${diagramId}-arrow)`}
              />
            );
          })}

          {nodes.map((node, index) => (
            <g
              key={node.number}
              transform={`translate(${node.x}, ${node.y})`}
            >
              <rect
                x="0"
                y="0"
                width="176"
                height="134"
                fill="var(--surface)"
                stroke={index === 4 ? 'var(--accent)' : 'var(--border)'}
                strokeWidth={index === 4 ? '2' : '1.5'}
              />

              <path
                d="M0 0H66L56 38H0Z"
                fill="var(--accent)"
              />
              <text
                x="14"
                y="27"
                fill="var(--paper, #0A0A0C)"
                className="font-[var(--font-mono)] text-[24px] font-bold"
              >
                {node.number}
              </text>

              <g
                transform="translate(137 12)"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                {index === 0 ? (
                  <>
                    <rect x="0" y="1" width="24" height="18" />
                    <path d="M8 24H16M12 19V24M9 6L16 10L9 14Z" />
                  </>
                ) : index === 1 ? (
                  <>
                    <path d="M3 0H17L23 6V26H3ZM17 0V7H23" />
                    <path d="M8 12H18M8 17H18M8 22H14" />
                  </>
                ) : index === 2 ? (
                  <>
                    <path d="M0 3H26V9C20 9 20 17 26 17V23H0V17C6 17 6 9 0 9Z" />
                    <path d="M17 5V21" strokeDasharray="2 3" />
                  </>
                ) : index === 3 ? (
                  <>
                    <rect x="0" y="1" width="26" height="24" />
                    <path d="M0 8H26M6 14H20M6 19H16" />
                  </>
                ) : (
                  <>
                    <path d="M2 26V1H24V26M8 26V8H18V26" />
                    <path d="M0 26H26" />
                  </>
                )}
              </g>

              <text
                x="13"
                y="80"
                fill="var(--ink)"
                className="font-[var(--font-body)] text-[22px] font-semibold"
              >
                <tspan x="13">{node.lines}</tspan>
                <tspan x="13" dy="29">
                  {node.lines}
                </tspan>
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-5">
        {[item0, item1].map((item, index) => (
          <article
            key={index}
            className="border-t-2 border-[var(--border)] bg-[var(--surface)] px-6 py-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-6 w-1 shrink-0 bg-[var(--accent)]"
              />
              <h2 className="font-[var(--font-headline)] text-[28px] font-semibold leading-tight">
                {item?.label ??
                  (index === 0 ? 'Account bridge' : 'Claim bridge')}
              </h2>
            </div>

            <p className="font-[var(--font-body)] text-[24px] leading-snug line-clamp-3">
              {item?.body ??
                (index === 0
                  ? 'Streaming signup → affiliate terms → ticket-account reuse.'
                  : 'Website allegations → arbitration request and stay.')}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}