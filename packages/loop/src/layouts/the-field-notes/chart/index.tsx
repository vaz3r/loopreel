import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Chart({ slide }: LayoutProps) {
  const s = slide as any;
  const data: Array<{ label: string; value: number }> = (s.data || []).map((d: any) => ({
    label: String(d.label || ''),
    value: Math.max(0, Number(d.value) || 0),
  }));

  const tgt = s.target && isFinite(Number(s.target.value)) ? Number(s.target.value) : null;
  const max = Math.max(...data.map((d) => d.value), tgt ?? 0, 1) * 1.08;
  const hi = Number.isInteger(s.highlight) ? s.highlight : data.reduce((m, d, i) => (d.value > data[m].value ? i : m), 0);

  const W = 834;
  const LW = 220;
  const rowH = 88;
  const top = tgt != null ? 54 : 10;
  const H = top + data.length * rowH + 10;
  const x = (v: number) => LW + (v / max) * (W - LW - 70);
  const u = s.unit || '';

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              margin: 0,
              color: 'var(--ink-color, #2B2219)',
            }}
          >
            {renderMarkedText(s.title || s.headline)}
          </h2>
          <Squiggle />
        </div>
      )}

      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }} role="img" aria-label="Bar chart">
        {data.map((d, i) => {
          const y = top + i * rowH;
          const on = i === hi;
          const bw = Math.max(x(d.value) - LW, 4);
          return (
            <g key={i}>
              <text x={0} y={y + 48} fontSize={28} fill="var(--ink-color, #2B2219)" fontFamily="var(--font-headline, Fraunces, Georgia, serif)" fontWeight={500}>
                {d.label}
              </text>
              <path
                d={`M${LW} ${y + 16} h${bw} l2 38 h${-bw - 2} z`}
                fill={on ? 'var(--accent-color, #B8432A)' : 'var(--highlighter-color, rgba(236,182,62,0.55))'}
                stroke={on ? 'var(--accent-color, #B8432A)' : 'var(--ink-color, #2B2219)'}
                strokeWidth={2}
                strokeLinejoin="round"
              />
              <text
                x={LW + bw + 16}
                y={y + 52}
                fontSize={38}
                fill={on ? 'var(--accent-color, #B8432A)' : 'var(--ink-color, #2B2219)'}
                fontFamily="var(--font-hand, Caveat, cursive)"
                fontWeight={700}
              >
                {+d.value.toFixed(1)}
                {u}
              </text>
              <line x1={0} y1={y + rowH - 6} x2={W} y2={y + rowH - 6} stroke="rgba(43, 34, 25, 0.15)" strokeWidth={1.5} strokeDasharray="6 6" />
            </g>
          );
        })}

        {tgt != null && (
          <g>
            <line x1={x(tgt)} y1={top - 6} x2={x(tgt)} y2={H - 10} stroke="var(--accent-color, #B8432A)" strokeWidth={2.5} strokeDasharray="3 9" strokeLinecap="round" />
            <text x={x(tgt)} y={top - 18} textAnchor="middle" fontSize={32} fill="var(--accent-color, #B8432A)" fontFamily="var(--font-hand, Caveat, cursive)" fontWeight={700}>
              {s.target?.label || 'Target'} · {tgt}
              {u}
            </text>
          </g>
        )}
      </svg>
    </SlideWrapper>
  );
}
export { Chart };
