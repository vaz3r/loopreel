import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, CircNumber, XMark, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function MapSlide({ slide }: LayoutProps) {
  const s = slide as any;
  const pts: Array<{ name: string; note?: string }> = (s.points || []).slice(0, 6);
  const n = pts.length;

  const W = 834;
  const H = 400;
  const ys = [310, 130, 270, 80, 240, 60];
  const P = pts.map((_, i) => [50 + (W - 100) * (i / Math.max(n - 1, 1)), ys[i % ys.length]]);

  let d = n > 0 ? `M${P[0][0]} ${P[0][1]}` : '';
  for (let i = 1; i < n; i++) {
    const [x0, y0] = P[i - 1];
    const [x1, y1] = P[i];
    const mx = (x0 + x1) / 2;
    d += ` C${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }

  const topoEllipses = [
    [250, 280, 220, 90, -8],
    [250, 280, 150, 58, -8],
    [250, 280, 80, 30, -8],
    [640, 150, 190, 75, 10],
    [640, 150, 110, 42, 10],
  ];

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 16 }}>
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

      <svg viewBox={`0 0 ${W} ${H + 10}`} style={{ display: 'block', width: '100%', height: 'auto', overflow: 'visible' }} role="img" aria-label="Journey map">
        {topoEllipses.map(([cx, cy, rx, ry, rot], j) => (
          <ellipse
            key={j}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            transform={`rotate(${rot} ${cx} ${cy})`}
            fill="none"
            stroke="rgba(43, 34, 25, 0.15)"
            strokeWidth={1.8}
          />
        ))}

        {n > 1 && <path d={d} fill="none" stroke="var(--ink-color, #2B2219)" strokeWidth={3} strokeDasharray="3 10" strokeLinecap="round" />}

        {P.map(([px, py], i) =>
          i === n - 1 ? (
            <g key={i} transform={`translate(${px - 22} ${py - 22}) scale(0.7)`}>
              <XMark />
            </g>
          ) : (
            <g key={i}>
              <circle cx={px} cy={py} r={20} fill="var(--bg-color, #EEE5D0)" stroke="var(--ink-color, #2B2219)" strokeWidth={2.4} />
              <text x={px} y={py + 9} textAnchor="middle" fontSize={26} fill="var(--ink-color, #2B2219)" fontFamily="var(--font-hand, Caveat, cursive)" fontWeight={700}>
                {i + 1}
              </text>
            </g>
          )
        )}

        {/* Compass Rose */}
        <g transform={`translate(${W - 34} ${H - 36})`}>
          <path d="M0 -26 L8 4 L0 -2 L-8 4 Z" fill="var(--ink-color, #2B2219)" />
          <path d="M0 26 L8 -4 L0 2 L-8 -4 Z" fill="none" stroke="var(--ink-color, #2B2219)" strokeWidth={1.5} />
          <text x={0} y={-32} textAnchor="middle" fontSize={18} fill="var(--ink-color, #2B2219)" fontFamily="var(--font-mono, 'DM Mono', monospace)">
            N
          </text>
        </g>

        {/* Scale indicator */}
        {s.scale && (
          <g transform={`translate(0 ${H - 6})`}>
            <path d="M0 0 h110 M0 -6 v12 M55 -4 v8 M110 -6 v12" stroke="var(--ink-color, #2B2219)" strokeWidth={2} />
            <text x={126} y={6} fontSize={16} letterSpacing={2} fill="var(--muted-color, rgba(43, 34, 25, 0.68))" fontFamily="var(--font-mono, 'DM Mono', monospace)">
              {String(s.scale).toUpperCase()}
            </text>
          </g>
        )}
      </svg>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 32px', marginTop: 24 }}>
        {pts.map((p, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '42px 1fr', gap: 14, alignItems: 'start' }}>
            {i === n - 1 ? <XMark /> : <CircNumber n={i + 1} />}
            <div>
              <h3 style={{ fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)', fontSize: 24, fontWeight: 600, margin: 0, color: 'var(--ink-color, #2B2219)' }}>
                {renderMarkedText(p.name)}
              </h3>
              {p.note && (
                <div style={{ fontFamily: 'var(--font-hand, Caveat, cursive)', fontSize: 26, color: 'var(--muted-color, rgba(43, 34, 25, 0.68))' }}>
                  {p.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}
export { MapSlide };
