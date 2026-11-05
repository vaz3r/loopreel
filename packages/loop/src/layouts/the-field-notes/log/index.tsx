import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Log({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];
  const hasNow = items.some((x: any) => x.now);

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

      <div>
        {items.slice(0, 4).map((it: any, idx: number) => {
          const isNow = it.now || (!hasNow && idx === items.length - 1);
          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 24,
                padding: '24px 0',
                borderTop: '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))',
                borderBottom: idx === items.length - 1 ? '1.5px solid var(--border-color, rgba(43, 34, 25, 0.42))' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono, "DM Mono", monospace)',
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  paddingTop: 4,
                  color: isNow ? 'var(--accent-color, #B8432A)' : 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                }}
              >
                {it.time}
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                    fontSize: 28,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    margin: 0,
                    color: 'var(--ink-color, #2B2219)',
                  }}
                >
                  {renderMarkedText(it.title || '')}
                  {isNow && (
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: 14,
                        fontFamily: 'var(--font-hand, Caveat, cursive)',
                        fontWeight: 700,
                        fontSize: 30,
                        color: 'var(--accent-color, #B8432A)',
                        transform: 'rotate(-4deg)',
                      }}
                    >
                      ← here
                    </span>
                  )}
                </h3>
                {(it.desc || it.text) && (
                  <p
                    style={{
                      fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                      fontSize: 22,
                      lineHeight: 1.45,
                      margin: '6px 0 0 0',
                      color: 'var(--muted-color, rgba(43, 34, 25, 0.68))',
                    }}
                  >
                    {renderMarkedText(it.desc || it.text || '')}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
}
export { Log };
