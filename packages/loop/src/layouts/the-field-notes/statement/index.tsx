import React from 'react';
import type { LayoutProps } from '../../shared/types.js';
import { renderMarkedText, SlideWrapper } from '../primitives.js';

export default function Statement({ slide }: LayoutProps) {
  const s = slide as any;

  return (
    <SlideWrapper slide={s}>
      <p
        style={{
          fontFamily: 'var(--font-headline, Fraunces, Georgia, serif)',
          fontSize: 66,
          fontWeight: 500,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          margin: 0,
          color: 'var(--ink-color, #2B2219)',
        }}
      >
        {renderMarkedText(s.text || s.headline || '')}
      </p>
    </SlideWrapper>
  );
}
export { Statement };
