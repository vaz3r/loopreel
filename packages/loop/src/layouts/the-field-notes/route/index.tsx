import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, XMark, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Route({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || s.steps || [];

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
        {items.slice(0, 5).map((it: any, idx: number) => {
          const isEnd = idx === items.length - 1 && items.length > 1;
          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '48px 1fr',
                gap: 24,
                paddingBottom: idx === items.length - 1 ? 0 : 36,
              }}
            >
              {idx < items.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 23,
                    top: 52,
                    bottom: 4,
                    borderLeft: '2.5px dotted var(--ink-color, #2B2219)',
                  }}
                />
              )}

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: isEnd ? 'none' : '2px solid var(--ink-color, #2B2219)',
                  background: isEnd ? 'transparent' : 'var(--bg-color, #EEE5D0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                  fontWeight: 600,
                  fontSize: 22,
                  zIndex: 2,
                }}
              >
                {isEnd ? <XMark /> : idx + 1}
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
                    fontSize: 28,
                    fontWeight: 600,
                    lineHeight: 1.2,
                    margin: 0,
                    paddingTop: 6,
                    color: isEnd ? 'var(--accent-color, #B8432A)' : 'var(--ink-color, #2B2219)',
                  }}
                >
                  {renderMarkedText(it.title || '')}
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
export { Route };
