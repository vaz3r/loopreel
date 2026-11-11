import React from 'react';
import type { SlideComponentProps } from '../../../src/skeleton/types';

const specifications = [
  {
    number: '12',
    label: 'CPU cores',
    body: 'Two super cores, four performance cores, six high-efficiency cores.',
    columns: 4,
    rows: 3,
    kind: 'cpu',
  },
  {
    number: '12',
    label: 'GPU cores',
    body: 'Up from the M5’s maximum 10 GPU cores.',
    columns: 4,
    rows: 3,
    kind: 'gpu',
  },
  {
    number: '32',
    label: 'NPU cores',
    body: 'Double the earlier 16-core Neural Engine configuration.',
    columns: 8,
    rows: 4,
    kind: 'npu',
  },
] as const;

function SiliconDiagram({
  columns,
  rows,
  kind,
}: {
  columns: number;
  rows: number;
  kind: 'cpu' | 'gpu' | 'npu';
}) {
  const gap = kind === 'npu' ? 5 : 8;
  const cellWidth = (160 - gap * (columns - 1)) / columns;
  const cellHeight = (112 - gap * (rows - 1)) / rows;

  return (
    <svg
      viewBox="0 0 232 184"
      className="h-[184px] w-[232px] text-[var(--ink)]"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="20"
        y="16"
        width="192"
        height="152"
        rx="10"
        fill="var(--surface)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />

      {Array.from({ length: 8 }, (_, index) => {
        const x = 43 + index * 21;
        return (
          <path
            key={`vertical-pin-${index}`}
            d={`M${x} 0V16 M${x} 168V184`}
            stroke="var(--border)"
            strokeWidth="2"
          />
        );
      })}

      {Array.from({ length: 6 }, (_, index) => {
        const y = 37 + index * 22;
        return (
          <path
            key={`horizontal-pin-${index}`}
            d={`M0 ${y}H20 M212 ${y}H232`}
            stroke="var(--border)"
            strokeWidth="2"
          />
        );
      })}

      {Array.from({ length: columns * rows }, (_, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = 36 + column * (cellWidth + gap);
        const y = 36 + row * (cellHeight + gap);
        const outlined = kind === 'gpu' && index >= 10;
        const opacity =
          kind === 'cpu'
            ? index < 2
              ? 1
              : index < 6
                ? 0.55
                : 0.2
            : kind === 'npu'
              ? index < 16
                ? 0.35
                : 1
              : 0.85;

        return (
          <rect
            key={`core-${index}`}
            x={x}
            y={y}
            width={cellWidth}
            height={cellHeight}
            rx={kind === 'npu' ? 2 : 3}
            fill={outlined ? 'none' : 'var(--accent)'}
            fillOpacity={opacity}
            stroke={outlined ? 'var(--accent)' : 'none'}
            strokeWidth={outlined ? 2 : 0}
          />
        );
      })}

      <path
        d="M26 30V22H34 M198 22H206V30 M26 154V162H34 M198 162H206V154"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function Slide02({
  slide,
  brand,
  totalSlides,
}: SlideComponentProps) {
  return (
    <section className="flex flex-col h-full min-h-0 w-full text-[var(--ink)]">
      <div className="mb-7">
        <div
          className="mb-6 h-[5px] w-20 bg-[var(--accent)]"
          aria-hidden="true"
        />

        <h1 className="max-w-[900px] font-[var(--font-headline)] text-[64px] font-bold leading-[1.03] tracking-[-0.045em]">
          The Silicon Gets
          <br />
          More Ambitious
        </h1>

        <p className="mt-5 max-w-[760px] font-[var(--font-body)] text-[28px] leading-snug tracking-[-0.015em]">
          More cores headline the upgrade. Base RAM remains 16GB.
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-3 gap-5">
        {specifications.map((specification) => (
          <article
            key={specification.kind}
            className="grid grid-cols-[1fr_232px] items-center gap-7 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-7 py-5"
          >
            <div className="min-w-0">
              <h2 className="flex items-baseline gap-4">
                <span className="font-[var(--font-mono)] text-[84px] font-bold leading-none tracking-[-0.075em] text-[var(--accent)]">
                  {specification.number}
                </span>
                <span className="font-[var(--font-headline)] text-[36px] font-semibold leading-tight tracking-[-0.035em]">
                  {specification.label}
                </span>
              </h2>

              <p className="mt-4 max-w-[540px] font-[var(--font-body)] text-[26px] leading-snug tracking-[-0.015em]">
                {specification.body}
              </p>
            </div>

            <SiliconDiagram
              columns={specification.columns}
              rows={specification.rows}
              kind={specification.kind}
            />
          </article>
        ))}
      </div>
    </section>
  );
}