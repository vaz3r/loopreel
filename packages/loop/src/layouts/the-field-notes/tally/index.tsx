import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Tally({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || s.stats || s.metrics || [];
  const isRows = items.length !== 4;

  return (
    <SlideWrapper slide={s}>
      {(s.title || s.headline) && (
        <div style={{ marginBottom: 28 }}>
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

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isRows ? '1fr' : '1fr 1fr',
          gap: isRows ? 24 : 28,
        }}
      >
        {items.slice(0, 4).map((it: any, idx: number) => (
          <div
            key={idx}
            style={{
              padding: 24,
              background: 'var(--surface-color, #F6F0E2)',
              border: '1.5px solid rgba(43, 34, 25, 0.18)',
              display: isRows ? 'grid' : 'block',
              gridTemplateColumns: isRows ? '240px 1fr' : undefined,
              alignItems: isRows ? 'center' : undefined,
              gap: isRows ? 24 : undefined,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span
                style={{
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontSize: isRows ? 72 : 64,
                  fontWeight: 700,
                  color: 'var(--ink-color, #2B2219)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.05em',
                }}
              >
                {it.value}
              </span>
              {it.unit && (
                <span
                  style={{
                    fontFamily: 'var(--font-hand, Caveat, cursive)',
                    fontSize: 34,
                    fontWeight: 700,
                    color: 'var(--accent-color, #B8432A)',
                  }}
                >
                  {it.unit}
                </span>
              )}
            </div>

            {!isRows && <Squiggle />}

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontSize: 26,
                  fontWeight: 600,
                  lineHeight: 1.15,
                  margin: 0,
                  color: 'var(--ink-color, #2B2219)',
                }}
              >
                {renderMarkedText(it.label || '')}
              </h3>
              {(it.text || it.desc) && (
                <p
                  style={{
                    fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                    fontSize: 20,
                    lineHeight: 1.4,
                    margin: '6px 0 0 0',
                    color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                  }}
                >
                  {renderMarkedText(it.text || it.desc || '')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SlideWrapper>
  );
}
export { Tally, Tally as Telemetry };
