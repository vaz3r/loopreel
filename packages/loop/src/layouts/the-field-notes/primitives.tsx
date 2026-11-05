import React from 'react';
import styles from './frame.module.css';

/* ==========================================================================
   Hand-Drawn Vector Primitives (Inline SVGs)
   ========================================================================== */

export function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 22"
      preserveAspectRatio="none"
      className={className}
      style={{ display: 'block', width: 220, height: 20, margin: '28px 0', overflow: 'visible' }}
      aria-hidden="true"
    >
      <path
        d="M2 12 C 22 2, 38 2, 58 11 S 98 21, 118 11 S 158 1, 178 11 S 218 21, 238 9"
        fill="none"
        stroke="var(--accent-color, #B8432A)"
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function CircNumber({ n }: { n: string | number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-hand, Caveat, cursive)',
        fontWeight: 700,
        fontSize: 30,
        color: 'var(--accent-color, #B8432A)',
      }}
    >
      <svg viewBox="0 0 64 64" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
        <path
          d="M34 5 C51 6 60 19 59 34 C58 50 45 60 30 59 C14 58 4 46 5 31 C6 16 17 7 38 8"
          fill="none"
          stroke="var(--accent-color, #B8432A)"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
      {n}
    </div>
  );
}

export function Arrow() {
  return (
    <svg viewBox="0 0 80 56" style={{ width: 70, height: 48, flexShrink: 0, overflow: 'visible' }} aria-hidden="true">
      {/* Hand-drawn directional arrow curving UP and LEFT toward annotated content */}
      <path d="M72 46 C 52 42, 28 30, 10 10" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="3" strokeLinecap="round" />
      <path d="M10 24 L10 10 L24 12" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function XMark() {
  return (
    <svg viewBox="0 0 64 64" style={{ width: 44, height: 44, overflow: 'visible' }} aria-hidden="true">
      <path d="M14 12 C 28 28, 38 38, 52 54 M52 10 C 38 26, 26 40, 12 54" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export function Box({ state = 'open' }: { state?: 'done' | 'open' | 'flag' }) {
  return (
    <svg viewBox="0 0 50 50" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }} aria-hidden="true">
      <path
        d="M5 6 C 18 4, 32 5, 45 5 C 46 18, 45 32, 46 45 C 32 46, 18 45, 4 46 C 5 32, 4 18, 5 6 Z"
        fill="none"
        stroke="var(--ink-color, #2B2219)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {state === 'done' && (
        <path d="M10 25 L21 37 L50 -2" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {state === 'flag' && (
        <path d="M25 11 V30 M25 38 V39" fill="none" stroke="var(--accent-color, #B8432A)" strokeWidth="4.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

/* ==========================================================================
   Highlighter & Annotations Engine
   ========================================================================== */

export function renderMarkedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      return (
        <mark
          key={i}
          style={{
            color: 'inherit',
            background: 'linear-gradient(100deg, transparent 0.15em, var(--highlighter-color, rgba(236,182,62,0.55)) 0.3em, var(--highlighter-color, rgba(236,182,62,0.55)) calc(100% - 0.2em), transparent)',
            backgroundSize: '100% 0.44em',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 86%',
            padding: '0 0.08em',
            boxDecorationBreak: 'clone',
            WebkitBoxDecorationBreak: 'clone',
          }}
        >
          {inner}
        </mark>
      );
    }
    return part;
  });
}

export function SlideWrapper({ slide, children }: { slide: any; children: React.ReactNode }) {
  const scribble = slide.scribble as string | undefined;
  const note = slide.note as string | undefined;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100%', height: 'auto', position: 'relative' }}>
      {children}
      {scribble && (
        <div className={styles.scribble}>
          <Arrow />
          <span>{scribble}</span>
        </div>
      )}
      {note && (
        <p className={styles.note}>
          * {renderMarkedText(note)}
        </p>
      )}
    </div>
  );
}
