import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { Squiggle, Box, renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Kit({ slide }: LayoutProps) {
  const s = slide as any;
  const items = s.items || [];

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
        {items.slice(0, 6).map((it: any, idx: number) => {
          const st: 'done' | 'open' | 'flag' = ['done', 'flag', 'open'].includes(it.state) ? it.state : 'open';
          const isDone = st === 'done';
          const isFlag = st === 'flag';

          return (
            <div
              key={idx}
              style={{
                display: 'grid',
                gridTemplateColumns: '46px 1fr',
                gap: 22,
                alignItems: 'center',
                padding: '20px 0',
                borderTop: idx === 0 ? '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))' : 'none',
                borderBottom: '1.5px dashed var(--border-color, rgba(43, 34, 25, 0.42))',
              }}
            >
              <div style={{ position: 'relative', width: 44, height: 44 }}>
                <Box state={st} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body, Newsreader, Georgia, serif)',
                  fontSize: 28,
                  fontWeight: 500,
                  lineHeight: 1.3,
                  margin: 0,
                  color: isDone ? 'var(--muted-color, rgba(43, 34, 25, 0.68))' : 'var(--ink-color, #2B2219)',
                  textDecoration: isDone ? 'line-through' : 'none',
                  textDecorationColor: 'var(--border-color, rgba(43, 34, 25, 0.42))',
                  textDecorationThickness: 2,
                }}
              >
                {renderMarkedText(it.text || it.title || '')}
                {isFlag && (
                  <span
                    style={{
                      fontFamily: 'var(--font-hand, Caveat, cursive)',
                      fontSize: 30,
                      fontWeight: 700,
                      color: 'var(--accent-color, #B8432A)',
                      marginLeft: 10,
                    }}
                  >
                    — check
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </SlideWrapper>
  );
}
export { Kit };
